'use client';

import React from 'react';
import Link from 'next/link';
import './TestimonialsCTA.css';

interface TestimonialsCTAProps {
  onSellGoldClick: () => void;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function TestimonialsCTA({
  onSellGoldClick,
  title,
  subtitle,
  buttonText,
  buttonLink,
}: TestimonialsCTAProps) {
  return (
    <section className="tcta-section">
      <div className="container tcta-inner">
        <h2 className="tcta-title">{title || 'Ready to Join Our Happy Customers?'}</h2>
        <p className="tcta-subtext">
          {subtitle || 'Experience the same transparent, fair, and trusted gold valuation for yourself.'}
        </p>
        <div className="tcta-cta-row">
          <button type="button" className="tcta-btn tcta-btn-dark" onClick={onSellGoldClick}>
            {buttonText || 'Sell Your Gold'}
          </button>
          <a href={buttonLink || '/#branches'} className="tcta-btn tcta-btn-outline">
            Find a Branch
          </a>
        </div>
      </div>
    </section>
  );
}
