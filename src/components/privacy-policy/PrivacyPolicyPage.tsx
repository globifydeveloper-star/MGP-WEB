import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import './PrivacyPolicyPage.css';
import { DEFAULT_PRIVACY_BODY, DEFAULT_PRIVACY_SUBTITLE } from './defaultPolicy';
import type { PrivacyPolicyPageData } from '@/lib/strapi';

export default function PrivacyPolicyPage({ data }: { data?: PrivacyPolicyPageData | null }) {
  const contactHeading = data?.contactHeading || 'Contacting Us / Write to Us';
  const contactIntro = data?.contactIntro || 'If there are any questions regarding this privacy policy, you may contact us using the information below:';
  const contactName = data?.contactName || 'Muthoot Exim Pvt Ltd.';
  const contactAddress = data?.contactAddress || '40/7384 Muthoot Towers, M.G. Road, Ernakulam, Kerala - 682035';
  const contactEmail = data?.contactEmail || 'info@muthootexim.com';
  const contactPhone = data?.contactPhone || '1800 102 1616';

  return (
    <div className="privacy-page-root">
      {/* Hero Header */}
      <section className="privacy-hero">
        <div className="privacy-hero-container">
          <nav className="privacy-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="privacy-breadcrumb-separator">/</span>
            <span>{data?.breadcrumbLabel || 'Privacy Policy'}</span>
          </nav>
          <h1 className="privacy-hero-title">
            {data?.heroTitle ? (
              <>
                {data.heroTitle}{' '}
                {data.heroTitleHighlight ? <span>{data.heroTitleHighlight}</span> : null}
              </>
            ) : (
              <>Privacy <span>Policy</span></>
            )}
          </h1>
          <p className="privacy-hero-subtitle">
            {data?.heroSubtitle || DEFAULT_PRIVACY_SUBTITLE}
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <div className="privacy-content-wrapper">
        <article className="privacy-card">
          <div className="privacy-section" style={{ lineHeight: '1.8' }}>
            <ReactMarkdown
              components={{
                h2: ({ children }) => <h2 className="privacy-section-title">{children}</h2>,
                h3: ({ children }) => <h3 className="privacy-section-title" style={{ fontSize: '1.1rem' }}>{children}</h3>,
                p: ({ children }) => <p className="privacy-text">{children}</p>,
                ul: ({ children }) => <ul className="privacy-list">{children}</ul>,
                li: ({ children }) => <li className="privacy-list-item">{children}</li>,
              }}
            >
              {data?.body || DEFAULT_PRIVACY_BODY}
            </ReactMarkdown>
          </div>

          {/* Contacting Us - Always rendered with Strapi / fallback info */}
          <div className="privacy-section">
            <h2 className="privacy-section-title">{contactHeading}</h2>
            <p className="privacy-text">{contactIntro}</p>

            <div className="privacy-contact-box">
              <h3 className="privacy-contact-name">{contactName}</h3>
              <p className="privacy-contact-address">{contactAddress}</p>
              <div className="privacy-contact-links">
                {contactEmail && (
                  <a href={`mailto:${contactEmail}`} className="privacy-contact-link">
                    <svg className="privacy-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    {contactEmail}
                  </a>
                )}
                {contactPhone && (
                  <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="privacy-contact-link">
                    <svg className="privacy-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    {contactPhone}
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
