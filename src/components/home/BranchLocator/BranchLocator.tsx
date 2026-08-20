'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  getStateSummaries,
  STATE_COORDINATES,
  resolveBranchCoordinates,
} from '@/data/branchesData';
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

export default function BranchLocator() {
  const [query, setQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [showAllStates, setShowAllStates] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);

  const { states: apiStates, branchesByState } = useBranchMaster();

  // Clear the pinned branch whenever the user changes search/state context
  useEffect(() => {
    setSelectedBranchId(null);
  }, [query, selectedState]);

  // All state summaries sorted by branch count (Loaded directly from live Branch Master API)
  const stateSummaries = useMemo(() => {
    if (apiStates && apiStates.length > 0) {
      return apiStates.map((stName) => {
        const bList = branchesByState[stName] || [];
        const meta = STATE_COORDINATES[stName] || { lat: 20.5937, lng: 78.9629, capital: stName };
        return {
          state: stName,
          count: bList.length,
          capitalCity: meta.capital,
          lat: meta.lat,
          lng: meta.lng,
          branches: bList.map((b, idx) => {
            const coords = resolveBranchCoordinates({
              branchCode: b.branchCode,
              name: b.branchName,
              location: b.location,
              state: stName,
            });
            return {
              id: b.branchCode || `${stName}-${idx}`,
              name: b.branchName || `Muthoot Gold Point - ${b.location}`,
              url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `Muthoot Gold Point, ${b.addressLine1 || ''}, ${b.location}, ${stName}`
              )}`,
              address: b.addressLine1 ? (b.addressLine2 ? `${b.addressLine1}, ${b.addressLine2}` : b.addressLine1) : b.location,
              city: b.location,
              pincode: b.pin,
              state: stName,
              phone: b.branchPhoneNo || b.contactPersonMobile,
              email: b.branchEmail,
              timing: '10:00 AM - 6:30 PM',
              lat: coords.lat,
              lng: coords.lng,
            };
          }),
        };
      }).sort((a, b) => b.count - a.count);
    }

    return [];
  }, [apiStates, branchesByState]);

  const allBranches = useMemo(() => {
    return stateSummaries.flatMap((s) => s.branches);
  }, [stateSummaries]);

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

  // Map marker logic
  const mapMarkers = useMemo(() => {
    if (query.trim() !== '') {
      return filteredBranches.map((b) => ({
        id: b.id,
        label: b.name,
        sublabel: `${b.city}, ${b.state}`,
        lat: b.lat,
        lng: b.lng,
      }));
    }

    if (activeStateSummary) {
      return activeStateSummary.branches.map((b: any) => ({
        id: b.id,
        label: b.name,
        sublabel: b.city,
        lat: b.lat,
        lng: b.lng,
      }));
    }

    return visibleStateSummaries.map((s) => ({
      id: s.state,
      label: s.state,
      sublabel: `${s.count} branches`,
      lat: s.lat,
      lng: s.lng,
    }));
  }, [query, filteredBranches, activeStateSummary, visibleStateSummaries]);

  const selectedBranch = useMemo(() => {
    if (!selectedBranchId) return null;
    return allBranches.find((b) => b.id === selectedBranchId) || null;
  }, [selectedBranchId, allBranches]);

  const mapCenter: [number, number] = useMemo(() => {
    if (selectedBranch) {
      return [selectedBranch.lat, selectedBranch.lng];
    }
    if (activeStateSummary) {
      return [activeStateSummary.lat, activeStateSummary.lng];
    }
    if (filteredBranches.length > 0) {
      return [filteredBranches[0].lat, filteredBranches[0].lng];
    }
    return [18.5, 78.5];
  }, [selectedBranch, activeStateSummary, filteredBranches]);

  const mapZoom = selectedBranch ? 15 : activeStateSummary ? 7 : query.trim() ? 8 : 5;

  return (
    <section className="branch-locator-section" id="branches">
      <div className="container">
        <div className="branch-locator-header">
          <h2 className="branch-locator-title">
            {allBranches.length}+ branches. <span className="branch-locator-title-highlight">One standard.</span>
          </h2>
          <p className="branch-locator-subtitle">
            Every GoldPoint branch runs the same process, uses the same equipment, and upholds the same promise. Choose the nearest — the experience is always identical.
          </p>
        </div>

        <div className="branch-locator-grid">
          {/* Map Column */}
          <div className="branch-locator-map-col">
            <BranchMap
              markers={mapMarkers}
              center={mapCenter}
              zoom={mapZoom}
              selectedId={selectedBranchId}
              selectedBranchAddress={selectedBranch ? `Muthoot Gold Point, ${selectedBranch.address}, ${selectedBranch.city}` : undefined}
              searchQuery={query}
              activeStateName={activeStateSummary?.state}
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
                      <h4 className="branch-locator-branch-name">{branch.name}</h4>
                      <p className="branch-locator-branch-address">
                        <MapPinIcon /> {branch.address}, {branch.city} - {branch.pincode}
                      </p>
                      {branch.phone && (
                        <p className="branch-locator-branch-contact">
                          📞 Phone: {branch.phone}
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
