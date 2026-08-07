import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['fr', 'en'];
const defaultLocale = 'fr';

const BANNED_USER_AGENTS = [
  // Generic SEO/rank-tracking scrapers — no AI-search value, safe to keep blocked
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
  'mj12bot',
  'yandexbot',
  'baiduspider',
  'screaming frog',
  'diffbot',
  // Training-only AI crawlers — opting out of training use doesn't hurt live citation
  'cohere-ai',
  'anthropic-ai',
  'google-extended',
  // NOTE: gptbot, chatgpt-user, claude-web, amazonbot, ccbot were removed here.
  // They were blocking OpenAI/Anthropic/Amazon live citation and browsing agents
  // outright (HTTP 403) — including chatgpt-user and claude-web, the agents that
  // fire when a user pastes this URL directly into ChatGPT or Claude.
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

  if (pathnameHasLocale) {
    // Forward the pathname so server components (e.g. not-found.tsx, which
    // receives no props) can still tell which locale they're rendering for.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url, { status: 308 });
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon\\.ico|assets|sitemap\\.xml|robots\\.txt|llms\\.txt|.*\\..*).*)',
  ],
};
