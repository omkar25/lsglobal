import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { getSessionCookieFromRequest } from '@/lib/cookies';

const intlMiddleware = createMiddleware(routing);

// Routes that don't require authentication
const PUBLIC_ADMIN_ROUTES = ['/admin/login', '/en/admin/login', '/hi/admin/login'];

// Admin route patterns
const ADMIN_PATTERNS = ['/admin', '/en/admin', '/hi/admin'];

// Protected API routes
const PROTECTED_API_ROUTES = [
  '/api/admin/products',
  '/api/admin/categories',
  '/api/admin/brands',
  '/api/admin/reviews',
  '/api/upload',
];

/**
 * Check if path matches admin routes
 */
function isAdminRoute(pathname: string): boolean {
  return ADMIN_PATTERNS.some(
    (pattern) => pathname === pattern || pathname.startsWith(`${pattern}/`)
  );
}

/**
 * Check if path is a public admin route (login)
 */
function isPublicAdminRoute(pathname: string): boolean {
  return PUBLIC_ADMIN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route)
  );
}

/**
 * Check if path is a protected API route
 */
function isProtectedApiRoute(pathname: string): boolean {
  return PROTECTED_API_ROUTES.some((route) => pathname.startsWith(route));
}

/**
 * Add security headers for admin pages
 */
function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  return response;
}

/**
 * Get login URL with locale
 */
function getLoginUrl(request: NextRequest): URL {
  const pathname = request.nextUrl.pathname;
  
  // Extract locale from pathname
  const localeMatch = pathname.match(/^\/(en|hi)\//);
  const locale = localeMatch ? localeMatch[1] : 'en';
  
  return new URL(`/${locale}/admin/login`, request.url);
}

/**
 * Get admin dashboard URL with locale
 */
function getAdminUrl(request: NextRequest): URL {
  const pathname = request.nextUrl.pathname;
  
  // Extract locale from pathname
  const localeMatch = pathname.match(/^\/(en|hi)\//);
  const locale = localeMatch ? localeMatch[1] : 'en';
  
  return new URL(`/${locale}/admin`, request.url);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle admin authentication
  const adminRoute = isAdminRoute(pathname);
  const publicAdminRoute = isPublicAdminRoute(pathname);
  const protectedApiRoute = isProtectedApiRoute(pathname);

  // Handle protected API routes
  if (protectedApiRoute) {
    const sessionCookie = getSessionCookieFromRequest(request);
    
    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    return NextResponse.next();
  }

  // Handle admin routes
  if (adminRoute) {
    const sessionCookie = getSessionCookieFromRequest(request);

    // Public admin routes (login page)
    if (publicAdminRoute) {
      // Allow access to login page (don't redirect even if cookie exists)
      // The page itself will handle redirect if session is valid
      const response = intlMiddleware(request);
      return response;
    }

    // Protected admin routes
    if (!sessionCookie) {
      // No session - redirect to login
      return NextResponse.redirect(getLoginUrl(request));
    }

    // Session exists - allow access with security headers
    const response = intlMiddleware(request);
    return addSecurityHeaders(response);
  }

  // Non-admin routes - use intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(hi|en)/:path*',
    '/((?!_next|api/(?!admin)|favicon.ico|logo|images).*)',
    '/api/admin/:path*',
    '/api/upload/:path*',
  ],
};
