'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useBranchMaster } from '@/hooks/useBranchMaster';
import { useOtpVerification } from '@/hooks/useOtpVerification';
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
    branchCode: '',
    consent: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    state: otpState,
    countdown: otpCountdown,
    errorMessage: otpErrorMessage,
    sendOtp,
    verifyOtp,
    resetOtpState
  } = useOtpVerification({ cooldownSeconds: 60 });

  const { states: statesList, locationsByState, branchesByState } = useBranchMaster();

  const availableCities = useMemo(() => {
    if (!formData.state) return [];
    return locationsByState[formData.state] || [];
  }, [formData.state, locationsByState]);

  const availableBranches = useMemo(() => {
    if (!formData.state || !formData.city) return [];
    const list = branchesByState[formData.state] || [];
    return list.filter((b: any) => b.location.toLowerCase() === formData.city.toLowerCase());
  }, [formData.state, formData.city, branchesByState]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => {
      const updates: any = { [name]: val };
      if (name === 'state') {
        updates.city = '';
        updates.branchCode = '';
      } else if (name === 'city') {
        updates.branchCode = '';
      }
      return { ...prev, ...updates };
    });
  };

  const handleGetOtp = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    const res = await sendOtp(formData.phone);
    if (!res) {
      alert('Failed to send OTP. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.otp || !formData.state || !formData.city || !formData.branchCode) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!formData.consent) {
      alert('You must authorize communication to submit.');
      return;
    }
    setIsSubmitting(true);
    try {
      const success = await verifyOtp(formData.phone, formData.otp, {
        name: formData.name,
        email: formData.email,
        state: formData.state,
        city: formData.city,
        branchCode: formData.branchCode,
        branchName: availableBranches.find((b: any) => b.branchCode === formData.branchCode)?.branchName,
        message: 'Enquiry from Sell Gold For Cash Page',
        consent: true,
        sourceForm: 'Sell Gold For Cash Page',
        enquiryType: 'Sell Gold',
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
          branchCode: '',
          consent: true,
        });
        resetOtpState();
      } else {
        alert(otpErrorMessage || 'Incorrect or expired OTP. Please try again.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      alert('Network error submitting form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="grct-section" id="sell-gold-contact">
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
              {otpErrorMessage && (
                <div style={{ color: '#e74c3c', fontSize: '13px', marginBottom: '12px', textAlign: 'center', background: '#fdf2f2', padding: '8px 12px', borderRadius: '6px', border: '1px solid #f8d7da' }}>
                  {otpErrorMessage}
                </div>
              )}
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
                    disabled={otpState === 'sending' || otpState === 'verifying' || otpCountdown > 0 || !/^\d{10}$/.test(formData.phone)}
                  >
                    {otpState === 'sending' ? '...' : otpCountdown > 0 ? `${otpCountdown}s` : 'GET OTP'}
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
                    disabled={otpState === 'idle' || otpState === 'sending' || otpState === 'verifying'}
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
                      {formData.state ? 'Select City*' : 'Select City*'}
                    </option>
                    {availableCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grct-form-row">
                <div className="grct-form-group grct-select-wrap">
                  <select
                    id="grct-branchCode"
                    name="branchCode"
                    value={formData.branchCode}
                    onChange={handleChange}
                    disabled={!formData.city}
                    required
                    className={!formData.branchCode ? 'grct-placeholder-selected' : ''}
                  >
                    <option value="" disabled>
                      {formData.city ? 'Select Branch*' : 'Select Branch (Select City First)*'}
                    </option>
                    {availableBranches.map((b: any) => (
                      <option key={b.branchCode} value={b.branchCode}>{b.branchName}</option>
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
                {isSubmitting ? (<> <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: '8px', verticalAlign: 'middle' }}></span> SUBMITTING... </>) : ('SUBMIT ENQUIRY')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
