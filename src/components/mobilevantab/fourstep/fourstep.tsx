import React from 'react';
import './fourstep.css';

const STEPS = [
  {
    num: '01',
    title: 'Doorstep Service',
    desc: "India's first and only mobile gold buying van arrives at your chosen location for ultimate convenience.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17h1v-6l2-5h9v11h1" />
        <path d="M16 17h-8" />
        <path d="M6 6h6v6" />
        <path d="M16 10h3l2 3v4h-2" />
        <circle cx="7.5" cy="17.5" r="1.5" />
        <circle cx="17.5" cy="17.5" r="1.5" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Doorstep Service',
    desc: "India's first and only mobile gold buying van arrives at your chosen location for ultimate convenience.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="11" height="5" rx="1.5" />
        <line x1="6.5" y1="8" x2="6.5" y2="12" />
        <path d="M6.5 12h4a3 3 0 0 1 3 3v6" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Doorstep Service',
    desc: "India's first and only mobile gold buying van arrives at your chosen location for ultimate convenience.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 18h8" />
        <path d="M3 22h12" />
        <path d="M14 22a7 7 0 1 0 0-14h-1" />
        <path d="M9 14h3" />
        <path d="M9 12h4l-1-7h-2z" />
        <path d="M12 5h2" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Doorstep Service',
    desc: "India's first and only mobile gold buying van arrives at your chosen location for ultimate convenience.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="7" width="18" height="12" rx="2" />
        <path d="M3 7l3-4h12l3 4" />
        <circle cx="12" cy="13" r="2.5" />
      </svg>
    ),
  },
];

export default function FourStep() {
  return (
    <section className="fs-section">
      <div className="fs-bg-pattern" aria-hidden="true" />
      <div className="container">
        <div className="fs-header">
          <h2 className="fs-title">
            A Seamless <span className="fs-title-highlight">4-Step Journey</span>
          </h2>
          <p className="fs-subtitle">
            Our transparent process ensures you get the true value of your gold using scientific methods right in front of your eyes.
          </p>
        </div>

        <div className="fs-grid">
          {STEPS.map((step) => (
            <div className="fs-card" key={step.num}>
              <div className="fs-card-num">{step.num}</div>
              <div className="fs-card-icon">{step.icon}</div>
              <h3 className="fs-card-title">{step.title}</h3>
              <p className="fs-card-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
