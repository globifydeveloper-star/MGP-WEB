import 'server-only';

function getStrapiUrl(): string {
  const url = process.env.STRAPI_INTERNAL_URL || process.env.STRAPI_URL || null;
  if (url) return url.replace(/\/+$/, '');
  if (process.env.NODE_ENV === 'production') {
    throw new Error('STRAPI_INTERNAL_URL is not set');
  }
  return 'http://localhost:1337';
}

function getInternalHeaders(clientIp?: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const secret = process.env.INTERNAL_API_SECRET;
  if (secret) {
    headers['x-internal-secret'] = secret;
  }
  if (clientIp) {
    headers['x-client-ip'] = clientIp;
  }
  return headers;
}

export interface OtpResponse {
  success: boolean;
  message?: string;
  verified?: boolean;
}

/**
 * Trigger sending OTP via the backend Pinnacle gateway API.
 * @param phone 10-digit mobile number string.
 * @param clientIp Optional client IP string.
 */
export async function sendOtp(phone: string, clientIp?: string): Promise<OtpResponse> {
  try {
    const res = await fetch(`${getStrapiUrl()}/api/otp/send`, {
      method: 'POST',
      headers: getInternalHeaders(clientIp),
      body: JSON.stringify({ phone }),
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: data.message || 'Failed to send OTP. Please try again.',
      };
    }
    return {
      success: true,
      message: data.message || 'OTP sent successfully.',
    };
  } catch (err) {
    console.error('sendOtp error:', err);
    return {
      success: false,
      message: 'Network error. Please check your internet connection.',
    };
  }
}

export interface EnquiryDetails {
  name: string;
  email?: string;
  state?: string;
  city?: string;
  branchCode?: string;
  branchName?: string;
  purity?: string;
  weight?: string;
  message?: string;
  consent?: boolean;
  sourceForm?: string;
  enquiryType?: string;
}

/**
 * Verify a sent OTP code against the backend API.
 * @param phone 10-digit mobile number string.
 * @param otp 6-digit verification code.
 * @param details Optional inquiry form details to save in the database.
 * @param clientIp Optional client IP string.
 */
export async function verifyOtp(
  phone: string,
  otp: string,
  details?: EnquiryDetails,
  clientIp?: string
): Promise<OtpResponse> {
  try {
    const res = await fetch(`${getStrapiUrl()}/api/otp/verify`, {
      method: 'POST',
      headers: getInternalHeaders(clientIp),
      body: JSON.stringify({ phone, otp, ...details }),
    });

    const data = await res.json();
    if (!res.ok || !data.verified) {
      return {
        success: false,
        message: data.message || 'Incorrect or expired OTP.',
        verified: false,
      };
    }
    return {
      success: true,
      verified: true,
    };
  } catch (err) {
    console.error('verifyOtp error:', err);
    return {
      success: false,
      message: 'Network error. Please check your internet connection.',
      verified: false,
    };
  }
}