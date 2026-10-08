"use client";

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { HOME_FAQS } from '@/lib/faqsData';
import './FAQ.css';

interface FAQProps {
  faqs?: any[];
}

const DEFAULT_FAQS = HOME_FAQS;

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
