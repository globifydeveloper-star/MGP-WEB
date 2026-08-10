'use client';

import React, { useState } from 'react';
import { useOtpVerification } from '@/hooks/useOtpVerification';
import './OTPEnquiryForm.css';

const STATE_CITIES: Record<string, string[]> = {
  'Karnataka': ['Bengaluru', 'Mysore', 'Mangalore', 'Hubli'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Trichy'],
  'Kerala': ['Kochi', 'Trivandrum', 'Calicut', 'Thrissur'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Kalyan'],
  'Delhi': ['Delhi', 'New Delhi']
};

export default function OTPEnquiryForm({
  sourceForm = 'OTP Enquiry Form',
  enquiryType = 'Enquire Now',
}: {
  sourceForm?: string;
  enquiryType?: string;
} = {}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [shake, setShake] = useState(false);

  const {
    state,
    countdown,
    errorMessage,
    sendOtp,
    verifyOtp,
    resetOtpState
  } = useOtpVerification({ cooldownSeconds: 60 });

  const handleGetOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    const success = await sendOtp(phone);
    if (!success) {
      triggerShake();
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      triggerShake();
      return;
    }
    if (state === 'otpSent' || state === 'error' || state === 'expired') {
      const details = {
        name,
        state: selectedState,
        city: selectedCity,
        message,
        consent,
        sourceForm,
        enquiryType,
      };
      const verified = await verifyOtp(phone, otp, details);
      if (verified) {
        // Form submitted and verified successfully
      } else {
        triggerShake();
      }
    }
  };


  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(val);
  };

  const isSubmitted = state === 'verified';

  return (
    <div className={`otp-enquiry-card ${shake ? 'shake-animation' : ''}`}>
      {isSubmitted ? (
        <div className="otp-enquiry-success">
          <div className="sg-success-checkmark-circle">
            <svg className="sg-success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="sg-success-checkmark-bg" cx="26" cy="26" r="25" fill="none" />
              <path className="sg-success-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <h3 className="otp-success-title">Thank You!</h3>
          <p className="otp-success-desc">
            We will be in touch shortly.
          </p>
          <button
            type="button"
            className="otp-submit-btn otp-reset-btn"
            onClick={() => {
              resetOtpState();
              setName('');
              setPhone('');
              setOtp('');
              setSelectedState('');
              setSelectedCity('');
              setMessage('');
              setConsent(false);
            }}
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        <form className="otp-enquiry-form" onSubmit={handleSubmit}>
          <h2 className="otp-enquiry-title">Quick Enquiry</h2>
          <p className="otp-enquiry-subtitle">
            Fill in the details to connect with us.
          </p>

          {/* Name Field */}
          <div className="otp-form-group">
            <input
              type="text"
              id="enquiry-name"
              name="name"
              required
              disabled={state === 'sending' || state === 'verifying'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name*"
              className="otp-form-input"
            />
          </div>

          {/* Phone Field + Get OTP */}
          <div className="otp-form-group otp-phone-wrapper">
            <input
              type="tel"
              id="enquiry-phone"
              name="phone"
              required
              pattern="[0-9]{10}"
              maxLength={10}
              disabled={state === 'sending' || state === 'verifying'}
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Mobile Number*"
              className="otp-form-input otp-phone-input"
            />
            <button
              type="button"
              className="otp-get-btn"
              onClick={handleGetOtp}
              disabled={state === 'sending' || state === 'verifying' || countdown > 0 || !/^\d{10}$/.test(phone)}
            >
              {state === 'sending' ? '...' : countdown > 0 ? `${countdown}s` : 'GET OTP'}
            </button>
          </div>

          {/* State Dropdown */}
          <div className="otp-form-group">
            <select
              id="enquiry-state"
              name="state"
              required
              disabled={state === 'sending' || state === 'verifying'}
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity('');
              }}
              className="otp-form-select"
            >
              <option value="" disabled>Select State*</option>
              {Object.keys(STATE_CITIES).map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
            <span className="otp-select-arrow" />
          </div>

          {/* City Dropdown */}
          <div className="otp-form-group">
            <select
              id="enquiry-city"
              name="city"
              required
              disabled={state === 'sending' || state === 'verifying' || !selectedState}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="otp-form-select"
            >
              <option value="" disabled>Select City*</option>
              {selectedState && STATE_CITIES[selectedState].map((ct) => (
                <option key={ct} value={ct}>{ct}</option>
              ))}
            </select>
            <span className="otp-select-arrow" />
          </div>

          {/* Message Textarea */}
          <div className="otp-form-group">
            <textarea
              id="enquiry-message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              className="otp-form-textarea"
            />
          </div>

          {/* OTP Field (disabled until OTP is sent) */}
          <div className="otp-form-group">
            <input
              type="text"
              id="enquiry-otp"
              name="otp"
              required
              pattern="[0-9]{6}"
              maxLength={6}
              disabled={state === 'idle' || state === 'sending' || state === 'verifying'}
              value={otp}
              onChange={handleOtpChange}
              placeholder="OTP*"
              className="otp-form-input"
            />
          </div>

          {/* Consent Checkbox */}
          <div className="otp-consent-wrapper">
            <label className="otp-consent-label">
              <input
                type="checkbox"
                id="enquiry-consent"
                name="consent"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="otp-consent-checkbox"
              />
              <span className="otp-consent-text">
                I authorize Muthoot Exim Pvt. Ltd. & other Muthoot Pappachan Group companies (including its Agents/representatives) to call/communicate with me on their product offerings/promotions through Telephone/Mobile/SMS/email ID.
              </span>
            </label>
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="otp-error-msg" role="alert">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              state === 'idle' ||
              state === 'sending' ||
              state === 'verifying' ||
              !name ||
              !phone ||
              !otp ||
              !selectedState ||
              !selectedCity ||
              !consent
            }
            className="otp-submit-btn"
          >
            {state === 'verifying' ? 'VERIFYING...' : 'SUBMIT'}
          </button>
        </form>
      )}
    </div>
  );
}
