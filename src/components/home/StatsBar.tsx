'use client';

import React from 'react';

export default function StatsBar() {
  return (
    <div className="stats-bar-ribbon">
      <div className="container stats-container">
        
        {/* Stat Item 1 */}
        <div className="stat-item">
          <div className="stat-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="stat-icon">
              {/* Map/branches network */}
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <circle cx="5" cy="5" r="2" />
              <circle cx="19" cy="5" r="2" />
              <circle cx="5" cy="19" r="2" />
              <circle cx="19" cy="19" r="2" />
              <line x1="6.4" y1="6.4" x2="10.6" y2="10.6" />
              <line x1="17.6" y1="6.4" x2="13.4" y2="10.6" />
              <line x1="6.4" y1="17.6" x2="10.6" y2="13.4" />
              <line x1="17.6" y1="17.6" x2="13.4" y2="13.4" />
            </svg>
          </div>
          <div className="stat-info">
            <h4 className="stat-value">4,200</h4>
            <p className="stat-label">Branches across India</p>
          </div>
        </div>

        {/* Stat Item 2 */}
        <div className="stat-item">
          <div className="stat-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-icon">
              {/* Laurel Wreath / Heritage */}
              <path d="M6 3a9 9 0 0 0 9 9M18 3a9 9 0 0 1-9 9" />
              <path d="M4 8a12 12 0 0 0 12 12M20 8a12 12 0 0 1-12 12" />
              <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" fill="currentColor" scale="0.5" transform="translate(4,4) scale(0.66)"/>
            </svg>
          </div>
          <div className="stat-info">
            <h4 className="stat-value">133+</h4>
            <p className="stat-label">Years of legacy</p>
          </div>
        </div>

        {/* Stat Item 3 */}
        <div className="stat-item">
          <div className="stat-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-icon">
              {/* Employees / Group */}
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="stat-info">
            <h4 className="stat-value">24,000</h4>
            <p className="stat-label">Employees serving millions of customers</p>
          </div>
        </div>

        {/* Stat Item 4 */}
        <div className="stat-item">
          <div className="stat-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-icon">
              {/* Trust/Handshake */}
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8" cy="7" r="4" />
              <path d="M22 9l-6 6-4-4" />
            </svg>
          </div>
          <div className="stat-info">
            <h4 className="stat-value">1,00,000</h4>
            <p className="stat-label">Customers per day</p>
          </div>
        </div>

      </div>
    </div>
  );
}
