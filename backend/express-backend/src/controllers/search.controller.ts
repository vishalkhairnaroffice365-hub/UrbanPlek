import { Request, Response } from 'express';
import { prisma } from '../prisma/client';
import { fetchJsonData } from '../services/cloudinary.service';
import { calculateDistance } from '../services/geo.service';

export const searchListings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lat, lng, category, maxDistance = '10' } = req.query;

    if (!lat || !lng) {
      res.status(400).json({ error: 'Latitude and longitude are required' });
      return;
    }

    const userLat = parseFloat(lat as string);
    const userLng = parseFloat(lng as string);
    const radius = parseFloat(maxDistance as string);

    // Filter by category if provided
    const whereClause: any = {
      isVerified: true, // Only return verified listings
    };

    if (category) {
      whereClause.propertyType = category as string;
    }

    // Fetch matching listings from DB
    const dbListings = await prisma.listing.findMany({
      where: whereClause,
      // Consider adding a bounding box filter here in the future for PostGIS optimization
    });

    // Filter by distance in memory (Haversine)
    const nearbyListings = dbListings.filter((listing) => {
      if (listing.lat === null || listing.lng === null) return false;
      const dist = calculateDistance(userLat, userLng, listing.lat, listing.lng);
      return dist <= radius;
    });

    // Fetch rich JSON data from Cloudinary concurrently
    const richDataPromises = nearbyListings.map(async (listing) => {
      const richData = await fetchJsonData(listing.dataUrl);
      return {
        ...listing,
        data: richData,
      };
    });

    const results = await Promise.all(richDataPromises);

    res.json({
      listings: results,
      totalCount: results.length,
      pages: 1,
      currentPage: 1
    });
  } catch (error) {
    console.error('Error searching listings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
