import { NextRequest, NextResponse } from 'next/server';
import { BRANCH_MASTER_BASE_URL } from '@/lib/branchMaster';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ action: string }> }
) {
  try {
    const { action } = await params;
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();

    const targetUrl = `${BRANCH_MASTER_BASE_URL}/Branch/${action}${queryString ? `?${queryString}` : ''}`;

    const authHeader =
      request.headers.get('authorization') ||
      (process.env.BRANCH_MASTER_TOKEN ? `Bearer ${process.env.BRANCH_MASTER_TOKEN}` : '');

    const headers: Record<string, string> = {
      accept: '*/*',
    };

    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    const res = await fetch(targetUrl, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Branch Master API Proxy Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
