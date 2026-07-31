'use client';

import type { Category } from '@/lib/strapi';
import './CategoryFilter.css';

interface CategoryFilterProps {
  categories: Category[];
  selected: string | null;
  onChange: (categorySlug: string | null) => void;
}

export default function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  return (
    <div className="category-filter" role="tablist" aria-label="Filter posts by category">
      <button
        type="button"
        role="tab"
        aria-selected={selected === null}
        className={`category-filter-pill ${selected === null ? 'category-filter-pill-active' : ''}`}
        onClick={() => onChange(null)}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          role="tab"
          aria-selected={selected === category.slug}
          className={`category-filter-pill ${selected === category.slug ? 'category-filter-pill-active' : ''}`}
          onClick={() => onChange(category.slug)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
