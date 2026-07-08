'use client';

import React from 'react';
import './TheGpDiff.css';

const CARDS = [
  {
    image: '/gcard1.png',
    alt: 'XRF gold analyzer being used on jewellery',
    title: 'XRF over touchstone',
    desc: "Spectroscopic analysis gives the exact elemental composition of your gold. A touchstone gives a rough estimate. We don't do rough estimates.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 2h6" />
        <path d="M10 2v6.34a2 2 0 0 1-.5 1.32L4.72 15.6A2 2 0 0 0 6.24 19h11.52a2 2 0 0 0 1.52-3.4l-4.78-6.94A2 2 0 0 1 14 8.34V2" />
        <path d="M6.5 14.5h11" />
      </svg>
    ),
  },
  {
    image: '/gcard2.png',
    alt: 'Precision scale weighing gold jewellery',
    title: 'Three-decimal weight',
    desc: 'Weighed to 0.001g on precision balances. Most buyers round down to the nearest gram. That difference is real money leaving your pocket.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="3" x2="12" y2="21" />
        <path d="M5 7h14" />
        <path d="M5 7l-3 7a3 3 0 0 0 6 0z" />
        <path d="M19 7l-3 7a3 3 0 0 0 6 0z" />
      </svg>
    ),
  },
  {
    image: '/gcard3.png',
    alt: 'Digital bank transfer on a tablet',
    title: 'Bank transfer, not cash-only',
    desc: 'Every transaction above ₹10,000 reaches your account digitally. A full itemised invoice issued. No undocumented exchanges.',
    icon: <span className="gp-diff-rupee">₹</span>,
  },
];

export default function TheGpDiff() {
  return (
    <section className="gp-diff-section">
      <div className="container">
        <div className="gp-diff-header">
          <h2 className="gp-diff-title">
            The <span className="gp-diff-highlight">Gold Point</span> Difference
          </h2>
          <p className="gp-diff-subtitle">
            We&apos;re not a jewellery shop or an unorganised buyer. We are a dedicated, ISO-certified gold buying company — built on science, not guesswork.
          </p>
          <div className="gp-diff-divider" />
        </div>

        <div className="gp-diff-grid">
          {CARDS.map((card) => (
            <div className="gp-diff-card" key={card.title}>
              <div className="gp-diff-card-pattern" />
              <div className="gp-diff-card-image-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.image} alt={card.alt} className="gp-diff-card-image" />
              </div>
              <span className="gp-diff-card-icon">{card.icon}</span>
              <h3 className="gp-diff-card-title">{card.title}</h3>
              <p className="gp-diff-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
