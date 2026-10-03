import 'server-only';
import crypto from 'crypto';

const TTL_MS = 15 * 60 * 1000;

function getSecret(): string {
  const s = process.env.OTP_COOKIE_SECRET;
  if (!s) throw new Error('Missing required environment variable: OTP_COOKIE_SECRET');
  return s;
}

function sign(data: string): string {
  return crypto.createHmac('sha256', getSecret()).update(data).digest('hex');
}

export function createVerifiedToken(phone: string): string {
  const expires = Date.now() + TTL_MS;
  return `${phone}:${expires}:${sign(`${phone}:${expires}`)}`;
}

export class VerificationError extends Error {
  constructor(public code: 'NOT_VERIFIED' | 'PHONE_MISMATCH' | 'EXPIRED' | 'INVALID', message: string) {
    super(message);
    this.name = 'VerificationError';
  }
}

export function assertVerifiedToken(token: string | undefined, phone: string): void {
  if (!token) throw new VerificationError('NOT_VERIFIED', 'Phone number not verified. Please verify OTP first.');
  const parts = token.split(':');
  if (parts.length !== 3) throw new VerificationError('INVALID', 'Invalid verification token.');
  const [tPhone, tExpires, tSig] = parts;
  if (tPhone !== phone) throw new VerificationError('PHONE_MISMATCH', 'Verified phone number mismatch.');
  const exp = Number(tExpires);
  if (!Number.isFinite(exp) || Date.now() > exp) throw new VerificationError('EXPIRED', 'Verification expired. Please verify OTP again.');
  const expected = Buffer.from(sign(`${tPhone}:${tExpires}`), 'hex');
  const actual = Buffer.from(tSig, 'hex');
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) {
    throw new VerificationError('INVALID', 'Invalid verification token.');
  }
}
