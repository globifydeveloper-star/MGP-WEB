'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, CircleMarker, ZoomControl, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css';
import './BranchLocator.css';

// Map background providers, tried in order: Esri's street map (Google-Maps-like look, English
// labels, no key), falling back to OpenStreetMap if Esri's tiles are blocked or failing.
const TILE_PROVIDERS = [
  {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; <a href="https://www.esri.com/" target="_blank" rel="noopener">Esri</a> &mdash; Source: Esri, HERE, Garmin, USGS, OpenStreetMap contributors',
    maxNativeZoom: 17, // Esri has no detail beyond 17 in India ("map data not yet available"); closer zooms enlarge 17
  },
  {
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
    maxNativeZoom: 19,
  },
];
const TILE_ERRORS_BEFORE_FALLBACK = 4;
const TILE_LOAD_TIMEOUT_MS = 8000; // blocked requests can hang instead of erroring

function FallbackTileLayer() {
  const [providerIndex, setProviderIndex] = useState(0);
  const loaded = useRef(0);
  const errors = useRef(0);
  const provider = TILE_PROVIDERS[providerIndex];
  const hasFallback = providerIndex < TILE_PROVIDERS.length - 1;

  const fallBack = () => {
    if (!hasFallback || loaded.current > 0) return;
    loaded.current = 0;
    errors.current = 0;
    // Clamped: a burst of tile errors can call this several times before the re-render
    setProviderIndex((i) => Math.min(i + 1, TILE_PROVIDERS.length - 1));
  };

  useEffect(() => {
    if (!hasFallback) return;
    const timer = setTimeout(fallBack, TILE_LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerIndex]);

  return (
    <TileLayer
      key={provider.url}
      url={provider.url}
      attribution={provider.attribution}
      maxZoom={19}
      maxNativeZoom={provider.maxNativeZoom}
      eventHandlers={{
        tileload: () => { loaded.current++; },
        tileerror: () => { if (++errors.current >= TILE_ERRORS_BEFORE_FALLBACK) fallBack(); },
      }}
    />
  );
}

// Gold numbered bubble for a group of nearby branches
// A group of nearby branches: a small stack of pins (no count); clicking zooms in to separate them
const PIN_PATH = 'M14 0C6.268 0 0 6.268 0 14c0 10.5 14 24 14 24s14-13.5 14-24C28 6.268 21.732 0 14 0z';
const clusterStackIcon = L.divIcon({
  className: 'branch-map-cluster',
  html: `
    <svg width="40" height="44" viewBox="0 0 40 44" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(12 0)" opacity="0.75"><path d="${PIN_PATH}" fill="#F5B301" stroke="#10182B" stroke-width="1"/></g>
      <g transform="translate(0 6)"><path d="${PIN_PATH}" fill="#F5B301" stroke="#10182B" stroke-width="1"/><circle cx="14" cy="14" r="6" fill="#FFFFFF"/></g>
    </svg>`,
  iconSize: [40, 44],
  iconAnchor: [14, 44],
});
const clusterIcon = () => clusterStackIcon;

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

// Google Maps directions to the same place the branch's "Open in Maps" link searches for
function directionsUrl(mapsSearchUrl: string): string {
  const destination = new URL(mapsSearchUrl).searchParams.get('query') || '';
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

// Name, address and Maps links (Google-Maps-style card)
function BranchPopupContent({ b }: { b: MapBranch }) {
  return (
    <div className="branch-map-popup">
      <strong className="branch-map-popup-name">{b.name}</strong>
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

interface BranchMapProps {
  branches: MapBranch[];
  selectedId?: string | null;
  nearCoords?: { lat: number; lng: number } | null;
  onSelect?: (id: string) => void;
  // Group nearby pins into numbered bubbles (used for the all-India view; state/search views show every pin)
  cluster?: boolean;
}

const INDIA_CENTER: [number, number] = [22.5, 79];
// The map is kept to India: it can't be dragged outside this box or zoomed out past it
const INDIA_BOUNDS = L.latLngBounds([6.5, 68], [37.2, 97.4]);
// Minimum zoom = the level where all of India just fits, recalculated when the map resizes
function KeepToIndia() {
  const map = useMap();
  useEffect(() => {
    const update = () => map.setMinZoom(map.getBoundsZoom(INDIA_BOUNDS, false));
    update();
    map.on('resize', update);
    return () => {
      map.off('resize', update);
    };
  }, [map]);
  return null;
}

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
function FitView({ branches, selected, nearCoords, markerRefs, overview }: { branches: MapBranch[]; selected: MapBranch | null; nearCoords?: { lat: number; lng: number } | null; markerRefs: React.RefObject<Record<string, L.Marker>>; overview: boolean }) {
  const map = useMap();
  const boundsKey = branches.map((b) => b.id).join('|');

  useEffect(() => {
    if (selected) {
      // Fly to the branch, then show its details (e.g. after a card in the list is clicked)
      const openDetails = () => markerRefs.current?.[selected.id]?.openPopup();
      map.once('moveend', openDetails);
      // Centre slightly above the pin so it sits low in the map, leaving room for the popup above it
      const zoom = Math.max(map.getZoom(), 14);
      const pinPoint = map.project([selected.lat, selected.lng], zoom);
      const target = map.unproject(pinPoint.subtract([0, map.getSize().y * 0.25]), zoom);
      map.flyTo(target, zoom, { duration: 0.8 });
      return () => {
        map.off('moveend', openDetails);
      };
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
      map.flyToBounds(INDIA_BOUNDS, { duration: 0.8 });
    } else if (overview) {
      // All-India view: fit tightly around the branches (closer than the whole country, every pin
      // still visible); visitors can zoom out to see all of India
      // Extra top padding: pins hang above their point, so the northernmost ones need room
      // (kept tight so the desktop map lands on the closer zoom level 5)
      map.flyToBounds(L.latLngBounds(points), { paddingTopLeft: [20, 40], paddingBottomRight: [20, 8], duration: 0.8 });
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

export default function BranchMap({ branches, selectedId, nearCoords, onSelect, cluster = false }: BranchMapProps) {
  // `position` is created once per pin: react-leaflet moves a marker whenever it gets a new array,
  // which on re-render (e.g. selecting a card) crashed Leaflet while a popup was open.
  const pins = useMemo(
    () => spreadOverlapping(branches).map((b) => ({ ...b, position: [b.lat, b.lng] as [number, number] })),
    [branches]
  );
  const selected = pins.find((b) => b.id === selectedId) || null;
  const markerRefs = useRef<Record<string, L.Marker>>({});

  const markers = pins.map((b) => (
    <Marker
      key={b.id}
      ref={(m) => {
        if (m) markerRefs.current[b.id] = m;
        else delete markerRefs.current[b.id];
      }}
      position={b.position}
      icon={b.id === selectedId ? branchPinIconSelected : branchPinIcon}
      zIndexOffset={b.id === selectedId ? 1000 : 0}
      eventHandlers={{
        click: () => onSelect?.(b.id),
        // The hover label would otherwise sit behind the open details popup
        popupopen: (e) => e.target.closeTooltip(),
      }}
    >
      <Tooltip direction="top" offset={[0, -34]}>
        {b.name.replace(/^Muthoot Gold Point - /i, '')}
      </Tooltip>
      <Popup minWidth={220} maxWidth={300} autoPanPadding={[12, 12]}>
        <BranchPopupContent b={b} />
      </Popup>
    </Marker>
  ));

  return (
    <div className="branch-map-container">
      <MapContainer
        center={INDIA_CENTER}
        zoom={5}
        maxBounds={INDIA_BOUNDS}
        maxBoundsViscosity={1}
        // Whole zoom steps only: the pin grouping (markercluster) drops some single pins at fractional zooms
        scrollWheelZoom={false}
        zoomControl={false}
        className="branch-map-leaflet"
      >
        <KeepToIndia />
        {/* Bottom-right so the zoom buttons never cover a branch details popup */}
        <ZoomControl position="bottomright" />
        <FallbackTileLayer />
        <FitView branches={pins} selected={selected} nearCoords={nearCoords} markerRefs={markerRefs} overview={cluster} />
        {nearCoords && (
          <CircleMarker
            center={[nearCoords.lat, nearCoords.lng]}
            radius={8}
            pathOptions={{ color: '#FFFFFF', weight: 3, fillColor: '#2F80ED', fillOpacity: 1 }}
          />
        )}
        {cluster ? (
          // Nearby pins merge into numbered bubbles; individual pins from city zoom
          <MarkerClusterGroup
            key="clustered"
            iconCreateFunction={clusterIcon}
            maxClusterRadius={40}
            disableClusteringAtZoom={12}
            showCoverageOnHover={false}
            spiderfyOnMaxZoom
            // Only ~120 pins, so no need for batching or off-screen culling
            chunkedLoading={false}
            removeOutsideVisibleBounds={false}
          >
            {markers}
          </MarkerClusterGroup>
        ) : (
          markers
        )}
      </MapContainer>
    </div>
  );
}
