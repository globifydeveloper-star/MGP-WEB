'use client';

import React from 'react';

export default function GoldRateCard() {
  return (
    <div className="gold-rate-card glass-panel">
      {/* Header Row: Title & Live Badge */}
      <div className="card-header-row">
        <span className="card-title">Today&apos;s Gold Rate</span>
        <div className="live-indicator">
          <span className="live-indicator-dot"></span>
          <span>Live</span>
        </div>
      </div>

      {/* Gold Purity Badge */}
      <div className="gold-purity">24K (999)</div>

      {/* Main Rate Figure */}
      <div className="gold-rate-value">
        <span className="rupee-symbol">₹</span>
        <span className="rate-number">9,185</span>
        <span className="rate-unit">/g</span>
      </div>

      {/* Footer CTA Button */}
      <button className="btn-rate-cta">
        <span>Check Full rate</span>
        <svg 
          className="cta-arrow" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
