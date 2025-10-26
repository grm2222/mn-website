// app/edit/page.tsx
'use client';
import { Puck } from "@measured/puck";
import { config } from "../../puck.config";
import { useState, useEffect } from "react";

// Import Puck CSS
import "@measured/puck/puck.css";

const initialData = {
  content: [],
  root: { props: { title: "My Website" } }
};

export default function Editor() {
  const [data, setData] = useState(initialData);
  const [isClient, setIsClient] = useState(false);

  // Ensure this only runs on client-side
  useEffect(() => {
    setIsClient(true);
    
    // Load saved data from localStorage (optional)
    try {
      const saved = localStorage.getItem('puck-data');
      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }, []);

  const handlePublish = (publishedData: any) => {
    console.log('Publishing data:', publishedData);
    
    // Save to localStorage
    try {
      localStorage.setItem('puck-data', JSON.stringify(publishedData));
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data');
    }
  };

  // Don't render Puck until we're on the client side
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Website Editor</h1>
          <div className="text-sm text-gray-500">
            Puck Visual Editor
          </div>
        </div>
      </div>

      {/* Puck Editor */}
      <div style={{ height: "calc(100vh - 70px)" }}>
        <Puck
          config={config}
          data={data}
          onPublish={handlePublish}
          onChange={(newData) => {
            setData(newData);
          }}
        />
      </div>
    </div>
  );
}