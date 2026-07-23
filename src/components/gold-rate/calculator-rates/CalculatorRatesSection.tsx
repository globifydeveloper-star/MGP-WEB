'use client';

import React from 'react';
import './CalculatorRatesSection.css';
import GoldCalculator from './GoldCalculator';
import RateSummary from './RateSummary';
import RateTrends from './RateTrends';

export default function CalculatorRatesSection() {
  return (
    <section className="crs-section">
      <div className="container crs-grid">
        <div className="crs-calculator-col">
          <GoldCalculator />
        </div>
        <div className="crs-rates-col">
          <RateSummary />
          <RateTrends />
        </div>
      </div>
    </section>
  );
}
