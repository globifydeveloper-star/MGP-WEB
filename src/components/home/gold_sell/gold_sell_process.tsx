'use client';

import React, { useState } from 'react';
import './gold_sell_process.css';

const steps = [
  {
    num: '1',
    title: 'Visit Your Nearest White Gold Branch',
    desc: 'Customers give their Gold to Muthoot Gold Point for valuation, Gold to Muthoot Gold Point for valuation.'
  },
  {
    num: '2',
    title: 'Submit ID & Address Proof',
    desc: 'Share a valid photo ID (Aadhaar, PAN, Passport or Voter ID) along with address proof for quick, hassle-free verification.'
  },
  {
    num: '3',
    title: 'Professional Gold Purity Assessment',
    desc: 'Our experts assess the purity of your gold using advanced XRF technology, right in front of you, for complete transparency.'
  },
  {
    num: '4',
    title: 'Get the Latest Live Gold Rate',
    desc: 'Your gold is valued against the current live market rate, ensuring you always get the fairest, most accurate price.'
  },
  {
    num: '5',
    title: 'Instant Payment',
    desc: 'Receive your payment instantly via bank transfer or cash, immediately after the valuation is complete.'
  }
];

export default function GoldSellProcess() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleStep = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

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
              Visit us or let us come to you — same transparent process, same live market rate, same instant payment. Visit us or let us come to you — same transparent process, same live market rate, same instant payment.
            </p>
            <div className="gsp-image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/g_selling.png" alt="Customer holding gold jewellery to sell" className="gsp-image" />
            </div>
          </div>

          {/* Right Column: Clickable step accordion */}
          <div className="gsp-right">
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

                    <div className={`gsp-step-desc-wrapper ${isOpen ? 'gsp-expanded' : ''}`}>
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
