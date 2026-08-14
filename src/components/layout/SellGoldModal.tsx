'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useOtpVerification } from '@/hooks/useOtpVerification';
import './SellGoldModal.css';

interface SellGoldModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import { useBranchMaster } from '@/hooks/useBranchMaster';
import { getStateCitiesMap } from '@/data/branchesData';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

const STATIC_STATE_CITIES = getStateCitiesMap();

const PURITIES = [
  '24K (99.9%)',
  '22K (91.6%)',
  '20K (83.3%)',
  '18K (75.0%)',
  'Below 18K'
];

export default function SellGoldModal({ isOpen, onClose }: SellGoldModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    otp: '',
    state: '',
    city: '',
    purity: '',
    weight: ''
  });

  const { states: bmStates, locationsByState } = useBranchMaster();

  const availableStates = bmStates && bmStates.length > 0 ? bmStates : Object.keys(STATIC_STATE_CITIES);

  const availableCities = formData.state
    ? (locationsByState[formData.state] && locationsByState[formData.state].length > 0
        ? locationsByState[formData.state]
        : STATIC_STATE_CITIES[formData.state] || [])
    : [];

  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    state: otpState,
    countdown: otpCountdown,
    errorMessage: otpErrorMessage,
    sendOtp,
    verifyOtp,
    resetOtpState
  } = useOtpVerification({ cooldownSeconds: 60 });

  // Lock background scroll completely on mobile & desktop when modal is open
  useBodyScrollLock(isOpen);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset form and submission status when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        otp: '',
        state: '',
        city: '',
        purity: '',
        weight: ''
      });
      setIsSubmitted(false);
      resetOtpState();
    }
  }, [isOpen, resetOtpState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Clear city if state changes
      ...(name === 'state' ? { city: '' } : {})
    }));
  };

  const handleGetOtp = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }
    await sendOtp(formData.phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate inputs
    if (!formData.name || !formData.email || !formData.phone || !formData.otp || !formData.state || !formData.city || !formData.purity || !formData.weight) {
      alert('Please fill in all required fields.');
      return;
    }
    const success = await verifyOtp(formData.phone, formData.otp, {
      name: formData.name,
      state: formData.state,
      city: formData.city,
      purity: formData.purity,
      weight: formData.weight,
      consent: true,
      sourceForm: 'Sell Gold Modal',
      enquiryType: 'Gold Valuation',
    });
    if (success) {
      setIsSubmitted(true);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="sg-modal-overlay" onClick={onClose}>
      <div
        className="sg-modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sg-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sg-modal-header">
          <h2 id="sg-modal-title" className="sg-modal-title">
            {isSubmitted ? "Request Received" : "Sell Your Gold Instantly – Get in Touch"}
          </h2>
          <button className="sg-modal-close-btn" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        {isSubmitted ? (
          <div className="sg-success-view">
            <div className="sg-success-animation">
              <svg className="sg-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="sg-checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                <path className="sg-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
            <h3 className="sg-success-title">Thank You!</h3>
            <p className="sg-success-message">
              Your details have been successfully submitted. We will reach out to you shortly.
            </p>
            <button type="button" className="sg-success-close-btn" onClick={onClose}>
              Close Window
            </button>
          </div>
        ) : (
          <form className="sg-modal-form" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="sg-form-group">
              <input
                type="text"
                name="name"
                placeholder="Name*"
                required
                className="sg-input"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="sg-form-group">
              <input
                type="email"
                name="email"
                placeholder="Email*"
                required
                className="sg-input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Phone with GET OTP */}
            <div className="sg-form-row sg-phone-row">
              <input
                type="tel"
                name="phone"
                placeholder="Phone*"
                required
                className="sg-input sg-phone-input"
                value={formData.phone}
                onChange={handleChange}
              />
              <button
                type="button"
                className="sg-otp-btn"
                onClick={handleGetOtp}
                disabled={otpState === 'sending' || otpState === 'verifying' || otpCountdown > 0 || !/^\d{10}$/.test(formData.phone)}
              >
                {otpState === 'sending' ? '...' : otpCountdown > 0 ? `Resend (${otpCountdown}s)` : 'GET OTP'}
              </button>
            </div>

            {/* OTP */}
            <div className="sg-form-group">
              <input
                type="text"
                name="otp"
                placeholder="OTP*"
                required
                className="sg-input"
                disabled={otpState === 'idle' || otpState === 'sending' || otpState === 'verifying'}
                value={formData.otp}
                onChange={handleChange}
              />
            </div>

            {/* State and City (side by side) */}
            <div className="sg-form-row sg-location-row">
              <div className="sg-select-wrapper">
                <select
                  name="state"
                  required
                  className="sg-select"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select State</option>
                  {availableStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <span className="sg-select-chevron"></span>
              </div>

              <div className="sg-select-wrapper">
                <select
                  name="city"
                  required
                  disabled={!formData.state}
                  className="sg-select"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select City</option>
                  {availableCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <span className="sg-select-chevron"></span>
              </div>
            </div>

            {/* Gold Purity */}
            <div className="sg-form-group">
              <div className="sg-select-wrapper">
                <select
                  name="purity"
                  required
                  className="sg-select"
                  value={formData.purity}
                  onChange={handleChange}
                >
                  <option value="" disabled>Gold Purity</option>
                  {PURITIES.map(purity => (
                    <option key={purity} value={purity}>{purity}</option>
                  ))}
                </select>
                <span className="sg-select-chevron"></span>
              </div>
            </div>

            {/* Gold Weight */}
            <div className="sg-form-group">
              <input
                type="number"
                step="0.01"
                name="weight"
                placeholder="Gold Weight (e.g., 15.5)"
                required
                className="sg-input"
                value={formData.weight}
                onChange={handleChange}
              />
              <span className="sg-input-helper">Enter total weight in grams (e.g., 15.5g)</span>
            </div>

            {otpErrorMessage && (
              <div className="otp-error-msg" role="alert" style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '-0.5rem', marginBottom: '0.5rem', padding: '0 0.25rem' }}>
                {otpErrorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="sg-submit-btn"
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
                !formData.purity ||
                !formData.weight
              }
            >
              {otpState === 'verifying' ? 'VERIFYING...' : 'GET MY OFFER'}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
