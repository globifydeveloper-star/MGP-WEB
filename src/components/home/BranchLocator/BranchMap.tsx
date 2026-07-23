'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { BranchCity } from './BranchLocator';
import './BranchLocator.css';

const branchPinIcon = L.divIcon({
  className: 'branch-map-pin',
  html: `
    <svg width="28" height="38" viewBox="0 0 28 38" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 24 14 24s14-13.5 14-24C28 6.268 21.732 0 14 0z" fill="#F5B301" />
      <circle cx="14" cy="14" r="6" fill="#FFFFFF" />
    </svg>
  `,
  iconSize: [28, 38],
  iconAnchor: [14, 38],
  tooltipAnchor: [0, -32],
});

interface BranchMapProps {
  cities: BranchCity[];
}

export default function BranchMap({ cities }: BranchMapProps) {
  return (
    <MapContainer
      center={[16.5, 77.5]}
      zoom={5}
      scrollWheelZoom={false}
      className="branch-map-container"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {cities.map((branch) => (
        <Marker key={branch.city} position={[branch.lat, branch.lng]} icon={branchPinIcon}>
          <Tooltip direction="top" offset={[0, -6]}>
            {branch.city} · {branch.locations} location{branch.locations !== 1 ? 's' : ''}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
