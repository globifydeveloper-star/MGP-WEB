'use client';

import React, { useState } from 'react';
import './SellGoldTestimonials.css';

const TESTIMONIALS = [
  {
    name: 'Basvaraju',
    location: 'Bengaluru',
    rating: 5,
    tag: 'House Construction Emergency',
    quote:
      'I wanted to sell some jewellery to pay for the construction of my house after my contractor cheated us. My earlier experience of selling gold elsewhere had not been good. But the team at MGP explained each step of how they scientifically value the gold. I was totally impressed by their transparency and detailing!',
  },
  {
    name: 'Amar Singh',
    location: 'Mumbai',
    rating: 5,
    tag: 'Medical Emergency Payout',
    quote:
      'When my father needed an emergency bypass surgery, I took all the jewellery I had straight to MGP. Within minutes, they assessed the true value using XRF machines, gave me an itemised receipt, and transferred the funds straight to my bank account. Thanks to their quick transfer, my father got his operation on time!',
  },
  {
    name: 'Srinarayan',
    location: 'Hyderabad',
    rating: 5,
    tag: 'Business Liquidity',
    quote:
      'In family and business, when money is tight, you need trusted liquidity. Having dealt with unorganized jewellers who cut arbitrary percentages, Muthoot Gold Point was a breath of fresh air. Complete transparency and instant cash transfer!',
  },
  {
    name: 'Vijay Sharma',
    location: 'Delhi NCR',
    rating: 5,
    tag: 'Higher Education Fees',
    quote:
      'I was looking to pay my son\'s final year engineering college fee. Local jewellers offered less than half of the actual gold market value. A friend suggested Muthoot Gold Point. I was blown away by their ultrasonic cleaning and 3-decimal precision scale. I received 35% higher value than local jeweller offers!',
  },
];

export default function SellGoldTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const nextTestimonial = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[activeIdx];

  return (
    <section className="sg-testi-section">
      <div className="container">
        
        <div className="sg-testi-header">
          <span className="sg-testi-tag">REAL CUSTOMER STORIES</span>
          <h2 className="sg-testi-title">
            Trusted by Thousands of <span className="sg-title-highlight">Satisfied Sellers</span>
          </h2>
          <p className="sg-testi-subtitle">
            Read how Muthoot Gold Point helped real customers get maximum value for their gold during urgent financial needs.
          </p>
          <div className="sg-testi-line" />
        </div>

        <div className="sg-testi-card-wrapper">
          <div className="sg-testi-card">
            <div className="sg-testi-top">
              <div className="sg-testi-quote-icon">“</div>
              <div className="sg-testi-rating">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <span key={i} className="sg-star">★</span>
                ))}
              </div>
            </div>

            <p className="sg-testi-text">&quot;{current.quote}&quot;</p>

            <div className="sg-testi-footer">
              <div className="sg-testi-user-info">
                <div className="sg-testi-avatar">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <h4 className="sg-testi-name">{current.name}</h4>
                  <span className="sg-testi-location">{current.location} • <span className="sg-testi-tag-inline">{current.tag}</span></span>
                </div>
              </div>

              <div className="sg-testi-controls">
                <button onClick={prevTestimonial} aria-label="Previous story" className="sg-ctrl-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <span className="sg-testi-count">{activeIdx + 1} / {TESTIMONIALS.length}</span>
                <button onClick={nextTestimonial} aria-label="Next story" className="sg-ctrl-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="sg-testi-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`sg-dot ${i === activeIdx ? 'active' : ''}`}
                onClick={() => setActiveIdx(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
