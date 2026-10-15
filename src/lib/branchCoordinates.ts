import 'server-only';
import savedCoordinates from '@/data/branchCoordinates.json';
import type { BranchMasterDetail } from './branchMaster';

// Map pins need lat/lng, which the Branch Master API doesn't provide. Each branch gets its
// coordinates from, in order:
//   1. the API itself (lat/lng), if it ever starts sending them
//   2. src/data/branchCoordinates.json (geocoded once; hand-correctable)
//   3. an automatic OpenStreetMap lookup for branches that are in neither (new branches)

export interface BranchWithCoordinates extends Omit<BranchMasterDetail, 'lat' | 'lng'> {
  lat: number | null;
  lng: number | null;
}

type LatLng = { lat: number; lng: number };

const SAVED = savedCoordinates as Record<string, { lat: number | null; lng: number | null }>;

const MAX_LOOKUPS_PER_REQUEST = 5; // keeps a burst of new branches from slowing one request down
const RETRY_FAILED_AFTER_MS = 6 * 60 * 60 * 1000;
const NOMINATIM_GAP_MS = 1100; // Nominatim usage policy: max 1 request per second

const found = new Map<string, LatLng>();
const failedAt = new Map<string, number>();
let queue: Promise<unknown> = Promise.resolve();
let lastRequestAt = 0;

// Serialised so concurrent requests never exceed Nominatim's rate limit.
function nominatim(query: string): Promise<LatLng | null> {
  const run = async (): Promise<LatLng | null> => {
    const wait = NOMINATIM_GAP_MS - (Date.now() - lastRequestAt);
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    lastRequestAt = Date.now();
    try {
      const params = new URLSearchParams({ format: 'jsonv2', limit: '1', countrycodes: 'in', q: query });
      const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
        headers: { 'User-Agent': 'MuthootGoldPoint-website-branch-geocoder/1.0' },
        next: { revalidate: 60 * 60 * 24 * 30 },
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) return null;
      const [hit] = await res.json();
      return hit ? { lat: +(+hit.lat).toFixed(6), lng: +(+hit.lon).toFixed(6) } : null;
    } catch {
      return null;
    }
  };
  const result = queue.then(run, run);
  queue = result;
  return result;
}

async function geocodeBranch(b: BranchMasterDetail): Promise<LatLng | null> {
  const pin = /^\d{6}$/.test((b.pin || '').trim()) ? b.pin.trim() : '';
  const queries = [
    [b.addressLine2, b.location, b.state, pin],
    [b.location, b.state, pin],
    [pin, b.state],
  ].map((parts) => parts.filter(Boolean).join(', '));
  for (const q of queries) {
    if (q.split(',').length < 2) continue;
    const hit = await nominatim(q);
    if (hit) return hit;
  }
  return null;
}

export async function attachCoordinates(branches: BranchMasterDetail[]): Promise<BranchWithCoordinates[]> {
  let lookupsLeft = MAX_LOOKUPS_PER_REQUEST;
  const out: BranchWithCoordinates[] = [];

  for (const b of branches) {
    const code = b.branchCode;
    const saved = SAVED[code];
    let coords: LatLng | null = null;

    if (b.lat != null && b.lng != null) coords = { lat: b.lat, lng: b.lng };
    else if (saved?.lat != null && saved?.lng != null) coords = { lat: saved.lat, lng: saved.lng };
    else if (found.has(code)) coords = found.get(code)!;
    else if (code && lookupsLeft > 0 && Date.now() - (failedAt.get(code) ?? 0) > RETRY_FAILED_AFTER_MS) {
      lookupsLeft--;
      coords = await geocodeBranch(b);
      if (coords) {
        found.set(code, coords);
        console.info(`[BranchCoordinates] Auto-geocoded new branch ${code} (${b.branchName}); add it to src/data/branchCoordinates.json to pin it exactly.`);
      } else {
        failedAt.set(code, Date.now());
        console.warn(`[BranchCoordinates] Could not geocode branch ${code} (${b.branchName}); it has no map pin.`);
      }
    }

    out.push({ ...b, lat: coords?.lat ?? null, lng: coords?.lng ?? null });
  }
  return out;
}
