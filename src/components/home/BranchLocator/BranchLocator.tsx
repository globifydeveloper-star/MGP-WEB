'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  BRANCHES_DATA,
  getStateSummaries,
  Branch,
  StateSummary,
} from '@/data/branchesData';
import './BranchLocator.css';

const BranchMap = dynamic(() => import('./BranchMap'), {
  ssr: false,
  loading: () => <div className="branch-locator-map-loading">Loading map…</div>,
});

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

export default function BranchLocator() {
  const [query, setQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [showAllStates, setShowAllStates] = useState(false);

  // All state summaries sorted by branch count
  const stateSummaries = useMemo(() => getStateSummaries(), []);

  // Filtered branches when search query is typed
  const filteredBranches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return BRANCHES_DATA.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        b.state.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.pincode.toLowerCase().includes(q)
    );
  }, [query]);

  // Active state object if selected
  const activeStateSummary = useMemo(() => {
    if (!selectedState) return null;
    return stateSummaries.find((s) => s.state === selectedState) || null;
  }, [selectedState, stateSummaries]);

  // States to display in initial view (top 4 or all 19)
  const visibleStateSummaries = useMemo(() => {
    if (showAllStates) return stateSummaries;
    return stateSummaries.slice(0, 4);
  }, [stateSummaries, showAllStates]);

  // Map marker logic
  const mapMarkers = useMemo(() => {
    // Mode 1: Search query active -> plot matched branches
    if (query.trim() !== '') {
      return filteredBranches.map((b) => ({
        id: b.id,
        label: b.name,
        sublabel: `${b.city}, ${b.state}`,
        lat: b.lat,
        lng: b.lng,
      }));
    }

    // Mode 2: Specific State Selected -> plot state branches
    if (activeStateSummary) {
      return activeStateSummary.branches.map((b) => ({
        id: b.id,
        label: b.name,
        sublabel: b.city,
        lat: b.lat,
        lng: b.lng,
      }));
    }

    // Mode 3: Default State Overview -> plot top state capital markers
    return visibleStateSummaries.map((s) => ({
      id: s.state,
      label: s.state,
      sublabel: `${s.count} branches`,
      lat: s.lat,
      lng: s.lng,
    }));
  }, [query, filteredBranches, activeStateSummary, visibleStateSummaries]);

  // Map center calculation
  const mapCenter: [number, number] = useMemo(() => {
    if (activeStateSummary) {
      return [activeStateSummary.lat, activeStateSummary.lng];
    }
    if (filteredBranches.length > 0) {
      return [filteredBranches[0].lat, filteredBranches[0].lng];
    }
    return [18.5, 78.5]; // Central India default
  }, [activeStateSummary, filteredBranches]);

  const mapZoom = activeStateSummary ? 7 : query.trim() ? 8 : 5;

  return (
    <section className="branch-locator-section" id="branches">
      <div className="container">
        <div className="branch-locator-header">
          <h2 className="branch-locator-title">
            {BRANCHES_DATA.length}+ branches. <span className="branch-locator-title-highlight">One standard.</span>
          </h2>
          <p className="branch-locator-subtitle">
            Every GoldPoint branch runs the same process, uses the same equipment, and upholds the same promise. Choose the nearest — the experience is always identical.
          </p>
        </div>

        <div className="branch-locator-grid">
          {/* Map Column */}
          <div className="branch-locator-map-col">
            <BranchMap markers={mapMarkers} center={mapCenter} zoom={mapZoom} />
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
                  if (selectedState) setSelectedState(null); // Reset state filter when typing
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
                      <div className="branch-locator-branch-card" key={branch.id}>
                        <div className="branch-locator-branch-header">
                          <div>
                            <h3 className="branch-locator-branch-name">{branch.name}</h3>
                            <span className="branch-locator-state-tag">{branch.state}</span>
                          </div>
                        </div>
                        <p className="branch-locator-branch-address">
                          <MapPinIcon /> {branch.address}, {branch.city} - {branch.pincode}
                        </p>
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
                  {activeStateSummary.branches.map((branch) => (
                    <div className="branch-locator-branch-card" key={branch.id}>
                      <h4 className="branch-locator-branch-name">{branch.name}</h4>
                      <p className="branch-locator-branch-address">
                        <MapPinIcon /> {branch.address}, {branch.city} - {branch.pincode}
                      </p>
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

            {/* CASE 3: DEFAULT STATE SUMMARY VIEW (Showing Top 4 or All States) */}
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
