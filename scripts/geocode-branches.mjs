// Geocodes branch addresses into src/data/branchCoordinates.json (the Branch Master API has no lat/lng).
//
// Usage (with the dev server running):
//   curl -s http://localhost:3000/api/branch/all > branches.json
//   node scripts/geocode-branches.mjs branches.json src/data/branchCoordinates.json
//
// Branches already geocoded from the same PIN + city are skipped, so re-running only looks up new or
// changed branches. (The site also does this lookup itself, in the background, for any branch whose
// PIN/city no longer match this file — see src/lib/branchCoordinates.ts — but with area-level accuracy.)
// To fix a pin by hand, edit its lat/lng in the JSON and set "precision": "manual".
// Uses OpenStreetMap Nominatim, limited to 1 request/second by its usage policy.
import fs from 'node:fs';
const [inFile, outFile] = process.argv.slice(2);
const { allBranches } = JSON.parse(fs.readFileSync(inFile, 'utf8'));
const UA = 'MuthootGoldPoint-website-branch-geocoder/1.0';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let last = 0;
async function nominatim(params) {
  const wait = 1150 - (Date.now() - last); if (wait > 0) await sleep(wait);
  last = Date.now();
  const url = 'https://nominatim.openstreetmap.org/search?' + new URLSearchParams({ format: 'jsonv2', addressdetails: '1', limit: '3', countrycodes: 'in', ...params });
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en' } });
  if (!res.ok) { console.error('HTTP', res.status); return []; }
  return res.json();
}
const km = (a, b) => { const R = 6371, t = Math.PI / 180; const dLat = (b.lat - a.lat) * t, dLng = (b.lng - a.lng) * t; const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * t) * Math.cos(b.lat * t) * Math.sin(dLng / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); };
const norm = (s) => (s || '').toLowerCase().replace(/[^a-z]/g, '');
const stateAlias = { delhi: ['delhi', 'nationalcapitalterritoryofdelhi'], puducherry: ['puducherry', 'pondicherry'], odisha: ['odisha', 'orissa'] };
const stateOk = (r, state) => { const rs = norm(r.address?.state || r.display_name); const want = stateAlias[norm(state)] || [norm(state)]; return want.some((w) => rs.includes(w) || norm(r.display_name).includes(w)); };
const clean = (s) => (s || '').replace(/\b(no|door no|shop no|d\.?no)\.?\s*[\w\/-]+,?/gi, '').replace(/\s+/g, ' ').trim();

const out = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, "utf8")) : {};
for (const b of allBranches) {
  const prev = out[b.branchCode];
  // Skip branches already geocoded from the same PIN + city; re-geocode ones whose address changed
  if (prev?.lat != null && (!prev.pin || prev.pin === (b.pin || "").trim()) && (!prev.location || prev.location.toLowerCase() === (b.location || "").trim().toLowerCase())) continue;
  const pin = /^\d{6}$/.test((b.pin || '').trim()) ? b.pin.trim() : '';
  // Anchor: PIN-code area centre (used to sanity-check finer matches)
  let anchor = null;
  if (pin) { const r = (await nominatim({ postalcode: pin, country: 'India' })).find((x) => stateOk(x, b.state)) ; if (r) anchor = { lat: +r.lat, lng: +r.lon }; }
  const attempts = [
    ['address', { q: [clean(b.addressLine1), clean(b.addressLine2), b.location, b.state, pin].filter(Boolean).join(', ') }],
    ['landmark', { q: [clean(b.addressLine2), b.location, b.state].filter(Boolean).join(', ') }],
    ['locality', { q: [b.location, b.state, pin].filter(Boolean).join(', ') }],
  ];
  let found = null;
  for (const [precision, params] of attempts) {
    if (!params.q || params.q.split(',').length < 2) continue;
    const results = await nominatim(params);
    const r = results.find((x) => stateOk(x, b.state) && (!anchor || km(anchor, { lat: +x.lat, lng: +x.lon }) < 40));
    if (r) { found = { lat: +(+r.lat).toFixed(6), lng: +(+r.lon).toFixed(6), precision }; break; }
  }
  if (!found && anchor) found = { lat: +anchor.lat.toFixed(6), lng: +anchor.lng.toFixed(6), precision: 'pincode' };
  // location + pin record what was geocoded; the site ignores this entry if the API later changes them
  const source = { name: b.branchName, state: b.state, location: (b.location || "").trim(), pin: (b.pin || "").trim() };
  out[b.branchCode] = found ? { ...found, ...source } : { lat: null, lng: null, precision: "none", ...source };
  console.log(b.branchCode, b.state, b.branchName, '->', found ? `${found.precision} ${found.lat},${found.lng}` : 'NOT FOUND');
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2));
}
console.log('done');
