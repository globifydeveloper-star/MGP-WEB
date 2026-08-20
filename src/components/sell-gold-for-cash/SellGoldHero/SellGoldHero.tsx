'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useOtpVerification } from '@/hooks/useOtpVerification';
import { useBranchMaster } from '@/hooks/useBranchMaster';
import { getUniqueStates, getCitiesByState } from '@/data/branchesData';
import './SellGoldHero.css';
import coupleImg from '@/assets/images/gs-hro.png';
import trustIcon from '@/assets/images/trusticon.png';
import lineImg from '@/assets/images/Line.png';
import coinImg from '@/assets/images/COIN.png';

export default function SellGoldHero() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    otp: '',
    state: '',
    city: '',
    consent: true
  });

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

  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    state: otpState,
    countdown: otpCountdown,
    errorMessage: otpErrorMessage,
    sendOtp,
    verifyOtp,
    resetOtpState
  } = useOtpVerification({ cooldownSeconds: 60 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: val,
      // Clear city if state changes
      ...(name === 'state' ? { city: '' } : {})
    }));
  };

  const handleGetOtp = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    await sendOtp(formData.phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.otp || !formData.state || !formData.city) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!formData.consent) {
      alert('You must authorize communication to submit.');
      return;
    }

    const success = await verifyOtp(formData.phone, formData.otp, {
      name: formData.name,
      state: formData.state,
      city: formData.city,
      consent: formData.consent,
      sourceForm: 'Sell Gold Hero Form',
      enquiryType: 'Enquire Now',
    });

    if (success) {
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        otp: '',
        state: '',
        city: '',
        consent: true
      });
      resetOtpState();
    }
  };

  return (
    <section className="sg-hero-root">
      {/* Background patterns/glows matching home design */}
      <div className="sg-hero-bg-overlay" aria-hidden="true" />
      <div className="sg-hero-glow-1" aria-hidden="true" />
      <div className="sg-hero-glow-2" aria-hidden="true" />

      <div className="container sg-hero-container">
        {/* Section 1: Photo */}
        <div className="sg-hero-visual">
          <Image
            src={coupleImg}
            alt="Muthoot Gold Point representative"
            className="sg-couple-photo"
            priority
          />
        </div>

        {/* Section 2: Content - Trust Badge, Heading, Bullets, We Buy Gold */}
        <div className="sg-hero-content">
          {/* Trust Badge */}
          <div className="sg-trust-badge">
            <div className="sg-trust-badge-header">
              <Image
                src={trustIcon}
                alt="Trust Icon"
                width={30}
                height={30}
                className="sg-trust-icon"
                priority
              />
              <span className="sg-trust-badge-text">
                Trusted by <span className="sg-gold-highlight">5 Lakh+ Customers</span> Across India
              </span>
            </div>
            <div className="sg-trust-badge-line-wrap">
              <Image
                src={lineImg}
                alt=""
                className="sg-trust-underline"
                priority
              />
            </div>
          </div>

          {/* Heading */}
          <div className="sg-title-row">
            <div className="sg-title-text-wrap">
              <h1 className="sg-hero-title">
                Sell Your Old Gold <br />
                <span className="gold-text">GET CASH INSTANTLY</span>
              </h1>
              <p className="sg-hero-subtitle">100% Fair & Precise Gold Buying</p>
            </div>
          </div>

          {/* Bullet Points */}
          <ul className="sg-hero-bullets">
            <li>
              <span className="sg-bullet-check">✓</span>
              <span>Free purity testing of your gold</span>
            </li>
            <li>
              <span className="sg-bullet-check">✓</span>
              <span>100% transparent process</span>
            </li>
            <li>
              <span className="sg-bullet-check">✓</span>
              <span>Free Ultrasonic cleaning of ornaments</span>
            </li>
          </ul>

          {/* "We Buy Gold" coins badge */}
          <div className="sg-we-buy-gold-container">
            <div className="sg-coin-pile-overlay">
              <Image
                src={coinImg}
                alt="Gold Coins"
                className="sg-coin-img-floating"
                width={95}
                height={75}
              />
            </div>
            <div className="sg-buy-gold-badge">
              <span className="sg-buy-gold-text">WE BUY GOLD</span>
            </div>
          </div>
        </div>

        {/* Section 3: Get In Touch Form */}
        <div className="sg-hero-right" id="sell-gold-form">
          <div className="sg-form-card glass-panel">
            {/* Animated Glowing border beam (aura/shine effect) */}
            <svg
              className="sg-gold-beam-svg"
              viewBox="0 0 380 560"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="sg-shine-gradient" x1="-100%" y1="-100%" x2="0%" y2="0%">
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
                width="378"
                height="558"
                rx="14"
                fill="none"
                stroke="url(#sg-shine-gradient)"
                className="sg-gold-beam-rect"
              />
            </svg>

            {isSubmitted ? (
              <div className="sg-form-success">
                <div className="sg-success-checkmark-circle">
                  <svg className="sg-success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="sg-success-checkmark-bg" cx="26" cy="26" r="25" fill="none" />
                    <path className="sg-success-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                  </svg>
                </div>
                <h3 className="sg-success-title">Thank You!</h3>
                <p className="sg-success-desc">
                  Your request has been received. Our team will get in touch with you shortly.
                </p>
                <button
                  type="button"
                  className="btn btn-primary sg-success-reset-btn"
                  onClick={() => setIsSubmitted(false)}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form className="sg-contact-form" onSubmit={handleSubmit}>
                <h2 className="sg-form-title">GET IN TOUCH</h2>
                <p className="sg-form-subtitle">
                  Fill in the form and our team will get back to you with various information of Muthoot Goldpoint.
                </p>

                {/* Name */}
                <div className="sg-form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name*"
                    className="sg-form-input"
                  />
                </div>

                {/* Email */}
                <div className="sg-form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email*"
                    className="sg-form-input"
                  />
                </div>

                {/* Mobile Number, OTP button & OTP input in one row */}
                <div className="sg-form-row sg-phone-otp-row">
                  <div className="sg-form-group sg-phone-input-wrapper">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Mobile Number*"
                      className="sg-form-input sg-phone-input"
                    />
                    <button
                      type="button"
                      className="sg-get-otp-btn"
                      onClick={handleGetOtp}
                      disabled={otpState === 'sending' || otpState === 'verifying' || otpCountdown > 0 || !/^\d{10}$/.test(formData.phone)}
                    >
                      {otpState === 'sending' ? '...' : otpCountdown > 0 ? `${otpCountdown}s` : 'GET OTP'}
                    </button>
                  </div>

                  <div className="sg-form-group sg-otp-group">
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      required
                      disabled={otpState === 'idle' || otpState === 'sending' || otpState === 'verifying'}
                      value={formData.otp}
                      onChange={handleInputChange}
                      placeholder="OTP*"
                      className="sg-form-input"
                    />
                  </div>
                </div>

                {/* State & City Selects */}
                <div className="sg-form-row">
                  <div className="sg-form-group sg-select-wrapper">
                    <select
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`sg-form-select ${!formData.state ? 'sg-placeholder-selected' : ''}`}
                    >
                      <option value="" disabled>Select State*</option>
                      {statesList.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <span className="sg-select-arrow" />
                  </div>

                  <div className="sg-form-group sg-select-wrapper">
                    <select
                      id="city"
                      name="city"
                      required
                      disabled={!formData.state}
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`sg-form-select ${!formData.city ? 'sg-placeholder-selected' : ''}`}
                    >
                      <option value="" disabled>
                        {formData.state ? 'Select City / Branch*' : 'Select City*'}
                      </option>
                      {availableCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <span className="sg-select-arrow" />
                  </div>
                </div>

                {/* Consent checkbox */}
                <div className="sg-consent-group">
                  <label className="sg-consent-label">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      className="sg-consent-checkbox"
                    />
                    <span className="sg-consent-text">
                      Authorize Muthoot Exim Pvt Ltd. & other Muthoot Pappachan Group companies (including its Agents/representatives) to call/communicate with me on their product offerings/ promotions through Telephone/Mobile/SMS/email ID.
                    </span>
                  </label>
                </div>

                {otpErrorMessage && (
                  <div className="otp-error-msg" role="alert" style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '-0.5rem', marginBottom: '0.5rem', padding: '0 0.25rem' }}>
                    {otpErrorMessage}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={
                    otpState === 'idle' ||
                    otpState === 'sending' ||
                    otpState === 'verifying' ||
                    !formData.name ||
                    !formData.email ||
                    !formData.phone ||
                    !formData.otp ||
                    !formData.state ||
                    !formData.city ||
                    !formData.consent
                  }
                  className="sg-submit-btn btn-primary"
                >
                  {otpState === 'verifying' ? (
                    <>
                      <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: '8px', verticalAlign: 'middle' }}></span>
                      SUBMITTING...
                    </>
                  ) : (
                    'SUBMIT ENQUIRY'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
