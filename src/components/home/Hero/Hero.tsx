'use client';

import { useEffect, useState } from 'react';
import './hero.css';
import HeroLeftColumn from './HeroLeftColumn';
import HeroRightColumn from './HeroRightColumn';
import HeroModelPhoto from './HeroModelPhoto';
import HeroGoldRateCard from './HeroGoldRateCard';
import HeroCurve from './HeroCurve';
import Image from 'next/image';
import coinImg from '@/assets/images/COIN.png';
import sparkleImg from '@/assets/images/sparkle.png';
import starImg from '@/assets/images/Star.png';
import heroWaveImg from '@/assets/images/hero-wave.png';
import hm6Img01 from '@/assets/images/hm6-img01.png';

// Star vector at the very start (top) of the curve - exact Figma position
const CURVE_STAR = { left: 800.4, top: 132.3, width: 46, height: 48 };

// Sparkle below the bottom icon (matches the Figma reference's twinkle
// accent near the end of the arc).
const CURVE_SPARKLES = [
  { left: 610, top: 745, width: 16, height: 37.3 },
];

// Figma "Position X/Y" for each tiled background square behind the model
const PATTERN_TILES = [
  { left: 1274.96, top: 646.68, rotate: 0 },
  { left: 965.56, top: 646.68, rotate: 0 },
  { left: 1274.97, top: 337.28, rotate: 180 },
  { left: 1584.37, top: 337.28, rotate: 180 },
  { left: 1274.95, top: 337.28, rotate: 0 },
  { left: 965.56, top: 337.28, rotate: 0 },
];

// Figma "Homepage V2" frame width plus margin that the model photo, gold rate card,
// and curve/icons are pixel-pinned to. Using 1480 ensures the gold rate card
// does not get clipped on the right.
const HERO_CANVAS_DESIGN_WIDTH = 1480;
const HERO_CANVAS_DESIGN_HEIGHT = 905;

export default function Hero() {
  // Below the design width/height, uniformly scale the pixel-pinned canvas down so
  // it still fits the viewport instead of overflowing/clipping (e.g. the
  // gold rate card running off-screen or vertically below the page).


  return (
    <section
      className="hero-section-root-v2">
      {/*
        Rendered before .hero-container-v2 (and given a lower z-index) so it
        sits behind the headline/copy instead of drawing over it - it shares
        the same Figma coordinate space as .hero-figma-canvas below.
      */}
      <div className="hero-wave-wrapper">
        <Image
          src={heroWaveImg}
          alt=""
          aria-hidden="true"
          className="hero-scene-wave"
          priority
        />
      </div>

      {/* Mobile-only visual layout */}
      <div className="hero-mobile-visuals">
        <div className="hmv-curve-overlay">
          <svg className="hmv-curve-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M40 8 A 46.86 46.86 0 0 0 27.5 86"
              stroke="#EBAF20"
              strokeWidth="0.5"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="hmv-star" style={{ top: '6%', left: '35%' }}>
            <Image src={starImg} alt="" aria-hidden="true" width={42} height={32} />
          </div>

          <div className="hmv-icon-group" style={{ top: '24%', left: '14%' }}>
            <div className="curve-icon-badge hmv-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="1.5" />
                <path d="M8 7.5H16" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 11H16" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 7.5C10.5 7.5 12.5 9 12.5 11C12.5 13 10.5 14.5 8 14.5" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 14.5L14 18" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="hmv-label">
              <span className="label-text-white hmv-text">Get the</span>
              <span className="label-text-gold hmv-text">Best Value</span>
              <span className="label-text-white hmv-text">for your gold</span>
            </div>
          </div>

          <div className="hmv-icon-group" style={{ top: '50%', left: '8%' }}>
            <div className="curve-icon-badge hmv-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 4V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 20H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4 6H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4 6L2 11C2 12.6569 3.34315 14 5 14C6.65685 14 8 12.6569 8 11L4 6Z" stroke="#EBAF20" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M20 6L16 11C16 12.6569 17.3431 14 19 14C20.6569 14 22 12.6569 22 11L20 6Z" stroke="#EBAF20" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="hmv-label">
              <span className="label-text-gold hmv-text">Transparent</span>
              <span className="label-text-white hmv-text">Gold evaluation</span>
              <span className="label-text-white hmv-text">process</span>
            </div>
          </div>

          <div className="hmv-icon-group" style={{ top: '78%', left: '16%' }}>
            <div className="curve-icon-badge hmv-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="7" width="20" height="12" rx="2" stroke="white" strokeWidth="1.5" />
                <circle cx="12" cy="13" r="3" stroke="#EBAF20" strokeWidth="1.5" />
                <path d="M5 10V10.5" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M19 15.5V16" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="hmv-label">
              <span className="label-text-gold hmv-text">Instant Payment</span>
              <span className="label-text-white hmv-text">after valuation</span>
            </div>
          </div>
        </div>

        <div className="hmv-image-wrapper">
          <Image
            src={hm6Img01}
            alt="Muthoot Goldpoint Customer"
            className="hmv-model-img"
            priority
          />
        </div>

        <div className="hero-mobile-rate-card-wrap">
          <HeroGoldRateCard />
        </div>
      </div>
      {/* Main Grid Content Container */}
      <div className="hero-container-v2">
        {/* Left Column (Branding & Copy) */}
        <HeroLeftColumn />

        {/* Right Column - empty grid track, real visuals are in hero-figma-canvas below */}
        <HeroRightColumn />
      </div>

      {/*
        Everything below is positioned using exact Figma "Position X/Y"
        coordinates from the "Homepage V2" frame (1441x905): background
        tiles/wave/glow, the model photo, the gold rate card, and the
        curve/icons overlay - all sharing one coordinate space.
      */}
      <div className="hero-figma-canvas">
        <Image
          src={coinImg}
          alt=""
          aria-hidden="true"
          className="hero-floating-coin-left"
          priority
        />

        {PATTERN_TILES.map((tile, i) => (
          <div
            key={i}
            className="hero-pattern-tile"
            style={{ left: tile.left, top: tile.top, transform: `rotate(${tile.rotate}deg)` }}
            aria-hidden="true"
          />
        ))}



        <div className="hero-model-bg-glow" aria-hidden="true" />

        <HeroModelPhoto />
        <HeroGoldRateCard />
        <HeroCurve />

        {CURVE_SPARKLES.map((pos, i) => (
          <Image
            key={i}
            src={sparkleImg}
            alt=""
            aria-hidden="true"
            className="hero-sparkle-flare"
            style={{ left: pos.left, top: pos.top, width: pos.width, height: pos.height }}
            width={42}
            height={98}
          />
        ))}
      </div>

      {/*
        Separate sibling of .hero-figma-canvas (not nested inside it) so
        this star's z-index can actually outrank the navbar - see the
        .hero-curve-star-wrapper comment in hero.css for why.
      */}
      <div className="hero-curve-star-wrapper">
        <Image
          src={starImg}
          alt=""
          aria-hidden="true"
          className="hero-sparkle-flare"
          style={{ left: CURVE_STAR.left, top: CURVE_STAR.top, width: CURVE_STAR.width, height: CURVE_STAR.height }}
          width={51}
          height={53}
        />
      </div>

    </section >
  );
}
