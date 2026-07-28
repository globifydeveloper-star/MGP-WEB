'use client';

import React from 'react';
import './SellGoldProcess.css';

const STEPS = [
  {
    number: '01',
    title: 'Walk-In or Van Visit',
    subtitle: 'Visit Branch / Mobile Van',
    desc: 'Bring your gold ornaments, coins, or pledged documents to any of our 11+ branches or request a mobile van service.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Free Ultrasonic Cleaning',
    subtitle: 'Remove Dirt & Grime',
    desc: 'Your gold is cleaned in specialized ultrasonic machines right before your eyes to remove accumulated dirt for precise weight.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'XRF Scientific Testing',
    subtitle: 'Purity & Decimal Weight',
    desc: 'Advanced XRF spectroscopic analyzer determines exact karat purity without melting or damaging your jewellery.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Live Market Rate',
    subtitle: 'Transparent Valuation',
    desc: 'Valuation is computed instantly using real-time market gold rates with zero hidden deductions or melting fees.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Instant Cash Payout',
    subtitle: 'Cash / Instant NEFT-IMPS',
    desc: 'Receive cash up to ₹10,000 immediately or instant bank transfer for higher amounts along with an official itemised invoice.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
        <line x1="12" y1="11" x2="12" y2="17"></line>
        <line x1="9" y1="14" x2="15" y2="14"></line>
      </svg>
    ),
  },
];

export default function SellGoldProcess() {
  return (
    <section className="sg-process-section">
      <div className="container">
        
        <div className="sg-process-header">
          <span className="sg-process-tag">SIMPLE & TRANSPARENT</span>
          <h2 className="sg-process-title">
            How It Works: <span className="sg-title-highlight">5 Easy Steps</span>
          </h2>
          <p className="sg-process-subtitle">
            Sell your gold in quick, transparent steps with 100% scientific precision and zero hidden charges.
          </p>
          <div className="sg-process-line" />
        </div>

        <div className="sg-process-grid">
          {STEPS.map((step, idx) => (
            <div key={step.number} className="sg-process-card">
              <div className="sg-card-top">
                <div className="sg-step-num">{step.number}</div>
                <div className="sg-step-icon">{step.icon}</div>
              </div>
              
              <h3 className="sg-card-title">{step.title}</h3>
              <div className="sg-card-subtitle">{step.subtitle}</div>
              <p className="sg-card-desc">{step.desc}</p>
              
              {idx < STEPS.length - 1 && (
                <div className="sg-step-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
