/**
 * Muthoot API Auth Service
 * Supports Muthoot Channel Login (POST /channel/channellogin) and Legacy (/Auth/Login)
 */

import 'server-only';

import { requireEnv } from './env.server';


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

function extractToken(data: AuthLoginResponse): string | null {
  if (!data) return null;
  const token =
    data?.respData?.accessToken ||
    data?.respData?.token ||
    data?.respData?.access_token ||
    data?.token ||
    data?.access_token ||
    (typeof data?.respData === 'string' ? (((data as AuthLoginResponse).respData as any) as string) : null);
  return (token && typeof token === 'string') ? token.trim() : null;
}

let cachedAuthToken: { token: string; expiresAt: number } | null = null;
let loginPromise: Promise<string | null> | null = null;

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

  if (loginPromise) {
    return loginPromise;
  }

  const u = username || process.env.CHANNEL_LEAD_USERNAME || process.env.BRANCH_MASTER_USERNAME || requireEnv('CRM_USERNAME');
  const p = password || process.env.CHANNEL_LEAD_PASSWORD || process.env.BRANCH_MASTER_PASSWORD || requireEnv('CRM_PASSWORD');

  loginPromise = (async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      const res = await fetch(process.env.CRM_AUTH_URL || requireEnv('CHANNEL_AUTH_URL'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, */*',
        },
        body: JSON.stringify({ username: u, password: p }),
        cache: 'no-store',
        signal: controller.signal,
      });

      if (!res.ok) {
        console.warn(`[Auth/Login] HTTP ${res.status}`);
        return null;
      }

      const data = (await res.json()) as AuthLoginResponse;
      const token = extractToken(data);

      if (token) {
        cachedAuthToken = {
          token: token,
          expiresAt: Date.now() + 10 * 60 * 60 * 1000,
        };
        return cachedAuthToken.token;
      }

      return null;
    } catch (err: unknown) {
      if ((err as Error)?.name === 'AbortError') {
        console.error('[Auth/Login] Request timed out (10s)');
      } else {
        console.error('[Auth/Login] Error fetching auth token:', err);
      }
      return null;
    } finally {
      clearTimeout(timeoutId);
      loginPromise = null;
    }
  })();

  return loginPromise;
}

export async function resolveAuthToken(explicitToken?: string): Promise<string | null> {
  if (explicitToken) return explicitToken;

  const envToken =
    process.env.BRANCH_MASTER_JWT_TOKEN ||
    process.env.BRANCH_MASTER_TOKEN ||
    process.env.CHANNEL_LEAD_TOKEN ||
    process.env.CRM_TOKEN;

  if (envToken && envToken.trim().length > 0) {
    return envToken.trim();
  }

  return await loginChannelLead();
}
