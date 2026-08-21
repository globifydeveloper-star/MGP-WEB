'use client';

import React, { useState, useMemo } from 'react';
import { useOtpVerification } from '@/hooks/useOtpVerification';
import { useBranchMaster } from '@/hooks/useBranchMaster';
import { getUniqueStates, getCitiesByState } from '@/data/branchesData';
import { MobileVanPageData } from '@/lib/strapi';
import './appoinment.css';

const GaugeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15a8 8 0 1 1 16 0" />
    <path d="M12 15l3.5-4.5" />
    <path d="M12 15h.01" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

interface AppoinmentProps {
  data?: MobileVanPageData | null;
}

export default function Appoinment({ data }: AppoinmentProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    state: '',
    city: '',
    consent: false,
  });

  const [otp, setOtp] = useState('');
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

  const {
    state: otpState,
    countdown: otpCountdown,
    errorMessage: otpErrorMessage,
    sendOtp,
    verifyOtp,
    resetOtpState
  } = useOtpVerification({ cooldownSeconds: 60 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'state' ? { city: '' } : {}),
    }));
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(val);
  };

  const handleGetOtp = async () => {
    if (!formData.mobile || formData.mobile.length < 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    await sendOtp(formData.mobile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobile || !otp || !formData.state || !formData.city) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!formData.consent) {
      alert('You must authorize communication to submit.');
      return;
    }

    const success = await verifyOtp(formData.mobile, otp, {
      name: formData.fullName,
      state: formData.state,
      city: formData.city,
      consent: formData.consent,
      sourceForm: 'Mobile Van Appointment',
      enquiryType: 'Mobile Van',
    });

    if (success) {
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        mobile: '',
        state: '',
        city: '',
        consent: false,
      });
      setOtp('');
      resetOtpState();
    }
  };

  return (
    <section className="apt-section">
      <div className="container">
        <div className="apt-card">
          {/* Left: Info panel */}
          <div className="apt-left">
            <div className="apt-left-pattern" aria-hidden="true" />
            <div className="apt-left-content">
              <div className="apt-left-text">
                <h2 className="apt-heading">
                  {data?.appointmentTitle ? data.appointmentTitle : (
                    <>Book <span className="apt-heading-highlight">Your Van</span></>
                  )}
                </h2>
                <p className="apt-desc">
                  {data?.appointmentDescription || 'Fill in the details and our representative will contact you to confirm the appointment slot.'}
                </p>
              </div>

              <div className="apt-features">
                <div className="apt-feature-row">
                  <span className="apt-feature-icon"><GaugeIcon /></span>
                  <span>24/7 Support Available</span>
                </div>
                <div className="apt-feature-row">
                  <span className="apt-feature-icon"><LockIcon /></span>
                  <span>Your data is safe &amp; encrypted</span>
                </div>
              </div>
            </div>

            <div className="apt-van-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/van.png" alt="Muthoot Gold Point mobile van" className="apt-van-img" />
            </div>
          </div>

          {/* Right: Form panel */}
          <div className="apt-right">
            {isSubmitted ? (
              <div className="apt-success-view" style={{ width: '100%', textAlign: 'center', padding: '2rem 1.5rem' }}>
                <div className="sg-success-checkmark-circle" style={{ margin: '0 auto 1.5rem' }}>
                  <svg className="sg-success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="sg-success-checkmark-bg" cx="26" cy="26" r="25" fill="none" />
                    <path className="sg-success-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                  </svg>
                </div>
                <h3 className="sg-success-title" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0c1f6c', marginBottom: '0.5rem' }}>Appointment Booked!</h3>
                <p className="sg-success-desc" style={{ color: '#4B5563', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  We will contact you shortly to confirm your booking.
                </p>
                <button
                  type="button"
                  className="apt-submit-btn"
                  onClick={() => setIsSubmitted(false)}
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form className="apt-form" onSubmit={handleSubmit}>
                <div className="apt-form-row">
                  <div className="apt-field">
                    <label htmlFor="apt-fullname" className="apt-label">Full Name<span className="apt-required">*</span></label>
                    <input
                      id="apt-fullname"
                      name="fullName"
                      type="text"
                      className="apt-input"
                      placeholder="Enter your name"
                      disabled={otpState === 'sending' || otpState === 'verifying'}
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="apt-field">
                    <label htmlFor="apt-mobile" className="apt-label">Mobile Number<span className="apt-required">*</span></label>
                    <div className="apt-otp-wrap">
                      <input
                        id="apt-mobile"
                        name="mobile"
                        type="tel"
                        className="apt-input apt-input-otp"
                        placeholder="Phone number"
                        disabled={otpState === 'sending' || otpState === 'verifying'}
                        value={formData.mobile}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="apt-otp-btn"
                        onClick={handleGetOtp}
                        disabled={otpState === 'sending' || otpState === 'verifying' || otpCountdown > 0 || !/^\d{10}$/.test(formData.mobile)}
                      >
                        {otpState === 'sending' ? '...' : otpCountdown > 0 ? `${otpCountdown}s` : 'GET OTP'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="apt-form-row">
                  <div className="apt-field">
                    <label htmlFor="apt-otp" className="apt-label">OTP<span className="apt-required">*</span></label>
                    <input
                      id="apt-otp"
                      name="otp"
                      type="text"
                      required
                      pattern="[0-9]{6}"
                      maxLength={6}
                      disabled={otpState === 'idle' || otpState === 'sending' || otpState === 'verifying'}
                      className="apt-input"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={handleOtpChange}
                    />
                  </div>
                </div>

                <div className="apt-form-row">
                  <div className="apt-field">
                    <label htmlFor="apt-state" className="apt-label">State<span className="apt-required">*</span></label>
                    <select
                      id="apt-state"
                      name="state"
                      className="apt-select"
                      disabled={otpState === 'sending' || otpState === 'verifying'}
                      value={formData.state}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select State</option>
                      {statesList.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div className="apt-field">
                    <label htmlFor="apt-city" className="apt-label">City<span className="apt-required">*</span></label>
                    <select
                      id="apt-city"
                      name="city"
                      className="apt-select"
                      disabled={!formData.state || otpState === 'sending' || otpState === 'verifying'}
                      value={formData.city}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select City</option>
                      {availableCities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <label className="apt-consent">
                  <input
                    type="checkbox"
                    name="consent"
                    disabled={otpState === 'sending' || otpState === 'verifying'}
                    checked={formData.consent}
                    onChange={handleChange}
                  />
                  <span>
                    I authorize Muthoot Exim Pvt. Ltd. &amp; other Muthoot Pappachan Group companies to communicate with me on their product offerings/promotions through Telephone/Mobile/SMS/Email.
                  </span>
                </label>

                {otpErrorMessage && (
                  <div className="otp-error-msg" role="alert" style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '-0.5rem', marginBottom: '1.25rem' }}>
                    {otpErrorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    otpState === 'idle' ||
                    otpState === 'sending' ||
                    otpState === 'verifying' ||
                    !formData.fullName ||
                    !formData.mobile ||
                    !otp ||
                    !formData.state ||
                    !formData.city ||
                    !formData.consent
                  }
                  className="apt-submit-btn"
                >
                  {otpState === 'verifying' ? (<> <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: '8px', verticalAlign: 'middle' }}></span> Confirming... </>) : ('Confirm Appointment')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
