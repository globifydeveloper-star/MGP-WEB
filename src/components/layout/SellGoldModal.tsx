'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useOtpVerification } from '@/hooks/useOtpVerification';
import { validateName, validateEmail, validatePhone, validateRequired, validateOtp } from '@/lib/validation';
import { useBranchMaster } from '@/hooks/useBranchMaster';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import ConsentText from '@/components/common/ConsentText/ConsentText';
import './SellGoldModal.css';

interface SellGoldModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SellGoldModal({ isOpen, onClose }: SellGoldModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    otp: '',
    state: '',
    city: '',
    branchCode: '',
    purity: '',
    weight: '',
    consent: false
  });

  const { states: availableStates, locationsByState, branchesByState } = useBranchMaster();

  const availableCities = formData.state ? locationsByState[formData.state] || [] : [];

  const availableBranches = formData.state && formData.city
    ? (branchesByState[formData.state] || []).filter(b => b.location.toLowerCase() === formData.city.toLowerCase())
    : [];

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [companyWebsite, setCompanyWebsite] = useState('');

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
        branchCode: '',
        purity: '',
        weight: '',
        consent: false
      });
      setCompanyWebsite('');
      setIsSubmitted(false);
      resetOtpState();
    }
  }, [isOpen, resetOtpState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    if (type === 'number' && Number(value) < 0) return;

    if (name === 'phone') {
      const numericPhone = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, phone: numericPhone }));
      if (errors.phone) {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
      return;
    }

    if (name === 'otp') {
      const numericOtp = value.replace(/\D/g, '').slice(0, 6);
      setFormData(prev => ({ ...prev, otp: numericOtp }));
      if (errors.otp) {
        setErrors(prev => ({ ...prev, otp: '' }));
      }
      return;
    }

    setFormData(prev => {
      const updates: any = { [name]: type === 'checkbox' ? checked : value };
      if (name === 'state') {
        updates.city = '';
        updates.branchCode = '';
      } else if (name === 'city') {
        updates.branchCode = '';
      }
      return { ...prev, ...updates };
    });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleGetOtp = async () => {
    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) {
      setErrors(prev => ({ ...prev, phone: phoneErr }));
      return;
    }
    await sendOtp(formData.phone, companyWebsite);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    const nameErr = validateName(formData.name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const otpErr = validateOtp(formData.otp);
    if (otpErr) newErrors.otp = otpErr;

    const stateErr = validateRequired(formData.state, 'State');
    if (stateErr) newErrors.state = stateErr;

    const cityErr = validateRequired(formData.city, 'City');
    if (cityErr) newErrors.city = cityErr;

    const branchErr = validateRequired(formData.branchCode, 'Branch');
    if (branchErr) newErrors.branchCode = branchErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const success = await verifyOtp(formData.phone, formData.otp, {
      name: formData.name,
      email: formData.email,
      state: formData.state,
      city: formData.city,
      branchCode: formData.branchCode,
      branchName: availableBranches.find(b => b.branchCode === formData.branchCode)?.branchName,
      purity: formData.purity,
      weight: formData.weight,
      consent: formData.consent,
      sourceForm: 'Sell Gold Modal',
      enquiryType: 'Gold Valuation',
      formType: 'sell-gold-modal',
    });
    if (success) {
      setIsSubmitted(true);
    } else {
      setErrors(prev => ({
        ...prev,
        otp: otpErrorMessage || 'Invalid or incorrect OTP. Please enter the correct OTP.'
      }));
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
              Thank you for contacting us, we have received your enquiry. We will reach out to you shortly.
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
              {errors.name && <span className="otp-error-msg" style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.name}</span>}
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
              {errors.email && <span className="otp-error-msg" style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
            </div>

            {/* Phone with GET OTP */}
            <div className="sg-form-row sg-phone-row">
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none', height: 0, width: 0, margin: 0, padding: 0, border: 0 }}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone*"
                required
                maxLength={10}
                inputMode="numeric"
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
            {errors.phone && <span className="otp-error-msg" style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '-0.5rem', marginBottom: '0.5rem', display: 'block' }}>{errors.phone}</span>}

            {/* OTP */}
            <div className="sg-form-group">
              <input
                type="text"
                name="otp"
                placeholder="OTP*"
                required
                maxLength={6}
                inputMode="numeric"
                className="sg-input"
                disabled={otpState === 'idle' || otpState === 'sending' || otpState === 'verifying'}
                value={formData.otp}
                onChange={handleChange}
              />
              {(errors.otp || (otpState === 'error' && otpErrorMessage)) && (
                <span className="otp-error-msg" style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
                  {errors.otp || otpErrorMessage || 'Invalid or incorrect OTP. Please enter the correct OTP.'}
                </span>
              )}
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
                {errors.state && <span className="otp-error-msg" style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.state}</span>}
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
                {errors.city && <span className="otp-error-msg" style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.city}</span>}
              </div>
            </div>

            {/* Branch (Full width or similar) */}
            <div className="sg-form-group">
              <div className="sg-select-wrapper">
                <select
                  name="branchCode"
                  required
                  disabled={!formData.city}
                  className="sg-select"
                  value={formData.branchCode}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Branch</option>
                  {availableBranches.map(b => (
                    <option key={b.branchCode} value={b.branchCode}>{b.branchName}</option>
                  ))}
                </select>
                <span className="sg-select-chevron"></span>
                {errors.branchCode && <span className="otp-error-msg" style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.branchCode}</span>}
              </div>
            </div>

            {/* Gold Weight */}
            <div className="sg-form-group">
              <input
                type="number"
                min="0"
                step="0.01"
                name="weight"
                placeholder="Approx Weight in Grams (e.g., 15.5)"
                className="sg-input"
                value={formData.weight}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === '-') {
                    e.preventDefault();
                  }
                }}
              />
              <span className="sg-input-helper">Enter approx weight in grams (optional)</span>
              {errors.weight && <span className="otp-error-msg" style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.weight}</span>}
            </div>

            {otpErrorMessage && (
              <div className="otp-error-msg" role="alert" style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '-0.5rem', marginBottom: '0.5rem', padding: '0 0.25rem' }}>
                {otpErrorMessage}
              </div>
            )}

            {/* Consent Checkbox */}
            <div className="sg-form-group">
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.75rem', color: '#41444f', lineHeight: 1.4, cursor: 'pointer', textAlign: 'left' }}>
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  style={{ marginTop: '0.2rem' }}
                />
                <span>
                  <ConsentText />
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="sg-modal-submit-btn"
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
                !formData.branchCode ||
                !formData.consent
              }
            >
              {otpState === 'verifying' ? (<> <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: '8px', verticalAlign: 'middle' }}></span> VERIFYING... </>) : ('Submit')}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
