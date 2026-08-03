'use client';

import React, { useEffect, useRef, useState } from 'react';
import './Feedback.css';
import { TESTIMONIALS as REVIEWS } from '@/lib/testimonialsData';

const TEXT_LIMIT = 160;

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

const StarIcon = () => (
  <svg className="feedback-star-icon" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

interface FeedbackProps {
  reviews?: any[];
}

const DEFAULT_REVIEWS = [
  {
    name: 'SACHIN JONEJA',
    location: 'Mumbai',
    rating: 5,
    photo: '/sachin-joneja.png',
    text: 'My mother and I have sold some very old gold over the past few months to three different organizations. One was a branch of an old established famous Jeweller in Mumbai while two were only buyers of gold. Of these, our experience with Muthoot Gold Point has been by far the best. We were impressed with both the completely transparent and speedy procedure as well as the courteous and knowledgeable staff.',
  },
  {
    name: 'Basvaraju',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    photo: '/Basvaraju.png',
    text: 'I wanted to sell some gold jewellery to pay for the construction of my house – my contractor had cheated us. I saw the MGP advertisement on a government bus and decided to meet them as I was in great need. My earlier experience of selling the gold had not been good. But, the salesperson at MGP sat and explained each process of how they value the gold. I was totally impressed by their transparency and detailing.',
  },
  {
    name: 'Srinarayan',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
    photo: '/Srinarayan.png',
    text: 'I can never forget Muthoot Gold Point. If I had not come to know about MGP at the right time, I could have lost everything. In family and business, money is tight, when you need it the most. At these times, if there is a provision to sell your gold, plot of land, house and silver, then you can meet your difficulties easily. In my experience, MGP is the best solution for all those people looking to sell their gold and silver.',
  },
  {
    name: 'Vijay Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'I was looking to pay the last year’s fee for my eldest son’s engineering college, I did not have enough money. My wife asked me to sell all our gold jewellery and coins we had collected over the years. I went to some local jewellers and was shocked – they offered less than half of the value of the gold. My wife’s kitty friend suggested Muthoot Gold Point. Since I had already been to more than 15 or more jewellers and buyers, I decided to try them also. I was very surprised to know about how they value.',
  },
  {
    name: 'AMAR SINGH',
    location: 'Delhi',
    rating: 5,
    photo: '/AMAR SINGH.png',
    text: "When my father needed an emergency by-pass, I took all the jewellery and sold gold for cash, I had to MGP, straight away. I had dealt with them earlier also. The first time I took a loan was from them to set up my parlor four years ago. Luckily, i was able to repay the money and get my gold back. I went to them as soon as the doctor told me and within minutes, they had assessed the true value of the gold. They gave me a receipt and transferred the money to my account. Thanks to their operation!",
  },
];

export default function Feedback({ reviews }: FeedbackProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [jumpingBack, setJumpingBack] = useState(false);

  const activeReviews = reviews && reviews.length > 0
    ? reviews.map((r) => ({
        name: r.customerName,
        location: r.location || '',
        rating: r.rating ?? 5,
        photo: r.profilePicture,
        text: r.testimonialText
      }))
    : DEFAULT_REVIEWS;

  const maxIndex = activeReviews.length - 1;
  const loopedReviews = [...activeReviews, ...activeReviews];

  // Auto-advance left, one card at a time, looping endlessly.
  useEffect(() => {
    if (activeReviews.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, [activeReviews.length]);

  // Once we've slid onto the duplicated first card, snap back to the
  // real first card with no transition so the loop looks seamless.
  useEffect(() => {
    if (index !== activeReviews.length) return;
    const resetTimer = setTimeout(() => {
      setJumpingBack(true);
      setIndex(0);
    }, 1150);
    return () => clearTimeout(resetTimer);
  }, [index, activeReviews.length]);

  useEffect(() => {
    if (!jumpingBack) return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setJumpingBack(false));
    });
    return () => cancelAnimationFrame(raf);
  }, [jumpingBack]);

  useEffect(() => {
    function recompute() {
      const track = trackRef.current;
      if (!track) return;
      const firstCard = track.children[0] as HTMLElement | undefined;
      if (!firstCard) return;
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap || '0');
      const step = firstCard.getBoundingClientRect().width + gap;
      setOffset(index * step);
    }

    recompute();
    window.addEventListener('resize', recompute);
    return () => window.removeEventListener('resize', recompute);
  }, [index]);

  const goNext = () => setIndex((prev) => Math.min(prev + 1, maxIndex));
  const goPrev = () => setIndex((prev) => Math.max(prev - 1, 0));

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
    <section id="testimonials" className="feedback-section">
      <div className="container">
        <div className="feedback-header">
          <h2 className="feedback-title-sub">What&apos;s our satisfied customers</h2>
          <h2 className="feedback-title-main">Feedback about Gold Point</h2>
          <p className="feedback-subtitle">
            We&apos;re not a jewellery shop or an unorganised buyer. We are a dedicated, ISO-certified gold buying company — built on science, not guesswork.
          </p>
          <div className="feedback-divider" />
        </div>

        <div className="feedback-slider-wrap">
          <div className="feedback-viewport">
            <div
              className="feedback-track"
              ref={trackRef}
              style={{
                transform: `translateX(-${offset}px)`,
                transition: jumpingBack ? 'none' : undefined,
              }}
            >
              {loopedReviews.map((review, idx) => {
                const isLong = review.text.length > TEXT_LIMIT;
                const isExpanded = expanded.has(review.name);
                const displayText = isLong && !isExpanded
                  ? review.text.slice(0, TEXT_LIMIT).trimEnd() + '…'
                  : review.text;

                return (
                  <div className="feedback-card" key={`${review.name}-${idx}`}>
                    <div className="feedback-card-swirl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/feedback_bg.png" alt="" className="feedback-card-swirl-img" />
                    </div>

                    <span className="feedback-quote-mark">&ldquo;</span>

                    <div className="feedback-card-header">
                      {review.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={review.photo}
                          alt={review.name}
                          className="feedback-avatar-photo"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="feedback-avatar" style={review.photo ? { display: 'none' } : undefined}>
                        {getInitials(review.name)}
                      </div>
                      <div className="feedback-card-identity">
                        <h4 className="feedback-reviewer-name">{review.name}</h4>
                        <p className="feedback-reviewer-loc">{review.location}</p>
                      </div>
                    </div>

                    <div className="feedback-stars">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>

                    <p
                      className="feedback-text"
                      style={isLong && !isExpanded ? { maxHeight: '112px', overflow: 'hidden' } : undefined}
                    >
                      &ldquo;{displayText}&rdquo;
                    </p>

                    {isLong && (
                      <button
                        type="button"
                        className="feedback-readmore-btn"
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

          {index > 0 && (
            <button className="feedback-nav-btn feedback-nav-prev" onClick={goPrev} aria-label="Previous testimonial">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0c1835" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {index < maxIndex && (
            <button className="feedback-nav-btn feedback-nav-next" onClick={goNext} aria-label="Next testimonial">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0c1835" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
