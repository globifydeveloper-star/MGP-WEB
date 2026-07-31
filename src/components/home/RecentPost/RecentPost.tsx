'use client';

import React from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/strapi';
import './RecentPost.css';

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
            {posts.map((post) => {
              const isVideo = post.coverMedia?.mime?.startsWith('video/');
              return (
                <div className="recent-post-card" key={post.id}>
                  <div className="recent-post-image-wrap">
                    {post.coverMedia ? (
                      isVideo ? (
                        <video src={post.coverMedia.url} className="recent-post-image" muted playsInline />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.coverMedia.url} alt={post.title} className="recent-post-image" />
                      )
                    ) : (
                      <div className="recent-post-image-placeholder">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z" />
                          <path d="m4 16 4.5-4.5a2 2 0 0 1 2.8 0L18 18" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                        </svg>
                      </div>
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

