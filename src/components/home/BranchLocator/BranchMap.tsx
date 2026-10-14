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
  let mapQuery = 'Muthoot Gold Point - We Buy Gold, Ernakulam';
  let zoom = 17;

  if (selectedBranchAddress) {
    mapQuery = selectedBranchAddress;
    zoom = 17;
  } else if (nearCoords) {
    mapQuery = `${nearCoords.lat},${nearCoords.lng}`;
    zoom = 15;
  } else if (activeStateName) {
    mapQuery = `Muthoot Gold Point - We Buy Gold, ${activeStateName}`;
    zoom = 14;
  } else if (searchQuery.trim()) {
    mapQuery = `Muthoot Gold Point - We Buy Gold, ${searchQuery.trim()}`;
    zoom = 15;
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
