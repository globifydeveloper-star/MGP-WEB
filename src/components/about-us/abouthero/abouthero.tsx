'use client';

import React from 'react';
import './abouthero.css';
import Image from 'next/image';
import aboutMgpImg from '@/assets/images/about-mgp-img.jpg';
import { AboutUsPageData } from '@/lib/strapi';

interface AboutHeroProps {
  onExploreClick: () => void;
  data?: AboutUsPageData | null;
}

export default function AboutHero({ onExploreClick, data }: AboutHeroProps) {

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
            {data?.heroTitle ? (
              <span dangerouslySetInnerHTML={{ __html: data.heroTitle }} />
            ) : (
              <>Muthoot Gold Point</>
            )}
          </h1>
        </div>

        <div className="about-hero-main">
          {/* Top Grid: Image + Who We Are */}
          <div className="about-hero-top-grid">
            <div className="about-hero-media">
              <div className="about-hero-img-wrapper">
                <div className={`about-hero-img-grid ${data?.heroImages?.length && data.heroImages.length > 1 ? 'multi-image' : ''}`}>
                  {(data?.heroImages?.length ? data.heroImages : [aboutMgpImg]).map((img, idx) => (
                    <div key={idx} className="about-hero-img-clip">
                      <Image
                        src={img}
                        alt={`About Muthoot Gold Point ${idx + 1}`}
                        fill
                        className="about-hero-img about-hero-img-active"
                        style={{ objectFit: 'cover' }}
                        priority={idx === 0}
                      />
                    </div>
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
              <p className="about-hero-desc">We enable customers to <a href="https://www.muthootgoldpoint.com/" target="_blank" rel="noopener noreferrer" className="about-hero-link">sell gold</a> in a transparent and efficient manner. The unparalleled experience of selling old gold for instant cash is 100% fair and precise, with a safe and scientifically tested process. Mobile Muthoot Gold Point – India&apos;s first mobile gold buying van – brings XRF and ultrasonic testing to the customer&apos;s doorstep.</p>
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
