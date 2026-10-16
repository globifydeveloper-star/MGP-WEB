'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer, SuperClusterAlgorithm, type Renderer } from '@googlemaps/markerclusterer';
import './BranchLocator.css';

// Google Maps JavaScript API (billed to the Google Cloud project that owns this key).
// Without a key the map falls back to the keyless Google embed, which can show one place at a time.
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
// Advanced Markers need a Map ID (Google Cloud console > Map Management); DEMO_MAP_ID works for testing.
const GOOGLE_MAPS_MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID';

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
  onSelect?: (id: string | null) => void;
  // Group nearby pins into stacks (used for the all-India view; state/search views show every pin)
  cluster?: boolean;
}

const INDIA_CENTER = { lat: 22.5, lng: 79 };
// The map is kept to India: it can't be dragged outside this box or zoomed out past it
const INDIA_BOUNDS = { south: 6.5, west: 68, north: 37.2, east: 97.4 };

const PIN_PATH = 'M14 0C6.268 0 0 6.268 0 14c0 10.5 14 24 14 24s14-13.5 14-24C28 6.268 21.732 0 14 0z';

function BranchPin({ selected }: { selected: boolean }) {
  return (
    <svg className="branch-map-pin" width="28" height="38" viewBox="0 0 28 38" aria-hidden="true">
      <path d={PIN_PATH} fill={selected ? '#10182B' : '#F5B301'} stroke="#10182B" strokeWidth="1" />
      <circle cx="14" cy="14" r="6" fill={selected ? '#F5B301' : '#FFFFFF'} />
    </svg>
  );
}

// A group of nearby branches: a small stack of pins (no count); clicking zooms in to separate them
const stackRenderer: Renderer = {
  render: ({ position }) => {
    const el = document.createElement('div');
    el.className = 'branch-map-cluster';
    el.innerHTML = `
      <svg width="40" height="44" viewBox="0 0 40 44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g transform="translate(12 0)" opacity="0.75"><path d="${PIN_PATH}" fill="#F5B301" stroke="#10182B" stroke-width="1"/></g>
        <g transform="translate(0 6)"><path d="${PIN_PATH}" fill="#F5B301" stroke="#10182B" stroke-width="1"/><circle cx="14" cy="14" r="6" fill="#FFFFFF"/></g>
      </svg>`;
    return new google.maps.marker.AdvancedMarkerElement({ position, content: el, title: 'Several branches – click to zoom in' });
  },
};

