'use client';

import { useState } from 'react';
import { FileUploader } from '@/components/FileUploader';
import { FileList } from '@/components/FileList';
import { Database } from 'lucide-react';

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadComplete = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Walrus Storage</h1>
              <p className="text-sm text-gray-600">Decentralized File Storage</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        <section className="text-center py-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Upload Files to Walrus
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Simple file upload and download using Walrus decentralized storage network
          </p>
        </section>

        <section>
          <FileUploader onUploadComplete={handleUploadComplete} />
        </section>

        <section>
          <FileList refreshTrigger={refreshTrigger} />
        </section>
      </main>
    </div>
  );
}
