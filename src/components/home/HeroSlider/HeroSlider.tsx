'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/home/Hero/Hero';
import HeroSlideTwo from './HeroSlideTwo';
import './heroSlider.css';

// How long each full-page slide stays on screen before crossfading to the next.
const SLIDE_INTERVAL_MS = 6000;
const SLIDE_COUNT = 2;

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDE_COUNT);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hero-slider-stack">
      <div className={`hero-slider-slide${activeSlide === 0 ? ' is-active' : ''}`}>
        <Hero />
      </div>
      <div className={`hero-slider-slide${activeSlide === 1 ? ' is-active' : ''}`}>
        <HeroSlideTwo />
      </div>
    </div>
  );
}
