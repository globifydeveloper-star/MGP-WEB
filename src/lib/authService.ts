/**
 * Channel Lead / Branch Master Authentication Service
 * 
 * Implements authentication specification from ChannelLead-Auth-Login.bru:
 * Endpoint: POST /Auth/Login
 * Request: { username, password }
 * Response: JWT access token
 */

export const AUTH_API_BASE_URL =
  process.env.NEXT_PUBLIC_BRANCH_MASTER_BASE_URL ||
  process.env.CHANNEL_LEAD_BASE_URL ||
  'https://mgpcommonext-mgpuat.muthootexim.com';

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

/**
 * Execute POST /Auth/Login to acquire a valid Bearer JWT token.
 */
export async function loginChannelLead(
  username?: string,
  password?: string
): Promise<string | null> {
  // Reuse in-memory cached token if valid (less than 23 hours old)
  if (cachedAuthToken && Date.now() < cachedAuthToken.expiresAt) {
    return cachedAuthToken.token;
  }

  const u = username || process.env.CHANNEL_LEAD_USERNAME || process.env.BRANCH_MASTER_USERNAME;
  const p = password || process.env.CHANNEL_LEAD_PASSWORD || process.env.BRANCH_MASTER_PASSWORD;

  if (!u || !p) {
    return null;
  }

  try {
    const url = `${AUTH_API_BASE_URL.replace(/\/$/, '')}/Auth/Login`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ username: u, password: p }),
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`loginChannelLead failed with HTTP status ${res.status}`);
      return null;
    }

    const data: AuthLoginResponse = await res.json();
    const token =
      data.token ||
      data.access_token ||
      data.respData?.token ||
      data.respData?.access_token;

    if (token) {
      cachedAuthToken = {
        token,
        expiresAt: Date.now() + 23 * 60 * 60 * 1000,
      };
      return token;
    }

    return null;
  } catch (err) {
    console.error('loginChannelLead network error:', err);
    return null;
  }
}

/**
 * Resolves a valid Bearer token from explicit parameter, env var, or Auth/Login flow.
 */
export async function resolveAuthToken(explicitToken?: string): Promise<string | null> {
  if (explicitToken) return explicitToken;

  const envToken = process.env.NEXT_PUBLIC_BRANCH_MASTER_TOKEN || process.env.BRANCH_MASTER_TOKEN || process.env.CHANNEL_LEAD_TOKEN;
  if (envToken) return envToken;

  return await loginChannelLead();
}
