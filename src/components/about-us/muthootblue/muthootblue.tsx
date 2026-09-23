import React from 'react';
import Image from 'next/image';
import { AboutUsPageData } from '@/lib/strapi';
import './muthootblue.css';

const DEFAULT_STATS = [
  { label: 'Years of Legacy', number: '138+' },
  { label: 'Branches', number: '4,200+' },
  { label: 'Daily Customers', number: '100k+' },
  { label: 'Employees', number: '24,000+' },
];

interface MuthootBlueProps { data?: AboutUsPageData | null; }

export default function MuthootBlue({ data }: MuthootBlueProps) {
  return (
    <section className="muthoot-blue-section">
      <div className="container">
        <div className="blue-grid">
          {/* Left: Copy */}
          <div className="blue-text-side">
            <span className="blue-eyebrow">
              <span className="blue-eyebrow-icon" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
                </svg>
              </span>
              {data?.parentEyebrow || 'Parent Conglomerate'}
            </span>

            <h2 className="blue-title">
              {data?.parentTitle ? (
                <span dangerouslySetInnerHTML={{ __html: data.parentTitle }} />
              ) : (
                <>About The <span className="gold-text">Muthoot Pappachan Group</span></>
              )}
            </h2>

            <>
              <p className="blue-desc">
                The Muthoot Pappachan Group, also popularly known as the Muthoot Blue Group, is built on the bedrock of Trust and is shaped by core values of Integrity, Collaboration and Excellence. With the genesis in its Founder, Shri Muthoot Pappachan&apos;s unwavering faith in God&apos;s teachings of love, respect and duty towards humanity and resolute adherence to basic human values &amp; principles, the Group have evolved over the decades, into a business conglomerate that has the well-being of the people at the lower levels of socio-economic strata, at the very centre towards empowering the human ambition of these under-served masses in India.
              </p>
              <p className="blue-desc">
                We are the part of Muthoot Pappachan Group (also known as Muthoot Blue). We have inherited values &amp; principles and taken over +138 years&apos; legacy forward to empower millions of Indians in their grit &amp; determination to rise above their ordinariness towards an aureate tomorrow. With around 4200 branches across India, we endeavor to serve over 1,00,000 customers a day. Including our other Group-companies products, we offer our target customer an extensive array of financial products &amp; services, like <a href="https://www.muthootfincorp.com/product-service/gold-loan/" target="_blank" rel="noopener noreferrer" className="blue-link" style={{color: '#0070c0'}}>Gold Loans</a>, Small Business Loans, Affordable Housing Loans, <a href="https://www.muthootfincorp.com/two-wheeler-loan/" target="_blank" rel="noopener noreferrer" className="blue-link" style={{color: '#0070c0'}}>Two wheeler Loans</a>, <a href="https://www.muthootfincorp.com/used-car-loan/" target="_blank" rel="noopener noreferrer" className="blue-link" style={{color: '#0070c0'}}>Used-car Loans</a>, Domestic Money Transfer, International Remittance, Foreign Exchange, Insurance Products &amp; Services, Wealth Management Services for the common, Affordable Gold Jewellery and more. Each of these 4200 or so branches is like a financial super-market helping our customer in fulfilling most of their requirements under one roof.
              </p>
            </>

            <ul className="blue-checklist">
              {data?.parentChecklist && data.parentChecklist.length > 0 ? (
                data.parentChecklist.map((item) => (
                  <li key={item.id}>
                    <span className="blue-check-icon" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0c1835" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    {item.text}
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <span className="blue-check-icon" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0c1835" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Trusted and reliable since 1887
                  </li>
                  <li>
                    <span className="blue-check-icon" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0c1835" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Empowering millions of Indians to rise above their ordinariness
                  </li>
                </>
              )}
            </ul>

            <a
              href="https://www.muthootpappachan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="blue-cta-btn"
            >
              Visit muthoot.com
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>


          {/* Right: Group Highlights */}
          <div className="blue-compare-side">
            <div className="blue-compare-heading">
              <span className="blue-compare-check" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0c1835" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <p>{data?.parentCompareHeading || 'A Massive Business Conglomerate'}</p>
            </div>

            <div className="blue-compare-table">
              <div className="blue-compare-row blue-compare-row-header">
                <span>Muthoot Pappachan Group</span>
                <span>At a Glance</span>
              </div>

              {(data?.parentStats && data.parentStats.length > 0 ? data.parentStats : DEFAULT_STATS).map((stat) => (
                <div className="blue-compare-row" key={stat.label}>
                  <span className="blue-compare-label">{stat.label}</span>
                  <span className="blue-compare-num">{stat.number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
