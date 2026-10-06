'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/lib/strapi';
import './BlogCard.css';

interface BlogCardProps {
  post: BlogPost;
  readMoreLabel?: string;
}

const DEFAULT_BLOG_IMAGES = [
  '/ImageSet/Homepage/Blog1.jpg',
  '/ImageSet/Homepage/Blog2.jpg',
];

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr));
}

export default function BlogCard({ post, readMoreLabel }: BlogCardProps) {
  const isVideo = post.coverMedia?.mime?.startsWith('video/');
  const fallbackSrc = DEFAULT_BLOG_IMAGES[(post.id || 0) % DEFAULT_BLOG_IMAGES.length];
  const imageSrc = post.coverMedia?.url || fallbackSrc;

  return (
    <motion.article
      className="blog-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="blog-card-media">
        {isVideo && post.coverMedia?.url ? (
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
            src={imageSrc}
            alt={post.title}
            className="blog-card-media-el"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = fallbackSrc;
            }}
          />
        )}
      </div>

      <div className="blog-card-body">
        {post.category && <span className="blog-card-tag">{post.category.name}</span>}
        <h3 className="blog-card-title">{post.title}</h3>
        {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
        <div className="blog-card-footer">
          <span className="blog-card-date">{formatDate(post.publishedAt)}</span>
          <Link href={`/blog/${post.slug}`} className="blog-card-readmore">
            {readMoreLabel || 'Read More'}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
