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
        style={{ width: 1116, height: 1116, left: 629.26, top: -96.45 }}
      />

      {/* Icon 1: Rupee (top) */}
      <div className="curve-icon-position icon-top" style={{ left: 649.44, top: 208.24 }}>
        <div style={{ width: 66, height: 66, padding: 7, background: 'linear-gradient(180deg, #111A41 0%, rgba(0, 149, 218, 0.02) 97%)', borderRadius: '50%', outline: '1px #E29D24 solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 10.01, display: 'inline-flex' }}>
          <div style={{ width: 32.02, height: 32.02, position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: 26.69, height: 26.68, left: 2.65, top: 2.67, position: 'absolute', outline: '1px white solid', outlineOffset: '-0.50px' }} />
            <div style={{ width: 6.67, height: 12.01, left: 10.67, top: 10.67, position: 'absolute', outline: '1px #EBAF20 solid', outlineOffset: '-0.50px' }} />
          </div>
        </div>
      </div>

      {/* Icon 2: Scale (middle) */}
      <div className="curve-icon-position icon-middle" style={{ left: 612, top: 412.13 }}>
        <div style={{ width: 66, height: 66, padding: 7, background: 'linear-gradient(180deg, #111A41 0%, rgba(0, 149, 218, 0.02) 97%)', borderRadius: '50%', outline: '1px #E29D24 solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 10.01, display: 'inline-flex' }}>
          <div style={{ width: 32.02, height: 32.02, position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: 8.01, height: 13.34, left: 21.35, top: 9.34, position: 'absolute', outline: '1px #EBAF20 solid', outlineOffset: '-0.50px' }} />
            <div style={{ width: 24.02, height: 2.67, left: 4, top: 6.67, position: 'absolute', outline: '1px white solid', outlineOffset: '-0.50px' }} />
            <div style={{ width: 8.01, height: 13.34, left: 2.67, top: 9.34, position: 'absolute', outline: '1px #EBAF20 solid', outlineOffset: '-0.50px' }} />
          </div>
        </div>
      </div>

      {/* Icon 3: Cash (bottom) */}
      <div className="curve-icon-position icon-bottom" style={{ left: 650, top: 660 }}>
        <div style={{ width: 66, height: 66, padding: 7, background: 'linear-gradient(180deg, #111A41 0%, rgba(0, 149, 218, 0.02) 97%)', borderRadius: '50%', outline: '1px #E29D24 solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 10.01, display: 'inline-flex' }}>
          <div style={{ width: 32.02, height: 32.02, position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: 26.69, height: 16.01, left: 2.67, top: 8.01, position: 'absolute', outline: '1px white solid', outlineOffset: '-0.50px' }} />
            <div style={{ width: 8.01, height: 4, left: 21.35, top: 21.35, position: 'absolute', outline: '1px #EBAF20 solid', outlineOffset: '-0.50px' }} />
            <div style={{ width: 5.34, height: 5.34, left: 13.35, top: 13.34, position: 'absolute', outline: '1px white solid', outlineOffset: '-0.50px' }} />
          </div>
        </div>
      </div>

      {/* Label 1: Best Value */}
      <div className="curve-text-label label-top" style={{ left: 723.50, top: 208.24 }}>
        <span className="label-text-white">Get the</span>
        <span className="label-text-gold">Best Value</span>
        <span className="label-text-white">for your gold</span>
      </div>
      {/* Label 2: Transparent */}
      <div className="curve-text-label label-middle" style={{ left: 686, top: 412.13 }}>
        <span className="label-text-gold">Transparent</span>
        <span className="label-text-white">Gold evaluation</span>
        <span className="label-text-white">process</span>
      </div>
      {/* Label 3: Instant Payment */}
      <div className="curve-text-label label-bottom" style={{ left: 724, top: 660 }}>
        <span className="label-text-gold">Instant Payment</span>
        <span className="label-text-white">after valuation</span>
      </div>
    </div>
  );
}
