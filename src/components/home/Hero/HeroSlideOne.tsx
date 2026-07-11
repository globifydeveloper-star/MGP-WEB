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

// Star vector at the very start (top) of the curve - exact Figma position
const CURVE_STAR = { left: 685, top: 125, width: 40.89, height: 42.56 };

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

/**
 * Slide 1 of the Hero carousel - this is the original Hero content,
 * unchanged, simply extracted so it can be rendered inside a slide panel.
 */
export default function HeroSlideOne() {
  return (
    <>
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
    </>
  );
}
