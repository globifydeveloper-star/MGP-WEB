"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import './NewSection.css';

interface NewSectionProps {
  slides?: any[];
}

const DEFAULT_SLIDES = [
  {
    image: '/van.png',
    heading: 'A Legacy Of',
    highlight: 'Trust, Truth & Tradition',
    text: 'The Muthoot Pappachan Group, with a reputation shaped over decades of high quality practices, total customer satisfaction and steady growth, has become one of the most trusted names in the business.',
    button: { enabled: false }
  },
  {
    image: '/woman-saree.png',
    heading: 'Built On',
    highlight: 'Transparency & Fairness',
    text: 'Every transaction is backed by science-driven valuation and complete honesty, so customers always know exactly what their gold is worth.',
    button: { enabled: false }
  },
  {
    image: '/g_selling.png',
    heading: 'Driven By',
    highlight: 'Customer First Values',
    text: 'From the first visit to the final payment, every step is designed around convenience, speed and putting the customer’s interest ahead of everything else.',
    button: { enabled: false }
  },
];

export default function NewSection({ slides }: NewSectionProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const activeSlides = slides && slides.length > 0
    ? slides.map((s) => ({
        image: s.creativeImage || '/van.png',
        heading: s.heading || '',
        highlight: s.highlight || '',
        text: s.description || '',
        button: s.button
      }))
    : DEFAULT_SLIDES;

  const slideCount = activeSlides.length;

  const goToNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const goToPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const goToSlide = useCallback((idx: number) => {
    setIndex(idx);
  }, []);

  // Auto slide when not paused
  useEffect(() => {
    if (slideCount <= 1 || isPaused) return;
    const timer = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [slideCount, isPaused, goToNext]);

  // Touch Handlers for Mobile Swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsPaused(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    setIsPaused(false);
  };

  // Mouse Drag Handlers for Desktop Swipe
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    mouseStartX.current = e.clientX;
    setIsPaused(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (isDragging.current && mouseStartX.current !== null) {
      const dx = e.clientX - mouseStartX.current;
      if (Math.abs(dx) > 40) {
        if (dx < 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    }
    isDragging.current = false;
    mouseStartX.current = null;
    setIsPaused(false);
  };

  const onMouseLeave = () => {
    isDragging.current = false;
    mouseStartX.current = null;
    setIsPaused(false);
  };

  const handleCta = (link: string | undefined) => {
    if (!link) return;
    if (link.startsWith('#')) {
      const element = document.getElementById(link.substring(1));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(link, '_blank');
    }
  };

  return (
    <section className="ns-section" aria-roledescription="carousel">
      <div className="ns-container">
        {/* Left Floating Side Arrow Button */}
        {slideCount > 1 && (
          <button
            type="button"
            className="ns-nav-btn ns-nav-left"
            onClick={goToPrev}
            aria-label="Previous promo slide"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        <div
          className="ns-viewport"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          style={{ cursor: slideCount > 1 ? 'grab' : 'default', userSelect: 'none' }}
        >
          <div
            className="ns-track"
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {activeSlides.map((slide, idx) => (
              <div className="ns-slide" key={`${slide.highlight}-${idx}`}>
                <div className="ns-slide-inner">
                  <div className="ns-image-col">
                    <div className="ns-image-wrap">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={slide.image} alt={slide.highlight} className="ns-image" draggable={false} />
                    </div>
                  </div>

                  <div className="ns-content-col">
                    <h2 className="ns-heading">
                      {slide.heading} <span className="ns-heading-highlight">{slide.highlight}</span>
                    </h2>
                    <p className="ns-desc">{slide.text}</p>
                    {slide.button?.enabled && (
                      <button
                        className="btn-gold-gradient"
                        style={{ marginTop: '20px', padding: '12px 32px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => handleCta(slide.button.link)}
                      >
                        {slide.button.label}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Floating Side Arrow Button */}
        {slideCount > 1 && (
          <button
            type="button"
            className="ns-nav-btn ns-nav-right"
            onClick={goToNext}
            aria-label="Next promo slide"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {/* Pagination dots at the bottom */}
      {slideCount > 1 && (
        <div className="ns-dots-container">
          <div className="ns-dots">
            {activeSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`ns-dot ${i === index ? 'ns-dot-active' : ''}`}
                onClick={() => goToSlide(i)}
                aria-label={`Go to promo slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
