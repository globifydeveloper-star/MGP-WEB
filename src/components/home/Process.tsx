'use client';

import React from 'react';

const steps = [
  {
    num: '01',
    title: 'Ultrasonic Cleaning',
    desc: 'Your gold ornaments are cleaned thoroughly using ultrasonic machines to remove all dirt, dust, and grime, ensuring an accurate initial weight check.'
  },
  {
    num: '02',
    title: 'XRF Spectrometer Test',
    desc: 'Purity is checked using state-of-the-art XRF machines which analyze the exact karat value of the gold non-destructively in your full presence.'
  },
  {
    num: '03',
    title: 'Induction Melting',
    desc: 'If melting is required, we melt the gold in customized high-frequency induction furnaces in front of you. This ensures absolute homogeneity.'
  },
  {
    num: '04',
    title: 'Transparent Valuation',
    desc: 'We calculate the gold value on the spot based on the weight and purity determined, referencing current real-time market gold rates.'
  },
  {
    num: '05',
    title: 'Instant Payout',
    desc: 'Get paid immediately! Payment is credited straight to your bank account via IMPS/NEFT, or handed in cash (up to permissible limits).'
  }
];

export default function Process() {
  return (
    <section className="section-root process-section" id="process">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Our Method</span>
          <h2 className="section-title">
            The <span className="gold-text">Transparent</span> 5-Step Evaluation Process
          </h2>
          <p className="section-desc">
            We follow a scientific, automated, and fully visible process to ensure you get the absolute max value for your gold.
          </p>
        </div>

        {/* Process Steps Timeline/Grid */}
        <div className="process-timeline">
          {steps.map((step, idx) => (
            <div key={step.num} className="process-step-row">
              {/* Left side: Number */}
              <div className="step-num-col">
                <span className="step-number-text">{step.num}</span>
                {idx < steps.length - 1 && <span className="step-timeline-line"></span>}
              </div>

              {/* Right side: Card */}
              <div className="step-card-col">
                <div className="step-card glass-panel">
                  <h3 className="step-card-title">{step.title}</h3>
                  <p className="step-card-desc">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
