'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BranchLocator from '@/components/home/BranchLocator/BranchLocator';
import './privacy-policy.css';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="privacy-page-root">
        {/* Main Content Section (No Hero Banner) */}
        <section className="privacy-content-section">
          <div className="container privacy-content-container">

            {/* Simple Clean Header */}
            <div className="privacy-header-simple">
              <div className="privacy-badge-simple">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Legal &amp; Data Security
              </div>
              <h1 className="privacy-title-simple">
                Privacy <span className="privacy-gold-text">Policy</span>
              </h1>
              <p className="privacy-desc-simple">
                Your privacy is paramount to us at Muthoot Gold Point. Learn how we collect, safeguard, and responsibly process your personal information.
              </p>
              <div className="privacy-header-line" />
            </div>

            {/* Introduction Banner */}
            <div className="privacy-intro-box">
              <div className="privacy-intro-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F1B933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <div className="privacy-intro-text">
                <h3 className="privacy-intro-title">Commitment to Data Transparency</h3>
                <p className="privacy-intro-desc">
                  Muthoot Gold Point (a unit of Muthoot Exim Private Limited) is committed to preserving the trust and confidentiality of our visitors and customers. This policy details our online privacy practices.
                </p>
              </div>
            </div>

            {/* 1. What Information Do We Collect */}
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
                We collect information from you when you register on our site, place an order, subscribe to our newsletter, respond to a survey, or fill out a form. When ordering or registering on our site, as appropriate, you may be asked to enter your name, email address, mailing address, and phone number.
              </p>
            </article>

            {/* 2. What Do We Use Your Information For */}
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
                    <p>Your information helps us to better respond to your individual needs and preferences.</p>
                  </div>
                </li>

                <li className="privacy-use-item">
                  <div className="privacy-use-bullet">✓</div>
                  <div className="privacy-use-content">
                    <h4>To improve our website</h4>
                    <p>We continually strive to improve our website offerings based on the feedback we receive from you.</p>
                  </div>
                </li>

                <li className="privacy-use-item">
                  <div className="privacy-use-bullet">✓</div>
                  <div className="privacy-use-content">
                    <h4>To improve customer service</h4>
                    <p>Your information helps us to more effectively respond to your customer service requests and support needs.</p>
                  </div>
                </li>

                <li className="privacy-use-item">
                  <div className="privacy-use-bullet">✓</div>
                  <div className="privacy-use-content">
                    <h4>To process transactions</h4>
                    <p>Your information, whether public or private, will not be sold, exchanged, transferred, or given to any other company without your consent, other than for delivering the purchased service.</p>
                  </div>
                </li>

                <li className="privacy-use-item">
                  <div className="privacy-use-bullet">✓</div>
                  <div className="privacy-use-content">
                    <h4>To administer site features</h4>
                    <p>To conduct promotions, customer satisfaction surveys, market analysis, or other interactive features.</p>
                  </div>
                </li>

                <li className="privacy-use-item">
                  <div className="privacy-use-bullet">✓</div>
                  <div className="privacy-use-content">
                    <h4>To send periodic updates</h4>
                    <p>The email address you provide may be used to send transaction updates, respond to inquiries, or deliver relevant company news.</p>
                  </div>
                </li>
              </ul>
            </article>

            {/* 3. How Do We Protect Your Information */}
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
                We implement a variety of stringent security measures to maintain the safety of your personal information when you enter, submit, or access your data. All sensitive communications are transmitted via Secure Socket Layer (SSL) technology.
              </p>
            </article>

            {/* 4. Do We Use Cookies */}
            <article className="privacy-card">
              <div className="privacy-card-header">
                <div className="privacy-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                    <circle cx="8.5" cy="8.5" r="1" fill="currentColor" />
                    <circle cx="16" cy="15.5" r="1" fill="currentColor" />
                    <circle cx="12" cy="12" r="1" fill="currentColor" />
                  </svg>
                </div>
                <h2 className="privacy-card-title">Do we use cookies?</h2>
              </div>
              <p className="privacy-card-text">
                Yes. Cookies are small files transferred to your computer’s hard drive through your Web browser (if allowed) enabling site systems to recognize your browser and remember key preferences. We use cookies to aggregate site traffic analytics and offer enhanced web experiences in the future.
              </p>
            </article>

            {/* 5. Disclosure to Outside Parties */}
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
                We do not sell, trade, or otherwise transfer your personally identifiable information to external parties. This does not include trusted third parties who assist us in operating our website or conducting business, provided they agree to keep this information strictly confidential. We may also release information when required by law or regulatory bodies.
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
                This online privacy policy applies exclusively to information collected through our official website and does not apply to offline information collection practices.
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
                By accessing and using our website, you consent to our online privacy policy and terms of service.
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
                If there are any questions regarding this privacy policy, you may reach out to us using the official details below:
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
                    <div className="contact-detail-label">Registered Office</div>
                    <div className="contact-detail-value">
                      Muthoot Exim Pvt Ltd. 40/7384 Muthoot Towers, M.G. Road, Ernakulam, Kerala - 682035
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
                    <div className="contact-detail-label">Email Support</div>
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
                    <div className="contact-detail-label">Phone Support</div>
                    <div className="contact-detail-value">
                      <a href="tel:04842351481">0484 2351481</a> / <a href="tel:18001021616">1800 102 1616</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="privacy-cta-wrap">
                <Link href="/contact-us" className="privacy-cta-btn">
                  Write To Us Directly
                </Link>
              </div>
            </article>

          </div>
        </section>

        {/* BRANCH LOCATOR */}
        <BranchLocator />
      </main>

      <Footer />
    </>
  );
}
