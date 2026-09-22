import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

// Browser calls go to this site (/strapi/...) and are forwarded to Strapi from the
// server, so the browser never needs to reach or trust the backend directly.
const ALLOWED_ROOTS = new Set(['api', 'uploads']);
const STRIP_REQUEST = ['host', 'connection', 'content-length', 'accept-encoding'];
const STRIP_RESPONSE = ['content-encoding', 'content-length', 'transfer-encoding', 'connection'];

async function proxy(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  if (!path?.length || !ALLOWED_ROOTS.has(path[0])) {
    return Response.json({ error: { message: 'Not found' } }, { status: 404 });
  }

  const base = (
    process.env.STRAPI_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    'http://localhost:1337'
  ).replace(/\/+$/, '');
  const target = `${base}/${path.join('/')}${req.nextUrl.search}`;

  const headers = new Headers(req.headers);
  STRIP_REQUEST.forEach((h) => headers.delete(h));

  const init: RequestInit = { method: req.method, headers, redirect: 'manual', cache: 'no-store' };
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = await req.arrayBuffer();
  }

  try {
    const res = await fetch(target, init);
    const outHeaders = new Headers(res.headers);
    STRIP_RESPONSE.forEach((h) => outHeaders.delete(h));
    return new Response(res.body, { status: res.status, headers: outHeaders });
  } catch (err) {
    console.error(`[strapi-proxy] ${req.method} ${target} failed:`, err);
    return Response.json({ error: { message: 'Backend unavailable' } }, { status: 502 });
  }
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE, proxy as OPTIONS };
