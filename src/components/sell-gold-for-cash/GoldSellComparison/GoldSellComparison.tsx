'use client';

import React from 'react';
import Image from 'next/image';
import './GoldSellComparison.css';
import logoImg from '@/assets/images/gp-logo.png';

const DEFAULT_ROWS = [
  {
    title: 'Valuation of your Gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M9.5 2.5l3-1 3 8.4-3 1z" />
        <path d="M8 3.5l1.6-.6 3 8.4-1.6.6z" opacity=".7" />
        <path d="M6 19h11v2H6z" />
        <path d="M6 16.5h6v2H6z" />
        <path d="M18.5 12.5a6 6 0 0 1-5 6.2l-.4-1.9a4 4 0 0 0 3.4-4.3z" />
        <circle cx="10.5" cy="14" r="1.6" />
      </svg>
    ),
    mgpText: 'Multilevel scientific testing for exact Gold value only',
    tradText: 'Touchstone gives approximate Gold value',
  },
  {
    title: 'Cleaning of your Gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M3 18l3-6h9l3 6zM12 4l3 2.5h-6z" />
        <path d="M5 19.5h14v1.5H5z" />
        <path d="M7 12.5l3-4.5h4l3 4.5z" opacity=".75" />
        <path d="M12 1.5l.7 1.6 1.6.7-1.6.7L12 6l-.7-1.5-1.6-.7 1.6-.7z" />
        <path d="M5 4l1.2 1.2M19 4l-1.2 1.2M2.5 9l1.6.4M21.5 9l-1.6.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    mgpText: 'Cleans the Gold with ultrasonic machine to get accurate weight',
    tradText: 'Do not clean and deduct melting cost directly',
  },
  {
    title: 'Weighing of your Gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <ellipse cx="12" cy="4.5" rx="4" ry="1.6" />
        <path d="M8.5 6.5h7l1.5 3H7z" />
        <path fillRule="evenodd" d="M4 11h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1zm2 2.5v4h5v-4zm7 1h5v1.5h-5zm0 2.5h3.5v1.2H13z" />
      </svg>
    ),
    mgpText: 'Takes up to 3 decimals points (per gram) that are showing on the weighing scale',
    tradText: 'Round off to lowest number showing on the weighing scale',
  },
  {
    title: 'Gold rate',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path fillRule="evenodd" d="M6 2h8l5 5v6.6l-1.6 1.6-3.4 3.4-.6 3.4H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm1.5 8h7v1.3h-7zm0 3h5v1.3h-5zm0 3h3.5v1.3H7.5z" />
        <path d="M20.6 15.4l-1-1-5.2 5.2-2.1-2.1-1 1 3.1 3.1z" />
      </svg>
    ),
    mgpText: 'Uses current market rate',
    tradText: 'Use lowest Gold rate of the day',
  },
  {
    title: 'Melting of your Gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12.5 2.5l3.2-1.2 6 6-1.2 3.2-3-1L11 15.2 9 13.2l6.6-6.6z" />
        <path d="M7.7 12.3l4 4-1.6 1.6-4-4z" />
        <rect x="3" y="15" width="3.6" height="3.6" rx=".6" />
        <rect x="8" y="19" width="3.6" height="3.6" rx=".6" />
        <rect x="3" y="19.5" width="3" height="3" rx=".6" opacity=".7" />
      </svg>
    ),
    mgpText: 'Multilevel scientific testing for exact Gold value only',
    tradText: 'Use low quality crucibles which allows Gold particles to remain inside after melting',
  },
  {
    title: 'Mode of payment / invoicing',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path fillRule="evenodd" d="M6 2h8l5 5v6.6l-1.6 1.6-3.4 3.4-.6 3.4H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm1.5 8h7v1.3h-7zm0 3h5v1.3h-5zm0 3h3.5v1.3H7.5z" />
        <path d="M20.6 15.4l-1-1-5.2 5.2-2.1-2.1-1 1 3.1 3.1z" />
      </svg>
    ),
    mgpText: 'Up to Rs 10,000 given as cash. Amounts higher than Rs 10,000 instantly paid to your bank account via NEFT/IMPS/RT. Invoice is always shared.',
    tradText: 'Cash payment with no invoice given',
  },
];

interface GoldSellComparisonProps {
  rows?: { title?: string; mgpText?: string; tradText?: string }[];
}

export default function GoldSellComparison({ rows }: GoldSellComparisonProps) {
  // Text comes from Strapi when available; icons stay in code, matched by position.
  const COMPARISON_ROWS = rows && rows.length > 0
    ? rows.map((row, idx) => {
        const fallback = DEFAULT_ROWS[idx % DEFAULT_ROWS.length];
        return {
          icon: fallback.icon,
          title: row.title || fallback.title,
          mgpText: row.mgpText || fallback.mgpText,
          tradText: row.tradText || fallback.tradText,
        };
      })
    : DEFAULT_ROWS;
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
          <div className="gsc-header-divider"><span className="gsc-vs">Vs</span></div>
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
              </div>
              
              <div className="gsc-center-step">
                <div className="gsc-step-icon-wrap">
                  <div className="gsc-step-icon">{row.icon}</div>
                </div>
                <span className="gsc-step-title">{row.title}</span>
              </div>
              
              <div className="gsc-cell trad-text">
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
