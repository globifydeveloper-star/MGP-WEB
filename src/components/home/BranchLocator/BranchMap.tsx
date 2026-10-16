'use client';

import React from 'react';
import './BranchLocator.css';

interface BranchMapProps {
  selectedBranchAddress?: string;
  // Saved coordinates of the selected branch (src/data/branchCoordinates.json): steer Google's search
  // to the right spot, and pin it there if the address can't be found
  selectedBranchCoords?: { lat: number; lng: number } | null;
  searchQuery?: string;
  activeStateName?: string;
  nearCoords?: { lat: number; lng: number } | null;
}

export default function BranchMap({
  selectedBranchAddress,
  selectedBranchCoords,
  searchQuery = '',
  activeStateName,
  nearCoords,
}: BranchMapProps) {
  // Determine map location query and zoom level for Google Maps Embed
  let mapQuery = 'Muthoot Gold Point - We Buy Gold, Ernakulam';
  let zoom = 17;

  if (selectedBranchAddress) {
    // Searching by name/address makes Google show its place card (name, address, rating, Open in Maps)
    mapQuery = selectedBranchAddress;
    zoom = 17;
  } else if (selectedBranchCoords) {
    mapQuery = `${selectedBranchCoords.lat},${selectedBranchCoords.lng}`;
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

  // `ll` centres the search on the branch's saved coordinates so Google picks the right listing
  const near = selectedBranchAddress && selectedBranchCoords ? `&ll=${selectedBranchCoords.lat},${selectedBranchCoords.lng}` : '';
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}${near}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

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
