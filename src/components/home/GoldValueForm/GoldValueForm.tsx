"use client";

import React, { useState, useEffect, useRef } from 'react';
import './GoldValueForm.css';
import { useLiveGoldRates } from '@/hooks/useLiveGoldRates';
import { useOtpVerification } from '@/hooks/useOtpVerification';
import { SHOW_GOLD_RATE_CARD } from '@/lib/featureFlags';
import { animate } from 'animejs';
import LocationPopup from './LocationPopup';

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
  const [otp, setOtp] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { state: otpState, countdown, errorMessage: otpErrorMessage, sendOtp, verifyOtp, resetOtpState } = useOtpVerification({ cooldownSeconds: 60 });
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
    if (name === 'phone') {
      const val = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: val }));
      return;
    }
    if (e.target.type === 'number' && Number(value) < 0) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetOtp = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    await sendOtp(formData.phone, companyWebsite);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.weight || !otp) {
      alert('Please fill in all required fields including OTP.');
      return;
    }
    if (!isAuthorized) {
      alert('Please agree to the authorization terms to submit the form.');
      return;
    }

    const success = await verifyOtp(formData.phone, otp, {
      name: formData.name,
      enquiryType: 'Check Value',
      sourceForm: 'Gold Value Form',
      consent: isAuthorized,
      message: `Weight: ${formData.weight}g`
    });

    if (success) {
      setIsLocationModalOpen(true);
    } else {
      alert(otpErrorMessage || 'Incorrect or expired OTP. Please try again.');
    }
  };

  const formContent = (
    <>
      <div className={isSideForm ? "gvf-side-container" : "container"}>
        <h2 className={isSideForm ? "gvf-heading-side" : "gvf-heading"}>
          {heading || "Estimate The Value Of"}{' '}
          {headingHighlight && <span className="gvf-heading-highlight">{headingHighlight}</span>}
        </h2>

        <div className={`gvf-grid ${isSideForm ? 'gvf-grid-side' : ''}`}>
          {/* Left: Gold image with live rate badge */}
          {!isSideForm && (
            <div className={`gvf-image-col${SHOW_GOLD_RATE_CARD ? '' : ' gvf-image-col--no-badge'}`}>
            <div className="gvf-image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sectionImage || "/images/home/value-gold-bg.jpg"} alt="Gold bangles" className="gvf-image" />
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
          <div className={`gvf-form-col ${isSideForm ? 'gvf-side-form-col' : ''}`}>
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

              <div className="gvf-field gvf-honeypot-field">
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                  className="gvf-honeypot-input"
                />
                <label htmlFor="gvf-phone" className="gvf-label">Phone Number<span className="gvf-required">*</span></label>
                <div className="gvf-phone-row">
                  <input
                    id="gvf-phone"
                    name="phone"
                    type="tel"
                    className="gvf-input gvf-phone-input"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    maxLength={10}
                    disabled={otpState === 'sending' || otpState === 'verifying'}
                  />
                  <button
                    type="button"
                    className="gvf-otp-btn"
                    onClick={handleGetOtp}
                    disabled={otpState === 'sending' || otpState === 'verifying' || countdown > 0 || !/^\d{10}$/.test(formData.phone)}
                  >
                    {otpState === 'sending' ? '...' : countdown > 0 ? `${countdown}s` : 'GET OTP'}
                  </button>
                </div>
              </div>

              <div className="gvf-field">
                <label htmlFor="gvf-otp" className="gvf-label">OTP<span className="gvf-required">*</span></label>
                <input
                  id="gvf-otp"
                  name="otp"
                  type="text"
                  className="gvf-input"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  disabled={otpState === 'idle' || otpState === 'sending' || otpState === 'verifying'}
                />
              </div>

              <div className="gvf-field">
                <label htmlFor="gvf-weight" className="gvf-label">Weight In Grams<span className="gvf-required">*</span></label>
                <input
                  id="gvf-weight"
                  name="weight"
                  type="number"
                  min="0"
                  step="0.01"
                  className="gvf-input"
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

              <div className="gvf-field gvf-consent-field">
                <input
                  type="checkbox"
                  id="gvf-authorize"
                  checked={isAuthorized}
                  onChange={(e) => setIsAuthorized(e.target.checked)}
                  className="gvf-checkbox"
                />
                <label htmlFor="gvf-authorize" className="gvf-consent-label">
                  I authorize Muthoot Exim Pvt. Ltd. and other Muthoot Pappachan Group companies (including their agents/representatives) to contact me via telephone, mobile, SMS, WhatsApp, or email regarding their products, services, and promotions, and to share my details with associated third-party agencies for marketing purposes.
                </label>
              </div>

              <button type="submit" className="gvf-submit-btn" disabled={otpState === 'verifying'}>
                {otpState === 'verifying' ? 'VERIFYING...' : (buttonLabel || "Check Rate")}
              </button>
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
          setOtp('');
          setIsAuthorized(false);
          resetOtpState();
        }}
        onOtpRequired={(msg) => {
          setIsLocationModalOpen(false);
          resetOtpState();
          alert(msg);
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
