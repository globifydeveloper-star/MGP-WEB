import React from 'react';
import heroCurveImg from '@/assets/images/hero-curve.png';
import Image from 'next/image';

export default function HeroCurve() {
  return (
    <div className="hero-curve-wrapper">
      <Image
        src={heroCurveImg}
        alt="Evaluation process curve"
        className="hero-curve-img"
        width={1116}
        height={1116}
        priority
      />
      {/* Label 1: Best Value */}
      <div className="curve-text-label label-top">
        <span className="label-text-white">Get the</span>
        <span className="label-text-gold">Best Value</span>
        <span className="label-text-white">for your gold</span>
      </div>
      {/* Label 2: Transparent */}
      <div className="curve-text-label label-middle">
        <span className="label-text-gold">Transparent</span>
        <span className="label-text-white">Gold evaluation</span>
        <span className="label-text-white">process</span>
      </div>
      {/* Label 3: Instant Payment */}
      <div className="curve-text-label label-bottom">
        <span className="label-text-gold">Instant Payment</span>
        <span className="label-text-white">after valuation</span>
      </div>
    </div>
  );
}
