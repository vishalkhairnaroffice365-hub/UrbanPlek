'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoCheckmarkCircle, IoLocationSharp, IoArrowForward, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { BACKEND_URL } from '../../constants/constants';

const PropertyCard = ({
  id,
  title,
  location,
  specs,
  price,
  image,
  isVerified = true,
}) => {
  return (
    <Link href={`/listing/${id}`} className="min-w-[280px] sm:min-w-[300px] md:min-w-[calc(33.333%-1rem)] snap-start group/card block">
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden flex flex-col transition-all duration-500 hover:shadow-lg hover:-translate-y-0.5 h-full">
        <div className="relative aspect-square overflow-hidden">
          {isVerified && (
            <div className="absolute top-2 left-2 z-10">
              <span className="bg-white/95 backdrop-blur px-2 py-0.5 rounded text-[8px] font-extrabold text-primary-navy flex items-center gap-1 shadow-sm border border-gray-100/50">
                <IoCheckmarkCircle className="text-xs text-accent-blue" />
                VERIFIED
              </span>
            </div>
          )}
          <Image
            alt={title}
            src={image}
            fill
            className="object-cover transition-transform duration-1000 group-hover/card:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            referrerPolicy="no-referrer"
            unoptimized
          />
        </div>
        <div className="p-4 flex flex-col gap-2.5 flex-1">
          <div>
            <h3 className="text-base font-bold tracking-tight mb-1 text-primary-navy">
              {title}
            </h3>
            <div className="flex items-center gap-1 text-gray-500">
              <IoLocationSharp className="text-sm" />
              <span className="text-[11px] font-medium">{location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            {specs.map((spec, index) => (
              <div key={index} className="flex items-center gap-0.5">
                <span className="text-sm text-gray-400">
                  {spec.icon}
                </span>
                <span className="text-[11px] font-semibold text-primary-navy">
                  {spec.label}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              <span className="text-[7px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">
                {price.label}
              </span>
              <span className="text-xl font-black text-primary-navy tracking-tight">
                ₹{price.value}
                {price.unit && (
                  <span className="text-[10px] text-gray-400 font-bold ml-0.5 uppercase">
                    {price.unit}
                  </span>
                )}
              </span>
            </div>
            <div
              className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-300 group-hover/card:bg-primary-navy group-hover/card:border-primary-navy group-hover/card:text-[#2b6cee] flex-shrink-0"
              aria-label={`View details for ${title}`}
            >
              <IoArrowForward className="text-xs" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const VerifiedProjects = () => {
  const [residentialData, setResidentialData] = useState([]);
  const [landData, setLandData] = useState([]);
  const [commercialData, setCommercialData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const [resResponse, landResponse, comResponse] = await Promise.all([
          fetch(`${BACKEND_URL}/api/listings?type=residential&limit=5`),
          fetch(`${BACKEND_URL}/api/listings?type=land&limit=5`),
          fetch(`${BACKEND_URL}/api/listings?type=commercial&limit=5`)
        ]);
        
        const resData = await resResponse.json();
        const landData = await landResponse.json();
        const comData = await comResponse.json();
        
        const formatProperty = (item) => ({
          id: item.db_id,
          title: item.title || 'Untitled Property',
          location: item.location || 'Nashik',
          type: item.propertyType || item.type,
          specs: [
            ...(item.bhk ? [{ icon: '🛏️', label: item.bhk }] : []),
            ...((item.area || item.plotArea || item.plot_area || item.size || item.built_up_area || item.carpet_area) ? [{ icon: '📐 (sq.ft)', label: item.area || item.plotArea || item.plot_area || item.size || item.built_up_area || item.carpet_area }] : []),
          ].slice(0, 2),
          price: {
            label: item.listingType === 'Rent' ? 'Rent' : 'Starting From',
            value: item.price || 'Contact Us',
          },
          image: (item.images && item.images.length > 0) 
            ? item.images[0] 
            : 'https://placehold.co/600x400/eeeeee/cccccc?text=No+Image',
          isVerified: item.db_verified,
        });

        setResidentialData(resData.listings ? resData.listings.map(formatProperty) : []);
        setLandData(landData.listings ? landData.listings.map(formatProperty) : []);
        setCommercialData(comData.listings ? comData.listings.map(formatProperty) : []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const SECTIONS_CONFIG = [
    {
      id: 'residential',
      title: 'Verified Residential Projects',
      subtitle: 'Curated Collection',
      data: residentialData,
    },
    {
      id: 'land',
      title: 'Verified Lands & Plots',
      subtitle: 'High Growth Assets',
      data: landData,
    },
    {
      id: 'commercial',
      title: 'Verified Commercial Projects',
      subtitle: 'Prime Business Spaces',
      data: commercialData,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-4 py-8">
      {SECTIONS_CONFIG.map((section) => (
        <Section key={section.id} {...section} loading={loading} />
      ))}
      <Link
        href="/listings"
        className="px-8 py-3 rounded-full border-2 border-primary-navy text-primary-navy font-bold text-sm flex items-center gap-2 hover:bg-blue-50 hover:border-primary-navy transition-all"
      >
        Explore All Listings
        <IoArrowForward className="text-base" />
      </Link>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="min-w-[220px] sm:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(33.333%-1rem)] snap-start">
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden flex flex-col h-full animate-pulse">
      <div className="relative aspect-square bg-gray-200" />
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="flex items-center gap-2.5 mt-1">
          <div className="h-3 bg-gray-200 rounded w-12" />
          <div className="h-3 bg-gray-200 rounded w-12" />
        </div>
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div className="flex flex-col gap-1 w-1/2">
            <div className="h-2 bg-gray-200 rounded w-1/3" />
            <div className="h-5 bg-gray-200 rounded w-2/3" />
          </div>
          <div className="h-7 w-7 rounded-full bg-gray-200 flex-shrink-0" />
        </div>
      </div>
    </div>
  </div>
);

const Section = ({ title, subtitle, data = [], loading = false }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full max-w-[1440px] px-4 md:px-12 relative mb-6">
      <div className="px-1 mb-5 flex justify-between items-end">
        <div>
          <span className="text-primary-navy font-extrabold text-[10px] tracking-[0.4em] uppercase">
            {subtitle}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-2 text-primary-navy">
            {title}
          </h2>
        </div>
      </div>
      <div className="relative group/section">
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="absolute -left-2 md:-left-6 top-[40%] -translate-y-1/2 z-20 size-9 md:size-12 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200 transition-all hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg active:scale-95 opacity-0 group-hover/section:opacity-100 disabled:opacity-0"
        >
          <IoChevronBack className="text-xl text-primary-navy" />
        </button>
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="absolute -right-2 md:-right-6 top-[40%] -translate-y-1/2 z-20 size-9 md:size-12 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200 transition-all hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg active:scale-95 opacity-0 group-hover/section:opacity-100"
        >
          <IoChevronForward className="text-xl text-primary-navy" />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto no-scrollbar gap-4 pb-6 snap-x snap-mandatory px-1"
        >
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => <SkeletonCard key={idx} />)
          ) : data.length > 0 ? (
            data.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))
          ) : (
            <div className="text-gray-500 text-sm py-4">No properties available</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VerifiedProjects;
export { PropertyCard, Section };
