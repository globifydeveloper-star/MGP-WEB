"use client";

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './FAQ.css';

interface FAQProps {
  faqs?: any[];
}

const DEFAULT_FAQS = [
  {
    question: 'Why Should I Choose Muthoot Gold Point to Sell my Gold?',
    answer: 'Citizenship by Investment (CBI) is a process where individuals can gain citizenship by  investing in a country. The process involves applying to a government-approved program, undergoing a background check, and, if approved, making an economic contribution and Citizenship by Investment (CBI) is a process where in'
  },
  {
    question: 'How Much Do Gold Buyers Pay For Gold?',
    answer: 'Dummy content — the payout is based on the live market rate of gold, adjusted for purity and the net weight of your ornaments. Will be replaced later.'
  },
  {
    question: 'How Is Valuation Done And How Long Does It Take?',
    answer: 'Dummy content — valuation is done using XRF technology right in front of you and typically takes only a few minutes to complete. Will be replaced later.'
  },
  {
    question: 'How Is Gold Price Per Gram Calculated?',
    answer: 'Dummy content — the price per gram is calculated using the live gold rate multiplied by the purity percentage of your gold. Will be replaced later.'
  },
  {
    question: 'Do I need any documents for selling my jewelry?',
    answer: 'Dummy content — yes, a valid photo ID and address proof are required to complete the sale. Will be replaced later.'
  }
];

export default function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const activeFaqs = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMouseEnter = (index: number) => {
    if (!showAll && index === 5) return; // don't open the 6th one if it's masked
    setOpenIndex(index);
  };

  return (
    <section className="faq2-section" id="faq">
      <div className="container">
        <div className="faq2-header">
          <h2 className="faq2-title">
            <span className="faq2-title-highlight">Frequently</span> Asked Questions
          </h2>
          <p className="faq2-subtitle">
            We&apos;re not an unorganised buyer. We are a dedicated gold buying company &ndash; Built on science, not guesswork.
          </p>
          <div className="faq2-divider" />
        </div>

        <div className="faq2-list">
          {activeFaqs.map((faq, idx) => {
            if (!showAll && idx > 5) return null;
            const isSixth = !showAll && idx === 5;
            const isOpen = openIndex === idx && !isSixth;

            return (
              <div 
                key={idx} 
                className={`faq2-item ${isOpen ? 'faq2-item-open' : ''} ${isSixth ? 'faq2-item-masked' : ''}`} 
                onMouseEnter={() => handleMouseEnter(idx)}
              >
                <button
                  type="button"
                  className="faq2-question-btn"
                  onClick={() => {
                    if (isSixth) setShowAll(true);
                    else toggleFAQ(idx);
                  }}
                  aria-expanded={isOpen}
                >
                  <span className="faq2-question-text">{faq.question}</span>
                  <span className="faq2-toggle-icon">
                    <svg
                      className={`faq2-arrow-svg ${isOpen ? 'faq2-rotate' : ''}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <div className={`faq2-answer-wrapper ${isOpen ? 'faq2-expanded' : ''}`}>
                  <div className="faq2-answer-inner">
                    <div className="faq2-answer-content prose" style={{ color: 'inherit' }}>
                      <ReactMarkdown>{faq.answer}</ReactMarkdown>
                    </div>
                  </div>
                </div>

                {isSixth && (
                  <div className="faq2-show-more-overlay">
                    <button className="faq2-show-more-btn" onClick={() => setShowAll(true)}>
                      Read More FAQs
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showAll && activeFaqs.length > 5 && (
          <div className="faq2-view-less-container">
            <button className="faq2-show-more-btn" onClick={() => {
              setShowAll(false);
              setOpenIndex(null); // Optional: close open FAQ
              
              // Scroll back up to the FAQ section so the user doesn't lose their place
              const faqEl = document.getElementById('faq');
              if (faqEl) faqEl.scrollIntoView({ behavior: 'smooth' });
            }}>
              View Less FAQs
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
