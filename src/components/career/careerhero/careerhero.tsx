import React from 'react';
import './careerhero.css';

import { CareerPageSettingsData } from '@/lib/strapi';

interface CareerHeroProps {
  data?: CareerPageSettingsData | null;
  onApplyClick: () => void;
  onViewPositionsClick: () => void;
}

export default function CareerHero({ data, onApplyClick, onViewPositionsClick }: CareerHeroProps) {
  return (
    <section className="career-hero-section">
      {/* Background overlay pattern */}
      <div className="career-hero-bg-pattern" aria-hidden="true" />
      
      <div className="container">
        <div className="career-hero">
          <span className="career-hero-subtitle">Careers</span>
          <h1 className="career-hero-title">
            Build a Trusted Career <br />
            <span className="gold-text">With Muthoot Gold Point</span>
          </h1>
          <p className="career-hero-desc">
            We believe in transparency, integrity, and building customer trust. Join a fast-growing team redefining the gold liquidation sector with cutting-edge technology and premium service.
          </p>
          <div className="career-hero-ctas">
            <button 
              onClick={onApplyClick} 
              className="btn btn-primary"
            >
              Send Resume
            </button>
            <button 
              onClick={onViewPositionsClick} 
              className="btn btn-outline"
            >
              View Openings
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
