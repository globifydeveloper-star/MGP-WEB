import React from 'react';
import './testingcards.css';

const CARDS = [
  {
    title: 'No-Damage Testing',
    desc: 'Our XRF spectrometer determines gold purity without any touchstone scraping or melting of your precious jewelry.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'XRF Purity Testing',
    desc: 'We utilize advanced ultrasonic technology to ensure every piece is perfectly clean for 100% fair weight calculation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 2h6" />
        <path d="M10 2v6.3a2 2 0 0 1-.4 1.2L5.3 15.6A2 2 0 0 0 6.9 19h10.2a2 2 0 0 0 1.6-3.4l-4.3-5.1a2 2 0 0 1-.4-1.2V2" />
        <path d="M6.5 14.5h11" />
      </svg>
    ),
  },
  {
    title: 'Digital Invoicing',
    desc: 'Receive a complete breakdown and official invoice for every transaction, maintaining the highest corporate standards.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h8" />
        <path d="M8 9h3" />
      </svg>
    ),
  },
];

export default function TestingCards() {
  return (
    <section className="tc-section">
      <div className="container">
        <div className="tc-grid">
          <div className="tc-cards-col">
            {CARDS.map((card) => (
              <div className="tc-card" key={card.title}>
                <div className="tc-card-header">
                  <span className="tc-card-icon">{card.icon}</span>
                  <h3 className="tc-card-title">{card.title}</h3>
                </div>
                <p className="tc-card-desc">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="tc-image-col">
            <div className="tc-image-glow" aria-hidden="true" />
            <div className="tc-image-box">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/test.png" alt="Lab technician performing XRF gold purity testing" className="tc-image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
