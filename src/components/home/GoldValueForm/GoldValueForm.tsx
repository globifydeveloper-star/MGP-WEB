"use client";

import React, { useState, useEffect, useRef } from 'react';
import './GoldValueForm.css';
import LocationPopup from './LocationPopup';
import { useLiveGoldRates } from '@/hooks/useLiveGoldRates';
import { SHOW_GOLD_RATE_CARD } from '@/lib/featureFlags';
import { animate } from 'animejs';

interface GoldValueFormProps {
  sectionImage?: string;
  heading?: string;
  headingHighlight?: string;
  note?: string;
  isSideForm?: boolean;
  buttonLabel?: string;
}

export default function GoldValueForm({ sectionImage, heading, headingHighlight, note, isSideForm, buttonLabel }: GoldValueFormProps) {
  const { rates } = useLiveGoldRates();
  const rate24k = rates['24K']?.perGram || 7502;
  const [displayRate, setDisplayRate] = useState(rate24k);
  const prevRateRef = useRef(rate24k);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    purity: '',
    weight: ''
  });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    const target = rate24k;
    const start = prevRateRef.current === target ? Math.max(1000, Math.floor(target * 0.85)) : prevRateRef.current;
    
    const rateObj = { val: start };
    animate(rateObj, {
      val: target,
      round: 1,
      ease: 'outExpo',
      duration: 1800,
      onUpdate: () => {
        setDisplayRate(rateObj.val);
      },
    });

    prevRateRef.current = target;
  }, [rate24k]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (e.target.type === 'number' && Number(value) < 0) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.purity || !formData.weight) {
      alert('Please fill in all required fields.');
      return;
    }
    setIsLocationModalOpen(true);
  };

  const formContent = (
    <>
      <div className="container" style={isSideForm ? { padding: 0 } : {}}>
        <h2 className={isSideForm ? "gvf-heading-side" : "gvf-heading"} style={isSideForm ? { fontSize: '1.8rem', textAlign: 'left', marginBottom: '1rem', color: 'white' } : {}}>
          {heading || "Estimate The Value Of"}{' '}
          {headingHighlight && <span className="gvf-heading-highlight">{headingHighlight}</span>}
        </h2>

        <div className={`gvf-grid ${isSideForm ? 'gvf-grid-side' : ''}`} style={isSideForm ? { gridTemplateColumns: '1fr', gap: 0 } : {}}>
          {/* Left: Gold image with live rate badge */}
          {!isSideForm && (
            <div className={`gvf-image-col${SHOW_GOLD_RATE_CARD ? '' : ' gvf-image-col--no-badge'}`}>
            <div className="gvf-image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sectionImage || "/components/bangle.png"} alt="Gold bangles" className="gvf-image" />
            </div>

            {SHOW_GOLD_RATE_CARD && (
              <div className="gvf-rate-badge">
                <div className="gvf-rate-badge-header">
                  <span className="gvf-rate-badge-title">Today&apos;s Gold Rate</span>
                  <span className="gvf-live-pill">
                    <span className="gvf-live-dot" />
                    Live
                  </span>
                </div>
                <div className="gvf-rate-purity">24K ({rates['24K']?.purity || '999'})</div>
                <div className="gvf-rate-value">
                  <span className="gvf-rupee">₹{displayRate.toLocaleString('en-IN')}</span>
                  <span className="gvf-rate-unit">/g</span>
                </div>
              </div>
            )}
            </div>
          )}

          {/* Right: Estimate form */}
          <div className="gvf-form-col" style={isSideForm ? { padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' } : {}}>
            <form className={`gvf-form ${isSideForm ? 'gvf-side-form' : ''}`} onSubmit={handleSubmit}>
              {/* Animated Glowing border beam */}
              {!isSideForm && (
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
              )}

              <div className="gvf-field">
                <label htmlFor="gvf-name" className="gvf-label" style={isSideForm ? { color: '#fff' } : {}}>Name<span className="gvf-required">*</span></label>
                <input
                  id="gvf-name"
                  name="name"
                  type="text"
                  className="gvf-input"
                  style={isSideForm ? { background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' } : {}}
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="gvf-field">
                <label htmlFor="gvf-phone" className="gvf-label" style={isSideForm ? { color: '#fff' } : {}}>Phone Number</label>
                <input
                  id="gvf-phone"
                  name="phone"
                  type="tel"
                  className="gvf-input"
                  style={isSideForm ? { background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' } : {}}
                  placeholder="Enter your Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="gvf-field">
                <label htmlFor="gvf-purity" className="gvf-label" style={isSideForm ? { color: '#fff' } : {}}>Enter Purity</label>
                <input
                  id="gvf-purity"
                  name="purity"
                  type="text"
                  className="gvf-input"
                  style={isSideForm ? { background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' } : {}}
                  placeholder="Enter Purity"
                  value={formData.purity}
                  onChange={handleChange}
                />
              </div>

              <div className="gvf-field">
                <label htmlFor="gvf-weight" className="gvf-label" style={isSideForm ? { color: '#fff' } : {}}>Weight In Grams</label>
                <input
                  id="gvf-weight"
                  name="weight"
                  type="number"
                  min="0"
                  step="0.01"
                  className="gvf-input"
                  style={isSideForm ? { background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' } : {}}
                  placeholder="Quantity (in grams)"
                  value={formData.weight}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === '-') {
                      e.preventDefault();
                    }
                  }}
                />
              </div>

              <button type="submit" className="gvf-submit-btn">{buttonLabel || "Check Rate"}</button>

              <p className="gvf-form-note" style={isSideForm ? { color: 'rgba(255,255,255,0.7)' } : {}}>{note || "Final Value may vary based on physical verification"}</p>
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
            purity: '',
            weight: ''
          });
        }}
      />
    </>
  );

  if (isSideForm) {
    return formContent;
  }

  return (
    <section className="gvf-section" id="gold-value-form">
      <div className="gvf-pattern-band gvf-pattern-top" aria-hidden="true" />
      <div className="gvf-pattern-band gvf-pattern-bottom" aria-hidden="true" />
      {formContent}
    </section>
  );
}
