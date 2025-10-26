// app/api/uploads/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  console.log('Upload API called');
  
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    console.log('File received:', file ? file.name : 'No file');

    if (!file) {
      console.log('No file in formData');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.log('Invalid file type:', file.type);
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      console.log('File too large:', file.size);
      return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 });
    }

    // Ensure uploads directory exists in public
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    console.log('Uploads directory:', uploadsDir);
    
    if (!fs.existsSync(uploadsDir)) {
      console.log('Creating uploads directory');
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name || 'file';
    const ext = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, ext);
    const newFilename = `${nameWithoutExt}-${timestamp}${ext}`;

    console.log('Generated filename:', newFilename);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const filePath = path.join(uploadsDir, newFilename);
    console.log('Writing file to:', filePath);
    
    fs.writeFileSync(filePath, buffer);

    // Verify file was written
    if (fs.existsSync(filePath)) {
      console.log('File written successfully');
      
      // Use the direct uploads path that's working
      const publicUrl = `/uploads/${newFilename}`;
      console.log('File will be accessible at:', publicUrl);
      
      return NextResponse.json({ 
        url: publicUrl,
        filename: newFilename,
        originalName: originalName,
        size: file.size,
        fullPath: filePath
      });
    } else {
      console.log('File write failed');
      return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
    }

  } catch (error) {
    console.error('Upload error details:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      return NextResponse.json({ images: [] });
    }

    const files = fs.readdirSync(uploadsDir);
    
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => {
        const stats = fs.statSync(path.join(uploadsDir, file));
        return {
          filename: file,
          url: `/uploads/${file}`,
          timestamp: stats.mtimeMs
        };
      })
      .sort((a, b) => b.timestamp - a.timestamp);

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error listing images:', error);
    return NextResponse.json({ images: [] });
  }
}