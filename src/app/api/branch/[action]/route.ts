import { NextRequest, NextResponse } from 'next/server';
import { getBranchMasterBaseUrl } from '@/lib/branchMaster';
import { resolveAuthToken } from '@/lib/authService';

export const dynamic = 'force-dynamic';

const ACTION_MAP: Record<string, string> = {
  all: 'FetchBranchDetails',
  nearby: 'nearby',
  FetchBranchDetails: 'FetchBranchDetails',
};

/**
 * Validates and extracts allowed query parameters for each branch action.
 * Any unknown parameters are dropped.
 * Returns valid: false if any recognized parameter has an invalid value.
 */
function validateAndBuildQueryParams(
  action: string,
  searchParams: URLSearchParams
): { valid: true; params: URLSearchParams } | { valid: false } {
  const cleanParams = new URLSearchParams();

  if (action === 'all' || action === 'FetchBranchDetails') {
    // Optional filters: state, city / location, pin / pincode, branchCode
    const state = searchParams.get('state');
    if (state !== null) {
      const trimmed = state.trim();
      if (trimmed.length === 0 || trimmed.length > 100 || !/^[a-zA-Z0-9\s.,&'-]+$/.test(trimmed)) {
        return { valid: false };
      }
      cleanParams.set('state', trimmed);
    }

    const city = searchParams.get('city') ?? searchParams.get('location');
    if (city !== null) {
      const trimmed = city.trim();
      if (trimmed.length === 0 || trimmed.length > 100 || !/^[a-zA-Z0-9\s.,&'-]+$/.test(trimmed)) {
        return { valid: false };
      }
      cleanParams.set('location', trimmed);
    }

    const pin = searchParams.get('pin') ?? searchParams.get('pincode');
    if (pin !== null) {
      const trimmed = pin.trim();
      if (!/^\d{4,10}$/.test(trimmed)) {
        return { valid: false };
      }
      cleanParams.set('pin', trimmed);
    }

    const branchCode = searchParams.get('branchCode');
    if (branchCode !== null) {
      const trimmed = branchCode.trim();
      if (trimmed.length === 0 || trimmed.length > 50 || !/^[a-zA-Z0-9\-_]+$/.test(trimmed)) {
        return { valid: false };
      }
      cleanParams.set('branchCode', trimmed);
    }

    return { valid: true, params: cleanParams };
  }

  if (action === 'nearby') {
    // Required: latitude (or lat) and longitude (or lng/long)
    const latRaw = searchParams.get('latitude') ?? searchParams.get('lat');
    const lngRaw = searchParams.get('longitude') ?? searchParams.get('lng') ?? searchParams.get('long');

    if (latRaw === null || lngRaw === null) {
      return { valid: false };
    }

    const lat = Number(latRaw);
    if (!Number.isFinite(lat) || lat < -90 || lat > 90) {
      return { valid: false };
    }

    const lng = Number(lngRaw);
    if (!Number.isFinite(lng) || lng < -180 || lng > 180) {
      return { valid: false };
    }

    cleanParams.set('latitude', String(lat));
    cleanParams.set('longitude', String(lng));

    // Optional: radius (in km, 0 < radius <= 500)
    const radiusRaw = searchParams.get('radius');
    if (radiusRaw !== null) {
      const radius = Number(radiusRaw);
      if (!Number.isFinite(radius) || radius <= 0 || radius > 500) {
        return { valid: false };
      }
      cleanParams.set('radius', String(radius));
    }

    // Optional: limit (integer, 1 <= limit <= 100)
    const limitRaw = searchParams.get('limit');
    if (limitRaw !== null) {
      const limit = Number(limitRaw);
      if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
        return { valid: false };
      }
      cleanParams.set('limit', String(limit));
    }

    return { valid: true, params: cleanParams };
  }

  return { valid: false };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ action: string }> }
) {
  try {
    const { action } = await params;

    const upstream = ACTION_MAP[action];
    if (!upstream) {
      return NextResponse.json(
        { success: false, message: 'Not found' },
        { status: 404 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const queryValidation = validateAndBuildQueryParams(action, searchParams);

    if (!queryValidation.valid) {
      return NextResponse.json(
        { success: false, message: 'Invalid query parameters' },
        { status: 400 }
      );
    }

    const queryString = queryValidation.params.toString();
    const targetUrl = `${getBranchMasterBaseUrl()}/Branch/${upstream}${queryString ? `?${queryString}` : ''}`;

    // Always resolve server's own token; never forward incoming client authorization or other client headers
    const token = await resolveAuthToken();

    const headers: Record<string, string> = {
      Accept: 'application/json, */*',
    };

    if (token) {
      headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    let res: Response;
    try {
      res = await fetch(targetUrl, {
        method: 'GET',
        headers,
        cache: 'no-store',
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!res.ok) {
      console.error(`[Branch API Proxy] Upstream returned status: ${res.status}`);
      return NextResponse.json(
        { success: false, message: 'Failed to fetch branch data' },
        { status: 502 }
      );
    }

    const data = await res.json().catch(() => null);
    if (!data) {
      console.error('[Branch API Proxy] Failed to parse upstream JSON');
      return NextResponse.json(
        { success: false, message: 'Invalid response from branch service' },
        { status: 502 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    if ((error as Error)?.name === 'AbortError') {
      console.error('[Branch API Proxy] Request timed out');
      return NextResponse.json(
        { success: false, message: 'Service unavailable — request timed out' },
        { status: 504 }
      );
    }

    console.error('[Branch API Proxy Error]:', (error as Error)?.message || 'Internal error');
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
