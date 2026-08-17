/**
 * Muthoot API Auth Service
 * Supports Muthoot Channel Login (POST /channel/channellogin) and Legacy (/Auth/Login)
 */

const AUTH_URL = (
  process.env.CRM_AUTH_URL ||
  process.env.CHANNEL_AUTH_URL ||
  'https://mgpauthext-mgpuat.muthootexim.com/channel/channellogin'
).trim();

const USERNAME =
  process.env.CHANNEL_LEAD_USERNAME ||
  process.env.BRANCH_MASTER_USERNAME ||
  process.env.CRM_USERNAME;


const PASSWORD =
  process.env.CHANNEL_LEAD_PASSWORD ||
  process.env.BRANCH_MASTER_PASSWORD ||
  process.env.CRM_PASSWORD;


export interface AuthLoginResponse {
  success?: boolean;
  token?: string;
  access_token?: string;
  accessToken?: string;
  message?: string;
  respData?: {
    token?: string;
    access_token?: string;
    accessToken?: string;
    expiresIn?: number;
    [key: string]: unknown;
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
    const res = await fetch(AUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, */*',
      },
      body: JSON.stringify({ username: u, password: p }),
      cache: 'no-store',
    });

    if (!res.ok) {
      console.warn(`[Auth/Login] HTTP ${res.status} from ${AUTH_URL}`);
      return null;
    }

    const data: AuthLoginResponse = await res.json();
    const token =
      data?.respData?.accessToken ||
      data?.respData?.token ||
      data?.respData?.access_token ||
      data?.token ||
      data?.access_token ||
      (typeof data?.respData === 'string' ? data.respData : null);

    if (token && typeof token === 'string') {
      cachedAuthToken = {
        token: token.trim(),
        expiresAt: Date.now() + 23 * 60 * 60 * 1000,
      };
      return cachedAuthToken.token;
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
    process.env.CHANNEL_LEAD_TOKEN ||
    process.env.CRM_TOKEN;

  if (envToken && envToken.trim().length > 0) {
    return envToken.trim();
  }

  return await loginChannelLead();
}
