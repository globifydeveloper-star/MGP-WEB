import React from 'react';
import { AboutUsPageData } from '@/lib/strapi';
import './standtoday.css';

interface StandTodayProps { data?: AboutUsPageData | null; }

// Inline SVG icons: emoji glyphs depend on an OS/browser emoji font, which some
// UAT/server environments don't have installed, so they render as blank boxes.
// SVGs always render the same regardless of environment. Each entry below pairs
// an icon with its own accent color so the grid reads as colourful/"emojical"
// rather than a single flat gold tone, and is matched by keyword (not exact
// title) so CMS-authored titles like "Gold Loans & Precious Metals" still hit.
const SERVICE_ICON_DEFS: { keywords: string[]; color: string; icon: React.ReactNode }[] = [
  {
    keywords: ['gold loan', 'precious metal'],
    color: '#F1B933',
    icon: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" /><path d="M9 8.5h4.5M9 11.5h4.5M9 8.5c2.5 0 4 1.3 4 3s-1.5 3-4 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>,
  },
  {
    keywords: ['business loan'],
    color: '#4F9DDE',
    icon: <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="7.5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5M3 12.5h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>,
  },
  {
    keywords: ['housing loan'],
    color: '#4CAF7D',
    icon: <svg viewBox="0 0 24 24" fill="none"><path d="M3.5 11.5 12 4l8.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M5.5 10v8.5a1 1 0 0 0 1 1H9.5v-5.5h5v5.5h3a1 1 0 0 0 1-1V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    keywords: ['two wheeler', 'two-wheeler', 'used-car', 'used car'],
    color: '#E0724A',
    icon: <svg viewBox="0 0 24 24" fill="none"><circle cx="5.5" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.6" /><circle cx="18.5" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.6" /><path d="M5.5 17 9 10h4l2.5 3.5H18.5M9 10 7.5 7h-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    keywords: ['money transfer'],
    color: '#8E6FD1',
    icon: <svg viewBox="0 0 24 24" fill="none"><path d="M4 8h13M14 4.5 17.5 8 14 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M20 16H7M10 12.5 6.5 16 10 19.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    keywords: ['remittance', 'forex', 'foreign exchange'],
    color: '#3FBAC2',
    icon: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" /><path d="M3 12h18M12 3c2.4 2.4 3.6 5.6 3.6 9s-1.2 6.6-3.6 9c-2.4-2.4-3.6-5.6-3.6-9S9.6 5.4 12 3Z" stroke="currentColor" strokeWidth="1.6" /></svg>,
  },
  {
    keywords: ['insurance', 'wealth'],
    color: '#D65C9E',
    icon: <svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5 19.5 6v5.5c0 4.5-3.1 7.7-7.5 9-4.4-1.3-7.5-4.5-7.5-9V6L12 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="m9 12 2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    keywords: ['jewellery', 'jewelry'],
    color: '#F1B933',
    icon: <svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5 15 8H9l3-4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M5 8h14l-7 12.5L5 8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 8l3 12.5L15 8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>,
  },
];

const DEFAULT_SERVICE_ICON = {
  color: '#F1B933',
  icon: <svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5 14 9.5 20 12l-6 2.5L12 20.5 10 14.5 4 12l6-2.5 2-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>,
};

function getServiceIcon(title: string) {
  const normalized = title.trim().toLowerCase();
  const match = SERVICE_ICON_DEFS.find((def) => def.keywords.some((kw) => normalized.includes(kw)));
  return match || DEFAULT_SERVICE_ICON;
}

function ServiceIcon({ title }: { title: string }) {
  const { color, icon } = getServiceIcon(title);
  return (
    <span
      className="service-icon"
      role="img"
      aria-label={title}
      style={{ color, background: `${color}26`, borderColor: `${color}40` }}
    >
      {icon}
    </span>
  );
}

export default function StandToday({ data }: StandTodayProps) {
  const defaultServices = [
    { title: "Gold Loans" },
    { title: "Small Business Loans" },
    { title: "Affordable Housing Loans" },
    { title: "Two Wheeler Loans" },
    { title: "Used-car Loans" },
    { title: "Domestic Money Transfer" },
    { title: "International Remittance" },
    { title: "Foreign Exchange" },
    { title: "Insurance Products & Services" },
    { title: "Wealth Management Services" },
    { title: "Affordable Gold Jewellery" }
  ];

  const rawServices = data?.presentServices && data.presentServices.length > 0 ? data.presentServices : defaultServices;
  // Drop stray/placeholder CMS entries whose title is just "services" (a
  // duplicate of the section heading rather than an actual service).
  const displayServices = rawServices.filter((service: any) => service.title?.trim().toLowerCase() !== 'services');

  return (
    <section className="stand-today-section">
      <div className="container">
        <div className="stand-today-grid">
          
          {/* Left Columns - Info */}
          <div className="stand-today-info">
            <span className="stand-today-subtitle">{data?.presentSubtitle || 'Present Day'}</span>
            <h2 className="stand-today-title">
              {data?.presentTitle ? (
                <span dangerouslySetInnerHTML={{ __html: require('isomorphic-dompurify').sanitize(data.presentTitle) }} />
              ) : (
                <>Where We Stand <br /> <span className="gold-text">Today</span></>
              )}
            </h2>
            <p className="stand-today-desc">
              {data?.presentDescription ? (
                <span dangerouslySetInnerHTML={{ __html: require('isomorphic-dompurify').sanitize(data.presentDescription) }} />
              ) : (
                <>Currently serving over <strong>5 million customers</strong> through a nation-wide workforce of <strong>24,000 employees</strong>.</>
              )}
            </p>
            <p className="stand-today-subdesc">
              {data?.presentSubDescription || 'Our customer-centric approach and constant innovation in products cater to changing customer needs, helping us secure lifelong loyalty. By adopting state-of-the-art technology without compromising our core ethics, we serve over 100,000 customers daily.'}
            </p>
            
            <div className="financial-supermarket-card">
              <span className="highlight-tag">{data?.presentCardTag || 'One-Stop Solution'}</span>
              <h3>{data?.presentCardTitle || 'The Financial Supermarket'}</h3>
              <p>{data?.presentCardDesc || 'Each of our 4,200+ branches operates as a comprehensive financial hub, housing a diverse range of products designed to empower local ambitions under a single roof.'}</p>
            </div>
          </div>

          {/* Right Columns - Services Grid */}
          <div className="stand-today-services">
            <h3 className="services-title">{data?.presentServicesTitle || 'Services Offered at Our Branches'}</h3>
            <div className="services-grid">
              {displayServices.map((service: any, idx: number) => (
                <div key={idx} className="service-card glass-panel">
                  <ServiceIcon title={service.title} />
                  <h4>{service.title}</h4>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
