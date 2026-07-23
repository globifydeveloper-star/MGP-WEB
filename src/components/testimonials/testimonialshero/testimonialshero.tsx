import React from 'react';
import './testimonialshero.css';

export default function TestimonialsHero() {
  return (
    <section className="testimonials-hero-section">
      <div className="testimonials-hero-bg-pattern" aria-hidden="true" />

      <div className="container">
        <div className="testimonials-hero">
          <span className="testimonials-hero-subtitle">Customer Stories</span>
          <h1 className="testimonials-hero-title">
            What Our Customers <br />
            <span className="gold-text">Say About Us</span>
          </h1>
          <p className="testimonials-hero-desc">
            Real experiences from real customers who trusted Muthoot Gold Point with their gold — backed by transparent valuation, fair pricing, and courteous service.
          </p>
        </div>
      </div>
    </section>
  );
}
