'use client';

import React from 'react';
import Link from 'next/link';
import './TestimonialsCTA.css';

interface TestimonialsCTAProps {
  onSellGoldClick: () => void;
}

export default function TestimonialsCTA({ onSellGoldClick }: TestimonialsCTAProps) {
  return (
    <section className="tcta-section">
      <div className="container tcta-inner">
        <h2 className="tcta-title">Ready to Join Our Happy Customers?</h2>
        <p className="tcta-subtext">
          Experience the same transparent, fair, and trusted gold valuation for yourself.
        </p>
        <div className="tcta-cta-row">
          <button type="button" className="tcta-btn tcta-btn-dark" onClick={onSellGoldClick}>
            Sell Your Gold
          </button>
          <Link href="/#branches" className="tcta-btn tcta-btn-outline">
            Find a Branch
          </Link>
        </div>
      </div>
    </section>
  );
}
