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
        <div className="about-hero-grid">
          {/* Left Image Column */}
          <div className="about-hero-media">
            <div className="about-hero-img-wrapper">
              <div className="about-hero-img-clip">
                <Image
                  src={data?.heroImages?.[0] || aboutMgpImg}
                  alt="About Muthoot Gold Point"
                  width={1000}
                  height={1250}
                  className="about-hero-img about-hero-img-active"
                  priority
                />
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
              {data?.heroEyebrow || 'A Muthoot Exim (P) Ltd. Enterprise'}
            </span>

            <h1 className="about-hero-title">
              {data?.heroTitle ? (
                <span dangerouslySetInnerHTML={{ __html: data.heroTitle }} />
              ) : (
                <>Muthoot Gold Point</>
              )}
            </h1>

            <div className="about-hero-desc-block">
              <p className="about-hero-desc">Muthoot Gold Point is a unit of Muthoot Exim (P) Ltd., the precious metal vertical of the Muthoot Pappachan Group that specialises in innovative products and offerings in the precious metal space. The vertical gives customers access to quality products that meet the highest standards at an affordable price. Apart from Muthoot Gold Point, Muthoot Exim&apos;s flagship products include Swarnavarsham, Swethavarsham, and Corporate gifting.</p>
              <p className="about-hero-desc">Visit the corporate website of Muthoot EXIM (P) Ltd to know more about the company: <a href="http://www.muthootexim.com" target="_blank" rel="noopener noreferrer" className="about-hero-link" style={{color: '#0070c0'}}>www.muthootexim.com</a></p>
              <p className="about-hero-desc">Muthoot Gold Point is the first national-level organised sector player to get into the recycling of gold that is in sync with the Vision laid down by the Government of India for the Indian Gold Industry.</p>
              <p className="about-hero-desc">We enable customers to <a href="https://www.muthootgoldpoint.com/" target="_blank" rel="noopener noreferrer" className="about-hero-link" style={{color: '#0070c0'}}>sell gold</a> in a transparent and efficient manner. The unparalleled experience of selling old gold for instant cash is 100% fair and precise. Our customers enjoy a safe, transparent and scientifically tested way of selling gold. Mobile Muthoot Gold Point – India&apos;s First Mobile Gold Buying van buys gold at the customer&apos;s doorstep. Continuing with our Group values around trust, we take the XRF and ultrasonic machines to the customer&apos;s doorstep to ensure they are getting maximum value for their gold.</p>
            </div>

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
                </>
              )}
            </ul>

            <div className="about-hero-footer-row">
              <button onClick={onExploreClick} className="about-hero-know-more">
                {data?.heroButtonText || 'Sell Your Gold'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
