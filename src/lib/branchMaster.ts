/**
 * Branch Master API Integration Service
 * 
 * Interacts with Muthoot Branch Master live endpoints:
 * - GET  /Branch/FetchAll  (Retrieves list of all branches)
 * - POST /Branch/Fetch     (Retrieves full details for a branch code)
 */

export const BRANCH_MASTER_BASE_URL =
  (process.env.NEXT_PUBLIC_BRANCH_MASTER_BASE_URL ||
    process.env.BRANCH_MASTER_BASE_URL ||
    '').replace(/\/$/, '');

export interface RawBranchSummary {
  branchCode: string;
  branchName: string;
}

export interface RawBranchDetails {
  branchCode: string;
  branchName: string;
  contactPersonName?: string;
  contactPersonMobile?: string;
  mgpEnabledBranch?: boolean;
  branchPhoneNumber?: string;
  branchEmailId?: string;
  region?: string;
  location: string;
  addressLine1?: string;
  addressLine2?: string;
  state: string;
  pin: string;
  isActive?: boolean;
  gstNo?: string;
  gstCertificateDocId?: string;
}

export interface BranchMasterDetailsItem {
  branchCode: string;
  branchName: string;
  branchEmail?: string;
  branchPhoneNo?: string;
  contactPersonMobile?: string;
  location: string;
  state: string;
  addressLine1?: string;
  addressLine2?: string;
  pin: string;
}

export interface CachedBranchMasterDataset {
  states: string[];
  locationsByState: Record<string, string[]>;
  branchesByState: Record<string, BranchMasterDetailsItem[]>;
  allBranches: BranchMasterDetailsItem[];
  fetchedAt: string;
}

/**
 * 1. Fetch All Branch Summaries
 * GET /Branch/FetchAll
 */
export async function fetchAllBranchSummaries(): Promise<RawBranchSummary[]> {
  if (!BRANCH_MASTER_BASE_URL) {
    console.error('BRANCH_MASTER_BASE_URL environment variable is missing. Live branch fetch aborted.');
    return [];
  }

  try {
    const url = `${BRANCH_MASTER_BASE_URL}/Branch/FetchAll`;
    const res = await fetch(url, {
      method: 'GET',
      headers: { accept: '*/*' },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`fetchAllBranchSummaries failed with HTTP ${res.status}`);
      return [];
    }

    const data = await res.json();
    if (data && data.success && Array.isArray(data.respData?.branches)) {
      return data.respData.branches;
    }
    return [];
  } catch (err) {
    console.error('fetchAllBranchSummaries error:', err);
    return [];
  }
}

/**
 * 2. Fetch Single Branch Full Details by Branch Code
 * POST /Branch/Fetch
 */
export async function fetchBranchByCode(branchCode: string): Promise<RawBranchDetails | null> {
  if (!BRANCH_MASTER_BASE_URL) {
    console.error('BRANCH_MASTER_BASE_URL environment variable is missing. Live branch fetch aborted.');
    return null;
  }

  try {
    const url = `${BRANCH_MASTER_BASE_URL}/Branch/Fetch`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
      },
      body: JSON.stringify({ branchCode }),
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`fetchBranchByCode (${branchCode}) failed with HTTP ${res.status}`);
      return null;
    }

    const data = await res.json();
    if (data && data.success && data.respData) {
      return data.respData;
    }
    return null;
  } catch (err) {
    console.error(`fetchBranchByCode error (${branchCode}):`, err);
    return null;
  }
}

/**
 * 3. Aggregates all States, Locations, and Branch Details with 24-hour server caching.
 */
export async function getDailyCachedBranchMasterData(): Promise<CachedBranchMasterDataset | null> {
  try {
    const summaries = await fetchAllBranchSummaries();
    if (!summaries || summaries.length === 0) {
      return null;
    }

    // Fetch full details for all branches concurrently
    const fullDetailsList = await Promise.all(
      summaries.map(async (s) => {
        return await fetchBranchByCode(s.branchCode);
      })
    );

    const validBranches = fullDetailsList.filter(
      (b): b is RawBranchDetails => b !== null && Boolean(b.state)
    );

    if (validBranches.length === 0) {
      return null;
    }

    const statesSet = new Set<string>();
    const locationsByState: Record<string, Set<string>> = {};
    const branchesByState: Record<string, BranchMasterDetailsItem[]> = {};
    const allBranches: BranchMasterDetailsItem[] = [];

    validBranches.forEach((b) => {
      const st = b.state.trim();
      const loc = b.location.trim();

      statesSet.add(st);

      if (!locationsByState[st]) {
        locationsByState[st] = new Set<string>();
      }
      locationsByState[st].add(loc);

      const normalizedItem: BranchMasterDetailsItem = {
        branchCode: b.branchCode,
        branchName: b.branchName,
        branchEmail: b.branchEmailId,
        branchPhoneNo: b.branchPhoneNumber,
        contactPersonMobile: b.contactPersonMobile,
        location: loc,
        state: st,
        addressLine1: b.addressLine1,
        addressLine2: b.addressLine2,
        pin: b.pin,
      };

      if (!branchesByState[st]) {
        branchesByState[st] = [];
      }
      branchesByState[st].push(normalizedItem);
      allBranches.push(normalizedItem);
    });

    const states = Array.from(statesSet).sort();
    const finalLocationsByState: Record<string, string[]> = {};

    Object.keys(locationsByState).forEach((st) => {
      finalLocationsByState[st] = Array.from(locationsByState[st]).sort();
    });

    return {
      states,
      locationsByState: finalLocationsByState,
      branchesByState,
      allBranches,
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('getDailyCachedBranchMasterData error:', err);
    return null;
  }
}
