import type { NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';
import { timingSafeEqual } from 'crypto';
import { BRANCH_MASTER_CACHE_TAG } from '@/lib/branchMaster';

export const dynamic = 'force-dynamic';

// Clears the cached Branch Master list so the next page visit fetches fresh branch data,
// instead of waiting for the cache to expire. Call with the secret as ?secret=... or an
// x-revalidate-secret header:
//   GET /api/revalidate-branches?secret=<BRANCH_REVALIDATE_SECRET>

function isAuthorized(provided: string | null): boolean {
  const expected = process.env.BRANCH_REVALIDATE_SECRET;
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function handle(request: NextRequest) {
  if (!process.env.BRANCH_REVALIDATE_SECRET) {
    return Response.json(
      { revalidated: false, message: 'BRANCH_REVALIDATE_SECRET is not configured' },
      { status: 500 }
    );
  }

  const provided =
    request.headers.get('x-revalidate-secret') ?? request.nextUrl.searchParams.get('secret');
  if (!isAuthorized(provided)) {
    return Response.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 });
  }

  // expire: 0 → no stale copy is served; the next visit waits for fresh data from the API.
  revalidateTag(BRANCH_MASTER_CACHE_TAG, { expire: 0 });

  return Response.json(
    { revalidated: true, tag: BRANCH_MASTER_CACHE_TAG, now: new Date().toISOString() },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export const GET = handle;
export const POST = handle;
