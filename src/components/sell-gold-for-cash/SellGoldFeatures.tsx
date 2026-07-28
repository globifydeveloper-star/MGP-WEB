'use client';

import React from 'react';
import './SellGoldFeatures.css';

const FEATURES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
    title: '100% Safe & Secure',
    desc: 'CCTV monitored rooms where your gold stays in front of your eyes throughout the evaluation process.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    title: 'Quick 15-Min Process',
    desc: 'From ultrasonic cleaning to final bank transfer, complete evaluation takes less than 15 minutes.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13"></rect>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
        <circle cx="5.5" cy="18.5" r="2.5"></circle>
        <circle cx="18.5" cy="18.5" r="2.5"></circle>
      </svg>
    ),
    title: 'Doorstep Mobile Van',
    desc: 'Fully equipped mobile gold evaluation vans with live XRF machines available at your convenience (Mumbai & select cities).',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
      </svg>
    ),
    title: 'GST Itemized Invoice',
    desc: 'Transparent valuation receipt stating exact weight, purity karat, live market rate, and final payout calculation.',
  },
];

export default function SellGoldFeatures() {
  return (
    <section className="sg-feat-section">
      <div className="container">
        
        <div className="sg-feat-banner">
          <div className="sg-feat-left">
            <span className="sg-feat-tag">WHY MUTHOOT GOLD POINT</span>
            <h2 className="sg-feat-heading">
              Sell Your Gold & Get <span className="sg-title-highlight">Cash Instantly</span>
            </h2>
            <p className="sg-feat-desc">
              Muthoot Gold Point offers safe, transparent & scientifically tested ways of buying your Gold. 
              We give you an unparalleled experience of selling your old Gold for instant cash. Our branches 
              and mobile vans are equipped with state-of-the-art ultrasonic and German XRF machines to clean 
              your Gold for free and check its accurate weight & purity.
            </p>

            <div className="sg-feat-grid">
              {FEATURES.map((item, idx) => (
                <div key={idx} className="sg-feat-item">
                  <div className="sg-feat-icon">{item.icon}</div>
                  <div className="sg-feat-info">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sg-feat-right">
            <div className="sg-card-highlight">
              <div className="sg-ch-icon">🏆</div>
              <h3>11+ Branches Across India</h3>
              <p>State-of-the-art gold buying centers located in key metro cities across India.</p>
              <div className="sg-ch-divider" />
              <div className="sg-ch-stats">
                <div className="sg-stat-box">
                  <span className="sg-stat-num">0%</span>
                  <span className="sg-stat-lbl">Melting Loss Deductions</span>
                </div>
                <div className="sg-stat-box">
                  <span className="sg-stat-num">100%</span>
                  <span className="sg-stat-lbl">Customer Transparency</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
