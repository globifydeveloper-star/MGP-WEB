import React from 'react';
import HeroCurve from './HeroCurve';
import HeroModelPhoto from './HeroModelPhoto';
import HeroGoldRateCard from './HeroGoldRateCard';

export default function HeroRightColumn() {
  return (
    <div className="hero-right-column-v2">
      <HeroCurve />
      <HeroModelPhoto />
      <HeroGoldRateCard />
    </div>
  );
}
