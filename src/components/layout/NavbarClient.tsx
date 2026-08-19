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
  { label: 'Branches', url: 'https://branches.muthootgoldpoint.com/', isExternal: true },
  { label: 'Gold Rate', url: '/gold-rate' },
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
  return customLinks; // We now fully trust Strapi for NavLinks as per the requirement
}

export default function NavbarClient({ initialData }: { initialData: any }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSellGoldOpen, setIsSellGoldOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // ADD THIS
  const [navLinks, setNavLinks] = useState<NavItem[]>(initialData?.navLinks?.length ? mergeNavLinks(initialData.navLinks) : DEFAULT_NAV_LINKS);
  
  // ADD THESE TWO LINES:
  const visibleLinks = navLinks.slice(0, 5); // Show first 5 links on desktop
  const moreLinks = navLinks.slice(5);       // Everything else goes in "More"
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
        <Link href="/" className="navbar-logo-link" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
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
              style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%', cursor: 'pointer', marginLeft: '8px' }}
            >
              <span style={{ color: 'white', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '15px' }}>
                More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
              
              {dropdownOpen && (
                <div style={{ 
                    position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', 
                    borderRadius: '8px', padding: '8px 0', minWidth: '180px', 
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column',
                    zIndex: 100, marginTop: '10px'
                  }}
                >
                  {moreLinks.map((link, i) => {
                    const resolvedUrl = resolveUrl(link);
                    const label = link.label || link.page?.slug || 'Link';
                    return link.isExternal ? (
                      <a key={label + i} href={resolvedUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', color: '#0F1A4D', textDecoration: 'none', fontSize: '15px', fontWeight: 500, display: 'block' }}>{label}</a>
                    ) : (
                      <Link key={label + i} href={resolvedUrl} style={{ padding: '10px 20px', color: '#0F1A4D', textDecoration: 'none', fontSize: '15px', fontWeight: 500, display: 'block' }}>{label}</Link>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Right Side: Phone Contact & CTA */}
        <div className="navbar-right-group">
          <a href={`tel:${phoneRaw}`} className="navbar-phone-group">
            <svg
              viewBox="0 0 24 24"
              fill="white"
              style={{ width: '32px', height: '32px', display: 'block', flexShrink: 0 }}
            >
              <path d="M20 15.5c-1.25 0-2.45-.2-3.6-.6-.35-.1-.75-.02-1 .25l-2.2 2.2c-2.83-1.44-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1-.37-1.15-.57-2.35-.57-3.6 0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
              <path d="M15 3c3.31 0 6 2.69 6 6" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M15 7c1.1 0 2 .9 2 2" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="navbar-phone-number">{phoneNumber}</div>
          </a>
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
