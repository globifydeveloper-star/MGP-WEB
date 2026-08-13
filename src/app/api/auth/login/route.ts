import { NextRequest, NextResponse } from 'next/server';
import { loginChannelLead } from '@/lib/authService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const token = await loginChannelLead(body.username, body.password);

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication failed. Invalid credentials or missing parameters.' },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, token }, { status: 200 });
  } catch (error) {
    console.error('API /api/auth/login Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
