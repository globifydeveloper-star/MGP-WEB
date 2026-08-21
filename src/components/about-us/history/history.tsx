import React from 'react';
import { AboutUsPageData } from '@/lib/strapi';
import './history.css';

interface HistoryProps { data?: AboutUsPageData | null; }

export default function History({ data }: HistoryProps) {
  // Use the milestones from Strapi, or fallback to the defaults if empty
  const milestones = data?.historyMilestones && data.historyMilestones.length > 0
    ? data.historyMilestones
    : [
      {
        year: "1887",
        title: "Humble Beginnings",
        desc: "Founded by Muthoot Ninan Mathai as a grain trading and chit fund business in Kozhencherry, Kerala."
      },
      {
        year: "1950s",
        title: "Gold Loan Pioneer",
        desc: "Entered the gold loan business, making Kozhencherry the region's premier destination for trust-based lending."
      },
      {
        year: "1979",
        title: "Muthoot Pappachan Group Formed",
        desc: "Led by Mathew M. Thomas, MPG was born with a strong focus on serving the common man."
      },
      {
        year: "Today",
        title: "Modern Expansion",
        desc: "Diversified into Hospitality, Automotive, Real Estate, Healthcare, Precious Metals, and more."
      }
    ];

  return (
    <section id="our-legacy" className="history-section">
      <div className="container">
        <div className="history-header">
          <span className="history-subtitle">{data?.historySubtitle || 'Legacy & Heritage'}</span>
          <h2 className="history-title">
            {data?.historyTitle ? (
              data.historyTitle
            ) : (
              <>Our Historic <span className="gold-text">Milestones</span></>
            )}
          </h2>
          <p className="history-desc">
            {data?.historyDescription || 'From a local Kerala grain trader in 1887 to a multi-billion dollar diversified conglomerate.'}
          </p>
        </div>

        <div className="timeline-container">
          <div className="timeline-line" />

          {milestones.map((item: any, index: number) => (
            <div key={item.id || index} className="timeline-item">
              <span className="timeline-year-badge">{item.year}</span>
              <div className="timeline-content glass-panel">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
