'use server';

import { sendOtp as internalSendOtp, verifyOtp as internalVerifyOtp, EnquiryDetails } from '@/lib/otp';

export async function sendOtpAction(phone: string) {
  return await internalSendOtp(phone);
}

export async function verifyOtpAction(phone: string, otp: string, details?: EnquiryDetails) {
  return await internalVerifyOtp(phone, otp, details);
}
