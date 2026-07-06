import { Router } from 'express';
import multer from 'multer';
import { createListing, getListingById, getAllListings } from '../controllers/listings.controller';
import { protectRoute } from '../middleware/auth.middleware';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Public route to view a single listing
router.get('/:listing_id', getListingById);

// Public route to get all listings with pagination and filters
router.get('/', getAllListings);

// Protected route to create a listing (requires Clerk auth)
// Expects multipart/form-data with 'images' array and 'data' JSON string
router.post('/', protectRoute, upload.array('images', 10), createListing);

export default router;
