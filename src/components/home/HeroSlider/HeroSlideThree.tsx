'use client';

import React from 'react';
import Image from 'next/image';
import HeroGoldRateCard from '@/components/home/Hero/HeroGoldRateCard';
import slideThreeImg from '@/assets/images/gold-recycling-nature.jpg';
import trustIcon from '@/assets/images/trusticon.png';
import lineImg from '@/assets/images/Line.png';
import './HeroSlideThree.css';
import { SHOW_GOLD_RATE_CARD } from '@/lib/featureFlags';

export interface SlideFeatureData {
  id?: number;
  title: string;
  desc?: string;
  tag?: string;
  iconType?: string;
}

export interface HeroSlideData {
  heroText?: string;
  heroSubtext?: string;
  heroImage?: any;
  button1?: { enabled?: boolean; label?: string; link?: string };
  button2?: { enabled?: boolean; label?: string; link?: string };
  features?: SlideFeatureData[];
}

interface HeroSlideThreeProps {
  slide?: HeroSlideData;
  imageSrc?: any;
  trustBadgePrefix?: string;
  trustBadgeHighlight?: string;
  trustBadgeSuffix?: string;
}

export default function HeroSlideThree({
  slide,
  imageSrc,
  trustBadgePrefix = 'Muthoot Gold Point:',
  trustBadgeHighlight = 'India’s First Organised Gold Recycler',
  trustBadgeSuffix = '',
}: HeroSlideThreeProps) {
  const finalImage = imageSrc || '/images/3rdslide.png' || slideThreeImg;
  const rawText = slide?.heroText?.trim() || '';
  let whiteText = rawText;
  let goldText = '';

  if (rawText.includes('. ')) {
    const splitIndex = rawText.indexOf('. ');
    whiteText = rawText.substring(0, splitIndex + 1);
    goldText = rawText.substring(splitIndex + 2);
  }

  return (
    <section className="hero-slide-three-section">
      {/* Background with Ambient Radial Glows & Custom Gold Recycling Image */}
      <div className="hero-slide-three-bg" aria-hidden="true">
        <Image
          src={finalImage}
          alt="Recycle Gold - Protect Nature, Empower the Nation"
          fill
          priority
          sizes="100vw"
          className="hero-slide-three-bg-img"
        />
        <div className="hero-slide-three-pattern" />
        <div className="hero-slide-three-overlay" />
        <div className="hero-slide-three-ambient-glow" />
      </div>

      <div className="hero-slide-three-container">
        <div className="hero-slide-three-content">
          {/* Mobile Top Visual Banner */}
          <div className="hero-slide-three-mobile-visual">
            <div className="hero-slide-three-mobile-img-box">
              <Image
                src={finalImage}
                alt="Recycle Gold - Protect Nature, Empower the Nation"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="hero-slide-three-mobile-img"
                priority
              />
              <div className="hero-slide-three-mobile-img-overlay" />
            </div>
          </div>

          {/* Desktop Trust Badge - Matches Slide 1 & Slide 2 */}
          <div className="hero-trust-badge-v2">
            <div className="trust-badge-header-v2">
              <Image
                src={trustIcon}
                alt="Trust Icon"
                width={34}
                height={34}
                className="trust-badge-icon-img"
                priority
              />
              <span className="trust-badge-text-v2">
                <span className="gold-highlight">{trustBadgePrefix || 'Muthoot Gold Point:'}</span> {trustBadgeHighlight || "India's First Organised Gold Recycler"} {trustBadgeSuffix}
              </span>
            </div>
            <div className="trust-badge-line-wrapper">
              <Image
                src={lineImg}
                alt=""
                className="trust-badge-underline-img"
                priority
              />
            </div>
          </div>

          {rawText && (
            <h2 className="hero-main-title-v2">
              <span className="hero-title-white-text">{whiteText}</span>
              {goldText && <span className="hero-gold-text">{goldText}</span>}
            </h2>
          )}

          {/* 3 Themed Feature Cards with Distinct Visual Accents (Dynamic from Strapi with fallback) */}
          <div className="hero-slide-three-pillars">
            {(slide?.features && slide.features.length > 0 ? slide.features : [
              {
                title: 'Helping Nature',
                tag: 'Eco Conservation',
                desc: 'Helping Nature by reducing the mining for extracting gold from the gold mines.',
                iconType: 'nature'
              },
              {
                title: 'Helping Government',
                tag: 'Economic Growth',
                desc: 'Helping government through reducing Current Account Deficit by importing less gold from International market.',
                iconType: 'economy'
              },
              {
                title: 'Transparent Process',
                tag: '100% Scientific',
                desc: 'Advanced German XRF purity testing right in front of you.',
                iconType: 'trust'
              }
            ]).map((card: SlideFeatureData, idx: number) => {
              const cardType = (() => {
                const normIcon = (card.iconType || '').toLowerCase();
                const normTitle = (card.title || '').toLowerCase();
                if (normIcon === 'nature' || normTitle.includes('nature') || normTitle.includes('environment')) return 'nature';
                if (normIcon === 'economy' || normTitle.includes('government') || normTitle.includes('economy') || normTitle.includes('cad')) return 'nation';
                if (normIcon === 'trust' || normTitle.includes('transparent') || normTitle.includes('process')) return 'trust';
                return idx === 0 ? 'nature' : idx === 1 ? 'nation' : 'trust';
              })();

              const defaultTag = cardType === 'nature' ? 'Eco Conservation' : cardType === 'nation' ? 'Economic Growth' : '100% Scientific';
              const hasDesc = Boolean(card.desc && card.desc.trim());

              return (
                <div key={card.id || `${card.title}-${idx}`} className={`hero-slide-three-card hero-slide-three-card-${cardType}${!hasDesc ? ' hero-slide-three-card-compact' : ''}`}>
                  <div className="hero-slide-three-card-icon" aria-hidden="true">
                    {cardType === 'nature' && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22v-9" />
                        <path d="M12 13c-3-3-6-3-9 0 0-4.5 4.5-9 9-9s9 4.5 9 9c-3-3-6-3-9 0Z" />
                        <path d="M8 17c1.5 1.5 3 2 4 2s2.5-.5 4-2" />
                      </svg>
                    )}
                    {cardType === 'nation' && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21h18" />
                        <path d="M4 18h16" />
                        <path d="M6 18v-7" />
                        <path d="M10 18v-7" />
                        <path d="M14 18v-7" />
                        <path d="M18 18v-7" />
                        <path d="M12 2 3 7h18l-9-5Z" />
                      </svg>
                    )}
                    {cardType === 'trust' && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3v18" />
                        <path d="M4 7h16" />
                        <path d="m3 7 4 7a2.5 2.5 0 0 0 5 0L8 7" />
                        <path d="m16 7-4 7a2.5 2.5 0 0 0 5 0l4-7" />
                      </svg>
                    )}
                  </div>
                  <div className="hero-slide-three-card-body">
                    <div className="hero-slide-three-card-header">
                      <h3 className="hero-slide-three-card-title">{card.title}</h3>
                      <span className="hero-slide-three-card-tag">{card.tag || defaultTag}</span>
                    </div>
                    {hasDesc && (
                      <p className="hero-slide-three-card-text">
                        {card.desc}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Gold Rate Card */}
        {SHOW_GOLD_RATE_CARD && (
          <div className="hero-slide-three-mobile-rate-card">
            <div className="hero-mobile-rate-card-container">
              <HeroGoldRateCard />
            </div>
          </div>
        )}
      </div>

      {/* Desktop Gold Rate Card Canvas - Matches Slide 1 & Slide 2 Positioning */}
      {SHOW_GOLD_RATE_CARD && (
        <div className="hero-scaled-host hero-figma-canvas-host hero-slide-three-desktop-rate-card">
          <div className="hero-figma-canvas">
            <HeroGoldRateCard />
          </div>
        </div>
      )}
    </section>
  );
}
