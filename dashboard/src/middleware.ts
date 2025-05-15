import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // If the path is the root path, redirect to the login page
  if (path === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Otherwise, continue with the request
  return NextResponse.next();
}

// See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/'],
};
