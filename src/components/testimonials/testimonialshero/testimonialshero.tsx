import React from 'react';
import './testimonialshero.css';

interface TestimonialsHeroProps {
  subtitle?: string;
  title?: string;
  description?: string;
}

export default function TestimonialsHero({ subtitle, title, description }: TestimonialsHeroProps) {
  return (
    <section className="testimonials-hero-section">
      <div className="testimonials-hero-bg-pattern" aria-hidden="true" />

      <div className="container">
        <div className="testimonials-hero">
          <span className="testimonials-hero-subtitle">{subtitle || 'Customer Stories'}</span>
          <h1 className="testimonials-hero-title">
            {title ? (
              <span dangerouslySetInnerHTML={{ __html: title }} />
            ) : (
              <>What Our Customers <span className="gold-text">Say About Us</span></>
            )}
          </h1>
          <p className="testimonials-hero-desc" style={{ whiteSpace: 'pre-line' }}>
            {description || 'Real experiences from real customers who trusted Muthoot Gold Point with their gold — backed by transparent valuation, fair pricing, and courteous service.'}
          </p>
        </div>
      </div>
    </section>
  );
}
