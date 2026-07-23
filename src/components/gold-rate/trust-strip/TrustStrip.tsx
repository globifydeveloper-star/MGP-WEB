'use client';

import React from 'react';
import './TrustStrip.css';

const ITEMS = [
  {
    label: '100% Transparent Valuation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: 'Instant Cash Payment',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="13" rx="2" />
        <path d="M2 10h20" />
        <circle cx="16.5" cy="14.5" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'No Hidden Charges',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <line x1="8" y1="16" x2="16" y2="8" />
        <circle cx="9" cy="9" r="0.6" fill="currentColor" stroke="none" />
        <circle cx="15" cy="15" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Trusted by 1,00,000+ Customers',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function TrustStrip() {
  return (
    <section className="ts-section">
      <div className="container ts-grid">
        {ITEMS.map((item) => (
          <div className="ts-item" key={item.label}>
            <span className="ts-icon-circle">{item.icon}</span>
            <span className="ts-label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
