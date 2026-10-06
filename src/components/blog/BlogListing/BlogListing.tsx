'use client';

import { useEffect, useMemo, useState } from 'react';
import type { BlogPost, Category, BlogPageSettings } from '@/lib/strapi';
import BlogCard from '../BlogCard/BlogCard';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import SortToggle from '../SortToggle/SortToggle';
import './BlogListing.css';

type SortOrder = 'newest' | 'oldest';

const POSTS_PER_PAGE = 6;
const PAGE_WINDOW = 1; // pages shown on each side of the current page

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [1];

  const start = Math.max(2, current - PAGE_WINDOW);
  const end = Math.min(total - 1, current + PAGE_WINDOW);

  if (start > 2) pages.push('ellipsis');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push('ellipsis');

  if (total > 1) pages.push(total);

  return pages;
}

interface BlogListingProps {
  initialPosts: BlogPost[];
  categories: Category[];
  settings?: BlogPageSettings;
}

export default function BlogListing({ initialPosts, categories, settings }: BlogListingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const visiblePosts = useMemo(() => {
    const filtered = selectedCategory
        ? initialPosts.filter((post) => post.category?.slug === selectedCategory)
        : initialPosts;

    return [...filtered].sort((a, b) => {
      const diff = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      return sortOrder === 'newest' ? -diff : diff;
    });
  }, [initialPosts, selectedCategory, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(visiblePosts.length / POSTS_PER_PAGE));

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortOrder]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return visiblePosts.slice(start, start + POSTS_PER_PAGE);
  }, [visiblePosts, currentPage]);

  if (initialPosts.length === 0) {
    return (
      <div className="blog-listing">
        <div className="blog-listing-empty">
          <p>{settings?.noPostsMessage || 'No blog posts yet'}</p>
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
          settings={settings}
        />
        <SortToggle 
          sortOrder={sortOrder} 
          onChange={setSortOrder} 
          settings={settings}
        />
      </div>

      {visiblePosts.length === 0 ? (
        <div className="blog-listing-empty">
          <p>{settings?.noPostsInCategoryMessage || 'No posts found in this category'}</p>
        </div>
      ) : (
        <>
          <div className="blog-listing-grid">
            {paginatedPosts.map((post) => (
              <BlogCard key={post.id} post={post} readMoreLabel={settings?.readMoreLabel} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="blog-listing-pagination" aria-label="Blog pagination">
              <button
                type="button"
                className="blog-listing-page-btn"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {getPageNumbers(currentPage, totalPages).map((pageNum, idx) =>
                pageNum === 'ellipsis' ? (
                  <span key={`ellipsis-${idx}`} className="blog-listing-page-ellipsis">
                    &hellip;
                  </span>
                ) : (
                  <button
                    key={pageNum}
                    type="button"
                    className={`blog-listing-page-btn ${pageNum === currentPage ? 'is-active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                    aria-current={pageNum === currentPage ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                )
              )}

              <button
                type="button"
                className="blog-listing-page-btn"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
