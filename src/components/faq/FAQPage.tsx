'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import BranchLocator from '@/components/home/BranchLocator/BranchLocator';
import type { FAQ } from '@/lib/strapi';
import './FAQPage.css';

export default function FAQPage({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const faqItems = useMemo(
    () => faqs.map((faq) => ({ ...faq, category: faq.category?.trim() || 'General' })),
    [faqs]
  );
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(faqItems.map((faq) => faq.category)))],
    [faqItems]
  );
  const filteredFaqs = useMemo(() => {
    const search = searchQuery.toLowerCase();
    return faqItems.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesCategory && (
        item.question.toLowerCase().includes(search) || item.answer.toLowerCase().includes(search)
      );
    });
  }, [faqItems, searchQuery, selectedCategory]);

  const toggleFAQ = (id: number) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <main className="faq-page">
      <section className="faq-hero-banner">
        <div className="faq-hero-bg-pattern" aria-hidden="true" />
        <div className="container faq-hero-text-container">
          <h1 className="faq-hero-heading">
            Frequently Asked <br />
            <span className="faq-gold-text">Questions.</span>
          </h1>
          <p className="faq-hero-lead">
            Have questions about selling gold, valuation process, or branch visits? <br />
            Find clear, transparent answers to help you sell your gold with total confidence.
          </p>
        </div>
      </section>

      <section className="faq-content-section">
        <div className="container faq-container">
          <div className="faq-filter-bar">
            <div className="faq-search-box">
              <svg className="faq-search-icon" viewBox="0 0 24 24" fill="none" stroke="#7A899E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search your question here..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="faq-search-input"
              />
              {searchQuery && (
                <button type="button" className="faq-clear-btn" onClick={() => setSearchQuery('')}>
                  ×
                </button>
              )}
            </div>

            <div className="faq-category-pills">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`faq-pill ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setOpenIndex(null);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="faq-accordion-list">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openIndex === faq.id;
                return (
                  <div key={faq.id} className={`faq-accordion-card ${isOpen ? 'faq-card-open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => toggleFAQ(faq.id)}
                      aria-expanded={isOpen}
                    >
                      <div className="faq-q-left">
                        <span className="faq-cat-badge">{faq.category}</span>
                        <h3 className="faq-question-text">{faq.question}</h3>
                      </div>
                      <span className="faq-toggle-icon">
                        <svg
                          className={`faq-arrow-svg ${isOpen ? 'faq-rotate' : ''}`}
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

                    <div className={`faq-answer-wrapper ${isOpen ? 'faq-expanded' : ''}`}>
                      <div className="faq-answer-content">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="faq-no-results">
                <p>No questions found matching your search query.</p>
                <button
                  type="button"
                  className="faq-reset-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                >
                  View All FAQs
                </button>
              </div>
            )}
          </div>

          <div className="faq-cta-card">
            <div className="faq-cta-content">
              <h3 className="faq-cta-title">Still have questions?</h3>
              <p className="faq-cta-subtitle">
                Can&apos;t find the answer you&apos;re looking for? Please write to us or call our toll-free customer support team.
              </p>
            </div>
            <div className="faq-cta-buttons">
              <Link href="/contact-us" className="faq-cta-primary-btn">
                Contact Us
              </Link>
              <a href="tel:18001021616" className="faq-cta-secondary-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                1800 102 1616
              </a>
            </div>
          </div>
        </div>
      </section>

      <BranchLocator />
    </main>
  );
}
