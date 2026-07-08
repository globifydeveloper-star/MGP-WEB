'use client';

import React, { useState } from 'react';
import './FAQ.css';

const faqs = [
  {
    question: 'What documents are required to sell gold at Muthoot Goldpoint?',
    answer: 'To ensure legal compliance and safety, you need to provide a valid photo ID (PAN Card, Aadhaar Card, Passport, or Voter ID), proof of address, and ownership declaration for the gold ornaments being sold.'
  },
  {
    question: 'Do you charge any testing or melting fees?',
    answer: 'We do not charge any fees for initial weight checks or XRF spectrometer testing. If melting is required, it is done with your prior consent. Any minor melting losses are standard, but the process itself is fully transparent and visible to you.'
  },
  {
    question: 'How is the final gold rate determined?',
    answer: 'The payout rate is based on the live market price of gold at that exact time, adjusted for the purity karat value (24K, 22K, 18K, etc.) and the net weight of your gold ornaments, excluding stones and dust.'
  },
  {
    question: 'Can I sell gold that is currently pledged with another financier or bank?',
    answer: 'Yes! We specialise in releasing pledged gold. We will accompany you or pay the required loan amount directly to the bank/financier on your behalf to release your gold. We then evaluate it and pay you the remaining balance value instantly.'
  },
  {
    question: 'How will I receive the payment?',
    answer: 'Payment is transferred instantly to your verified bank account via IMPS/NEFT. For smaller amounts (as per current regulatory limits), cash payments can also be made.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-root faq-section" id="faq">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Got Questions?</span>
          <h2 className="section-title">
            Frequently Asked <span className="gold-text">Questions</span>
          </h2>
          <p className="section-desc">
            Find answers to common questions regarding gold valuation, payment schemes, and release of pledged gold.
          </p>
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item glass-panel ${isOpen ? 'active' : ''}`}>
                <button 
                  className="faq-question-btn" 
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-toggle-icon">
                    <svg 
                      className={`faq-arrow-svg ${isOpen ? 'rotate-180' : ''}`}
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                <div className={`faq-answer-wrapper ${isOpen ? 'expanded' : ''}`}>
                  <div className="faq-answer-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
