'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useBranchMaster } from '@/hooks/useBranchMaster';
import { getUniqueStates, getBranchesByState, Branch } from '@/data/branchesData';
import './BranchSelector.css';

export default function BranchSelector() {
  const pathname = usePathname();
  const [selectedState, setSelectedState] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  // Reset selector bar to OPEN state on route change
  useEffect(() => {
    setIsOpen(true);
  }, [pathname]);

  const { states: bmStates, branchesByState } = useBranchMaster();

  const states = useMemo(() => {
    return bmStates && bmStates.length > 0 ? bmStates : getUniqueStates();
  }, [bmStates]);

  const availableBranches = useMemo(() => {
    if (!selectedState) return [];
    if (branchesByState[selectedState] && branchesByState[selectedState].length > 0) {
      return branchesByState[selectedState].map((b) => ({
        id: b.branchCode,
        name: b.branchName,
        url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `Muthoot Gold Point, ${b.addressLine1 || ''}, ${b.location}, ${b.state}`
        )}`,
        address: b.addressLine1 ? (b.addressLine2 ? `${b.addressLine1}, ${b.addressLine2}` : b.addressLine1) : b.location,
        city: b.location,
        pincode: b.pin,
        state: b.state,
        timing: '10:00 AM - 6:30 PM',
        lat: 0,
        lng: 0,
      }));
    }
    return getBranchesByState(selectedState);
  }, [selectedState, branchesByState]);

  const selectedBranchObj = useMemo(() => {
    return availableBranches.find((b) => b.id === selectedBranchId) || null;
  }, [availableBranches, selectedBranchId]);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedBranchId(''); // reset branch on state change
  };

  const handleGetDirections = () => {
    if (selectedBranchObj) {
      if (selectedBranchObj.url) {
        window.open(selectedBranchObj.url, '_blank');
      } else {
        const query = encodeURIComponent(`${selectedBranchObj.name}, ${selectedBranchObj.address}`);
        window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
      }
    }
  };

  return (
    <div className="branch-selector-wrapper">
      {/* Minimized Trigger Tab (visible when minimized) */}
      <div
        className={`branch-selector-minimized-tab ${!isOpen ? 'is-visible' : 'is-hidden'}`}
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="Open branch selector"
      >
        <span className="minimized-rate-badge">22K/G: ₹8,629</span>
        <span className="minimized-tab-label">Find Branch &amp; Directions</span>
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

      {/* Main Branch Selector Bar (Open by default, minimizes on downward arrow click) */}
      <div className={`branch-selector-bar glass-panel ${isOpen ? 'is-popped-up' : 'is-popped-down'}`}>
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
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <span className="select-chevron"></span>
          </div>

          {/* Branch Dropdown */}
          <div className="select-wrapper">
            <select
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
              disabled={!selectedState}
              className="custom-select"
            >
              <option value="" disabled>Select Branch</option>
              {availableBranches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name.replace('Muthoot Gold Point - ', '')} ({branch.city})
                </option>
              ))}
            </select>
            <span className="select-chevron"></span>
          </div>
        </div>

        {/* CTA Direction button */}
        <button
          className="btn btn-primary direction-btn"
          disabled={!selectedBranchId}
          onClick={handleGetDirections}
        >
          Get Direction
        </button>

        {/* Action button (Downward Arrow to Minimize) */}
        <div className="selector-actions">
          <button
            type="button"
            className="minimize-selector-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Minimize branch selector"
            title="Minimize"
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
