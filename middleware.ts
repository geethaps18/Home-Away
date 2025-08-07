// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/', '/properties(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware((auth, req) => {
  const userId = auth().userId;
  const adminId = process.env.ADMIN_USER_ID;

  // Protect non-public routes
  if (!isPublicRoute(req)) {
    auth().protect();
  }

  // Redirect non-admin users away from admin route
  if (isAdminRoute(req) && userId !== adminId) {
    return NextResponse.redirect(new URL('/', req.url));
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
