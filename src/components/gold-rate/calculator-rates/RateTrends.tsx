'use client';

import React, { useMemo, useRef, useState } from 'react';
import './RateTrends.css';
import { GOLD_RATE_TRENDS, TREND_RANGE_LABELS, TrendRange } from '@/lib/goldRateData';

const RANGES: TrendRange[] = ['7D', '30D', '6M', '1Y'];

const VIEW_W = 600;
const VIEW_H = 220;
const PAD_LEFT = 46;
const PAD_RIGHT = 12;
const PAD_TOP = 16;
const PAD_BOTTOM = 30;

export default function RateTrends() {
  const [range, setRange] = useState<TrendRange>('7D');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const data = GOLD_RATE_TRENDS[range];

  const { linePath, areaPath, points, yTicks, xLabelIndices } = useMemo(() => {
    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const domainPad = (max - min) * 0.15 || max * 0.05;
    const yMin = Math.floor(min - domainPad);
    const yMax = Math.ceil(max + domainPad);

    const plotW = VIEW_W - PAD_LEFT - PAD_RIGHT;
    const plotH = VIEW_H - PAD_TOP - PAD_BOTTOM;

    const pts = data.map((d, i) => {
      const x = PAD_LEFT + (data.length === 1 ? plotW / 2 : (i / (data.length - 1)) * plotW);
      const y = PAD_TOP + plotH - ((d.value - yMin) / (yMax - yMin || 1)) * plotH;
      return { x, y, label: d.label, value: d.value };
    });

    const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
    const area = `${line} L ${pts[pts.length - 1].x.toFixed(2)} ${PAD_TOP + plotH} L ${pts[0].x.toFixed(2)} ${PAD_TOP + plotH} Z`;

    const tickCount = 4;
    const ticks = Array.from({ length: tickCount + 1 }, (_, i) => {
      const value = yMin + ((yMax - yMin) * i) / tickCount;
      const y = PAD_TOP + plotH - (i / tickCount) * plotH;
      return { value: Math.round(value), y };
    });

    // Avoid overcrowding x-axis labels when there are many points (30D).
    const maxLabels = 7;
    const step = Math.max(1, Math.ceil(data.length / maxLabels));
    const labelIdx: number[] = [];
    for (let i = 0; i < data.length; i += step) labelIdx.push(i);
    if (labelIdx[labelIdx.length - 1] !== data.length - 1) labelIdx.push(data.length - 1);

    return { linePath: line, areaPath: area, points: pts, yTicks: ticks, xLabelIndices: labelIdx };
  }, [data]);

  const handlePointerMove = (clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    const xInView = ratio * VIEW_W;
    let nearest = 0;
    let nearestDist = Infinity;
    points.forEach((p, i) => {
      const dist = Math.abs(p.x - xInView);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = i;
      }
    });
    setHoverIndex(nearest);
  };

  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div className="grt-panel">
      <div className="grt-header">
        <h2 className="grt-title">Gold Rate Trends</h2>
        <div className="grt-tabs" role="tablist" aria-label="Gold rate trend range">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              role="tab"
              aria-selected={range === r}
              className={`grt-tab ${range === r ? 'grt-tab-active' : ''}`}
              onClick={() => {
                setRange(r);
                setHoverIndex(null);
              }}
            >
              {TREND_RANGE_LABELS[r]}
            </button>
          ))}
        </div>
      </div>

      <div
        className="grt-chart-wrap"
        onMouseLeave={() => setHoverIndex(null)}
      >
        <svg
          ref={svgRef}
          className="grt-svg"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          role="img"
          aria-label={`Gold rate trend chart for the last ${TREND_RANGE_LABELS[range]}`}
          onMouseMove={(e) => handlePointerMove(e.clientX)}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            if (touch) handlePointerMove(touch.clientX);
          }}
        >
          <defs>
            <linearGradient id="grt-area-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F1B933" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#F1B933" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines + y labels */}
          {yTicks.map((tick, i) => (
            <g key={i}>
              <line
                x1={PAD_LEFT}
                x2={VIEW_W - PAD_RIGHT}
                y1={tick.y}
                y2={tick.y}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <text x={PAD_LEFT - 8} y={tick.y + 3} textAnchor="end" className="grt-axis-label">
                {tick.value.toLocaleString('en-IN')}
              </text>
            </g>
          ))}

          {/* X labels */}
          {xLabelIndices.map((i) => (
            <text key={i} x={points[i].x} y={VIEW_H - 6} textAnchor="middle" className="grt-axis-label">
              {points[i].label}
            </text>
          ))}

          <path d={areaPath} fill="url(#grt-area-gradient)" stroke="none" />
          <path className="grt-line-path" d={linePath} fill="none" stroke="#F1B933" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" pathLength="1" />

          {hovered && (
            <g>
              <line
                x1={hovered.x}
                x2={hovered.x}
                y1={PAD_TOP}
                y2={VIEW_H - PAD_BOTTOM}
                stroke="rgba(241,185,51,0.35)"
                strokeWidth="1"
              />
              <circle cx={hovered.x} cy={hovered.y} r="4.5" fill="#FCD46A" stroke="#0c1f6c" strokeWidth="2" />
            </g>
          )}
        </svg>

        {hovered && (
          <div
            className="grt-tooltip"
            style={{
              left: `${(hovered.x / VIEW_W) * 100}%`,
              top: `${(hovered.y / VIEW_H) * 100}%`,
            }}
          >
            <span className="grt-tooltip-label">{hovered.label}</span>
            <span className="grt-tooltip-value">₹{hovered.value.toLocaleString('en-IN')}</span>
          </div>
        )}
      </div>

      <p className="grt-note">Rates shown are for 24K gold (per gram). Demo historical data for illustration only.</p>
    </div>
  );
}
