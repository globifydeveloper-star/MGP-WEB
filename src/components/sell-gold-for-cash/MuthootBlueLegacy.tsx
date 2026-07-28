'use client';

import React from 'react';
import './MuthootBlueLegacy.css';

const STATS = [
  {
    number: '4,200+',
    title: 'Branches Nationwide',
    desc: 'Across India serving urban & rural communities',
  },
  {
    number: '132+',
    title: 'Years of Legacy',
    desc: 'Built on trust, truth, transparency & tradition',
  },
  {
    number: '24,000+',
    title: 'Dedicated Staff',
    desc: 'Employees serving millions of happy customers',
  },
  {
    number: '1,00,000+',
    title: 'Daily Walk-Ins',
    desc: 'Customers trusting Muthoot Pappachan Group daily',
  },
];

export default function MuthootBlueLegacy() {
  return (
    <section className="sg-blue-section">
      <div className="container">
        
        <div className="sg-blue-card">
          <div className="sg-blue-header">
            <div className="sg-blue-badge">MUTHOOT PAPPACHAN GROUP</div>
            <h2 className="sg-blue-title">
              Part of the <span className="sg-title-highlight">Muthoot Blue</span> Legacy
            </h2>
            <p className="sg-blue-desc">
              The Muthoot Pappachan Group, with a reputation shaped over 132+ years of high-quality business practices, total customer satisfaction and steady growth, is built on values of trust, truth, transparency, and tradition.
            </p>
          </div>

          <div className="sg-blue-stats-grid">
            {STATS.map((stat, idx) => (
              <div key={idx} className="sg-blue-stat-card">
                <div className="sg-blue-stat-num">{stat.number}</div>
                <h4 className="sg-blue-stat-title">{stat.title}</h4>
                <p className="sg-blue-stat-desc">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
