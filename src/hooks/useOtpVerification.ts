'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { sendOtp, verifyOtp, EnquiryDetails } from '@/lib/otp';

export type OtpState = 'idle' | 'sending' | 'otpSent' | 'verifying' | 'verified' | 'expired' | 'error';

export interface UseOtpVerificationOptions {
  cooldownSeconds?: number;
  phoneRegex?: RegExp;
}

export function useOtpVerification(options: UseOtpVerificationOptions = {}) {
  const {
    cooldownSeconds = 60,
    phoneRegex = /^\d{10}$/
  } = options;

  const [state, setState] = useState<OtpState>('idle');
  const [countdown, setCountdown] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activePhone, setActivePhone] = useState<string>('');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to get storage key
  const getStorageKey = useCallback((phone: string) => {
    return `otp_cooldown_expiry_${phone}`;
  }, []);

  // Sync and handle countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      return;
    }

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [countdown]);

  // Restore countdown on phone change or mount
  const checkCooldown = useCallback((phone: string) => {
    if (!phone || typeof window === 'undefined') return 0;
    const stored = localStorage.getItem(getStorageKey(phone));
    if (stored) {
      const expiry = parseInt(stored, 10);
      const remaining = Math.max(0, Math.ceil((expiry - Date.now()) / 1000));
      if (remaining > 0) {
        setCountdown(remaining);
        setState('otpSent');
        setActivePhone(phone);
        return remaining;
      }
    }
    return 0;
  }, [getStorageKey]);

  const triggerSendOtp = useCallback(async (phone: string) => {
    setErrorMessage(null);

    if (!phone || !phoneRegex.test(phone)) {
      setState('error');
      setErrorMessage('Please enter a valid 10-digit phone number');
      return false;
    }

    // Check if cooldown is active
    const remainingCooldown = checkCooldown(phone);
    if (remainingCooldown > 0) {
      setState('otpSent');
      return true;
    }

    setState('sending');
    const res = await sendOtp(phone);
    if (res.success) {
      const expiryTime = Date.now() + cooldownSeconds * 1000;
      if (typeof window !== 'undefined') {
        localStorage.setItem(getStorageKey(phone), expiryTime.toString());
      }
      setActivePhone(phone);
      setCountdown(cooldownSeconds);
      setState('otpSent');
      return true;
    } else {
      setState('error');
      setErrorMessage(res.message || 'Failed to send OTP.');
      return false;
    }
  }, [cooldownSeconds, phoneRegex, getStorageKey, checkCooldown]);

  const triggerVerifyOtp = useCallback(
    async (phone: string, code: string, details?: EnquiryDetails) => {
      setErrorMessage(null);

      if (!phone || !phoneRegex.test(phone)) {
        setState('error');
        setErrorMessage('Please enter a valid 10-digit phone number');
        return false;
      }

      if (!code || code.length < 4) {
        setState('error');
        setErrorMessage('Please enter a valid OTP code.');
        return false;
      }

      setState('verifying');
      const res = await verifyOtp(phone, code, details);
      if (res.success && res.verified) {
        setState('verified');
        if (typeof window !== 'undefined') {
          localStorage.removeItem(getStorageKey(phone));
        }
        return true;
      } else {
        // Check if the failure is expiry
        const isExpired = res.message?.toLowerCase().includes('expired');
        setState(isExpired ? 'expired' : 'error');
        setErrorMessage(res.message || 'Incorrect OTP.');
        return false;
      }
    },
    [phoneRegex, getStorageKey]
  );


  const resetOtpState = useCallback(() => {
    setState('idle');
    setCountdown(0);
    setErrorMessage(null);
    setActivePhone('');
  }, []);

  return {
    state,
    countdown,
    errorMessage,
    activePhone,
    sendOtp: triggerSendOtp,
    verifyOtp: triggerVerifyOtp,
    checkCooldown,
    resetOtpState,
  };
}
