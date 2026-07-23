'use client';

import React from 'react';
import './RateSummary.css';
import { GOLD_RATE_SUMMARY } from '@/lib/goldRateData';

const formatRupee = (value: number) => `₹${value.toLocaleString('en-IN')}`;

export default function RateSummary() {
  return (
    <div className="grs-panel">
      <h2 className="grs-title">Today&apos;s Gold Rate Summary</h2>

      {/* Desktop / tablet table */}
      <div className="grs-table-wrap">
        <table className="grs-table">
          <thead>
            <tr>
              <th>Purity</th>
              <th>Today&apos;s Rate</th>
              <th>Yesterday&apos;s Rate</th>
              <th>Change</th>
              <th>Change %</th>
            </tr>
          </thead>
          <tbody>
            {GOLD_RATE_SUMMARY.map((row) => (
              <tr key={row.key}>
                <td className="grs-td-purity">{row.label}</td>
                <td>{formatRupee(row.todayRate)}</td>
                <td>{formatRupee(row.yesterdayRate)}</td>
                <td className={`grs-trend-${row.trend}`}>
                  {row.trend === 'up' ? '▲' : '▼'} {formatRupee(row.change)}
                </td>
                <td className={`grs-trend-${row.trend}`}>
                  {row.trend === 'up' ? '▲' : '▼'} {row.changePercent.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="grs-mobile-cards">
        {GOLD_RATE_SUMMARY.map((row) => (
          <div className="grs-mobile-card" key={row.key}>
            <div className="grs-mobile-card-header">
              <span className="grs-mobile-card-purity">{row.label}</span>
              <span className={`grs-trend-${row.trend}`}>
                {row.trend === 'up' ? '▲' : '▼'} {row.changePercent.toFixed(2)}%
              </span>
            </div>
            <div className="grs-mobile-card-row">
              <span>Today&apos;s Rate</span>
              <span>{formatRupee(row.todayRate)}</span>
            </div>
            <div className="grs-mobile-card-row">
              <span>Yesterday&apos;s Rate</span>
              <span>{formatRupee(row.yesterdayRate)}</span>
            </div>
            <div className="grs-mobile-card-row">
              <span>Change</span>
              <span className={`grs-trend-${row.trend}`}>
                {row.trend === 'up' ? '▲' : '▼'} {formatRupee(row.change)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="grs-note">Rates shown are per gram. Demo data for illustration.</p>
    </div>
  );
}
