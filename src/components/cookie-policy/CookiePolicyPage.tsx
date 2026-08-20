'use client';

import React from 'react';
import Link from 'next/link';
import './cookie-policy.css';

export default function CookiePolicyPage() {
  return (
    <>
      
      <main className="cookie-page-root">
        <div className="container cookie-doc-container">

          {/* Simple Clean Header */}
          <header className="cookie-header">
            <h1 className="cookie-main-title">
              Cookie <span className="gold-accent">Policy</span>
            </h1>
            <p className="cookie-sub-title">
              Muthoot Gold Point (Unit of Muthoot Exim Pvt. Ltd.)
            </p>
            <div className="cookie-meta-bar">
              <span>Last Updated: August 2026</span>
              <span className="dot">•</span>
              <span>Effective Date: Immediate</span>
            </div>
          </header>

          {/* Streamlined Policy Document Container */}
          <div className="cookie-doc-card">
            
            {/* Section 1: Overview */}
            <section className="cookie-section">
              <h2 className="cookie-section-title">1. Overview</h2>
              <p className="cookie-text">
                This Cookie Policy explains how Muthoot Gold Point uses cookies and similar web technologies when you visit our website. By using our website, you agree to the placement and use of cookies as described below.
              </p>
            </section>

            <hr className="cookie-divider" />

            {/* Section 2: What Are Cookies */}
            <section className="cookie-section">
              <h2 className="cookie-section-title">2. What Are Cookies?</h2>
              <p className="cookie-text">
                Cookies are small text files placed on your device by your web browser when you visit a website. They help the website function properly, recognize your device, and remember your choices for a better browsing experience.
              </p>
            </section>

            <hr className="cookie-divider" />

            {/* Section 3: Cookies We Use (Simple Clean Summary) */}
            <section className="cookie-section">
              <h2 className="cookie-section-title">3. Cookies We Use</h2>
              <p className="cookie-text">
                We keep our web tracking minimal and purpose-driven:
              </p>

              <div className="cookie-types-grid">
                <div className="cookie-type-box">
                  <h3 className="cookie-type-name">Essential Cookies</h3>
                  <p className="cookie-type-desc">
                    Required for core website security, page navigation, and request handling.
                  </p>
                </div>

                <div className="cookie-type-box">
                  <h3 className="cookie-type-name">Preference Cookies</h3>
                  <p className="cookie-type-desc">
                    Remember your selected city, state, or branch preference for quick access.
                  </p>
                </div>

                <div className="cookie-type-box">
                  <h3 className="cookie-type-name">Analytics Cookies</h3>
                  <p className="cookie-type-desc">
                    Help us measure website traffic performance and improve user service.
                  </p>
                </div>
              </div>
            </section>

            <hr className="cookie-divider" />

            {/* Section 4: Key Uses on Our Site */}
            <section className="cookie-section">
              <h2 className="cookie-section-title">4. How We Use Cookies</h2>
              <ul className="cookie-simple-list">
                <li><strong>Branch Locator:</strong> Saves your selected city/state so you can easily locate your nearest Muthoot branch.</li>
                <li><strong>Valuation Tool:</strong> Temporarily retains ornament calculations while you browse.</li>
                <li><strong>Form Protection:</strong> Prevents automated spam when submitting mobile appointment requests.</li>
              </ul>
            </section>

            <hr className="cookie-divider" />

            {/* Section 5: Managing Your Cookies */}
            <section className="cookie-section">
              <h2 className="cookie-section-title">5. Managing Cookies</h2>
              <p className="cookie-text">
                You can choose to disable or block cookies through your web browser settings at any time. However, disabling essential cookies may affect some website features (such as branch locator preferences).
              </p>
              <p className="cookie-note">
                To manage cookies, visit your browser settings under <em>Privacy &amp; Security</em>.
              </p>
            </section>

            <hr className="cookie-divider" />

            {/* Section 6: Contact */}
            <section className="cookie-section cookie-contact-section">
              <h2 className="cookie-section-title">6. Questions?</h2>
              <p className="cookie-text">
                If you have any questions regarding our cookie practices, please write to us at{' '}
                <a href="mailto:info@muthootexim.com" className="cookie-link">info@muthootexim.com</a> or call our Toll-Free support at{' '}
                <a href="tel:18001021616" className="cookie-link">1800 102 1616</a>.
              </p>
              <div className="cookie-contact-footer">
                <Link href="/contact-us" className="cookie-cta-simple">
                  Contact Support →
                </Link>
              </div>
            </section>

          </div>
        </div>
      </main>

          </>
  );
}
