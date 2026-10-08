'use client';

import { useState } from 'react';
import Image from 'next/image';
import goldsImg from '@/assets/images/golds.png';
import HeroGoldRateCard from '@/components/home/Hero/HeroGoldRateCard';
import './heroSlider.css';
import { SHOW_GOLD_RATE_CARD } from '@/lib/featureFlags';

export interface HeroSlideData {
  heroText?: string;
  heroSubtext?: string;
  heroImage?: any;
  button1?: { enabled?: boolean; label?: string; link?: string };
  button2?: { enabled?: boolean; label?: string; link?: string };
}

interface HeroSlideTwoProps {
  slide?: HeroSlideData;
  imageSrc?: any;
  trustBadgePrefix?: string;
  trustBadgeHighlight?: string;
  trustBadgeSuffix?: string;
}

export default function HeroSlideTwo({
  slide,
  imageSrc,
  trustBadgePrefix = 'Trusted by',
  trustBadgeHighlight = 'Customers',
  trustBadgeSuffix = 'Across India',
}: HeroSlideTwoProps) {
  const [hasError, setHasError] = useState(false);
  const rawText = slide?.heroText?.trim() || "";
  const text = (rawText.toLowerCase().includes('get 100% value') || !rawText)
    ? "Sell Your Gold Get Cash Instantly. 100% Fair & Precise Gold Buying"
    : rawText;
  
  let whiteText = text;
  let goldText = "";

  if (text.includes('. ')) {
    const splitIndex = text.indexOf('. ');
    whiteText = text.substring(0, splitIndex + 1);
    goldText = text.substring(splitIndex + 2);
  } else if (text.includes('100%')) {
    const splitIndex = text.indexOf('100%');
    whiteText = text.substring(0, splitIndex).trim();
    goldText = text.substring(splitIndex).trim();
  }

  const btn1Enabled = slide?.button1?.enabled !== false;
  const btn1Label = slide?.button1?.label || "Locate Nearest Branch";
  const btn1Link = slide?.button1?.link || "#branches";

  const btn2Enabled = slide?.button2 ? slide.button2.enabled !== false : true;
  const btn2Label = slide?.button2?.label || "Check Gold Purity";
  const btn2Link = slide?.button2?.link || "#gold-value-form";

  const handleCta = (link: string) => {
    if (!link) return;
    if (link.startsWith('#')) {
      const element = document.getElementById(link.substring(1));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      try {
        const url = new URL(link, window.location.origin);
        if (url.origin === window.location.origin) {
          window.location.href = link;
        } else {
          window.open(link, '_blank');
        }
      } catch (e) {
        window.location.href = link;
      }
    }
  };

  const finalImage = !hasError && imageSrc ? imageSrc : goldsImg;

  return (
    <section className="hero-slide-two-section">
      {/* Mobile-only Full Advertisement View */}
      <div className="hero-slide-two-mobile-wrapper">
        <div className="hero-slide-two-mobile-poster-box">
          <Image
            src="/images/12.png"
            alt="Sell Your Gold Get Cash Instantly - 100% Fair & Precise Gold Buying"
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="hero-slide-two-mobile-poster-img"
            priority
          />
          <div className="hero-slide-two-mobile-poster-overlay">
            {btn1Enabled && (
              <button className="btn-gold-gradient hero-slide-two-btn" onClick={() => handleCta(btn1Link)}>
                {btn1Label}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Background / Image presentation */}
      <div className="hero-slide-two-bg" aria-hidden="true">
        <Image
          src={finalImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-slide-two-bg-img"
          onError={() => setHasError(true)}
        />
        <div className="hero-slide-two-overlay" />
      </div>

      <div className="hero-slide-two-container">
        <div className="hero-slide-two-content">
          {/* Desktop Trust Badge */}
          <div className="hero-slide-two-badge">
            <span className="hero-slide-two-badge-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </span>
            <span className="hero-slide-two-badge-text">
              {trustBadgePrefix} <span className="hero-slide-two-badge-highlight">{trustBadgeHighlight}</span> {trustBadgeSuffix}
            </span>
          </div>

          <h2 className="hero-slide-two-title">
            <span className="hero-slide-two-title-white">{whiteText}</span>
            {goldText && <span className="hero-slide-two-title-gold">{goldText}</span>}
          </h2>

          <div className="hero-slide-two-subcopy">
            <ul className="hero-slide-two-features-list">
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EBAF20" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Free purity testing of your gold</span>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EBAF20" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>100% transparent process</span>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EBAF20" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Free Ultrasonic cleaning of ornaments</span>
              </li>
            </ul>
          </div>

          <div className="hero-slide-two-cta-group">
            {btn1Enabled && (
              <button className="btn-gold-gradient hero-slide-two-btn" onClick={() => handleCta(btn1Link)}>
                {btn1Label}
              </button>
            )}
            {btn2Enabled && (
              <button className="hero-slide-two-btn hero-slide-two-btn-secondary" onClick={() => handleCta(btn2Link)}>
                {btn2Label}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Gold Rate Card */}
        {SHOW_GOLD_RATE_CARD && (
          <div className="hero-slide-two-mobile-rate-card">
            <div className="hero-mobile-rate-card-container">
              <HeroGoldRateCard />
            </div>
          </div>
        )}
      </div>

      {/* Desktop Gold Rate Card Canvas */}
      {SHOW_GOLD_RATE_CARD && (
        <div className="hero-scaled-host hero-figma-canvas-host hero-slide-two-desktop-rate-card">
          <div className="hero-figma-canvas">
            <HeroGoldRateCard />
          </div>
        </div>
      )}
    </section>
  );
}



