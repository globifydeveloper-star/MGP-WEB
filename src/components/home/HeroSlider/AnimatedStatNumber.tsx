'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedStatNumberProps {
  value: string | number;
  duration?: number;
}

export function AnimatedStatNumber({ value, duration = 2000 }: AnimatedStatNumberProps) {
  const [displayValue, setDisplayValue] = useState('0');
  const domRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const raw = String(value || '').trim();
    if (!raw) {
      setDisplayValue('0');
      return;
    }

    // Extract non-digit prefix (e.g., ₹, $)
    const prefixMatch = raw.match(/^[^\d]+/);
    const prefix = prefixMatch ? prefixMatch[0] : '';

    // Extract non-digit suffix (e.g., +, Cr, K, etc.)
    const suffixMatch = raw.match(/[^\d.]+$/);
    const suffix = suffixMatch ? suffixMatch[0] : '';

    // Clean numeric string
    const numericPart = raw.slice(prefix.length, suffix ? raw.length - suffix.length : undefined).replace(/,/g, '');
    const targetNumber = parseFloat(numericPart);

    if (isNaN(targetNumber)) {
      setDisplayValue(raw);
      return;
    }

    const hasDecimals = numericPart.includes('.');
    const decimalPlaces = hasDecimals ? (numericPart.split('.')[1]?.length || 0) : 0;

    const formatNumber = (num: number) => {
      if (hasDecimals) {
        return prefix + num.toFixed(decimalPlaces) + suffix;
      }
      const rounded = Math.round(num);
      return prefix + rounded.toLocaleString('en-IN') + suffix;
    };

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const startTime = performance.now();

      const updateCount = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutQuart easing for a smooth and satisfying counter feel
        const ease = 1 - Math.pow(1 - progress, 4);
        const current = targetNumber * ease;

        setDisplayValue(formatNumber(current));

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          setDisplayValue(formatNumber(targetNumber));
        }
      };

      requestAnimationFrame(updateCount);
    };

    const element = domRef.current;
    if (!element) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={domRef} className="hero-stat-metric-value">
      {displayValue}
    </span>
  );
}
