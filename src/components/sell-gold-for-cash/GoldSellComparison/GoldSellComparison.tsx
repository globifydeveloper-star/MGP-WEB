'use client';

import React from 'react';
import Image from 'next/image';
import './GoldSellComparison.css';
import logoImg from '@/assets/images/gp-logo.png';

const COMPARISON_ROWS = [
  {
    title: 'Valuation of your Gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05" />
        <path d="M12 22.08V12" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    ),
    mgpText: 'Multilevel scientific testing for exact Gold value only',
    tradText: 'Touchstone gives approximate Gold value',
  },
  {
    title: 'Cleaning of your Gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 16V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10" />
        <path d="M4 16c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2z" />
        <path d="M8 10h8" />
        <path d="M12 14v.01" />
      </svg>
    ),
    mgpText: 'Cleans the Gold with ultrasonic machine to get accurate weight',
    tradText: 'Do not clean and deduct melting cost directly',
  },
  {
    title: 'Weighing of your Gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" />
        <path d="M5 8h14" />
        <path d="M5 8l-3 6a3 3 0 0 0 6 0z" />
        <path d="M19 8l-3 6a3 3 0 0 0 6 0z" />
        <path d="M8 21h8" />
      </svg>
    ),
    mgpText: 'Takes up to 3 decimals points (per gram) that are showing on the weighing scale',
    tradText: 'Round off to lowest number showing on the weighing scale',
  },
  {
    title: 'Gold rate',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    mgpText: 'Uses current market rate',
    tradText: 'Use lowest Gold rate of the day',
  },
  {
    title: 'Melting of your Gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c1 3-3 4-3 8a3 3 0 0 0 6 0c0-1-1-2-1-3 2 1 3 3 3 6a5 5 0 0 1-10 0c0-5 3-7 5-11z" />
      </svg>
    ),
    mgpText: 'Multilevel scientific testing for exact Gold value only',
    tradText: 'Use low quality crucibles which allows Gold particles to remain inside after melting',
  },
  {
    title: 'Mode of payment / invoicing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    mgpText: 'Up to Rs 10,000 given as cash. Amounts higher than Rs 10,000 instantly paid to your bank account via NEFT/IMPS/RT. Invoice is always shared.',
    tradText: 'Cash payment with no invoice given',
  },
];

const ArrowLeft = () => (
  <svg className="compare-arrow left" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="#D3D3D3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 18L15 12L21 6" stroke="#D3D3D3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRight = () => (
  <svg className="compare-arrow right" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="#D3D3D3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 18L9 12L3 6" stroke="#D3D3D3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function GoldSellComparison() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleRow = (idx: number) => {
    setOpenIndex(prev => prev === idx ? null : idx);
  };

  return (
    <section className="gsc-section" id="comparison-section">
      <div className="container">
        {/* Header Title */}
        <h2 className="gsc-title">
          How Muthoot Gold Point<br />
          is different from traditional jewellers
        </h2>

        {/* Column Headers */}
        <div className="gsc-headers-row">
          <div className="gsc-header-col mgp-col">
            <Image src={logoImg} alt="Muthoot Gold Point" width={220} height={60} className="gsc-logo" />
            <p className="gsc-header-text">ENTIRE PROCESS HAPPENS IN FRONT OF YOU</p>
          </div>
          <div className="gsc-header-divider"></div>
          <div className="gsc-header-col trad-col">
            <div className="gsc-jeweller-icon">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="30" width="60" height="50" fill="#E8D1A7"/>
                <rect x="15" y="20" width="70" height="10" fill="#EAB64D"/>
                <text x="50" y="27.5" fill="#333" fontSize="6" fontWeight="bold" textAnchor="middle">JEWELLER</text>
                <rect x="40" y="50" width="20" height="30" fill="#8B5A2B"/>
                <circle cx="55" cy="65" r="2" fill="#EAB64D"/>
                <rect x="25" y="40" width="10" height="15" fill="#fff" stroke="#333" strokeWidth="1"/>
                <rect x="65" y="40" width="10" height="15" fill="#fff" stroke="#333" strokeWidth="1"/>
              </svg>
            </div>
            <p className="gsc-header-text">HOW TRADITIONAL UNORGANIZED PLAYERS WORK</p>
          </div>
        </div>

        {/* Desktop Comparison List */}
        <div className="gsc-list desktop-only">
          {COMPARISON_ROWS.map((row, idx) => (
            <div key={idx} className="gsc-row">
              <div className="gsc-cell mgp-text">
                <p>{row.mgpText}</p>
                <ArrowLeft />
              </div>
              
              <div className="gsc-center-step">
                <div className="gsc-step-icon-wrap">
                  <div className="gsc-step-icon">{row.icon}</div>
                </div>
                <span className="gsc-step-title">{row.title}</span>
              </div>
              
              <div className="gsc-cell trad-text">
                <ArrowRight />
                <p>{row.tradText}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Accordion List */}
        <div className="gsc-list mobile-only">
          <div className="gsc-acc-wrapper">
            {COMPARISON_ROWS.map((row, idx) => (
              <div key={idx} className={`gsc-acc-item ${openIndex === idx ? 'open' : ''}`}>
                <button type="button" className="gsc-acc-header" onClick={() => toggleRow(idx)}>
                  <div className="gsc-acc-header-left">
                    <div className="gsc-step-icon-wrap small">
                      <div className="gsc-step-icon">{row.icon}</div>
                    </div>
                    <span className="gsc-step-title">{row.title}</span>
                  </div>
                  <div className="gsc-acc-chevron">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </button>
                
                {openIndex === idx && (
                  <div className="gsc-acc-content">
                    <div className="gsc-acc-content-inner">
                      <div className="gsc-acc-col mgp">
                        <p>{row.mgpText}</p>
                      </div>
                      <div className="gsc-acc-divider"></div>
                      <div className="gsc-acc-col trad">
                        <p>{row.tradText}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
