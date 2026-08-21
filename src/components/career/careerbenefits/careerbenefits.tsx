import React from 'react';
import './careerbenefits.css';
import { CareerPageSettingsData } from '@/lib/strapi';

interface CareerBenefitsProps { data?: CareerPageSettingsData | null; }

export default function CareerBenefits({ data }: CareerBenefitsProps) {
  // Use Strapi benefits or default to empty array
  const benefits = data?.careerBenefits && data.careerBenefits.length > 0
    ? data.careerBenefits
    : [];

  return (
    <section className="career-benefits-section">
      <div className="container">
        <h2 className="career-benefits-title">{data?.cultureHeading || 'Why Join Muthoot?'}</h2>
        <div className="career-benefits-grid">

          {benefits.length > 0 ? (
            benefits.map((benefit) => (
              <div key={benefit.id} className="career-benefit-card">
                <div className="career-benefit-icon">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3>{benefit.title}</h3>
                {benefit.desc && <p>{benefit.desc}</p>}
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "var(--text-muted)" }}>No benefits added yet.</p>
          )}

        </div>
      </div>
    </section>
  );
}
