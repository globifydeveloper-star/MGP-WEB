'use client';

import React, { useState, useMemo } from 'react';
import { useOtpVerification } from '@/hooks/useOtpVerification';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BranchLocator from '@/components/home/BranchLocator/BranchLocator';
import HeroStats from '@/components/home/HeroSlider/HeroStats';
import { useBranchMaster } from '@/hooks/useBranchMaster';
import { getUniqueStates } from '@/data/branchesData';
import contactHeroBg from '@/assets/images/conbg2.png';
import './ContactPage.css';
import { ContactUsPageData } from '@/lib/strapi';



const SERVICES = [
  'Sell Gold for Cash',
  'Gold Loan Service',
  'Mobile Van Appointment',
  'Branch Enquiry',
  'Gold Valuation & Purity Check',
  'Other Assistance',
];

const REGISTERED_OFFICE = {
  name: 'MUTHOOT GOLD POINT',
  address: 'Muthoot Exim Private Limited, 40/7384 Muthoot Towers, M.G. Road, Ernakulam, Kerala - 682035',
  phone1: '0484 2351481',
  phone2: '0484 2351494',
  email: 'info@muthootexim.com',
  mapEmbedUrl: 'https://maps.google.com/maps?q=Muthoot%20Towers,%20MG%20Road,%20Ernakulam,%20Kerala%20682035&t=&z=15&ie=UTF8&iwloc=&output=embed',
};

