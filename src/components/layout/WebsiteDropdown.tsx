'use client';

import React from 'react';

import type { NavItem } from '@/lib/strapi';

interface WebsiteDropdownProps {
  options?: NavItem[];
  label?: string;
}

const DEFAULT_OPTIONS: NavItem[] = [
  { id: 1, label: 'Muthoot Capital Services Ltd.', url: 'https://muthootcap.com/' },
  { id: 2, label: 'Muthoot Housing Finance Company Ltd', url: 'https://www.muthoothousing.com/' },
  { id: 3, label: 'Muthoot Microfin Ltd.', url: 'https://www.muthootmicrofin.com/' },
  { id: 4, label: 'Muthoot Pappachan Group', url: 'https://muthoot.com/' },
  { id: 5, label: 'Muthoot Blue', url: 'https://www.muthootfincorp.com/' },
];

export default function WebsiteDropdown({ options, label }: WebsiteDropdownProps) {
  const items = options && options.length > 0 ? options : DEFAULT_OPTIONS;
  const placeholder = label || 'Select our other websites';

  return (
    <select
      className="website-dropdown"
      defaultValue="default"
      aria-label={placeholder}
      onChange={(e) => {
        if (e.target.value !== "default") {
          window.open(e.target.value, '_blank', 'noopener,noreferrer');
          e.target.value = "default";
        }
      }}
    >
      <option value="default" disabled>{placeholder}</option>
      {items.map((opt, idx) => (
        <option key={opt.id || idx} value={opt.url}>{opt.label}</option>
      ))}
    </select>
  );
}
