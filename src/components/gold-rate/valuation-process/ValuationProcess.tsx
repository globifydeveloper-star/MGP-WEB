'use client';

import React from 'react';
import Image from 'next/image';
import './ValuationProcess.css';
import valuationCounterImg from '@/assets/images/gold_rate_component_photos/valuation_counter_customer.png';

const STEPS = [
  {
    num: '01',
    title: "Check Today's Gold Rate",
    desc: 'We use the latest live rate for accurate valuation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
  return (
    <section className="vp-section" id="valuation-process">
      <div className="vp-layout">
        <div className="vp-left">
          <div className="vp-left-inner">
            <h2 className="vp-title">
              How We <span className="vp-title-gold">Value</span> Your Gold
            </h2>

            <div className="vp-steps">
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