/* Input Icons */
const UserIcon = () => (
  <svg className="cp-input-icon" viewBox="0 0 24 24" fill="none" stroke="#7A899E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg className="cp-input-icon" viewBox="0 0 24 24" fill="none" stroke="#7A899E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="cp-input-icon" viewBox="0 0 24 24" fill="none" stroke="#7A899E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="cp-select-chevron" viewBox="0 0 24 24" fill="none" stroke="#7A899E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* Card Badges Gold Icons */
const PinIconGold = () => (
  <svg className="cp-badge-icon" viewBox="0 0 24 24" fill="none" stroke="#F1B933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" fill="#F1B933" />
  </svg>
);

const PhoneIconGold = () => (
  <svg className="cp-badge-icon" viewBox="0 0 24 24" fill="none" stroke="#F1B933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const BriefcaseIconGold = () => (
  <svg className="cp-badge-icon" viewBox="0 0 24 24" fill="none" stroke="#F1B933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const MailIconGold = () => (
  <svg className="cp-badge-icon" viewBox="0 0 24 24" fill="none" stroke="#F1B933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

export default function ContactPage({ data }: { data?: ContactUsPageData | null }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    otp: '',
    service: '',
    state: '',
    city: '',
    message: '',
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

  const { states: bmStates, locationsByState } = useBranchMaster();

  const statesList = useMemo(() => {
    return bmStates && bmStates.length > 0 ? bmStates : getUniqueStates();
  }, [bmStates]);

  const availableCities = useMemo(() => {
    if (!formData.state) return [];
    return locationsByState[formData.state] || [];
  }, [formData.state, locationsByState]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'state' ? { city: '' } : {}),
    }));
  };

  const handleGetOtp = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    const res = await sendOtp(formData.phone);
    if (!res) {
      alert('Failed to send OTP. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.otp || !formData.state || !formData.city || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      const success = await verifyOtp(formData.phone, formData.otp, {
        name: formData.name,
        email: formData.email,
        state: formData.state,
        city: formData.city,
        message: `[Service: ${formData.service || 'N/A'}] ${formData.message}`,
        consent: true,
        sourceForm: 'Contact Us Page',
        enquiryType: formData.service || 'Contact Us',
      });
      if (success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          otp: '',
          service: '',
          state: '',
          city: '',
          message: '',
        });
        resetOtpState();
      } else {
        alert(otpErrorMessage || 'Incorrect or expired OTP. Please try again.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      alert('Network error submitting contact form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="cp-page">
        {/* TOP HERO BANNER */}
        <section className="cp-hero-banner">
          <div className="cp-hero-bg-wrapper">
            <Image
              src={contactHeroBg}
              alt="Muthoot Gold Point Contact Us"
              fill
              priority
              className="cp-hero-img"
            />
            <div className="cp-hero-overlay" />
          </div>

          <div className="container cp-hero-text-container">
            <h1 className="cp-hero-heading">
              We’re Just A Message <br />
              <span className="cp-gold-text">Away.</span>
            </h1>
            <p className="cp-hero-lead">
              Have questions or need assistance? <br />
              We’re here to help you with all your gold loan &amp; <br />
              selling needs.
            </p>
          </div>
        </section>

        {/* OVERLAPPING MAIN CONTENT AREA */}
        <section className="cp-content-section">
          <div className="container cp-content-grid">

            {/* LEFT / MIDDLE COLUMN: Registered Office & Map */}
            <div className="cp-left-col">
              <h2 className="cp-office-title">
                Registered <span className="cp-gold-text-dark">Office</span>
              </h2>
              <div className="cp-office-title-line" />

              <div className="cp-office-row-flex">
                {/* Registered Office White Card */}
                <div className="cp-office-card">
                  {/* Address */}
                  <div className="cp-card-item cp-card-item-address">
                    <div className="cp-badge-circle">
                      <PinIconGold />
                    </div>
                    <div className="cp-card-item-body">
                      <h3 className="cp-company-title">{REGISTERED_OFFICE.name}</h3>
                      <p className="cp-company-addr">{REGISTERED_OFFICE.address}</p>
                    </div>
                  </div>

                  <div className="cp-dotted-line" />

                  {/* Phone 1 */}
                  <div className="cp-card-item">
                    <div className="cp-badge-circle">
                      <PhoneIconGold />
                    </div>
                    <div className="cp-card-item-body">
                      <a href={`tel:${REGISTERED_OFFICE.phone1.replace(/\s+/g, '')}`} className="cp-contact-link">
                        {REGISTERED_OFFICE.phone1}
                      </a>
                    </div>
                  </div>

                  <div className="cp-dotted-line" />

                  {/* Phone 2 */}
                  <div className="cp-card-item">
                    <div className="cp-badge-circle">
                      <BriefcaseIconGold />
                    </div>
                    <div className="cp-card-item-body">
                      <a href={`tel:${REGISTERED_OFFICE.phone2.replace(/\s+/g, '')}`} className="cp-contact-link">
                        {REGISTERED_OFFICE.phone2}
                      </a>
                    </div>
                  </div>

                  <div className="cp-dotted-line" />

                  {/* Email */}
                  <div className="cp-card-item">
                    <div className="cp-badge-circle">
                      <MailIconGold />
                    </div>
                    <div className="cp-card-item-body">
                      <a href={`mailto:${REGISTERED_OFFICE.email}`} className="cp-contact-link">
                        {REGISTERED_OFFICE.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Map Box */}
                <div className="cp-map-box">
                  <iframe
                    title="Muthoot Gold Point Registered Office Location"
                    className="cp-map-iframe"
                    src={REGISTERED_OFFICE.mapEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* Floating Marker Card on Map */}
                  <div className="cp-map-popup">
                    <div className="cp-map-popup-body">
                      <h4 className="cp-map-popup-title">Muthoot Towers</h4>
                      <p className="cp-map-popup-text">M.G. Road, Ernakulam, Kerala - 682035</p>
                    </div>
                    <div className="cp-map-popup-pin">
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="#0B1536">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Floating Overlapping Form Card */}
            <div className="cp-right-col">
              <div className="cp-form-card">
                {/* Animated Glowing border beam (aura/shine effect) */}
                <svg
                  className="cp-gold-beam-svg"
                  viewBox="0 0 460 700"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="cp-shine-gradient" x1="-100%" y1="-100%" x2="0%" y2="0%">
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
                    width="458"
                    height="698"
                    rx="18"
                    fill="none"
                    stroke="url(#cp-shine-gradient)"
                    className="cp-gold-beam-rect"
                  />
                </svg>

                {isSubmitted ? (
                  <div className="cp-success-box">
                    <div className="cp-success-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <h3 className="cp-success-head">Thank You!</h3>
                    <p className="cp-success-text">
                      Your message has been received. Our team will get back to you shortly.
                    </p>
                    <button
                      type="button"
                      className="cp-submit-btn"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form className="cp-form" onSubmit={handleSubmit}>
                    <div className="cp-form-head">
                      <h2 className="cp-form-title">
                        Write <span className="cp-gold-text">to us</span>
                      </h2>
                      <div className="cp-form-title-line" />
                    </div>

                    {otpErrorMessage && (
                      <div className="cp-error-banner" style={{ color: '#e74c3c', fontSize: '13px', marginBottom: '12px', textAlign: 'center', background: '#fdf2f2', padding: '8px 12px', borderRadius: '6px', border: '1px solid #f8d7da' }}>
                        {otpErrorMessage}
                      </div>
                    )}

                    {/* Row 1: Full Name & Email */}
                    <div className="cp-form-row-2">
                      <div className="cp-field-wrap">
                        <UserIcon />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full Name*"
                          required
                          className="cp-input-field"
                        />
                      </div>
                      <div className="cp-field-wrap">
                        <MailIcon />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email*"
                          required
                          className="cp-input-field"
                        />
                      </div>
                    </div>

                    {/* Row 2: Mobile Number & OTP */}
                    <div className="cp-form-row-otp">
                      <div className="cp-field-wrap cp-phone-field">
                        <PhoneIcon />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Mobile Number*"
                          pattern="[0-9]{10}"
                          maxLength={10}
                          required
                          className="cp-input-field"
                        />
                        <button
                          type="button"
                          className="cp-otp-btn"
                          onClick={handleGetOtp}
                          disabled={otpState === 'sending' || otpState === 'verifying' || otpCountdown > 0 || !/^\d{10}$/.test(formData.phone)}
                        >
                          {otpState === 'sending' ? '...' : otpCountdown > 0 ? `${otpCountdown}s` : 'GET OTP'}
                        </button>
                      </div>
                      <div className="cp-field-wrap">
                        <input
                          type="text"
                          name="otp"
                          value={formData.otp}
                          onChange={handleChange}
                          placeholder="OTP*"
                          disabled={otpState === 'idle' || otpState === 'sending' || otpState === 'verifying'}
                          required
                          className="cp-input-field"
                        />
                      </div>
                    </div>

                    {/* Row 3: Select Service */}
                    <div className="cp-field-wrap cp-select-wrap">
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className={`cp-select-field ${!formData.service ? 'cp-placeholder-selected' : ''}`}
                      >
                        <option value="" disabled>Select Service*</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDownIcon />
                    </div>

                    {/* Row 4: Select State */}
                    <div className="cp-field-wrap cp-select-wrap">
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className={`cp-select-field ${!formData.state ? 'cp-placeholder-selected' : ''}`}
                      >
                        <option value="" disabled>Select State*</option>
                        {statesList.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                      <ChevronDownIcon />
                    </div>

                    {/* Row 5: Select City */}
                    <div className="cp-field-wrap cp-select-wrap">
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!formData.state}
                        required
                        className={`cp-select-field ${!formData.city ? 'cp-placeholder-selected' : ''}`}
                      >
                        <option value="" disabled>
                          {formData.state ? 'Select City / Branch*' : 'Select City (Select State First)*'}
                        </option>
                        {availableCities.map((ct) => (
                          <option key={ct} value={ct}>{ct}</option>
                        ))}
                      </select>
                      <ChevronDownIcon />
                    </div>

                    {/* Row 6: Message */}
                    <div className="cp-field-wrap cp-textarea-wrap">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Message*"
                        maxLength={500}
                        rows={3}
                        required
                        className="cp-textarea-field"
                      />
                      <span className="cp-char-counter">{formData.message.length}/500</span>
                    </div>

                    {/* Row 7: Submit CTA Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="cp-submit-btn"
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      <span className="cp-btn-arrow-circle">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* GOLDEN STATS RIBBON BANNER */}
        <HeroStats />

        {/* BRANCH LOCATOR SECTION */}
        <BranchLocator />
      </main>

      { !data?.hideFooter && <Footer /> }
    </>
  );
}
