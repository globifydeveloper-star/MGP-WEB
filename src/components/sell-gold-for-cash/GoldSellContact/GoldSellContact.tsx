'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useBranchMaster } from '@/hooks/useBranchMaster';
import { getUniqueStates, getCitiesByState } from '@/data/branchesData';
import './GoldSellContact.css';
import handHoldingGoldImg from '@/assets/images/gold_rate_component_photos/05-cta-hand-holding-gold.png';

export default function GoldSellContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    otp: '',
    state: '',
    city: '',
    consent: true,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { states: bmStates, locationsByState } = useBranchMaster();

  const statesList = useMemo(() => {
    return bmStates && bmStates.length > 0 ? bmStates : getUniqueStates();
  }, [bmStates]);

  const availableCities = useMemo(() => {
    if (!formData.state) return [];
    if (locationsByState[formData.state] && locationsByState[formData.state].length > 0) {
      return locationsByState[formData.state];
    }
    return getCitiesByState(formData.state);
  }, [formData.state, locationsByState]);

  // OTP Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: val,
      ...(name === 'state' ? { city: '' } : {}),
    }));
  };

  const handleGetOtp = () => {
    if (!formData.phone || formData.phone.length < 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    setOtpSent(true);
    setOtpCountdown(30);
    alert(`OTP sent successfully to +91 ${formData.phone} (Simulated)`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.otp || !formData.state || !formData.city) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!formData.consent) {
      alert('You must authorize communication to submit.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        otp: '',
        state: '',
        city: '',
        consent: true,
      });
      setOtpSent(false);
      setOtpCountdown(0);
    }, 1200);
  };

  return (
    <section className="grct-section">
      <div className="grct-bg">
        <Image
          src={handHoldingGoldImg}
          alt="Hand holding gold jewellery"
          className="grct-bg-img"
          fill
          sizes="100vw"
        />
        <div className="grct-bg-overlay" aria-hidden="true" />
      </div>

      <div className="grct-inner">
        <div className="grct-content">
          <h2 className="grct-title">
            Get in <span className="grct-title-gold">Touch</span>
          </h2>
          <p className="grct-desc">
            Have questions about your gold valuation? Our experts are here to help you through the entire process.
          </p>

          <div className="grct-info-row">
            <span className="grct-info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <a href="tel:04842351481">0484 2351481</a>
          </div>

          <div className="grct-info-row">
            <span className="grct-info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18v12H3z" />
                <path d="m3 6 9 7 9-7" />
              </svg>
            </span>
            <a href="mailto:info@muthootexim.com">info@muthootexim.com</a>
          </div>
        </div>

        <div className="grct-form-card">
          {isSubmitted ? (
            <div className="grct-success">
              <h3>Thank You!</h3>
              <p>Your enquiry has been received. Our team will get back to you shortly.</p>
              <button type="button" className="grct-submit-btn" onClick={() => setIsSubmitted(false)}>
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="grct-form-group">
                <input
                  type="text"
                  id="grct-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name*"
                  required
                />
              </div>

              {/* Email */}
              <div className="grct-form-group">
                <input
                  type="email"
                  id="grct-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email*"
                  required
                />
              </div>

              {/* Mobile Number & OTP */}
              <div className="grct-form-row grct-phone-otp-row">
                <div className="grct-form-group grct-phone-wrapper">
                  <input
                    type="tel"
                    id="grct-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Mobile Number*"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    required
                  />
                  <button
                    type="button"
                    className="grct-get-otp-btn"
                    onClick={handleGetOtp}
                    disabled={otpCountdown > 0}
                  >
                    {otpCountdown > 0 ? `${otpCountdown}s` : 'GET OTP'}
                  </button>
                </div>

                <div className="grct-form-group">
                  <input
                    type="text"
                    id="grct-otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="OTP*"
                    disabled={!otpSent}
                    required
                  />
                </div>
              </div>

              {/* State & City Selects */}
              <div className="grct-form-row">
                <div className="grct-form-group grct-select-wrap">
                  <select
                    id="grct-state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className={!formData.state ? 'grct-placeholder-selected' : ''}
                  >
                    <option value="" disabled>Select State*</option>
                    {statesList.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div className="grct-form-group grct-select-wrap">
                  <select
                    id="grct-city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!formData.state}
                    required
                    className={!formData.city ? 'grct-placeholder-selected' : ''}
                  >
                    <option value="" disabled>
                      {formData.state ? 'Select City / Branch*' : 'Select City*'}
                    </option>
                    {availableCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Authorization Consent */}
              <label className="grct-consent">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                />
                <span>
                  Authorize Muthoot Exim Pvt Ltd. & other Muthoot Pappachan Group companies (including its Agents/representatives) to call/communicate with me on their product offerings/ promotions through Telephone/Mobile/SMS/email ID.
                </span>
              </label>

              {/* Submit Button */}
              <button type="submit" className="grct-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT ENQUIRY'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
