import { Router } from 'express';
import { searchListings } from '../controllers/search.controller';

const router = Router();

// Public route for searching nearby listings
router.get('/', searchListings);

export default router;
