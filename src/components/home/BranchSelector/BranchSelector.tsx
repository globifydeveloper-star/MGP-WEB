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
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedBranch(''); // reset branch on state change
  };

  return (
    <div className="branch-selector-bar glass-panel">
      {/* Label section */}
      <div className="selector-section-info">
        <span className="info-title">Sell gold instantly at</span>
        <span className="info-subtitle">Select a branch</span>
      </div>

      {/* Separator & Rate */}
      <div className="selector-rate-badge">
        <span className="rate-label">22K/G</span>
        <span className="rate-price">₹8,629</span>
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

      {/* Close button */}
      <button
        className="close-selector-btn"
        onClick={() => setIsOpen(false)}
        aria-label="Close branch selector"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="close-icon"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
