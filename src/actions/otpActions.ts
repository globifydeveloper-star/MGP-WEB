'use server';

import { sendOtp as internalSendOtp, verifyOtp as internalVerifyOtp, EnquiryDetails } from '@/lib/otp';
import { cookies } from 'next/headers';
import { createVerifiedToken } from '@/lib/otpToken';

export async function sendOtpAction(phone: string) {
  return await internalSendOtp(phone);
}

export async function verifyOtpAction(phone: string, otp: string, details?: EnquiryDetails) {
  const result = await internalVerifyOtp(phone, otp, details);
  
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