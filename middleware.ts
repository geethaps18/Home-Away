// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define routes
const isPublicRoute = createRouteMatcher(['/', '/properties(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware((auth, req) => {
  const userId = auth().userId;
  const adminId = process.env.ADMIN_USER_ID;

  // Protect all routes except public
  if (!isPublicRoute(req)) {
    auth().protect();
  }

  // Admin route protection
  if (isAdminRoute(req) && userId !== adminId) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
