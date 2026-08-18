import { resolveAuthToken, loginChannelLead, invalidateAuthToken } from './authService';

export const GOLD_QUOTE_BASE_URL = (
  process.env.GOLD_QUOTE_BASE_URL ||
  'https://mgpmgpext-mgpuat.muthootexim.com'
).replace(/\/$/, '');

export interface GoldQuoteRequest {
  weightInGms: number;
  purityPerc: number;
}

export interface GoldQuoteData {
  purchasePrice: number;
  preGstAmount: number;
  gstAmount: number;
  totalQuoteAmt: number;
}

export interface GoldQuoteResponse {
  success: boolean;
  message?: string;
  errorCode?: string | number | null;
  respData?: GoldQuoteData;
  fromCache?: boolean;
}

export interface PurityRateItem {
  purity: string;
  purityPerc: number;
  perGram: number;
  per8Gram: number;
  per10Gram: number;
  yesterdayRate: number;
  changeAmount: number;
  changePercent: number;
  trend: 'up' | 'down';
}

export interface AllGoldRatesResponse {
  success: boolean;
  isLive: boolean;
  lastUpdated: string;
  rates: {
    '24K': PurityRateItem;
    '22K': PurityRateItem;
    '18K': PurityRateItem;
  };
}

// In-memory 30-second TTL Cache
interface CacheEntry {
  data: GoldQuoteResponse;
  expiresAt: number;
}

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const quoteCache = new Map<string, CacheEntry>();

export function clearQuoteCache(): void {
  quoteCache.clear();
}

// In-memory Rate Limiter: max 1 request per 2 seconds per client IP
const RATE_LIMIT_WINDOW_MS = 2000; // 2 seconds
const clientRequestTimes = new Map<string, number>();

export function checkRateLimit(clientIp: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const lastRequestTime = clientRequestTimes.get(clientIp);

  if (lastRequestTime && now - lastRequestTime < RATE_LIMIT_WINDOW_MS) {
    const retryAfter = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - lastRequestTime)) / 1000);
    return { allowed: false, retryAfter };
  }

  clientRequestTimes.set(clientIp, now);

  // Periodically clean up old IP entries
  if (clientRequestTimes.size > 200) {
    for (const [ip, time] of clientRequestTimes.entries()) {
      if (now - time > RATE_LIMIT_WINDOW_MS * 5) {
        clientRequestTimes.delete(ip);
      }
    }
  }

  return { allowed: true };
}

/**
 * Fetch live gold quote from Muthoot Exim ChannelQuickQuote API.
 * Server-side only. Uses bearer token from authService with auto-refresh on 401.
 */
export async function fetchGoldQuote({
  weightInGms,
  purityPerc,
}: GoldQuoteRequest): Promise<GoldQuoteResponse> {
  const weight = Number(weightInGms);
  const purity = Number(purityPerc);

  if (!Number.isFinite(weight) || weight <= 0) {
    return {
      success: false,
      message: 'Invalid weight. Weight must be a positive number.',
    };
  }

  if (!Number.isFinite(purity) || purity <= 0 || purity > 100) {
    return {
      success: false,
      message: 'Invalid purity. Purity must be a percentage between 0 and 100.',
    };
  }

  const cacheKey = `${weight}_${purity}`;
  const cached = quoteCache.get(cacheKey);
  const now = Date.now();

  if (cached && now < cached.expiresAt) {
    return {
      ...cached.data,
      fromCache: true,
    };
  }

  let token = await resolveAuthToken();

  const callUpstream = async (authToken: string | null): Promise<Response> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (authToken) {
      headers['Authorization'] = authToken.startsWith('Bearer ')
        ? authToken
        : `Bearer ${authToken}`;
    }

    try {
      const response = await fetch(`${GOLD_QUOTE_BASE_URL}/ChannelQuickQuote/ChannelGetQuote`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          weightInGms: weight,
          purityPerc: purity,
        }),
        signal: controller.signal,
        cache: 'no-store',
      });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  };

  try {
    let res = await callUpstream(token);

    // On 401 Unauthorized, invalidate token, fetch fresh token, and retry once
    if (res.status === 401) {
      console.warn('[GoldQuote] Received 401 Unauthorized. Invalidating token and retrying...');
      invalidateAuthToken();
      token = await loginChannelLead();
      if (token) {
        res = await callUpstream(token);
      }
    }

    if (!res.ok) {
      console.error(`[GoldQuote] Upstream HTTP error: ${res.status} ${res.statusText}`);
      return {
        success: false,
        message: 'Rate temporarily unavailable — please try again',
      };
    }

    const data: GoldQuoteResponse = await res.json();

    if (data.success && data.respData) {
      const respData: GoldQuoteData = {
        purchasePrice: Number(data.respData.purchasePrice) || 0,
        preGstAmount: Number(data.respData.preGstAmount) || 0,
        gstAmount: Number(data.respData.gstAmount) || 0,
        totalQuoteAmt: Number(data.respData.totalQuoteAmt) || 0,
      };

      const result: GoldQuoteResponse = {
        success: true,
        message: data.message || '',
        errorCode: data.errorCode || null,
        respData,
      };

      // Store in memory cache
      quoteCache.set(cacheKey, {
        data: result,
        expiresAt: now + CACHE_TTL_MS,
      });

      return {
        ...result,
        fromCache: false,
      };
    }

    console.warn('[GoldQuote] Upstream returned non-success response:', data.message || data.errorCode);
    return {
      success: false,
      message: data.message || 'Rate temporarily unavailable — please try again',
      errorCode: data.errorCode,
    };
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      console.error('[GoldQuote] Upstream request timed out (10s)');
    } else {
      console.error('[GoldQuote] Fetch error:', err?.message || err);
    }
    return {
      success: false,
      message: 'Rate temporarily unavailable — please try again',
    };
  }
}

