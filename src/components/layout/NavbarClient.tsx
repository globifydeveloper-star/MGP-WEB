'use client';

import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logoImg from '@/assets/images/logo.png';
import SellGoldModal from './SellGoldModal';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { getNavbarSetting, NavItem } from '@/lib/strapi';

const DEFAULT_NAV_LINKS: NavItem[] = [
  { label: 'Home', url: '/' },
  { label: 'About Us', url: '/about-us' },
  { label: 'Mobile Van', url: '/mobilevantab' },
  { label: 'Blogs', url: '/blogs' },
  { label: 'Career', url: '/career' },
];

function resolveUrl(link: NavItem): string {
  if (link.url) return link.url;
  if (link.page?.slug) {
    if (link.page.slug === 'home' || link.page.slug === '/') return '/';
    return `/${link.page.slug}`;
  }
  return '#';
}

function mergeNavLinks(customLinks: NavItem[]): NavItem[] {
  if (!customLinks || customLinks.length === 0) return DEFAULT_NAV_LINKS;

  const merged = [...DEFAULT_NAV_LINKS];
  for (const custom of customLinks) {
    const idx = merged.findIndex(def => def.label.toLowerCase() === custom.label.toLowerCase());
    if (idx >= 0) {
      merged[idx] = custom;
    } else {
      merged.push(custom);
    }
  }
  return merged;
}

export default function NavbarClient({ initialData }: { initialData: any }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSellGoldOpen, setIsSellGoldOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // ADD THIS
  const [navLinks, setNavLinks] = useState<NavItem[]>(initialData?.navLinks?.length ? mergeNavLinks(initialData.navLinks) : DEFAULT_NAV_LINKS);

  // ADD THESE TWO LINES:
  const visibleLinks = navLinks.slice(0, 6); // Show first 6 links on desktop
  const moreLinks = navLinks.slice(6);       // Everything else goes in "More"
  const [phoneNumber, setPhoneNumber] = useState(initialData?.phoneNumber || '+91 9037 921 192');
  const [phoneRaw, setPhoneRaw] = useState(initialData?.phoneRaw || '+919037921192');
  const [ctaLabel, setCtaLabel] = useState(initialData?.ctaLabel || 'Sell Your Gold');
  const pathname = usePathname();

  // Lock background scroll completely on mobile & desktop when hamburger menu is open
  useBodyScrollLock(menuOpen);



  return (
    <header className={`navbar-header-v2 ${menuOpen ? 'header-menu-active' : ''}`}>
      <div className="navbar-container-v2">
        {/* Hamburger Menu Toggle (Mobile) */}
        <button
          className={`mobile-menu-toggle${menuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span className="mobile-menu-bar" />
          <span className="mobile-menu-bar" />
          <span className="mobile-menu-bar" />
        </button>

        {/* Logo */}
        <Link href="/" className="navbar-logo-link" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
          <Image
            src={logoImg}
            alt="GOLDPOINT - We Buy Gold"
            className="navbar-logo"
            width={220}
            height={60}
            priority
            style={{ display: 'block' }}
          />
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="navbar-nav-v2">
          {visibleLinks.map((link, i) => {
            const resolvedUrl = resolveUrl(link);
            const label = link.label || link.page?.slug || 'Link';
            return link.isExternal ? (
              <a key={label + i} href={resolvedUrl} target="_blank" rel="noopener noreferrer">{label}</a>
            ) : (
              <Link key={label + i} href={resolvedUrl} className={resolvedUrl !== '#' && pathname === resolvedUrl ? 'active' : ''}>{label}</Link>
            )
          })}

          {/* The "More" Dropdown */}
          {moreLinks.length > 0 && (
            <div
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              className="navbar-more-wrapper"
            >
              <span className="navbar-more-trigger">
                More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>

              {dropdownOpen && (
                <div className="navbar-more-dropdown">
                  {moreLinks.map((link, i) => {
                    const resolvedUrl = resolveUrl(link);
                    const label = link.label || link.page?.slug || 'Link';
                    return link.isExternal ? (
                      <a key={label + i} href={resolvedUrl} target="_blank" rel="noopener noreferrer" className="navbar-dropdown-item">{label}</a>
                    ) : (
                      <Link key={label + i} href={resolvedUrl} className="navbar-dropdown-item">{label}</Link>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Right Side: Phone Contact & CTA */}
        <div className="navbar-right-group">
          <div className="navbar-social-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'white', fontSize: '15px', fontFamily: "'Gilroy', var(--font-outfit), sans-serif", fontWeight: 500 }}>
            <span style={{ whiteSpace: 'nowrap' }}>Follow us on :</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href="#" aria-label="Instagram" style={{ transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="ig-grad-nav" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f09433" />
                      <stop offset="25%" stopColor="#e6683c" />
                      <stop offset="50%" stopColor="#dc2743" />
                      <stop offset="75%" stopColor="#cc2366" />
                      <stop offset="100%" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#ig-grad-nav)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube" style={{ transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#FF0000" d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.81z" />
                  <path fill="#ffffff" d="M9.6 15.6V8.4l6.24 3.6-6.24 3.6z" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" style={{ transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  <path fill="#ffffff" d="M16.671 15.343l.532-3.47h-3.328V9.623c0-.949.465-1.874 1.956-1.874h1.514V4.796s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.643H7.078v3.47h3.047v8.385c.618.096 1.25.148 1.875.148.626 0 1.258-.052 1.875-.148v-8.385h2.796z" />
                </svg>
              </a>
            </div>
          </div>
          <button className="navbar-cta-btn-v2" onClick={() => setIsSellGoldOpen(true)}>
            <span>{ctaLabel}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div id="mobile-navigation" className={`mobile-menu-dropdown ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-nav-links">
          {navLinks.map((link, i) => {
            const resolvedUrl = resolveUrl(link);
            const label = link.label || link.page?.slug || 'Link';
            return link.isExternal ? (
              <a
                key={label + i}
                href={resolvedUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ) : (
              <Link
                key={label + i}
                href={resolvedUrl}
                className={resolvedUrl !== '#' && pathname === resolvedUrl ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>

      <SellGoldModal isOpen={isSellGoldOpen} onClose={() => setIsSellGoldOpen(false)} />
    </header>
  );
}
