'use client';

import React, { useState, useEffect } from 'react';
import './mobilevanhero.css';

// Import frame images statically
import frame1 from '@/assets/images/frames/Van-Frames-Animated/frame 1.png';
import frame2 from '@/assets/images/frames/Van-Frames-Animated/frame 2.png';
import frame3 from '@/assets/images/frames/Van-Frames-Animated/frame 3.png';
import frame4 from '@/assets/images/frames/Van-Frames-Animated/frame 4.png';
import frame5 from '@/assets/images/frames/Van-Frames-Animated/frame 5.png';
import frame6 from '@/assets/images/frames/Van-Frames-Animated/frame 6.png';
import van from '@/assets/images/van.png';

const frames = [frame1, frame2, frame3, frame4, frame5, frame6];

export default function MobileVanHero() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted to true on client-side mount to prevent SSR hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Preload frame images natively to ensure browser caching works perfectly on reload/refresh
  useEffect(() => {
    if (!isMounted) return;

    const loadedUrls = new Set<string>();

    frames.forEach((frame) => {
      const img = new Image();
      img.src = frame.src;

      const handleLoad = () => {
        loadedUrls.add(frame.src);
        if (loadedUrls.size === 6) {
          setIsAnimationStarted(true);
        }
      };

      img.onload = handleLoad;

      // Handle cases where the image is already cached and loaded immediately
      if (img.complete) {
        handleLoad();
      }
    });
  }, [isMounted]);

  useEffect(() => {
    if (!isAnimationStarted) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % 6);
    }, 150); // Decent loop interval: 150ms per frame

    return () => clearInterval(interval);
  }, [isAnimationStarted]);

  return (
    <section className="mvh-section">
      <div className="mvh-bg-pattern" aria-hidden="true" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/pattern2.png" alt="" className="mvh-swirl" aria-hidden="true" />

      <div className="mvh-container">
        <div className="mvh-image-col">
          <div className="mvh-van-container">
            {/* 1. Base image (always rendered to establish layout size, invisible when animating) */}
            <img
              src="/van.png"
              alt="Muthoot Gold Point mobile van"
              className="mvh-van-img"
              style={{ opacity: (isMounted && isAnimationStarted) ? 0 : 1 }}
            />

            {/* 2. The running animated frames view once loaded */}
            {isMounted && isAnimationStarted && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={frames[currentFrame].src}
                alt="Muthoot Gold Point mobile van animation"
                className="mvh-van-anim-img"
              />
            )}
          </div>
          <div className="mvh-glow" aria-hidden="true" />
          <div className="mvh-pattern-row" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/pattern4.png" alt="" className="mvh-pattern-tile" />
          </div>
        </div>

        <div className="mvh-content-col">
          <h1 className="mvh-heading">
            <span className="mvh-heading-light">Premium Gold</span>
            <span className="mvh-heading-light">Liquidation</span>
            <span className="mvh-heading-bold">At Your Doorstep</span>
          </h1>
          <p className="mvh-desc">
            Experience the luxury of professional gold valuation without leaving your home. Our secure mobile vans bring high-tech XRF testing and instant bank transfers directly to you.
          </p>
        </div>
      </div>
    </section>
  );
}
