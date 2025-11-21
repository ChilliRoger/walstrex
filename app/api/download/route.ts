import { NextRequest, NextResponse } from 'next/server';
import { downloadFromWalrus } from '@/lib/walrus';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const blobId = searchParams.get('blobId');

    if (!blobId) {
      return NextResponse.json(
        { error: 'Blob ID is required' },
        { status: 400 }
      );
    }

    const blob = await downloadFromWalrus(blobId);

    // Get content type from blob or default to octet-stream
    const contentType = blob.type || 'application/octet-stream';

    // Stream the blob back to client
    const arrayBuffer = await blob.arrayBuffer();
    
    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${blobId}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error downloading from Walrus:', error);
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    );
  }
}
