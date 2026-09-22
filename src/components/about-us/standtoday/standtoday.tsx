import React from 'react';
import { AboutUsPageData } from '@/lib/strapi';
import './standtoday.css';

interface StandTodayProps { data?: AboutUsPageData | null; }

export default function StandToday({ data }: StandTodayProps) {
  const defaultServices = [
    { title: "Gold Loans", icon: "💰" },
    { title: "Small Business Loans", icon: "💼" },
    { title: "Affordable Housing Loans", icon: "🏠" },
    { title: "Two Wheeler Loans", icon: "🏍️" },
    { title: "Used-car Loans", icon: "🚗" },
    { title: "Domestic Money Transfer", icon: "💸" },
    { title: "International Remittance", icon: "🌐" },
    { title: "Foreign Exchange", icon: "💱" },
    { title: "Insurance Products & Services", icon: "🛡️" },
    { title: "Wealth Management Services", icon: "📈" },
    { title: "Affordable Gold Jewellery", icon: "✨" }
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
                <span dangerouslySetInnerHTML={{ __html: data.presentTitle }} />
              ) : (
                <>Where We Stand <br /> <span className="gold-text">Today</span></>
              )}
            </h2>
            <p className="stand-today-desc">
              {data?.presentDescription ? (
                <span dangerouslySetInnerHTML={{ __html: data.presentDescription }} />
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
                    {service.icon || defaultServices[idx]?.icon || '✨'}
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
