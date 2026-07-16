import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('scoutx_admin_token');

    return NextResponse.json({
      success: true,
      message: 'Logout successful'
    }, { status: 200 });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
