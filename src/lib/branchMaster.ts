import { resolveAuthToken } from './authService';

export const BRANCH_MASTER_BASE_URL = (
  process.env.NEXT_PUBLIC_BRANCH_MASTER_BASE_URL ||
  process.env.BRANCH_MASTER_BASE_URL ||
  'https://mgpcommonext-mgpuat.muthootexim.com'
).replace(/\/$/, '');

export interface BranchMasterDetail {
  branchCode: string;
  branchName: string;
  contactPersonMobile: string;
  branchPhoneNo: string;
  branchEmail: string;
  location: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  pin: string;
  isActive?: boolean;
  gstNo?: string;
}

export interface BranchMasterDetailsItem extends BranchMasterDetail {}

export interface BranchMasterAllData {
  states: string[];
  locationsByState: Record<string, string[]>;
  branchesByState: Record<string, BranchMasterDetail[]>;
  allBranches: BranchMasterDetail[];
  fetchedAt?: string;
}

export type CachedBranchMasterDataset = BranchMasterAllData;

export async function fetchAllBranchSummaries(): Promise<Array<{ branchCode: string; branchName: string }>> {
  try {
    const token = await resolveAuthToken();
    const headers: Record<string, string> = { accept: '*/*' };
    if (token) {
      headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }

    const url = `${BRANCH_MASTER_BASE_URL}/Branch/FetchAll`;
    const res = await fetch(url, {
      method: 'GET',
      headers,
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      console.warn(`fetchAllBranchSummaries failed with HTTP ${res.status}`);
      return [];
    }

    const data = await res.json();
    if (data?.success && Array.isArray(data?.respData?.branches)) {
      return data.respData.branches;
    }
    return [];
  } catch (err) {
    console.error('[BranchMaster] fetchAllBranchSummaries error:', err);
    return [];
  }
}

export async function fetchBranchDetail(branchCode: string): Promise<BranchMasterDetail | null> {
  try {
    const token = await resolveAuthToken();
    const headers: Record<string, string> = {
      accept: '*/*',
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }

    const url = `${BRANCH_MASTER_BASE_URL}/Branch/Fetch`;
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ branchCode }),
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (data?.success && data?.respData) {
      const d = data.respData;
      return {
        branchCode: d.branchCode || branchCode,
        branchName: d.branchName || '',
        contactPersonMobile: d.contactPersonMobile || '',
        branchPhoneNo: d.branchPhoneNumber || d.branchPhoneNo || '',
        branchEmail: d.branchEmailId || d.branchEmail || '',
        location: d.location || '',
        addressLine1: d.addressLine1 || '',
        addressLine2: d.addressLine2 || '',
        state: d.state || '',
        pin: d.pin || '',
        isActive: d.isActive,
        gstNo: d.gstNo,
      };
    }
    return null;
  } catch (err) {
    console.error(`[BranchMaster] fetchBranchDetail error (${branchCode}):`, err);
    return null;
  }
}

export async function getDailyCachedBranchMasterData(): Promise<BranchMasterAllData | null> {
  try {
    const summaries = await fetchAllBranchSummaries();
    if (!summaries || summaries.length === 0) {
      return null;
    }

    const detailPromises = summaries.map((s) =>
      fetchBranchDetail(s.branchCode).catch(() => null)
    );

    const details = (await Promise.all(detailPromises)).filter(
      (d): d is BranchMasterDetail => d !== null && !!d.state
    );

    if (details.length === 0) {
      return null;
    }

    const statesSet = new Set<string>();
    const locationsByState: Record<string, Set<string>> = {};
    const branchesByState: Record<string, BranchMasterDetail[]> = {};

    for (const b of details) {
      const st = b.state.trim();
      const loc = b.location ? b.location.trim() : '';

      statesSet.add(st);

      if (!locationsByState[st]) {
        locationsByState[st] = new Set<string>();
      }
      if (loc) {
        locationsByState[st].add(loc);
      }

      if (!branchesByState[st]) {
        branchesByState[st] = [];
      }
      branchesByState[st].push(b);
    }

    const states = Array.from(statesSet).sort();
    const formattedLocations: Record<string, string[]> = {};
    for (const st of states) {
      formattedLocations[st] = Array.from(locationsByState[st] || []).sort();
    }

    return {
      states,
      locationsByState: formattedLocations,
      branchesByState,
      allBranches: details,
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[BranchMaster] Failed to fetch daily cached data:', err);
    return null;
  }
}
