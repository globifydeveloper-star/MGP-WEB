'use client';

import React, { useState, useEffect, useRef } from 'react';
import './abouthero.css';
import Image from 'next/image';
import type { AboutUsPageData } from '@/lib/strapi';

interface AboutHeroProps {
  onExploreClick: () => void;
  data?: AboutUsPageData | null;
}

const DEFAULT_HERO_IMAGES = [
  '/ImageSet/About us page/About us Hero 1536×1024 px-01.jpg',
  '/ImageSet/About us page/About us Hero 1536×1024 px-02.jpg',
  '/ImageSet/About us page/About us Hero 1536×1024 px-03.jpg',
];

export default function AboutHero({ onExploreClick, data }: AboutHeroProps) {
  const images = (data?.heroImages && data.heroImages.length > 0) ? data.heroImages : DEFAULT_HERO_IMAGES;
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (idx: number) => {
    setActiveSlide((idx + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || images.length <= 1) return;
    const distance = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) >= 35) {
      goToSlide(activeSlide + (distance < 0 ? 1 : -1));
    }
  };

  return (
    <section className="about-hero-section">
      <div className="container">
        <div className="about-hero-header">
          <span className="about-hero-eyebrow">
            <span className="eyebrow-icon" aria-hidden="true">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
              </svg>
            </span>
            {data?.heroEyebrow || 'A Muthoot Exim (P) Ltd. Enterprise'}
          </span>

          <h1 className="about-hero-title">
            Muthoot Gold Point — Trusted Gold Buyer
          </h1>
        </div>

        <div className="about-hero-main">
          {/* Top Grid: All Images in a Single Box + Who We Are */}
          <div className="about-hero-top-grid">
            <div className="about-hero-media">
              <div
                className="about-hero-img-wrapper"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                aria-roledescription="carousel"
                aria-label="About Muthoot Gold Point images"
              >
                {/* Single Image Box with Original 16:9 Dimension */}
                <div className="about-hero-single-box">
                  {images.map((img, idx) => {
                    const isActive = activeSlide === idx;
                    return (
                      <div
                        key={idx}
                        className={`about-hero-slide-item ${isActive ? 'is-active' : ''}`}
                        aria-hidden={!isActive}
                      >
                        <Image
                          src={img}
                          alt={`About Muthoot Gold Point ${idx + 1}`}
                          fill
                          className="about-hero-img"
                          style={{ objectFit: 'cover' }}
                          priority={idx === 0}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        />
                      </div>
                    );
                  })}

                  {/* Navigation Arrows for switching */}
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="about-hero-slide-nav prev"
                        onClick={() => goToSlide(activeSlide - 1)}
                        aria-label="Previous image"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="about-hero-slide-nav next"
                        onClick={() => goToSlide(activeSlide + 1)}
                        aria-label="Next image"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>

                      {/* Dots */}
                      <div className="about-hero-slide-dots" role="tablist" aria-label="Slide indicators">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`about-hero-dot ${idx === activeSlide ? 'is-active' : ''}`}
                            onClick={() => goToSlide(idx)}
                            aria-label={`Go to image ${idx + 1}`}
                            aria-selected={idx === activeSlide}
                            role="tab"
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="about-hero-who-we-are">
              <h3 className="about-hero-subheading">Who We Are</h3>
              <p className="about-hero-desc">Muthoot Gold Point is a unit of Muthoot Exim (P) Ltd., the precious metal vertical of the Muthoot Pappachan Group that specialises in innovative products and offerings in the precious metal space. The vertical gives customers access to quality products that meet the highest standards at an affordable price. Apart from Muthoot Gold Point, Muthoot Exim&apos;s flagship products include Swarnavarsham, Swethavarsham, and Corporate gifting.</p>

              <ul className="about-hero-checklist">
                {data?.heroChecklist && data.heroChecklist.length > 0 ? (
                  data.heroChecklist.map((item) => (
                    <li key={item.id}>
                      <span className="check-icon" aria-hidden="true">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      {item.text}
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <span className="check-icon" aria-hidden="true">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      138+ years of Muthoot Pappachan Group legacy
                    </li>
                    <li>
                      <span className="check-icon" aria-hidden="true">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      India&apos;s first organised-sector gold recycler
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Bottom Content: Key facts as cards */}
          <div className="about-hero-info-grid">
            <div className="about-hero-info-card">
              <h3 className="about-hero-subheading">Corporate Information</h3>
              <p className="about-hero-desc">Visit the corporate website of Muthoot EXIM (P) Ltd to know more about the company: <a href="http://www.muthootexim.com" target="_blank" rel="noopener noreferrer" className="about-hero-link">www.muthootexim.com</a></p>
            </div>

            <div className="about-hero-info-card">
              <h3 className="about-hero-subheading">Industry Pioneer</h3>
              <p className="about-hero-desc">Muthoot Gold Point is the first national-level organised sector player to get into the recycling of gold that is in sync with the Vision laid down by the Government of India for the Indian Gold Industry.</p>
            </div>

            <div className="about-hero-info-card">
              <h3 className="about-hero-subheading">Transparent Process</h3>
              <p className="about-hero-desc">We enable customers to <a href="#" onClick={onExploreClick ? (e) => { e.preventDefault(); onExploreClick(); } : undefined} className="about-hero-link">sell gold</a> in a transparent and efficient manner. The unparalleled experience of selling old gold for instant cash is 100% fair and precise, with a safe and scientifically tested process. Mobile Muthoot Gold Point – India&apos;s first mobile gold buying van – brings XRF and ultrasonic testing to the customer&apos;s doorstep.</p>
            </div>
          </div>

          <div className="about-hero-footer-row">
            <button onClick={onExploreClick} className="about-hero-know-more">
              {data?.heroButtonText || 'Sell Your Gold'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
