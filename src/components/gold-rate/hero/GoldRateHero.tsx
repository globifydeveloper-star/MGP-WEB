'use client';

import React from 'react';
import Image from 'next/image';
import './GoldRateHero.css';
import heroBgImg from '@/assets/images/gold_rate_component_photos/09-hero-background-gold-bars-jewellery.png';
import HeroGoldRateCard from '@/components/home/Hero/HeroGoldRateCard';
import {
  GOLD_RATES,
  PURITY_ORDER,
  FEATURED_RATE,
  GOLD_RATE_LAST_UPDATED_TIME,
} from '@/lib/goldRateData';

const RUPEE = '₹';

interface GoldRateHeroProps {
  onSellGoldClick: () => void;
}

function scrollToId(id: string) {
  const el = document.getElementById(id) || document.getElementById('gold-value-form');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function GoldRateHero({ onSellGoldClick }: GoldRateHeroProps) {
  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <section className="grh-section" id="today-gold-rate">
      <div className="grh-hero-top">
        <div className="grh-bg" aria-hidden="true">
          <Image
            src={heroBgImg}
            alt=""
            fill
            priority
            className="grh-bg-image"
            sizes="100vw"
          />
          <div className="grh-bg-overlay" />
        </div>

        <div className="container grh-top-grid">
          <div className="grh-left">
            <h1 className="grh-heading">
              Today&apos;s <span className="gold-text">Gold Rate</span>
            </h1>
            <p className="grh-subtext">
              Stay updated with the latest gold prices and know the value of your gold with complete transparency.
            </p>

            <div className="grh-meta-row">
              <span className="grh-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {today}
              </span>
              <span className="grh-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3.5 2" />
                </svg>
                {GOLD_RATE_LAST_UPDATED_TIME}
              </span>
              <span className="live-indicator">
                <span className="live-indicator-dot" />
                Live Rate
              </span>
            </div>

            <div className="grh-cta-row">
              <button type="button" className="btn btn-primary" onClick={() => scrollToId('gold-calculator')}>
                Calculate Gold Value
              </button>
              <button type="button" className="btn btn-outline" onClick={onSellGoldClick}>
                Sell Your Gold
              </button>
            </div>
          </div>

          <div className="grh-right">
            <HeroGoldRateCard />
          </div>
        </div>
      </div>
    </section>
  );
}
