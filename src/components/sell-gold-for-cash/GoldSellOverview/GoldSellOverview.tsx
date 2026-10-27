'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './GoldSellOverview.css';
import purityImg from '@/assets/images/purity.png';
import counterImg from '@/assets/images/gold_rate_component_photos/valuation_counter_customer.png';

export default function GoldSellOverview({ overviewImage1, overviewImage2 }: { overviewImage1?: string, overviewImage2?: string }) {
  return (
    <section className="gso-section">
      <div className="container gso-container">
        <div className="gso-content">
          <p className="gso-eyebrow">WHY MUTHOOT GOLD POINT</p>
          <h2 className="gso-title">
            Sell Your Gold
            <svg className="gso-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
            <span className="gold-text">Get Cash Instantly!</span>
          </h2>

          <p className="gso-subtitle">
           Muthoot Gold Point offers a safe and transparent way to sell your gold.
          </p>

          <p className="gso-desc">
Muthoot Gold Point makes it easy and convenient to sell gold for cash with a safe and transparent process. With branches across India and mobile van services in selected cities (Mumbai, Kalyan & Bengaluru), customers can get their gold cleaned for free and have its weight and purity checked using advanced XRF machines. The transparent evaluation process helps customers understand the value of their gold before selling it. Payments up to ₹10,000 are made in cash, while higher amounts are transferred securely through IMPS, NEFT, or RTGS. By promoting gold recycling, Muthoot Gold Point helps reduce the need for gold mining, conserve natural resources, protect the environment, and reduce India’s dependence on gold imports.          </p>

          <Link href="/#branches" className="btn btn-primary gso-cta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Visit Your Nearest Branch Today
          </Link>
        </div>

        <div className="gso-visual">
          <div className="gso-circle">
            <div className="gso-quad gso-quad--icon">
              <span className="gso-quad-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 22h6" />
                  <path d="M12 22v-4" />
                  <circle cx="12" cy="10" r="5" />
                  <path d="M12 5V3" />
                  <path d="m8.5 12.5-2 2" />
                </svg>
              </span>
              <p>Free purity testing<br />of your Gold</p>
            </div>

            <div className="gso-quad gso-quad--photo">
              <Image
                src={overviewImage1 || purityImg}
                alt="Technician using an XRF gold purity testing device"
                className="gso-quad-img"
                fill
                sizes="(max-width: 900px) 50vw, 220px"
              />
              <div className="gso-quad-overlay" />
              <p>Free Ultrasonic<br />cleaning of<br />ornaments</p>
            </div>

            <div className="gso-quad gso-quad--photo">
              <Image
                src={overviewImage2 || counterImg}
                alt="Muthoot Gold Point staff precisely weighing a customer's gold jewellery"
                className="gso-quad-img"
                fill
                sizes="(max-width: 900px) 50vw, 220px"
              />
              <div className="gso-quad-overlay" />
              <p>100% Fair &amp;<br />Precise Gold<br />buying</p>
            </div>

            <div className="gso-quad gso-quad--icon">
              <span className="gso-quad-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-3-6.7" />
                  <path d="M21 3v6h-6" />
                </svg>
              </span>
              <p>100% Transparent<br />Process</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
