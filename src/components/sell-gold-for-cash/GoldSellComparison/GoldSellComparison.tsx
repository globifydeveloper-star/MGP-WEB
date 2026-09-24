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
  ctaHref?: string;
}

export default function GoldSellComparison({ rows, ctaHref = '#gold-value-form' }: GoldSellComparisonProps) {
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
  const [desktopInView, setDesktopInView] = React.useState(false);
  const [mobileInView, setMobileInView] = React.useState(false);
  const desktopListRef = React.useRef<HTMLDivElement>(null);
  const mobileListRef = React.useRef<HTMLDivElement>(null);

  const toggleRow = (idx: number) => {
    setOpenIndex(prev => prev === idx ? null : idx);
  };

  React.useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback for browsers without support: reveal shortly after mount instead of
      // staying hidden forever. Deferred (not synchronous) to avoid cascading renders.
      const timer = setTimeout(() => {
        setDesktopInView(true);
        setMobileInView(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    const makeObserver = (setVisible: (v: boolean) => void) =>
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
            }
          });
        },
        { threshold: 0.15 }
      );

    const desktopObserver = makeObserver(setDesktopInView);
    const mobileObserver = makeObserver(setMobileInView);

    if (desktopListRef.current) desktopObserver.observe(desktopListRef.current);
    if (mobileListRef.current) mobileObserver.observe(mobileListRef.current);

    return () => {
      desktopObserver.disconnect();
      mobileObserver.disconnect();
    };
  }, []);

  return (
    <section className="gsc-section" id="comparison-section">
      <noscript>
        <style>{`.gsc-row, .gsc-acc-item { opacity: 1 !important; transform: none !important; animation: none !important; }`}</style>
      </noscript>
      <div className="container">
        {/* Header Title */}
        <h2 className="gsc-title">
          How Muthoot Gold Point<br />
          is different from traditional jewellers
        </h2>

        {/* Desktop Comparison Table */}
        <div className="gsc-table-container desktop-only">
          <div className="gsc-table-wrapper">
            <table className="gsc-table">
            <thead>
              <tr>
                <th className="gsc-th-feature">Process</th>
                <th className="gsc-th-mgp">
                  <div className="gsc-th-mgp-content">
                    <span className="gsc-th-ribbon">Recommended Choice</span>
                    <Image src={logoImg} alt="Muthoot Gold Point" width={160} height={44} className="gsc-th-logo" />
                  </div>
                </th>
                <th className="gsc-th-trad">
                  <div className="gsc-th-trad-content">
                    <div className="gsc-jeweller-icon-small">
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
                    <span>Traditional Jewellers</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="gsc-table-row">
                  <td className="gsc-td-feature">
                    <div className="gsc-feature-wrap">
                      <div className="gsc-feature-icon">{row.icon}</div>
                      <span className="gsc-feature-title">{row.title}</span>
                    </div>
                  </td>
                  <td className="gsc-td-mgp">
                    <div className="gsc-td-content">
                      <span className="td-icon check">✓</span>
                      <p>{row.mgpText}</p>
                    </div>
                  </td>
                  <td className="gsc-td-trad">
                    <div className="gsc-td-content">
                      <span className="td-icon cross">✕</span>
                      <p>{row.tradText}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* Mobile Accordion List */}
        <div className="gsc-list mobile-only">
          <div
            ref={mobileListRef}
            className={`gsc-acc-wrapper ${mobileInView ? 'in-view' : ''}`}
          >
            {COMPARISON_ROWS.map((row, idx) => (
              <div
                key={idx}
                className={`gsc-acc-item ${openIndex === idx ? 'open' : ''}`}
                style={{ animationDelay: `${idx * 90}ms` }}
              >
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

        {/* Bottom CTA */}
        <div className="gsc-cta">
          <div className="gsc-cta-text">
            <h3>Ready for the real value of your gold?</h3>
            <p>Get a transparent, scientifically-tested valuation at your nearest Gold Point.</p>
          </div>
          <a href={ctaHref} className="gsc-cta-btn">
            Check Your Gold Value
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
