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
import groupHeroImg from '@/assets/images/GroupHero.png';

// Star vector at the very start (top) of the curve - exact Figma position
const CURVE_STAR = { left: 670.4, top: 132.3, width: 46, height: 48 };

// Sparkle below the bottom icon (matches the Figma reference's twinkle
// accent near the end of the arc).
const CURVE_SPARKLES = [
  { left: 787, top: 745, width: 16, height: 37.3 },
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
// and curve/icons are pixel-pinned to. Using 1580 ensures the gold rate card
// does not get clipped on the right.
const HERO_CANVAS_DESIGN_WIDTH = 1580;
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
      <div className="hero-scaled-host hero-wave-host">
        <div className="hero-wave-inner">
          <Image
            src={heroWaveImg}
            alt=""
            aria-hidden="true"
            className="hero-scene-wave"
            priority
          />
        </div>
      </div>

      {/* Mobile-only Model Photo (rendered on top on mobile/tablet) */}
      <div className="hero-mobile-top-model-wrapper">
        <div className="hero-mobile-top-visual-container">
          <Image
            src={groupHeroImg}
            alt="Muthoot Goldpoint Arc Features"
            className="hmv-curve-img"
            priority
          />
          <HeroModelPhoto />
        </div>
      </div>

      {/* Main Grid Content Container */}
      <div className="hero-container-v2">
        {/* Left Column (Branding & Copy) */}
        <HeroLeftColumn />

        {/* Right Column - holds mobile visual content under 1024px */}
        <div className="hero-right-column-v2">
          <div className="hero-mobile-rate-card-container">
            <HeroGoldRateCard />
          </div>
        </div>
      </div>

      {/*
        Everything below is positioned using exact Figma "Position X/Y"
        coordinates from the "Homepage V2" frame (1441x905): background
        tiles/wave/glow, the model photo, the gold rate card, and the
        curve/icons overlay - all sharing one coordinate space.
      */}
      <div className="hero-scaled-host hero-figma-canvas-host">
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

        </div>
      </div>

      {/*
        Separate sibling of .hero-figma-canvas (not nested inside it) so
        this star's z-index can actually outrank the navbar - see the
        .hero-curve-star-wrapper comment in hero.css for why.
      */}
      <div className="hero-scaled-host hero-curve-star-host">
        <div className="hero-curve-star-inner">
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
        </div>
      </div>

    </section >
  );
}
