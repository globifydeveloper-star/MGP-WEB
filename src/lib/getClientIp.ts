import { NextRequest } from 'next/server';

export const getClientIp = (
  requestOrHeaders?: NextRequest | Headers | { get(name: string): string | null } | null
): string => {
  if (!requestOrHeaders) {
    return '127.0.0.1';
  }

  const getHeader = (name: string): string | null => {
    if ('headers' in requestOrHeaders && requestOrHeaders.headers && typeof (requestOrHeaders.headers as any).get === 'function') {
      return (requestOrHeaders as NextRequest).headers.get(name);
    }
    if (typeof (requestOrHeaders as any).get === 'function') {
      return (requestOrHeaders as Headers).get(name);
    }
    return null;
  };

  if (process.env.TRUST_CLOUDFRONT_VIEWER_HEADER === 'true') {
    const cfHeader = getHeader('cloudfront-viewer-address');
    if (cfHeader) {
      const ip = cfHeader.split(':')[0];
      if (ip) return ip.trim();
    }
  }

  const trustedProxyCount = parseInt(process.env.TRUSTED_PROXY_COUNT || '1', 10);
  const forwarded = getHeader('x-forwarded-for');
  let forwardedArray: string[] = [];

  if (forwarded) {
    forwardedArray = forwarded.split(',').map((s) => s.trim());
  }

  if (forwardedArray.length > 0) {
    const index = forwardedArray.length - trustedProxyCount;
    if (index >= 0 && index < forwardedArray.length) {
      return forwardedArray[index];
    }
  }

  return (requestOrHeaders as any).ip || getHeader('x-real-ip') || '127.0.0.1';
};

