import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define the routes you want to restrict to logged-in users only.
// The (.*) matches the route and any sub-routes (e.g., /dashboard, /dashboard/settings)
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/list-your-property/student-spaces',
  '/list-your-property/residential-property',
  '/list-your-property/commercial-spaces',
  '/list-your-property/land-plots',
  // Add your restricted routes here
]);

const isPublicAuthRoute = createRouteMatcher([
  '/auth/login(.*)',
  '/auth/signup(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (auth.userId && isPublicAuthRoute(req)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isProtectedRoute(req)) {
    await auth.protect(); // This will automatically redirect unauthenticated users to the sign-in page
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};