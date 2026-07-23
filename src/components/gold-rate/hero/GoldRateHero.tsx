'use client';

import React from 'react';
import Image from 'next/image';
import './GoldRateHero.css';
import heroBgImg from '@/assets/images/gold_rate_component_photos/09-hero-background-gold-bars-jewellery.png';
import {
  GOLD_RATES,
  PURITY_ORDER,
  FEATURED_RATE,
  GOLD_RATE_LAST_UPDATED_TIME,
} from '@/lib/goldRateData';

// Written as escapes (not literal glyphs) to avoid any source-encoding issues.
const RUPEE = '₹';
const ARROW_UP = '▲';
const ARROW_DOWN = '▼';

interface GoldRateHeroProps {
  onSellGoldClick: () => void;
}

const PURITY_ICONS: Record<string, React.ReactNode> = {
  '24K': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="15" width="18" height="4" rx="1" />
      <rect x="5" y="10" width="14" height="4" rx="1" />
      <rect x="7" y="5" width="10" height="4" rx="1" />
    </svg>
  ),
  '22K': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="14" r="7" />
      <path d="M9 8.5 12 3l3 5.5" />
    </svg>
  ),
  '18K': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c2.8 2.6 4.3 5.3 4.3 8a4.3 4.3 0 1 1-8.6 0c0-2.7 1.5-5.4 4.3-8Z" />
    </svg>
  ),
};

function scrollToId(id: string) {
  const el = document.getElementById(id);
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

            <div className="grh-rate-card">
              <div className="grh-rate-card-label">
                24K GOLD RATE <span>(Per Gram)</span>
              </div>
              <div className="grh-rate-card-value-row">
                <span className="grh-rate-card-value">{RUPEE}{FEATURED_RATE.perGram.toLocaleString('en-IN')}</span>
                <span className={`grh-rate-card-change grh-trend-${FEATURED_RATE.trend}`}>
                  {FEATURED_RATE.trend === 'up' ? ARROW_UP : ARROW_DOWN} {FEATURED_RATE.changePercent.toFixed(2)}%
                  ({RUPEE}{FEATURED_RATE.changeAmount})
                </span>
              </div>
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
        </div>
      </div>

      <div className="container">
        <div className="grh-purity-scroller">
          <div className="grh-purity-grid">
            {PURITY_ORDER.map((key) => {
              const rate = GOLD_RATES[key];
              return (
                <div className="grh-purity-card" key={key}>
                  <div className="grh-purity-card-header">
                    <span className="grh-purity-icon">{PURITY_ICONS[key]}</span>
                    <span className="grh-purity-title">
                      {rate.key} GOLD <span>({rate.purity})</span>
                    </span>
                  </div>

                  <div className="grh-purity-rows">
                    <div className="grh-purity-row">
                      <span className="grh-purity-row-label">Per Gram</span>
                      <span className="grh-purity-row-value">{RUPEE}{rate.perGram.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="grh-purity-row">
                      <span className="grh-purity-row-label">Per 8 Gram</span>
                      <span className="grh-purity-row-value">{RUPEE}{rate.per8Gram.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="grh-purity-row">
                      <span className="grh-purity-row-label">Per 10 Gram</span>
                      <span className="grh-purity-row-value">{RUPEE}{rate.per10Gram.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className={`grh-purity-change grh-trend-${rate.trend}`}>
                    {rate.trend === 'up' ? ARROW_UP : ARROW_DOWN} {rate.changePercent.toFixed(2)}% ({RUPEE}{rate.changeAmount})
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="grh-disclaimer">
          *Rates are indicative. Making charges and applicable deductions are not included.
        </p>
      </div>
    </section>
  );
}
