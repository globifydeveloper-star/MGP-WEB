import { NextRequest } from 'next/server';

export const getClientIp = (request: NextRequest): string => {
  if (process.env.TRUST_CLOUDFRONT_VIEWER_HEADER === 'true') {
    const cfHeader = request.headers.get('cloudfront-viewer-address');
    if (cfHeader) {
      const ip = cfHeader.split(':')[0];
      if (ip) return ip.trim();
    }
  }

  const trustedProxyCount = parseInt(process.env.TRUSTED_PROXY_COUNT || '1', 10);
  const forwarded = request.headers.get('x-forwarded-for');
  let forwardedArray: string[] = [];
  
  if (forwarded) {
    forwardedArray = forwarded.split(',').map(s => s.trim());
  }

  if (forwardedArray.length > 0) {
    const index = forwardedArray.length - trustedProxyCount;
    if (index >= 0 && index < forwardedArray.length) {
      return forwardedArray[index];
    }
  }

  return (request as any).ip || '127.0.0.1';
};
