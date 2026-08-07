'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BranchLocator from '@/components/home/BranchLocator/BranchLocator';
import faqHeroBg from '@/assets/images/faqimg.png';
import './FAQPage.css';

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    category: 'General',
    question: 'Why Should I Choose Muthoot Gold Point to Sell my Gold?',
    answer: 'We are not a jewellery shop or an unorganised buyer. We are a dedicated, ISO-certified gold buying company — built on science, not guesswork. With a legacy of over 133+ years, Muthoot Gold Point offers complete transparency, 100% accurate XRF scientific purity evaluation in front of you, and instant spot payment.'
  },
  {
    id: 2,
    category: 'Payment & Process',
    question: 'How Much Do Gold Buyers Pay For Gold?',
    answer: 'Payout is calculated strictly based on live gold market rates, net weight measured on calibrated high-precision balances, and exact purity percentage analyzed via XRF technology. At Muthoot Gold Point, you get the maximum value for your gold with zero hidden deductions.'
  },
  {
    id: 3,
    category: 'Valuation & Purity',
    question: 'How Is Valuation Done And How Long Does It Take?',
    answer: 'Valuation is conducted right in front of you using advanced X-Ray Fluorescence (XRF) machines that determine exact gold purity down to 0.01% without damaging your jewellery. Dirt and impurities are first ultrasonic cleaned, and the entire process takes less than 15 minutes.'
  },
  {
    id: 4,
    category: 'Valuation & Purity',
    question: 'How Is Gold Price Per Gram Calculated?',
    answer: 'The price per gram is calculated by multiplying the current live market rate of gold by the net weight of pure gold contained in your ornament (factoring in the karat rating: 24K, 22K, 18K, etc.).'
  },
  {
    id: 5,
    category: 'Documents Required',
    question: 'Do I need any documents for selling my jewelry?',
    answer: 'Yes, as per Government regulations & RBI guidelines for gold transactions, customers must present a valid government-issued Photo ID (Aadhaar Card, PAN Card, Passport, or Voter ID) along with address proof.'
  },
  {
    id: 6,
    category: 'Payment & Process',
    question: 'How quickly will I receive payment after valuation?',
    answer: 'Payment is processed immediately after you accept the valuation quote. For amounts up to ₹10,000, cash can be handed over instantly. For higher amounts, direct IMPS/NEFT transfer is credited directly into your bank account within minutes.'
  },
  {
    id: 7,
    category: 'General',
    question: 'Can I sell gold coins or gold bars at Muthoot Gold Point?',
    answer: 'Yes, we purchase all forms of gold including gold jewellery, scrap gold, gold coins, and gold bars regardless of quantity or condition.'
  },
  {
    id: 8,
    category: 'Documents Required',
    question: 'Can someone else sell my gold on my behalf?',
    answer: 'The gold owner must be physically present with their original photo ID proof. If selling on behalf of a family member, an authorization letter along with both parties\' ID proofs is required.'
  }
];

const CATEGORIES = ['All', 'General', 'Valuation & Purity', 'Payment & Process', 'Documents Required'];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleFAQ = (id: number) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <>
      <Navbar />

      <main className="faq-page">
        {/* HERO BANNER - Exact size and style matching Contact Page */}
        <section className="faq-hero-banner">
          <div className="faq-hero-bg-wrapper">
            <Image
              src={faqHeroBg}
              alt="Muthoot Gold Point Frequently Asked Questions"
              fill
              priority
              className="faq-hero-img"
            />
            <div className="faq-hero-overlay" />
          </div>

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

        {/* MAIN FAQ CONTENT SECTION */}
        <section className="faq-content-section">
          <div className="container faq-container">
            {/* Search & Category Filter Header */}
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="faq-search-input"
                />
                {searchQuery && (
                  <button type="button" className="faq-clear-btn" onClick={() => setSearchQuery('')}>
                    ✕
                  </button>
                )}
              </div>

              <div className="faq-category-pills">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`faq-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setOpenIndex(null);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion FAQ List */}
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

            {/* Still Have Questions CTA */}
            <div className="faq-cta-card">
              <div className="faq-cta-content">
                <h3 className="faq-cta-title">Still have questions?</h3>
                <p className="faq-cta-subtitle">
                  Can’t find the answer you’re looking for? Please write to us or call our toll-free customer support team.
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

        {/* BRANCH LOCATOR */}
        <BranchLocator />
      </main>

      <Footer />
    </>
  );
}
