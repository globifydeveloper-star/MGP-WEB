'use client';

import React, { useMemo, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BRANCH_CONTACTS } from '@/lib/branchContactsData';
import './ContactPage.css';

interface RegisteredOfficeDetails {
  companyName: string;
  address?: string;
  phones?: string[];
  email?: string;
}

// Address/phone intentionally left blank — not published on the live site at
// time of writing. Confirm exact wording with the client before hardcoding.
const REGISTERED_OFFICE: RegisteredOfficeDetails = {
  companyName: 'MUTHOOT GOLD POINT',
};

const CONSENT_TEXT =
  'I authorize Muthoot Exim Pvt. Ltd. & other Muthoot Pappachan Group companies (including its Agents/representatives) to call/communicate with me on their product offerings/promotions through Telephone/Mobile/SMS/email ID.';

const PinIcon = () => (
  <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

/** Indian numbering plan: STD-code landlines are dialled with a leading 0, mobiles never are. */
function isLandline(phone: string): boolean {
  return phone.replace(/\D/g, '').startsWith('0');
}

export default function ContactPage() {
  const [consentChecked, setConsentChecked] = useState(false);
  const [selectedCity, setSelectedCity] = useState(BRANCH_CONTACTS[0].city);

  const selectedBranch = useMemo(
    () => BRANCH_CONTACTS.find((branch) => branch.city === selectedCity) ?? BRANCH_CONTACTS[0],
    [selectedCity]
  );

  const mobiles = selectedBranch.phones.filter((phone) => !isLandline(phone));
  const landlines = selectedBranch.phones.filter((phone) => isLandline(phone));

  return (
    <>
      <Navbar />

      <main>
        {/* 1. Page Header */}
        <section className="contact-header-section">
          <div className="container">
            <h1 className="contact-header-title">Contact Us</h1>
          </div>
        </section>

        {/* 2. Registered Office + Contact Form */}
        <section className="contact-info-section">
          <div className="container">
            <div className="contact-info-grid">
              <div className="contact-office-col">
                <div className="contact-office-card">
                  <h2 className="contact-office-heading">Registered Office</h2>
                  <p className="contact-office-name">{REGISTERED_OFFICE.companyName}</p>

                  {REGISTERED_OFFICE.address ? (
                    <p className="contact-office-address">{REGISTERED_OFFICE.address}</p>
                  ) : (
                    <p className="contact-office-pending">Address to be confirmed.</p>
                  )}

                  {REGISTERED_OFFICE.phones && REGISTERED_OFFICE.phones.length > 0 ? (
                    <div className="contact-office-row">
                      <PhoneIcon />
                      <span>{REGISTERED_OFFICE.phones.join(' | ')}</span>
                    </div>
                  ) : (
                    <p className="contact-office-pending">Phone number to be confirmed.</p>
                  )}

                  {REGISTERED_OFFICE.email && (
                    <div className="contact-office-row">
                      <MailIcon />
                      <span>{REGISTERED_OFFICE.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="contact-form-col">
                <div className="contact-form-card">
                  <h2 className="contact-form-title">Write to us</h2>

                  <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="contact-form-group">
                      <label htmlFor="contact-name" className="contact-form-label">Name</label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        required
                        placeholder="Your full name"
                        className="contact-form-input"
                      />
                    </div>

                    <div className="contact-form-group">
                      <label htmlFor="contact-email" className="contact-form-label">Email</label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        className="contact-form-input"
                      />
                    </div>

                    <div className="contact-form-group">
                      <label htmlFor="contact-phone" className="contact-form-label">Phone</label>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        className="contact-form-input"
                      />
                    </div>

                    <div className="contact-form-group">
                      <label htmlFor="contact-message" className="contact-form-label">Message</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        required
                        placeholder="How can we help you?"
                        className="contact-form-textarea"
                      />
                    </div>

                    <label className="contact-form-consent">
                      <input
                        type="checkbox"
                        checked={consentChecked}
                        onChange={(e) => setConsentChecked(e.target.checked)}
                        className="contact-form-consent-checkbox"
                      />
                      <span className="contact-form-consent-text">{CONSENT_TEXT}</span>
                    </label>

                    <button
                      type="submit"
                      className="contact-form-submit"
                      disabled={!consentChecked}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Branch Directory */}
        <section className="contact-branches-section">
          <div className="container">
            <div className="contact-branches-header">
              <h2 className="contact-branches-title">
                Visit Any of Our Branches to Sell Your Gold for Instant Cash
              </h2>
            </div>

            <div className="contact-chip-row" role="tablist" aria-label="Select a branch city">
              {BRANCH_CONTACTS.map((branch) => (
                <button
                  key={branch.city}
                  type="button"
                  role="tab"
                  aria-selected={selectedCity === branch.city}
                  className={`contact-chip ${selectedCity === branch.city ? 'contact-chip-active' : ''}`}
                  onClick={() => setSelectedCity(branch.city)}
                >
                  {branch.city}
                </button>
              ))}
            </div>

            <div className="contact-branch-card">
              <h3 className="contact-branch-city">{selectedBranch.city}</h3>

              {selectedBranch.address && (
                <div className="contact-branch-detail-row">
                  <PinIcon />
                  <div className="contact-branch-detail-text">
                    <span className="contact-branch-label">Address</span>
                    <span className="contact-branch-value">{selectedBranch.address}</span>
                  </div>
                </div>
              )}

              {mobiles.length > 0 && (
                <div className="contact-branch-detail-row">
                  <PhoneIcon />
                  <div className="contact-branch-detail-text">
                    <span className="contact-branch-label">Mobile</span>
                    <span className="contact-branch-value">
                      {mobiles.map((phone, i) => (
                        <React.Fragment key={phone}>
                          {i > 0 && ' | '}
                          <a href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</a>
                        </React.Fragment>
                      ))}
                    </span>
                  </div>
                </div>
              )}

              {landlines.length > 0 && (
                <div className="contact-branch-detail-row">
                  <PhoneIcon />
                  <div className="contact-branch-detail-text">
                    <span className="contact-branch-label">Landline</span>
                    <span className="contact-branch-value">
                      {landlines.map((phone, i) => (
                        <React.Fragment key={phone}>
                          {i > 0 && ' | '}
                          <a href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</a>
                        </React.Fragment>
                      ))}
                    </span>
                  </div>
                </div>
              )}

              {selectedBranch.emails.length > 0 && (
                <div className="contact-branch-detail-row">
                  <MailIcon />
                  <div className="contact-branch-detail-text">
                    <span className="contact-branch-label">Email</span>
                    <span className="contact-branch-value">
                      {selectedBranch.emails.map((email, i) => (
                        <React.Fragment key={email}>
                          {i > 0 && ' | '}
                          <a href={`mailto:${email}`}>{email}</a>
                        </React.Fragment>
                      ))}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
