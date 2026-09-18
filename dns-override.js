// TEMPORARY: overrides DNS resolution for hosts that aren't resolvable from this
// container's network (e.g. an internal ALB reachable only via corporate DNS).
// Remove once proper VPC/Route53 DNS routing to the backend is in place.
const dns = require('dns');

const OVERRIDES = {
  'mgpwebsitecms-uat.muthootgoldpoint.com': '15.207.65.108',
};

const originalLookup = dns.lookup;
const originalPromiseLookup = dns.promises.lookup;

function overriddenLookup(hostname, options, callback) {
  const ip = OVERRIDES[hostname];
  if (!ip) {
    return originalLookup.call(dns, hostname, options, callback);
  }

  const cb = typeof options === 'function' ? options : callback;
  const wantsAll = typeof options === 'object' && options !== null && options.all;

  if (wantsAll) {
    return cb(null, [{ address: ip, family: 4 }]);
  }
  return cb(null, ip, 4);
}

dns.lookup = overriddenLookup;

dns.promises.lookup = async function overriddenPromiseLookup(hostname, options) {
  const ip = OVERRIDES[hostname];
  if (!ip) {
    return originalPromiseLookup.call(dns.promises, hostname, options);
  }

  const wantsAll = typeof options === 'object' && options !== null && options.all;
  if (wantsAll) {
    return [{ address: ip, family: 4 }];
  }
  return { address: ip, family: 4 };
};

console.log('[dns-override] Loaded static DNS overrides for:', Object.keys(OVERRIDES).join(', '));
