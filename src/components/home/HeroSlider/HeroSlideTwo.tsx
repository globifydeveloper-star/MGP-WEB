'use client';

import Image from 'next/image';
import goldsImg from '@/assets/images/golds.png';
import HeroGoldRateCard from '@/components/home/Hero/HeroGoldRateCard';
import './heroSlider.css';

export default function HeroSlideTwo() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-slide-two-section">
      <div className="hero-slide-two-bg" aria-hidden="true">
        <Image
          src={goldsImg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-slide-two-bg-img"
        />
        <div className="hero-slide-two-overlay" />
      </div>

      <div className="hero-slide-two-container">
        <div className="hero-slide-two-content">
          <div className="hero-slide-two-badge">
            <span className="hero-slide-two-badge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z" />
                <path d="M15 8a4 4 0 0 1 0 8" />
                <path d="M18 5a8 8 0 0 1 0 14" />
              </svg>
            </span>
            <span className="hero-slide-two-badge-text">
              <span className="hero-slide-two-badge-highlight">Muthoot Goldpoint:</span> India&apos;s First National Level Organised Gold Buyer
            </span>
          </div>

          <h2 className="hero-slide-two-title">
            Get 100% Value for Your Gold.<br />
            <span className="hero-slide-two-title-gold">Safe, Transparent &amp; Scientific.</span>
          </h2>

          <p className="hero-slide-two-subcopy">
            Sell your gold with complete peace of mind. We use advanced XRF machines
            for purity testing right in front of you, ensuring you get the exact
            market rate.
          </p>

          <div className="hero-slide-two-cta-group">
            <button className="hero-slide-two-btn-gold" onClick={() => scrollTo('branches')}>
              Locate Nearest Branch
            </button>
            <button className="hero-slide-two-btn-outline" onClick={() => scrollTo('gold-value-form')}>
              Check Gold Purity
            </button>
          </div>
        </div>

        {/* Mobile Gold Rate Card */}
        <div className="hero-slide-two-mobile-rate-card">
          <div className="hero-mobile-rate-card-container">
            <HeroGoldRateCard />
          </div>
        </div>
      </div>

      {/* Desktop Gold Rate Card Canvas */}
      <div className="hero-scaled-host hero-figma-canvas-host hero-slide-two-desktop-rate-card">
        <div className="hero-figma-canvas">
          <HeroGoldRateCard />
        </div>
      </div>
    </section>
  );
}
