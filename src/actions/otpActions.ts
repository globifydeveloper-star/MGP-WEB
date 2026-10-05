'use server';

import { sendOtp as internalSendOtp, verifyOtp as internalVerifyOtp, EnquiryDetails } from '@/lib/otp';
import { cookies, headers } from 'next/headers';
import { createVerifiedToken } from '@/lib/otpToken';
import { getClientIp } from '@/lib/getClientIp';

export async function sendOtpAction(phone: string, honeypot?: string) {
  if (honeypot && honeypot.trim() !== '') {
    console.log('[otp] honeypot triggered');
    return {
      success: true,
      message: 'OTP sent successfully.',
    };
  }

  const reqHeaders = await headers();
  const clientIp = getClientIp(reqHeaders);

  return await internalSendOtp(phone, clientIp);
}

export async function verifyOtpAction(phone: string, otp: string, details?: EnquiryDetails) {
  const reqHeaders = await headers();
  const clientIp = getClientIp(reqHeaders);
  const result = await internalVerifyOtp(phone, otp, details, clientIp);
  
  if (result.success && result.verified) {
    const token = createVerifiedToken(phone);
    
    const cookieStore = await cookies();
    cookieStore.set('mgp_verified_phone', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 15,
      path: '/',
    });
  }
  
  return result;
}