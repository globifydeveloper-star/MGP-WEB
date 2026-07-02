'use client';

import React from 'react';
import GoldRateCard from './GoldRateCard';

export default function HeroImage() {
  return (
    <div className="hero-right-col">
      <div className="woman-wrapper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/woman-saree.png" 
          alt="Muthoot Goldpoint Executive" 
          className="woman-img"
        />
        {/* Rate card floating overlay */}
        <div className="floating-rate-card-container">
          <GoldRateCard />
        </div>
      </div>
    </div>
  );
}
