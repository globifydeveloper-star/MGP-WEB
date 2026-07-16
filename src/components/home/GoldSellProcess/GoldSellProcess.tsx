'use client';

import React, { useState, useEffect, useRef } from 'react';
import { animate, set, stagger } from 'animejs';
import './GoldSellProcess.css';

const steps = [
  {
    num: '1',
    title: 'Visit Your Nearest White Gold Branch',
    desc: 'Customers give their Gold to Muthoot Gold Point for valuation, Gold to Muthoot Gold Point for valuation.',
    leftDesc: 'Dummy content: Walk into any of our branches with your gold jewellery. Our team will greet you and guide you through the entire selling process step by step.',
    image: '/g_selling.png'
  },
  {
    num: '2',
    title: 'Submit ID & Address Proof',
    desc: 'Share a valid photo ID (Aadhaar, PAN, Passport or Voter ID) along with address proof for quick, hassle-free verification.',
    leftDesc: 'Dummy content: Keep your Aadhaar, PAN, Passport or Voter ID handy along with address proof so our team can verify your identity quickly.',
    image: '/gcard1.png'
  },
  {
    num: '3',
    title: 'Professional Gold Purity Assessment',
    desc: 'Our experts assess the purity of your gold using advanced XRF technology, right in front of you, for complete transparency.',
    leftDesc: 'Dummy content: Our experts use advanced XRF technology to test the purity of your gold right in front of you, ensuring complete transparency.',
    image: '/gcard2.png'
  },
  {
    num: '4',
    title: 'Get the Latest Live Gold Rate',
    desc: 'Your gold is valued against the current live market rate, ensuring you always get the fairest, most accurate price.',
    leftDesc: 'Dummy content: We value your gold against today\'s live market rate, so you always get the fairest and most accurate price.',
    image: '/gcard3.png'
  },
  {
    num: '5',
    title: 'Instant Payment',
    desc: 'Receive your payment instantly via bank transfer or cash, immediately after the valuation is complete.',
    leftDesc: 'Dummy content: Once the valuation is complete, receive your payment instantly via bank transfer or cash — no waiting around.',
    image: '/rp_card1.png'
  }
];

export default function GoldSellProcess() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleStep = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
    setActiveIndex(index);
  };

  const activeStep = steps[activeIndex];

  // 1. Entrance animation on intersection
  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.gsp-step-card');
    
    // Set initial card states to avoid layout flash
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
  }, []);

  // 2. Accordion opening and closing animations
  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.gsp-step-card');

    cards.forEach((card, idx) => {
      const wrapper = card.querySelector('.gsp-step-desc-wrapper') as HTMLDivElement;
      const content = card.querySelector('.gsp-step-desc-content') as HTMLDivElement;
      const badgeNum = card.querySelector('.gsp-step-badge-num') as HTMLElement;
      
      const isOpen = openIndex === idx;

      if (wrapper && content) {
        // Smoothly animate height and opacity of the description area
        const targetHeight = isOpen ? (content.offsetHeight || content.scrollHeight) : 0;
        
        animate(wrapper, {
          height: targetHeight,
          opacity: isOpen ? [0, 1] : 0,
          duration: 350,
          ease: 'outQuad',
        });
      }

      if (badgeNum && isOpen) {
        // Soft bounce scale effect for the step number badge when opened
        animate(badgeNum, {
          scale: [1, 1.22, 1],
          duration: 400,
          ease: 'outBack',
        });
      }
    });
  }, [openIndex]);

  return (
    <section className="gsp-section" id="gold-sell-process">
      <div className="container">
        <div className="gsp-grid">
          {/* Left Column: Heading, description & image */}
          <div className="gsp-left">
            <h2 className="gsp-heading">
              Gold Selling <span className="gsp-heading-highlight">Process</span>
            </h2>
            <p className="gsp-desc">
              {activeStep.leftDesc}
            </p>
            <div className="gsp-image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activeStep.image} alt={activeStep.title} className="gsp-image" />
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
      </div>
    </section>
  );
}

