'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { animate, createTimeline, stagger, set } from 'animejs';
import starImg from '@/assets/images/Star.png';

export default function HeroCurve() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // 1. Animate SVG Path drawing (using standard pathLength attribute)
      const path = containerRef.current.querySelector('.hero-curve-svg-path');
      
      const timeline = createTimeline({
        defaults: {
          ease: 'outExpo',
        }
      });

      if (path) {
        timeline.add(path, {
          strokeDashoffset: 0,
          duration: 2500,
          ease: 'inOutCubic',
          delay: 200,
        });
      }

      // 2. Pop-in icon badges with bouncy elastic effect
      const badges = containerRef.current.querySelectorAll('.curve-icon-position');
      if (badges.length > 0) {
        timeline.add(badges, {
          opacity: [0, 1],
          scale: [0.3, 1],
          duration: 1200,
          delay: stagger(150),
          ease: 'outElastic(1, 0.65)',
        }, '-=1800');
      }

      // 3. Slide and fade in labels
      const labels = containerRef.current.querySelectorAll('.curve-text-label');
      if (labels.length > 0) {
        timeline.add(labels, {
          opacity: [0, 1],
          translateX: [40, 0],
          duration: 1000,
          delay: stagger(120),
          ease: 'outQuart',
        }, '-=1200');
      }

      // 4. Stagger pop-in the mid curve star
      const starEl = containerRef.current.querySelector('.small-star');
      if (starEl) {
        timeline.add(starEl, {
          opacity: [0, 1],
          scale: [0, 1],
          rotate: '1.5turn',
          duration: 1000,
          ease: 'outElastic(1, 0.7)',
        }, '-=1000');
      }

      // 5. Infinite orbit rotation for glow dot
      if (orbitRef.current) {
        animate(orbitRef.current, {
          rotate: [-60, -140],
          duration: 15000,
          ease: 'inOutQuad',
          direction: 'alternate',
          loop: true,
        });
      }

      // 6. Gentle floating micro-animation for labels and icons to feel "alive"
      const icons = containerRef.current.querySelectorAll('.curve-icon-badge');
      icons.forEach((icon, i) => {
        animate(icon, {
          translateY: [0, -6, 0],
          duration: 3000 + i * 500,
          ease: 'inOutSine',
          loop: true,
        });
      });

      // 7. Small star pulse loop
      const star = containerRef.current.querySelector('.small-star img');
      if (star) {
        animate(star, {
          scale: [1, 1.25, 1],
          rotate: '1turn',
          duration: 6000,
          ease: 'inOutSine',
          loop: true,
        });
      }
    }
  }, []);

  return (
    <div ref={containerRef} className="hero-curve-wrapper">

      {/* Self-drawing SVG Gold neon arc */}
      <svg
        style={{
          position: 'absolute',
          width: 1000,
          height: 1000,
          left: 549.26,
          top: 10.45,
          pointerEvents: 'none',
          overflow: 'visible'
        }}
        viewBox="0 0 1000 1000"
      >
        <path
          d="M 500 0 A 500 500 0 0 0 500 1000"
          stroke="rgba(235, 175, 32, 0.45)"
          strokeWidth="2"
          fill="none"
          className="hero-curve-svg-path"
          pathLength={1000}
          strokeDasharray={1000}
          strokeDashoffset={1000}
        />
      </svg>

      {/* Dynamic light spark orbiting along the curve radius */}
      <div
        ref={orbitRef}
        className="hero-curve-glow-orbit"
        style={{ 
          width: 1000, 
          height: 1000, 
          left: 549.26, 
          top: 10.45,
          transform: 'rotate(-60deg)' 
        }}
      >
        <span className="hero-curve-glow-dot" />
      </div>

      {/* Icon 1: Rupee (top) */}
      <div
        className="curve-icon-position icon-top"
        style={{ left: 595, top: 208, opacity: 0 }}
      >
        <div className="curve-icon-badge">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="1.5" />
            <path d="M8 7.5H16" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 11H16" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 7.5C10.5 7.5 12.5 9 12.5 11C12.5 13 10.5 14.5 8 14.5" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 14.5L14 18" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Icon 2: Scale (middle) */}
      <div
        className="curve-icon-position icon-middle"
        style={{ left: 521, top: 412, opacity: 0 }}
      >
        <div className="curve-icon-badge">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 4V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6 20H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 6H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 6L2 11C2 12.6569 3.34315 14 5 14C6.65685 14 8 12.6569 8 11L4 6Z" stroke="#EBAF20" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M20 6L16 11C16 12.6569 17.3431 14 19 14C20.6569 14 22 12.6569 22 11L20 6Z" stroke="#EBAF20" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Icon 3: Cash (bottom) */}
      <div
        className="curve-icon-position icon-bottom"
        style={{ left: 551, top: 660, opacity: 0 }}
      >
        <div className="curve-icon-badge">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="7" width="20" height="12" rx="2" stroke="white" strokeWidth="1.5" />
            <circle cx="12" cy="13" r="3" stroke="#EBAF20" strokeWidth="1.5" />
            <path d="M5 10V10.5" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M19 15.5V16" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Label 1: Best Value */}
      <div
        className="curve-text-label label-top"
        style={{ left: 669, top: 208, opacity: 0 }}
      >
        <span className="label-text-white">Get the</span>
        <span className="label-text-gold">Best Value</span>
        <span className="label-text-white">for your gold</span>
      </div>

      {/* Label 2: Transparent */}
      <div
        className="curve-text-label label-middle"
        style={{ left: 595, top: 412, opacity: 0 }}
      >
        <span className="label-text-gold">Transparent</span>
        <span className="label-text-white">Gold evaluation</span>
        <span className="label-text-white">process</span>
      </div>

      {/* Label 3: Instant Payment */}
      <div
        className="curve-text-label label-bottom"
        style={{ left: 625, top: 660, opacity: 0 }}
      >
        <span className="label-text-gold">Instant Payment</span>
        <span className="label-text-white">after valuation</span>
      </div>

      {/* Mid curve star */}
      <div
        className="small-star"
        style={{ position: 'absolute', left: 570, top: 520, width: 69.14, height: 71.4, opacity: 0 }}
      >
        <Image
          src={starImg}
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}

