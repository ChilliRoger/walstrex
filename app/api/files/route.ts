import { NextResponse } from 'next/server';
import { filesStore } from '@/lib/storage';

export async function GET() {
  try {
    return NextResponse.json({ files: filesStore });
  } catch (error) {
    console.error('Error fetching files:', error);
    return NextResponse.json(
      { error: 'Failed to fetch files' },
      { status: 500 }
    );
  }
}
