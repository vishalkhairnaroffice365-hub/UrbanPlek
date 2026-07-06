'use client'

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { BACKEND_URL } from '../../constants/constants';

const SkeletonCard = () => (
  <div className="relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
    <div className="w-full aspect-[4/3] bg-gray-200"></div>
    <div className="w-full p-4 flex flex-col gap-3">
      <div className="space-y-2">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="pt-3 border-t border-gray-100 mt-auto">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  </div>
);

const ResidentialCard = ({ listing }) => {
  const { db_id, title, name, location, price, db_verified, images, listingType } = listing;
  const image = images && images.length > 0 ? images[0] : 'https://placehold.co/600x400';
  const displayTitle = title || name || "Untitled Property";

  return (
    <Link href={`/listing/${db_id}`} className="relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-urban-fade-up h-full">
      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {db_verified && (
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1.5 flex items-center gap-1.5 shadow-sm border border-white/20">
            <FaCheckCircle className="w-3.5 h-3.5 text-[#2b6cee]" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2b6cee]">Verified</span>
          </div>
        )}
        <div
          className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url("${image}")` }}
        />
      </div>

      {/* Content Section */}
      <div className="w-full p-4 flex flex-col gap-3 bg-white flex-grow">
        <div className="space-y-2">
          <h3 className="text-lg font-extrabold leading-tight uppercase tracking-tight text-black">
            {displayTitle}
          </h3>
          <div className="flex items-center gap-1.5 text-[#4A5568] text-sm font-medium">
            <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#2b6cee]/70" />
            <span>{location || "Location not provided"}</span>
          </div>
          {listingType && (
            <div className="inline-flex mt-1 px-2.5 py-1 bg-blue-50 text-[#2b6cee] rounded-md text-[10px] font-extrabold uppercase tracking-widest w-max">
              For {listingType === 'Sell' ? 'Sale' : listingType}
            </div>
          )}
        </div>
        <div className="pt-3 border-t border-gray-100 mt-auto">
          <p className="text-black text-2xl font-extrabold tracking-tighter">
            ₹{(price || 0).toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default function ResidentialListings() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [priceFilter, setPriceFilter] = useState('All Prices');
  const [typeFilter, setTypeFilter] = useState('Any Type');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const category = searchParams.get('category');
    const timeFilter = searchParams.get('time_filter');
    const listingAction = searchParams.get('listing_action');

    if (lat && lng && category === 'Homes') {
      setSearchLocation({ lat, lng, timeFilter, listingAction });
    }
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const parsePriceFilter = (filter) => {
    if (filter === 'All Prices') return {};
    if (filter.includes('+')) {
      const min = parseInt(filter.replace(/[^0-9]/g, ''), 10);
      return { price_min: min };
    }
    const parts = filter.split('-').map(p => parseInt(p.replace(/[^0-9]/g, ''), 10));
    return { price_min: parts[0], price_max: parts[1] };
  };

  const fetchListings = useCallback(async (currentPage, isLoadMore = false) => {
    if (!isLoadMore) setIsLoading(true);
    
    const params = new URLSearchParams({
      type: 'residential',
      page: currentPage,
      limit: currentPage === 1 ? 5 : 8,
    });

    if (debouncedSearchQuery) {
      params.append('search', debouncedSearchQuery);
    }

    if (searchLocation) {
      params.append('lat', searchLocation.lat);
      params.append('lng', searchLocation.lng);
      if (searchLocation.timeFilter) {
        params.append('time_filter', searchLocation.timeFilter);
      } else {
        params.append('radius', 1.0); // 1km default radius search
      }
      if (searchLocation.listingAction) {
        params.append('listing_action', searchLocation.listingAction);
      }
    }

    const priceParams = parsePriceFilter(priceFilter);
    if (priceParams.price_min) params.append('price_min', priceParams.price_min);
    if (priceParams.price_max) params.append('price_max', priceParams.price_max);
    
    if (typeFilter !== 'Any Type') params.append('subtype', typeFilter);

    let endpointPath = '/api/listings';
    if (searchLocation && searchLocation.timeFilter) {
      endpointPath = '/api/search';
    }

    try {
      const response = await fetch(`${BACKEND_URL}${endpointPath}?${params.toString()}`);
      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      
      setListings(prev => isLoadMore ? [...prev, ...data.listings] : data.listings);
      setTotalPages(data.pages);
      setPage(currentPage);

    } catch (error) {
      console.error("Failed to fetch listings:", error);
      setListings([]);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchQuery, priceFilter, typeFilter, searchLocation]);

  useEffect(() => {
    setPage(1);
    fetchListings(1);
  }, [debouncedSearchQuery, searchLocation, fetchListings]);

  const handleLoadMore = () => {
    fetchListings(page + 1, true);
  };

  return (
    <div className="min-h-screen flex flex-col text-[#111318] relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(to right, #2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <main className="relative z-10 flex-1 flex justify-center py-8 px-4 lg:px-8">
        <div className="flex flex-col max-w-[1100px] w-full">
          
          {/* Header Section */}
          <div id="homes" className="flex flex-col gap-8 mb-10 items-start scroll-mt-20">
            <div className="animate-urban-fade-left">
              <h2 className="text-[#111318] text-4xl font-extrabold tracking-tight">Top Residential Properties</h2>
              <div className="h-1.5 bg-[#2b6cee] mt-3 animate-urban-expand delay-300" />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading && listings.length === 0 ? (
              Array.from({ length: 5 }).map((_, index) => <SkeletonCard key={index} />)
            ) : listings.length > 0 ? (
              listings.map((listing) => <ResidentialCard key={listing.db_id} listing={listing} />)
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500 font-medium">No residential properties found matching your criteria.</p>
                <p className="text-gray-400 text-sm">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>

          {/* Load More */}
          {page < totalPages && !isLoading && (
            <div className="flex py-6 justify-center">
              <button onClick={handleLoadMore} disabled={isLoading} className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-full border-2 border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-300 h-12 px-8 text-xs font-extrabold uppercase tracking-[0.2em] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? 'Loading...' : 'Load More'}</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}