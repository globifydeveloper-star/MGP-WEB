"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { animate, set, stagger } from 'animejs';
import './GoldSellProcess.css';

const DEFAULT_STEPS = [
  {
    num: '1',
    title: 'Visit Your Nearest White Gold Branch',
    desc: 'Customers give their Gold to Muthoot Gold Point for valuation, Gold to Muthoot Gold Point for valuation.',
    leftDesc: 'Walk into any of our branches with your gold jewellery. Our team will greet you and guide you through the entire selling process step by step.',
    image: '/g_selling.png'
  },
  {
    num: '2',
    title: 'Submit ID & Address Proof',
    desc: 'Share a valid photo ID (Aadhaar, PAN, Passport or Voter ID) along with address proof for quick, hassle-free verification.',
    leftDesc: 'Keep your Aadhaar, PAN, Passport or Voter ID handy along with address proof so our team can verify your identity quickly.',
    image: '/gcard1.png'
  },
  {
    num: '3',
    title: 'Professional Gold Purity Assessment',
    desc: 'Our experts assess the purity of your gold using advanced XRF technology, right in front of you, for complete transparency.',
    leftDesc: 'Our experts use advanced XRF technology to test the purity of your gold right in front of you, ensuring complete transparency.',
    image: '/gcard2.png'
  },
  {
    num: '4',
    title: 'Get the Latest Live Gold Rate',
    desc: 'Your gold is valued against the current live market rate, ensuring you always get the fairest, most accurate price.',
    leftDesc: "We value your gold against today's live market rate, so you always get the fairest and most accurate price.",
    image: '/gcard3.png'
  },
  {
    num: '5',
    title: 'Instant Payment',
    desc: 'Receive your payment instantly via bank transfer or cash, immediately after the valuation is complete.',
    leftDesc: 'Once the valuation is complete, receive your payment instantly via bank transfer or cash — no waiting around.',
    image: '/rp_card1.png'
  }
];

interface GoldSellProcessProps {
  steps?: any[];
  sectionImage?: string;
}

