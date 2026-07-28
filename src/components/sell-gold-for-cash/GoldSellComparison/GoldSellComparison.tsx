'use client';

import React from 'react';
import Image from 'next/image';
import './GoldSellComparison.css';
import scaleImg from '@/assets/images/gold_rate_component_photos/08-valuation-process-scale.png';
import assessmentImg from '@/assets/images/gold_rate_component_photos/02-gold-valuation-assessment.png';

const ROWS = [
  {
    label: 'Valuation of your Gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
    us: 'Multilevel scientific testing for exact Gold value only',
    them: 'Touchstone gives approximate Gold value',
  },
  {
    label: 'Cleaning of your Gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z" />
      </svg>
    ),
    us: 'Cleans the Gold with ultrasonic machine to get accurate weight',
    them: 'Do not clean and deduct melting cost directly',
  },
  {
    label: 'Weighing of your Gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" />
        <path d="M5 8h14" />
        <path d="M5 8l-3 6a3 3 0 0 0 6 0z" />
        <path d="M19 8l-3 6a3 3 0 0 0 6 0z" />
        <path d="M8 21h8" />
      </svg>
    ),
    us: 'Takes up to 3 decimal points (per gram) that are showing on the weighing scale',
    them: 'Round off to lowest number showing on the weighing scale',
  },
  {
    label: 'Gold Rate',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M17 7h4v4" />
      </svg>
    ),
    us: 'Uses current market rate',
    them: 'Use lowest Gold rate of the day',
  },
  {
    label: 'Melting of your Gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c1 3-3 4-3 8a3 3 0 0 0 6 0c0-1-1-2-1-3 2 1 3 3 3 6a5 5 0 0 1-10 0c0-5 3-7 5-11z" />
      </svg>
    ),
    us: 'Multilevel scientific testing for exact Gold value only',
    them: 'Use low quality crucibles which allow Gold particles to remain inside after melting',
  },
  {
    label: 'Mode of Payment / Invoicing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2h12v20l-3-2-3 2-3-2-3 2V2z" />
        <path d="M9 7h6M9 11h6M9 15h4" />
      </svg>
    ),
    us: 'Up to ₹10,000 given as cash. Amounts higher than ₹10,000 instantly paid to your bank account via NEFT/IMPS/RTGS. Invoice is always shared.',
    them: 'Cash payment with no invoice given',
  },
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CrossIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const StoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l1.5-5h15L21 9" />
    <path d="M3 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" />
    <path d="M4 9v10h16V9" />
    <path d="M9 21v-6h6v6" />
  </svg>
);

export default function GoldSellComparison() {
  return (
    <section className="gsc-section">
      <div className="gsc-bg-pattern" aria-hidden="true" />
      <div className="gsc-glow-1" aria-hidden="true" />
      <div className="gsc-glow-2" aria-hidden="true" />

      <div className="container gsc-container">
        {/* Header */}
        <div className="gsc-header-row">
          <div className="gsc-header-text">
            <p className="gsc-eyebrow">THE DIFFERENCE</p>
            <h2 className="gsc-title">
              How Muthoot Gold Point is different from <span className="gold-text">traditional jewellers</span>
            </h2>
            <p className="gsc-subtitle">
              Every step of our process happens right in front of you &mdash; scientific, transparent and fair. See how that stacks up against the old way of selling gold.
            </p>
          </div>

          <div className="gsc-header-image">
            <Image
              src={scaleImg}
              alt="Golden balance scale weighing jewellery against gold nuggets"
              className="gsc-header-img"
              fill
              sizes="(max-width: 1100px) 100vw, 340px"
              priority={false}
            />
          </div>
        </div>

        {/* Two comparison panels */}
        <div className="gsc-panels">
          <div className="gsc-panel gsc-panel--us">
            <div className="gsc-panel-banner">
              <Image
                src={assessmentImg}
                alt="Muthoot Gold Point expert assessing gold jewellery with a jeweller's loupe"
                className="gsc-panel-banner-img"
                fill
                sizes="(max-width: 900px) 100vw, 460px"
              />
              <div className="gsc-panel-banner-overlay" />
              <span className="gsc-panel-ribbon">Recommended</span>
            </div>

            <div className="gsc-panel-head">
              <span className="gsc-panel-badge gsc-panel-badge--us">
                <CheckIcon />
              </span>
              <div>
                <h3 className="gsc-panel-name">Muthoot Gold Point</h3>
                <p className="gsc-panel-tag">Entire process happens in front of you</p>
              </div>
            </div>

            <ul className="gsc-panel-list">
              {ROWS.map((row) => (
                <li key={row.label}>
                  <span className="gsc-item-icon gsc-item-icon--us">
                    {row.icon}
                    <span className="gsc-item-mark gsc-item-mark--us"><CheckIcon /></span>
                  </span>
                  <div>
                    <strong>{row.label}</strong>
                    <p>{row.us}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="gsc-vs-badge" aria-hidden="true">VS</div>

          <div className="gsc-panel gsc-panel--them">
            <div className="gsc-panel-head">
              <span className="gsc-panel-badge gsc-panel-badge--them">
                <StoreIcon />
              </span>
              <div>
                <h3 className="gsc-panel-name">Traditional Jewellers</h3>
                <p className="gsc-panel-tag">How unorganized players work</p>
              </div>
            </div>

            <ul className="gsc-panel-list">
              {ROWS.map((row) => (
                <li key={row.label}>
                  <span className="gsc-item-icon gsc-item-icon--them">
                    {row.icon}
                    <span className="gsc-item-mark gsc-item-mark--them"><CrossIcon /></span>
                  </span>
                  <div>
                    <strong>{row.label}</strong>
                    <p>{row.them}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
