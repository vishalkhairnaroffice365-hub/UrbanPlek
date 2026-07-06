import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env';
import axios from 'axios';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  folder: string,
  resourceType: 'image' | 'raw' = 'image',
  filename?: string
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        public_id: filename,
      },
      (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          reject(error);
        } else {
          resolve(result?.secure_url || null);
        }
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export const fetchJsonData = async (url: string): Promise<any> => {
  try {
    const response = await axios.get(url, { timeout: 7000 });
    return response.data;
  } catch (error) {
    console.error(`Error fetching JSON from ${url}:`, error);
    return {};
  }
};
