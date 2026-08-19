'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './Footer.css';
import { getFooterSetting, NavItem } from '@/lib/strapi';

const DEFAULT_QUICK_LINKS: NavItem[] = [
  { label: 'About Us', url: '/about-us' },
  { label: 'Sell Gold', url: '/sell-gold-for-cash' },
  { label: 'Careers', url: '/career' },
  { label: 'Branch Locator', url: 'https://branches.muthootgoldpoint.com/', isExternal: true },
  { label: 'FAQs', url: '/faq' },
  { label: 'Contact Us', url: '/contact-us' },
  { label: 'Blog', url: '/blog' },
];

const DEFAULT_LEGAL_LINKS: NavItem[] = [
  { label: 'Privacy Policy', url: '/privacy-policy' },
  { label: 'Cookie Policy', url: '/cookie-policy' },
  { label: 'Terms of Service', url: '/terms-of-service' },
];

function resolveUrl(link: NavItem): string {
  if (link.url) return link.url;
  if (link.page?.slug) {
    if (link.page.slug === 'home' || link.page.slug === '/') return '/';
    return `/${link.page.slug}`;
  }
  return '#';
}

export default function Footer() {
  const [quickLinks, setQuickLinks] = useState<NavItem[]>(DEFAULT_QUICK_LINKS);
  const [legalLinks, setLegalLinks] = useState<NavItem[]>(DEFAULT_LEGAL_LINKS);

  useEffect(() => {
    let isMounted = true;
    getFooterSetting()
      .then((data) => {
        if (!isMounted || !data) return;
        if (data.quickLinks && data.quickLinks.length > 0) {
          setQuickLinks(data.quickLinks);
        }
        if (data.legalLinks && data.legalLinks.length > 0) {
          setLegalLinks(data.legalLinks);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer className="footer-root">
      <div className="container footer-container">
        {/* Column 1: Brand & Description */}
        <div className="footer-col brand-col">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo_image.png"
            alt="GOLDPOINT - We Buy Gold - A unit of muthoot EXIM Pvt. Ltd."
            className="logo-img"
            width={220}
            height={65}
          />
          <p className="footer-desc">
            Muthoot Gold Point is the first National level organized sector venture to get into recycling of Gold,backed by a 133+ year legacy.
          </p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/MGoldPoint/" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Facebook">
              <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" /></svg>
            </a>
            <a href="https://www.instagram.com/muthoot.goldpoint/" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram">
              <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href="https://www.youtube.com/watch?v=qntmLoXsN_c" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="YouTube">
              <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.81zM9.6 15.6V8.4l6.24 3.6-6.24 3.6z" /></svg>
            </a>
            <a href="https://www.linkedin.com/company/muthoot-exim-private-limited/" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
              <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
            </a>
            <a href="https://x.com/muthootindia?lang=en" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="X">
              <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M18.24 2.5h3.3l-7.2 8.23 8.47 11.27h-6.63l-5.19-6.79-5.94 6.79H1.55l7.7-8.8L1.14 2.5h6.8l4.69 6.2 5.61-6.2zm-1.16 17.52h1.83L7.02 4.38H5.06l12.02 15.64z" /></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col links-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links-list">
            {quickLinks.map((link, i) => {
              const resolvedUrl = resolveUrl(link);
              const label = link.label || link.page?.slug || 'Link';
              return (
                <li key={label + i}>
                  {link.isExternal ? (
                    <a href={resolvedUrl} target="_blank" rel="noopener noreferrer" className="footer-link">{label}</a>
                  ) : (
                    <Link href={resolvedUrl} className="footer-link">{label}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Column 3: Registered Office */}
        <div className="footer-col office-col">
          <h4 className="footer-col-title">Registered Office</h4>
          <div className="office-item">
            <svg className="office-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span>Muthoot Exim Private Limited Ground Floor Muthoot Towers, M.G.Road, Opposite Abad Plaza Ernakulam, Kerala, 682035</span>
          </div>

          <div className="office-divider" />

          <div className="office-item">
            <svg className="office-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3.5 2" />
            </svg>
            <div className="office-hours">
              <span className="office-hours-days">Monday - Friday</span>
              <span className="office-hours-time">9:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>

        {/* Column 4: Phone & Certification */}
        <div className="footer-col phone-col">
          <div className="phone-row">
            <svg className="phone-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <div className="phone-text">
              <a href="tel:18001021616" className="phone-number">1800 102 1616</a>
              <span className="phone-label">Toll Free Support</span>
            </div>
          </div>

          <div className="cert-box">
            <span className="cert-icon">
              <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </span>
            <span className="cert-text">Bureau of Indian Standards Licensed Gold Buying Center</span>
          </div>
        </div>
      </div>

      {/* Bottom bar: Copyright & Disclaimer */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="copyright-text">
            Copyright &copy; Muthoot Exim {new Date().getFullYear()}. All Rights Reserved.
          </p>
          <div className="footer-bottom-links">
            {legalLinks.map((link, i) => {
              const resolvedUrl = resolveUrl(link);
              const label = link.label || link.page?.slug || 'Link';
              return link.isExternal ? (
                <a key={label + i} href={resolvedUrl} target="_blank" rel="noopener noreferrer" className="footer-bottom-link">{label}</a>
              ) : (
                <Link key={label + i} href={resolvedUrl} className="footer-bottom-link">{label}</Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
