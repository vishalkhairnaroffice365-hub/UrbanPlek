'use client';

import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

export default function GoogleViewMap({ latitude, longitude }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const lat = parseFloat(latitude) || 19.9975;
  const lng = parseFloat(longitude) || 73.7898;

  const center = { lat, lng };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="h-full w-full relative z-[1]">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          draggable: false,
          keyboardShortcuts: false,
        }}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
}
