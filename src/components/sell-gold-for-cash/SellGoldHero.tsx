'use client';

import React, { useState } from 'react';
import './SellGoldHero.css';

const STATE_CITY_MAP: Record<string, string[]> = {
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane'],
  Karnataka: ['Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru'],
  TamilNadu: ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
  Kerala: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur'],
  Delhi: ['New Delhi', 'North Delhi', 'South Delhi'],
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
  Telangana: ['Hyderabad', 'Warangal', 'Nizamabad'],
  WestBengal: ['Kolkata', 'Howrah', 'Siliguri'],
};

export default function SellGoldHero() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [authorized, setAuthorized] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSendOtp = () => {
    if (!mobile || mobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
    setOtpTimer(30);
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!mobile || mobile.length < 10) {
      setErrorMsg('Please enter a valid mobile number.');
      return;
    }
    if (!selectedState) {
      setErrorMsg('Please select your state.');
      return;
    }
    if (!selectedCity) {
      setErrorMsg('Please select your city.');
      return;
    }
    if (!authorized) {
      setErrorMsg('Please accept the authorization consent to proceed.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowThankYouModal(true);
      // Reset form
      setName('');
      setEmail('');
      setMobile('');
      setOtp('');
      setOtpSent(false);
      setSelectedState('');
      setSelectedCity('');
    }, 800);
  };

  return (
    <section className="sg-hero-section">
      <div className="sg-hero-bg-overlay" />
      <div className="container sg-hero-container">
        
        {/* Left Content Column */}
        <div className="sg-hero-left">
          <div className="sg-hero-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>Muthoot Gold Point Official</span>
          </div>

          <h1 className="sg-hero-title">
            Sell Your Old Gold <br />
            <span className="sg-hero-title-highlight">Get Cash Instantly</span>
          </h1>

          <p className="sg-hero-subtitle">
            100% Fair, Transparent & Scientifically Tested Gold Buying Experience
          </p>

          <div className="sg-hero-divider" />

          <ul className="sg-hero-feature-list">
            <li>
              <div className="sg-hero-icon-check">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span><strong>Free Purity Testing</strong> of your gold using German XRF technology</span>
            </li>
            <li>
              <div className="sg-hero-icon-check">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span><strong>100% Transparent Process</strong> conducted live right in front of you</span>
            </li>
            <li>
              <div className="sg-hero-icon-check">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span><strong>Free Ultrasonic Cleaning</strong> to remove dirt for exact weight accuracy</span>
            </li>
            <li>
              <div className="sg-hero-icon-check">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span><strong>Instant Payment</strong> up to ₹10,000 in Cash or instant NEFT/IMPS bank transfer</span>
            </li>
          </ul>

          <div className="sg-hero-actions">
            <button className="sg-video-btn" onClick={() => setShowVideoModal(true)}>
              <div className="sg-play-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              <span>Watch Evaluation Video</span>
            </button>
            <div className="sg-hero-trust-tag">
              <span className="sg-trust-number">132+ Years</span>
              <span className="sg-trust-label">Muthoot Pappachan Group Legacy</span>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="sg-hero-right">
          <div className="sg-form-card">
            <div className="sg-form-header">
              <h3>Get Best Gold Rate Today</h3>
              <p>Fill out the form & our team will guide you to your nearest branch</p>
            </div>

            {errorMsg && (
              <div className="sg-form-error-alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="sg-form-body">
              <div className="sg-form-group">
                <input
                  type="text"
                  className="sg-input"
                  placeholder="Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={50}
                  required
                />
              </div>

              <div className="sg-form-group">
                <input
                  type="email"
                  className="sg-input"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={50}
                />
              </div>

              <div className="sg-form-row sg-otp-row">
                <div className="sg-form-group sg-flex-2">
                  <input
                    type="tel"
                    className="sg-input"
                    placeholder="Mobile Number *"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    maxLength={10}
                    required
                  />
                </div>

                <button
                  type="button"
                  className={`sg-otp-btn ${otpSent ? 'sent' : ''}`}
                  onClick={handleSendOtp}
                  disabled={otpTimer > 0}
                >
                  {otpTimer > 0 ? `Resend (${otpTimer}s)` : otpSent ? 'OTP Sent ✓' : 'Get OTP'}
                </button>

                <div className="sg-form-group sg-flex-1">
                  <input
                    type="text"
                    className="sg-input"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    maxLength={6}
                  />
                </div>
              </div>

              <div className="sg-form-row">
                <div className="sg-form-group">
                  <select
                    className="sg-select"
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedCity('');
                    }}
                    required
                  >
                    <option value="">Select State *</option>
                    {Object.keys(STATE_CITY_MAP).map((stateKey) => (
                      <option key={stateKey} value={stateKey}>
                        {stateKey === 'TamilNadu' ? 'Tamil Nadu' : stateKey === 'WestBengal' ? 'West Bengal' : stateKey}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sg-form-group">
                  <select
                    className="sg-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState}
                    required
                  >
                    <option value="">Select City *</option>
                    {selectedState &&
                      STATE_CITY_MAP[selectedState]?.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="sg-form-checkbox-group">
                <input
                  type="checkbox"
                  id="authorizeConsent"
                  checked={authorized}
                  onChange={(e) => setAuthorized(e.target.checked)}
                />
                <label htmlFor="authorizeConsent">
                  I authorize Muthoot Exim Pvt Ltd & Muthoot Pappachan Group companies to contact me regarding products, gold valuation & branch offers.
                </label>
              </div>

              <button type="submit" className="sg-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="sg-spinner-wrap">
                    <span className="sg-spinner"></span> Submitting...
                  </span>
                ) : (
                  <span>Get Instant Callback</span>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="sg-modal-overlay" onClick={() => setShowVideoModal(false)}>
          <div className="sg-video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="sg-modal-close" onClick={() => setShowVideoModal(false)}>
              &times;
            </button>
            <div className="sg-iframe-wrap">
              <iframe
                src="https://www.youtube.com/embed/p9FR5FUUBtM?autoplay=1"
                title="Muthoot Gold Point Evaluation Process"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Thank You Modal */}
      {showThankYouModal && (
        <div className="sg-modal-overlay" onClick={() => setShowThankYouModal(false)}>
          <div className="sg-thankyou-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="sg-thankyou-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F1B933" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3>Thank You!</h3>
            <p>Your interest has been registered successfully. Our representative will contact you shortly to provide the best gold rates and branch details.</p>
            <button className="sg-modal-close-btn" onClick={() => setShowThankYouModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
