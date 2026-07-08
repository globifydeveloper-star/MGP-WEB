'use client';

import React from 'react';
import './Testimonials.css';

const reviews = [
  {
    name: 'Rajesh Kumar',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    text: 'I was skeptical about selling my pledged gold, but Muthoot Goldpoint made the entire process so easy. They paid the bank, released my gold, and gave me the balance money within an hour! Extremely transparent valuation.'
  },
  {
    name: 'Priya Sundaram',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
    text: 'Their XRF machine test was done in front of my eyes. No melting of gold was required just to test the karat value. The service was highly professional and I received a much better rate than local jewellers.'
  },
  {
    name: 'Sunita Deshmukh',
    location: 'Pune, Maharashtra',
    rating: 5,
    text: 'The Mobile Gold Van service is amazing. They came to my home, verified the weight and purity, and transferred the funds directly to my bank account instantly. Highly secure and highly recommended!'
  }
];

export default function Testimonials() {
  return (
    <section className="section-root testimonials-section" id="testimonials">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Customer Voices</span>
          <h2 className="section-title">
            What Our <span className="gold-text">Customers Say</span> About Us
          </h2>
          <p className="section-desc">
            Trust is our greatest asset. Over 5 lakh customers across India have experienced our scientific and honest gold buying service.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {reviews.map((review, idx) => (
            <div key={idx} className="review-card glass-panel">
              {/* Stars & Quote */}
              <div className="review-card-header">
                <div className="rating-stars">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <svg key={i} className="star-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span className="quote-icon">&ldquo;</span>
              </div>

              {/* Text */}
              <p className="review-text">{review.text}</p>

              {/* Reviewer Details */}
              <div className="review-card-footer">
                <h4 className="reviewer-name">{review.name}</h4>
                <p className="reviewer-loc">{review.location}</p>
                <div className="verified-badge">
                  <svg className="verified-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a.75.75 0 00-.708-.523H4.5a2 2 0 00-2 2v1.059a.75.75 0 00.523.708l3.473 1.157a.75.75 0 00.912-.912L6.267 3.455zM12 18a6 6 0 100-12 6 6 0 000 12zM9.543 9.402a.75.75 0 011.06 0l1.72 1.72 2.825-2.825a.75.75 0 011.06 1.06l-3.355 3.355a.75.75 0 01-1.06 0l-2.25-2.25a.75.75 0 010-1.06z" clipRule="evenodd"/>
                  </svg>
                  <span>Verified Customer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
