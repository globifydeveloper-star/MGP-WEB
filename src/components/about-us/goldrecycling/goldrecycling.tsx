import React from 'react';
import Image from 'next/image';
import './goldrecycling.css';
import aboutVanImg from '@/assets/images/aboutvan.png';

export default function GoldRecycling() {
  const steps = [
    {
      id: 1,
      title: "Scientific Valuation",
      desc: "Our gold is valued transparently using ultrasonic cleaning and advanced XRF gold-testing machines right in front of you.",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Refinement into 995 Gold Bars",
      desc: "All gold purchased from customers is sent to government-approved refineries and cast into pure 995 investment-grade gold bars.",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Reducing Import Dependence",
      desc: "By recycling domestic gold and supplying it back to local markets, we directly reduce India's heavy dependency on gold imports.",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  return (
    <section id="what-we-do" className="gold-recycling-section">
      <div className="container">
        <div className="recycling-grid">
          {/* Left Block */}
          <div className="recycling-text-block">
            <span className="recycling-subtitle">Closed-Loop Ecosystem</span>
            <h2 className="recycling-title">
              What Do We Do With <br />
              <span className="gold-text">The Gold We Buy?</span>
            </h2>
            <p className="recycling-desc">
              Every gram we buy is refined into 995 investment-grade gold bars and re-channeled into domestic markets — stabilizing local demand and curbing the nation&apos;s reliance on imports.
            </p>

            <div className="van-info-card">
              <div className="van-info-image">
                <Image src={aboutVanImg} alt="Muthoot Gold Point mobile gold buying van" />
              </div>
              <div className="van-info-overlay">
                <h4>India’s First Mobile Gold Buying Van</h4>
                <p>Continuing our values of trust, we bring XRF and ultrasonic testing machines to your doorstep with our Mobile Van services to ensure maximum value.</p>
                <a href="/mobilevantab" className="van-info-btn">Book a Van Visit</a>
              </div>
            </div>
          </div>

          {/* Right Block */}
          <div className="recycling-flow-block">
            <div className="flow-timeline">
              {steps.map((step) => (
                <div key={step.id} className="flow-card">
                  <div className="flow-badge">{step.id}</div>
                  <div className="flow-icon-container">
                    {step.icon}
                  </div>
                  <div className="flow-details">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
