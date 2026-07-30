'use client';

import './SortToggle.css';

type SortOrder = 'newest' | 'oldest';

interface SortToggleProps {
  sortOrder: SortOrder;
  onChange: (order: SortOrder) => void;
}

export default function SortToggle({ sortOrder, onChange }: SortToggleProps) {
  return (
    <div className="sort-toggle" role="group" aria-label="Sort posts">
      <button
        type="button"
        aria-pressed={sortOrder === 'newest'}
        className={`sort-toggle-option ${sortOrder === 'newest' ? 'sort-toggle-option-active' : ''}`}
        onClick={() => onChange('newest')}
      >
        Newest
      </button>
      <button
        type="button"
        aria-pressed={sortOrder === 'oldest'}
        className={`sort-toggle-option ${sortOrder === 'oldest' ? 'sort-toggle-option-active' : ''}`}
        onClick={() => onChange('oldest')}
      >
        Oldest
      </button>
    </div>
  );
}
