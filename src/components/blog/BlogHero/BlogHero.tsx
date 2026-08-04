import React from 'react';
import Image from 'next/image';
import './BlogHero.css';

interface BlogHeroProps {
  heading?: string;
  subheading?: string;
  imageUrl?: string;
  fallbackImage: any;
}

export default function BlogHero({ heading, subheading, imageUrl, fallbackImage }: BlogHeroProps) {
  return (
    <div className="blog-hero">
      <div className="blog-hero-bg">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={heading || 'Blog'} className="blog-hero-image" />
        ) : (
          <Image src={fallbackImage} alt="Blog Banner Fallback" className="blog-hero-image" priority />
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
