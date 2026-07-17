'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/home/Hero/Hero';
import HeroSlideTwo from './HeroSlideTwo';
import HeroStats from './HeroStats';
import './heroSlider.css';

// Toggle this to false to enable sliding between Hero and HeroSlideTwo
const SHOW_ONLY_FIRST_SLIDE = true;

const SLIDE_INTERVAL_MS = 8000;
const SLIDE_COUNT = 2;

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (SHOW_ONLY_FIRST_SLIDE) return;

    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDE_COUNT);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className="hero-slider-stack">
        <div className={`hero-slider-slide${SHOW_ONLY_FIRST_SLIDE || activeSlide === 0 ? ' is-active' : ''}`}>
          <Hero />
        </div>
        {!SHOW_ONLY_FIRST_SLIDE && (
          <div className={`hero-slider-slide${activeSlide === 1 ? ' is-active' : ''}`}>
            <HeroSlideTwo />
          </div>
        )}
      </div>
      <HeroStats />
    </>
  );
}
