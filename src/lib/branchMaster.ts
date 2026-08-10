import { resolveAuthToken } from './authService';

const COMMON_BASE_URL =
  process.env.BRANCH_MASTER_BASE_URL ||
  process.env.NEXT_PUBLIC_BRANCH_MASTER_BASE_URL ||
  'https://mgpcommonext-mgpuat.muthootexim.com';

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

export interface BranchMasterAllData {
  states: string[];
  locationsByState: Record<string, string[]>;
  branchesByState: Record<string, BranchMasterDetail[]>;
  allBranches: BranchMasterDetail[];
}

export async function fetchAllBranchSummaries(): Promise<Array<{ branchCode: string; branchName: string }>> {
  const token = await resolveAuthToken();
  const url = `${COMMON_BASE_URL}/Branch/FetchAll`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error(`FetchAll failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  if (data?.success && Array.isArray(data?.respData?.branches)) {
    return data.respData.branches;
  }
  return [];
}

export async function fetchBranchDetail(branchCode: string): Promise<BranchMasterDetail | null> {
  const token = await resolveAuthToken();
  const url = `${COMMON_BASE_URL}/Branch/Fetch`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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
}

export async function getDailyCachedBranchMasterData(): Promise<BranchMasterAllData> {
  try {
    const summaries = await fetchAllBranchSummaries();

    const detailPromises = summaries.map((s) =>
      fetchBranchDetail(s.branchCode).catch(() => null)
    );

    const details = (await Promise.all(detailPromises)).filter(
      (d): d is BranchMasterDetail => d !== null && !!d.state
    );

    const statesSet = new Set<string>();
    const locationsByState: Record<string, Set<string>> = {};
    const branchesByState: Record<string, BranchMasterDetail[]> = {};

    for (const b of details) {
      if (!b.state) continue;
      statesSet.add(b.state);

      if (!locationsByState[b.state]) {
        locationsByState[b.state] = new Set<string>();
      }
      if (b.location) {
        locationsByState[b.state].add(b.location);
      }

      if (!branchesByState[b.state]) {
        branchesByState[b.state] = [];
      }
      branchesByState[b.state].push(b);
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
    };
  } catch (err) {
    console.error('[BranchMaster] Failed to fetch daily cached data:', err);
    return {
      states: [],
      locationsByState: {},
      branchesByState: {},
      allBranches: [],
    };
  }
}
