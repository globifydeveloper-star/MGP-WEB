'use client';

import React, { useState } from 'react';
import './BranchSelector.css';

const branchData: Record<string, string[]> = {
  'Karnataka': ['Bengaluru - Jayanagar', 'Bengaluru - Indiranagar', 'Bengaluru - Koramangala'],
  'Tamil Nadu': ['Chennai - T. Nagar', 'Chennai - Adyar', 'Coimbatore'],
  'Kerala': ['Kochi - MG Road', 'Trivandrum - East Fort', 'Calicut'],
  'Maharashtra': ['Mumbai - Andheri', 'Pune - Deccan Gymkhana', 'Nagpur'],
  'Delhi': ['Connaught Place', 'Karol Bagh', 'Nehru Place']
};

export default function BranchSelector() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedBranch(''); // reset branch on state change
  };

  return (
    <div
      className="branch-selector-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Minimized Trigger Tab (visible by default, opens on hover) */}
      <div
        className={`branch-selector-minimized-tab ${!isHovered ? 'is-visible' : ''}`}
        onClick={() => setIsHovered(true)}
        role="button"
        tabIndex={0}
        aria-label="Open branch selector"
      >
        <span className="minimized-rate-badge">22K/G: ₹8,629</span>
        <span className="minimized-tab-label">Find Branch & Directions</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="expand-chevron"
          style={{ width: 16, height: 16 }}
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </div>

      {/* Main Branch Selector Bar (slides up on hover) */}
      <div className={`branch-selector-bar glass-panel ${isHovered ? 'is-popped-up' : 'is-popped-down'}`}>
        {/* Header Row: Info & Rate */}
        <div className="selector-header-row">
          <div className="selector-section-info">
            <span className="info-title">Sell gold instantly at</span>
            <span className="info-subtitle">Select a branch</span>
          </div>

          <div className="selector-rate-badge">
            <span className="rate-label">22K/G</span>
            <span className="rate-price">₹8,629</span>
          </div>
        </div>

        {/* Dropdown controls */}
        <div className="selector-dropdowns">
          {/* State Dropdown */}
          <div className="select-wrapper">
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="custom-select"
            >
              <option value="" disabled>Select State</option>
              {Object.keys(branchData).map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <span className="select-chevron"></span>
          </div>

          {/* Branch Dropdown */}
          <div className="select-wrapper">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              disabled={!selectedState}
              className="custom-select"
            >
              <option value="" disabled>Select Branch</option>
              {selectedState && branchData[selectedState].map((branch) => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
            <span className="select-chevron"></span>
          </div>
        </div>

        {/* CTA Direction button */}
        <button
          className="btn btn-primary direction-btn"
          disabled={!selectedBranch}
          onClick={() => {
            if (selectedBranch) {
              alert(`Opening directions for Muthoot Goldpoint, ${selectedBranch}, ${selectedState}`);
            }
          }}
        >
          Get Direction
        </button>

        {/* Action button (Pop Down / Close) */}
        <div className="selector-actions">
          <button
            type="button"
            className="minimize-selector-btn"
            onClick={() => setIsHovered(false)}
            aria-label="Pop down branch selector"
            title="Pop down"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="minimize-icon"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
