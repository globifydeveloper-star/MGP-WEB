'use client';

import React, { useState, useMemo } from 'react';
import { getUniqueStates, getCitiesByState } from '@/data/branchesData';
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

export default function Appoinment() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    state: '',
    city: '',
    purity: '',
    consent: false,
  });

  const statesList = useMemo(() => getUniqueStates(), []);
  const availableCities = useMemo(() => {
    return formData.state ? getCitiesByState(formData.state) : [];
  }, [formData.state]);

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

  const handleGetOtp = () => {
    // TODO: wire up OTP API
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up appointment booking API
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
                  Book <span className="apt-heading-highlight">Your Van</span>
                </h2>
                <p className="apt-desc">
                  Fill in the details and our representative will contact you to confirm the appointment slot.
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
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                    <button type="button" className="apt-otp-btn" onClick={handleGetOtp}>
                      GET OTP
                    </button>
                  </div>
                </div>
              </div>

              <div className="apt-form-row">
                <div className="apt-field">
                  <label htmlFor="apt-state" className="apt-label">State<span className="apt-required">*</span></label>
                  <select
                    id="apt-state"
                    name="state"
                    className="apt-select"
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
                    disabled={!formData.state}
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

              <div className="apt-field apt-field-full">
                <label htmlFor="apt-purity" className="apt-label">Purity<span className="apt-required">*</span></label>
                <input
                  id="apt-purity"
                  name="purity"
                  type="text"
                  className="apt-input"
                  placeholder="Enter Purity"
                  value={formData.purity}
                  onChange={handleChange}
                />
              </div>

              <label className="apt-consent">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                />
                <span>
                  I authorize Muthoot Exim Pvt. Ltd. &amp; other Muthoot Pappachan Group companies to communicate with me on their product offerings/promotions through Telephone/Mobile/SMS/Email.
                </span>
              </label>

              <button type="submit" className="apt-submit-btn">Confirm Appointment</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
