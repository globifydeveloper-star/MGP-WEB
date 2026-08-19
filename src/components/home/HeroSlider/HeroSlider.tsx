"use client";

import { useEffect, useRef, useState } from 'react';
import Hero from '@/components/home/Hero/Hero';
import HeroSlideTwo from './HeroSlideTwo';
import type { HeroSlideData } from './HeroSlideTwo';
import HeroStats from './HeroStats';
import './heroSlider.css';

// Set to true to enable second slide auto-rotation
const ENABLE_SECOND_SLIDE = true;
const SLIDE_INTERVAL_MS = 8000;

interface HeroSliderProps {
  slides?: any[];
  firstSlideImage?: string;
  layout?: 'full' | 'half';
}

export default function HeroSlider({ slides, firstSlideImage, layout = 'full' }: HeroSliderProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const slideList: (any | undefined)[] = slides && slides.length > 0 ? slides : [undefined, undefined];
  const slideCount = slideList.length;

  useEffect(() => {
    if (!ENABLE_SECOND_SLIDE || slideCount <= 1) return;
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideCount);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [slideCount]);

  const goToSlide = (index: number) => setActiveSlide((index + slideCount) % slideCount);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) >= 45) goToSlide(activeSlide + (distance < 0 ? 1 : -1));
  };

  if (!ENABLE_SECOND_SLIDE || slideCount <= 1) {
    const firstSlide = slideList[0];
    const mediaType = firstSlide?.mediaType || (firstSlide?.media?.mime?.startsWith('video/') ? 'video' : 'image');
    const imageSrc = firstSlideImage || firstSlide?.media?.url;
    return (
      <>
        <Hero slide={firstSlide} imageSrc={imageSrc} mediaType={mediaType} layout={layout} />
        <HeroStats />
      </>
    );
  }

  return (
    <>
      <div className="hero-slider-stack" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} aria-roledescription="carousel" aria-label="Promotional slides">
        {slideList.map((slide, idx) => {
          const isActive = activeSlide === idx;
          const mediaType = slide?.mediaType || (slide?.media?.mime?.startsWith('video/') ? 'video' : 'image');
          const imageSrc = idx === 0 ? (firstSlideImage || slide?.media?.url) : (slide?.heroImage || slide?.media?.url);
          return (
            <div key={idx} className={`hero-slider-slide${isActive ? ' is-active' : ''}`} aria-hidden={!isActive}>
              {idx === 0 ? (
                <Hero slide={slide} imageSrc={imageSrc} mediaType={mediaType} layout={layout} />
              ) : (
                <HeroSlideTwo slide={slide} imageSrc={imageSrc} />
              )}
            </div>
          );
        })}
        <div className="hero-slider-dots" role="tablist" aria-label="Choose promotion">
          {slideList.map((_, index) => (
            <button key={index} type="button" className={`hero-slider-dot${index === activeSlide ? ' is-active' : ''}`} onClick={() => goToSlide(index)} aria-label={`Show slide ${index + 1}`} aria-selected={index === activeSlide} role="tab" />
          ))}
        </div>
      </div>
      <HeroStats />
    </>
  );
}
