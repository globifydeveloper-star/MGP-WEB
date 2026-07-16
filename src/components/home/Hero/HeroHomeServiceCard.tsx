import React from 'react';
import Image from 'next/image';
import './hero.css';
import sparkle2Img from '@/assets/images/sparkle2.png';

export default function HeroHomeServiceCard() {
  const features = [
    {
      id: 1,
      title: 'GPS-Tracked Visit',
      desc: 'Certified executives visit in secure vehicles',
      icon: (
        <svg className="step-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#EBAF20" strokeWidth="2">
          <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Doorstep Valuation',
      desc: 'Certified purity analyzer used at your home',
      icon: (
        <svg className="step-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#EBAF20" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Instant Bank Payout',
      desc: 'Amount transferred immediately to your bank',
      icon: (
        <svg className="step-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#EBAF20" strokeWidth="2">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      )
    }
  ];

  return (
    <div className="hero-gold-rate-card-v2 hero-home-service-card-v2">
      {/* Decorative Sparkles */}
      <Image
        src={sparkle2Img}
        alt=""
        aria-hidden="true"
        className="hero-sparkle-flare"
        style={{ left: -37.77, top: -15.79 }}
        width={145}
        height={34}
      />
      <Image
        src={sparkle2Img}
        alt=""
        aria-hidden="true"
        className="hero-sparkle-flare"
        style={{ left: 132.86, top: 242.78 }}
        width={145}
        height={34}
      />

      <div className="rate-card-header-v2">
        <span className="rate-card-title-v2">Gold Valuation at Home</span>
        <div className="rate-card-live-indicator">
          <span className="live-dot-v2 secure-indicator" />
          <span>Secure</span>
        </div>
      </div>
      <div className="rate-card-divider" />
      
      {/* Home Service Features */}
      <div className="release-steps-container">
        {features.map((feat) => (
          <div key={feat.id} className="release-step-item">
            <div className="release-step-icon-wrapper">
              {feat.icon}
            </div>
            <div className="release-step-text">
              <h4 className="release-step-title">{feat.title}</h4>
              <p className="release-step-desc">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-rate-card-cta-v2" onClick={() => {
        alert('Opening appointment scheduler for Home Service...');
      }}>
        <span>Book Home Visit</span>
        <span className="rate-card-cta-arrow">&gt;</span>
      </button>
    </div>
  );
}
