'use client';

import React from 'react';
import './BranchLocator.css';

export interface MapMarkerItem {
  id: string;
  label: string;
  sublabel?: string;
  lat: number;
  lng: number;
}

interface BranchMapProps {
  markers?: MapMarkerItem[];
  center?: [number, number];
  zoom?: number;
  selectedId?: string | null;
  selectedBranchAddress?: string;
  searchQuery?: string;
  activeStateName?: string;
}

export default function BranchMap({
  markers = [],
  center = [18.5, 78.5],
  zoom = 5,
  selectedId = null,
  selectedBranchAddress,
  searchQuery = '',
  activeStateName,
}: BranchMapProps) {
  // Determine map location query and zoom level for Google Maps Embed
  let mapQuery = 'Muthoot Gold Point, India';
  let effectiveZoom = zoom;

  if (selectedId) {
    const foundMarker = markers.find((m) => m.id === selectedId);
    if (selectedBranchAddress) {
      mapQuery = encodeURIComponent(selectedBranchAddress);
      effectiveZoom = 16;
    } else if (foundMarker) {
      mapQuery = `${foundMarker.lat},${foundMarker.lng}`;
      effectiveZoom = 16;
    }
  } else if (searchQuery.trim()) {
    mapQuery = encodeURIComponent(`Muthoot Gold Point, ${searchQuery.trim()}`);
    effectiveZoom = 12;
  } else if (activeStateName) {
    mapQuery = encodeURIComponent(`Muthoot Gold Point, ${activeStateName}`);
    effectiveZoom = 8;
  } else if (center && (center[0] !== 18.5 || center[1] !== 78.5)) {
    mapQuery = `${center[0]},${center[1]}`;
  }

  const embedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=${effectiveZoom}&ie=UTF8&iwloc=&output=embed`;

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

