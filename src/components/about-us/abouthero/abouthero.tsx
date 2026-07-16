'use client';

import React, { useEffect, useState } from 'react';
import './abouthero.css';
import Image from 'next/image';
import goldImg from '@/assets/images/aboutslide1.png';
import testImg from '@/assets/images/aboutslide2.png';
import goldsImg from '@/assets/images/aboutslide3.png';
import muthootLogo from '@/assets/images/muthootlogo.png';

const HERO_IMAGES = [
  { src: goldImg, alt: 'Refined gold ready for precision valuation' },
  { src: testImg, alt: 'XRF machine precisely testing gold purity' },
  { src: goldsImg, alt: '999.9 fine gold bars and coins' },
];

interface AboutHeroProps {
  onExploreClick: () => void;
}

export default function AboutHero({ onExploreClick }: AboutHeroProps) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="about-hero-section">
      <div className="container">
        <div className="about-hero-grid">
          {/* Left Image Column */}
          <div className="about-hero-media">
            <div className="about-hero-img-wrapper">
              <div className="about-hero-img-clip">
                {HERO_IMAGES.map((image, idx) => (
                  <Image
                    key={image.alt}
                    src={image.src}
                    alt={image.alt}
                    className={`about-hero-img ${idx === activeImage ? 'about-hero-img-active' : ''}`}
                    priority={idx === 0}
                  />
                ))}
              </div>
              <div className="experience-badge">
                <div className="badge-top-row">
                  <span className="badge-num">1M+</span>
                  <span className="badge-icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  </span>
                </div>
                <span className="badge-text">Overall happy Customers</span>
              </div>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="about-hero-content">
            <span className="about-hero-eyebrow">
              <span className="eyebrow-icon" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
                </svg>
              </span>
              A Muthoot Exim (P) Ltd. Enterprise
            </span>

            <h1 className="about-hero-title">
              Muthoot Gold Point — Precision You Can <span className="gold-text">Trust</span>
            </h1>

            <p className="about-hero-desc">
              Muthoot Gold Point is a unit of Muthoot Exim (P) Ltd., the precious metal vertical of the Muthoot Pappachan Group, specialising in innovative products and offerings in the precious metal space. We are India&apos;s first national-level organised sector player in gold recycling — in sync with the Government of India&apos;s vision for the Indian gold industry — giving customers access to quality products at fair, transparent, and scientifically tested prices.
            </p>

            <ul className="about-hero-checklist">
              <li>
                <span className="check-icon" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                133+ years of Muthoot Pappachan Group legacy
              </li>
              <li>
                <span className="check-icon" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                India&apos;s first organised-sector gold recycler
              </li>
            </ul>

            <div className="about-hero-footer-row">
              <button onClick={onExploreClick} className="about-hero-know-more">
                Sell Your Gold
              </button>

              <Image
                src={muthootLogo}
                alt="Muthoot Blue - Blue is Belief"
                className="about-hero-brand-mark"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
