import React from 'react';
import { AboutUsPageData } from '@/lib/strapi';
import './standtoday.css';

interface StandTodayProps { data?: AboutUsPageData | null; }

function getServiceIcon(title: string = '') {
  const t = title.toLowerCase();
  if (t.includes('gold loan') || t.includes('gold')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="6" />
        <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
        <path d="M7 6h2v4H7z" />
        <path d="M15 14h2v4h-2z" />
      </svg>
    );
  }
  if (t.includes('business') || t.includes('small business')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="7" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    );
  }
  if (t.includes('housing') || t.includes('home') || t.includes('house')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  }
  if (t.includes('two wheeler') || t.includes('wheeler') || t.includes('bike') || t.includes('motorcycle')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5.5" cy="17.5" r="3.5" />
        <circle cx="18.5" cy="17.5" r="3.5" />
        <path d="M15 6h4l-3 6.5H8.5l-3-6H3" />
        <path d="M12 17.5V14l3-3" />
      </svg>
    );
  }
  if (t.includes('car') || t.includes('used-car') || t.includes('auto')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11.2 2 11.6 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    );
  }
  if (t.includes('domestic') || t.includes('transfer')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m17 2 4 4-4 4" />
        <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
        <path d="m7 22-4-4 4-4" />
        <path d="M21 13v1a4 4 0 0 1-4 4H3" />
      </svg>
    );
  }
  if (t.includes('international') || t.includes('remittance') || t.includes('global')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  }
  if (t.includes('foreign') || t.includes('exchange') || t.includes('forex')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
        <path d="M12 6v12" />
      </svg>
    );
  }
  if (t.includes('insurance') || t.includes('protection') || t.includes('shield')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (t.includes('wealth') || t.includes('management') || t.includes('growth')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    );
  }
  if (t.includes('jewellery') || t.includes('jewelry') || t.includes('jewel')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 13L2 9z" />
        <path d="M11 3 8 9l4 13 4-13-3-6" />
        <path d="M2 9h20" />
      </svg>
    );
  }

  // Fallback spark icon
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
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
                  <span className="service-icon" aria-label={service.title}>
                    {getServiceIcon(service.title)}
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
