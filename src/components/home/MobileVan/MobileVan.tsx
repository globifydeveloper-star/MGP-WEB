'use client';

import React from 'react';
import Link from 'next/link';
import './MobileVan.css';
const vanImgDefault = { src: '/images/home/mobile-van-hero.png' };

interface MobileVanProps {
  headingLight?: string;
  headingBold?: string;
  description?: string;
  buttonLabel?: string;
  vanImage?: string;
}

export default function MobileVan({ headingLight, headingBold, description, buttonLabel, vanImage }: MobileVanProps) {
  const [vanInView, setVanInView] = React.useState(false);
  // Observed target must stay untransformed: the van itself is animated off-canvas
  // via CSS transform, and IntersectionObserver measures post-transform geometry,
  // so observing the transformed element directly can make it appear to never
  // enter the viewport. Observe the stable wrapper around it instead.
  const vanTriggerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback for browsers without support: reveal shortly after mount instead of
      // staying hidden forever. Deferred (not synchronous) to avoid cascading renders.
      const timer = setTimeout(() => setVanInView(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVanInView(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (vanTriggerRef.current) observer.observe(vanTriggerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="mobile-van-section">
      <noscript>
        <style>{`.van-illustration-wrapper { opacity: 1 !important; transform: none !important; animation: none !important; }`}</style>
      </noscript>
      <div className="mobile-van-container">

        <div className="mobile-van-left">
          <h2 className="mobile-van-title">
            <span className="title-line-light">{headingLight || "We Bring the"}</span>
            <span className="title-line-bold">{headingBold || "Branch to You"}</span>
          </h2>
          <p className="mobile-van-desc">
            {description && !description.toLowerCase().includes("cant visit") && !description.toLowerCase().includes("can't visit")
              ? description
              : "Enjoy a safe, transparent & scientifically tested way of selling Gold. We give you an unparalleled experience of selling your old gold for instant cash. Call and book our mobile van – only in Mumbai, Kalyan and Bengaluru. Our vans are equipped with the latest ultrasonic, weighing and XRF machines to clean your Gold for free and check its accurate weight & purity. Not just that, the process is transparent and you get the fair value for your Gold."}
          </p>
          <Link href="/mobilevantab">
            <button className="btn mobile-van-btn">{buttonLabel || "Book a Van Visit"}</button>
          </Link>
        </div>

        <div className="mobile-van-right" ref={vanTriggerRef}>
          <div
            className={`van-illustration-wrapper ${vanInView ? 'van-in-view' : ''}`}
          >
            <div className="van-photo-crop">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={vanImage || vanImgDefault.src} alt="Muthoot Gold Point mobile van" className="van-photo-img" />
            </div>
          </div>



          <div className="van-features-row">
            <div className="van-feature-item">
              <span className="van-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h1v-6l2-5h9v11h1" />
                  <path d="M16 17h-8" />
                  <path d="M6 6h6v6" />
                  <path d="M16 10h3l2 3v4h-2" />
                  <circle cx="7.5" cy="17.5" r="1.5" />
                  <circle cx="17.5" cy="17.5" r="1.5" />
                </svg>
              </span>
              <span className="van-feature-text">XRF Testing at Your Door</span>
            </div>

            <div className="van-feature-item">
              <span className="van-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="11" height="5" rx="1.5" />
                  <line x1="6.5" y1="8" x2="6.5" y2="12" />
                  <path d="M6.5 12h4a3 3 0 0 1 3 3v6" />
                </svg>
              </span>
              <span className="van-feature-text">Precise Weighing</span>
            </div>

            <div className="van-feature-item">
              <span className="van-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18h8" />
                  <path d="M3 22h12" />
                  <path d="M14 22a7 7 0 1 0 0-14h-1" />
                  <path d="M9 14h3" />
                  <path d="M9 12h4l-1-7h-2z" />
                  <path d="M12 5h2" />
                </svg>
              </span>
              <span className="van-feature-text">Transparent Valuation</span>
            </div>

            <div className="van-feature-item">
              <span className="van-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="7" width="18" height="12" rx="2" />
                  <path d="M3 7l3-4h12l3 4" />
                  <circle cx="12" cy="13" r="2.5" />
                </svg>
              </span>
              <span className="van-feature-text">Instant Bank Transfer</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
