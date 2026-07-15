'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import starImg from '@/assets/images/Star.png';

const badgeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.6 + i * 0.35,
      type: "spring" as const,
      stiffness: 110,
      damping: 12
    }
  })
};

const labelVariants = {
  hidden: { opacity: 0, x: 25 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.8 + i * 0.35,
      type: "spring" as const,
      stiffness: 90,
      damping: 14
    }
  })
};

const starVariants = {
  hidden: { scale: 0, opacity: 0, rotate: -45 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 25,
    transition: {
      delay: 0.5,
      type: "spring" as const,
      stiffness: 120,
      damping: 12
    }
  }
};

export default function HeroCurve() {
  return (
    <div className="hero-curve-wrapper">

      {/* Self-drawing SVG Gold neon arc */}
      <svg
        style={{
          position: 'absolute',
          width: 1000,
          height: 1000,
          left: 549.26,
          top: 10.45,
          pointerEvents: 'none',
          overflow: 'visible'
        }}
        viewBox="0 0 1000 1000"
      >
        <motion.path
          d="M 500 0 A 500 500 0 0 0 500 1000"
          stroke="rgba(235, 175, 32, 0.45)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
          className="hero-curve-svg-path"
        />
      </svg>

      {/* Dynamic light spark orbiting along the curve radius */}
      <motion.div
        className="hero-curve-glow-orbit"
        style={{ width: 1000, height: 1000, left: 549.26, top: 10.45 }}
        animate={{ rotate: [0, -180] }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse" as const
        }}
      >
        <span className="hero-curve-glow-dot" />
      </motion.div>

      {/* Icon 1: Rupee (top) */}
      <motion.div
        className="curve-icon-position icon-top"
        style={{ left: 595, top: 208 }}
        variants={badgeVariants}
        custom={0}
        initial="hidden"
        animate="visible"
      >
        <div className="curve-icon-badge">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="1.5" />
            <path d="M8 7.5H16" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 11H16" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 7.5C10.5 7.5 12.5 9 12.5 11C12.5 13 10.5 14.5 8 14.5" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 14.5L14 18" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </motion.div>

      {/* Icon 2: Scale (middle) */}
      <motion.div
        className="curve-icon-position icon-middle"
        style={{ left: 521, top: 412 }}
        variants={badgeVariants}
        custom={1}
        initial="hidden"
        animate="visible"
      >
        <div className="curve-icon-badge">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 4V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6 20H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 6H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 6L2 11C2 12.6569 3.34315 14 5 14C6.65685 14 8 12.6569 8 11L4 6Z" stroke="#EBAF20" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M20 6L16 11C16 12.6569 17.3431 14 19 14C20.6569 14 22 12.6569 22 11L20 6Z" stroke="#EBAF20" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>

      {/* Icon 3: Cash (bottom) */}
      <motion.div
        className="curve-icon-position icon-bottom"
        style={{ left: 551, top: 660 }}
        variants={badgeVariants}
        custom={2}
        initial="hidden"
        animate="visible"
      >
        <div className="curve-icon-badge">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="7" width="20" height="12" rx="2" stroke="white" strokeWidth="1.5" />
            <circle cx="12" cy="13" r="3" stroke="#EBAF20" strokeWidth="1.5" />
            <path d="M5 10V10.5" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M19 15.5V16" stroke="#EBAF20" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </motion.div>

      {/* Label 1: Best Value */}
      <motion.div
        className="curve-text-label label-top"
        style={{ left: 669, top: 208 }}
        variants={labelVariants}
        custom={0}
        initial="hidden"
        animate="visible"
      >
        <span className="label-text-white">Get the</span>
        <span className="label-text-gold">Best Value</span>
        <span className="label-text-white">for your gold</span>
      </motion.div>

      {/* Label 2: Transparent */}
      <motion.div
        className="curve-text-label label-middle"
        style={{ left: 595, top: 412 }}
        variants={labelVariants}
        custom={1}
        initial="hidden"
        animate="visible"
      >
        <span className="label-text-gold">Transparent</span>
        <span className="label-text-white">Gold evaluation</span>
        <span className="label-text-white">process</span>
      </motion.div>

      {/* Label 3: Instant Payment */}
      <motion.div
        className="curve-text-label label-bottom"
        style={{ left: 625, top: 660 }}
        variants={labelVariants}
        custom={2}
        initial="hidden"
        animate="visible"
      >
        <span className="label-text-gold">Instant Payment</span>
        <span className="label-text-white">after valuation</span>
      </motion.div>

      {/* Mid curve star */}
      <motion.div
        className="small-star"
        style={{ position: 'absolute', left: 570, top: 520, width: 24, height: 24 }}
        variants={starVariants}
        initial="hidden"
        animate="visible"
      >
        <Image
          src={starImg}
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </motion.div>
    </div>
  );
}
