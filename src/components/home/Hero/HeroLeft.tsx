'use client';

import React from 'react';

export default function HeroLeft() {
  return (
    <div className="hero-left-col">
      {/* Trust Badge */}
      <div className="trust-badge-row">
        <div className="trust-badge-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="badge-svg">
            <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M21 3h-6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
          </svg>
        </div>
        <span className="trust-badge-text">
          Trusted by <span className="highlight">5 Lakh+ Customers</span> Across India
        </span>
      </div>

      {/* Headings */}
      <h1 className="hero-title">
        Sell Your Gold. <br />
        <span className="gold-text">Get Cash Today.</span>
      </h1>

      {/* Subtitle */}
      <p className="hero-subtitle-desc">
        Get the True Market Value Old, Unused or pledged gold through a transparent 
        process conducted entirely in front of you
      </p>

      {/* Action Buttons */}
      <div className="hero-cta-group">
        <button className="btn btn-primary hero-btn-find">
          Find Nearest Branch
        </button>
        <button className="btn btn-outline hero-btn-works">
          See how it works
        </button>
      </div>
    </div>
  );
}
