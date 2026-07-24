'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './privacy-policy.css';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="privacy-page-root">
        {/* Top Hero Banner */}
        <section className="privacy-hero">
          <div className="container">
            <div className="privacy-hero-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Legal Directives
            </div>
            <h1 className="privacy-hero-title">
              Privacy <span className="gold-text">Policy</span>
            </h1>
            <p className="privacy-hero-desc">
              Your privacy is paramount to us at Muthoot Gold Point. Learn how we handle, protect, and process your personal data.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <div className="privacy-content-container">
          
          {/* 1. Information Collection */}
          <article className="privacy-card">
            <div className="privacy-card-header">
              <div className="privacy-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h2 className="privacy-card-title">What information do we collect?</h2>
            </div>
            <p className="privacy-card-text">
              We collect information from you when you register on our site, place an order, subscribe to our newsletter, respond to a survey, fill out a form. When ordering or registering on our site, as appropriate, you may be asked to enter your: name, email address, mailing address, phone number.
            </p>
          </article>

          {/* 2. Information Usage */}
          <article className="privacy-card">
            <div className="privacy-card-header">
              <div className="privacy-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h2 className="privacy-card-title">What do we use your information for?</h2>
            </div>
            <p className="privacy-card-text">
              Any of the information we collect from you may be used in one of the following ways:
            </p>

            <ul className="privacy-use-list">
              <li className="privacy-use-item">
                <div className="privacy-use-bullet">✓</div>
                <div className="privacy-use-content">
                  <h4>To personalize your experience</h4>
                  <p>(Your information helps us to better respond to your individual needs)</p>
                </div>
              </li>

              <li className="privacy-use-item">
                <div className="privacy-use-bullet">✓</div>
                <div className="privacy-use-content">
                  <h4>To improve our website</h4>
                  <p>(We continually strive to improve our website offerings based on the information and feedback we receive from you)</p>
                </div>
              </li>

              <li className="privacy-use-item">
                <div className="privacy-use-bullet">✓</div>
                <div className="privacy-use-content">
                  <h4>To improve customer service</h4>
                  <p>(Your information helps us to more effectively respond to your customer service requests and support needs)</p>
                </div>
              </li>

              <li className="privacy-use-item">
                <div className="privacy-use-bullet">✓</div>
                <div className="privacy-use-content">
                  <h4>To process transactions</h4>
                  <p>Your information, whether public or private, will not be sold, exchanged, transferred, or given to any other company for any reason whatsoever, without your consent, other than for the express purpose of delivering the purchased product or service requested.</p>
                </div>
              </li>

              <li className="privacy-use-item">
                <div className="privacy-use-bullet">✓</div>
                <div className="privacy-use-content">
                  <h4>To administer a contest, promotion, survey or other site feature</h4>
                </div>
              </li>

              <li className="privacy-use-item">
                <div className="privacy-use-bullet">✓</div>
                <div className="privacy-use-content">
                  <h4>To send periodic emails</h4>
                  <p>The email address you provide may be used to send you information, respond to inquiries, and/or other requests or questions.</p>
                </div>
              </li>
            </ul>
          </article>

          {/* 3. Protection */}
          <article className="privacy-card">
            <div className="privacy-card-header">
              <div className="privacy-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h2 className="privacy-card-title">How do we protect your information?</h2>
            </div>
            <p className="privacy-card-text">
              We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.
            </p>
          </article>

          {/* 4. Cookies */}
          <article className="privacy-card">
            <div className="privacy-card-header">
              <div className="privacy-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                  <path d="M8.5 8.5v.01" />
                  <path d="M16 15.5v.01" />
                  <path d="M12 12v.01" />
                  <path d="M11 17v.01" />
                </svg>
              </div>
              <h2 className="privacy-card-title">Do we use cookies?</h2>
            </div>
            <p className="privacy-card-text">
              Yes (Cookies are small files that a site or its service provider transfers to your computer’s hard drive through your Web browser (if you allow) that enables the sites or service providers systems to recognize your browser and capture and remember certain information. We use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits, keep track of advertisements and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.)
            </p>
          </article>

          {/* 5. Outside Parties */}
          <article className="privacy-card">
            <div className="privacy-card-header">
              <div className="privacy-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h2 className="privacy-card-title">Do we disclose any information to outside parties?</h2>
            </div>
            <p className="privacy-card-text">
              We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others rights, property, or safety. However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.
            </p>
          </article>

          {/* 6. Online Privacy Policy Only */}
          <article className="privacy-card">
            <div className="privacy-card-header">
              <div className="privacy-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h2 className="privacy-card-title">Online Privacy Policy Only</h2>
            </div>
            <p className="privacy-card-text">
              This online privacy policy applies only to information collected through our website and not to information collected offline.
            </p>
          </article>

          {/* 7. Your Consent */}
          <article className="privacy-card">
            <div className="privacy-card-header">
              <div className="privacy-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 className="privacy-card-title">Your Consent</h2>
            </div>
            <p className="privacy-card-text">
              By using our site, you consent to our website&apos;s privacy policy.
            </p>
          </article>

          {/* 8. Contacting Us */}
          <article className="privacy-card privacy-contact-card">
            <div className="privacy-card-header">
              <div className="privacy-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h2 className="privacy-card-title">Contacting Us</h2>
            </div>
            <p className="privacy-card-text">
              If there are any questions regarding this privacy policy you may contact us using the information below:
            </p>

            <div className="contact-details-grid">
              <div className="contact-detail-box">
                <div className="contact-detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="contact-detail-label">Write to us</div>
                  <div className="contact-detail-value">
                    Muthoot Exim Pvt Ltd. 40/7384 Muthoot Towers, M.G. Road, Ernakulum, Kerala- 682035
                  </div>
                </div>
              </div>

              <div className="contact-detail-box">
                <div className="contact-detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="contact-detail-label">Email</div>
                  <div className="contact-detail-value">
                    <a href="mailto:info@muthootexim.com">info@muthootexim.com</a>
                  </div>
                </div>
              </div>

              <div className="contact-detail-box">
                <div className="contact-detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="contact-detail-label">Call</div>
                  <div className="contact-detail-value">
                    <a href="tel:04842351481">0484 2351481</a>
                  </div>
                </div>
              </div>
            </div>
          </article>

        </div>
      </main>

      <Footer />
    </>
  );
}
