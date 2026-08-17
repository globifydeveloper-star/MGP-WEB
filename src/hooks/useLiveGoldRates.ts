'use client';

import { useState, useEffect } from 'react';
import { GOLD_RATES, PurityKey, PurityRate } from '@/lib/goldRateData';

export interface LiveGoldRatesState {
  rates: Record<PurityKey, PurityRate>;
  isLoading: boolean;
  isLive: boolean;
  lastUpdated: string;
}

// In-memory module cache shared across all components on page
let sharedState: LiveGoldRatesState = {
  rates: { ...GOLD_RATES },
  isLoading: true,
  isLive: false,
  lastUpdated: '10:30 AM',
};

let listeners: Array<(state: LiveGoldRatesState) => void> = [];
let fetchPromise: Promise<void> | null = null;

function notifyListeners() {
  listeners.forEach((listener) => listener(sharedState));
}

async function fetchRates() {
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    try {
      const res = await fetch('/api/gold-quote?all=true');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.rates) {
          const newRates: Record<PurityKey, PurityRate> = {
            '24K': {
              key: '24K',
              label: '24K Gold',
              purity: json.rates['24K'].purity,
              perGram: json.rates['24K'].perGram,
              per8Gram: json.rates['24K'].per8Gram,
              per10Gram: json.rates['24K'].per10Gram,
              changeAmount: json.rates['24K'].changeAmount,
              changePercent: json.rates['24K'].changePercent,
              trend: json.rates['24K'].trend,
            },
            '22K': {
              key: '22K',
              label: '22K Gold',
              purity: json.rates['22K'].purity,
              perGram: json.rates['22K'].perGram,
              per8Gram: json.rates['22K'].per8Gram,
              per10Gram: json.rates['22K'].per10Gram,
              changeAmount: json.rates['22K'].changeAmount,
              changePercent: json.rates['22K'].changePercent,
              trend: json.rates['22K'].trend,
            },
            '18K': {
              key: '18K',
              label: '18K Gold',
              purity: json.rates['18K'].purity,
              perGram: json.rates['18K'].perGram,
              per8Gram: json.rates['18K'].per8Gram,
              per10Gram: json.rates['18K'].per10Gram,
              changeAmount: json.rates['18K'].changeAmount,
              changePercent: json.rates['18K'].changePercent,
              trend: json.rates['18K'].trend,
            },
          };

          sharedState = {
            rates: newRates,
            isLoading: false,
            isLive: json.isLive ?? true,
            lastUpdated: json.lastUpdated || '10:30 AM',
          };
          notifyListeners();
          return;
        }
      }
    } catch (err) {
      console.warn('[useLiveGoldRates] Fetch error:', err);
    }

    sharedState = {
      ...sharedState,
      isLoading: false,
    };
    notifyListeners();
  })();

  return fetchPromise;
}

export function useLiveGoldRates(): LiveGoldRatesState {
  const [state, setState] = useState<LiveGoldRatesState>(sharedState);

  useEffect(() => {
    listeners.push(setState);
    fetchRates();

    return () => {
      listeners = listeners.filter((l) => l !== setState);
    };
  }, []);

  return state;
}
