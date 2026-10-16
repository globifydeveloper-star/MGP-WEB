'use client';

import React from 'react';
import './BranchLocator.css';

export interface BranchMapDetails {
  name: string;
  address?: string;
  city: string;
  pincode?: string;
  phone?: string;
  url: string;
}

// Google Maps directions to the same place the branch's "Open in Maps" link searches for
function directionsUrl(mapsSearchUrl: string): string {
  const destination = new URL(mapsSearchUrl).searchParams.get('query') || '';
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

interface BranchMapProps {
  // Shown as a card over the map: the keyless embed can't attach a name/address to a coordinate pin
  selectedBranch?: BranchMapDetails | null;
  selectedBranchAddress?: string;
  // Saved coordinates of the selected branch: the pin lands exactly on it even when Google can't find the address
  selectedBranchCoords?: { lat: number; lng: number } | null;
  searchQuery?: string;
  activeStateName?: string;
  nearCoords?: { lat: number; lng: number } | null;
}

export default function BranchMap({
  selectedBranch,
  selectedBranchAddress,
  selectedBranchCoords,
  searchQuery = '',
  activeStateName,
  nearCoords,
}: BranchMapProps) {
  // Determine map location query and zoom level for Google Maps Embed
  let mapQuery = 'Muthoot Gold Point - We Buy Gold, Ernakulam';
  let zoom = 17;

  if (selectedBranchCoords) {
    mapQuery = `${selectedBranchCoords.lat},${selectedBranchCoords.lng}`;
    zoom = 17;
  } else if (selectedBranchAddress) {
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
      {selectedBranch && (
        <div className="branch-map-card">
          <strong className="branch-map-card-name">{selectedBranch.name}</strong>
          <span className="branch-map-card-address">
            {[selectedBranch.address, selectedBranch.city].filter(Boolean).join(', ')}
            {selectedBranch.pincode ? ` - ${selectedBranch.pincode}` : ''}
          </span>
          {selectedBranch.phone && (
            <a className="branch-map-card-phone" href={`tel:${selectedBranch.phone}`}>
              📞 {selectedBranch.phone}
            </a>
          )}
          <div className="branch-map-card-actions">
            <a className="branch-map-card-btn" href={selectedBranch.url} target="_blank" rel="noopener noreferrer">
              Open in Maps
            </a>
            <a className="branch-map-card-btn branch-map-card-btn-outline" href={directionsUrl(selectedBranch.url)} target="_blank" rel="noopener noreferrer">
              Directions
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
