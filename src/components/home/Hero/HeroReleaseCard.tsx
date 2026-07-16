'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { animate, createTimeline, stagger, set } from 'animejs';
import './hero.css';
import sparkle2Img from '@/assets/images/sparkle2.png';

export default function HeroReleaseCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const steps = [
    {
      id: 1,
      title: 'Bring Documents',
      desc: 'Bring your pawn/bank pledge tickets',
      icon: (
        <svg className="step-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#EBAF20" strokeWidth="2">
          <path pathLength={1000} strokeDasharray={1000} strokeDashoffset={1000} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline pathLength={1000} strokeDasharray={1000} strokeDashoffset={1000} points="14 2 14 8 20 8" />
          <line pathLength={1000} strokeDasharray={1000} strokeDashoffset={1000} x1="16" y1="13" x2="8" y2="13" />
          <line pathLength={1000} strokeDasharray={1000} strokeDashoffset={1000} x1="16" y1="17" x2="8" y2="17" />
          <polyline pathLength={1000} strokeDasharray={1000} strokeDashoffset={1000} points="10 9 9 9 8 9" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Muthoot Pays Loan',
      desc: 'We clear your outstanding amount',
      icon: (
        <svg className="step-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#EBAF20" strokeWidth="2">
          <rect pathLength={1000} strokeDasharray={1000} strokeDashoffset={1000} x="2" y="4" width="20" height="16" rx="2" />
          <line pathLength={1000} strokeDasharray={1000} strokeDashoffset={1000} x1="12" y1="10" x2="12" y2="16" />
          <line pathLength={1000} strokeDasharray={1000} strokeDashoffset={1000} x1="8" y1="12" x2="16" y2="12" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Get Balance Cash',
      desc: 'Instant payment for the balance gold value',
      icon: (
        <svg className="step-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#EBAF20" strokeWidth="2">
          <line pathLength={1000} strokeDasharray={1000} strokeDashoffset={1000} x1="12" y1="1" x2="12" y2="23" />
          <path pathLength={1000} strokeDasharray={1000} strokeDashoffset={1000} d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    if (cardRef.current) {
      const card = cardRef.current;
      const sparkles = card.querySelectorAll('.hero-sparkle-flare');
      const header = card.querySelector('.rate-card-header-v2');
      const divider = card.querySelector('.rate-card-divider');
      const stepItems = card.querySelectorAll('.release-step-item');
      const paths = card.querySelectorAll('.step-icon-svg path, .step-icon-svg polyline, .step-icon-svg line, .step-icon-svg rect');
      const button = buttonRef.current;

      if (card && header && divider && button && stepItems.length > 0) {
        // 1. Initial hidden state for entrance animation
        set(card, { opacity: 0, translateY: 60, scale: 0.93 });
        set([header, divider, button], { opacity: 0 });
        set(stepItems, { opacity: 0, translateX: -30 });

        // 2. Entrance Timeline
        const tl = createTimeline({
          defaults: {
            ease: 'outExpo',
          }
        });

        tl.add(card, {
          opacity: [0, 1],
          translateY: [60, 0],
          scale: [0.93, 1],
          duration: 1200,
          ease: 'outElastic(1, 0.75)',
        })
        .add([header, divider], {
          opacity: [0, 1],
          duration: 600,
        }, '-=800')
        .add(stepItems, {
          opacity: [0, 1],
          translateX: [-30, 0],
          duration: 800,
          delay: stagger(150),
        }, '-=600')
        .add(Array.from(paths), {
          strokeDashoffset: 0,
          duration: 1000,
          ease: 'inOutSine',
          delay: stagger(60),
        }, '-=900')
        .add(button, {
          opacity: [0, 1],
          scale: [0.9, 1],
          duration: 700,
          ease: 'outBack',
        }, '-=700');
      }

      // 3. Gentle loop for sparkles (scale & rotate)
      animate(Array.from(sparkles), {
        scale: [1, 1.08, 1],
        rotate: [-3, 3, -3],
        opacity: [0.8, 1, 0.8],
        duration: 4000,
        ease: 'inOutSine',
        loop: true,
        delay: stagger(200),
      });

      // 4. Staggered micro-floating loops for step items
      stepItems.forEach((item, index) => {
        const iconWrapper = item.querySelector('.release-step-icon-wrapper');
        if (iconWrapper) {
          animate(iconWrapper, {
            translateY: [0, -4, 0],
            duration: 3000 + index * 400,
            ease: 'inOutSine',
            loop: true,
          });
        }
      });
    }
  }, []);

  // Button Hover Effect
  const handleMouseEnter = () => {
    if (buttonRef.current) {
      animate(buttonRef.current, {
        scale: 1.04,
        boxShadow: '0 8px 24px rgba(235, 175, 32, 0.35)',
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
        boxShadow: '0 4px 12px rgba(235, 175, 32, 0)',
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
    <div ref={cardRef} className="hero-gold-rate-card-v2 hero-release-card-v2" style={{ opacity: 0 }}>
      {/* Decorative Sparkles */}
      <Image
        src={sparkle2Img}
        alt=""
        aria-hidden="true"
        className="hero-sparkle-flare"
        style={{ left: -37.77, top: -15.79 }}
        width={145}
        height={34}
      />
      <Image
        src={sparkle2Img}
        alt=""
        aria-hidden="true"
        className="hero-sparkle-flare"
        style={{ left: 132.86, top: 242.78 }}
        width={145}
        height={34}
      />

      <div className="rate-card-header-v2" style={{ opacity: 0 }}>
        <span className="rate-card-title-v2">Pledged Gold Release</span>
        <div className="rate-card-live-indicator">
          <span className="live-dot-v2 green-indicator" />
          <span>Easy</span>
        </div>
      </div>
      <div className="rate-card-divider" style={{ opacity: 0 }} />
      
      {/* Release Steps */}
      <div className="release-steps-container">
        {steps.map((step) => (
          <div key={step.id} className="release-step-item" style={{ opacity: 0 }}>
            <div className="release-step-icon-wrapper">
              {step.icon}
            </div>
            <div className="release-step-text">
              <h4 className="release-step-title">{step.title}</h4>
              <p className="release-step-desc">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button 
        ref={buttonRef}
        className="btn-rate-card-cta-v2" 
        style={{ opacity: 0 }}
        onClick={() => {
          const element = document.getElementById('branches');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span>Release Gold Ticket</span>
        <span className="rate-card-cta-arrow" style={{ display: 'inline-block' }}>&gt;</span>
      </button>
    </div>
  );
}

