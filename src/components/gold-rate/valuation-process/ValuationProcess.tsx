'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { animate, createTimeline, stagger, set } from 'animejs';
import './ValuationProcess.css';
import valuationCounterImg from '@/assets/images/gold_rate_component_photos/valuation_counter_customer.png';

const STEPS = [
  {
    num: '01',
    title: "Check Today's Gold Rate",
    desc: 'We use the latest live rate for accurate valuation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 3 3 5-6" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Bring Your Gold',
    desc: 'Visit our nearest branch with your gold.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.5 12.5c-1.5 4-4.5 7-8.5 8.5c-4-1.5-7-4.5-8.5-8.5" />
        <path d="M12 3c1.5 1.5 2.3 3 2.3 4.5A2.3 2.3 0 0 1 12 9.8a2.3 2.3 0 0 1-2.3-2.3C9.7 6 10.5 4.5 12 3Z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Purity Verification',
    desc: 'Your gold is tested using advanced equipment.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M21 21l-4.8-4.8" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Weight Assessment',
    desc: 'Accurate weight is measured for precise calculation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="3" x2="12" y2="21" />
        <path d="M5 7h14" />
        <path d="M5 7l-3 7a3 3 0 0 0 6 0z" />
        <path d="M19 7l-3 7a3 3 0 0 0 6 0z" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Get Your Gold Value',
    desc: 'You receive a transparent and instant gold valuation.',
    icon: <span className="vp-rupee-icon">₹</span>,
  },
];

export default function ValuationProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const title = section.querySelector('.vp-title');
    const steps = section.querySelectorAll('.vp-step');
    const line = section.querySelector('.vp-steps-line');
    const imageWrap = section.querySelector('.vp-image-wrap');

    if (title && steps.length) {
      set(title, { opacity: 0, translateY: -30 });
      set(Array.from(steps), { opacity: 0, translateY: 40, scale: 0.82 });
      if (line) {
        set(line, { scaleX: 0, opacity: 0 });
      }
      if (imageWrap) {
        set(imageWrap, { opacity: 0, translateX: 60 });
      }

      const triggerAnimation = () => {
        if (animatedRef.current) return;
        animatedRef.current = true;

        const tl = createTimeline({
          defaults: { ease: 'outExpo' },
        });

        tl.add(title, {
          opacity: [0, 1],
          translateY: [-30, 0],
          duration: 750,
        });

        if (line) {
          const isMobile = window.innerWidth <= 640;
          if (isMobile) {
            set(line, { scaleY: 0, opacity: 0 });
          } else {
            set(line, { scaleX: 0, opacity: 0 });
          }

          tl.add(line, {
            [isMobile ? 'scaleY' : 'scaleX']: [0, 1],
            opacity: [0, 1],
            duration: 1400,
            ease: 'easeInOutCubic',
          }, '-=400');
        }

        // Sequential step-by-step appearance animation
        tl.add(Array.from(steps), {
          opacity: [0, 1],
          translateY: [40, 0],
          scale: [0.82, 1],
          duration: 800,
          delay: stagger(280), // 280ms stagger delay between each step appearing
          ease: 'outBack(1.4)',
        }, '-=1100');

        if (imageWrap) {
          tl.add(imageWrap, {
            opacity: [0, 1],
            translateX: [60, 0],
            duration: 1000,
          }, '-=1300');
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
    <section className="vp-section" id="valuation-process" ref={sectionRef}>
      <div className="vp-layout">
        <div className="vp-left">
          <div className="vp-left-inner">
            <h2 className="vp-title">
              How We <span className="vp-title-gold">Value</span> Your Gold
            </h2>

            <div className="vp-steps">
              <div className="vp-steps-line" aria-hidden="true" />
              {STEPS.map((step) => (
                <div className="vp-step" key={step.num}>
                  <div className="vp-step-circle">{step.icon}</div>
                  <div className="vp-step-text">
                    <span className="vp-step-num">{step.num}</span>
                    <h3 className="vp-step-title">{step.title}</h3>
                    <p className="vp-step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="vp-image-wrap">
          <div className="vp-image-fade" aria-hidden="true" />
          <Image
            src={valuationCounterImg}
            alt="A Goldpoint staff member weighing a customer's gold jewellery on a digital scale at the branch counter"
            className="vp-image"
            fill
            sizes="(max-width: 1023px) 0px, 420px"
          />
        </div>
      </div>
    </section>
  );
}
