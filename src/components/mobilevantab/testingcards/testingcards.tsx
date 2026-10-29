import React from 'react';
import Image from 'next/image';
import './testingcards.css';
import purityImg from '@/assets/images/purity.png';
import { MobileVanPageData } from '@/lib/strapi';

const DEFAULT_CARDS = [
  {
    title: 'No-Damage Testing',
    desc: 'Our XRF spectrometer determines gold purity without any touchstone scraping or melting of your precious jewelry.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'XRF Purity Testing',
    desc: 'We utilize advanced ultrasonic technology to ensure every piece is perfectly clean for 100% fair weight calculation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 2h6" />
        <path d="M10 2v6.3a2 2 0 0 1-.4 1.2L5.3 15.6A2 2 0 0 0 6.9 19h10.2a2 2 0 0 0 1.6-3.4l-4.3-5.1a2 2 0 0 1-.4-1.2V2" />
        <path d="M6.5 14.5h11" />
      </svg>
    ),
  },
  {
    title: 'Digital Invoicing',
    desc: 'Receive a complete breakdown and official invoice for every transaction, maintaining the highest corporate standards.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h8" />
        <path d="M8 9h3" />
      </svg>
    ),
  },
];

/* Ultrasonic cleaning tank: rimmed bath with liquid waves and control knobs */
const UltrasonicIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7h20" />
    <path d="M3.5 7v11a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V7" />
    <path d="M6 11c1-.8 2-.8 3 0s2 .8 3 0 2-.8 3 0 2 .8 3 0" />
    <circle cx="12.5" cy="16" r="1" />
    <circle cx="17" cy="16" r="1" />
  </svg>
);

/* XRF analyser: chamber with raised lid, sensor window and latch */
const XrfIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10l1.5-6h13L20 10" />
    <rect x="3" y="10" width="18" height="11" rx="1.5" />
    <circle cx="8" cy="15.5" r="2" />
    <path d="M14.5 10v3.5" />
    <circle cx="14.5" cy="15.5" r="1.5" />
  </svg>
);

/* Digital weighing scale: pan, base and display */
const WeighingIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10h16" />
    <path d="M12 10v4" />
    <rect x="3" y="14" width="18" height="7" rx="1.5" />
    <path d="M7 17.5h5" />
    <circle cx="17" cy="17.5" r="1" />
  </svg>
);

// Pick the icon from the card title (titles come from Strapi), falling back to position.
const iconForCard = (title: string | undefined, index: number) => {
  const t = (title || '').toLowerCase();
  if (t.includes('ultrasonic') || t.includes('clean')) return UltrasonicIcon;
  if (t.includes('xrf') || t.includes('purity')) return XrfIcon;
  if (t.includes('weigh')) return WeighingIcon;
  return DEFAULT_CARDS[index % DEFAULT_CARDS.length].icon;
};

interface TestingCardsProps {
  data?: MobileVanPageData | null;
}

export default function TestingCards({ data }: TestingCardsProps) {
  const cards = data?.testingMethods && data.testingMethods.length > 0
    ? data.testingMethods.map((c, i) => ({
        title: c.title,
        desc: c.desc,
        icon: iconForCard(c.title, i)
      }))
    : DEFAULT_CARDS.map((c, i) => ({ ...c, icon: iconForCard(c.title, i) }));

  return (
    <section className="tc-section">
      <div className="container">
        {data?.testingMethodsTitle && (
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--brand-blue-dark)' }}>
            {data.testingMethodsTitle}
          </h2>
        )}
        <div className="tc-grid">
          <div className="tc-cards-col">
            {cards.map((card) => (
              <div className="tc-card" key={card.title}>
                <div className="tc-card-header">
                  <span className="tc-card-icon">{card.icon}</span>
                  <h3 className="tc-card-title">{card.title}</h3>
                </div>
                <p className="tc-card-desc">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="tc-image-col">
            <div className="tc-image-glow" aria-hidden="true" />
            <div className="tc-image-box">
              <Image
                src={data?.testingMethodsImage || purityImg}
                alt="Lab technician performing XRF gold purity testing"
                width={1541}
                height={1021}
                className="tc-image"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
