import Image from 'next/image';
import starImg from '@/assets/images/Star.png';

export default function HeroCurve() {
  return (
    <div className="hero-curve-wrapper">

      {/*
        Positions below are the raw Figma coordinates (Position X/Y of the
        big Ellipse and each icon group in the "Homepage V2" frame), used
        directly since this renders inside .hero-figma-canvas, which shares
        the same 1441-wide coordinate space as the frame. The icons sit on
        the circle's own circumference, so the "curve" is just this circle's
        left arc rendered behind them.
      */}
      <div
        className="hero-curve-circle"
        style={{ width: 1000, height: 1000, left: 549.26, top: 10.45 }}
      />

      {/* Icon 1: Rupee (top) */}
      <div className="curve-icon-position icon-top" style={{ left: 595, top: 208 }}>
        <div className="curve-icon-badge">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="1.5" />
            <path d="M8 7.5H16" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 11H16" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 7.5C10.5 7.5 12.5 9 12.5 11C12.5 13 10.5 14.5 8 14.5" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 14.5L14 18" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Icon 2: Scale (middle) */}
      <div className="curve-icon-position icon-middle" style={{ left: 521, top: 412 }}>
        <div className="curve-icon-badge">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 4V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6 20H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 6H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 6L2 11C2 12.6569 3.34315 14 5 14C6.65685 14 8 12.6569 8 11L4 6Z" stroke="#EBAF20" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M20 6L16 11C16 12.6569 17.3431 14 19 14C20.6569 14 22 12.6569 22 11L20 6Z" stroke="#EBAF20" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Icon 3: Cash (bottom) */}
      <div className="curve-icon-position icon-bottom" style={{ left: 551, top: 660 }}>
        <div className="curve-icon-badge">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="7" width="20" height="12" rx="2" stroke="white" strokeWidth="1.5" />
            <circle cx="12" cy="13" r="3" stroke="#EBAF20" strokeWidth="1.5" />
            <path d="M5 10V10.5" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M19 15.5V16" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Label 1: Best Value */}
      <div className="curve-text-label label-top" style={{ left: 669, top: 208 }}>
        <span className="label-text-white">Get the</span>
        <span className="label-text-gold">Best Value</span>
        <span className="label-text-white">for your gold</span>
      </div>
      {/* Label 2: Transparent */}
      <div className="curve-text-label label-middle" style={{ left: 595, top: 412 }}>
        <span className="label-text-gold">Transparent</span>
        <span className="label-text-white">Gold evaluation</span>
        <span className="label-text-white">process</span>
      </div>
      {/* Label 3: Instant Payment */}
      <div className="curve-text-label label-bottom" style={{ left: 625, top: 660 }}>
        <span className="label-text-gold">Instant Payment</span>
        <span className="label-text-white">after valuation</span>
      </div>

      <div
        className="small-star"
        style={{ position: 'absolute', left: 570, top: 520, width: 24, height: 24 }}
      >
        <Image
          src={starImg}
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}
