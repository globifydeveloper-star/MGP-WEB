'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import './GoldSellComparison.css';
import assessmentImg from '@/assets/images/gold_rate_component_photos/02-gold-valuation-assessment.png';

const COMPARISON_ROWS = [
  {
    title: 'Valuation of your gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
    mgpText: 'Multilevel scientific testing for exact gold value only.',
    tradText: 'Touchstone gives approximate gold value.',
  },
  {
    title: 'Cleaning of your gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z" />
      </svg>
    ),
    mgpText: 'Cleans the gold with an ultrasonic machine to get accurate weight.',
    tradText: 'Do not clean and deduct melting cost directly.',
  },
  {
    title: 'Weighing of your gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" />
        <path d="M5 8h14" />
        <path d="M5 8l-3 6a3 3 0 0 0 6 0z" />
        <path d="M19 8l-3 6a3 3 0 0 0 6 0z" />
        <path d="M8 21h8" />
      </svg>
    ),
    mgpText: 'Takes up to 3 decimal points (per gram) shown on the weighing scale.',
    tradText: 'Rounds off to the lowest number showing on the weighing scale.',
  },
  {
    title: 'Gold rate',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M17 7h4v4" />
      </svg>
    ),
    mgpText: 'Uses current market rate.',
    tradText: 'Uses lowest gold rate of the day.',
  },
  {
    title: 'Melting of your gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c1 3-3 4-3 8a3 3 0 0 0 6 0c0-1-1-2-1-3 2 1 3 3 3 6a5 5 0 0 1-10 0c0-5 3-7 5-11z" />
      </svg>
    ),
    mgpText: 'Multilevel scientific testing for exact gold value only.',
    tradText: 'Uses low quality crucibles which let gold particles remain inside after melting.',
  },
  {
    title: 'Mode of payment / invoicing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    mgpText: 'Up to ₹10,000 given as cash. Amounts higher than ₹10,000 instantly paid to your bank account via NEFT/IMPS/RTGS. Invoice always shared.',
    tradText: 'Cash payment with no invoice given.',
  },
];

export default function GoldSellComparison() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleRow = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="gsc-section">
      <div className="gsc-bg-pattern" aria-hidden="true" />
      <div className="gsc-glow-1" aria-hidden="true" />
      <div className="gsc-glow-2" aria-hidden="true" />

      <div className="container gsc-container">
        {/* Header */}
        <div className="gsc-header">
          <div className="compare-eyebrow">The difference</div>
          <h2 className="compare-heading">
            How Muthoot Gold Point is different from <span>traditional jewellers</span>
          </h2>
          <p className="compare-sub">
            Every step of our process happens right in front of you &mdash; scientific, transparent and fair. Tap a step to see how it compares to the old way of selling gold.
          </p>
        </div>

        {/* Main Grid: Left Accordion List + Right Featured Visual Card */}
        <div className="compare-grid">
          {/* Left Column: Interactive Accordion */}
          <div className="compare-list">
            {COMPARISON_ROWS.map((row, idx) => {
              const isActive = openIndex === idx;
              return (
                <div key={row.title} className={`compare-row ${isActive ? 'active' : ''}`}>
                  <button
                    type="button"
                    className="compare-row-head"
                    onClick={() => toggleRow(idx)}
                    aria-expanded={isActive}
                  >
                    <div className="compare-icon">{row.icon}</div>
                    <div className="compare-row-title">{row.title}</div>
                    <div className="compare-chevron">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  <div className="compare-row-body">
                    <div className="compare-body-inner">
                      <div className="compare-col mgp">
                        <div className="compare-col-label">&check; Muthoot Gold Point</div>
                        <p className="compare-col-text">{row.mgpText}</p>
                      </div>
                      <div className="compare-col trad">
                        <div className="compare-col-label">Traditional jewellers</div>
                        <p className="compare-col-text">{row.tradText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Featured Visual Banner Card */}
          <div className="compare-banner-card">
            <div className="compare-banner-img-wrap">
              <Image
                src={assessmentImg}
                alt="Muthoot Gold Point scientific gold valuation assessment"
                className="compare-banner-img"
                fill
                sizes="(max-width: 1024px) 100vw, 380px"
              />
              <div className="compare-banner-overlay" />
              <span className="compare-banner-badge">100% Transparent</span>
            </div>
            <div className="compare-banner-content">
              <h3 className="compare-banner-title">Scientific Gold Valuation</h3>
              <p className="compare-banner-desc">
                From ultrasonic ornament cleaning to XRF gold purity analysis and 3-decimal precision weighing, experience the fair &amp; trusted way to sell your gold.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
