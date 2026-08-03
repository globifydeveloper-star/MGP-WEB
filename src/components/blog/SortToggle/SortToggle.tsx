'use client';

import type { BlogPageSettings } from '@/lib/strapi';
import './SortToggle.css';

type SortOrder = 'newest' | 'oldest';

interface SortToggleProps {
  sortOrder: SortOrder;
  onChange: (order: SortOrder) => void;
  settings?: BlogPageSettings;
}

export default function SortToggle({ sortOrder, onChange, settings }: SortToggleProps) {
  return (
    <div className="sort-toggle" role="group" aria-label="Sort posts">
      <button
        type="button"
        aria-pressed={sortOrder === 'newest'}
        className={`sort-toggle-option ${sortOrder === 'newest' ? 'sort-toggle-option-active' : ''}`}
        onClick={() => onChange('newest')}
      >
        {settings?.sortNewestLabel || 'Newest'}
      </button>
      <button
        type="button"
        aria-pressed={sortOrder === 'oldest'}
        className={`sort-toggle-option ${sortOrder === 'oldest' ? 'sort-toggle-option-active' : ''}`}
        onClick={() => onChange('oldest')}
      >
        {settings?.sortOldestLabel || 'Oldest'}
      </button>
    </div>
  );
}
