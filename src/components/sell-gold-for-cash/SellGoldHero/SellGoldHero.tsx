'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useOtpVerification } from '@/hooks/useOtpVerification';
import { validateName, validateEmail, validatePhone, validateRequired, validateOtp, isValidLeadRef } from '@/lib/validation';
import { useBranchMaster } from '@/hooks/useBranchMaster';
import ConsentText from '@/components/common/ConsentText/ConsentText';
import type { SellGoldPageSettings } from '@/lib/strapi';

import './SellGoldHero.css';
import coupleImg from '../../../../public/images/sell-gold-for-cash/sell-gold-hero-model.png';

interface SellGoldHeroProps {
  heroImage?: string;
  trustBadgePrefix?: string;
  trustBadgeHighlight?: string;
  trustBadgeSuffix?: string;
  heroTitle?: string;
  heroTitleHighlight?: string;
  heroSubtitle?: string;
  heroBullets?: SellGoldPageSettings['heroBullets'];
  heroFormTitle?: string;
  heroFormSubtitle?: string;
  heroFormSuccessText?: string;
  heroFormResetLabel?: string;
}

export default function SellGoldHero({
  heroImage,
  heroTitle,
  heroTitleHighlight,
  heroSubtitle,
  heroFormTitle,
  heroFormSubtitle,
  heroFormSuccessText,
  heroFormResetLabel
}: SellGoldHeroProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    otp: '',
    state: '',
    city: '',
    branchCode: '',
    consent: false
  });

  const { states: bmStates, locationsByState, branchesByState } = useBranchMaster();

  const statesList = useMemo(() => {
    return bmStates || [];
  }, [bmStates]);

  const availableCities = useMemo(() => {
    if (!formData.state) return [];
    if (locationsByState[formData.state] && locationsByState[formData.state].length > 0) {
      return locationsByState[formData.state];
    }
    return [];
  }, [formData.state, locationsByState]);

  const availableBranches = useMemo(() => {
    if (!formData.state || !formData.city) return [];
    const list = branchesByState[formData.state] || [];
    return list.filter(b => b.location.toLowerCase() === formData.city.toLowerCase());
  }, [formData.state, formData.city, branchesByState]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showGoldImage, setShowGoldImage] = useState(true);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    if (name === 'phone') {
      const numeric = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, phone: numeric }));
      if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
      return;
    }

    if (name === 'otp') {
      const numeric = value.replace(/\D/g, '').slice(0, 6);
      setFormData(prev => ({ ...prev, otp: numeric }));
      if (errors.otp) setErrors(prev => ({ ...prev, otp: '' }));
      return;
    }

    setFormData(prev => {
      const updates: Partial<typeof prev> = { [name]: val };
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

    if (!formData.consent) {
      newErrors.consent = 'You must authorize communication to submit.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const res = await verifyOtp(formData.phone, formData.otp, {
      name: formData.name,
      email: formData.email.trim() || undefined,
      state: formData.state,
      city: formData.city,
      branchCode: formData.branchCode,
      branchName: availableBranches.find(b => b.branchCode === formData.branchCode)?.branchName,
      consent: formData.consent,
      sourceForm: 'Sell Gold Hero Form',
      enquiryType: 'Enquire Now',
      formType: 'sell-gold-page',
    });

    if (res.success === true && res.verified === true && isValidLeadRef(res.leadRef)) {
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        otp: '',
        state: '',
        city: '',
        branchCode: '',
        consent: false
      });
      resetOtpState();
    } else {
      setErrors(prev => ({
        ...prev,
        otp: res.message || otpErrorMessage || 'Invalid or incorrect OTP. Please enter the correct OTP.'
      }));
    }
  };

  const errStyle: React.CSSProperties = { color: '#DC2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' };

  return (
    <section className="sg-hero-root">
      <div className="sg-hero-arc" aria-hidden="true" />

      <div className="container sg-hero-container">
        {/* Left: couple photo */}
        <div className="sg-hero-visual">
          <Image
            src={heroImage || coupleImg}
            alt="Happy couple selling gold at Muthoot Gold Point"
            width={coupleImg.width}
            height={coupleImg.height}
            className="sg-couple-photo"
            priority
          />
        </div>

        {/* Middle: heading + feature icons */}
        <div className="sg-hero-content">
          <h1 className="sg-hero-title">
            <span className="sg-hero-title-main">{heroTitle || 'Sell Your Gold'}</span>
            <span className="sg-hero-title-highlight">{heroTitleHighlight || 'Get Cash Instantly'}</span>
          </h1>
          {heroSubtitle && <p className="sg-hero-subtitle">{heroSubtitle}</p>}

          <ul className="sg-hero-features">
            {FEATURES.map((feature) => (
              <li key={feature.key} className="sg-hero-feature">
                <span className="sg-feature-icon" aria-hidden="true">{feature.icon}</span>
                <span className="sg-feature-text">{feature.lines.map((line, i) => (
                  <span key={i} className="sg-feature-line">{line}</span>
                ))}</span>
              </li>
            ))}
          </ul>

          {/* Gold ornaments image — transparent PNG at public/images/sell-gold-for-cash/hero-gold.png */}
          {showGoldImage && (
            <div className="sg-hero-gold">
              <Image
                src={HERO_GOLD_IMAGE}
                alt="Gold bangles and jewellery"
                width={1536}
                height={1024}
                sizes="(max-width: 680px) 280px, 600px"
                className="sg-hero-gold-img"
                onError={() => setShowGoldImage(false)}
                priority
              />
            </div>
          )}
        </div>

        {/* Right: enquiry form */}
        <div className="sg-hero-right" id="sell-gold-form">
          <div className="sg-form-card">
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
                  {heroFormSuccessText || 'Thank you for contacting us, we have received your enquiry. Our team will get in touch with you shortly.'}
                </p>
                <button type="button" className="sg-submit-btn" onClick={() => setIsSubmitted(false)}>
                  {heroFormResetLabel || 'Submit Another Request'}
                </button>
              </div>
            ) : (
              <form className="sg-contact-form" onSubmit={handleSubmit}>
                <h2 className="sg-form-title">{heroFormTitle || 'Get a Free Gold Evaluation'}</h2>
                <p className="sg-form-subtitle">
                  {heroFormSubtitle || 'Share your details and our team will get in touch with you soon.'}
                </p>

                {/* Name */}
                <div className="sg-form-group">
                  <div className="sg-input-wrap">
                    <span className="sg-input-icon" aria-hidden="true">{ICONS.user}</span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name *"
                      aria-label="Full Name"
                      className="sg-form-input"
                    />
                  </div>
                  {errors.name && <span className="otp-error-msg" style={errStyle}>{errors.name}</span>}
                </div>

                {/* Mobile + OTP */}
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
                <div className="sg-form-row">
                  <div className="sg-form-group">
                    <div className="sg-input-wrap">
                      <span className="sg-input-icon" aria-hidden="true">{ICONS.phone}</span>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        pattern="[0-9]{10}"
                        maxLength={10}
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Mobile Number *"
                        aria-label="Mobile Number"
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
                    {errors.phone && <span className="otp-error-msg" style={errStyle}>{errors.phone}</span>}
                  </div>

                  <div className="sg-form-group sg-otp-group">
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      required
                      inputMode="numeric"
                      disabled={otpState === 'idle' || otpState === 'sending' || otpState === 'verifying'}
                      value={formData.otp}
                      onChange={handleInputChange}
                      placeholder="OTP *"
                      aria-label="OTP"
                      className="sg-form-input sg-no-icon"
                    />
                    {errors.otp && <span className="otp-error-msg" style={errStyle}>{errors.otp}</span>}
                  </div>
                </div>

                {/* Email */}
                <div className="sg-form-group">
                  <div className="sg-input-wrap">
                    <span className="sg-input-icon" aria-hidden="true">{ICONS.mail}</span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address (optional)"
                      aria-label="Email Address"
                      className="sg-form-input"
                    />
                  </div>
                  {errors.email && <span className="otp-error-msg" style={errStyle}>{errors.email}</span>}
                </div>

                {/* State & City */}
                <div className="sg-form-row sg-form-row-even">
                  <div className="sg-form-group">
                    <div className="sg-input-wrap">
                      <span className="sg-input-icon" aria-hidden="true">{ICONS.map}</span>
                      <select
                        id="state"
                        name="state"
                        required
                        aria-label="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`sg-form-select ${!formData.state ? 'sg-placeholder-selected' : ''}`}
                      >
                        <option value="" disabled>Select State *</option>
                        {statesList.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      <span className="sg-select-arrow" aria-hidden="true">{ICONS.chevron}</span>
                    </div>
                    {errors.state && <span className="otp-error-msg" style={errStyle}>{errors.state}</span>}
                  </div>

                  <div className="sg-form-group">
                    <div className="sg-input-wrap">
                      <span className="sg-input-icon" aria-hidden="true">{ICONS.pin}</span>
                      <select
                        id="city"
                        name="city"
                        required
                        aria-label="City"
                        disabled={!formData.state}
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`sg-form-select ${!formData.city ? 'sg-placeholder-selected' : ''}`}
                      >
                        <option value="" disabled>Select City *</option>
                        {availableCities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                      <span className="sg-select-arrow" aria-hidden="true">{ICONS.chevron}</span>
                    </div>
                    {errors.city && <span className="otp-error-msg" style={errStyle}>{errors.city}</span>}
                  </div>
                </div>

                {/* Branch */}
                <div className="sg-form-group">
                  <div className="sg-input-wrap">
                    <span className="sg-input-icon" aria-hidden="true">{ICONS.store}</span>
                    <select
                      id="branchCode"
                      name="branchCode"
                      required
                      aria-label="Branch"
                      disabled={!formData.city}
                      value={formData.branchCode}
                      onChange={handleInputChange}
                      className={`sg-form-select ${!formData.branchCode ? 'sg-placeholder-selected' : ''}`}
                    >
                      <option value="" disabled>
                        {formData.city ? 'Select Branch *' : 'Select Branch (Select City First) *'}
                      </option>
                      {availableBranches.map(b => (
                        <option key={b.branchCode} value={b.branchCode}>{b.branchName}</option>
                      ))}
                    </select>
                    <span className="sg-select-arrow" aria-hidden="true">{ICONS.chevron}</span>
                  </div>
                  {errors.branchCode && <span className="otp-error-msg" style={errStyle}>{errors.branchCode}</span>}
                </div>

                {/* Consent */}
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
                      <ConsentText />
                    </span>
                  </label>
                  {errors.consent && <span className="otp-error-msg" style={errStyle}>{errors.consent}</span>}
                </div>

                {otpErrorMessage && (
                  <div className="otp-error-msg" role="alert" style={{ color: '#DC2626', fontSize: '0.75rem', padding: '0 0.25rem' }}>
                    {otpErrorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    otpState === 'idle' ||
                    otpState === 'sending' ||
                    otpState === 'verifying' ||
                    !formData.name ||
                    !formData.phone ||
                    !formData.otp ||
                    !formData.state ||
                    !formData.city ||
                    !formData.branchCode ||
                    !formData.consent
                  }
                  className="sg-submit-btn"
                >
                  {otpState === 'verifying' ? (
                    <>
                      <span className="sg-spinner" aria-hidden="true" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Enquiry
                      <span className="sg-submit-arrow" aria-hidden="true">{ICONS.arrow}</span>
                    </>
                  )}
                </button>

                <p className="sg-secure-note">
                  <span aria-hidden="true">{ICONS.lock}</span>
                  Your details are safe and secure with us.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const HERO_GOLD_IMAGE = '/images/sell-gold-for-cash/hero-gold.png';

const svgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const ICONS = {
  user: (<svg {...svgProps}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>),
  phone: (<svg {...svgProps}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>),
  mail: (<svg {...svgProps}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>),
  map: (<svg {...svgProps}><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" /><path d="M9 4v14M15 6v14" /></svg>),
  pin: (<svg {...svgProps}><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>),
  store: (<svg {...svgProps}><path d="M3 9 4.5 4h15L21 9" /><path d="M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V9z" /><path d="M5 13v8h14v-8" /></svg>),
  chevron: (<svg {...svgProps} strokeWidth={2.2}><path d="m6 9 6 6 6-6" /></svg>),
  arrow: (<svg {...svgProps} strokeWidth={2.4}><path d="M5 12h14M13 6l6 6-6 6" /></svg>),
  lock: (<svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="10" width="16" height="12" rx="2.5" fill="#E2A92B" /><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="#B8801A" strokeWidth="2.2" /><circle cx="12" cy="16" r="1.6" fill="#7a4f0c" /></svg>),
};

/* Feature icons — gold line art on navy medallions, matching the GoldPoint print design */
const iconProps = {
  viewBox: '0 0 48 48',
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'none',
  stroke: 'url(#sgIconGold)',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const IconGoldDefs = () => (
  <defs>
    <linearGradient id="sgIconGold" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#FFE39A" />
      <stop offset="0.5" stopColor="#F2C14E" />
      <stop offset="1" stopColor="#C98B16" />
    </linearGradient>
  </defs>
);

const FEATURES = [
  {
    key: 'transparent',
    lines: ['100%', 'Transparent', 'Process'],
    icon: (
      <svg {...iconProps}>
        <IconGoldDefs />
        <path d="M24 5 9 10.5v10.2C9 30.5 15.4 38.8 24 42.5c8.6-3.7 15-12 15-21.8V10.5z" />
        <path d="M24 9.5 13 13.6v7.3c0 7.5 4.6 13.9 11 17 6.4-3.1 11-9.5 11-17v-7.3z" strokeWidth="1.2" opacity="0.7" />
        <path d="m17.5 23.5 4.6 4.6 8.6-9.4" strokeWidth="2.6" />
      </svg>
    ),
  },
  {
    key: 'ultrasonic',
    lines: ['Free', 'Ultrasonic', 'Gold Cleaning'],
    icon: (
      <svg {...iconProps}>
        <IconGoldDefs />
        <rect x="6" y="15" width="36" height="22" rx="3" />
        <path d="M9 15v-3h30v3" />
        <path d="M10 21c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0 4 1.6 6 0 4-1.6 4 0" strokeWidth="1.6" />
        <path d="M10 25.5c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0 4 1.6 6 0 4-1.6 4 0" strokeWidth="1.6" />
        <rect x="9" y="30" width="18" height="4" rx="1" strokeWidth="1.4" />
        <circle cx="33" cy="32" r="1.6" strokeWidth="1.6" />
        <circle cx="38" cy="32" r="1.6" strokeWidth="1.6" />
        <path d="M10 37v3M38 37v3" />
      </svg>
    ),
  },
  {
    key: 'xrf',
    lines: ['Free', 'XRF Gold', 'Purity Testing'],
    icon: (
      <svg {...iconProps}>
        <IconGoldDefs />
        <path d="M8 16 24 8l16 8v18l-16 8-16-8z" />
        <path d="m8 16 16 8 16-8M24 24v18" />
        <path d="m12 22.5 8 4v9l-8-4z" strokeWidth="1.4" />
        <path d="M30 28.5v6M33.5 27v6" strokeWidth="1.6" />
        <circle cx="31.8" cy="24" r="1.2" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    key: 'payment',
    lines: ['Get', 'Instant', 'Payment'],
    icon: (
      <svg {...iconProps}>
        <IconGoldDefs />
        <circle cx="27" cy="15" r="9" />
        <path d="M23 11h8M23 14h8M25 11c3 0 4.2 1.4 4.2 3S28 17 25 17h-1.5l5.5 5" strokeWidth="1.6" />
        <path d="M5 32h6l6.5-4h7a2.5 2.5 0 0 1 0 5H19" />
        <path d="m19 33 8.5-.2 8.8-6a2.6 2.6 0 0 1 3.4 3.9L30 39.5H15L11 42H5" />
      </svg>
    ),
  },
];
