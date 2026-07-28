'use client';

import React, { useState } from 'react';
import './TheMgpDifference.css';

const COMPARISONS = [
  {
    category: 'Valuation of Gold',
    icon: '🔍',
    mgp: 'Multilevel scientific testing using German XRF spectroscopic machine for exact purity determination without melting.',
    traditional: 'Touchstone rubbing test which gives only a rough approximation and damages surface gold.',
  },
  {
    category: 'Cleaning of Gold',
    icon: '✨',
    mgp: 'Free Ultrasonic cleaning removes dirt, wax, and grime to give exact net weight before evaluation.',
    traditional: 'No cleaning provided. Direct arbitrary weight deduction for suspected dirt.',
  },
  {
    category: 'Weighing Precision',
    icon: '⚖️',
    mgp: 'Precision balances weighing up to 3 decimal places (0.001g). Every milligram counts.',
    traditional: 'Rounds off down to the lowest digit showing on scale, depriving you of actual weight value.',
  },
  {
    category: 'Gold Rate Applied',
    icon: '📈',
    mgp: 'Real-time live market gold rate at the exact moment of valuation.',
    traditional: 'Applies lowest market rate of the day or arbitrary shop rates.',
  },
  {
    category: 'Melting Process',
    icon: '🔥',
    mgp: 'Melted in front of you using high-grade graphite crucibles that retain zero gold particles.',
    traditional: 'Low-quality porous crucibles where gold residue remains trapped inside after melting.',
  },
  {
    category: 'Payment & Invoice',
    icon: '🧾',
    mgp: 'Instant cash up to ₹10,000. Balance paid immediately via NEFT/IMPS with full GST tax invoice.',
    traditional: 'Undocumented cash payment with no GST receipt or legal guarantee.',
  },
];

export default function TheMgpDifference() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <section className="sg-diff-section">
      <div className="container">
        
        <div className="sg-diff-header">
          <span className="sg-diff-tag">CLEAR COMPARISON</span>
          <h2 className="sg-diff-title">
            How Muthoot Gold Point <br className="sg-br-desktop" />
            is Different from <span className="sg-title-highlight">Traditional Jewellers</span>
          </h2>
          <p className="sg-diff-subtitle">
            See how our scientific, transparent process guarantees full value for your gold compared to unorganized players.
          </p>
          <div className="sg-diff-line" />
        </div>

        {/* Desktop Comparison Table */}
        <div className="sg-diff-table-container">
          <div className="sg-diff-table-header">
            <div className="sg-th-col sg-col-feature">Parameter</div>
            <div className="sg-th-col sg-col-mgp">
              <div className="sg-logo-badge">MUTHOOT GOLD POINT</div>
              <span>Scientific & Transparent</span>
            </div>
            <div className="sg-th-col sg-col-trad">
              <div className="sg-trad-badge">TRADITIONAL JEWELLERS</div>
              <span>Unorganized & Approximate</span>
            </div>
          </div>

          <div className="sg-diff-table-body">
            {COMPARISONS.map((item, idx) => (
              <div key={idx} className="sg-diff-row">
                <div className="sg-td-col sg-col-feature">
                  <span className="sg-feature-icon">{item.icon}</span>
                  <span className="sg-feature-name">{item.category}</span>
                </div>
                <div className="sg-td-col sg-col-mgp">
                  <div className="sg-check-mark">✓</div>
                  <span>{item.mgp}</span>
                </div>
                <div className="sg-td-col sg-col-trad">
                  <div className="sg-cross-mark">✕</div>
                  <span>{item.traditional}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Accordion View */}
        <div className="sg-diff-mobile-accordion">
          {COMPARISONS.map((item, idx) => {
            const isOpen = activeCategory === idx;
            return (
              <div key={idx} className={`sg-acc-item ${isOpen ? 'open' : ''}`}>
                <button
                  className="sg-acc-header"
                  onClick={() => setActiveCategory(isOpen ? null : idx)}
                >
                  <div className="sg-acc-header-left">
                    <span className="sg-acc-icon">{item.icon}</span>
                    <span className="sg-acc-title">{item.category}</span>
                  </div>
                  <span className="sg-acc-toggle">{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <div className="sg-acc-body">
                    <div className="sg-acc-box sg-acc-mgp">
                      <div className="sg-acc-box-title">✓ Muthoot Gold Point</div>
                      <p>{item.mgp}</p>
                    </div>
                    <div className="sg-acc-box sg-acc-trad">
                      <div className="sg-acc-box-title">✕ Traditional Jeweller</div>
                      <p>{item.traditional}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
