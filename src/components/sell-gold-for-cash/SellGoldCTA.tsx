'use client';

import React from 'react';
import './SellGoldCTA.css';

export default function SellGoldCTA() {
  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="sg-cta-section">
      <div className="container">
        
        <div className="sg-cta-card">
          <div className="sg-cta-content">
            <span className="sg-cta-tag">GET HIGHEST VALUE FOR YOUR GOLD TODAY</span>
            <h2 className="sg-cta-title">
              Sell Your Old Gold — <span className="sg-title-highlight">Get Cash Instantly</span>
            </h2>
            <p className="sg-cta-desc">
              Visit your nearest Muthoot Gold Point branch or request doorstep evaluation. Zero hidden fees, free ultrasonic cleaning, and 100% fair scientific valuation.
            </p>
          </div>

          <div className="sg-cta-actions">
            <button className="sg-cta-primary-btn" onClick={scrollToForm}>
              <span>Get in Touch / Request Callback</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <a href="tel:+919037921192" className="sg-cta-phone-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+91 9037 921 192</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
