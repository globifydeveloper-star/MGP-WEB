import { NextResponse } from 'next/server';
import { getDailyCachedBranchMasterData } from '@/lib/branchMaster';

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  try {
    const data = await getDailyCachedBranchMasterData();

    if (!data) {
      console.warn('/api/branch/all: Live fetch returned null, using fallback response.');
      return NextResponse.json(
        { success: false, message: 'Failed to fetch live Branch Master data' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: true, ...data },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
        },
      }
    );
  } catch (err) {
    console.error('API /api/branch/all error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 200 }
    );
  }
}
