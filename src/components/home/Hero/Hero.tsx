'use client';

import React, { useState } from 'react';
import './hero.css';
import HeroLeftColumn from './HeroLeftColumn';
import HeroRightColumn from './HeroRightColumn';
import Image from 'next/image';
import heroWaveImg from '@/assets/images/hero-wave.png';
import coinImg from '@/assets/images/COIN.png';

const branchData: Record<string, string[]> = {
  'Karnataka': ['Bengaluru - Jayanagar', 'Bengaluru - Indiranagar', 'Bengaluru - Koramangala'],
  'Tamil Nadu': ['Chennai - T. Nagar', 'Chennai - Adyar', 'Coimbatore'],
  'Kerala': ['Kochi - MG Road', 'Trivandrum - East Fort', 'Calicut'],
  'Maharashtra': ['Mumbai - Andheri', 'Pune - Deccan Gymkhana', 'Nagpur'],
  'Delhi': ['Connaught Place', 'Karol Bagh', 'Nehru Place']
};

export default function Hero() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectorOpen, setSelectorOpen] = useState(true);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedBranch(''); // Reset branch selection when state changes
  };

  const handleGetDirection = () => {
    if (selectedBranch && selectedState) {
      alert(`Opening directions for Muthoot Goldpoint, ${selectedBranch}, ${selectedState}`);
    }
  };

  return (
    <section className="hero-section-root-v2">
      {/* Decorative Large Circle Outline behind model */}
      <div className="hero-circle-outline-deco" aria-hidden="true" />

      {/* Main Grid Content Container */}
      <div className="hero-container-v2">
        {/* Decorative Floating Coin */}
        <Image
          src={coinImg}
          alt=""
          aria-hidden="true"
          className="hero-floating-coin-left"
          priority
        />

        {/* Left Column (Branding & Copy) */}
        <HeroLeftColumn />

        {/* Right Column (Model, Arc Curve, Gold Rate Overlay) */}
        <HeroRightColumn />
      </div>

      {/* Dismissible Bottom Branch-Selector Bar */}
      {selectorOpen && (
        <div className="hero-branch-selector-bar-v2">
          {/* Background Wave Image */}
          <Image
            src={heroWaveImg}
            alt=""
            aria-hidden="true"
            className="hero-branch-bar-wave-bg"
            style={{
              width: 1188.93,
              height: 705.97,
              transform: 'rotate(17deg)',
              transformOrigin: 'top left',
            }}
            priority
          />
          {/* Label Info */}
          <div className="branch-bar-text-group">
            <span className="branch-bar-top-label">Sell gold instantly at</span>
            <span className="branch-bar-main-title">Select a branch</span>
          </div>

          {/* Purity & Rate */}
          <div className="branch-bar-price-badge">
            <span className="price-badge-purity">22K/G</span>
            <span className="price-badge-value">₹8,629</span>
          </div>

          {/* Dropdown Select Controls */}
          <div className="branch-bar-controls">
            {/* State Select */}
            <div className="branch-select-container-v2">
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="branch-select-field-v2"
              >
                <option value="" disabled>Select State</option>
                {Object.keys(branchData).map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <span className="branch-select-chevron-v2">&darr;</span>
            </div>

            {/* Branch Select */}
            <div className="branch-select-container-v2">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                disabled={!selectedState}
                className="branch-select-field-v2"
              >
                <option value="" disabled>Select Branch</option>
                {selectedState && branchData[selectedState].map((branch) => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
              <span className="branch-select-chevron-v2">&darr;</span>
            </div>
          </div>

          {/* Get Direction CTA */}
          <button
            onClick={handleGetDirection}
            disabled={!selectedBranch}
            className="btn-branch-bar-direction-v2"
          >
            Get Direction
          </button>

          {/* Dismiss button */}
          <button
            onClick={() => setSelectorOpen(false)}
            className="branch-bar-close-btn-v2"
            aria-label="Close branch selector"
          >
            <svg className="branch-bar-close-icon-v2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {/* Stats Ribbon at the very bottom */}
      <div className="hero-stats-ribbon-v2">
        <div className="hero-stats-container-v2">
          {/* Stat 1: Branches */}
          <div className="hero-stat-item-v2">
            <div className="hero-stat-circle-icon">
              <svg className="hero-stat-item-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9l2.1 2.1m10 10l2.1 2.1M4.9 19.1l2.1-2.1m10-10l2.1-2.1" />
              </svg>
            </div>
            <div className="hero-stat-info-v2">
              <span className="hero-stat-metric-value">4,200</span>
              <span className="hero-stat-metric-label">Branches across India</span>
            </div>
          </div>

          {/* Stat 2: Legacy */}
          <div className="hero-stat-item-v2">
            <div className="hero-stat-circle-icon">
              <svg className="hero-stat-item-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="hero-stat-info-v2">
              <span className="hero-stat-metric-value">133+</span>
              <span className="hero-stat-metric-label">Years of legacy</span>
            </div>
          </div>

          {/* Stat 3: Employees */}
          <div className="hero-stat-item-v2">
            <div className="hero-stat-circle-icon">
              <svg className="hero-stat-item-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <div className="hero-stat-info-v2">
              <span className="hero-stat-metric-value">24,000</span>
              <span className="hero-stat-metric-label">Employees serving millions</span>
            </div>
          </div>

          {/* Stat 4: Customers */}
          <div className="hero-stat-item-v2">
            <div className="hero-stat-circle-icon">
              <svg className="hero-stat-item-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8" cy="7" r="4" />
                <path d="M22 9l-6 6-4-4" />
              </svg>
            </div>
            <div className="hero-stat-info-v2">
              <span className="hero-stat-metric-value">1,00,000</span>
              <span className="hero-stat-metric-label">Customers per day</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
