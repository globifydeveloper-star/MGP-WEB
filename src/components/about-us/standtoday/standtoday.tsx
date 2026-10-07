import React from 'react';
import { AboutUsPageData } from '@/lib/strapi';
import './standtoday.css';

interface StandTodayProps { data?: AboutUsPageData | null; }

// Inline SVG icons: emoji glyphs depend on an OS/browser emoji font, which some
// UAT/server environments don't have installed, so they render as blank boxes.
// SVGs always render the same regardless of environment.
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'gold loans': (
    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" /><path d="M9 8.5h4.5M9 11.5h4.5M9 8.5c2.5 0 4 1.3 4 3s-1.5 3-4 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  'small business loans': (
    <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="7.5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5M3 12.5h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  'affordable housing loans': (
    <svg viewBox="0 0 24 24" fill="none"><path d="M3.5 11.5 12 4l8.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M5.5 10v8.5a1 1 0 0 0 1 1H9.5v-5.5h5v5.5h3a1 1 0 0 0 1-1V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  'two wheeler loans': (
    <svg viewBox="0 0 24 24" fill="none"><circle cx="5.5" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.6" /><circle cx="18.5" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.6" /><path d="M5.5 17 9 10h4l2.5 3.5H18.5M9 10 7.5 7h-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  'used-car loans': (
    <svg viewBox="0 0 24 24" fill="none"><path d="M4 16V12.5l2-4.5a2 2 0 0 1 1.84-1.2h8.32A2 2 0 0 1 18 8l2 4.5V16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 16h16M6.5 16v1.5M17.5 16v1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="7.5" cy="12.5" r="1" fill="currentColor" /><circle cx="16.5" cy="12.5" r="1" fill="currentColor" /></svg>
  ),
  'domestic money transfer': (
    <svg viewBox="0 0 24 24" fill="none"><path d="M4 8h13M14 4.5 17.5 8 14 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M20 16H7M10 12.5 6.5 16 10 19.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  'international remittance': (
    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" /><path d="M3 12h18M12 3c2.4 2.4 3.6 5.6 3.6 9s-1.2 6.6-3.6 9c-2.4-2.4-3.6-5.6-3.6-9S9.6 5.4 12 3Z" stroke="currentColor" strokeWidth="1.6" /></svg>
  ),
  'foreign exchange': (
    <svg viewBox="0 0 24 24" fill="none"><path d="M4 7.5h10.5M11.5 4 15 7.5 11.5 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M20 16.5H9.5M12.5 13 9 16.5 12.5 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  'insurance products & services': (
    <svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5 19.5 6v5.5c0 4.5-3.1 7.7-7.5 9-4.4-1.3-7.5-4.5-7.5-9V6L12 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="m9 12 2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  'wealth management services': (
    <svg viewBox="0 0 24 24" fill="none"><path d="M4 19V5M4 19h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M7 15.5 11 11l2.5 2.5L19 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 8h4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  'affordable gold jewellery': (
    <svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5 15 8H9l3-4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M5 8h14l-7 12.5L5 8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 8l3 12.5L15 8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
  ),
};

const DEFAULT_SERVICE_ICON = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5 14 9.5 20 12l-6 2.5L12 20.5 10 14.5 4 12l6-2.5 2-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
);

function ServiceIcon({ title }: { title: string }) {
  const icon = SERVICE_ICONS[title.trim().toLowerCase()] || DEFAULT_SERVICE_ICON;
  return <>{icon}</>;
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

  const displayServices = data?.presentServices && data.presentServices.length > 0 ? data.presentServices : defaultServices;

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
                  <span className="service-icon" role="img" aria-label={service.title}>
                    <ServiceIcon title={service.title} />
                  </span>
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
