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
  heroImage?: string;
  button1?: { enabled?: boolean; label?: string; link?: string };
  button2?: { enabled?: boolean; label?: string; link?: string };
}

interface HeroSlideTwoProps {
  slide?: HeroSlideData;
  imageSrc?: string;
}

export default function HeroSlideTwo({ slide, imageSrc }: HeroSlideTwoProps) {
  const [hasError, setHasError] = useState(false);
  const rawText = slide?.heroText?.trim() || "";
  const text = (rawText.toLowerCase().includes('get 100% value') || !rawText)
    ? "Sell Your Gold Get Cash Instantly. 100% Fair & Precise Gold Buying"
    : rawText;
  const parts = text.includes('. ')
    ? text.split('. ')
    : (text.includes('100%') ? [text.substring(0, text.indexOf('100%')).trim(), text.substring(text.indexOf('100%')).trim()] : [text]);
  const whiteText = parts[0] ? parts[0] + (parts[1] !== undefined && text.includes('. ') ? '.' : '') : '';
  const goldText = parts[1] ? parts[1] : '';

  const subcopy = slide?.heroSubtext || "Sell your gold with complete peace of mind. We use advanced XRF machines for purity testing right in front of you, ensuring you get the exact market rate.";

  const btn1Enabled = slide?.button1 ? slide.button1.enabled : true;
  const btn1Label = slide?.button1?.label || "Locate Nearest Branch";
  const btn1Link = slide?.button1?.link || "#branches";

  const btn2Enabled = slide?.button2 ? slide.button2.enabled : true;
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
      {/* Desktop Background (hidden on mobile/tablet) */}
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

      {/* Mobile-only Visual Header (matching Hero.tsx mobile top visual) */}
      <div className="hero-slide-two-mobile-top-wrapper">
        <div className="hero-slide-two-mobile-visual-container">
          <div className="hero-mobile-bg-pattern" aria-hidden="true" />
          <div className="hero-mobile-golden-aura" aria-hidden="true" />
          <div className="hero-slide-two-mobile-img-box">
            <Image
              src={finalImage}
              alt="Muthoot Gold Point"
              fill
              className="hero-slide-two-mobile-img"
              onError={() => setHasError(true)}
              priority
            />
          </div>
        </div>
      </div>

      <div className="hero-slide-two-container">
        <div className="hero-slide-two-content">
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
              <button className="btn-white-outline-v2 hero-slide-two-btn" onClick={() => handleCta(btn2Link)}>
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
