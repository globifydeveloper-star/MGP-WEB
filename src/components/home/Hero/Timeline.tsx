'use client';

import React from 'react';

export default function Timeline() {
  return (
    <div className="dotted-curve-container">
      {/* SVG Dotted Arc */}
      <svg className="dotted-arc-svg" viewBox="0 0 300 480" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Curved Path - bows LEFT (reversed) */}
        <path 
          d="M 60 10 Q 10 240 60 470" 
          stroke="#F1B933" 
          strokeWidth="1.5" 
          strokeDasharray="6 6"
          fill="none" 
        />
        {/* Top Gold Star/Sparkle */}
        <path 
          d="M 60 10 L 63 15 L 68 16 L 63 17 L 60 22 L 57 17 L 52 16 L 57 15 Z" 
          fill="#F1B933" 
        />
        {/* Bottom Sparkle decoration */}
        <path 
          d="M 60 470 L 62 473 L 65 474 L 62 475 L 60 478 L 58 475 L 55 474 L 58 473 Z" 
          fill="#F1B933" 
        />
      </svg>

      {/* Benefit Badge 1: Best Value */}
      <div className="benefit-badge badge-1">
        <div className="badge-icon-wrapper">
          <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {/* Rupee coin symbol */}
            <circle cx="12" cy="12" r="10" />
            <path d="M8 8h8M8 12h8M9 8v8M13 8c1.5 0 2.5 1 2.5 2s-1 2-2.5 2" />
            <path d="M12 14l-4 4" />
          </svg>
        </div>
        <div className="badge-content">
          <p className="badge-text-top">Get the</p>
          <p className="badge-text-highlight">Best Value</p>
          <p className="badge-text-bottom">for your gold</p>
        </div>
      </div>

      {/* Benefit Badge 2: Transparent */}
      <div className="benefit-badge badge-2">
        <div className="badge-icon-wrapper">
          <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {/* Balance scales */}
            <path d="M12 3v17M12 5L6 7M12 5l6 2M6 7v3c0 2.2 1.8 4 4 4M18 7v3c0 2.2-1.8 4-4 4" />
            <path d="M9 20h6" />
          </svg>
        </div>
        <div className="badge-content">
          <p className="badge-text-highlight">Transparent</p>
          <p className="badge-text-normal">Gold evaluation</p>
          <p className="badge-text-bottom">process</p>
        </div>
      </div>

      {/* Benefit Badge 3: Instant Payment */}
      <div className="benefit-badge badge-3">
        <div className="badge-icon-wrapper">
          <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {/* Instant payment/card with arrow */}
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20M6 14h4M18 14l-2 2 2 2" />
          </svg>
        </div>
        <div className="badge-content">
          <p className="badge-text-highlight">Instant Payment</p>
          <p className="badge-text-bottom">after valuation</p>
        </div>
      </div>
    </div>
  );
}
