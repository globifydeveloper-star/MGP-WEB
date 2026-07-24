'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { animate, createTimeline, stagger, set } from 'animejs';
import './WhyRatesChange.css';
import treasureChestImg from '@/assets/images/gold_rate_component_photos/07-why-rates-treasure-chest.png';

const REASONS = [
  {
    title: 'Global Gold Prices',
    desc: 'International gold prices directly impact domestic rates.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z" />
      </svg>
    ),
  },
  {
    title: 'Exchange Rates',
    desc: 'Changes in INR vs USD affect the price of gold in India.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 8h11l-3-3" />
        <path d="M17 16H6l3 3" />
      </svg>
    ),
  },
  {
    title: 'Demand & Supply',
    desc: 'Higher demand or lower supply increases gold prices.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Economic Conditions',
    desc: 'Inflation, interest rates & market volatility influence gold prices.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 3 3 5-6" />
      </svg>
    ),
  },
  {
    title: 'Global Events',
    desc: 'Geopolitical events and economic news impact market trends.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      </svg>
    ),
  },
];

export default function WhyRatesChange() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const title = section.querySelector('.wrc-title');
    const cards = section.querySelectorAll('.wrc-card');
    const imageWrap = section.querySelector('.wrc-image-wrap');

    if (title && cards.length) {
      set(title, { opacity: 0, translateY: -35, translateX: -20 });
      set(Array.from(cards), { opacity: 0, translateY: 50, translateX: -30 });
      if (imageWrap) {
        set(imageWrap, { opacity: 0, translateX: 80 });
      }

      const triggerAnimation = () => {
        if (animatedRef.current) return;
        animatedRef.current = true;

        const tl = createTimeline({
          defaults: { ease: 'outExpo' },
        });

        tl.add(title, {
          opacity: [0, 1],
          translateY: [-35, 0],
          translateX: [-20, 0],
          duration: 900,
        })
        .add(Array.from(cards), {
          opacity: [0, 1],
          translateY: [50, 0],
          translateX: [-30, 0],
          duration: 1000,
          delay: stagger(150),
        }, '-=500');

        if (imageWrap) {
          tl.add(imageWrap, {
            opacity: [0, 1],
            translateX: [80, 0],
            duration: 1100,
          }, '-=1000');
        }
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              triggerAnimation();
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(section);

      return () => observer.disconnect();
    }
  }, []);

  return (
    <section className="wrc-section" id="why-rates-change" ref={sectionRef}>
      <div className="wrc-layout">
        <div className="wrc-content-col">
          <div className="wrc-content-inner">
            <h2 className="wrc-title">
              Why <span className="wrc-title-gold">Gold Rates</span> Change
            </h2>

            <div className="wrc-grid">
              {REASONS.map((r) => (
                <div className="wrc-card" key={r.title}>
                  <span className="wrc-icon-circle">{r.icon}</span>
                  <h3 className="wrc-card-title">{r.title}</h3>
                  <p className="wrc-card-desc">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="wrc-image-wrap">
          <Image
            src={treasureChestImg}
            alt="A gold treasure chest overflowing with gold coins and jewellery on a soft white background"
            className="wrc-image"
            fill
            sizes="(max-width: 1200px) 0px, 400px"
          />
        </div>
      </div>
    </section>
  );
}
