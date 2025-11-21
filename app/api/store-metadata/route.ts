import { NextRequest, NextResponse } from 'next/server';
import { filesStore } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filename, mimeType, size, blobId } = body;

    // Validate required fields
    if (!filename || !mimeType || !size || !blobId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if blob ID already exists
    const existing = filesStore.find(f => f.blobId === blobId);

    if (existing) {
      return NextResponse.json(
        { file: existing },
        { status: 200 }
      );
    }

    // Create new file record
    const file = {
      id: Math.random().toString(36).substring(7),
      filename,
      mimeType,
      size,
      blobId,
      uploadedAt: new Date().toISOString(),
    };

    filesStore.push(file);

    return NextResponse.json({ file }, { status: 201 });
  } catch (error) {
    console.error('Error storing metadata:', error);
    return NextResponse.json(
      { error: 'Failed to store metadata' },
      { status: 500 }
    );
  }
}
