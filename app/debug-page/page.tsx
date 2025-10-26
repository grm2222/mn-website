// Create this as app/debug-images/page.tsx (temporary for testing)
'use client';
import React, { useState } from 'react';
import fs from 'fs';

export default function DebugImages() {
  const [imagePath, setImagePath] = useState('/uploads/');
  const [testResults, setTestResults] = useState<any[]>([]);

  const testImagePath = async (path: string) => {
    const results = [];
    
    // Test direct path
    try {
      const response = await fetch(path);
      results.push({
        path,
        status: response.status,
        statusText: response.statusText,
        exists: response.ok
      });
    } catch (error: any) {
      results.push({
        path,
        status: 'Error',
        statusText: error.message,
        exists: false
      });
    }

    // Test with localhost
    const localhostPath = `http://localhost:3000${path}`;
    try {
      const response = await fetch(localhostPath);
      results.push({
        path: localhostPath,
        status: response.status,
        statusText: response.statusText,
        exists: response.ok
      });
    } catch (error: any) {
      results.push({
        path: localhostPath,
        status: 'Error',
        statusText: error.message,
        exists: false
      });
    }

    setTestResults(results);
  };

  const listUploadedFiles = async () => {
    try {
      // This would need to be implemented as an API route
      const response = await fetch('/api/list-uploads');
      const data = await response.json();
      console.log('Uploaded files:', data);
    } catch (error) {
      console.error('Error listing files:', error);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Image Upload Debug Tool</h1>
      
      <div className="space-y-6">
        {/* Path Testing */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test Image Path</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={imagePath}
              onChange={(e) => setImagePath(e.target.value)}
              placeholder="/uploads/your-image.jpg"
              className="flex-1 border rounded px-3 py-2"
            />
            <button
              onClick={() => testImagePath(imagePath)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Test Path
            </button>
          </div>

          {testResults.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Test Results:</h3>
              {testResults.map((result, index) => (
                <div key={index} className={`p-3 rounded ${result.exists ? 'bg-green-100' : 'bg-red-100'}`}>
                  <div className="font-mono text-sm">{result.path}</div>
                  <div className="text-sm">Status: {result.status} - {result.statusText}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image Preview */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Image Preview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Regular img tag:</h3>
              <img 
                src={imagePath} 
                alt="Test" 
                className="max-w-full h-auto border rounded"
                onLoad={() => console.log('Image loaded successfully:', imagePath)}
                onError={(e) => {
                  console.error('Image failed to load:', imagePath);
                  const target = e.target as HTMLImageElement;
                  target.style.border = '2px solid red';
                }}
              />
            </div>
            <div>
              <h3 className="font-semibold mb-2">With error handling:</h3>
              <img 
                src={imagePath} 
                alt="Test with fallback" 
                className="max-w-full h-auto border rounded"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                }}
              />
            </div>
          </div>
        </div>

        {/* Upload Directory Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Upload Directory Info</h2>
          <div className="space-y-2 text-sm font-mono bg-gray-100 p-4 rounded">
            <div>Expected directory: public/uploads/</div>
            <div>Expected URL path: /uploads/filename.jpg</div>
            <div>Current working directory: {process.cwd ? process.cwd() : 'Unknown'}</div>
          </div>
          <button
            onClick={listUploadedFiles}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            List Uploaded Files (check console)
          </button>
        </div>

        {/* Quick Fixes */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Fixes to Try</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">1.</span>
              <span>Check if files exist in <code className="bg-gray-100 px-1 rounded">public/uploads/</code></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">2.</span>
              <span>Restart your Next.js dev server</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">3.</span>
              <span>Check browser network tab for 404 errors</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">4.</span>
              <span>Verify the API returns correct paths starting with <code className="bg-gray-100 px-1 rounded">/uploads/</code></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}