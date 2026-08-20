'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import './GoldRateFAQ.css';
import { GOLD_RATE_FAQS } from '@/lib/goldRateFaqs';

interface FaqItem {
  question: string;
  answer: string;
}

interface GoldRateFAQProps {
  faqs?: FaqItem[];
}

export default function GoldRateFAQ({ faqs }: GoldRateFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const finalFaqs = (faqs && faqs.length > 0) ? faqs : GOLD_RATE_FAQS;

  return (
    <section className="grf-section" id="faq">
      <div className="container grf-inner">
        <div className="grf-list-col">
          <h2 className="grf-title">Frequently Asked Questions</h2>

          <div className="grf-list">
            {finalFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div className={`grf-item ${isOpen ? 'grf-item-open' : ''}`} key={faq.question}>
                  <button
                    type="button"
                    className="grf-question-btn"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="grf-question-text">{faq.question}</span>
                    <span className="grf-toggle-icon">
                      <svg
                        className={`grf-arrow-svg ${isOpen ? 'grf-rotate' : ''}`}
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

                  <div className={`grf-answer-wrapper ${isOpen ? 'grf-expanded' : ''}`}>
                    <div className="grf-answer-content">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


      </div>
    </section>
  );
}
