import React from 'react';
import Image from 'next/image';
import './muthootblue.css';
import portraitImg from '@/assets/images/hm6-img01.png';

const STATS = [
  { num: '133+', label: 'Years of Legacy' },
  { num: '4,200+', label: 'Branches' },
  { num: '100k+', label: 'Daily Customers' },
  { num: '24,000+', label: 'Employees' },
];

export default function MuthootBlue() {
  return (
    <section className="muthoot-blue-section">
      <div className="container">
        <div className="blue-grid">
          {/* Left: Copy */}
          <div className="blue-text-side">
            <span className="blue-eyebrow">
              <span className="blue-eyebrow-icon" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
                </svg>
              </span>
              Parent Conglomerate
            </span>

            <h2 className="blue-title">
              About The <span className="gold-text">Muthoot Pappachan Group</span>
            </h2>

            <p className="blue-desc">
              Popularly known as <strong>Muthoot Blue</strong>, the group is built on the bedrock of Trust and shaped by the core values of Integrity, Collaboration, and Excellence. With its genesis in founder Shri Muthoot Pappachan&apos;s unwavering faith in love, respect, and duty towards humanity, it has evolved into a massive business conglomerate that places the well-being of the underserved masses of India at the very center of its purpose.
            </p>

            <ul className="blue-checklist">
              <li>
                <span className="blue-check-icon" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0c1835" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                Trusted and reliable since 1887
              </li>
              <li>
                <span className="blue-check-icon" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0c1835" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                Empowering millions of Indians to rise above their ordinariness
              </li>
            </ul>

            <a
              href="https://www.muthoot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="blue-cta-btn"
            >
              Visit muthoot.com
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>

          {/* Center: Portrait */}
          <div className="blue-media-side">
            <div className="blue-media-pattern" aria-hidden="true" />
            <Image
              src={portraitImg}
              alt="Representative of the Muthoot Pappachan Group"
              className="blue-portrait-img"
            />
          </div>

          {/* Right: Group Highlights */}
          <div className="blue-compare-side">
            <div className="blue-compare-heading">
              <span className="blue-compare-check" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0c1835" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <p>A Massive Business Conglomerate</p>
            </div>

            <div className="blue-compare-table">
              <div className="blue-compare-row blue-compare-row-header">
                <span>Muthoot Pappachan Group</span>
                <span>At a Glance</span>
              </div>

              {STATS.map((stat) => (
                <div className="blue-compare-row" key={stat.label}>
                  <span className="blue-compare-label">{stat.label}</span>
                  <span className="blue-compare-num">{stat.num}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
