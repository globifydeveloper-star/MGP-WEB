export default function HeroStats() {
  return (
    <div className="hero-stats-ribbon-v2">
      <div className="hero-stats-container-v2">
        {/* Stat 1: Branches */}
        <div className="hero-stat-item-v2">
          <div className="hero-stat-circle-icon">
            <svg className="hero-stat-item-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="9" x2="9" y2="4" />
              <line x1="9" y1="4" x2="16" y2="5" />
              <line x1="4" y1="9" x2="11" y2="13" />
              <line x1="11" y1="13" x2="16" y2="5" />
              <line x1="11" y1="13" x2="14" y2="20" />
              <line x1="16" y1="5" x2="20" y2="12" />
              <line x1="14" y1="20" x2="20" y2="12" />
              <circle cx="4" cy="9" r="2.5" fill="currentColor" />
              <circle cx="9" cy="4" r="2.5" fill="currentColor" />
              <circle cx="16" cy="5" r="2.5" fill="currentColor" />
              <circle cx="11" cy="13" r="2.5" fill="currentColor" />
              <circle cx="20" cy="12" r="2.5" fill="currentColor" />
              <circle cx="14" cy="20" r="2.5" fill="currentColor" />
            </svg>
          </div>
          <div className="hero-stat-info-v2">
            <span className="hero-stat-metric-value">4,200</span>
            <span className="hero-stat-metric-label">Branches across India</span>
          </div>
        </div>

        {/* Stat 2: Legacy */}
        <div className="hero-stat-item-v2">
          <div className="hero-stat-circle-icon">
            <svg className="hero-stat-item-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="12 7.5 13.5 10.5 17 11 14.5 13.3 15.2 16.7 12 15 8.8 16.7 9.5 13.3 7 11 10.5 10.5" fill="currentColor" />
              <path d="M7 10a3 3 0 0 0 0 4M6 8a5 5 0 0 0 0 8" />
              <path d="M17 10a3 3 0 0 1 0 4M18 8a5 5 0 0 1 0 8" />
            </svg>
          </div>
          <div className="hero-stat-info-v2">
            <span className="hero-stat-metric-value">133+</span>
            <span className="hero-stat-metric-label">Years of legacy</span>
          </div>
        </div>

        {/* Stat 3: Employees */}
        <div className="hero-stat-item-v2">
          <div className="hero-stat-circle-icon">
            <svg className="hero-stat-item-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="7" r="3" />
              <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
              <circle cx="6" cy="9" r="2.5" />
              <path d="M2 19v-1a3 3 0 0 1 3-3h1" />
              <circle cx="18" cy="9" r="2.5" />
              <path d="M18 15h1a3 3 0 0 1 3 1v1" />
            </svg>
          </div>
          <div className="hero-stat-info-v2">
            <span className="hero-stat-metric-value">24,000</span>
            <span className="hero-stat-metric-label">Employees serving millions of customer</span>
          </div>
        </div>

        {/* Stat 4: Customers */}
        <div className="hero-stat-item-v2">
          <div className="hero-stat-circle-icon">
            <svg className="hero-stat-item-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4-4a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0l-1.4 1.4" />
              <path d="m18 10.1 1.4-1.4a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0l-1.4 1.4a1 1 0 0 0 0 1.4l1.4 1.4" />
              <path d="m3 21 9-9" />
              <path d="m5 13 4-4" />
            </svg>
          </div>
          <div className="hero-stat-info-v2">
            <span className="hero-stat-metric-value">1,00,000</span>
            <span className="hero-stat-metric-label">Customers per day</span>
          </div>
        </div>
      </div>
    </div>
  );
}
