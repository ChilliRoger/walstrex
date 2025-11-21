# Walrus Storage Demo

A simple Next.js application for uploading and downloading files using the Walrus decentralized storage network.

## Overview

This application demonstrates file storage on Walrus Testnet using the HTTP API. Files are uploaded to the Walrus publisher, stored across the decentralized network, and can be retrieved using their unique blob ID.

## Features

- Upload any file type to Walrus Testnet
- Download files using their blob ID
- View all uploaded files with metadata
- Image thumbnail preview
- In-memory metadata storage (resets on server restart)
- No wallet or authentication required

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ChilliRoger/walstrex.git
cd walstrex
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## How It Works

### Upload Process

1. User selects a file through the web interface
2. File is sent to `/api/upload` endpoint
3. Server uploads file to Walrus publisher at `https://publisher.walrus-testnet.walrus.space/v1/blobs`
4. Walrus returns a unique blob ID (cryptographic hash)
5. Metadata is stored in memory with the blob ID reference
6. File content is distributed across Walrus storage nodes

### Download Process

1. User clicks download on a file
2. Request is sent to `/api/download?blobId={id}`
3. Server fetches file from Walrus aggregator at `https://aggregator.walrus-testnet.walrus.space/v1/blobs/{blobId}`
4. File is streamed back to the user's browser

## Architecture

### File Storage

- **File Content**: Stored on Walrus decentralized network (5 epochs on testnet)
- **Metadata**: Stored in-memory on the Next.js server (filename, size, type, blob ID, timestamp)
- **Note**: Metadata is cleared when the server restarts, but files remain on Walrus

### Technology Stack

- Next.js 16.0.3 with App Router
- TypeScript for type safety
- Tailwind CSS 4 for styling
- React 19 for UI components
- Walrus HTTP API for storage

## Project Structure

```
walstrex/
├── app/
│   ├── api/
│   │   ├── upload/route.ts          # Handles file uploads to Walrus
│   │   ├── download/route.ts        # Proxies downloads from Walrus
│   │   ├── files/route.ts           # Lists all file metadata
│   │   └── store-metadata/route.ts  # Saves file metadata
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Home page
│   └── globals.css                  # Global styles
├── components/
│   ├── FileUploader.tsx             # File upload component
│   └── FileList.tsx                 # File list display component
├── lib/
│   ├── walrus.ts                    # Walrus HTTP API integration
│   └── storage.ts                   # In-memory metadata storage
└── package.json
```

## API Endpoints

### POST /api/upload
Uploads a file to Walrus.

**Request**: FormData with 'file' field
**Response**: `{ blobId: string, size: number }`

### GET /api/download?blobId={id}
Downloads a file from Walrus.

**Response**: File binary data with appropriate headers

### GET /api/files
Returns list of all uploaded files.

**Response**: `{ files: FileRecord[] }`

### POST /api/store-metadata
Stores file metadata.

**Request**: `{ filename, mimeType, size, blobId }`
**Response**: `{ id: string }`

## Walrus Integration

The application uses the Walrus HTTP API directly without the SDK:

### Upload Endpoint
```
PUT https://publisher.walrus-testnet.walrus.space/v1/blobs
```

### Download Endpoint
```
GET https://aggregator.walrus-testnet.walrus.space/v1/blobs/{blobId}
```

### Storage Duration
Files are stored for 5 epochs on Walrus Testnet (approximately 5 days).

## Verification

To verify files are actually stored on Walrus:

1. Upload a file and copy the blob ID
2. Access the file directly via Walrus:
```
https://aggregator.walrus-testnet.walrus.space/v1/blobs/{YOUR_BLOB_ID}
```
3. Restart the server - metadata is lost but files remain on Walrus
4. Files can still be downloaded using the blob ID

## Development

### Running Tests
```bash
npm run lint
```

### Building for Production
```bash
npm run build
npm start
```

## Limitations

- Metadata is stored in-memory and lost on server restart
- No authentication or access control
- Files are public and accessible to anyone with the blob ID
- Testnet storage is temporary (5 epochs)

## Future Enhancements

- Persistent metadata storage (database or Walrus)
- User authentication with Sui wallet
- File encryption before upload
- Upload progress tracking
- File deletion capability
- Mainnet support

## Resources

- [Walrus Documentation](https://docs.walrus.site)
- [Walrus HTTP API Reference](https://docs.walrus.site/usage/web-api.html)
- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Repository](https://github.com/ChilliRoger/walstrex)

## License

MIT
