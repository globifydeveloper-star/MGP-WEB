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
      <div className="hero-pattern-deco" aria-hidden="true" />

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
              transform: 'rotate(10deg) scale(1.05)',
              transformOrigin: 'top left'
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
              <svg className="branch-select-chevron-v2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
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
              <svg className="branch-select-chevron-v2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
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
              <svg className="hero-stat-item-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="9" x2="9" y2="4" />
                <line x1="9" y1="4" x2="16" y2="5" />
                <line x1="4" y1="9" x2="11" y2="13" />
                <line x1="11" y1="13" x2="16" y2="5" />
                <line x1="11" y1="13" x2="14" y2="20" />
                <line x1="16" y1="5" x2="20" y2="12" />
                <line x1="14" y1="20" x2="20" y2="12" />
                <circle cx="4" cy="9" r="2.5" fill="currentColor" />
                <circle cx="9" cy="4" r="2.5" fill="currentColor" />
                <circle cx="16" cy="5" r="2.5" fill="currentColor" />
                <circle cx="11" cy="13" r="2.5" fill="currentColor" />
                <circle cx="20" cy="12" r="2.5" fill="currentColor" />
                <circle cx="14" cy="20" r="2.5" fill="currentColor" />
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
              <svg className="hero-stat-item-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="12 7.5 13.5 10.5 17 11 14.5 13.3 15.2 16.7 12 15 8.8 16.7 9.5 13.3 7 11 10.5 10.5" fill="currentColor" />
                <path d="M7 10a3 3 0 0 0 0 4M6 8a5 5 0 0 0 0 8" />
                <path d="M17 10a3 3 0 0 1 0 4M18 8a5 5 0 0 1 0 8" />
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
              <svg className="hero-stat-item-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="7" r="3" />
                <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                <circle cx="6" cy="9" r="2.5" />
                <path d="M2 19v-1a3 3 0 0 1 3-3h1" />
                <circle cx="18" cy="9" r="2.5" />
                <path d="M18 15h1a3 3 0 0 1 3 1v1" />
              </svg>
            </div>
            <div className="hero-stat-info-v2">
              <span className="hero-stat-metric-value">24,000</span>
              <span className="hero-stat-metric-label">Employees serving millions of customer</span>
            </div>
          </div>

          {/* Stat 4: Customers */}
          <div className="hero-stat-item-v2">
            <div className="hero-stat-circle-icon">
              <svg className="hero-stat-item-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4-4a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0l-1.4 1.4" />
                <path d="m18 10.1 1.4-1.4a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0l-1.4 1.4a1 1 0 0 0 0 1.4l1.4 1.4" />
                <path d="m3 21 9-9" />
                <path d="m5 13 4-4" />
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
