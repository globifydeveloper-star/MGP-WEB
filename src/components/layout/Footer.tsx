import React from 'react';
import Link from 'next/link';
import './Footer.css';
import { getFooterSetting } from '@/lib/strapi';
import WebsiteDropdown from './WebsiteDropdown';

export default async function Footer() {
  const cities = [
    'Bangalore', 'Coimbatore', 'Kolkata', 'Delhi',
    'Vijayawada', 'Mumbai', 'Pune', 'Noida',
    'Indore', 'Vizag', 'Hyderabad', 'Chennai',
    'Ernakulam', 'Gurugram', 'Madurai', 'Mysore'
  ];

  const footerSettings = await getFooterSetting();
  
  const quickLinks = footerSettings?.quickLinks || [
    { id: 1, label: 'About Us', url: '/about-us' },
    { id: 2, label: 'Mobile Van', url: '/mobile-van' },
    { id: 3, label: 'Privacy Policy', url: '/privacy-policy' },
    { id: 4, label: 'Gold Rate', url: '/gold-rate' },
    { id: 5, label: 'Blog', url: '/blog' },
    { id: 6, label: 'Testimonials', url: '/testimonials' },
    { id: 7, label: 'Contact Us', url: '/contact-us' },
    { id: 8, label: 'FAQs', url: '/faq' },
    { id: 9, label: 'Gold Price Calculator', url: '/gold-price-calculator' },
  ];
  const legalLinks = footerSettings?.legalLinks || [];

  const hasLegalLinks = legalLinks.length > 0;


  return (
    <footer className="footer-root">
      {/* Top Section */}
      <div className="container footer-top-container">
        
        {/* Col 1: Brand */}
        <div className="footer-col brand-col">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/components/logo_image.png"
            alt="Muthoot Gold Point"
            className="footer-logo"
            width={180}
            height={53}
          />
          <p className="footer-desc">
            Muthoot Gold Point, a unit of Muthoot Exim (P) Ltd. (Precious Metals Division) is a venture of the Muthoot Pappachan Group. It is the first National level organised sector venture to get into recycling of Gold.
          </p>
        </div>

        {/* Col 2: Reach Us */}
        <div className="footer-col">
          <h4 className="footer-col-title">Reach Us</h4>
          <div className="reach-item">
            <svg className="reach-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
            <span>0484 2351481</span>
          </div>
          <div className="reach-item">
            <svg className="reach-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
            <span>0484 2351494</span>
          </div>
          <div className="reach-item">
            <svg className="reach-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            <span>info@muthootexim.com</span>
          </div>
        </div>

        {/* Col 3: Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links-list">
            {quickLinks.map((link) => {
              // Resolve URL: prioritize page slug if relation exists, otherwise fallback to typed URL
              const resolvedUrl = link.page?.slug ? `/${link.page.slug}` : (link.url || '#');
              
              return (
                <li key={link.id}>
                  <Link href={resolvedUrl} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Col 4: Legal Links (or empty spacer) */}
        {hasLegalLinks ? (
          <div className="footer-col">
            <h4 className="footer-col-title">Legal Links</h4>
            <ul className="footer-links-list">
              {legalLinks.map((link) => {
                // Resolve URL for legal links as well
                const resolvedUrl = link.page?.slug ? `/${link.page.slug}` : (link.url || '#');
                
                return (
                  <li key={link.id}>
                    <Link href={resolvedUrl} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="footer-col"></div>
        )}


        {/* Col 5: Presence */}
        <div className="footer-col">
          <h4 className="footer-col-title">Our Presence - Cities</h4>
          <div className="presence-cities-box">
            {cities.join(', ')}
          </div>
          <h4 className="footer-col-title">Our Presence - States</h4>
          <div className="presence-states">
            Madhya Pradesh, Andhra Pradesh, Kerala, Telangana, Maharashtra, Tamil Nadu, Karnataka Uttarpradesh, Delhi NCR, West Bengal, Haryana, Rajasthan, Odisha, Punjab, Uttarakhand, Gujarat, Chhattisgarh, Assam
          </div>
        </div>
      </div>

      {/* Middle Bar */}
      <div className="footer-middle-bar">
        <div className="container middle-bar-container">
          <div className="legal-text-string">
            CIN: U51909KL1998PTC012492 | GST Number: 32AACCM4564E1ZS | Contact ID: info@muthootexim.com | Contact Number: 0484 2351481
          </div>
          <div className="middle-bar-right">
            <WebsiteDropdown />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container footer-bottom-container">
        
        {/* Col 1: Toll Free */}
        <div className="footer-col">
          <h4 className="bottom-col-title">Our Toll Free Number</h4>
          <p className="toll-free-desc">Call our toll-free number and talk to a customer care representative.</p>
          <a href="tel:18001021616" className="toll-free-number" style={{textDecoration: 'none'}}>1800 102 1616</a>
        </div>

        {/* Col 2: Registered Office */}
        <div className="footer-col">
          <div className="office-content">
            <h4 className="bottom-col-title">Registered Office</h4>
            <p className="office-address">
              Muthoot Exim Private Limited<br/>
              Ground Floor Muthoot Towers,<br/>
              M.G.Road, Opposite Abad Plaza<br/>
              Ernakulam,<br/>
              Ernakulam, Kerala, 682035
            </p>
          </div>
        </div>

        {/* Col 3: Socials & Copyright */}
        <div className="footer-col">
          <h4 className="bottom-col-title">Follow Us On</h4>
          <div className="social-row">
            <a href="https://facebook.com/MGoldPoint" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="Facebook">
              <svg width="28" height="28" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                <path fill="#ffffff" d="M16.671 15.343l.532-3.47h-3.328V9.623c0-.949.465-1.874 1.956-1.874h1.514V4.796s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.643H7.078v3.47h3.047v8.385c.618.096 1.25.148 1.875.148.626 0 1.258-.052 1.875-.148v-8.385h2.796z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/muthoot.goldpoint/" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="Instagram">
              <svg width="28" height="28" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f09433" />
                    <stop offset="25%" stopColor="#e6683c" />
                    <stop offset="50%" stopColor="#dc2743" />
                    <stop offset="75%" stopColor="#cc2366" />
                    <stop offset="100%" stopColor="#bc1888" />
                  </linearGradient>
                </defs>
                <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="https://linkedin.com/company/muthoot-exim-private-limited/" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="LinkedIn">
              <svg width="28" height="28" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="4" fill="#0A66C2" />
                <path fill="#ffffff" d="M18.45 18.45h-2.56v-4.57c0-1.09-.02-2.49-1.52-2.49-1.52 0-1.75 1.19-1.75 2.41v4.65H10.06V9h2.46v1.28h.03c.34-.65 1.18-1.33 2.43-1.33 2.6 0 3.08 1.71 3.08 3.94v5.56zM6.34 7.82a1.49 1.49 0 110-2.98 1.49 1.49 0 010 2.98zM7.62 18.45H5.06V9h2.56v9.45z" />
              </svg>
            </a>
            <a href="https://twitter.com/muthootindia" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="X">
              <svg width="28" height="28" viewBox="0 0 24 24">
                <rect width="24" height="24" rx="4" fill="#000000" />
                <path fill="#ffffff" d="M18.24 3.5h3.3l-7.2 8.23 8.47 11.27h-6.63l-5.19-6.79-5.94 6.79H2.55l7.7-8.8L2.14 3.5h6.8l4.69 6.2 5.61-6.2zm-1.16 17.52h1.83L7.02 5.38H5.06l12.02 15.64z" />
              </svg>
            </a>
            <a href="https://youtube.com/muthoot" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="YouTube">
              <svg width="28" height="28" viewBox="0 0 24 24">
                <path fill="#FF0000" d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.81z" />
                <path fill="#ffffff" d="M9.6 15.6V8.4l6.24 3.6-6.24 3.6z" />
              </svg>
            </a>
          </div>

          <a href="/bureau-of-indian-standards-licence-muthoot-gold-point.pdf" target="_blank" rel="noopener noreferrer" className="bis-logo-link">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/components/bis_logo.png"
              alt="Bureau of Indian Standards - The National Standards Body of India"
              className="bis-logo-img"
              width={220}
              height={65}
            />
          </a>

          <p className="copyright-text">Copyright © Muthoot Exim Pvt 2026 - All Rights Reserved</p>
        </div>

      </div>
    </footer>
  );
}
