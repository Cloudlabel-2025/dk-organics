import { NextResponse } from 'next/server';

export function middleware(request) {
  // Only protect the dashboard route and its sub-paths
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('auth-token');

    if (!token) {
      // If there's no token, redirect to login page
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // The token exists. In a full Edge-compatible environment, you would 
    // verify the JWT here using 'jose' because 'jsonwebtoken' is Node-only.
    // For now, the existence of the secure HttpOnly cookie is our first line of defense.
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
