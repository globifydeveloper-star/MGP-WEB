const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface OtpResponse {
  success: boolean;
  message?: string;
  verified?: boolean;
}

/**
 * Trigger sending OTP via the backend Pinnacle gateway API.
 * @param phone 10-digit mobile number string.
 */
export async function sendOtp(phone: string): Promise<OtpResponse> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/otp/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
  state?: string;
  city?: string;
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
 */
export async function verifyOtp(
  phone: string,
  otp: string,
  details?: EnquiryDetails
): Promise<OtpResponse> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/otp/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
