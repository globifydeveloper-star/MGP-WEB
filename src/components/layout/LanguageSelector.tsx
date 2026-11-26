'use client';

import React, { useSyncExternalStore } from 'react';
import './LanguageSelector.css';

interface LanguageOption {
  code: string;
  label: string;
}

interface LanguageSelectorProps {
  variant?: 'navbar' | 'mobile' | 'light';
}

const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'te', label: 'Telugu' },
  { code: 'ml', label: 'Malayalam' },
  { code: 'kn', label: 'Kannada' },
  { code: 'ta', label: 'Tamil' },
  { code: 'bn', label: 'Bengali' },
  { code: 'or', label: 'Odiya' },
  { code: 'gu', label: 'Gujarati' },
];

function readGoogTransCookie(): string {
  if (typeof document === 'undefined') return 'en';
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!match) return 'en';
  const parts = decodeURIComponent(match[1]).split('/');
  const target = parts[2];
  return target && target.trim() ? target.trim() : 'en';
}

function setGoogTransCookie(langCode: string) {
  if (typeof document === 'undefined') return;
  const host = window.location.hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1' || /^\d+\.\d+\.\d+\.\d+$/.test(host);
  const rootDomain = !isLocal ? host.replace(/^www\./i, '') : '';

  if (!langCode || langCode === 'en') {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    if (rootDomain) {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${rootDomain};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${host};`;
    }
    return;
  }

  const value = `/en/${langCode}`;
  document.cookie = `googtrans=${value}; path=/; SameSite=Lax`;
  if (rootDomain) {
    document.cookie = `googtrans=${value}; path=/; domain=.${rootDomain}; SameSite=Lax`;
  }
}

function subscribeToLangChange(callback: () => void) {
  window.addEventListener('mgp-lang-change', callback);
  return () => window.removeEventListener('mgp-lang-change', callback);
}

const getServerLang = () => 'en';

export default function LanguageSelector({ variant = 'navbar' }: LanguageSelectorProps) {
  const currentLang = useSyncExternalStore(subscribeToLangChange, readGoogTransCookie, getServerLang);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setGoogTransCookie(selected);
    window.dispatchEvent(new CustomEvent('mgp-lang-change', { detail: selected }));

    if (selected === 'en') {
      // Reloading cleanly restores all original English text nodes without stale <font> wrappers
      window.location.reload();
      return;
    }

    const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (combo) {
      combo.value = selected;
      combo.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      window.location.reload();
    }
  };

  const activeOption = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang);
  const displayLabel = activeOption?.label || 'English';
  const shortCode = currentLang.split('-')[0].toUpperCase();

  return (
    <div
      className={`mgp-lang-selector mgp-lang-${variant} notranslate`}
      translate="no"
    >
      <span className="mgp-lang-globe" aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </span>

      <span className="mgp-lang-label-full">{displayLabel}</span>
      <span className="mgp-lang-label-short">{shortCode}</span>

      <span className="mgp-lang-chevron" aria-hidden="true">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>

      <select
        aria-label="Select website language"
        className="mgp-lang-native-select notranslate"
        translate="no"
        value={currentLang}
        onChange={handleChange}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className="notranslate">
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
