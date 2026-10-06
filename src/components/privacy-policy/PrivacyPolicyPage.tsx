'use client';

import React from 'react';
import Link from 'next/link';
import './PrivacyPolicyPage.css';

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy-page-root">
      {/* Hero Header */}
      <section className="privacy-hero">
        <div className="privacy-hero-container">
          <nav className="privacy-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="privacy-breadcrumb-separator">/</span>
            <span>Privacy Policy</span>
          </nav>
          <h1 className="privacy-hero-title">
            Privacy <span>Policy</span>
          </h1>
          <p className="privacy-hero-subtitle">
            Understand how Muthoot Gold Point collects, uses, protects, and handles your personal information.
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <div className="privacy-content-wrapper">
        <article className="privacy-card">
          <div className="privacy-section">
            <h2 className="privacy-section-title">What information do we collect?</h2>
            <p className="privacy-text">
              We collect information from you when you register on our site, place an order, subscribe to our newsletter, respond to a survey, or fill out a form.
            </p>
            <p className="privacy-text">
              When ordering or registering on our site, as appropriate, you may be asked to enter your: name, email address, mailing address, and phone number.
            </p>
          </div>

          <div className="privacy-section">
            <h2 className="privacy-section-title">What do we use your information for?</h2>
            <p className="privacy-text">
              Any of the information we collect from you may be used in one of the following ways:
            </p>
            <ul className="privacy-list">
              <li className="privacy-list-item">
                <strong>To personalize your experience:</strong> Your information helps us to better respond to your individual needs.
              </li>
              <li className="privacy-list-item">
                <strong>To improve our website:</strong> We continually strive to improve our website offerings based on the information and feedback we receive from you.
              </li>
              <li className="privacy-list-item">
                <strong>To improve customer service:</strong> Your information helps us to more effectively respond to your customer service requests and support needs.
              </li>
              <li className="privacy-list-item">
                <strong>To process transactions:</strong> Your information, whether public or private, will not be sold, exchanged, transferred, or given to any other company for any reason whatsoever, without your consent, other than for the express purpose of delivering the purchased product or service requested.
              </li>
              <li className="privacy-list-item">
                <strong>To administer promotions:</strong> To administer a contest, promotion, survey, or other site feature.
              </li>
              <li className="privacy-list-item">
                <strong>To send periodic communications:</strong> The email address and phone number you provide may be used to send you information, updates, and respond to inquiries, and/or other requests or questions.
              </li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2 className="privacy-section-title">How do we protect your information?</h2>
            <p className="privacy-text">
              We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.
            </p>
          </div>

          <div className="privacy-section">
            <h2 className="privacy-section-title">Do we use cookies?</h2>
            <p className="privacy-text">
              Yes. Cookies are small files that a site or its service provider transfers to your computer’s hard drive through your Web browser (if you allow) that enables the site&apos;s or service provider&apos;s systems to recognize your browser and capture and remember certain information.
            </p>
            <p className="privacy-text">
              We use cookies to understand and save your preferences for future visits, keep track of advertisements, and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.
            </p>
          </div>

          <div className="privacy-section">
            <h2 className="privacy-section-title">Do we disclose any information to outside parties?</h2>
            <p className="privacy-text">
              We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
            </p>
            <p className="privacy-text">
              We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others&apos; rights, property, or safety. However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.
            </p>
          </div>

          <div className="privacy-section">
            <h2 className="privacy-section-title">Online Privacy Policy Only</h2>
            <p className="privacy-text">
              This online privacy policy applies only to information collected through our website and not to information collected offline.
            </p>
          </div>

          <div className="privacy-section">
            <h2 className="privacy-section-title">Your Consent</h2>
            <p className="privacy-text">
              By using our site, you consent to our website&apos;s privacy policy.
            </p>
          </div>

          <div className="privacy-section">
            <h2 className="privacy-section-title">Contacting Us / Write to Us</h2>
            <p className="privacy-text">
              If there are any questions regarding this privacy policy, you may contact us using the information below:
            </p>

            <div className="privacy-contact-box">
              <h3 className="privacy-contact-name">Muthoot Exim Pvt Ltd.</h3>
              <p className="privacy-contact-address">
                40/7384 Muthoot Towers, M.G. Road, Ernakulam, Kerala - 682035
              </p>
              <div className="privacy-contact-links">
                <a href="mailto:info@muthootexim.com" className="privacy-contact-link">
                  <svg className="privacy-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  info@muthootexim.com
                </a>
                <a href="tel:04842351481" className="privacy-contact-link">
                  <svg className="privacy-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  0484 2351481
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
