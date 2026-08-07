'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BranchLocator from '@/components/home/BranchLocator/BranchLocator';
import './terms-of-service.css';

const SECTIONS = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'services', title: '2. Services Offered' },
  { id: 'eligibility', title: '3. Customer Eligibility & KYC' },
  { id: 'valuation', title: '4. Gold Valuation & Rates' },
  { id: 'payment', title: '5. Payouts & Discard Terms' },
  { id: 'intellectual', title: '6. Intellectual Property' },
  { id: 'liability', title: '7. Limitation of Liability' },
  { id: 'governing-law', title: '8. Governing Law & Jurisdiction' },
  { id: 'contact', title: '9. Contact & Inquiries' },
];

export default function TermsOfServicePage() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -110;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />

      <main className="terms-page-root">
        <div className="container terms-container">

          {/* Simple Clean Header */}
          <header className="terms-header">
            <div className="terms-badge">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              Legal Agreement &amp; Terms
            </div>
            <h1 className="terms-main-title">
              Terms of <span className="terms-gold-text">Service</span>
            </h1>
            <p className="terms-sub-title">
              Muthoot Gold Point (A Unit of Muthoot Exim Private Limited)
            </p>
            <div className="terms-meta-bar">
              <span>Last Revised: August 2026</span>
              <span className="dot">•</span>
              <span>Official Document</span>
            </div>
          </header>

          {/* Distinct 2-Column Layout (Sticky Index Left + Document Right) */}
          <div className="terms-grid">

            {/* Left Column: Sticky Index Navigation */}
            <aside className="terms-sidebar">
              <div className="terms-index-box">
                <h3 className="terms-index-heading">Quick Index</h3>
                <nav className="terms-index-nav">
                  {SECTIONS.map((sec) => (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className="terms-index-link"
                    >
                      {sec.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Right Column: Detailed Terms Document */}
            <article className="terms-doc-card">

              {/* 1. Acceptance of Terms */}
              <section id="acceptance" className="terms-section">
                <h2 className="terms-section-title">1. Acceptance of Terms</h2>
                <p className="terms-text">
                  Welcome to Muthoot Gold Point. By accessing, browsing, or utilizing our website (muthootgoldpoint.com), mobile appointment services, or visiting any of our branches PAN-India, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, please refrain from using our services.
                </p>
              </section>

              <hr className="terms-divider" />

              {/* 2. Services Offered */}
              <section id="services" className="terms-section">
                <h2 className="terms-section-title">2. Services Offered</h2>
                <p className="terms-text">
                  Muthoot Gold Point provides transparent, scientific gold buying services, including:
                </p>
                <ul className="terms-bullet-list">
                  <li>Evaluation and purchasing of gold ornaments, scrap gold, gold coins, and gold bars.</li>
                  <li>Scientific X-Ray Fluorescence (XRF) purity evaluation in front of customers.</li>
                  <li>Instant payout options up to regulatory limits via cash or direct bank transfer (IMPS/NEFT).</li>
                  <li>Doorstep mobile van appointment bookings in designated service cities.</li>
                </ul>
              </section>

              <hr className="terms-divider" />

              {/* 3. Customer Eligibility & KYC Verification */}
              <section id="eligibility" className="terms-section">
                <h2 className="terms-section-title">3. Customer Eligibility &amp; KYC Verification</h2>
                <p className="terms-text">
                  To transact with Muthoot Gold Point, customers must fulfill the following mandatory requirements in accordance with RBI guidelines and Indian anti-money laundering regulations:
                </p>
                <ul className="terms-bullet-list">
                  <li><strong>Age Requirement:</strong> Customers must be at least 18 years of age and legally competent to enter into a binding contract.</li>
                  <li><strong>Valid Identification:</strong> Customers must present original Government-issued photo ID proof (Aadhaar Card, PAN Card, Passport, or Voter ID).</li>
                  <li><strong>Address Proof:</strong> Valid proof of current residential address matching the transaction details.</li>
                  <li><strong>Ownership Declaration:</strong> The customer guarantees that they are the rightful owner of the gold ornaments or authorized by the owner with an explicit power of attorney.</li>
                </ul>
              </section>

              <hr className="terms-divider" />

              {/* 4. Gold Valuation & Live Rates */}
              <section id="valuation" className="terms-section">
                <h2 className="terms-section-title">4. Gold Valuation &amp; Live Rates</h2>
                <p className="terms-text">
                  Valuation is conducted with complete transparency using certified XRF machines. Payout quotes are generated based on real-time live gold market rates multiplied by net pure gold weight.
                </p>
                <div className="terms-highlight-box">
                  <p>
                    <strong>Quote Validity:</strong> Valuation quotes are generated based on real-time live market fluctuations and are valid only at the time of calculation during your branch or mobile appointment visit.
                  </p>
                </div>
              </section>

              <hr className="terms-divider" />

              {/* 5. Payouts & Discard Terms */}
              <section id="payment" className="terms-section">
                <h2 className="terms-section-title">5. Payouts &amp; Discard Terms</h2>
                <p className="terms-text">
                  Upon customer acceptance of the valuation quote, payments are processed immediately:
                </p>
                <ul className="terms-bullet-list">
                  <li>Cash payments up to ₹10,000 as per Income Tax limits.</li>
                  <li>Immediate IMPS / NEFT bank transfer into the customer&apos;s verified bank account for higher amounts.</li>
                  <li>Once payment is executed and receipt signed, the transaction is final and non-reversible.</li>
                </ul>
              </section>

              <hr className="terms-divider" />

              {/* 6. Intellectual Property */}
              <section id="intellectual" className="terms-section">
                <h2 className="terms-section-title">6. Intellectual Property</h2>
                <p className="terms-text">
                  All contents of this website, including logos, trademarks, text, graphics, icons, images, and software, are the property of Muthoot Exim Private Limited and protected under Indian intellectual property laws. Unauthorized copying or redistribution is strictly prohibited.
                </p>
              </section>

              <hr className="terms-divider" />

              {/* 7. Limitation of Liability */}
              <section id="liability" className="terms-section">
                <h2 className="terms-section-title">7. Limitation of Liability</h2>
                <p className="terms-text">
                  Muthoot Gold Point strives to maintain accurate market rates and branch information. However, we are not liable for temporary website interruptions, network delays during bank payouts, or external third-party links.
                </p>
              </section>

              <hr className="terms-divider" />

              {/* 8. Governing Law & Jurisdiction */}
              <section id="governing-law" className="terms-section">
                <h2 className="terms-section-title">8. Governing Law &amp; Jurisdiction</h2>
                <p className="terms-text">
                  These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising out of these terms or services shall be subject to the exclusive jurisdiction of the competent courts in Ernakulam / Kochi, Kerala, India.
                </p>
              </section>

              <hr className="terms-divider" />

              {/* 9. Contact & Inquiries */}
              <section id="contact" className="terms-section terms-contact-section">
                <h2 className="terms-section-title">9. Contact &amp; Legal Inquiries</h2>
                <p className="terms-text">
                  For formal legal communications or service queries, please contact our registered office:
                </p>

                <div className="terms-contact-card">
                  <p><strong>Muthoot Exim Private Limited</strong></p>
                  <p>40/7384 Muthoot Towers, M.G. Road, Ernakulam, Kerala - 682035</p>
                  <p>Email: <a href="mailto:info@muthootexim.com">info@muthootexim.com</a> | Toll-Free: <a href="tel:18001021616">1800 102 1616</a></p>
                  <div className="terms-cta-wrap">
                    <Link href="/contact-us" className="terms-cta-btn">
                      Contact Legal Team →
                    </Link>
                  </div>
                </div>
              </section>

            </article>
          </div>
        </div>

        {/* BRANCH LOCATOR */}
        <BranchLocator />
      </main>

      <Footer />
    </>
  );
}
