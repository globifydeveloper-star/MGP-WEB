'use client';

import React from 'react';
import './GoldSellComparison.css';

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

export default function GoldSellComparison() {
  return (
    <section className="gsc-section">
      <div className="gsc-glow-1" aria-hidden="true" />
      <div className="gsc-glow-2" aria-hidden="true" />

      <div className="container gsc-container">
        <div className="gsc-header">
          <p className="gsc-eyebrow">THE DIFFERENCE</p>
          <h2 className="gsc-title">
            How Muthoot Gold Point is different from <span className="gold-text">traditional jewellers</span>
          </h2>
        </div>

        {/* Column headers */}
        <div className="gsc-columns-header">
          <div className="gsc-col-header gsc-col-header--us">
            <span className="gsc-col-badge gsc-col-badge--us">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span>
              <span className="gsc-col-name">Muthoot Gold Point</span>
              <span className="gsc-col-tag">Entire process happens in front of you</span>
            </span>
          </div>

          <div className="gsc-col-header gsc-col-header--them">
            <span className="gsc-col-badge gsc-col-badge--them">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
            <span>
              <span className="gsc-col-name">Traditional Jewellers</span>
              <span className="gsc-col-tag">How unorganized players work</span>
            </span>
          </div>
        </div>

        {/* Comparison rows */}
        <div className="gsc-rows">
          {ROWS.map((row) => (
            <div className="gsc-row" key={row.label}>
              <div className="gsc-row-label">
                <span className="gsc-row-icon">{row.icon}</span>
                <span>{row.label}</span>
              </div>

              <div className="gsc-cell gsc-cell--us">
                <span className="gsc-cell-mark gsc-cell-mark--us">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <p>{row.us}</p>
              </div>

              <div className="gsc-cell gsc-cell--them">
                <span className="gsc-cell-mark gsc-cell-mark--them">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </span>
                <p>{row.them}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
