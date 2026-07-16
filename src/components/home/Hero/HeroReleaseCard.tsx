import React from 'react';
import Image from 'next/image';
import './hero.css';
import sparkle2Img from '@/assets/images/sparkle2.png';

export default function HeroReleaseCard() {
  const steps = [
    {
      id: 1,
      title: 'Bring Documents',
      desc: 'Bring your pawn/bank pledge tickets',
      icon: (
        <svg className="step-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#EBAF20" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Muthoot Pays Loan',
      desc: 'We clear your outstanding amount',
      icon: (
        <svg className="step-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#EBAF20" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <line x1="12" y1="10" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Get Balance Cash',
      desc: 'Instant payment for the balance gold value',
      icon: (
        <svg className="step-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#EBAF20" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    }
  ];

  return (
    <div className="hero-gold-rate-card-v2 hero-release-card-v2">
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
        <span className="rate-card-title-v2">Pledged Gold Release</span>
        <div className="rate-card-live-indicator">
          <span className="live-dot-v2 green-indicator" />
          <span>Easy</span>
        </div>
      </div>
      <div className="rate-card-divider" />
      
      {/* Release Steps */}
      <div className="release-steps-container">
        {steps.map((step) => (
          <div key={step.id} className="release-step-item">
            <div className="release-step-icon-wrapper">
              {step.icon}
            </div>
            <div className="release-step-text">
              <h4 className="release-step-title">{step.title}</h4>
              <p className="release-step-desc">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-rate-card-cta-v2" onClick={() => {
        const element = document.getElementById('branches');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }}>
        <span>Release Gold Ticket</span>
        <span className="rate-card-cta-arrow">&gt;</span>
      </button>
    </div>
  );
}
