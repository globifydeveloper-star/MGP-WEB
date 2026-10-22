'use client';

import { useMemo } from 'react';
import { GOLD_RATES, PurityKey, PurityRate } from '@/lib/goldRateData';
import { useSiteData } from '@/components/providers/SiteDataProvider';

export interface LiveGoldRatesState {
  rates: Record<PurityKey, PurityRate>;
  isLoading: boolean;
  isLive: boolean;
  lastUpdated: string;
}

const LABELS: Record<PurityKey, string> = { '24K': '24K Gold', '22K': '22K Gold', '18K': '18K Gold' };

// Rates arrive with the page (fetched by the root layout on the server), so there is no
// browser request. Without live rates the static defaults are shown.
export function useLiveGoldRates(options?: { enabled?: boolean }): LiveGoldRatesState {
  const enabled = options?.enabled ?? true;
  const { goldRates } = useSiteData();

  return useMemo(() => {
    if (!enabled) {
      return { rates: { ...GOLD_RATES }, isLoading: true, isLive: false, lastUpdated: '10:30 AM' };
    }
    if (!goldRates?.success || !goldRates.rates) {
      return { rates: { ...GOLD_RATES }, isLoading: false, isLive: false, lastUpdated: '10:30 AM' };
    }

    const rates = {} as Record<PurityKey, PurityRate>;
    for (const key of ['24K', '22K', '18K'] as const) {
      const r = goldRates.rates[key];
      rates[key] = {
        key,
        label: LABELS[key],
        purity: r.purity,
        perGram: r.perGram,
        per8Gram: r.per8Gram,
        per10Gram: r.per10Gram,
        changeAmount: r.changeAmount,
        changePercent: r.changePercent,
        trend: r.trend,
      };
    }

    return {
      rates,
      isLoading: false,
      isLive: goldRates.isLive ?? true,
      lastUpdated: goldRates.lastUpdated || '10:30 AM',
    };
  }, [enabled, goldRates]);
}
