'use client';

import React, { useState } from 'react';
import './gold_value_form.css';

export default function GoldValueForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    purity: '',
    weight: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up API submission
  };

  return (
    <section className="gvf-section" id="gold-value-form">
      <div className="gvf-pattern-band gvf-pattern-top" aria-hidden="true" />
      <div className="gvf-pattern-band gvf-pattern-bottom" aria-hidden="true" />
      <div className="container">
        <h2 className="gvf-heading">
          Estimate The Value Of <span className="gvf-heading-highlight">Your Gold</span>
        </h2>

        <div className="gvf-grid">
          {/* Left: Gold image with live rate badge */}
          <div className="gvf-image-col">
            <div className="gvf-image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bangle.png" alt="Gold bangles" className="gvf-image" />
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
                <span className="gvf-rupee">₹9,185</span>
                <span className="gvf-rate-unit">/g</span>
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
                  className="gvf-input"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="gvf-field">
                <label htmlFor="gvf-phone" className="gvf-label">Phone Number</label>
                <input
                  id="gvf-phone"
                  name="phone"
                  type="tel"
                  className="gvf-input"
                  placeholder="Enter your Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="gvf-field">
                <label htmlFor="gvf-purity" className="gvf-label">Enter Purity</label>
                <input
                  id="gvf-purity"
                  name="purity"
                  type="text"
                  className="gvf-input"
                  placeholder="Enter Purity"
                  value={formData.purity}
                  onChange={handleChange}
                />
              </div>

              <div className="gvf-field">
                <label htmlFor="gvf-weight" className="gvf-label">Weight In Grams</label>
                <input
                  id="gvf-weight"
                  name="weight"
                  type="number"
                  className="gvf-input"
                  placeholder="Quantity (in grams)"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="gvf-submit-btn">Check Rate</button>

              <p className="gvf-form-note">Final Value may vary based on physical verification</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
