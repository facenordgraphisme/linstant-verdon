import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['fr', 'en'];
const defaultLocale = 'fr';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass i18n rewrites for Sanity Studio
  if (pathname.startsWith('/studio')) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // If no locale is present, default to 'fr' but don't redirect for the root path
  // We want '/' to serve 'fr' content without changing the URL.
  // We rewrite to /[locale]/pathname
  const locale = defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, static, etc.)
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
};
