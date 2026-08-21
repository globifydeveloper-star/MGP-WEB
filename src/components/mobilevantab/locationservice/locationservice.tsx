import React from 'react';
import './locationservice.css';
import { MobileVanPageData } from '@/lib/strapi';

const LOCATIONS = [
  {
    city: 'Mumbai',
    desc: 'Serving the entire metropolitan area including Kalyan and surrounding suburbs.',
    phones: ['7356534111', '70344 31122'],
  },
  {
    city: 'Kalyan',
    desc: 'Dedicated units for quick response times in the Kalyan region.',
    phones: ['90379 81588'],
  },
  {
    city: 'Bengaluru',
    desc: 'Premium doorstep gold valuation now available across Bengaluru city.',
    phones: ['9072031234'],
  },
];

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

interface LocationServiceProps {
  data?: MobileVanPageData | null;
}

export default function LocationService({ data }: LocationServiceProps) {
  return (
    <section className="ls-section">
      <div className="container">
        <div className="ls-header">
          <h2 className="ls-title">
            {data?.locationsTitle ? data.locationsTitle : (
              <>Available <span className="ls-title-highlight">Location Services</span></>
            )}
          </h2>
          <p className="ls-subtitle">
            {data?.locationsDescription || 'Our transparent process ensures you get the true value of your gold using scientific methods right in front of your eyes.'}
          </p>
        </div>

        <div className="ls-grid">
          {LOCATIONS.map((loc) => (
            <div className="ls-card" key={loc.city}>
              <div className="ls-card-header">
                <span className="ls-pin-icon"><PinIcon /></span>
                <h3 className="ls-city">{loc.city}</h3>
              </div>
              <p className="ls-desc">{loc.desc}</p>
              <div className="ls-phones">
                {loc.phones.map((phone) => (
                  <div className="ls-phone-row" key={phone}>
                    <span className="ls-phone-icon"><PhoneIcon /></span>
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="ls-phone-link">
                      {phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
