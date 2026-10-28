import React from 'react';
import './statsstrip.css';

const STATS = [
  { value: '1M+', label: 'Happy Customers' },
  { value: '4.8/5', label: 'Average Rating' },
  { value: '133+', label: 'Years of Legacy' },
  { value: '100%', label: 'Transparent Valuation' },
];

interface StatsStripProps {
  stats?: { id?: number; number: string; label: string }[];
}

export default function StatsStrip({ stats }: StatsStripProps) {
  const displayStats = stats && stats.length > 0
    ? stats.map((s) => ({ value: s.number, label: s.label }))
    : STATS;

  return (
    <section className="testimonials-stats-section">
      <div className="container">
        <div className="testimonials-stats-grid">
          {displayStats.map((stat) => (
            <div className="testimonials-stat-item" key={stat.label}>
              <span className="testimonials-stat-value">{stat.value}</span>
              <span className="testimonials-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
