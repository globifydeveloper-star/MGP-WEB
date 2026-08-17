'use client';

import React, { useMemo, useRef, useState } from 'react';
import './GoldCalculator.css';
import { PURITY_ORDER, PurityKey } from '@/lib/goldRateData';
import { calculateGoldValue } from '@/lib/calculateGoldValue';
import { useLiveGoldRates } from '@/hooks/useLiveGoldRates';

export default function GoldCalculator() {
  const { rates } = useLiveGoldRates();
  const [purity, setPurity] = useState<PurityKey>('24K');
  const [weight, setWeight] = useState('10');
  const [makingCharges, setMakingCharges] = useState('');
  const [deductions, setDeductions] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);

  const rate = rates[purity] || rates['24K'];

  const result = useMemo(
    () =>
      calculateGoldValue({
        ratePerGram: rate.perGram,
        weightInGrams: parseFloat(weight) || 0,
        makingChargesPerGram: parseFloat(makingCharges) || 0,
        otherDeductions: parseFloat(deductions) || 0,
      }),
    [rate.perGram, weight, makingCharges, deductions]
  );

  const formatRupee = (value: number) =>
    `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

  const handleCalculateClick = () => {
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <div className="gc-panel" id="gold-calculator">
      <div className="gc-col gc-col-inputs">
        <h2 className="gc-title">Calculate Gold Value</h2>

        <div className="gc-field">
          <label className="gc-label">1. Select Purity</label>
          <div className="gc-purity-buttons">
            {PURITY_ORDER.map((key) => (
              <button
                key={key}
                type="button"
                className={`gc-purity-btn ${purity === key ? 'gc-purity-btn-active' : ''}`}
                onClick={() => setPurity(key)}
              >
                {key} ({rates[key]?.purity || '999'})
              </button>
            ))}
          </div>
        </div>

        <div className="gc-field">
          <label className="gc-label" htmlFor="gc-weight">2. Enter Weight</label>
          <div className="gc-input-wrap">
            <input
              id="gc-weight"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              className="gc-input"
              placeholder="Enter weight in grams"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <span className="gc-input-suffix">grams</span>
          </div>
        </div>

        <div className="gc-field">
          <label className="gc-label" htmlFor="gc-making">3. Making Charges (Optional)</label>
          <div className="gc-input-wrap">
            <span className="gc-input-prefix">₹ /gram</span>
            <input
              id="gc-making"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              className="gc-input"
              placeholder="Enter making charges per gram"
              value={makingCharges}
              onChange={(e) => setMakingCharges(e.target.value)}
            />
          </div>
        </div>

        <div className="gc-field">
          <label className="gc-label" htmlFor="gc-deductions">4. Other Deductions (Optional)</label>
          <div className="gc-input-wrap">
            <span className="gc-input-prefix">₹</span>
            <input
              id="gc-deductions"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              className="gc-input"
              placeholder="Enter other deductions"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
            />
          </div>
        </div>

        <button type="button" className="btn btn-primary gc-calculate-btn" onClick={handleCalculateClick}>
          Calculate Value
        </button>
      </div>

      <div className="gc-col gc-col-result" ref={resultRef}>
        <h3 className="gc-result-title">Estimated Gold Value</h3>

        <div className="gc-result-rows">
          <div className="gc-result-row">
            <span>Purity Selected</span>
            <span>{purity} ({rate.purity})</span>
          </div>
          <div className="gc-result-row">
            <span>Gold Rate Per Gram</span>
            <span>{formatRupee(rate.perGram)}</span>
          </div>
          <div className="gc-result-row">
            <span>Weight</span>
            <span>{parseFloat(weight) || 0} g</span>
          </div>
          <div className="gc-result-row">
            <span>Making Charges</span>
            <span>{formatRupee(result.makingCharges)}</span>
          </div>
          <div className="gc-result-row">
            <span>Other Deductions</span>
            <span>-{formatRupee(result.otherDeductions)}</span>
          </div>
        </div>

        <div className="gc-result-total">
          <span>Total Value (Approx.)</span>
          <span className="gc-result-total-value">{formatRupee(result.totalValue)}</span>
        </div>

        <p className="gc-disclaimer">
          *Final valuation may vary based on purity verification, applicable deductions, and the final assessment at our branch.
        </p>
      </div>
    </div>
  );
}
