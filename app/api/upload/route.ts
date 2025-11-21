import { NextRequest, NextResponse } from 'next/server';
import { uploadToWalrus } from '@/lib/walrus';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Upload to Walrus
    const blobId = await uploadToWalrus(file);

    return NextResponse.json({
      blobId,
      size: file.size,
    });
  } catch (error) {
    console.error('Error uploading to Walrus:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload file' },
      { status: 500 }
    );
  }
}
