/**
 * Muthoot API Auth Service
 * Endpoint: POST /Auth/Login
 * Base URL: https://mgpcommonext-mgpuat.muthootexim.com
 */

const COMMON_BASE_URL =
  process.env.BRANCH_MASTER_BASE_URL ||
  process.env.NEXT_PUBLIC_BRANCH_MASTER_BASE_URL ||
  'https://mgpcommonext-mgpuat.muthootexim.com';

const USERNAME =
  process.env.CHANNEL_LEAD_USERNAME ||
  process.env.BRANCH_MASTER_USERNAME ||
  'MP20500356';

const PASSWORD =
  process.env.CHANNEL_LEAD_PASSWORD ||
  process.env.BRANCH_MASTER_PASSWORD ||
  'dssds';

let cachedToken: string | null = null;
let tokenExpiresAt: number = 0;

export async function loginChannelLead(): Promise<string> {
  // Return cached token if valid (buffer 5 mins)
  if (cachedToken && Date.now() < tokenExpiresAt - 300000) {
    return cachedToken;
  }

  try {
    const res = await fetch(`${COMMON_BASE_URL}/Auth/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
      },
      body: JSON.stringify({
        username: USERNAME,
        password: PASSWORD,
      }),
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Auth Login failed with status: ${res.status}`);
    }

    const data = await res.json();
    const token =
      data?.respData?.token ||
      data?.token ||
      data?.respData?.access_token ||
      (typeof data?.respData === 'string' ? data.respData : null);

    if (!token) {
      throw new Error('No JWT token found in Auth Login response');
    }

    cachedToken = token;
    // Cache token for 23 hours
    tokenExpiresAt = Date.now() + 23 * 60 * 60 * 1000;
    return token;
  } catch (err) {
    console.error('[Auth/Login] Error fetching auth token:', err);
    throw err;
  }
}

export async function resolveAuthToken(): Promise<string> {
  const envToken = process.env.BRANCH_MASTER_JWT_TOKEN || process.env.NEXT_PUBLIC_BRANCH_MASTER_JWT_TOKEN;
  if (envToken && envToken.trim().length > 0) {
    return envToken.trim();
  }
  return await loginChannelLead();
}
