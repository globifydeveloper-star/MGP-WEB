import React from 'react';
import Image from 'next/image';
import { AboutUsPageData } from '@/lib/strapi';
import './philanthropy.css';
import aboutlastImg from '@/assets/images/aboutlast.jpeg';

interface PhilanthropyProps { data?: AboutUsPageData | null; }

export default function Philanthropy({ data }: PhilanthropyProps) {
  const heelPillars = [
    {
      letter: "H",
      title: "Health",
      desc: "Providing access to quality healthcare, diagnostics, and medical equipment in rural and economically backward regions.",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      letter: "E",
      title: "Education",
      desc: "Supporting primary education, establishing learning centers, providing scholarships, and supporting digital classroom infrastructures.",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      letter: "E",
      title: "Environment",
      desc: "Promoting green cover, driving clean energy solutions, encouraging organic farming methods, and supporting water harvesting programs.",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      letter: "L",
      title: "Livelihood",
      desc: "Empowering under-served communities, youth, and women through skill development, vocational courses, and self-employment training.",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <section className="philanthropy-section">
      <div className="container">
        <div className="philanthropy-header">
          <span className="philanthropy-subtitle">Social Commitment</span>
          <h2 className="philanthropy-title">
            Our Unwavering Focus on <span className="gold-text">Philanthropy</span>
          </h2>
          <p className="philanthropy-desc">
            Armed with a commitment to society, the Group set up the Muthoot Pappachan Foundation (MPF), a Public Charitable Trust and the CSR arm of MPG.
          </p>
        </div>

        <div className="heel-container">
          <div className="heel-info-box">
            <h3>HEEL Initiative</h3>
            <p>
              The corporate social responsibility (CSR) programs of Muthoot Blue revolve around the signature theme <strong>HEEL</strong>, touching thousands of lives by enhancing capabilities, providing health relief, and establishing self-reliant livelihoods.
            </p>
            <div className="heel-info-image">
              <Image src={aboutlastImg} alt="Muthoot Blue team connecting with the community" />
            </div>
          </div>

          <div className="heel-pillars-grid">
            {heelPillars.map((pillar, idx) => (
              <div key={idx} className="heel-card glass-panel">
                <div className="heel-letter-badge">{pillar.letter}</div>
                <div className="heel-card-header">
                  <div className="heel-icon-box">{pillar.icon}</div>
                  <h3>{pillar.title}</h3>
                </div>
                <p>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="philanthropy-conclusion">
          <p>
            We believe in building a <strong>&ldquo;Business Without Boundaries&rdquo;</strong>, where obstacles are treated as stepping stones to growth. We strive to take the world forward with perseverance, commitment, and sincerity. Indeed, the possibilities are infinite!
          </p>
        </div>
      </div>
    </section>
  );
}
