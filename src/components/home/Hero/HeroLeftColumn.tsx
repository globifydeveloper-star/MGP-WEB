"use client";

import React, { useEffect, useRef } from 'react';
import { createTimeline, stagger, set } from 'animejs';
import Image from 'next/image';
import trustIcon from '@/assets/images/trusticon.png';
import lineImg from '@/assets/images/Line.png';
import './heroLeftColumn.css';

interface HeroLeftColumnProps {
  heroText?: string;
  button1?: {
    enabled: boolean;
    label?: string;
    link?: string;
  };
  button2?: {
    enabled: boolean;
    label?: string;
    link?: string;
  };
}

export default function HeroLeftColumn({ heroText, button1, button2 }: HeroLeftColumnProps) {
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

  const text = heroText || "Sell Your Gold. Get Cash Today.";
  const parts = text.split('. ');
  const whiteText = parts[0] ? parts[0] + (parts[1] !== undefined ? '.' : '') : '';
  const goldText = parts[1] ? parts[1] : '';

  const btn1Enabled = button1 ? button1.enabled : true;
  const btn1Label = button1?.label || "Find Nearest Branch";
  const btn1Link = button1?.link || "#branches";

  const btn2Enabled = button2 ? button2.enabled : true;
  const btn2Label = button2?.label || "See how it works";
  const btn2Link = button2?.link || "#gold-sell-process";

  const handleCta = (link: string | undefined) => {
    if (!link) return;
    if (link.startsWith('#')) {
      const element = document.getElementById(link.substring(1));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(link, '_blank');
    }
  };

  return (
    <div ref={containerRef} className="hero-left-column-v2">
      {/* Trust Badge */}
      <div className="hero-trust-badge-v2">
        <div className="trust-badge-header-v2">
          <Image
            src={trustIcon}
            alt="Trust Icon"
            width={34}
            height={34}
            className="trust-badge-icon-img"
            priority
          />
          <span className="trust-badge-text-v2">
            Trusted by <span className="gold-highlight">5 Lakh+ Customers</span> Across India
          </span>
        </div>
        <div className="trust-badge-line-wrapper">
          <Image
            src={lineImg}
            alt=""
            className="trust-badge-underline-img"
            priority
          />
        </div>
      </div>

      {/* Main Headline */}
      <h1 className="hero-main-title-v2">
        <span className="hero-title-white-text">{whiteText}</span>
        <span className="hero-gold-text">{goldText}</span>
      </h1>

      <div className="hero-subcopy-wrapper-v2">
        <div className="hero-subcopy-text-v2 w-96 justify-center text-white text-xl font-medium font-['Gilroy']">
          Get the True Market Value Old, Unused or pledged gold through a transparent process conducted entirely in front of you
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="hero-cta-group-v2">
        {btn1Enabled && (
          <button
            className="btn-gold-gradient"
            onClick={() => handleCta(btn1Link)}
          >
            {btn1Label}
          </button>
        )}
        {btn2Enabled && (
          <button
            className="btn-white-outline-v2"
            onClick={() => handleCta(btn2Link)}
          >
            {btn2Label}
          </button>
        )}
      </div>
    </div>
  );
}

