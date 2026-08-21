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
    <section
      className="career-hero-section"
      style={data?.heroImage ? { 
        backgroundImage: `linear-gradient(to bottom, rgba(12, 24, 59, 0.7) 0%, rgba(12, 26, 74, 0.9) 100%), url(${data.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : undefined}
    >
      <div className="career-hero-bg-pattern" aria-hidden="true" />

      <div className="container">
        <div className="career-hero">
          <span className="career-hero-subtitle">{data?.heroSubheading || 'Careers'}</span>

          {data?.heroHeading ? (
            <h1 className="career-hero-title">{data.heroHeading}</h1>
          ) : (
            <h1 className="career-hero-title">
              Build a Trusted Career <br />
              <span className="gold-text">With Muthoot Gold Point</span>
            </h1>
          )}

          <p className="career-hero-desc">
            {data?.cultureDescription || 'We believe in transparency, integrity, and building customer trust. Join a fast-growing team redefining the gold liquidation sector with cutting-edge technology and premium service.'}
          </p>

          <div className="career-hero-ctas">
            <button onClick={onApplyClick} className="btn btn-primary">
              Send Resume
            </button>
            <button onClick={onViewPositionsClick} className="btn btn-outline">
              View Openings
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
