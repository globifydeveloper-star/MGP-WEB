'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import './BranchLocator.css';

const BranchMap = dynamic(() => import('./BranchMap'), {
  ssr: false,
  loading: () => <div className="branch-locator-map-loading">Loading map…</div>,
});

export interface BranchCity {
  city: string;
  state: string;
  locations: number;
  lat: number;
  lng: number;
}

export const BRANCH_CITIES: BranchCity[] = [
  { city: 'Mumbai', state: 'Maharashtra', locations: 3, lat: 19.076, lng: 72.8777 },
  { city: 'Bengaluru', state: 'Karnataka', locations: 2, lat: 12.9716, lng: 77.5946 },
  { city: 'Hyderabad', state: 'Telangana', locations: 2, lat: 17.385, lng: 78.4867 },
  { city: 'Chennai', state: 'Tamil Nadu', locations: 2, lat: 13.0827, lng: 80.2707 },
];

const SearchIcon = () => (
  <svg className="branch-locator-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function BranchLocator() {
  const [query, setQuery] = useState('');

  const filteredCities = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BRANCH_CITIES;
    return BRANCH_CITIES.filter(
      (branch) =>
        branch.city.toLowerCase().includes(q) || branch.state.toLowerCase().includes(q)
    );
  }, [query]);

  const mapCities = filteredCities.length > 0 ? filteredCities : BRANCH_CITIES;

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
          <div className="branch-locator-map-col">
            <BranchMap cities={mapCities} />
          </div>

          <div className="branch-locator-list-col">
            <form
              className="branch-locator-search"
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <SearchIcon />
              <input
                type="text"
                className="branch-locator-search-input"
                placeholder="Search by city, locality or pincode..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search by city, locality or pincode"
              />
              <button type="submit" className="branch-locator-search-btn">
                Find Branch
              </button>
            </form>

            <div className="branch-locator-cards">
              {filteredCities.length === 0 ? (
                <p className="branch-locator-empty">
                  No branches match &ldquo;{query}&rdquo;. Try a different city, state, or pincode.
                </p>
              ) : (
                filteredCities.map((branch) => (
                  <div className="branch-locator-card" key={branch.city}>
                    <div className="branch-locator-card-main">
                      <h3 className="branch-locator-card-city">{branch.city}</h3>
                      <p className="branch-locator-card-meta">
                        {branch.locations} location{branch.locations !== 1 ? 's' : ''} · {branch.state}
                      </p>
                    </div>
                    <a href="#" className="branch-locator-card-link">
                      View Branches &gt;
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
