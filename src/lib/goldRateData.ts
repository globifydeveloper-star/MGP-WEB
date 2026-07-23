/**
 * Centralized Gold Rate data for the /gold-rate page.
 *
 * Everything in this file is DEMO DATA ONLY, isolated here so it can later
 * be swapped for a real feed (e.g. `GET /api/gold-rates`) without touching
 * any UI component. Components should only ever import from this file —
 * never hardcode rate numbers inline.
 */

export type PurityKey = '24K' | '22K' | '18K';

export interface PurityRate {
  key: PurityKey;
  label: string;
  purity: string;
  perGram: number;
  per8Gram: number;
  per10Gram: number;
  changeAmount: number;
  changePercent: number;
  trend: 'up' | 'down';
}

export interface GoldRateSummaryRow {
  key: PurityKey;
  label: string;
  todayRate: number;
  yesterdayRate: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down';
}

export interface TrendPoint {
  label: string;
  value: number;
}

export type TrendRange = '7D' | '30D' | '6M' | '1Y';

// Demo "as of" timestamp shown in the hero. Replace with the timestamp
// returned by the live rate API.
export const GOLD_RATE_LAST_UPDATED_TIME = '10:30 AM';

// Demo purity rates — mirrors the shape a `GET /api/gold-rates` response
// would return.
export const GOLD_RATES: Record<PurityKey, PurityRate> = {
  '24K': {
    key: '24K',
    label: '24K Gold',
    purity: '999',
    perGram: 7502,
    per8Gram: 60016,
    per10Gram: 75020,
    changeAmount: 93,
    changePercent: 1.25,
    trend: 'up',
  },
  '22K': {
    key: '22K',
    label: '22K Gold',
    purity: '916',
    perGram: 6878,
    per8Gram: 55024,
    per10Gram: 68780,
    changeAmount: 81,
    changePercent: 1.18,
    trend: 'up',
  },
  '18K': {
    key: '18K',
    label: '18K Gold',
    purity: '750',
    perGram: 5627,
    per8Gram: 45016,
    per10Gram: 56270,
    changeAmount: 61,
    changePercent: 1.1,
    trend: 'up',
  },
};

export const PURITY_ORDER: PurityKey[] = ['24K', '22K', '18K'];

// The rate featured front-and-center in the hero card.
export const FEATURED_RATE = GOLD_RATES['24K'];

// Demo yesterday-vs-today summary table data.
export const GOLD_RATE_SUMMARY: GoldRateSummaryRow[] = PURITY_ORDER.map((key) => {
  const rate = GOLD_RATES[key];
  const yesterdayRate = rate.perGram - rate.changeAmount;
  return {
    key,
    label: `${rate.key} (${rate.purity})`,
    todayRate: rate.perGram,
    yesterdayRate,
    change: rate.changeAmount,
    changePercent: rate.changePercent,
    trend: rate.trend,
  };
});

// Demo historical trend series for the 24K per-gram rate, keyed by range.
// Structured separately from the UI so it can later be replaced by a real
// history endpoint per range.
export const GOLD_RATE_TRENDS: Record<TrendRange, TrendPoint[]> = {
  '7D': [
    { label: '13 May', value: 6890 },
    { label: '14 May', value: 6945 },
    { label: '15 May', value: 6920 },
    { label: '16 May', value: 7180 },
    { label: '17 May', value: 7205 },
    { label: '18 May', value: 7460 },
    { label: '19 May', value: 7502 },
  ],
  '30D': [
    { label: '20 Apr', value: 6510 },
    { label: '23 Apr', value: 6560 },
    { label: '26 Apr', value: 6605 },
    { label: '29 Apr', value: 6580 },
    { label: '02 May', value: 6650 },
    { label: '05 May', value: 6720 },
    { label: '08 May', value: 6690 },
    { label: '11 May', value: 6780 },
    { label: '14 May', value: 6945 },
    { label: '17 May', value: 7205 },
    { label: '19 May', value: 7502 },
  ],
  '6M': [
    { label: 'Dec', value: 6120 },
    { label: 'Jan', value: 6280 },
    { label: 'Feb', value: 6390 },
    { label: 'Mar', value: 6455 },
    { label: 'Apr', value: 6650 },
    { label: 'May', value: 7502 },
  ],
  '1Y': [
    { label: 'Jun', value: 5680 },
    { label: 'Jul', value: 5790 },
    { label: 'Aug', value: 5860 },
    { label: 'Sep', value: 5940 },
    { label: 'Oct', value: 6050 },
    { label: 'Nov', value: 6100 },
    { label: 'Dec', value: 6120 },
    { label: 'Jan', value: 6280 },
    { label: 'Feb', value: 6390 },
    { label: 'Mar', value: 6455 },
    { label: 'Apr', value: 6650 },
    { label: 'May', value: 7502 },
  ],
};

export const TREND_RANGE_LABELS: Record<TrendRange, string> = {
  '7D': '7 Days',
  '30D': '30 Days',
  '6M': '6 Months',
  '1Y': '1 Year',
};
