'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { animate, createTimeline, stagger, set } from 'animejs';
import './heroGoldRateCard.css';
import sparkle2Img from '@/assets/images/sparkle2.png';

export default function HeroGoldRateCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [displayRate, setDisplayRate] = useState(7500);

  const handleScrollToForm = () => {
    const element = document.getElementById('gold-value-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (cardRef.current) {
      const card = cardRef.current;
      const sparkles = card.querySelectorAll('.hero-sparkle-flare');
      const header = card.querySelector('.rate-card-header-v2');
      const divider = card.querySelector('.rate-card-divider');
      const purity = card.querySelector('.rate-card-purity-v2');
      const price = card.querySelector('.rate-card-price-value');
      const button = buttonRef.current;

      if (card && header && divider && purity && price && button) {
        // 1. Initial hidden state for entrance animation
        set(card, { opacity: 0, translateY: 60, scale: 0.93 });
        set([header, divider, purity, price, button], { opacity: 0 });

        // 2. Entrance Timeline
        const tl = createTimeline({
          defaults: {
            ease: 'outExpo',
          }
        });

        tl.add(card, {
          opacity: [0, 1],
          translateY: [40, 0],
          scale: [0.95, 1],
          duration: 1000,
          ease: 'outElastic(1, 0.8)',
        })
          .add([header, divider], {
            opacity: [0, 1],
            translateY: [15, 0],
            duration: 600,
          }, '-=600')
          .add([purity, price], {
            opacity: [0, 1],
            translateY: [15, 0],
            duration: 600,
          }, '-=400')
          .add(button, {
            opacity: [0, 1],
            translateY: [15, 0],
            duration: 600,
          }, '-=400');
      }

      // 3. Count up animation for gold rate (runs after card is partially visible)
      const rateObj = { val: 7500 };
      animate(rateObj, {
        val: 9185,
        round: 1,
        ease: 'outExpo',
        duration: 2200,
        delay: 500,
        update: () => {
          setDisplayRate(rateObj.val);
        }
      });

      // 4. Gentle loop for sparkles
      animate(Array.from(sparkles), {
        scale: [1, 1.08, 1],
        rotate: [-3, 3, -3],
        opacity: [0.8, 1, 0.8],
        duration: 4000,
        ease: 'inOutSine',
        loop: true,
        delay: stagger(200),
      });
    }
  }, []);

  // Button Hover Effect
  const handleMouseEnter = () => {
    if (buttonRef.current) {
      animate(buttonRef.current, {
        scale: 1.03,
        duration: 300,
        ease: 'outQuad',
      });
      const arrow = buttonRef.current.querySelector('.rate-card-cta-arrow');
      if (arrow) {
        animate(arrow, {
          translateX: 4,
          duration: 250,
          ease: 'outQuad',
        });
      }
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      animate(buttonRef.current, {
        scale: 1,
        duration: 300,
        ease: 'outQuad',
      });
      const arrow = buttonRef.current.querySelector('.rate-card-cta-arrow');
      if (arrow) {
        animate(arrow, {
          translateX: 0,
          duration: 250,
          ease: 'outQuad',
        });
      }
    }
  };

  return (
    <div ref={cardRef} className="hero-gold-rate-card-v2">
      {/* Decorative Sparkles */}
      <Image
        src={sparkle2Img}
        alt=""
        aria-hidden="true"
        className="hero-sparkle-flare"
        style={{ position: 'absolute', left: -37.77, top: -15.79 }}
        width={145}
        height={34}
      />
      <Image
        src={sparkle2Img}
        alt=""
        aria-hidden="true"
        className="hero-sparkle-flare"
        style={{ position: 'absolute', right: -21.86, bottom: -20.78 }}
        width={145}
        height={34}
      />

      {/* Animated Glowing border beam (aura/shine effect) */}
      <svg className="gold-beam-svg" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="shine-gradient" x1="-100%" y1="-100%" x2="0%" y2="0%">
            <animate attributeName="x1" from="-100%" to="200%" dur="4s" repeatCount="indefinite" />
            <animate attributeName="y1" from="-100%" to="200%" dur="4s" repeatCount="indefinite" />
            <animate attributeName="x2" from="0%" to="300%" dur="4s" repeatCount="indefinite" />
            <animate attributeName="y2" from="0%" to="300%" dur="4s" repeatCount="indefinite" />

            <stop offset="0%" stopColor="#EBAF20" stopOpacity="0" />
            <stop offset="40%" stopColor="#EBAF20" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="60%" stopColor="#EBAF20" stopOpacity="0" />
            <stop offset="100%" stopColor="#EBAF20" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect
          x="1"
          y="1"
          width="100%"
          height="100%"
          rx="16"
          fill="none"
          stroke="url(#shine-gradient)"
          className="gold-beam-rect"
          style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)' }}
        />
      </svg>

      <div className="rate-card-header-v2">
        <span className="rate-card-title-v2">Today's Gold Rate</span>
        <div className="rate-card-live-indicator">
          <span className="live-dot-v2" />
          <span>Live</span>
        </div>
      </div>
      <div className="rate-card-divider" />
      <div className="rate-card-purity-v2">24K (999)</div>
      <div className="rate-card-price-value">
        <span>₹{displayRate.toLocaleString('en-IN')}</span>
        <span className="rate-card-price-unit">/g</span>
      </div>
      <button
        ref={buttonRef}
        className="btn-rate-card-cta-v2"
        onClick={handleScrollToForm}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span>Check Full rate</span>
        <span className="rate-card-cta-arrow" style={{ display: 'inline-block' }}>&gt;</span>
      </button>
    </div>
  );
}
