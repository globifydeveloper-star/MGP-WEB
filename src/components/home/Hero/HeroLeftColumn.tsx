'use client';

import React, { useEffect, useRef } from 'react';
import { animate, createTimeline, stagger, set } from 'animejs';

export default function HeroLeftColumn() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const trustBadge = containerRef.current.querySelector('.hero-trust-badge-v2');
      const title = containerRef.current.querySelector('.hero-main-title-v2');
      const subcopy = containerRef.current.querySelector('.hero-subcopy-text-v2');
      const buttons = containerRef.current.querySelectorAll('.hero-cta-group-v2 button');

      if (trustBadge && title && subcopy && buttons.length > 0) {
        // Initialize initial states to prevent flash of content
        set([trustBadge, title, subcopy, Array.from(buttons)], { opacity: 0 });

        const tl = createTimeline({
          defaults: {
            ease: 'outQuart',
          }
        });

        tl.add(trustBadge, {
          opacity: [0, 1],
          translateY: [25, 0],
          duration: 900,
          delay: 200,
        })
          .add(title, {
            opacity: [0, 1],
            translateY: [35, 0],
            duration: 1000,
          }, '-=700')
          .add(subcopy, {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
          }, '-=800')
          .add(buttons, {
            opacity: [0, 1],
            translateY: [15, 0],
            scale: [0.95, 1],
            delay: stagger(150),
            duration: 800,
          }, '-=650');
      }
    }
  }, []);

  return (
    <div ref={containerRef} className="hero-left-column-v2">
      {/* Trust Badge */}
      <div className="hero-trust-badge-v2" style={{ opacity: 0 }}>
        <span className="trust-badge-circle-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
        </span>
        <span className="trust-badge-text-v2">
          Trusted by <span className="gold-highlight">5 Lakh+ Customers</span> Across India
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="hero-main-title-v2" style={{ opacity: 0 }}>
        <div className="self-stretch justify-center text-white text-6xl font-normal font-['Gilroy-Bold']">Sell Your Gold. </div>
        <span className="hero-gold-text">Get Cash Today.</span>
      </h1>

      <div className="hero-subcopy-wrapper-v2" style={{ opacity: 0 }}>
        <div className="hero-subcopy-text-v2 w-96 justify-center text-white text-xl font-medium font-['Gilroy']">
          Get the True Market Value Old, Unused or pledged gold through a transparent process conducted entirely in front of you
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="hero-cta-group-v2">
        <button
          className="btn-gold-gradient"
          style={{ opacity: 0 }}
          onClick={() => {
            const element = document.getElementById('branches');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Find Nearest Branch
        </button>
        <button
          className="btn-white-outline-v2"
          style={{ opacity: 0 }}
          onClick={() => {
            const element = document.getElementById('gold-sell-process');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          See how it works
        </button>
      </div>
    </div>
  );
}

