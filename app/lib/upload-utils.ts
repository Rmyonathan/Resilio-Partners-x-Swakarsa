import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function saveUploadedFile(file: File, folder: string = 'blog'): Promise<string> {
  // Check if Cloudinary is configured
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.');
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Convert buffer to base64 data URI for Cloudinary
  const base64 = buffer.toString('base64');
  const dataURI = `data:${file.type};base64,${base64}`;

  // Generate unique public_id
  const timestamp = Date.now();
  const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const publicId = `${folder}/${timestamp}-${originalName.replace(/\.[^/.]+$/, '')}`;

  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      public_id: publicId,
      folder: folder,
      resource_type: 'image',
      overwrite: false,
    });

    // Return the secure URL
    return result.secure_url;
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Failed to upload image to Cloudinary: ${error.message}`);
  }
}

