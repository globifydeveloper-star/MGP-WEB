'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
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

const branchPinIconSelected = L.divIcon({
  className: 'branch-map-pin branch-map-pin-selected',
  html: `
    <svg width="34" height="46" viewBox="0 0 28 38" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 24 14 24s14-13.5 14-24C28 6.268 21.732 0 14 0z" fill="#10182B" />
      <circle cx="14" cy="14" r="6" fill="#F5B301" />
    </svg>
  `,
  iconSize: [34, 46],
  iconAnchor: [17, 46],
  tooltipAnchor: [0, -38],
});

export interface MapMarkerItem {
  id: string;
  label: string;
  sublabel?: string;
  lat: number;
  lng: number;
}

interface BranchMapProps {
  markers: MapMarkerItem[];
  center?: [number, number];
  zoom?: number;
  selectedId?: string | null;
}

// Free on localhost for development. For production domains, set
// NEXT_PUBLIC_STADIA_MAPS_API_KEY (https://client.stadiamaps.com) — Stadia
// blocks unkeyed requests from non-localhost origins.
const stadiaApiKey = process.env.NEXT_PUBLIC_STADIA_MAPS_API_KEY;
const STADIA_TILE_URL = `https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png${
  stadiaApiKey ? `?api_key=${stadiaApiKey}` : ''
}`;
const STADIA_ATTRIBUTION =
  '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> ' +
  '&copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> ' +
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors';

function MapFlyTo({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center[0], center[1], zoom]);
  return null;
}

export default function BranchMap({
  markers,
  center = [18.5, 78.5],
  zoom = 5,
  selectedId = null,
}: BranchMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className="branch-map-container"
    >
      <TileLayer url={STADIA_TILE_URL} attribution={STADIA_ATTRIBUTION} />
      <MapFlyTo center={center} zoom={zoom} />
      {markers.map((item) => {
        const isSelected = item.id === selectedId;
        return (
          <Marker
            key={item.id}
            position={[item.lat, item.lng]}
            icon={isSelected ? branchPinIconSelected : branchPinIcon}
            zIndexOffset={isSelected ? 1000 : 0}
            eventHandlers={{
              click: () => {
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`,
                  '_blank',
                  'noopener,noreferrer'
                );
              },
            }}
          >
            <Tooltip direction="top" offset={[0, isSelected ? -10 : -6]} permanent={isSelected}>
              {item.label} {item.sublabel ? `· ${item.sublabel}` : ''}
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
