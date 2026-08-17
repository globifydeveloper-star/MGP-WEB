"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './GoldValueForm.css';
import LocationPopup from './LocationPopup';

interface GoldValueFormProps {
  sectionImage?: string;
  heading?: string;
  headingHighlight?: string;
  note?: string;
}

interface PurityOption {
  label: string;
  karat: string;
  fineness: string;
  purityPerc: number;
}

const PURITY_OPTIONS: PurityOption[] = [
  { label: '24K (999)', karat: '24K', fineness: '999', purityPerc: 99 },
  { label: '22K (916)', karat: '22K', fineness: '916', purityPerc: 91.6 },
  { label: '18K (750)', karat: '18K', fineness: '750', purityPerc: 75 },
];

interface QuoteData {
  purchasePrice: number;
  preGstAmount: number;
  gstAmount: number;
  totalQuoteAmt: number;
}

export default function GoldValueForm({ sectionImage, heading, headingHighlight, note }: GoldValueFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    purity: '24K (999)',
    weight: '',
  });

  const [selectedPurity, setSelectedPurity] = useState<PurityOption>(PURITY_OPTIONS[0]);
  const [liveTodayRate, setLiveTodayRate] = useState<{ price: number | null; loading: boolean; error: boolean }>({
    price: null,
    loading: true,
    error: false,
  });

  const [quoteState, setQuoteState] = useState<{
    data: QuoteData | null;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: false,
    error: null,
  });

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Fetch live 24K baseline rate on mount for the badge
  useEffect(() => {
    let isMounted = true;
    const fetchLiveBaselineRate = async () => {
      try {
        const res = await fetch('/api/gold-quote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ weightInGms: 1, purityPerc: 99 }),
        });
        const json = await res.json();
        if (isMounted) {
          if (json.success && json.respData) {
            const price = Number(json.respData.purchasePrice || json.respData.totalQuoteAmt);
            setLiveTodayRate({ price, loading: false, error: false });
          } else {
            setLiveTodayRate({ price: null, loading: false, error: true });
          }
        }
      } catch {
        if (isMounted) {
          setLiveTodayRate({ price: null, loading: false, error: true });
        }
      }
    };

    fetchLiveBaselineRate();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Debounced quote calculation when weight or purity changes
  const executeQuoteCalculation = useCallback(async (weightVal: string, purityPercVal: number) => {
    const numericWeight = parseFloat(weightVal);
    if (!numericWeight || numericWeight <= 0) {
      setQuoteState({ data: null, loading: false, error: null });
      return;
    }

    setQuoteState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const res = await fetch('/api/gold-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weightInGms: numericWeight,
          purityPerc: purityPercVal,
        }),
      });

      const json = await res.json();
      if (json.success && json.respData) {
        setQuoteState({
          data: {
            purchasePrice: Number(json.respData.purchasePrice) || 0,
            preGstAmount: Number(json.respData.preGstAmount) || 0,
            gstAmount: Number(json.respData.gstAmount) || 0,
            totalQuoteAmt: Number(json.respData.totalQuoteAmt) || 0,
          },
          loading: false,
          error: null,
        });
      } else {
        setQuoteState({
          data: null,
          loading: false,
          error: json.message || 'Rate temporarily unavailable — please try again',
        });
      }
    } catch {
      setQuoteState({
        data: null,
        loading: false,
        error: 'Rate temporarily unavailable — please try again',
      });
    }
  }, []);

  const handlePurityChange = (option: PurityOption) => {
    setSelectedPurity(option);
    setFormData((prev) => ({ ...prev, purity: option.label }));

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      executeQuoteCalculation(formData.weight, option.purityPerc);
    }, 500);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, weight: val }));

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      executeQuoteCalculation(val, selectedPurity.purityPerc);
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.purity || !formData.weight) {
      alert('Please fill in all required fields.');
      return;
    }
    // Option A: Open LocationPopup to submit the valuation lead to Strapi
    setIsLocationModalOpen(true);
  };

  return (
    <section className="gvf-section" id="gold-value-form">
      <div className="gvf-pattern-band gvf-pattern-top" aria-hidden="true" />
      <div className="gvf-pattern-band gvf-pattern-bottom" aria-hidden="true" />
      <div className="container">
        <h2 className="gvf-heading">
          {heading || "Estimate The Value Of"}{' '}
          <span className="gvf-heading-highlight">{headingHighlight || "Your Gold"}</span>
        </h2>

        <div className="gvf-grid">
          {/* Left: Gold image with live rate badge */}
          <div className="gvf-image-col">
            <div className="gvf-image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sectionImage || "/bangle.png"} alt="Gold bangles" className="gvf-image" />
            </div>

            <div className="gvf-rate-badge">
              <div className="gvf-rate-badge-header">
                <span className="gvf-rate-badge-title">Today&apos;s Gold Rate</span>
                <span className="gvf-live-pill">
                  <span className="gvf-live-dot" />
                  Live
                </span>
              </div>
              <div className="gvf-rate-purity">24K (999)</div>
              <div className="gvf-rate-value">
                {liveTodayRate.loading ? (
                  <span className="gvf-rate-loading-text">Loading rate...</span>
                ) : liveTodayRate.error || liveTodayRate.price === null ? (
                  <span className="gvf-rate-error-text">Rate unavailable</span>
                ) : (
                  <>
                    <span className="gvf-rupee">
                      ₹{liveTodayRate.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                    <span className="gvf-rate-unit">/g</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: Estimate form */}
          <div className="gvf-form-col">
            <form className="gvf-form" onSubmit={handleSubmit}>
              {/* Animated Glowing border beam (aura/shine effect) */}
              <svg
                className="gvf-gold-beam-svg"
                viewBox="0 0 430 520"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="gvf-shine-gradient" x1="-100%" y1="-100%" x2="0%" y2="0%">
                    <animate attributeName="x1" from="-100%" to="200%" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="y1" from="-100%" to="200%" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="x2" from="0%" to="300%" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="y2" from="0%" to="300%" dur="4s" repeatCount="indefinite" />

                    <stop offset="0%" stopColor="#EBAF20" stopOpacity="0" />
                    <stop offset="40%" stopColor="#EBAF20" stopOpacity="0" />
                    <stop offset="50%" stopColor="#FFD778" stopOpacity="1" />
                    <stop offset="60%" stopColor="#EBAF20" stopOpacity="0" />
                    <stop offset="100%" stopColor="#EBAF20" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <rect
                  x="1"
                  y="1"
                  width="428"
                  height="518"
                  rx="20"
                  fill="none"
                  stroke="url(#gvf-shine-gradient)"
                  className="gvf-gold-beam-rect"
                />
              </svg>

              <div className="gvf-field">
                <label htmlFor="gvf-name" className="gvf-label">Name<span className="gvf-required">*</span></label>
                <input
                  id="gvf-name"
                  name="name"
                  type="text"
                  required
                  className="gvf-input"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="gvf-field">
                <label htmlFor="gvf-phone" className="gvf-label">Phone Number<span className="gvf-required">*</span></label>
                <input
                  id="gvf-phone"
                  name="phone"
                  type="tel"
                  required
                  className="gvf-input"
                  placeholder="Enter your Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="gvf-field">
                <label className="gvf-label">Select Purity<span className="gvf-required">*</span></label>
                <div className="gvf-purity-presets" role="radiogroup" aria-label="Select Purity">
                  {PURITY_OPTIONS.map((opt) => (
                    <button
                      key={opt.karat}
                      type="button"
                      className={`gvf-purity-chip ${selectedPurity.karat === opt.karat ? 'gvf-purity-chip-active' : ''}`}
                      onClick={() => handlePurityChange(opt)}
                    >
                      <span className="gvf-purity-chip-karat">{opt.karat}</span>
                      <span className="gvf-purity-chip-fineness">({opt.fineness})</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="gvf-field">
                <label htmlFor="gvf-weight" className="gvf-label">Weight In Grams<span className="gvf-required">*</span></label>
                <input
                  id="gvf-weight"
                  name="weight"
                  type="number"
                  min="0.1"
                  step="any"
                  required
                  className="gvf-input"
                  placeholder="Quantity (in grams)"
                  value={formData.weight}
                  onChange={handleWeightChange}
                />
              </div>

              {/* Inline Live Quote Calculation Status / Result */}
              {quoteState.loading && (
                <div className="gvf-quote-status gvf-quote-status-loading">
                  <span className="gvf-quote-spinner" />
                  <span>Fetching live quote...</span>
                </div>
              )}

              {!quoteState.loading && quoteState.error && (
                <div className="gvf-quote-status gvf-quote-status-error">
                  <span>{quoteState.error}</span>
                </div>
              )}

              {!quoteState.loading && !quoteState.error && quoteState.data && (
                <div className="gvf-quote-card">
                  <div className="gvf-quote-card-header">
                    <span className="gvf-quote-card-title">Live Valuation Quote</span>
                    <span className="gvf-quote-card-badge">Live API</span>
                  </div>
                  <div className="gvf-quote-card-amount">
                    ₹{quoteState.data.totalQuoteAmt.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </div>
                  <div className="gvf-quote-card-details">
                    <span>Base Rate: ₹{quoteState.data.purchasePrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}/g</span>
                    {quoteState.data.gstAmount > 0 && (
                      <span>GST: ₹{quoteState.data.gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    )}
                  </div>
                </div>
              )}

              <button type="submit" className="gvf-submit-btn">Check Rate</button>

              <p className="gvf-form-note">{note || "Final Value may vary based on physical verification"}</p>
            </form>
          </div>
        </div>
      </div>
      <LocationPopup
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        clientData={formData}
        onSuccess={() => {
          setFormData({
            name: '',
            phone: '',
            purity: '24K (999)',
            weight: '',
          });
          setQuoteState({ data: null, loading: false, error: null });
        }}
      />
    </section>
  );
}
