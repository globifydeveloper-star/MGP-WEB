'use client';

import React from 'react';
import { getImageProps } from 'next/image';
import Link from 'next/link';
import HeroGoldRateCard from '@/components/home/Hero/HeroGoldRateCard';
import slideThreeImg from '@/assets/images/gold-recycling-nature.jpg';
import slideThreeMobileImg from '@/assets/images/3rdVertic.png';
import './HeroSlideThree.css';
import { SHOW_GOLD_RATE_CARD } from '@/lib/featureFlags';

export interface SlideFeatureData {
  id?: number;
  title: string;
  desc?: string;
  tag?: string;
  iconType?: string;
  link?: string;
}

type CardType = 'nature' | 'nation' | 'trust';

// Cards always show in this order, whatever order Strapi returns them in.
const CARD_ORDER: CardType[] = ['nation', 'trust', 'nature'];

// Blog post each card opens (a `link` set on the card in Strapi takes priority).
const CARD_LINKS: Record<CardType, string> = {
  nation: '/blog/how-gold-rate-fluctuation-affect-the-indian-economy',
  trust: '/blog/how-muthoot-gold-point-ensures-the-purity-of-your-gold',
  nature: '/blog/the-environmental-impact-of-gold-mining-vs-gold-recycling',
};

const DEFAULT_FEATURES: SlideFeatureData[] = [
  {
    title: 'Helping Government',
    tag: 'Economic Growth',
    desc: 'Helping government through reducing Current Account Deficit by importing less gold from International market.',
    iconType: 'economy'
  },
  {
    title: 'Transparent Process',
    tag: '100% Transparent',
    desc: 'Advanced German XRF purity testing right in front of you.',
    iconType: 'trust'
  },
  {
    title: 'Helping Nature',
    tag: 'Eco Conservation',
    desc: 'Helping Nature by reducing the mining for extracting gold from the gold mines.',
    iconType: 'nature'
  },
];

function getCardType(card: SlideFeatureData, idx: number): CardType {
  const normIcon = (card.iconType || '').toLowerCase();
  const normTitle = (card.title || '').toLowerCase();
  if (normIcon === 'nature' || normTitle.includes('nature') || normTitle.includes('environment')) return 'nature';
  if (normIcon === 'economy' || normTitle.includes('government') || normTitle.includes('economy') || normTitle.includes('cad')) return 'nation';
  if (normIcon === 'trust' || normTitle.includes('transparent') || normTitle.includes('process')) return 'trust';
  return CARD_ORDER[idx % CARD_ORDER.length];
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
  mobileImageSrc?: any;
}

export default function HeroSlideThree({
  slide,
  imageSrc,
  mobileImageSrc,
}: HeroSlideThreeProps) {
  const finalImage = imageSrc || '/images/3rdslide.png' || slideThreeImg;
  const rawText = slide?.heroText?.trim() || 'Recycle Your Gold. Protect Nature, Empower the Nation';
  let whiteText = rawText;
  let goldText = '';

  if (rawText.includes('. ')) {
    const splitIndex = rawText.indexOf('. ');
    whiteText = rawText.substring(0, splitIndex + 1);
    goldText = rawText.substring(splitIndex + 2);
  }

  // Art direction: wide image on desktop, portrait 3rdVertic on phones/tablets (each device downloads only its own)
  const bgCommon = { alt: 'Recycle Gold - Protect Nature, Empower the Nation', fill: true, priority: true, sizes: '100vw' } as const;
  const { props: { srcSet: desktopBgSrcSet } } = getImageProps({ ...bgCommon, src: finalImage });
  const { props: { srcSet: mobileBgSrcSet, ...bgImgProps } } = getImageProps({ ...bgCommon, src: mobileImageSrc || slideThreeMobileImg });

  return (
    <section className="hero-slide-three-section">
      {/* Background with Ambient Radial Glows & Custom Gold Recycling Image */}
      <div className="hero-slide-three-bg" aria-hidden="true">
        <picture>
          <source media="(min-width: 1025px)" srcSet={desktopBgSrcSet} />
          <img {...bgImgProps} srcSet={mobileBgSrcSet} className="hero-slide-three-bg-img" />
        </picture>
        <div className="hero-slide-three-pattern" />
        <div className="hero-slide-three-overlay" />
        <div className="hero-slide-three-ambient-glow" />
      </div>

      <div className="hero-slide-three-container">
        <div className="hero-slide-three-content">
          {rawText && (
            <h2 className="hero-main-title-v2">
              <span className="hero-title-white-text">{whiteText}</span>
              {goldText && <span className="hero-gold-text">{goldText}</span>}
            </h2>
          )}

          {/* 3 Themed Feature Cards with Distinct Visual Accents (Dynamic from Strapi with fallback) */}
          <div className="hero-slide-three-pillars">
            {(slide?.features && slide.features.length > 0 ? slide.features : DEFAULT_FEATURES)
              .map((card, idx) => ({ card, idx, cardType: getCardType(card, idx) }))
              .sort((a, b) => CARD_ORDER.indexOf(a.cardType) - CARD_ORDER.indexOf(b.cardType))
              .map(({ card, idx, cardType }) => {
              const defaultTag = cardType === 'nature' ? 'Eco Conservation' : cardType === 'nation' ? 'Economic Growth' : '100% Transparent';
              // "100% Scientific" was retired in favour of "100% Transparent", even if Strapi still sends it
              const tag = card.tag && !/scientific/i.test(card.tag) ? card.tag : defaultTag;
              const hasDesc = Boolean(card.desc && card.desc.trim());

              return (
                <Link
                  key={card.id || `${card.title}-${idx}`}
                  href={card.link || CARD_LINKS[cardType]}
                  aria-label={`${card.title} – read more on our blog`}
                  className={`hero-slide-three-card hero-slide-three-card-${cardType}${!hasDesc ? ' hero-slide-three-card-compact' : ''}`}
                >
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
                      <span className="hero-slide-three-card-tag">{tag}</span>
                    </div>
                    {hasDesc && (
                      <p className="hero-slide-three-card-text">
                        {card.desc}
                      </p>
                    )}
                  </div>
                </Link>
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
