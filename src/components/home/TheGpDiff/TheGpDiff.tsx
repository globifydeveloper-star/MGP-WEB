import React from 'react';
import './TheGpDiff.css';

interface TheGpDiffProps {
  cards?: any[];
}

const DEFAULT_CARDS = [
  {
    image: '/ImageSet/Homepage/GDP3.jpg',
    alt: "Supporting India’s Economy",
    title: "1. Supporting India’s Economy",
    desc: "We recycle old gold and bring it back into circulation, helping reduce India’s dependence on imported gold.",
    iconType: 'rupee',
  },
  {
    image: '/ImageSet/Homepage/GDP1.jpg',
    alt: "Protecting the Environment",
    title: "2. Protecting the Environment",
    desc: "Gold recycling reduces the need for mining, helping save natural resources and reduce environmental damage.",
    iconType: 'leaf',
  },
  {
    image: '/ImageSet/Homepage/GDP2.jpg',
    alt: "Transparent and Reliable Process",
    title: "3. Transparent and Reliable Process",
    desc: "We use scientific methods to evaluate gold, giving customers a transparent and reliable way to sell their unused gold.",
    iconType: 'scale',
  },
];

function getIcon(type: string, title?: string) {
  const normType = (type || '').toLowerCase();
  const normTitle = (title || '').toLowerCase();

  if (normType === 'rupee' || normTitle.includes('economy') || normTitle.includes('india')) {
    return <span className="gp-diff-rupee">₹</span>;
  }
  if (normType === 'leaf' || normType === 'environment' || normTitle.includes('environment') || normTitle.includes('protecting')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    );
  }
  if (normType === 'scale' || normTitle.includes('transparent') || normTitle.includes('reliable') || normTitle.includes('process')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="3" x2="12" y2="21" />
        <path d="M5 7h14" />
        <path d="M5 7l-3 7a3 3 0 0 0 6 0z" />
        <path d="M19 7l-3 7a3 3 0 0 0 6 0z" />
      </svg>
    );
  }
  if (normType === 'flask') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 2h6" />
        <path d="M10 2v6.34a2 2 0 0 1-.5 1.32L4.72 15.6A2 2 0 0 0 6.24 19h11.52a2 2 0 0 0 1.52-3.4l-4.78-6.94A2 2 0 0 1 14 8.34V2" />
        <path d="M6.5 14.5h11" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const isOldGdpDiff = (title?: string) => {
  if (!title) return false;
  const t = title.toLowerCase();
  return t.includes('xrf over touchstone') || t.includes('three-decimal weight') || t.includes('bank transfer, not cash');
};

export default function TheGpDiff({ cards }: TheGpDiffProps) {
  const activeCards = cards && cards.length > 0 && !cards.some((c) => isOldGdpDiff(c.boxTitle))
    ? [...cards]
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((c, idx) => {
          const fallback = DEFAULT_CARDS[idx % DEFAULT_CARDS.length];
          const rawTitle = c.boxTitle || fallback.title;
          const displayTitle = /^\d+\./.test(rawTitle) ? rawTitle : `${idx + 1}. ${rawTitle}`;
          return {
            image: c.boxImage || fallback.image,
            alt: rawTitle,
            title: displayTitle,
            desc: c.boxDescription || fallback.desc,
            iconType: c.iconType || fallback.iconType,
          };
        })
    : DEFAULT_CARDS;

  return (
    <section className="gp-diff-section">
      <div className="container">
        <div className="gp-diff-header">
          <h2 className="gp-diff-title">
            Why Choose <span className="gp-diff-highlight">Gold Point</span>
          </h2>
          <p className="gp-diff-subtitle">
            India&apos;s First National Level Organised Gold Buyer
          </p>
          <div className="gp-diff-divider" />
        </div>

        <div className="gp-diff-grid">
          {activeCards.map((card, idx) => (
            <div className="gp-diff-card" key={`${card.title}-${idx}`}>
              <div className="gp-diff-card-pattern" />
              <div className="gp-diff-card-image-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.image} alt={card.alt} className="gp-diff-card-image" />
              </div>
              <span className="gp-diff-card-icon">{getIcon(card.iconType, card.title)}</span>
              <h3 className="gp-diff-card-title">{card.title}</h3>
              <p className="gp-diff-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
