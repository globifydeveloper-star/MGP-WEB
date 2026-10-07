'use server';

import { sendOtp as internalSendOtp, verifyOtp as internalVerifyOtp, EnquiryDetails } from '@/lib/otp';
import { cookies, headers } from 'next/headers';
import { createVerifiedToken } from '@/lib/otpToken';
import { getClientIp } from '@/lib/getClientIp';
import { getDailyCachedBranchMasterData } from '@/lib/branchMaster';

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
  // Server-side branch validation for forms requiring a branch
  if (details && details.formType !== 'gold-value-precheck') {
    const branchCode = details.branchCode?.trim();
    if (!branchCode) {
      return {
        success: false,
        message: 'Please select a branch.',
        verified: false,
      };
    }

    try {
      const branchData = await getDailyCachedBranchMasterData();
      if (branchData && branchData.allBranches && branchData.allBranches.length > 0) {
        const found = branchData.allBranches.find(
          (b) => b.branchCode.toLowerCase() === branchCode.toLowerCase()
        );

        if (!found) {
          return {
            success: false,
            message: 'Please re-select your branch.',
            verified: false,
          };
        }

        // Validate state & city match if provided
        if (details.state && details.state.trim()) {
          const expectedState = details.state.trim().toLowerCase();
          const actualState = found.state.trim().toLowerCase();
          if (expectedState !== actualState) {
            return {
              success: false,
              message: 'Please re-select your branch.',
              verified: false,
            };
          }
        }

        if (details.city && details.city.trim()) {
          const expectedCity = details.city.trim().toLowerCase();
          const actualCity = found.location.trim().toLowerCase();
          if (expectedCity !== actualCity) {
            return {
              success: false,
              message: 'Please re-select your branch.',
              verified: false,
            };
          }
        }
      } else {
        // Branch Master cache unavailable: pass through without blocking
        details.branchValidated = false;
      }
    } catch (err) {
      console.warn('[verifyOtpAction] Branch validation cache lookup error, passing through:', err);
      details.branchValidated = false;
    }
  }

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
