import { clerkMiddleware, requireAuth } from '@clerk/express';

// Export Clerk middleware to attach user to request
export const clerkAuth = clerkMiddleware();

// Export requireAuth to protect routes
export const protectRoute = requireAuth();
