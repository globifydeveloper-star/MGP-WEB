import { resolveAuthToken } from './authService';

export const BRANCH_MASTER_BASE_URL = (
  process.env.NEXT_PUBLIC_BRANCH_MASTER_BASE_URL ||
  process.env.BRANCH_MASTER_BASE_URL ||
  'https://mgpcommonext-mgpuat.muthootexim.com'
).replace(/\/$/, '');

export interface BranchMasterDetail {
  branchCode: string;
  branchName: string;
  contactPersonMobile?: string;
  branchPhoneNo?: string;
  branchEmail?: string;
  location: string;
  addressLine1?: string;
  addressLine2?: string;
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

export async function fetchAllBranchDetails(): Promise<BranchMasterDetail[]> {
  try {
    const token = await resolveAuthToken();
    const headers: Record<string, string> = { accept: '*/*' };
    if (token) {
      headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }

    const url = `${BRANCH_MASTER_BASE_URL}/Branch/FetchBranchDetails`;
    const res = await fetch(url, {
      method: 'GET',
      headers,
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      console.warn(`fetchAllBranchDetails failed with HTTP ${res.status}`);
      return [];
    }

    const data = await res.json();
    let rawBranches: any[] = [];
    if (Array.isArray(data)) {
        rawBranches = data;
    } else if (data?.success && Array.isArray(data?.respData)) {
        rawBranches = data.respData;
    } else if (data?.success && Array.isArray(data?.respData?.branches)) {
        rawBranches = data.respData.branches;
    }

    return rawBranches.map((d: any) => ({
      branchCode: d.branchCode || '',
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
    }));
  } catch (err) {
    console.error('[BranchMaster] fetchAllBranchDetails error:', err);
    return [];
  }
}

export async function getDailyCachedBranchMasterData(): Promise<BranchMasterAllData | null> {
  try {
    const details = await fetchAllBranchDetails();
    
    const validDetails = details.filter(d => !!d.state);

    if (validDetails.length === 0) {
      return null;
    }

    const statesSet = new Set<string>();
    const locationsByState: Record<string, Set<string>> = {};
    const branchesByState: Record<string, BranchMasterDetail[]> = {};

    for (const b of validDetails) {
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
      allBranches: validDetails,
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[BranchMaster] Failed to fetch daily cached data:', err);
    return null;
  }
}
