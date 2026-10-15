'use client';

import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './BranchLocator.css';

export interface MapBranch {
  id: string;
  name: string;
  address: string;
  city: string;
  pincode?: string;
  url: string;
  lat: number;
  lng: number;
}

interface BranchMapProps {
  branches: MapBranch[];
  selectedId?: string | null;
  nearCoords?: { lat: number; lng: number } | null;
  onSelect?: (id: string) => void;
}

const INDIA_CENTER: [number, number] = [22.5, 79];

const pinSvg = (fill: string, dot: string) => `
  <svg width="28" height="38" viewBox="0 0 28 38" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 24 14 24s14-13.5 14-24C28 6.268 21.732 0 14 0z" fill="${fill}" stroke="#10182B" stroke-width="1"/>
    <circle cx="14" cy="14" r="6" fill="${dot}" />
  </svg>`;

const branchPinIcon = L.divIcon({
  className: 'branch-map-pin',
  html: pinSvg('#F5B301', '#FFFFFF'),
  iconSize: [28, 38],
  iconAnchor: [14, 38],
  popupAnchor: [0, -34],
});

const branchPinIconSelected = L.divIcon({
  className: 'branch-map-pin branch-map-pin-selected',
  html: pinSvg('#10182B', '#F5B301'),
  iconSize: [28, 38],
  iconAnchor: [14, 38],
  popupAnchor: [0, -34],
});

// Branches geocoded only to their locality share a point; fan them out in a small
// ring (~150 m) so every pin stays visible and clickable.
function spreadOverlapping(branches: MapBranch[]): MapBranch[] {
  const groups = new Map<string, MapBranch[]>();
  for (const b of branches) {
    const key = `${b.lat.toFixed(4)},${b.lng.toFixed(4)}`;
    groups.set(key, [...(groups.get(key) || []), b]);
  }
  return [...groups.values()].flatMap((group) =>
    group.length === 1
      ? group
      : group.map((b, i) => {
          const angle = (2 * Math.PI * i) / group.length;
          return { ...b, lat: b.lat + 0.0014 * Math.sin(angle), lng: b.lng + 0.0014 * Math.cos(angle) };
        })
  );
}

// Re-frames the map whenever the visible set of branches, the selection or the visitor's location changes.
function FitView({ branches, selected, nearCoords }: { branches: MapBranch[]; selected: MapBranch | null; nearCoords?: { lat: number; lng: number } | null }) {
  const map = useMap();
  const boundsKey = branches.map((b) => b.id).join('|');

  useEffect(() => {
    if (selected) {
      map.flyTo([selected.lat, selected.lng], Math.max(map.getZoom(), 14), { duration: 0.8 });
      return;
    }
    const points: [number, number][] = branches.map((b) => [b.lat, b.lng]);
    if (nearCoords) {
      // Visitor's location plus their closest branch
      const here = L.latLng(nearCoords.lat, nearCoords.lng);
      const nearest = [...branches].sort((a, b) => here.distanceTo([a.lat, a.lng]) - here.distanceTo([b.lat, b.lng]))[0];
      const frame: [number, number][] = [[nearCoords.lat, nearCoords.lng]];
      if (nearest) frame.push([nearest.lat, nearest.lng]);
      map.flyToBounds(L.latLngBounds(frame), { padding: [60, 60], maxZoom: 14, duration: 0.8 });
      return;
    }
    if (points.length === 0) {
      map.flyTo(INDIA_CENTER, 5, { duration: 0.8 });
    } else if (points.length === 1) {
      map.flyTo(points[0], 14, { duration: 0.8 });
    } else {
      map.flyToBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 13, duration: 0.8 });
    }
    // boundsKey captures the branch set; selected/nearCoords identity changes on each selection
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, boundsKey, selected?.id, nearCoords?.lat, nearCoords?.lng]);

  return null;
}

export default function BranchMap({ branches, selectedId, nearCoords, onSelect }: BranchMapProps) {
  const pins = useMemo(() => spreadOverlapping(branches), [branches]);
  const selected = pins.find((b) => b.id === selectedId) || null;

  return (
    <div className="branch-map-container">
      <MapContainer center={INDIA_CENTER} zoom={5} scrollWheelZoom={false} className="branch-map-leaflet">
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
          maxZoom={19}
        />
        <FitView branches={pins} selected={selected} nearCoords={nearCoords} />
        {nearCoords && (
          <CircleMarker
            center={[nearCoords.lat, nearCoords.lng]}
            radius={8}
            pathOptions={{ color: '#FFFFFF', weight: 3, fillColor: '#2F80ED', fillOpacity: 1 }}
          />
        )}
        {pins.map((b) => (
          <Marker
            key={b.id}
            position={[b.lat, b.lng]}
            icon={b.id === selectedId ? branchPinIconSelected : branchPinIcon}
            zIndexOffset={b.id === selectedId ? 1000 : 0}
            eventHandlers={{ click: () => onSelect?.(b.id) }}
          >
            <Popup>
              <div className="branch-map-popup">
                <strong>{b.name}</strong>
                <span>
                  {b.address}, {b.city}
                  {b.pincode ? ` - ${b.pincode}` : ''}
                </span>
                <a href={b.url} target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
