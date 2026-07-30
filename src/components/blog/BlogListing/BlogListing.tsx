'use client';

import { useMemo, useState } from 'react';
import type { BlogPost, Category } from '@/lib/strapi';
import BlogCard from '../BlogCard/BlogCard';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import SortToggle from '../SortToggle/SortToggle';
import './BlogListing.css';

type SortOrder = 'newest' | 'oldest';

interface BlogListingProps {
  initialPosts: BlogPost[];
  categories: Category[];
}

export default function BlogListing({ initialPosts, categories }: BlogListingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  const visiblePosts = useMemo(() => {
    const filtered = selectedCategory
      ? initialPosts.filter((post) => post.category?.slug === selectedCategory)
      : initialPosts;

    return [...filtered].sort((a, b) => {
      const diff = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      return sortOrder === 'newest' ? -diff : diff;
    });
  }, [initialPosts, selectedCategory, sortOrder]);

  if (initialPosts.length === 0) {
    return (
      <div className="blog-listing">
        <div className="blog-listing-empty">
          <p>No blog posts yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-listing">
      <div className="blog-listing-controls">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
        <SortToggle sortOrder={sortOrder} onChange={setSortOrder} />
      </div>

      {visiblePosts.length === 0 ? (
        <div className="blog-listing-empty">
          <p>No posts found in this category</p>
        </div>
      ) : (
        <div className="blog-listing-grid">
          {visiblePosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