/* ── Desktop accordion ── */
function GoldSellProcessDesktop({ steps, sectionImage }: { steps: any[]; sectionImage?: string }) {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleStep = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
    setActiveIndex(index);
  };

  const activeStep = steps[activeIndex] || steps[0];

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.gsp-step-card');
    set(cards, { opacity: 0, translateY: 40 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(Array.from(cards), {
              opacity: [0, 1],
              translateY: [40, 0],
              delay: stagger(120),
              duration: 800,
              ease: 'outQuart',
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [steps]);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.gsp-step-card');

    cards.forEach((card, idx) => {
      const wrapper = card.querySelector('.gsp-step-desc-wrapper') as HTMLDivElement;
      const content = card.querySelector('.gsp-step-desc-content') as HTMLDivElement;
      const badgeNum = card.querySelector('.gsp-step-badge-num') as HTMLElement;

      const isOpen = openIndex === idx;

      if (wrapper && content) {
        const targetHeight = isOpen ? (content.offsetHeight || content.scrollHeight) : 0;
        animate(wrapper, {
          height: targetHeight,
          opacity: isOpen ? [0, 1] : 0,
          duration: 350,
          ease: 'outQuad',
        });
      }

      if (badgeNum && isOpen) {
        animate(badgeNum, {
          scale: [1, 1.22, 1],
          duration: 400,
          ease: 'outBack',
        });
      }
    });
  }, [openIndex, steps]);

  // Add this timer to auto-cycle Desktop steps
  useEffect(() => {
    if (!steps || steps.length === 0) return;
    const timer = setInterval(() => {
      setOpenIndex((prev) => (prev + 1) % steps.length);
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 4000); // Changes every 4 seconds
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="gsp-grid">
      {/* Left Column: Heading, description & image */}
      <div className="gsp-left">
        <h2 className="gsp-heading">
          Gold Selling <span className="gsp-heading-highlight">Process</span>
        </h2>
        <div key={activeIndex} className="gsp-left-content">
          <p className="gsp-desc">{activeStep?.leftDesc}</p>
          <div className="gsp-image-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sectionImage || activeStep?.image} alt={activeStep?.title} className="gsp-image" />
          </div>
        </div>
      </div>

      {/* Right Column: Clickable step accordion */}
      <div className="gsp-right" ref={containerRef}>
        <div className="gsp-steps">
          {steps.map((step, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={step.num} className={`gsp-step-card ${isOpen ? 'gsp-step-open' : ''}`}>
                <div className="gsp-step-body">
                  <div className="gsp-step-num-wrap">
                    <span className="gsp-step-badge-label">Step</span>
                    <span className="gsp-step-badge-num">{step.num}</span>
                  </div>
                  <button
                    className="gsp-step-bar"
                    onClick={() => toggleStep(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="gsp-step-title">{step.title}</span>
                    <span className="gsp-step-icon">
                      <svg
                        className={`gsp-step-icon-svg ${isOpen ? 'gsp-rotate' : ''}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0F1A4D"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 6 15 12 9 18" />
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="gsp-step-desc-wrapper">
                  <div className="gsp-step-desc-content">
                    <p>{step.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Mobile / Tablet carousel ── */
function GoldSellProcessCarousel({ steps, sectionImage }: { steps: any[]; sectionImage?: string }) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef<number | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent(Math.max(0, Math.min(steps.length - 1, idx)));
  }, [steps]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, goTo]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only swipe if horizontal movement is dominant
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) goTo(current + 1);
      else goTo(current - 1);
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Mouse drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current || dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) goTo(current + 1);
      else goTo(current - 1);
    }
    isDragging.current = false;
    dragStartX.current = null;
  };

  const onMouseLeave = () => {
    isDragging.current = false;
    dragStartX.current = null;
  };

  const step = steps[current] || steps[0];

  return (
    <div className="gsp-carousel-section">
      {/* Section header */}
      <div className="gsp-carousel-header">
        <h2 className="gsp-heading">
          Gold Selling <span className="gsp-heading-highlight">Process</span>
        </h2>
        <p className="gsp-carousel-subtitle">
          Follow our simple 5-step process to sell your gold quickly, safely, and at the best price.
        </p>
      </div>

      {/* Slide track */}
      <div
        className="gsp-carousel-track"
        ref={trackRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        role="region"
        aria-label="Gold selling process steps"
        aria-roledescription="carousel"
      >
        {/* Slide */}
        <div
          className="gsp-carousel-slide"
          aria-label={`Slide ${current + 1} of ${steps.length}: ${step?.title}`}
          aria-roledescription="slide"
        >
          {/* Step image */}
          <div className="gsp-carousel-img-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sectionImage || step?.image}
              alt={step?.title}
              className="gsp-carousel-img"
              draggable={false}
            />
          </div>

          {/* Step content */}
          <div className="gsp-carousel-content">
            <div className="gsp-carousel-step-badge">
              <span className="gsp-carousel-step-label">Step</span>
              <span className="gsp-carousel-step-num">{step?.num}</span>
            </div>
            <h3 className="gsp-carousel-step-title">{step?.title}</h3>
            <p className="gsp-carousel-step-desc">{step?.desc}</p>
          </div>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="gsp-carousel-controls">
        <button
          className="gsp-carousel-btn gsp-carousel-btn-prev"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          aria-label="Previous step"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Pagination dots */}
        <div className="gsp-carousel-dots" role="tablist" aria-label="Slide navigation">
          {steps.map((_, i) => (
            <button
              key={i}
              className={`gsp-carousel-dot ${i === current ? 'gsp-carousel-dot-active' : ''}`}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        <button
          className="gsp-carousel-btn gsp-carousel-btn-next"
          onClick={() => goTo(current + 1)}
          disabled={current === steps.length - 1}
          aria-label="Next step"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Root component: renders carousel on mobile/tablet, accordion on desktop ── */
export default function GoldSellProcess({ steps, sectionImage }: GoldSellProcessProps) {
  const activeSteps = steps && steps.length > 0
    ? steps.map((s, idx) => ({
        num: (idx + 1).toString(),
        title: s.stepTitle,
        desc: s.stepDescription,
        leftDesc: s.leftDescription,
        image: s.stepImage || '/g_selling.png'
      }))
    : DEFAULT_STEPS;

  return (
    <section className="gsp-section" id="gold-sell-process">
      <div className="container">
        <div className="gsp-desktop-view">
          <GoldSellProcessDesktop steps={activeSteps} sectionImage={sectionImage} />
        </div>
        <div className="gsp-mobile-view">
          <GoldSellProcessCarousel steps={activeSteps} sectionImage={sectionImage} />
        </div>
      </div>
    </section>
  );
}
