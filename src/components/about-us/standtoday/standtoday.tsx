import React from 'react';
import { AboutUsPageData } from '@/lib/strapi';
import './standtoday.css';

interface StandTodayProps { data?: AboutUsPageData | null; }

export default function StandToday({ data }: StandTodayProps) {
  const services = [
    {
      title: "Gold Loans & Precious Metals",
      icon: "💰"
    },
    {
      title: "Small Business Loans",
      icon: "💼"
    },
    {
      title: "Affordable Housing Loans",
      icon: "🏠"
    },
    {
      title: "Two-Wheeler & Used-Car Loans",
      icon: "🏍️"
    },
    {
      title: "Domestic Money Transfer",
      icon: "💸"
    },
    {
      title: "International Remittance & Forex",
      icon: "🌐"
    },
    {
      title: "Insurance & Wealth Management",
      icon: "🛡️"
    },
    {
      title: "Affordable Gold Jewellery",
      icon: "✨"
    }
  ];

  return (
    <section className="stand-today-section">
      <div className="container">
        <div className="stand-today-grid">
          
          {/* Left Columns - Info */}
          <div className="stand-today-info">
            <span className="stand-today-subtitle">Present Day</span>
            <h2 className="stand-today-title">
              Where We Stand <br />
              <span className="gold-text">Today</span>
            </h2>
            <p className="stand-today-desc">
              Currently serving over <strong>5 million customers</strong> through a nation-wide workforce of <strong>24,000 employees</strong>. 
            </p>
            <p className="stand-today-subdesc">
              Our customer-centric approach and constant innovation in products cater to changing customer needs, helping us secure lifelong loyalty. By adopting state-of-the-art technology without compromising our core ethics, we serve over 100,000 customers daily.
            </p>
            
            <div className="financial-supermarket-card">
              <span className="highlight-tag">One-Stop Solution</span>
              <h3>The Financial Supermarket</h3>
              <p>Each of our 4,200+ branches operates as a comprehensive financial hub, housing a diverse range of products designed to empower local ambitions under a single roof.</p>
            </div>
          </div>

          {/* Right Columns - Services Grid */}
          <div className="stand-today-services">
            <h3 className="services-title">Services Offered at Our Branches</h3>
            <div className="services-grid">
              {services.map((service, idx) => (
                <div key={idx} className="service-card glass-panel">
                  <span className="service-icon" role="img" aria-label={service.title}>
                    {service.icon}
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
