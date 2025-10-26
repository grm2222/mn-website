// components/ImageUpload.tsx
import React, { useState, ChangeEvent, DragEvent } from 'react';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  accept?: string;
  label?: string;
  value?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onUpload, 
  accept = "image/*", 
  label = "Upload Image", 
  value 
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }
    
    console.log('Starting file upload:', file.name, file.type, file.size);
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      console.log('Sending request to /api/uploads');
      const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok) {
        console.log('Upload successful, URL:', data.url);
        onUpload(data.url);
      } else {
        console.error('Upload failed:', data.error);
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };
  
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };
  
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      {value && (
        <div className="mb-4">
          <img 
            src={value} 
            alt="Current image" 
            className="h-20 w-auto border rounded object-cover" 
          />
          <button 
            onClick={() => onUpload('')}
            className="text-red-600 text-xs mt-1 hover:underline block"
            type="button"
          >
            Remove
          </button>
        </div>
      )}
      
      <div 
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {uploading ? (
          <div className="text-blue-600">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <div className="text-sm">Uploading...</div>
          </div>
        ) : (
          <>
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
            <p className="text-sm text-gray-600 mt-2">
              Drag and drop an image here, or click to upload
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, GIF up to 10MB
            </p>
          </>
        )}
        
        <input
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
      </div>
    </div>
  );
};

export default ImageUpload;