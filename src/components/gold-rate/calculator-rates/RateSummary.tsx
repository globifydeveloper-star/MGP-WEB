'use client';

import React from 'react';
import './RateSummary.css';
import { PURITY_ORDER } from '@/lib/goldRateData';
import { useLiveGoldRates } from '@/hooks/useLiveGoldRates';

const formatRupee = (value: number) => `₹${value.toLocaleString('en-IN')}`;

export default function RateSummary() {
  const { rates } = useLiveGoldRates();

  const summaryRows = PURITY_ORDER.map((key) => {
    const rate = rates[key];
    const yesterdayRate = rate.yesterdayRate ?? (rate.perGram - rate.changeAmount);
    return {
      key,
      label: `${rate.key} (${rate.purity})`,
      todayRate: rate.perGram,
      yesterdayRate,
      change: rate.changeAmount,
      changePercent: rate.changePercent,
      trend: rate.trend,
    };
  });

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
            {summaryRows.map((row) => (
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
        {summaryRows.map((row) => (
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

      <p className="grs-note">Rates shown are per gram. Live daily rates from Muthoot Exim.</p>
    </div>
  );
}
