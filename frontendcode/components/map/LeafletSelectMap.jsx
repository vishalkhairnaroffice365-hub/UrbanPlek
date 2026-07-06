'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet marker icon in Next.js
const customIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Helper component to center map on search/click
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, map]);
  return null;
}

// Click listener component
function MapEventsHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function LeafletSelectMap({ formData, handleInputChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const latitude = parseFloat(formData.latitude) || 19.9975;
  const longitude = parseFloat(formData.longitude) || 73.7898;
  const hasCoordinates = !!(formData.latitude && formData.longitude);

  // Close search results dropdown on click outside
  useEffect(() => {
    const clickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

  const handleSearch = async (query) => {
    if (query.length < 3) return;
    try {
      // Using Photon by Komoot as it's more permissive than Nominatim
      const response = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(query)} Nashik&limit=5`
      );
      if (response.ok) {
        const geojson = await response.json();
        const data = geojson.features.map(f => ({
          lat: f.geometry.coordinates[1].toString(),
          lon: f.geometry.coordinates[0].toString(),
          display_name: [f.properties.name, f.properties.street, f.properties.city, f.properties.state, f.properties.country].filter(Boolean).join(', ')
        }));
        setSearchResults(data);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handleResultSelect = (result) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    handleInputChange('latitude', lat.toFixed(6));
    handleInputChange('longitude', lng.toFixed(6));
    setShowDropdown(false);
    setSearchQuery(result.display_name);
  };

  const handleMapClick = (lat, lng) => {
    handleInputChange('latitude', lat.toFixed(6));
    handleInputChange('longitude', lng.toFixed(6));
  };

  const handleMarkerDragEnd = (e) => {
    const latlng = e.target.getLatLng();
    handleInputChange('latitude', latlng.lat.toFixed(6));
    handleInputChange('longitude', latlng.lng.toFixed(6));
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative z-[1000]" ref={dropdownRef}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            const val = e.target.value;
            setSearchQuery(val);
            if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
            searchTimeoutRef.current = setTimeout(() => {
              handleSearch(val);
            }, 600);
          }}
          placeholder="Search location in Nashik (Leaflet/OSM)..."
          className="h-12 w-full px-4 text-sm rounded-xl shadow-md border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
        />
        {showDropdown && searchResults.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-[2000]">
            {searchResults.map((result, idx) => (
              <li
                key={idx}
                onClick={() => handleResultSelect(result)}
                className="px-4 py-3 hover:bg-slate-50 cursor-pointer text-xs text-slate-700 truncate"
              >
                {result.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Map Container */}
      <div className="h-[400px] w-full rounded-xl overflow-hidden border border-slate-100 shadow-sm relative z-[1]">
        <MapContainer
          center={[latitude, longitude]}
          zoom={hasCoordinates ? 15 : 12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController center={[latitude, longitude]} zoom={hasCoordinates ? 15 : 12} />
          <MapEventsHandler onMapClick={handleMapClick} />
          {hasCoordinates && (
            <Marker
              position={[latitude, longitude]}
              icon={customIcon}
              draggable={true}
              eventHandlers={{ dragend: handleMarkerDragEnd }}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}