/**
 * Fetch all standard purity rates (24K, 22K, 18K) in parallel
 */
export async function fetchAllGoldRates(): Promise<AllGoldRatesResponse> {
  const purities = [
    { key: '24K' as const, purity: '999', purityPerc: 99.9, defaultPerGram: 7502, defaultChange: 93 },
    { key: '22K' as const, purity: '916', purityPerc: 91.6, defaultPerGram: 6878, defaultChange: 81 },
    { key: '18K' as const, purity: '750', purityPerc: 75.0, defaultPerGram: 5627, defaultChange: 61 },
  ];

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  try {
    const results = await Promise.all(
      purities.map(async (p) => {
        const quote = await fetchGoldQuote({ weightInGms: 1, purityPerc: p.purityPerc });
        const price = quote.success && quote.respData?.purchasePrice
          ? Math.round(quote.respData.purchasePrice)
          : p.defaultPerGram;
        const isLive = quote.success && !!quote.respData?.purchasePrice;

        const changeAmount = p.defaultChange;
        const yesterdayRate = price - changeAmount;
        const changePercent = Number(((changeAmount / yesterdayRate) * 100).toFixed(2));

        return {
          key: p.key,
          isLive,
          item: {
            purity: p.purity,
            purityPerc: p.purityPerc,
            perGram: price,
            per8Gram: price * 8,
            per10Gram: price * 10,
            yesterdayRate,
            changeAmount,
            changePercent,
            trend: 'up' as const,
          },
        };
      })
    );

    const hasAnyLive = results.some((r) => r.isLive);

    return {
      success: true,
      isLive: hasAnyLive,
      lastUpdated: timeStr,
      rates: {
        '24K': results.find((r) => r.key === '24K')!.item,
        '22K': results.find((r) => r.key === '22K')!.item,
        '18K': results.find((r) => r.key === '18K')!.item,
      },
    };
  } catch (err) {
    console.error('[fetchAllGoldRates] Error:', err);
    return {
      success: true,
      isLive: false,
      lastUpdated: '10:30 AM',
      rates: {
        '24K': { purity: '999', purityPerc: 99.9, perGram: 7502, per8Gram: 60016, per10Gram: 75020, yesterdayRate: 7409, changeAmount: 93, changePercent: 1.25, trend: 'up' },
        '22K': { purity: '916', purityPerc: 91.6, perGram: 6878, per8Gram: 55024, per10Gram: 68780, yesterdayRate: 6797, changeAmount: 81, changePercent: 1.18, trend: 'up' },
        '18K': { purity: '750', purityPerc: 75.0, perGram: 5627, per8Gram: 45016, per10Gram: 56270, yesterdayRate: 5566, changeAmount: 61, changePercent: 1.10, trend: 'up' },
      },
    };
  }
}
