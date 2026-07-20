'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/home/Hero/Hero';
import HeroSlideTwo from './HeroSlideTwo';
import HeroStats from './HeroStats';
import './heroSlider.css';

// Set to true to enable second slide auto-rotation
const ENABLE_SECOND_SLIDE = true;
const SLIDE_INTERVAL_MS = 8000;
const SLIDE_COUNT = 2;

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!ENABLE_SECOND_SLIDE) return;
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDE_COUNT);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  if (!ENABLE_SECOND_SLIDE) {
    return (
      <>
        <Hero />
        <HeroStats />
      </>
    );
  }

  return (
    <>
      <div className="hero-slider-stack">
        <div className={`hero-slider-slide${activeSlide === 0 ? ' is-active' : ''}`}>
          <Hero />
        </div>
        <div className={`hero-slider-slide${activeSlide === 1 ? ' is-active' : ''}`}>
          <HeroSlideTwo />
        </div>
      </div>
      <HeroStats />
    </>
  );
}