// Branches geocoded only to their locality share a point; fan them out in a small
// ring (~150 m) so every pin stays visible and clickable.
function spreadOverlapping(branches: MapBranch[]): MapBranch[] {
  const groups = new globalThis.Map<string, MapBranch[]>();
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

// Google Maps directions to the same place the branch's "Open in Maps" link searches for
function directionsUrl(mapsSearchUrl: string): string {
  const destination = new URL(mapsSearchUrl).searchParams.get('query') || '';
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

// Address and Maps links (the branch name is the info window's header, next to its close button)
function BranchPopupContent({ b }: { b: MapBranch }) {
  return (
    <div className="branch-map-popup">
      <span className="branch-map-popup-address">
        {b.address}, {b.city}
        {b.pincode ? ` - ${b.pincode}` : ''}
      </span>
      <div className="branch-map-popup-actions">
        <a className="branch-map-popup-btn" href={b.url} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 3h7v7" />
            <path d="M10 14 21 3" />
            <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
          </svg>
          Open in Maps
        </a>
        <a
          className="branch-map-popup-dir"
          href={directionsUrl(b.url)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Directions to ${b.name}`}
          title="Directions"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M21.7 11.3 12.7 2.3a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4ZM14 14.5V12h-4v3H8v-4a1 1 0 0 1 1-1h5V7.5l3.5 3.5-3.5 3.5Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

const boundsOf = (points: { lat: number; lng: number }[]) => {
  const bounds = new google.maps.LatLngBounds();
  points.forEach((p) => bounds.extend(p));
  return bounds;
};

// Never zoom closer than `maxZoom` after a fitBounds
function capZoomAfterFit(map: google.maps.Map, maxZoom: number) {
  google.maps.event.addListenerOnce(map, 'idle', () => {
    if ((map.getZoom() ?? 0) > maxZoom) map.setZoom(maxZoom);
  });
}

// Re-frames the map whenever the visible set of branches, the selection or the visitor's location changes.
function FitView({ branches, selected, nearCoords, overview }: { branches: MapBranch[]; selected: MapBranch | null; nearCoords?: { lat: number; lng: number } | null; overview: boolean }) {
  const map = useMap();
  const boundsKey = branches.map((b) => b.id).join('|');

  useEffect(() => {
    if (!map) return;
    if (selected) {
      // Zoom to the branch; its info window opens above the pin and auto-pans into view
      map.setZoom(Math.max(map.getZoom() ?? 0, 14));
      map.panTo({ lat: selected.lat, lng: selected.lng });
      return;
    }
    if (nearCoords) {
      // Visitor's location plus their closest branch
      const here = new google.maps.LatLng(nearCoords.lat, nearCoords.lng);
      const distance = (b: MapBranch) => google.maps.geometry?.spherical
        ? google.maps.geometry.spherical.computeDistanceBetween(here, { lat: b.lat, lng: b.lng })
        : (b.lat - nearCoords.lat) ** 2 + (b.lng - nearCoords.lng) ** 2;
      const nearest = [...branches].sort((a, b) => distance(a) - distance(b))[0];
      map.fitBounds(boundsOf(nearest ? [nearCoords, nearest] : [nearCoords]), 60);
      capZoomAfterFit(map, 14);
      return;
    }
    if (branches.length === 0) {
      map.fitBounds(INDIA_BOUNDS, 0);
    } else if (overview) {
      // All-India view: fit tightly around the branches (closer than the whole country, every pin
      // visible); extra top padding because pins hang above their point
      map.fitBounds(boundsOf(branches), { top: 40, bottom: 8, left: 20, right: 20 });
    } else if (branches.length === 1) {
      map.setZoom(14);
      map.panTo(branches[0]);
    } else {
      map.fitBounds(boundsOf(branches), { top: 48, bottom: 24, left: 24, right: 24 });
      capZoomAfterFit(map, 13);
    }
    // boundsKey captures the branch set; selected/nearCoords identity changes on each selection
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, boundsKey, selected?.id, nearCoords?.lat, nearCoords?.lng]);

  return null;
}

// Branch pins, optionally grouped into stacks via Google's MarkerClusterer
function BranchMarkers({ pins, selectedId, onSelect, cluster }: { pins: MapBranch[]; selectedId?: string | null; onSelect?: (id: string | null) => void; cluster: boolean }) {
  const map = useMap();
  const [markers, setMarkers] = useState<Record<string, google.maps.marker.AdvancedMarkerElement>>({});

  const clusterer = useMemo(() => {
    if (!map || !cluster) return null;
    return new MarkerClusterer({
      map,
      renderer: stackRenderer,
      algorithm: new SuperClusterAlgorithm({ radius: 50, maxZoom: 11 }),
    });
  }, [map, cluster]);

  useEffect(() => {
    if (!clusterer) return;
    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  useEffect(() => () => clusterer?.setMap(null), [clusterer]);

  const setMarkerRef = useCallback((marker: google.maps.marker.AdvancedMarkerElement | null, id: string) => {
    setMarkers((prev) => {
      if ((marker && prev[id] === marker) || (!marker && !prev[id])) return prev;
      const next = { ...prev };
      if (marker) next[id] = marker;
      else delete next[id];
      return next;
    });
  }, []);

  const selected = pins.find((b) => b.id === selectedId) || null;

  return (
    <>
      {pins.map((b) => (
        <AdvancedMarker
          key={b.id}
          ref={(m) => setMarkerRef(m, b.id)}
          position={{ lat: b.lat, lng: b.lng }}
          title={b.name.replace(/^Muthoot Gold Point - /i, '')}
          zIndex={b.id === selectedId ? 1000 : undefined}
          onClick={() => onSelect?.(b.id)}
        >
          <BranchPin selected={b.id === selectedId} />
        </AdvancedMarker>
      ))}
      {selected && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          pixelOffset={[0, -40]}
          headerContent={<strong className="branch-map-popup-name">{selected.name}</strong>}
          onCloseClick={() => onSelect?.(null)}
        >
          <BranchPopupContent b={selected} />
        </InfoWindow>
      )}
    </>
  );
}

// Fallback before an API key is configured: the keyless Google embed (one place at a time)
function EmbedFallback({ branches, selectedId, nearCoords }: Pick<BranchMapProps, 'branches' | 'selectedId' | 'nearCoords'>) {
  const target = branches.find((b) => b.id === selectedId) || (branches.length === 1 ? branches[0] : null);
  const query = target
    ? `${target.lat},${target.lng}`
    : nearCoords
      ? `${nearCoords.lat},${nearCoords.lng}`
      : 'Muthoot Gold Point - We Buy Gold';
  const zoom = target ? 16 : nearCoords ? 13 : 5;
  return (
    <div className="branch-map-container">
      <iframe
        title="Muthoot Gold Point Branch Map"
        className="branch-map-iframe"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`}
      />
    </div>
  );
}

export default function BranchMap({ branches, selectedId, nearCoords, onSelect, cluster = false }: BranchMapProps) {
  const pins = useMemo(() => spreadOverlapping(branches), [branches]);
  const selected = pins.find((b) => b.id === selectedId) || null;

  if (!GOOGLE_MAPS_API_KEY) {
    return <EmbedFallback branches={pins} selectedId={selectedId} nearCoords={nearCoords} />;
  }

  return (
    <div className="branch-map-container">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY} region="IN" language="en">
        <Map
          className="branch-map-google"
          mapId={GOOGLE_MAPS_MAP_ID}
          defaultCenter={INDIA_CENTER}
          defaultZoom={5}
          restriction={{ latLngBounds: INDIA_BOUNDS, strictBounds: true }}
          gestureHandling="cooperative"
          disableDefaultUI
          zoomControl
          clickableIcons={false}
          onClick={() => onSelect?.(null)}
        >
          <FitView branches={pins} selected={selected} nearCoords={nearCoords} overview={cluster} />
          {/* Remount on mode change so pins left hidden by the clusterer reappear in state/search views */}
          <BranchMarkers key={cluster ? 'grouped' : 'single'} pins={pins} selectedId={selectedId} onSelect={onSelect} cluster={cluster} />
          {nearCoords && (
            <AdvancedMarker position={nearCoords} title="You are here" zIndex={999}>
              <span className="branch-map-you-are-here" />
            </AdvancedMarker>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
