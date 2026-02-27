import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    // Check for missing Cloudinary configuration
    const missingConfig = [];
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) missingConfig.push('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
    if (!process.env.CLOUDINARY_API_KEY) missingConfig.push('CLOUDINARY_API_KEY');
    if (!process.env.CLOUDINARY_API_SECRET) missingConfig.push('CLOUDINARY_API_SECRET');

    if (missingConfig.length > 0) {
      console.error("Missing Cloudinary Config:", missingConfig);
      return NextResponse.json({
        success: false,
        error: "Server configuration error",
        message: `Cloudinary variables missing: ${missingConfig.join(', ')}`
      }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    console.log(`Upload API: Received file "${file.name}" of type "${file.type}" (size: ${file.size} bytes)`);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      console.log("Sending file to Cloudinary...");
      const uploadOptions = {
        folder: 'dkorganics',
        resource_type: 'auto',
      };

      if (process.env.CLOUDINARY_UPLOAD_PRESET) {
        uploadOptions.upload_preset = process.env.CLOUDINARY_UPLOAD_PRESET;
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            console.log("Cloudinary upload success");
            resolve(result);
          }
        }
      );

      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
    });
  } catch (err) {
    console.error('Upload API error:', err);
    return NextResponse.json({
      success: false,
      error: 'Upload failed',
      message: err.message
    }, { status: 500 });
  }
}
