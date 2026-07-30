'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/lib/strapi';
import './BlogCard.css';

interface BlogCardProps {
  post: BlogPost;
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr));
}

export default function BlogCard({ post }: BlogCardProps) {
  const isVideo = post.coverMedia?.mime?.startsWith('video/');

  return (
    <motion.article
      className="blog-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="blog-card-media">
        {post.coverMedia ? (
          isVideo ? (
            <video
              src={post.coverMedia.url}
              className="blog-card-media-el"
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverMedia.url}
              alt={post.title}
              className="blog-card-media-el"
              loading="lazy"
            />
          )
        ) : (
          <div className="blog-card-media-placeholder" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="m4 16 4.5-4.5a2 2 0 0 1 2.8 0L18 18" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        )}
      </div>

      <div className="blog-card-body">
        {post.category && <span className="blog-card-tag">{post.category.name}</span>}
        <h3 className="blog-card-title">{post.title}</h3>
        {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
        <div className="blog-card-footer">
          <span className="blog-card-date">{formatDate(post.publishedAt)}</span>
          <Link href={`/blog/${post.slug}`} className="blog-card-readmore">
            Read More
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
