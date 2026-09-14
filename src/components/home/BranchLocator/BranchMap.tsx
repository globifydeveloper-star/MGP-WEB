'use client';

import React from 'react';
import './BranchLocator.css';

interface BranchMapProps {
  selectedBranchAddress?: string;
  searchQuery?: string;
  activeStateName?: string;
  nearCoords?: { lat: number; lng: number } | null;
}

export default function BranchMap({
  selectedBranchAddress,
  searchQuery = '',
  activeStateName,
  nearCoords,
}: BranchMapProps) {
  // Determine map location query and zoom level for Google Maps Embed
  let mapQuery = 'Muthoot Gold Point, India';
  let zoom = 5;

  if (selectedBranchAddress) {
    mapQuery = selectedBranchAddress;
    zoom = 16;
  } else if (searchQuery.trim()) {
    mapQuery = `Muthoot Gold Point, ${searchQuery.trim()}`;
    zoom = 12;
  } else if (activeStateName) {
    mapQuery = `Muthoot Gold Point, ${activeStateName}`;
    zoom = 8;
  } else if (nearCoords) {
    mapQuery = `${nearCoords.lat},${nearCoords.lng}`;
    zoom = 14;
  }

  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="branch-map-container">
      <iframe
        title="Muthoot Gold Point Branch Map"
        className="branch-map-iframe"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={embedUrl}
      />
    </div>
  );
}
