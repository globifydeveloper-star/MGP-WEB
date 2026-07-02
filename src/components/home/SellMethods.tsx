'use client';

import React from 'react';

const methods = [
  {
    id: 'branch',
    title: 'Branch Visit',
    desc: 'Walk into any of our secure, state-of-the-art Muthoot Goldpoint branches. Get your gold evaluated transparently using advanced XRF machines in front of you.',
    icon: (
      <svg className="method-card-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    badge: '4,200+ Locations'
  },
  {
    id: 'van',
    title: 'Mobile Gold Van',
    desc: 'Can’t visit us? Our high-security Mobile Gold Van comes directly to your doorstep. Fully equipped with valuation instruments and security systems.',
    icon: (
      <svg className="method-card-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h4m-6 0a1 1 0 01-1-1v-3h9" />
      </svg>
    ),
    badge: 'Safe & Convenient'
  },
  {
    id: 'pledged',
    title: 'Release Pledged Gold',
    desc: 'If your gold is pledged with a bank or financier, we help you pay off the loan amount, release the gold, evaluate it, and buy it, paying you the balance amount instantly.',
    icon: (
      <svg className="method-card-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    badge: 'Hassle-Free Release'
  }
];

export default function SellMethods() {
  return (
    <section className="section-root sell-methods-section" id="methods">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">How We Service You</span>
          <h2 className="section-title">
            Choose Your Preferred Way to <span className="gold-text">Sell Gold</span>
          </h2>
          <p className="section-desc">
            We provide multiple flexible channels designed for maximum convenience, complete safety, and complete transparency.
          </p>
        </div>

        {/* Methods Grid */}
        <div className="methods-grid">
          {methods.map((method) => (
            <div key={method.id} className="method-card glass-panel">
              <div className="method-card-header">
                <div className="method-icon-wrapper">
                  {method.icon}
                </div>
                <span className="method-badge">{method.badge}</span>
              </div>
              <h3 className="method-card-title">{method.title}</h3>
              <p className="method-card-desc">{method.desc}</p>
              <button className="btn btn-outline card-cta-btn">
                <span>Learn More</span>
                <svg className="btn-arrow" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
