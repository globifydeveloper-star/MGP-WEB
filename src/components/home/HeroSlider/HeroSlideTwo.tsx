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
            <span className="hero-slide-two-title-white">{whiteText}</span>
            {goldText && <span className="hero-slide-two-title-gold">{goldText}</span>}
          </h2>

          <div className="hero-slide-two-subcopy" style={{ textAlign: 'left' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EBAF20" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Free purity testing of your gold
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EBAF20" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                100% transparent process
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EBAF20" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Free Ultrasonic cleaning of ornaments
              </li>
            </ul>
          </div>

          <div className="hero-slide-two-cta-group">
            {btn1Enabled && (
              <button className="btn-gold-gradient hero-slide-two-btn" onClick={() => handleCta(btn1Link)}>
                {btn1Label}
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
