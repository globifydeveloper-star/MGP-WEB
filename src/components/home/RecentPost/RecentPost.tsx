'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/strapi';
import './RecentPost.css';

const DEFAULT_BLOG_IMAGES = [
  '/ImageSet/Homepage/Blog1.jpg',
  '/ImageSet/Homepage/Blog2.jpg',
];

function formatDate(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
}

interface RecentPostProps {
  posts: BlogPost[];
  heading?: string;
  headingHighlight?: string;
  headingSuffix?: string;
  emptyText?: string;
  readMoreLabel?: string;
}

export default function RecentPost({
  posts,
  heading,
  headingHighlight,
  headingSuffix,
  emptyText,
  readMoreLabel,
}: RecentPostProps) {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  const maxIndex = Math.max(0, posts.length - visibleCount);
  const showControls = posts.length > visibleCount;

  const goNext = useCallback(() => {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Responsive layout measurement
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const count = w <= 640 ? 1 : w <= 1024 ? 2 : 3;
      setVisibleCount(count);
      setIndex((prev) => {
        const currentMax = Math.max(0, posts.length - count);
        return prev > currentMax ? currentMax : prev;
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [posts.length]);

  // Auto-advance rotation every 5 seconds, pauses on interaction
  useEffect(() => {
    if (!showControls || isPaused) return;
    const timer = setInterval(() => {
      goNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [showControls, isPaused, goNext]);

  // Touch swipe support for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current !== null) {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null) {
      const threshold = 40;
      if (touchDeltaX.current < -threshold) {
        goNext();
      } else if (touchDeltaX.current > threshold) {
        goPrev();
      }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setIsPaused(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  };

  return (
    <section className="recent-post-section" aria-label="Recent Blog Posts">
      <div className="container">
        <div className="recent-post-header">
          <h2 className="recent-post-title">
            {heading || 'Our'}{' '}
            <span className="recent-post-highlight">{headingHighlight || 'Recent'}</span>{' '}
            {headingSuffix || 'Posts'}
          </h2>
        </div>

        {posts.length === 0 ? (
          <div className="recent-post-empty">
            <p>{emptyText || 'No recent posts available.'}</p>
          </div>
        ) : (
          <div
            className="recent-post-slider-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="region"
            aria-roledescription="carousel"
            aria-label="Recent blog posts"
          >
            <div
              className="recent-post-viewport"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="recent-post-track"
                style={{
                  '--slide-index': index,
                } as React.CSSProperties}
              >
                {posts.map((post, idx) => {
                  const isVideo = post.coverMedia?.mime?.startsWith('video/');
                  const fallbackSrc = DEFAULT_BLOG_IMAGES[idx % DEFAULT_BLOG_IMAGES.length];
                  const imageSrc = post.coverMedia?.url || fallbackSrc;

                  return (
                    <article className="recent-post-card" key={post.id || idx}>
                      <div className="recent-post-image-wrap">
                        {isVideo && post.coverMedia?.url ? (
                          <video src={post.coverMedia.url} className="recent-post-image" muted playsInline />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={imageSrc}
                            alt={post.title}
                            className="recent-post-image"
                            loading="lazy"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = fallbackSrc;
                            }}
                          />
                        )}
                        <span className="recent-post-date-badge">{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="recent-post-body">
                        <h3 className="recent-post-card-title" title={post.title}>
                          {post.title}
                        </h3>
                        <p className="recent-post-card-desc">
                          {post.excerpt || (post.body ? stripHtml(post.body).slice(0, 120) + '...' : '')}
                        </p>
                        <Link href={`/blog/${post.slug}`} className="recent-post-btn-link">
                          <button type="button" className="recent-post-btn">
                            {readMoreLabel || 'Read More'}
                          </button>
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {showControls && (
              <>
                <button
                  type="button"
                  className="recent-post-nav-btn recent-post-nav-prev"
                  onClick={goPrev}
                  aria-label="Previous blog posts"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="recent-post-nav-btn recent-post-nav-next"
                  onClick={goNext}
                  aria-label="Next blog posts"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            {showControls && maxIndex > 0 && (
              <div className="recent-post-pagination" role="tablist" aria-label="Blog slide selector">
                {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    className={`recent-post-dot ${index === dotIdx ? 'active' : ''}`}
                    onClick={() => setIndex(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    aria-selected={index === dotIdx}
                    role="tab"
                  />
                ))}
              </div>
            )}

            <div className="recent-post-footer-action">
              <Link href="/blog" className="recent-post-view-all-link">
                <span>View All Blogs</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
