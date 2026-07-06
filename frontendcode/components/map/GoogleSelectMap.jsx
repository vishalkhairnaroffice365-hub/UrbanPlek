'use client';

import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, StandaloneSearchBox } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 19.9975,
  lng: 73.7898,
};

export default function GoogleSelectMap({ formData, handleInputChange }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  const searchBoxRef = useRef(null);

  const lat = parseFloat(formData.latitude);
  const lng = parseFloat(formData.longitude);
  const hasCoordinates = !isNaN(lat) && !isNaN(lng);

  const center = hasCoordinates ? { lat, lng } : defaultCenter;

  const onMapLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onMapUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onMapClick = (e) => {
    if (e.latLng) {
      handleInputChange('latitude', e.latLng.lat().toFixed(6));
      handleInputChange('longitude', e.latLng.lng().toFixed(6));
    }
  };

  const onMarkerDragEnd = (e) => {
    if (e.latLng) {
      handleInputChange('latitude', e.latLng.lat().toFixed(6));
      handleInputChange('longitude', e.latLng.lng().toFixed(6));
    }
  };

  const onSearchBoxLoad = (ref) => {
    searchBoxRef.current = ref;
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      if (place.geometry && place.geometry.location) {
        const newLat = place.geometry.location.lat();
        const newLng = place.geometry.location.lng();
        handleInputChange('latitude', newLat.toFixed(6));
        handleInputChange('longitude', newLng.toFixed(6));
        if (map) {
          map.panTo({ lat: newLat, lng: newLng });
          map.setZoom(15);
        }
      }
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="space-y-4">
      <div className="relative z-[1000]">
        <StandaloneSearchBox
          onLoad={onSearchBoxLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Search location in Nashik (Google Maps)..."
            className="h-12 w-full px-4 text-sm rounded-xl shadow-md border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
          />
        </StandaloneSearchBox>
      </div>

      <div className="h-[400px] w-full rounded-xl overflow-hidden border border-slate-100 shadow-sm relative z-[1]">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={hasCoordinates ? 15 : 12}
          onClick={onMapClick}
          onLoad={onMapLoad}
          onUnmount={onMapUnmount}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          {hasCoordinates && (
            <MarkerF
              position={{ lat, lng }}
              draggable={true}
              onDragEnd={onMarkerDragEnd}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
}
