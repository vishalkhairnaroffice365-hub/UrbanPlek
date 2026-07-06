import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../prisma/client';
import { uploadToCloudinary, fetchJsonData } from '../services/cloudinary.service';

export const createListing = async (req: Request, res: Response): Promise<void> => {
  try {
    const listingType = req.body.type;
    const rawDataStr = req.body.data;

    if (!listingType || !rawDataStr) {
      res.status(400).json({ error: 'Missing type or data' });
      return;
    }

    const listingData = JSON.parse(rawDataStr);
    const files = req.files as Express.Multer.File[] | undefined;

    const listingId = `LST-${uuidv4()}`;
    listingData.id = listingId;
    listingData.type = listingType;
    listingData.created_at = new Date().toISOString();

    const imageUrls: string[] = [];

    // Upload images concurrently using Promise.all
    if (files && files.length > 0) {
      const uploadPromises = files.map((file) =>
        uploadToCloudinary(file.buffer, 'urbanplek/images', 'image')
      );
      const results = await Promise.all(uploadPromises);
      imageUrls.push(...results.filter((url): url is string => url !== null));
    }

    listingData.images = imageUrls;

    // Upload JSON data as raw file
    const jsonBuffer = Buffer.from(JSON.stringify(listingData), 'utf-8');
    const jsonUrl = await uploadToCloudinary(
      jsonBuffer,
      'urbanplek/data',
      'raw',
      `${listingId}.json`
    );

    if (!jsonUrl) {
      res.status(500).json({ error: 'Failed to save listing data' });
      return;
    }

    // Safely parse numbers
    let priceForDb: number | null = null;
    try {
      if (listingData.price) priceForDb = parseInt(listingData.price, 10);
      if (isNaN(priceForDb!)) priceForDb = null;
    } catch (e) {
      // Ignored
    }

    let latForDb: number | null = null;
    let lngForDb: number | null = null;
    try {
      if (listingData.latitude) latForDb = parseFloat(listingData.latitude);
      else if (listingData.lat) latForDb = parseFloat(listingData.lat);
      if (latForDb !== null && isNaN(latForDb)) latForDb = null;

      if (listingData.longitude) lngForDb = parseFloat(listingData.longitude);
      else if (listingData.lng) lngForDb = parseFloat(listingData.lng);
      if (lngForDb !== null && isNaN(lngForDb)) lngForDb = null;
    } catch (e) {
      // Ignored
    }

    // Save to PostgreSQL
    const newListing = await prisma.listing.create({
      data: {
        id: listingId,
        propertyType: listingType,
        dataUrl: jsonUrl,
        isVerified: true, // changed to true so properties are visible immediately
        name: listingData.name || listingData.title || '',
        location: listingData.location || '',
        price: priceForDb,
        subtype: listingData.accommodationType || listingData.subtype || null,
        listingAction: listingData.listingType || null,
        lat: latForDb,
        lng: lngForDb,
      },
    });

    res.status(201).json(newListing);
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllListings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, page = '1', limit = '10', search, price_min, price_max, subtype } = req.query;

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {}; // removed isVerified constraint so all listings are public

    if (type) where.propertyType = type;
    if (subtype) where.subtype = subtype;

    if (price_min || price_max) {
      where.price = {};
      if (price_min) where.price.gte = parseInt(price_min as string, 10);
      if (price_max) where.price.lte = parseInt(price_max as string, 10);
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { location: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [dbListings, totalCount] = await Promise.all([
      prisma.listing.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.listing.count({ where }),
    ]);

    const richDataPromises = dbListings.map(async (listing) => {
      try {
        const richData = await fetchJsonData(listing.dataUrl);
        return { ...listing, ...richData, data: richData, db_id: listing.id, db_verified: listing.isVerified };
      } catch (err) {
        console.error('Error fetching rich data for listing', listing.id, err);
        return { ...listing, data: null, db_id: listing.id, db_verified: listing.isVerified };
      }
    });

    const listingsWithData = await Promise.all(richDataPromises);

    res.json({
      listings: listingsWithData,
      totalCount,
      pages: Math.ceil(totalCount / limitNum),
      currentPage: pageNum,
    });
  } catch (error) {
    console.error('Error fetching all listings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getListingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { listing_id } = req.params as { listing_id: string };

    const listing = await prisma.listing.findUnique({
      where: { id: listing_id },
    });

    if (!listing) {
      res.status(404).json({ error: 'Listing not found' });
      return;
    }

    // Fetch rich data from Cloudinary
    const richData = await fetchJsonData(listing.dataUrl);

    // Combine metadata and rich data
    res.json({
      ...listing,
      ...richData,
      data: richData,
      db_id: listing.id,
      db_verified: listing.isVerified,
    });
  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
