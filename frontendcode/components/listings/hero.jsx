'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IoSearchSharp, IoSchool, IoTime, IoWallet } from 'react-icons/io5';

import Header from '../home/header';

const CATEGORIES = ['Homes', 'Lands', 'Commercial'];

const DestinationAutocomplete = ({ onPlaceSelect, placeholder }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    const delayDebounce = setTimeout(async () => {
      try {
        const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)} Nashik&limit=5`);
        if (res.ok) {
          const geojson = await res.json();
          const data = geojson.features.map(f => ({
            place_id: f.properties.osm_id || Math.random(),
            display_name: [f.properties.name, f.properties.street, f.properties.city, f.properties.state, f.properties.country].filter(Boolean).join(', '),
            lat: f.geometry.coordinates[1].toString(),
            lon: f.geometry.coordinates[0].toString(),
          }));
          setSuggestions(data);
        }
      } catch (err) {
        console.error(err);
      }
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
          if (!e.target.value) onPlaceSelect(null);
        }}
        onFocus={() => setShowDropdown(true)}
        placeholder={placeholder}
        className="w-full h-10 pl-10 pr-4 rounded-lg border-2 border-gray-100 bg-white text-xs font-semibold focus:border-primary/30 focus:ring-0 transition-all text-slate-900 outline-none"
      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-[2000] w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto left-0 right-0">
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onClick={() => {
                setQuery(item.display_name);
                setShowDropdown(false);
                onPlaceSelect({
                  address: item.display_name,
                  lat: parseFloat(item.lat),
                  lng: parseFloat(item.lon)
                });
              }}
              className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-xs text-slate-700 truncate text-left"
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function Hero() {
  const [activeCategory, setActiveCategory] = useState('Homes');
  const [listingAction, setListingAction] = useState('');
  const [timeFilter, setTimeFilter] = useState('');
  const [locationData, setLocationData] = useState(null);

  const router = useRouter();
  const isFormValid = listingAction !== '' && timeFilter.trim() !== '' && locationData !== null;

  const handleSearch = () => {
    if (isFormValid) {
      const queryParams = new URLSearchParams({
        lat: locationData.lat,
        lng: locationData.lng,
        category: activeCategory,
        listing_action: listingAction,
        time_filter: timeFilter
      });
      router.push(`?${queryParams.toString()}#${activeCategory.toLowerCase()}`);
    }
  };

  return (
      <div className="relative pt-32 pb-16 bg-slate-50 overflow-hidden min-h-[300px] flex items-center">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(to right, #2563eb 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}>
        </div>
  
        <Header />
  
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          {/* Search Box */}
          <div className="w-full max-w-5xl bg-white/95 backdrop-blur-md rounded-xl shadow-[0_15px_30px_-8px_rgba(0,0,0,0.08)] p-4 md:p-5 border border-white">
            <div className="flex justify-center mb-5">
              <div className="inline-flex bg-gray-100 p-1 rounded-lg">
                {CATEGORIES.map((category) => (
                  <label 
                    key={category}
                    className={`flex cursor-pointer items-center justify-center px-6 py-2 rounded-md transition-all font-extrabold text-xs ${
                      activeCategory === category 
                        ? 'bg-white shadow-md text-primary' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <span className="capitalize">{category}</span>
                    <input 
                      type="radio" 
                      name="category" 
                      value={category} 
                      className="hidden"
                      checked={activeCategory === category}
                      onChange={() => setActiveCategory(category)}
                    />
                  </label>
                ))}
              </div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-0.5 items-end">
              {/* Property For Input */}
              <div className="flex flex-col text-left md:col-span-3 lg:col-span-2">
                <label className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-1.5 ml-1.5">Property For</label>
                <div className="relative group">
                  <IoWallet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-base" />
                  <select 
                    value={listingAction}
                    onChange={(e) => setListingAction(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-lg border-2 border-gray-100 bg-white text-xs font-semibold focus:border-primary/30 focus:ring-0 transition-all appearance-none cursor-pointer text-slate-900 outline-none"
                  >
                    <option value="" disabled>Select Type</option>
                    <option value="Rent">Rent</option>
                    <option value="Sale">Sale</option>
                  </select>
                </div>
              </div>
  
              {/* Time Filter Input */}
              <div className="flex flex-col text-left md:col-span-3 lg:col-span-2">
                <label className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-1.5 ml-1.5">Time Filter (in minutes)</label>
                <div className="relative group">
                  <IoTime className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-base" />
                  <input 
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-lg border-2 border-gray-100 bg-white text-xs font-semibold focus:border-primary/30 focus:ring-0 transition-all text-slate-900 outline-none" 
                    placeholder="Ex: 10 mins" 
                    type="number"
                    min="1"
                  />
                </div>
              </div>
  
              {/* Destination Input */}
              <div className="flex flex-col text-left md:col-span-6 lg:col-span-6">
                <label className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-1.5 ml-1.5">Location/Destination</label>
                <div className="relative group">
                  <IoSchool className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-base z-10 pointer-events-none" />
                  <DestinationAutocomplete 
                    onPlaceSelect={(data) => setLocationData(data)}
                    placeholder="e.g. KTHM College" 
                  />
                </div>
              </div>
  
              {/* Explore Now Button */}
              <div className="md:col-span-12 lg:col-span-2 mt-2 lg:mt-0">
                <button 
                  onClick={handleSearch}
                  disabled={!isFormValid}
                  className={`w-full h-10 text-white rounded-lg font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md transform ${
                    isFormValid 
                      ? 'bg-primary hover:bg-blue-600 shadow-primary/30 hover:scale-[1.02]' 
                      : 'bg-gray-400 cursor-not-allowed opacity-70'
                  }`}
                >
                  <IoSearchSharp className="text-base" />
                  <span>Explore Now</span>
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}