import { env } from './src/config/env';
console.log('CLOUD_NAME:', JSON.stringify(env.CLOUDINARY_CLOUD_NAME));
console.log('API_KEY:', JSON.stringify(env.CLOUDINARY_API_KEY));
console.log('API_SECRET:', JSON.stringify(env.CLOUDINARY_API_SECRET));
