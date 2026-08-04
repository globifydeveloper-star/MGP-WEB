"use client";

import React, { useEffect, useState } from 'react';
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
  const [jumpingBack, setJumpingBack] = useState(false);

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
  const loopedSlides = [...activeSlides, activeSlides[0]];

  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [slideCount]);

  useEffect(() => {
    if (index !== slideCount) return;
    const resetTimer = setTimeout(() => {
      setJumpingBack(true);
      setIndex(0);
    }, 950);
    return () => clearTimeout(resetTimer);
  }, [index, slideCount]);

  useEffect(() => {
    if (!jumpingBack) return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setJumpingBack(false));
    });
    return () => cancelAnimationFrame(raf);
  }, [jumpingBack]);

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
    <section className="ns-section">
      <div className="ns-viewport">
        <div
          className="ns-track"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: jumpingBack ? 'none' : undefined,
          }}
        >
          {loopedSlides.map((slide, idx) => (
            <div className="ns-slide" key={`${slide.highlight}-${idx}`}>
              <div className="container ns-slide-inner">
                <div className="ns-image-col">
                  <div className="ns-image-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={slide.image} alt={slide.highlight} className="ns-image" />
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
    </section>
  );
}
