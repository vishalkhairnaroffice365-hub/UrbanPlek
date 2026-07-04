'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaMapMarkerAlt, FaBuilding, FaCheckCircle, FaUsers } from 'react-icons/fa';
import { IoTime, IoSchool } from 'react-icons/io5';
import heroBG from "../../assets/studentsportal/hero.png"
import Header from '../application/header';


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
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=Nashik ${encodeURIComponent(query)}&countrycodes=in&limit=5`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data);
        }
      } catch (err) {
        console.error(err);
      }
    }, 400);

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
        className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-100 bg-white text-xs font-semibold focus:border-blue-600/30 focus:ring-0 transition-all text-slate-900 outline-none"
      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-[2000] w-full bg-white border border-slate-200 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto left-0 right-0">
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
  const router = useRouter();
  const [locationData, setLocationData] = useState(null);
  const [type, setType] = useState('');
  const [timeFilter, setTimeFilter] = useState('');

  const isFormValid = type !== '' && timeFilter.trim() !== '' && locationData !== null;

  const handleSearch = () => {
    if (!isFormValid) {
      alert('Please enter a location, select a property type, and specify a time filter.');
      return;
    }

    let hash = '';
    if (type === 'Hostel') hash = 'hostels';
    else if (type === 'PG') hash = 'pgs';
    else if (type === 'Flat') hash = 'flats';

    const queryParams = new URLSearchParams({
      lat: locationData.lat,
      lng: locationData.lng,
      type: type,
      time_filter: timeFilter
    });
    router.push(`?${queryParams.toString()}#${hash}`);
  };

  return (
      <Header
        bgImage={heroBG}
        bgAlt="Map background of Nashik city"
        badge="Premium Student Living in Nashik"
        title={
          <>
            Discover Your Ideal <br />
            <span className="text-blue-600">Student Living</span>
          </>
        }
        description="Verified hostels, PGs & flats within walking distance of Nashik's top colleges. Tailored for the modern student."
        footer={
          <div className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
            <FeatureCard 
              icon={<FaCheckCircle className="h-5 w-5 text-blue-600" />}
              title="Verified Housing"
              description="Every property is physically verified by our team."
            />
            <FeatureCard 
              icon={<FaMapMarkerAlt className="h-5 w-5 text-blue-600" />}
              title="Near Top Colleges"
              description="Prime locations near KBT, KKW, and MET colleges."
            />
            <FeatureCard 
              icon={<FaUsers className="h-5 w-5 text-blue-600" />}
              title="Student Community"
              description="Join a vibrant network of fellow Nashik students."
            />
          </div>
        }
      >
        {/* Search Bar */}
        <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-xl bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.08)] ring-1 ring-slate-100 md:flex-row md:items-end">
          
          {/* Destination Input */}
          <div className="flex flex-col flex-[2] text-left">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 ml-1.5">College / Locality</label>
            <div className="relative group">
              <IoSchool className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors text-base z-10 pointer-events-none" />
              <DestinationAutocomplete 
                onPlaceSelect={(data) => setLocationData(data)}
                placeholder="e.g. KTHM College" 
              />
            </div>
          </div>

          {/* Time Filter Input */}
          <div className="flex flex-col flex-1 text-left">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 ml-1.5">Time (mins)</label>
            <div className="relative group">
              <IoTime className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors text-base pointer-events-none" />
              <input 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-100 bg-white text-xs font-semibold focus:border-blue-600/30 focus:ring-0 transition-all text-slate-900 outline-none" 
                placeholder="Ex: 10 mins" 
                type="number"
                min="1"
              />
            </div>
          </div>

          {/* Type Input */}
          <div className="flex flex-col flex-1 text-left">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 ml-1.5">Property Type</label>
            <div className="relative group">
              <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors text-sm pointer-events-none" />
              <select 
                className="w-full h-10 pl-9 pr-4 rounded-lg border border-slate-100 bg-white text-xs font-semibold focus:border-blue-600/30 focus:ring-0 transition-all appearance-none cursor-pointer text-slate-900 outline-none"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="" disabled>Select Type</option>
                <option value="Hostel">Hostel</option>
                <option value="PG">PG</option>
                <option value="Flat">Flat</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex-none mt-2 md:mt-0">
            <button 
              onClick={handleSearch}
              disabled={!isFormValid}
              className="flex w-full md:w-auto h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              <FaSearch className="h-3.5 w-3.5" />
              <span className="text-xs uppercase tracking-wider">Search</span>
            </button>
          </div>
        </div>
      </Header>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group flex flex-col items-center gap-3 rounded-xl border border-white/60 bg-white/40 p-4 text-center backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
        {icon}
      </div>
      <div>
        <h3 className="mb-1 text-sm font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}
