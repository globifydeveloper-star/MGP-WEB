'use client';

import React from 'react';
import Image from 'next/image';
import './GoldSellLegacy.css';
import muthootLogo from '@/assets/images/muthootlogo.png';
import portraitImg from '@/assets/images/mg2.png';

const STATS = [
  {
    label: 'Branches across India',
    value: '4,200',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2.2" />
        <circle cx="5" cy="19" r="2.2" />
        <circle cx="19" cy="19" r="2.2" />
        <path d="M12 7.2V12" />
        <path d="M6.6 17.3 10.5 13" />
        <path d="M17.4 17.3 13.5 13" />
      </svg>
    ),
  },
  {
    label: 'Years of legacy',
    value: '133+',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 8.5 7.5 12 13l3.5-5.5L12 2z" />
        <path d="M6 22l2-8 4 3 4-3 2 8" />
      </svg>
    ),
  },
  {
    label: 'Employees serving millions of customer',
    value: '24,000',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="3" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
        <circle cx="17.5" cy="8.5" r="2.3" />
        <path d="M15.5 13.5a5.2 5.2 0 0 1 6 6.5" />
      </svg>
    ),
  },
  {
    label: 'Customers per day',
    value: '1,00,000',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 13 8 10l-5 5 3 3z" />
        <path d="M13 11l3-3 5 5-3 3z" />
        <path d="M8 10l2.5-2.5a2 2 0 0 1 2.8 0L16 10" />
        <path d="M9 14l2 2" />
        <path d="M11 12l2 2" />
      </svg>
    ),
  },
];

export default function GoldSellLegacy() {
  return (
    <section className="gsl-section">
      {/* Navy content banner */}
      <div className="gsl-banner">
        <div className="gsl-bg-pattern" aria-hidden="true" />

        <div className="container gsl-banner-inner">
          <div className="gsl-content">
            <Image src={muthootLogo} alt="Muthoot Pappachan Group - Blue is Belief" className="gsl-logo" width={180} height={133} />

            <h2 className="gsl-title">
              We are part of <span className="gold-text">Muthoot Blue</span>
            </h2>

            <p className="gsl-desc">
              The Muthoot Pappachan Group, with a reputation that has been shaped over decades with high quality practices, total customer satisfaction and steady growth, spanning decades in the field of business, is a legacy built on God-given values of trust, truth, transparency and tradition and has become one of the top business houses today by the grace of God.
            </p>
          </div>

          <div className="gsl-portrait">
            <div className="gsl-portrait-frame">
              <Image
                src={portraitImg}
                alt="Representative of the Muthoot Pappachan Group"
                className="gsl-portrait-img"
                fill
                sizes="(max-width: 1024px) 260px, 300px"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gold stats strip */}
      <div className="gsl-stats-strip">
        <div className="container gsl-stats-inner">
          {STATS.map((stat) => (
            <div className="gsl-stat" key={stat.label}>
              <span className="gsl-stat-icon">{stat.icon}</span>
              <div>
                <p className="gsl-stat-value">{stat.value}</p>
                <p className="gsl-stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
