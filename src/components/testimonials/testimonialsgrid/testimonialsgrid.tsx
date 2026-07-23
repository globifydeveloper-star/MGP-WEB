'use client';

import React, { useState } from 'react';
import './testimonialsgrid.css';
import { TESTIMONIALS } from '@/lib/testimonialsData';

const TEXT_LIMIT = 220;

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

const StarIcon = () => (
  <svg className="testimonials-star-icon" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function TestimonialsGrid() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpanded = (name: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  return (
    <section className="testimonials-grid-section">
      <div className="container">
        <div className="testimonials-grid-header">
          <h2 className="testimonials-grid-title">Feedback about Gold Point</h2>
          <p className="testimonials-grid-subtitle">
            We&apos;re not a jewellery shop or an unorganised buyer. We are a dedicated, ISO-certified gold buying company — built on science, not guesswork.
          </p>
          <div className="testimonials-grid-divider" />
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((review) => {
            const isLong = review.text.length > TEXT_LIMIT;
            const isExpanded = expanded.has(review.name);
            const displayText = isLong && !isExpanded
              ? review.text.slice(0, TEXT_LIMIT).trimEnd() + '…'
              : review.text;

            return (
              <div className="testimonials-card" key={review.name}>
                <div className="testimonials-card-swirl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/feedback_bg.png" alt="" className="testimonials-card-swirl-img" />
                </div>

                <span className="testimonials-quote-mark">&ldquo;</span>

                <div className="testimonials-card-header">
                  {review.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={review.photo}
                      alt={review.name}
                      className="testimonials-avatar-photo"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="testimonials-avatar" style={review.photo ? { display: 'none' } : undefined}>
                    {getInitials(review.name)}
                  </div>
                  <div className="testimonials-card-identity">
                    <h4 className="testimonials-reviewer-name">{review.name}</h4>
                    <p className="testimonials-reviewer-loc">{review.location}</p>
                  </div>
                </div>

                <div className="testimonials-stars">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>

                <p className="testimonials-text">
                  &ldquo;{displayText}&rdquo;
                </p>

                {isLong && (
                  <button
                    type="button"
                    className="testimonials-readmore-btn"
                    onClick={() => toggleExpanded(review.name)}
                  >
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
