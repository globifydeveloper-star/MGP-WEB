"use client";

import { useEffect, useState } from 'react';
import Hero from '@/components/home/Hero/Hero';
import HeroSlideTwo from './HeroSlideTwo';
import HeroStats from './HeroStats';
import './heroSlider.css';

// Set to true to enable second slide auto-rotation
const ENABLE_SECOND_SLIDE = true;
const SLIDE_INTERVAL_MS = 8000;

interface HeroSliderProps {
  slides?: any[];
  firstSlideImage?: string;
}

export default function HeroSlider({ slides, firstSlideImage }: HeroSliderProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slideList = slides && slides.length > 0 ? slides : [null, null];
  const slideCount = slideList.length;

  useEffect(() => {
    if (!ENABLE_SECOND_SLIDE || slideCount <= 1) return;
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideCount);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [slideCount]);

  if (!ENABLE_SECOND_SLIDE || slideCount <= 1) {
    const firstSlide = slideList[0];
    return (
      <>
        <Hero slide={firstSlide} imageSrc={firstSlideImage} />
        <HeroStats />
      </>
    );
  }

  return (
    <>
      <div className="hero-slider-stack">
        {slideList.map((slide, idx) => {
          const isActive = activeSlide === idx;
          return (
            <div key={idx} className={`hero-slider-slide${isActive ? ' is-active' : ''}`}>
              {idx === 0 ? (
                <Hero slide={slide} imageSrc={firstSlideImage} />
              ) : (
                <HeroSlideTwo slide={slide} imageSrc={slide?.heroImage} />
              )}
            </div>
          );
        })}
      </div>
      <HeroStats />
    </>
  );
}
