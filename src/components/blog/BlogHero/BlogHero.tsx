'use client';

import React from 'react';
import Image from 'next/image';
import './BlogHero.css';

interface BlogHeroProps {
  heading?: string;
  subheading?: string;
  imageUrl?: string;
  fallbackImage?: any;
}

const DEFAULT_BLOG_HERO = '/ImageSet/Blog page/Hero Section ~1920×1080 px-01.jpg';

export default function BlogHero({ heading, subheading, imageUrl, fallbackImage }: BlogHeroProps) {
  const heroSrc = imageUrl || fallbackImage || DEFAULT_BLOG_HERO;

  return (
    <div className="blog-hero">
      <div className="blog-hero-bg">
        {typeof heroSrc === 'string' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroSrc}
            alt={heading || 'Blog'}
            className="blog-hero-image"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = DEFAULT_BLOG_HERO;
            }}
          />
        ) : (
          <Image src={heroSrc} alt="Blog Banner Fallback" className="blog-hero-image" priority />
        )}
        <div className="blog-hero-overlay" />
      </div>
      <div className="blog-hero-content container">
        <h1 className="blog-hero-title">{heading || 'Our Blog'}</h1>
        {subheading && <p className="blog-hero-subtitle">{subheading}</p>}
      </div>
    </div>
  );
}
