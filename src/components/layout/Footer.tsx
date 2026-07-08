'use client';

import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="container footer-container">
        {/* Column 1: Brand & Description */}
        <div className="footer-col brand-col">
          <div className="footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/dxf3gabsi/image/upload/v1782895726/logo_zggja3.png"
              alt="GOLDPOINT - We Buy Gold"
              className="logo-img"
              width={160}
              height={38}
            />
            <span className="logo-subtext">A Muthoot Blue Venture</span>
          </div>
          <p className="footer-desc">
            Muthoot Goldpoint, a part of Muthoot Pappachan Group (Muthoot Blue), is the first national level organized player to buy old and pledged gold in a transparent and scientific manner.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-icon-link" aria-label="Facebook">
              <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
            </a>
            <a href="#" className="social-icon-link" aria-label="Twitter">
              <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" className="social-icon-link" aria-label="Instagram">
              <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col links-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links-list">
            <li><a href="#" className="footer-link">Home</a></li>
            <li><a href="#" className="footer-link">About Us</a></li>
            <li><a href="#" className="footer-link">Mobile Gold Van</a></li>
            <li><a href="#" className="footer-link">Branches</a></li>
            <li><a href="#" className="footer-link">Testimonials</a></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div className="footer-col links-col">
          <h4 className="footer-col-title">Resources</h4>
          <ul className="footer-links-list">
            <li><a href="#" className="footer-link">Gold Rate Calculator</a></li>
            <li><a href="#" className="footer-link">Today&apos;s Gold Rate</a></li>
            <li><a href="#" className="footer-link">FAQs</a></li>
            <li><a href="#" className="footer-link">Pledged Gold Guide</a></li>
            <li><a href="#" className="footer-link">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="footer-col contact-col">
          <h4 className="footer-col-title">Contact Us</h4>
          <ul className="footer-contact-list">
            <li className="contact-item">
              <svg className="contact-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>Muthoot Pappachan Group, Kochi, Kerala, India</span>
            </li>
            <li className="contact-item">
              <svg className="contact-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <a href="tel:+919037921192" className="contact-link">+91 9037 921 192</a>
            </li>
            <li className="contact-item">
              <svg className="contact-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <a href="mailto:info@muthootexim.com" className="contact-link">info@muthootexim.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar: Copyright & Disclaimer */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Muthoot Goldpoint. All Rights Reserved. A Muthoot Pappachan Group Venture.
          </p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Terms of Use</a>
            <span className="dot-separator">&bull;</span>
            <a href="#" className="footer-bottom-link">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
