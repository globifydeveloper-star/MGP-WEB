'use client';

import React from 'react';

export default function MobileVan() {
  return (
    <section className="mobile-van-section">
      <div className="mobile-van-container">

        <div className="mobile-van-left">
          <h2 className="mobile-van-title">
            <span className="title-line-light">We Bring the</span>
            <span className="title-line-bold">Branch to You</span>
          </h2>
          <p className="mobile-van-desc">
            Can&apos;t visit us? Our Mobile Van carries the full GoldPoint setup — XRF machines, precision balances, real-time rates — directly to your home or office.
          </p>
          <button className="btn mobile-van-btn">Book a Van Visit</button>
        </div>

        <div className="mobile-van-right">
          <div className="van-illustration-wrapper">
            <div className="van-motion-lines">
              <span className="van-motion-line" />
              <span className="van-motion-line" />
              <span className="van-motion-line" />
            </div>

            <div className="van-photo-crop">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/van.png" alt="Muthoot Gold Point mobile van" className="van-photo-img" />
            </div>
          </div>

          <div className="van-road-full">
            <div className="van-road-bar">
              <div className="van-road-dashes" />
            </div>
          </div>

          <div className="van-features-row">
            <div className="van-feature-item">
              <span className="van-feature-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="#ffffff" strokeWidth="2" />
                  <line x1="15" y1="15" x2="20.5" y2="20.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  <path d="M6.5 10l2.2 2.2L13.5 7" stroke="#F1B933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="van-feature-text">XRF at your door</span>
            </div>

            <div className="van-feature-item">
              <span className="van-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#F1B933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="9" width="18" height="7" rx="1.5" />
                  <line x1="7" y1="9" x2="7" y2="12" />
                  <line x1="11" y1="9" x2="11" y2="12" />
                  <line x1="15" y1="9" x2="15" y2="12" />
                  <line x1="19" y1="9" x2="19" y2="12" />
                </svg>
              </span>
              <span className="van-feature-text">Precision weighing</span>
            </div>

            <div className="van-feature-item">
              <span className="van-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#F1B933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="13" rx="2" />
                  <circle cx="7" cy="12.5" r="1.4" fill="#F1B933" stroke="none" />
                  <path d="M16 15v-6" />
                  <path d="M13.5 11.5 16 9l2.5 2.5" />
                </svg>
              </span>
              <span className="van-feature-text">Instant bank transfer</span>
            </div>

            <div className="van-feature-item">
              <span className="van-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
                  <path d="M19 17V5a2 2 0 0 0-2-2H4" />
                  <path d="M15 8h-5" />
                  <path d="M15 12h-5" />
                </svg>
              </span>
              <span className="van-feature-text">Invoice on the spot</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
