'use client';

import React from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/strapi';
import './RecentPost.css';

const DEFAULT_BLOG_IMAGES = [
  '/ImageSet/Homepage/Blog1.jpg',
  '/ImageSet/Homepage/Blog2.jpg',
];

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr));
}

interface RecentPostProps {
  posts: BlogPost[];
}

export default function RecentPost({ posts }: RecentPostProps) {
  return (
    <section className="recent-post-section">
      <div className="container">
        <h2 className="recent-post-title">
          Our <span className="recent-post-highlight">Recent</span> Posts
        </h2>

        {posts.length === 0 ? (
          <div className="recent-post-empty">
            <p>No recent posts available.</p>
          </div>
        ) : (
          <div className="recent-post-grid">
            {posts.map((post, idx) => {
              const isVideo = post.coverMedia?.mime?.startsWith('video/');
              const fallbackSrc = DEFAULT_BLOG_IMAGES[idx % DEFAULT_BLOG_IMAGES.length];
              const imageSrc = post.coverMedia?.url || fallbackSrc;

              return (
                <div className="recent-post-card" key={post.id}>
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
                    <h3 className="recent-post-card-title">{post.title}</h3>
                    <p className="recent-post-card-desc">
                      {post.excerpt || (post.body ? post.body.slice(0, 120) + '...' : '')}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="recent-post-btn-link">
                      <button className="recent-post-btn">Read More</button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
