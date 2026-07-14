'use client';

import React, { useState } from 'react';
import './Navbar.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logoImg from '@/assets/images/logo.png';
import SellGoldModal from './SellGoldModal';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '#' },
  { label: 'Mobile Van', href: '/mobilevantab' },
  { label: 'Branches', href: '#' },
  { label: 'Testimonials', href: '#' },
  { label: 'Gold Rate', href: '#' },
  { label: 'Career', href: '/career' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className={`navbar-header-v2 ${menuOpen ? 'header-menu-active' : ''}`}>
      <div className="navbar-container-v2">
        {/* Left Side: Logo & Navigation Links */}
        <div className="navbar-left-group">
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Image
              src={logoImg}
              alt="GOLDPOINT - We Buy Gold"
              width={183.23}
              height={49.88}
              priority
              style={{ display: 'block' }}
            />
          </a>
          <nav className={`navbar-nav-v2 ${menuOpen ? 'menu-active' : ''}`}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={link.href !== '#' && pathname === link.href ? 'active' : ''}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side: Phone Contact & CTA */}
        <div className="navbar-right-group">
          <a href="tel:+919037921192" className="navbar-phone-group">
            <svg
              viewBox="0 0 24 24"
              fill="white"
              style={{ width: '28px', height: '28px', display: 'block', flexShrink: 0 }}
            >
              <path d="M20 15.5c-1.25 0-2.45-.2-3.6-.6-.35-.1-.75-.02-1 .25l-2.2 2.2c-2.83-1.44-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1-.37-1.15-.57-2.35-.57-3.6 0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
              <path d="M15 3c3.31 0 6 2.69 6 6" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M15 7c1.1 0 2 .9 2 2" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="navbar-phone-number">+91 9037 921 192</div>
          </a>
          <button className="navbar-cta-btn-v2" onClick={() => setIsModalOpen(true)}>
            <span>Sell Your Gold</span>
          </button>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu-dropdown ${menuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={link.href !== '#' && pathname === link.href ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <SellGoldModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}     