import React from 'react';

export default function HeroLeftColumn() {
  return (
    <div className="hero-left-column-v2">
      {/* Trust Badge */}
      <div className="hero-trust-badge-v2">
        <span className="trust-badge-circle-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
        </span>
        <span className="trust-badge-text-v2">
          Trusted by <span className="gold-highlight">5 Lakh+ Customers</span> Across India
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="hero-main-title-v2">
        Sell Your Gold.<br />
        <span className="hero-gold-text">Get Cash Today.</span>
      </h1>

      {/* Subcopy Paragraph */}
      <div className="hero-subcopy-wrapper-v2">
        <p className="hero-subcopy-text-v2">
          Get the True Market Value Old, Unused or pledged gold through a transparent
          process conducted entirely in front of you
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="hero-cta-group-v2">
        <button
          className="btn-gold-gradient"
          onClick={() => {
            const element = document.getElementById('branches');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Find Nearest Branch
        </button>
        <button
          className="btn-white-outline-v2"
          onClick={() => {
            const element = document.getElementById('process');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          See how it works
        </button>
      </div>
    </div>
  );
}
