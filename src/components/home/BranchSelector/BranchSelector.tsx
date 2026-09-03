'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useBranchMaster } from '@/hooks/useBranchMaster';
import { getUniqueStates, getBranchesByState } from '@/data/branchesData';
import { useLiveGoldRates } from '@/hooks/useLiveGoldRates';
import './BranchSelector.css';

export default function BranchSelector() {
  const pathname = usePathname();
  const [selectedState, setSelectedState] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // Reset selector bar to VISIBLE & un-minimized state on route change
  useEffect(() => {
    setIsVisible(true);
    setIsMinimized(false);
  }, [pathname]);

  // Hide bar on scroll down, reveal on scroll up
  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show when near the very top of the page
      if (currentScrollY < 80) {
        setIsVisible(true);
      } else {
        const delta = currentScrollY - lastScrollY;
        // Scroll down threshold (> 6px) -> Hide bar
        if (delta > 6) {
          setIsVisible(false);
        }
        // Scroll up threshold (< -6px) -> Show bar
        else if (delta < -6) {
          setIsVisible(true);
        }
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { states: bmStates, branchesByState } = useBranchMaster();
  const { rates } = useLiveGoldRates();
  const currentRate = rates['24K'];

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
      {/* Main Branch Selector Bar */}
      <div className={`branch-selector-bar glass-panel ${!isMinimized && isVisible ? 'is-visible' : 'is-hidden'}`}>
        {/* Header Row: Info & Rate */}
        <div className="selector-header-row">
          <div className="selector-section-info">
            <span className="info-title">Sell gold instantly at</span>
            <span className="info-subtitle">Select a branch</span>
          </div>

          <div className="selector-rate-badge">
            <span className="rate-label">24K/G</span>
            <span className="rate-price">₹{currentRate ? currentRate.perGram.toLocaleString('en-IN') : '8,629'}</span>
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

        {/* Actions: Minimize Button */}
        <div className="selector-actions">
          <button
            type="button"
            className="minimize-selector-btn"
            onClick={() => setIsMinimized(true)}
            aria-label="Minimize Branch Locator"
            title="Minimize"
          >
            <svg
              className="minimize-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>

      {/* Minimized Tab Widget */}
      <div
        className={`branch-selector-minimized-tab ${isMinimized ? 'is-visible' : 'is-hidden'}`}
        onClick={() => {
          setIsMinimized(false);
          setIsVisible(true);
        }}
        role="button"
        tabIndex={0}
        aria-label="Expand Branch Locator"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsMinimized(false);
            setIsVisible(true);
          }
        }}
      >
        <span className="minimized-rate-badge">24K/G ₹{currentRate ? currentRate.perGram.toLocaleString('en-IN') : '8,629'}</span>
        <span className="minimized-tab-label">Select Branch</span>
        <svg
          className="expand-chevron"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </div>
    </div>
  );
}
