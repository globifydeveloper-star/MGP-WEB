'use client';

import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useBranchMaster } from '@/hooks/useBranchMaster';
import './BranchLocator.css';

import BranchMap from './BranchMap';

const SearchIcon = () => (
  <svg
    className="branch-locator-search-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ClockIcon = () => (
  <svg
    className="branch-locator-clock-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const MapPinIcon = () => (
  <svg
    className="branch-locator-pin-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const LocateIcon = () => (
  <svg
    className="branch-locator-locate-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

export interface BranchLocatorProps {
  heading?: string;
  highlight?: string;
  subtitle?: string;
  branchesCount?: string;
}

function BranchLocatorInner({
  heading,
  highlight,
  subtitle,
  branchesCount,
}: BranchLocatorProps) {
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLElement>(null);
  const [query, setQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [showAllStates, setShowAllStates] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [nearCoords, setNearCoords] = useState<{ lat: number; lng: number } | null>(null);
  const appliedStateParam = useRef<string | null>(null);

  const { states: apiStates, branchesByState } = useBranchMaster();

  // Deep-link from the footer's "Our Presence - States" links: ?state=<name>#branches
  // selects that state's branch list as soon as the Branch Master data loads.
  useEffect(() => {
    const stateParam = searchParams.get('state');
    if (!stateParam || apiStates.length === 0) return;
    if (appliedStateParam.current === stateParam) return;
    appliedStateParam.current = stateParam;

    const match = apiStates.find((s) => s.toLowerCase() === stateParam.toLowerCase());
    if (match) {
      setQuery('');
      setSelectedState(match);
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [searchParams, apiStates]);

  // Clear the pinned branch whenever the user changes search/state context;
  // a search or state pick also replaces the "Near Me" map view
  useEffect(() => {
    setSelectedBranchId(null);
    if (query.trim() || selectedState) setNearCoords(null);
  }, [query, selectedState]);

function cleanBranchAddress(address?: string): string {
  if (!address) return '';
  return address
    .replace(/,+/g, ', ')
    .replace(/\bNear\s+District,\s*Hospital\b/gi, 'Near District Hospital')
    .replace(/\s+/g, ' ')
    .replace(/,\s*,/g, ', ')
    .trim();
}

function formatBranchMapQuery(branch: {
  address?: string;
  city: string;
  state: string;
  pincode?: string;
}): string {
  const cleanAddr = cleanBranchAddress(branch.address);
  const pin = branch.pincode && /^\d{6}$/.test(branch.pincode.trim()) ? branch.pincode.trim() : '';
  const parts = [
    'Muthoot Gold Point',
    cleanAddr,
    branch.city,
    branch.state,
    pin
  ].filter(Boolean);
  return parts.join(', ');
}

// All state summaries sorted by branch count (Loaded directly from live Branch Master API)
  const stateSummaries = useMemo(() => {
    return apiStates.map((stName) => {
      const bList = branchesByState[stName] || [];
      return {
        state: stName,
        count: bList.length,
        branches: bList.map((b, idx) => {
          const rawAddress = b.addressLine1 ? (b.addressLine2 ? `${b.addressLine1}, ${b.addressLine2}` : b.addressLine1) : b.location;
          const cleanAddr = cleanBranchAddress(rawAddress);
          const mapQueryString = `Muthoot Gold Point, ${cleanAddr}, ${b.location}, ${stName} ${b.pin || ''}`.trim();
          return {
            id: b.branchCode || `${stName}-${idx}`,
            branchCode: b.branchCode,
            name: b.branchName || `Muthoot Gold Point - ${b.location}`,
            url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQueryString)}`,
            address: cleanAddr,
            city: b.location,
            pincode: b.pin,
            state: stName,
            phone: b.branchPhoneNo,
            mobile: b.contactPersonMobile,
            email: b.branchEmail,
            timing: '10:00 AM - 6:30 PM',
          };
        }),
      };
    }).sort((a, b) => b.count - a.count);
  }, [apiStates, branchesByState]);

  const allBranches = useMemo(() => {
    return stateSummaries.flatMap((s) => s.branches);
  }, [stateSummaries]);

  // The Branch Master API has no coordinates, so "Near Me" centres the map on
  // the visitor's own location instead of picking a branch from the list
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setQuery('');
        setSelectedState(null);
        setSelectedBranchId(null);
        setNearCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
        setIsLocating(false);
      },
      (error) => {
        console.error('Error getting location', error);
        alert('Unable to retrieve your location. Please ensure location permissions are granted.');
        setIsLocating(false);
      },
      { timeout: 10000 }
    );
  };

  // Filtered branches when search query is typed
  const filteredBranches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allBranches.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        b.state.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.pincode.toLowerCase().includes(q)
    );
  }, [query, allBranches]);

  // Active state object if selected
  const activeStateSummary = useMemo(() => {
    if (!selectedState) return null;
    return stateSummaries.find((s) => s.state === selectedState) || null;
  }, [selectedState, stateSummaries]);

  // States to display in initial view (top 4 or all)
  const visibleStateSummaries = useMemo(() => {
    if (showAllStates) return stateSummaries;
    return stateSummaries.slice(0, 4);
  }, [stateSummaries, showAllStates]);

  const selectedBranch = useMemo(() => {
    if (!selectedBranchId) return null;
    return allBranches.find((b) => b.id === selectedBranchId) || null;
  }, [selectedBranchId, allBranches]);

  return (
    <section className="branch-locator-section" id="branches" ref={sectionRef}>
      <div className="container">
        <div className="branch-locator-header">
          <h2 className="branch-locator-title">
            {heading ? (
              <>
                {heading}{' '}
                {highlight && <span className="branch-locator-title-highlight">{highlight}</span>}
              </>
            ) : (
              <>
                {branchesCount ? `${branchesCount} ` : '122+ '}
                branches. <span className="branch-locator-title-highlight">{highlight || 'One standard.'}</span>
              </>
            )}
          </h2>
          <p className="branch-locator-subtitle">
            {subtitle || 'Every GoldPoint branch runs the same process, uses the same equipment, and upholds the same promise. Choose the nearest — the experience is always identical.'}
          </p>
        </div>

        <div className="branch-locator-grid">
          {/* Map Column */}
          <div className="branch-locator-map-col">
            <BranchMap
              selectedBranchAddress={
                selectedBranch
                  ? formatBranchMapQuery(selectedBranch)
                  : filteredBranches.length === 1
                  ? formatBranchMapQuery(filteredBranches[0])
                  : undefined
              }
              searchQuery={query}
              activeStateName={activeStateSummary?.state}
              nearCoords={nearCoords}
            />
          </div>

          {/* Controls & Cards Column */}
          <div className="branch-locator-list-col">
            {/* Search Input Bar */}
            <form
              className="branch-locator-search"
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <SearchIcon />
              <input
                type="text"
                className="branch-locator-search-input"
                placeholder="Search by city, state, locality or pincode..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (selectedState) setSelectedState(null);
                }}
                aria-label="Search by city, state, locality or pincode"
              />
              {query ? (
                <button
                  type="button"
                  className="branch-locator-clear-btn"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              ) : (
                <button type="submit" className="branch-locator-search-btn">
                  Find Branch
                </button>
              )}
              <button
                type="button"
                className="branch-locator-locate-btn"
                onClick={handleLocateMe}
                disabled={isLocating}
                title="Find nearest branch"
              >
                {isLocating ? (
                  <span className="branch-locator-loading-spinner" style={{ display: 'inline-block', width: '18px', height: '18px', border: '2px solid rgba(16,24,43,0.3)', borderTopColor: '#10182B', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
                ) : (
                  <LocateIcon />
                )}
                <span className="branch-locator-locate-text" style={{ marginLeft: '4px' }}>Near Me</span>
              </button>
              <style>{`
                @keyframes spin { 100% { transform: rotate(360deg); } }
                @media (max-width: 640px) {
                  .branch-locator-locate-btn { order: 4; width: 100%; margin-left: 0; margin-top: 0.5rem; }
                }
              `}</style>
            </form>

            {/* CASE 1: SEARCH QUERY ACTIVE */}
            {query.trim() !== '' && (
              <div className="branch-locator-content">
                <div className="branch-locator-results-bar">
                  <span className="branch-locator-results-count">
                    Results found: <strong>{filteredBranches.length}</strong> for &ldquo;{query}&rdquo;
                  </span>
                  <button
                    type="button"
                    className="branch-locator-reset-link"
                    onClick={() => setQuery('')}
                  >
                    Clear Search
                  </button>
                </div>

                <div className="branch-locator-cards">
                  {filteredBranches.length === 0 ? (
                    <p className="branch-locator-empty">
                      No branches match &ldquo;{query}&rdquo;. Try searching for a state like Tamil Nadu, Maharashtra, or a city like Pune, Hyderabad, Jaipur.
                    </p>
                  ) : (
                    filteredBranches.map((branch) => (
                      <div
                        className={`branch-locator-branch-card${branch.id === selectedBranchId ? ' branch-locator-branch-card-active' : ''}`}
                        key={branch.id}
                        onClick={() => setSelectedBranchId(branch.id)}
                      >
                        <div className="branch-locator-branch-header">
                          <div>
                            <h3 className="branch-locator-branch-name">{branch.name}</h3>
                            <span className="branch-locator-state-tag">{branch.state}</span>
                          </div>

                        </div>
                        <p className="branch-locator-branch-address">
                          <MapPinIcon /> {branch.address}, {branch.city} - {branch.pincode}
                        </p>
                        {branch.phone && (
                          <p className="branch-locator-branch-contact">
                            📞 Phone: {branch.phone}
                          </p>
                        )}
                        {branch.mobile && (
                          <p className="branch-locator-branch-contact">
                            📱 Mobile: {branch.mobile}
                          </p>
                        )}
                        {branch.email && (
                          <p className="branch-locator-branch-contact">
                            ✉️ Email: {branch.email}
                          </p>
                        )}
                        <div className="branch-locator-branch-footer">
                          <span className="branch-locator-branch-timing">
                            <ClockIcon /> {branch.timing}
                          </span>
                          <a
                            href={branch.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="branch-locator-card-link"
                          >
                            View Details &gt;
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* CASE 2: SPECIFIC STATE SELECTED */}
            {query.trim() === '' && activeStateSummary && (
              <div className="branch-locator-content">
                <div className="branch-locator-state-header">
                  <button
                    type="button"
                    className="branch-locator-back-btn"
                    onClick={() => setSelectedState(null)}
                  >
                    &larr; All States
                  </button>
                  <h3 className="branch-locator-state-title">
                    {activeStateSummary.state} ({activeStateSummary.count} Branches)
                  </h3>
                </div>

                <div className="branch-locator-cards">
                  {activeStateSummary.branches.map((branch: any) => (
                    <div
                      className={`branch-locator-branch-card${branch.id === selectedBranchId ? ' branch-locator-branch-card-active' : ''}`}
                      key={branch.id}
                      onClick={() => setSelectedBranchId(branch.id)}
                    >
                      <div className="branch-locator-branch-header">
                        <div>
                          <h4 className="branch-locator-branch-name">{branch.name}</h4>
                          <span className="branch-locator-state-tag">{branch.state}</span>
                        </div>

                      </div>
                      <p className="branch-locator-branch-address">
                        <MapPinIcon /> {branch.address}, {branch.city} - {branch.pincode}
                      </p>
                      {branch.phone && (
                        <p className="branch-locator-branch-contact">
                          📞 Phone: {branch.phone}
                        </p>
                      )}
                      {branch.mobile && (
                        <p className="branch-locator-branch-contact">
                          📱 Mobile: {branch.mobile}
                        </p>
                      )}
                      {branch.email && (
                        <p className="branch-locator-branch-contact">
                          ✉️ Email: {branch.email}
                        </p>
                      )}
                      <div className="branch-locator-branch-footer">
                        <span className="branch-locator-branch-timing">
                          <ClockIcon /> {branch.timing}
                        </span>
                        <a
                          href={branch.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="branch-locator-card-link"
                        >
                          View Details &gt;
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CASE 3: DEFAULT STATE SUMMARY VIEW */}
            {query.trim() === '' && !activeStateSummary && (
              <div className="branch-locator-content">
                <div className="branch-locator-states-header">
                  <span className="branch-locator-states-subtitle">
                    Select a state to view branches ({stateSummaries.length} states total)
                  </span>
                </div>

                <div className="branch-locator-cards">
                  {visibleStateSummaries.map((summary) => (
                    <div
                      className="branch-locator-card"
                      key={summary.state}
                      onClick={() => setSelectedState(summary.state)}
                    >
                      <div className="branch-locator-card-main">
                        <h3 className="branch-locator-card-city">{summary.state}</h3>
                        <p className="branch-locator-card-meta">
                          {summary.count} Branch{summary.count !== 1 ? 'es' : ''} available
                        </p>
                      </div>
                      <button
                        type="button"
                        className="branch-locator-card-link-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedState(summary.state);
                        }}
                      >
                        View Branches &gt;
                      </button>
                    </div>
                  ))}
                </div>

                {/* View All / Toggle Button */}
                <div className="branch-locator-toggle-wrap">
                  <button
                    type="button"
                    className="branch-locator-toggle-btn"
                    onClick={() => setShowAllStates((prev) => !prev)}
                  >
                    {showAllStates
                      ? 'Show Top 4 States ↑'
                      : `View All ${stateSummaries.length} States ↓`}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BranchLocator(props: BranchLocatorProps) {
  return (
    <Suspense fallback={null}>
      <BranchLocatorInner {...props} />
    </Suspense>
  );
}
