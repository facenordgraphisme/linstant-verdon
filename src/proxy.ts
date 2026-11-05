import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In Next 16 the proxy runs on the Node.js runtime, so on Vercel every request
// it matches is a billed Function invocation (Fluid Active CPU). It used to
// match every page request just to sniff user-agents; it now only runs for the
// rare URLs that lack a locale prefix, and redirects them to /fr/...
// '/' → '/fr' and legacy URLs are handled by next.config.ts redirects (no
// Function involved). Scraper blocking lives in robots.ts; for hard blocking
// use a Vercel Firewall custom rule, which runs before any Function.
const defaultLocale = 'fr';

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${url.pathname}`;
  return NextResponse.redirect(url, { status: 308 });
}

export const config = {
  matcher: [
    // Everything except: locale-prefixed paths, the Studio, Next internals,
    // API routes and files with an extension.
    '/((?!fr(?:/|$)|en(?:/|$)|studio|_next|api|.*\\..*).+)',
  ],
};
