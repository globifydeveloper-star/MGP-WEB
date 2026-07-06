'use client';

import React, { useEffect, useState } from 'react';
import './new_section.css';

const SLIDES = [
  {
    image: '/van.png',
    heading: 'A Legacy Of',
    highlight: 'Trust, Truth & Tradition',
    text: 'The Muthoot Pappachan Group, with a reputation shaped over decades of high quality practices, total customer satisfaction and steady growth, has become one of the most trusted names in the business. Dummy content — will be replaced later.',
  },
  {
    image: '/woman-saree.png',
    heading: 'Built On',
    highlight: 'Transparency & Fairness',
    text: 'Every transaction is backed by science-driven valuation and complete honesty, so customers always know exactly what their gold is worth. Dummy content — will be replaced later.',
  },
  {
    image: '/g_selling.png',
    heading: 'Driven By',
    highlight: 'Customer First Values',
    text: 'From the first visit to the final payment, every step is designed around convenience, speed and putting the customer’s interest ahead of everything else. Dummy content — will be replaced later.',
  },
];

const LOOPED_SLIDES = [...SLIDES, SLIDES[0]];

export default function NewSection() {
  const [index, setIndex] = useState(0);
  const [jumpingBack, setJumpingBack] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (index !== SLIDES.length) return;
    const resetTimer = setTimeout(() => {
      setJumpingBack(true);
      setIndex(0);
    }, 950);
    return () => clearTimeout(resetTimer);
  }, [index]);

  useEffect(() => {
    if (!jumpingBack) return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setJumpingBack(false));
    });
    return () => cancelAnimationFrame(raf);
  }, [jumpingBack]);

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
          {LOOPED_SLIDES.map((slide, idx) => (
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
