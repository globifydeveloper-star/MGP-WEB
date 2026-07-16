'use client';

import React from 'react';
import Image from 'next/image';
import './hero.css';
import sparkle2Img from '@/assets/images/sparkle2.png';

export default function HeroGoldRateCard() {
  const handleScrollToForm = () => {
    const element = document.getElementById('gold-value-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-gold-rate-card-v2">
      {/*
        Sparkle flares positioned relative to the card itself (not the
        canvas) so they travel with it if the card ever moves, instead of
        drifting apart like they did when both were pinned to separate
        absolute canvas coordinates.
      */}
      <Image
        src={sparkle2Img}
        alt=""
        aria-hidden="true"
        className="hero-sparkle-flare"
        style={{ left: -37.77, top: -15.79 }}
        width={145}
        height={34}
      />
      <Image
        src={sparkle2Img}
        alt=""
        aria-hidden="true"
        className="hero-sparkle-flare"
        style={{ left: 132.86, top: 242.78 }}
        width={145}
        height={34}
      />

      {/* Animated Glowing border beam (aura/shine effect) */}
      <svg className="gold-beam-svg" viewBox="0 0 256 258" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="shine-gradient" x1="-100%" y1="-100%" x2="0%" y2="0%">
            <animate attributeName="x1" from="-100%" to="200%" dur="4s" repeatCount="indefinite" />
            <animate attributeName="y1" from="-100%" to="200%" dur="4s" repeatCount="indefinite" />
            <animate attributeName="x2" from="0%" to="300%" dur="4s" repeatCount="indefinite" />
            <animate attributeName="y2" from="0%" to="300%" dur="4s" repeatCount="indefinite" />
            
            <stop offset="0%" stopColor="#EBAF20" stopOpacity="0" />
            <stop offset="40%" stopColor="#EBAF20" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="60%" stopColor="#EBAF20" stopOpacity="0" />
            <stop offset="100%" stopColor="#EBAF20" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect 
          x="0.5" 
          y="0.5" 
          width="255" 
          height="257" 
          rx="15.5" 
          fill="none" 
          stroke="url(#shine-gradient)"
          className="gold-beam-rect"
        />
      </svg>

      <div className="rate-card-header-v2">
        <span className="rate-card-title-v2">Today's Gold Rate</span>
        <div className="rate-card-live-indicator">
          <span className="live-dot-v2" />
          <span>Live</span>
        </div>
      </div>
      <div className="rate-card-divider" />
      <div className="rate-card-purity-v2">24K (999)</div>
      <div className="rate-card-price-value">
        <span>₹9,185</span>
        <span className="rate-card-price-unit">/g</span>
      </div>
      <button className="btn-rate-card-cta-v2" onClick={handleScrollToForm}>
        <span>Check Full rate</span>
        <span className="rate-card-cta-arrow">&gt;</span>
      </button>
    </div>
  );
}
