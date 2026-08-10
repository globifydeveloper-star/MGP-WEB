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
  const [isVisible, setIsVisible] = useState(true);

  // Reset selector bar to VISIBLE state on route change
  useEffect(() => {
    setIsVisible(true);
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
      {/* Main Branch Selector Bar (Visible at top of page & on light scroll up; hidden on scroll down) */}
      <div className={`branch-selector-bar glass-panel ${isVisible ? 'is-visible' : 'is-hidden'}`}>
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
      </div>
    </div>
  );
}

