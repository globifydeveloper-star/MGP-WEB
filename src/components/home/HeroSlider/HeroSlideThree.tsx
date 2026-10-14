'use client';

import React from 'react';
import HeroGoldRateCard from '@/components/home/Hero/HeroGoldRateCard';
import './HeroSlideThree.css';
import { SHOW_GOLD_RATE_CARD } from '@/lib/featureFlags';

export interface HeroSlideData {
  heroText?: string;
  heroSubtext?: string;
  heroImage?: any;
  button1?: { enabled?: boolean; label?: string; link?: string };
  button2?: { enabled?: boolean; label?: string; link?: string };
}

interface HeroSlideThreeProps {
  slide?: HeroSlideData;
  imageSrc?: any;
  trustBadgePrefix?: string;
  trustBadgeHighlight?: string;
  trustBadgeSuffix?: string;
}

export default function HeroSlideThree({
  slide,
  imageSrc,
  trustBadgePrefix = 'Muthoot Gold Point:',
  trustBadgeHighlight = 'India’s First Organised Gold Recycler',
  trustBadgeSuffix = '',
}: HeroSlideThreeProps) {
  const btn1Enabled = slide?.button1?.enabled !== false;
  const btn1Label = slide?.button1?.label || 'Locate Nearest Branch';
  const btn1Link = slide?.button1?.link || '#branches';

  const btn2Enabled = slide?.button2?.enabled !== false;
  const btn2Label = slide?.button2?.label || 'Our Transparent Process';
  const btn2Link = slide?.button2?.link || '#gold-sell-process';

  const handleCta = (link: string) => {
    if (!link) return;
    if (link.startsWith('#')) {
      const element = document.getElementById(link.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      try {
        const url = new URL(link, window.location.origin);
        if (url.origin === window.location.origin) {
          window.location.href = link;
        } else {
          window.open(link, '_blank');
        }
      } catch (e) {
        window.location.href = link;
      }
    }
  };

  return (
    <section className="hero-slide-three-section">
      {/* Background with Ambient Radial Glows & Subtle Pattern */}
      <div className="hero-slide-three-bg" aria-hidden="true">
        <div className="hero-slide-three-pattern" />
        <div className="hero-slide-three-overlay" />
      </div>

      <div className="hero-slide-three-container">
        <div className="hero-slide-three-content">
          {/* Trust & Sustainability Badge */}
          <div className="hero-slide-three-badge">
            <span className="hero-slide-three-badge-icon" aria-hidden="true">
              {/* Eco Leaf & Star Hybrid Icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </span>
            <span className="hero-slide-three-badge-text">
              <span className="hero-slide-three-badge-highlight">{trustBadgePrefix}</span>{' '}
              {trustBadgeHighlight} {trustBadgeSuffix}
            </span>
          </div>

          {/* Slide Heading */}
          <h2 className="hero-slide-three-title">
            <span className="hero-slide-three-title-white">Recycle Your Gold.</span>
            <span className="hero-slide-three-title-gradient">Protect Nature, Empower the Nation</span>
          </h2>

          <p className="hero-slide-three-subtitle">
            Every gram of recycled gold creates a positive ripple effect — conserving the environment, preserving foreign reserves, and ensuring total fairness.
          </p>

          {/* 3 Themed Feature Cards with Distinct Visual Accents */}
          <div className="hero-slide-three-pillars">
            {/* 1. Helping Nature */}
            <div className="hero-slide-three-card hero-slide-three-card-nature">
              <div className="hero-slide-three-card-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22v-9" />
                  <path d="M12 13c-3-3-6-3-9 0 0-4.5 4.5-9 9-9s9 4.5 9 9c-3-3-6-3-9 0Z" />
                  <path d="M8 17c1.5 1.5 3 2 4 2s2.5-.5 4-2" />
                </svg>
              </div>
              <div className="hero-slide-three-card-body">
                <div className="hero-slide-three-card-header">
                  <h3 className="hero-slide-three-card-title">Helping Nature</h3>
                  <span className="hero-slide-three-card-tag">Eco Conservation</span>
                </div>
                <p className="hero-slide-three-card-text">
                  Helping Nature by reducing the mining for extracting gold from the gold mines, preserving ecosystems and natural resources.
                </p>
              </div>
            </div>

            {/* 2. Helping Government / CAD */}
            <div className="hero-slide-three-card hero-slide-three-card-nation">
              <div className="hero-slide-three-card-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M4 18h16" />
                  <path d="M6 18v-7" />
                  <path d="M10 18v-7" />
                  <path d="M14 18v-7" />
                  <path d="M18 18v-7" />
                  <path d="M12 2 3 7h18l-9-5Z" />
                </svg>
              </div>
              <div className="hero-slide-three-card-body">
                <div className="hero-slide-three-card-header">
                  <h3 className="hero-slide-three-card-title">Helping Government</h3>
                  <span className="hero-slide-three-card-tag">Economic Growth</span>
                </div>
                <p className="hero-slide-three-card-text">
                  Helping government through reducing Current Account Deficit by importing less gold from International market.
                </p>
              </div>
            </div>

            {/* 3. Transparent Process */}
            <div className="hero-slide-three-card hero-slide-three-card-trust">
              <div className="hero-slide-three-card-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18" />
                  <path d="M4 7h16" />
                  <path d="m3 7 4 7a2.5 2.5 0 0 0 5 0L8 7" />
                  <path d="m16 7-4 7a2.5 2.5 0 0 0 5 0l4-7" />
                </svg>
              </div>
              <div className="hero-slide-three-card-body">
                <div className="hero-slide-three-card-header">
                  <h3 className="hero-slide-three-card-title">Transparent Process</h3>
                  <span className="hero-slide-three-card-tag">100% Scientific</span>
                </div>
                <p className="hero-slide-three-card-text">
                  Advanced German XRF purity testing right in front of you, 3-decimal precision weighing, and instant direct bank settlement.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-slide-three-cta-group">
            {btn1Enabled && (
              <button
                className="btn-gold-gradient hero-slide-three-btn"
                onClick={() => handleCta(btn1Link)}
              >
                {btn1Label}
              </button>
            )}
            {btn2Enabled && (
              <button
                className="hero-slide-three-btn hero-slide-three-btn-secondary"
                onClick={() => handleCta(btn2Link)}
              >
                {btn2Label}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Gold Rate Card */}
        {SHOW_GOLD_RATE_CARD && (
          <div className="hero-slide-three-mobile-rate-card">
            <div className="hero-mobile-rate-card-container">
              <HeroGoldRateCard />
            </div>
          </div>
        )}
      </div>

      {/* Desktop Gold Rate Card Canvas - Matches Slide 1 & Slide 2 Positioning */}
      {SHOW_GOLD_RATE_CARD && (
        <div className="hero-scaled-host hero-figma-canvas-host hero-slide-three-desktop-rate-card">
          <div className="hero-figma-canvas">
            <HeroGoldRateCard />
          </div>
        </div>
      )}
    </section>
  );
}
