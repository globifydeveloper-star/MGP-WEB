import React from 'react';
import Image from 'next/image';
import { AboutUsPageData } from '@/lib/strapi';
import './history.css';
import portraitImg from '@/assets/images/hm6-img01.png';

interface HistoryProps { data?: AboutUsPageData | null; }

export default function History({ data }: HistoryProps) {
  // Use the milestones from Strapi, or fallback to the defaults if empty
  const milestones = data?.historyMilestones && data.historyMilestones.length > 0
    ? data.historyMilestones
    : [
      {
        year: "1887",
        title: "Humble Beginnings",
        desc: "Muthoot Ninan Mathai started humbly as a retail and wholesale trader of grains at Kozhencherry, and later launched a Chit Funds business for estate workers."
      },
      {
        year: "1950s",
        title: "Gold Loan Pioneer",
        desc: "The family entered the gold loan business and became the largest player in Chits & Gold Loans."
      },
      {
        year: "1979",
        title: "Muthoot Pappachan Group Formed",
        desc: "An amicable family partition led to the genesis of the Muthoot Pappachan Group under Late Mathew M Thomas."
      },
      {
        year: "Today",
        title: "133 Years of Legacy",
        desc: "Empowering Indians across Financial Services, Hospitality, Automotive, Realty, IT Services, Healthcare, Precious Metals, Global Services and Alternate Energy."
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

        <div className="history-content glass-panel" style={{ textAlign: 'left', padding: '2.5rem', maxWidth: '900px', margin: '0 auto', lineHeight: '1.7' }}>
          <Image
            src={portraitImg}
            alt="Representative of the Muthoot Pappachan Group"
            width={1978}
            height={3215}
            style={{ float: 'right', marginLeft: '2rem', marginBottom: '1rem', marginTop: '0.4rem', borderRadius: '12px', width: '28%', maxWidth: '240px', height: 'auto', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
          />
          <h3 style={{ color: 'var(--gold-primary)', fontSize: '1.35rem', marginBottom: '0.85rem', fontWeight: 800 }}>History</h3>
          <p style={{ marginBottom: '1.75rem', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Muthoot Pappachan Group, more popularly known as Muthoot Blue, takes its name from its family, which is a branch of a traditional Orthodox Christian family, based in Kozhencherry, a small town in the erstwhile primary state of Travancore. (Kerala).
          </p>

          <h3 style={{ color: 'var(--gold-primary)', fontSize: '1.35rem', marginBottom: '0.85rem', fontWeight: 800 }}>The first steps</h3>
          <p style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8' }}>
            In the year 1887, Muthoot Ninan Mathai (Patron Founder of the group), started humbly as a retail and wholesale trader of grains at Kozhencherry. The wholesale goods were supplied to the large Estates owned by British Companies. Later, understanding the unmet saving needs of the estates&apos; workers, Mr. Ninan Mathai, started the Chit Funds business with an aim to provide philanthropic services and give the workers an avenue for saving. What started as a saving tool for workers soon gained momentum and was floated to other residents of the estates. The business grew slowly but steadily along with its share of ups and downs.
          </p>
          <p style={{ marginBottom: '1.75rem', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Functioning out of a single office in Kozhencherry, Muthoot Ninan Mathai entered the gold loan business in the 1950s. He soon went on to become the largest player in Chits &amp; Gold Loans. Even today, people from across the state are happy to come to Kozhencherry for gold loans &amp; chits.
          </p>

          <h3 style={{ color: 'var(--gold-primary)', fontSize: '1.35rem', marginBottom: '0.85rem', fontWeight: 800 }}>The growth of Muthoot Pappachan Group</h3>
          <p style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8' }}>
            The Late Muthoot Ninan Mathai had four sons, Ninan Mathew, M. George, M. Mathew and Mathew M. Thomas (Muthoot Pappachan) who were involved in the business from their childhood and later took over the family business. The amicable family partition took place in the year 1979 which led to the Genesis of Muthoot Pappachan Group (MPG), the founder of who was the Late Mathew M Thomas popularly known as Muthoot Pappachan.
          </p>
          <p style={{ marginBottom: '0', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Over the years, the Muthoot Pappachan Group has grown to become a significant entity in the Indian business landscape. &quot;A journey of a thousand miles begins with a single step&quot;. True to this adage, the group which has roots in retail trading, later diversified into various sectors including Financial Services, Hospitality, Automotive, Realty, IT Services, Healthcare, Precious Metals, Global Services and Alternate Energy.
          </p>
        </div>

        <div className="timeline-container" style={{ marginTop: '4rem' }}>
          <div className="timeline-line" />

          {milestones.map((item: any, index: number) => (
            <div key={item.id || index} className="timeline-item">
              <span className="timeline-year-badge">{item.year}</span>
              <div className="timeline-content glass-panel">
                <h3 style={{ marginBottom: '0.25rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
