/**
 * Muthoot API Auth Service
 * Endpoint: POST /Auth/Login
 * Base URL: https://mgpcommonext-mgpuat.muthootexim.com
 */

const COMMON_BASE_URL = (
  process.env.BRANCH_MASTER_BASE_URL ||
  process.env.NEXT_PUBLIC_BRANCH_MASTER_BASE_URL ||
  process.env.CHANNEL_LEAD_BASE_URL ||
  'https://mgpcommonext-mgpuat.muthootexim.com'
).replace(/\/$/, '');

const USERNAME =
  process.env.CHANNEL_LEAD_USERNAME ||
  process.env.BRANCH_MASTER_USERNAME ||
  'MP20500356';

const PASSWORD =
  process.env.CHANNEL_LEAD_PASSWORD ||
  process.env.BRANCH_MASTER_PASSWORD ||
  'dssds';

export interface AuthLoginResponse {
  success?: boolean;
  token?: string;
  access_token?: string;
  message?: string;
  respData?: {
    token?: string;
    access_token?: string;
    expiresIn?: number;
  };
}

let cachedAuthToken: { token: string; expiresAt: number } | null = null;

export function invalidateAuthToken(): void {
  cachedAuthToken = null;
}

export async function loginChannelLead(
  username?: string,
  password?: string
): Promise<string | null> {
  if (cachedAuthToken && Date.now() < cachedAuthToken.expiresAt - 300000) {
    return cachedAuthToken.token;
  }

  const u = username || USERNAME;
  const p = password || PASSWORD;

  try {
    const url = `${COMMON_BASE_URL}/Auth/Login`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, */*',
      },
      body: JSON.stringify({ username: u, password: p }),
      cache: 'no-store',
    });

    if (!res.ok) {
      console.warn(`[Auth/Login] HTTP ${res.status}`);
      return null;
    }

    const data: AuthLoginResponse = await res.json();
    const token =
      data?.token ||
      data?.access_token ||
      data?.respData?.token ||
      data?.respData?.access_token ||
      (typeof data?.respData === 'string' ? data.respData : null);

    if (token) {
      cachedAuthToken = {
        token,
        expiresAt: Date.now() + 23 * 60 * 60 * 1000,
      };
      return token;
    }

    return null;
  } catch (err) {
    console.error('[Auth/Login] Error fetching auth token:', err);
    return null;
  }
}

export async function resolveAuthToken(explicitToken?: string): Promise<string | null> {
  if (explicitToken) return explicitToken;

  const envToken =
    process.env.BRANCH_MASTER_JWT_TOKEN ||
    process.env.NEXT_PUBLIC_BRANCH_MASTER_JWT_TOKEN ||
    process.env.NEXT_PUBLIC_BRANCH_MASTER_TOKEN ||
    process.env.BRANCH_MASTER_TOKEN ||
    process.env.CHANNEL_LEAD_TOKEN;

  if (envToken && envToken.trim().length > 0) {
    return envToken.trim();
  }

  return await loginChannelLead();
}
