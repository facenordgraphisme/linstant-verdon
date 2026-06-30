import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['fr', 'en'];
const defaultLocale = 'fr';

const BANNED_USER_AGENTS = [
  'ahrefsbot',
  'semrushbot',
  'dotbot',
  'rogerbot',
  'lipperhey',
  'sogou',
  'exabot',
  'loadtimebot',
  'petalbot',
  'bytespider',
  'gptbot',
  'chatgpt-user',
  'cohere-ai',
  'anthropic-ai',
  'claude-web',
  'google-extended',
  'mj12bot',
  'yandexbot',
  'baiduspider',
  'screaming frog',
  'amazonbot',
  'ccbot',
  'diffbot'
];

export function proxy(request: NextRequest) {
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();

  // 1. Bloquer les User-Agents indésirables
  const isBanned = BANNED_USER_AGENTS.some((bot) => userAgent.includes(bot));
  if (isBanned) {
    return new NextResponse('Access Denied (Bad Bot)', {
      status: 403,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/studio')) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url, { status: 308 });
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon\\.ico|assets|sitemap\\.xml|robots\\.txt|llms\\.txt|.*\\..*).*)',
  ],
};
