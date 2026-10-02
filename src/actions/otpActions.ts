'use server';

import { sendOtp as internalSendOtp, verifyOtp as internalVerifyOtp, EnquiryDetails } from '@/lib/otp';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function sendOtpAction(phone: string) {
  return await internalSendOtp(phone);
}

export async function verifyOtpAction(phone: string, otp: string, details?: EnquiryDetails) {
  const result = await internalVerifyOtp(phone, otp, details);
  
  if (result.success && result.verified) {
    const expires = Date.now() + 1000 * 60 * 15; // 15 minutes validity
    const secret = process.env.INTERNAL_API_SECRET || process.env.API_TOKEN || 'default-secret';
    const sig = crypto.createHmac('sha256', secret).update(`${phone}:${expires}`).digest('hex');
    const token = `${phone}:${expires}:${sig}`;
    
    cookies().set('mgp_verified_phone', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 15,
      path: '/',
    });
  }
  
  return result;
}