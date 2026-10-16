import 'server-only';
import savedCoordinates from '@/data/branchCoordinates.json';
import type { BranchMasterDetail } from './branchMaster';

// Map pins need lat/lng, which the Branch Master API doesn't provide. Each branch gets its
// coordinates from, in order:
//   1. the API itself (lat/lng), if it ever starts sending them
//   2. src/data/branchCoordinates.json (geocoded once; hand-correctable) — only while the branch's
//      PIN and city still match what was geocoded, so a changed/replaced API never shows stale pins
//   3. an automatic OpenStreetMap lookup, run in the background, for anything else (new or changed branches)

export interface BranchWithCoordinates extends Omit<BranchMasterDetail, 'lat' | 'lng'> {
  lat: number | null;
  lng: number | null;
}

type LatLng = { lat: number; lng: number };
type SavedEntry = { lat: number | null; lng: number | null; pin?: string; location?: string };

const SAVED = savedCoordinates as Record<string, SavedEntry>;

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

const norm = (s?: string) => (s || '').trim().toLowerCase();

// A saved coordinate is only trusted while the API still has the branch at the same PIN and city
function savedStillMatches(b: BranchMasterDetail, saved: SavedEntry): boolean {
  if (saved.pin && norm(b.pin) && norm(saved.pin) !== norm(b.pin)) return false;
  if (saved.location && norm(b.location) && norm(saved.location) !== norm(b.location)) return false;
  return true;
}

// Lookups are cached by branch code + PIN + city, so a branch whose address changes is looked up again
const lookupKey = (b: BranchMasterDetail) => `${b.branchCode}|${norm(b.pin)}|${norm(b.location)}`;
const pending = new Set<string>();

// Background lookup: the API response doesn't wait for it; the pin appears on a later request
function lookUpInBackground(b: BranchMasterDetail) {
  const key = lookupKey(b);
  if (pending.has(key) || Date.now() - (failedAt.get(key) ?? 0) < RETRY_FAILED_AFTER_MS) return;
  pending.add(key);
  geocodeBranch(b)
    .then((coords) => {
      if (coords) {
        found.set(key, coords);
        console.info(`[BranchCoordinates] Auto-geocoded branch ${b.branchCode} (${b.branchName}); add it to src/data/branchCoordinates.json (scripts/geocode-branches.mjs) to pin it exactly.`);
      } else {
        failedAt.set(key, Date.now());
        console.warn(`[BranchCoordinates] Could not geocode branch ${b.branchCode} (${b.branchName}); it has no map pin.`);
      }
    })
    .finally(() => pending.delete(key));
}

// `complete` is false while some branches are still waiting for a background lookup
export function attachCoordinates(branches: BranchMasterDetail[]): { branches: BranchWithCoordinates[]; complete: boolean } {
  let complete = true;
  const out = branches.map((b) => {
    const saved = SAVED[b.branchCode];
    let coords: LatLng | null = null;

    if (b.lat != null && b.lng != null) coords = { lat: b.lat, lng: b.lng };
    else if (saved?.lat != null && saved?.lng != null && savedStillMatches(b, saved)) coords = { lat: saved.lat, lng: saved.lng };
    else if (found.has(lookupKey(b))) coords = found.get(lookupKey(b))!;
    else if (b.branchCode) {
      lookUpInBackground(b);
      if (pending.has(lookupKey(b))) complete = false;
    }

    return { ...b, lat: coords?.lat ?? null, lng: coords?.lng ?? null };
  });
  return { branches: out, complete };
}
