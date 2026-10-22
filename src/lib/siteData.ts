import 'server-only';
import { getDailyCachedBranchMasterData } from './branchMaster';
import { attachCoordinates, type BranchWithCoordinates } from './branchCoordinates';
import { fetchAllGoldRates, type AllGoldRatesResponse } from './goldQuoteService';
import { SHOW_GOLD_RATE_CARD } from './featureFlags';

// Data the root layout fetches on the server and hands to client components with the page,
// so the browser never calls an API for it.

// Only the fields the UI shows; internal ones (GST number, active flag) stay on the server
export type SiteBranch = Omit<BranchWithCoordinates, 'gstNo' | 'isActive'>;

export async function getSiteBranches(): Promise<SiteBranch[]> {
  const data = await getDailyCachedBranchMasterData();
  if (!data) return [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return attachCoordinates(data.allBranches).branches.map(({ gstNo, isActive, ...branch }) => branch);
}

export async function getSiteGoldRates(): Promise<AllGoldRatesResponse | null> {
  if (process.env.GOLD_QUOTE_ENABLED !== 'true' || !SHOW_GOLD_RATE_CARD) return null;
  return fetchAllGoldRates();
}
