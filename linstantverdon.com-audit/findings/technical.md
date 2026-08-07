# Technical SEO Findings — linstantverdon.com

## Score: 60/100

Scope tested: all 30 `<url>` entries in `sitemap.xml` (FR) + their 30 `/en` hreflang counterparts = 60 unique URLs, fetched directly (raw HTML, status codes, headers). Source code reviewed directly (`src/app/robots.ts`, `src/app/sitemap.ts`, `next.config.ts`, all `generateMetadata` implementations, locale layout). Verified against this repo's actual Next.js version (**16.2.6** — confirmed via `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/{robots,sitemap}.md`) rather than assuming Next 14 conventions.

### What Works

- **All 60 tested URLs return clean single-hop 200s** — no broken links, no redirect chains/loops found among sitemap FR pages or their EN counterparts.
- **Canonical tags are implemented correctly and consistently** via `generateMetadata` in every page type (`page.tsx` for home, category, activity detail, blog list/detail, contact, faq, a-propos) — each is locale-aware and self-referencing.
- **hreflang is fully reciprocal at the page level**, including `x-default`, on *both* `/fr` and `/en` pages — e.g. `/en/climbing` correctly emits `hreflang="fr" → /fr/escalade`, `hreflang="en" → /en/climbing` (self-ref), and `x-default → /fr/escalade`. This resolves a large part of the sitemap concern in scope (see High #1 below) — the on-page annotations are not broken, only the sitemap's declaration is incomplete.
- Viewport meta (`width=device-width, initial-scale=1`) present and correct on every page tested — no mobile-viewport issues found.
- `html lang` attribute correctly reflects `fr`/`en` per route.
- JSON-LD structured data present (2 blocks/page, incl. `LocalBusinessSchema` in root layout).
- HSTS present site-wide (`max-age=63072000`).
- www/non-www and `/` → `/fr` redirects are clean single 308 hops, no chains.
- `/studio/…` (with trailing slash, i.e. the actual Sanity Studio app routes) remains correctly blocked by `Disallow: /studio/`.

### Critical

**1. Soft 404s site-wide — invalid URLs return HTTP 200, not 404, on every dynamic route**
- Evidence: `curl -o /dev/null -w "%{http_code}"` on `https://www.linstantverdon.com/fr/canyoning/nonexistent-slug-xyz` → `200`, body contains only the literal text "Activity not found" with no `noindex` meta and no canonical tag. `https://www.linstantverdon.com/fr/totally-bogus-category-xyz` also → `200` (66KB page, full nav/footer/layout, generic fallback title "L'instant Verdon | Canyoning, Aquarando & Escalade dans le Verdon", no canonical). `grep -rl "notFound()" src/app` returns **zero matches** anywhere in the codebase — there is no `not-found.tsx` and no route ever calls Next's `notFound()`.
- Root cause: `src/app/[locale]/[category]/[slug]/page.tsx` does `if (!activity) return <div>...Activity not found</div>` (returns 200 JSX, not a 404), and `[locale]/[category]/page.tsx` has equivalent silent-fallback behavior for unmatched categories. Because `[category]` and `[category]/[slug]` are effectively catch-alls, **any typo'd or old/removed URL resolves to a 200**.
- Why it matters now: this site relaunched 2026-06-17 specifically to recover organic visibility after deindexing. Soft 404s (a) waste crawl budget on a fresh site Google is still re-evaluating, (b) risk Search Console flagging pages as "Indexed, though blocked" or worse "Crawled — thin content," (c) make it impossible to identify genuinely broken inbound/internal links since nothing ever errors.
- Recommendation: In `[locale]/[category]/[slug]/page.tsx` and `[locale]/[category]/page.tsx`, call Next's `notFound()` (import from `next/navigation`) when `!activity` / unmapped category, and add a `src/app/[locale]/not-found.tsx` (or root `src/app/not-found.tsx`) that renders a real 404 page — Next.js will then emit an actual `404` status. Fix belongs in the route `page.tsx` files, not `robots.ts`/`sitemap.ts`.

**2. robots.txt `Disallow: /studio/` does not block the actual Studio entry point — the block is effectively bypassed**
- Evidence: `curl -o /dev/null -w "%{http_code}" https://www.linstantverdon.com/studio` (no trailing slash) → `200`, and the response body is the real Sanity Studio SPA shell (Next.js chunks, Studio-specific script bundle), not a redirect stub. Separately, `curl -D - https://www.linstantverdon.com/studio/` (with trailing slash — the path that *is* covered by `Disallow: /studio/`) → `308 Location: /studio`, i.e. the one path robots.txt blocks immediately 308-redirects to the one path it does *not* block.
- Per the Robots Exclusion Standard, `Disallow: /studio/` only matches paths that literally start with the string `/studio/`; it does not match `/studio` (no trailing slash), which is a distinct path. Combined with the `/studio/` → `/studio` redirect, any crawler that respects robots.txt but follows the redirect chain lands on an allowed, indexable URL serving the live CMS admin interface.
- Recommendation: change `disallow: '/studio/'` to `disallow: '/studio'` in `src/app/robots.ts` (prefix match without trailing slash blocks both `/studio` and everything under `/studio/*`). This is a one-line fix in `robots.ts`, not a static file (confirmed via Next 16 docs that `app/robots.ts` is the canonical convention here, no `public/robots.txt` override present).

### High

**1. `sitemap.xml` has no `<url>` entries for `/en/...` pages — EN pages are not directly declared to crawlers**
- Evidence: all 30 `<url>` entries in `sitemap.ts`'s output are `/fr/...` locations; `/en/...` URLs appear only inside `xhtml:link rel="alternate" hreflang="en"` annotations nested under the FR entries. Google's sitemap-hreflang guidance is that each language version should typically have its own `<url>` entry (itself as `<loc>`, with full reciprocal alternate annotations including a self-reference) — this sitemap has one-directional annotations only, not paired entries.
- Mitigating factor confirmed live: `/en/...` pages themselves return 200 and carry correct, fully reciprocal on-page hreflang (see What Works), so this is not a duplicate-content risk — it's a **discovery/coverage** risk. EN pages depend entirely on Google finding them via hreflang hints or internal `<Link>` crawling rather than direct sitemap submission with their own `lastmod`/`priority`/`changefreq` signals.
- Given the explicit goal of recovering visibility post-relaunch (and that the site is bilingual with real EN commercial intent), under-declaring half the site's URLs in the sitemap is a real defect worth fixing quickly.
- Recommendation: in `src/app/sitemap.ts`, emit a second `<url>` entry per static path and per Sanity-sourced activity/post for the `/en/...` URL, each with its own `alternates.languages` block (mirrring the pattern already used for the FR entry, just with roles swapped and the EN URL as `url`). This is a `sitemap.ts` change.

**2. No security headers beyond HSTS — no CSP, X-Content-Type-Options, X-Frame-Options, or Referrer-Policy on any page**
- Evidence: response headers on all 60 URLs tested contain only `Strict-Transport-Security`; `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy` are absent everywhere. `next.config.ts` has no `headers()` function and there is no `vercel.json` in the repo root defining custom headers.
- Recommendation: add a `headers()` function to `next.config.ts` (Next 16 App Router convention) or a `vercel.json` `headers` array to set at minimum `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN` (or `frame-ancestors` via CSP), and a baseline `Content-Security-Policy`. This is a `next.config.ts` change, applies platform-wide via Vercel.

### Medium

**1. Sitemap `<loc>` values use raw, unescaped UTF-8 (accented) characters while the corresponding page's `<link rel="canonical">` uses percent-encoding — inconsistent URL representation for the same resource**
- Evidence: `sitemap.xml` declares `<loc>https://www.linstantverdon.com/fr/escalade/escalade-demi-journée-découverte</loc>` (raw accented chars), while the live page's rendered canonical tag is `https://www.linstantverdon.com/fr/escalade/escalade-demi-journ%C3%A9e-d%C3%A9couverte` (percent-encoded). Both resolve to the same 200 page (confirmed), so this is not currently causing duplicate indexing, but the sitemaps.org protocol specifies sitemap URLs "must be URL-escaped... based on RFC 3986," and having the sitemap and the canonical disagree on the URL's canonical string form is a spec-compliance / hygiene issue that could confuse stricter XML/sitemap validators or downstream tools.
- Recommendation: in `src/app/sitemap.ts`, percent-encode the dynamic `slug` segment (e.g. `encodeURI` or per-segment `encodeURIComponent`) when building `url` and `alternates.languages` values, to match what `generateMetadata`'s canonical/hreflang output already does.

**2. `X-Powered-By: Next.js` header exposed on every response**
- Evidence: present in headers of all 60 tested URLs. Minor information-disclosure best-practice issue (reveals framework/version fingerprinting surface), not itself an indexability problem.
- Recommendation: set `poweredByHeader: false` in `next.config.ts`.

### Low

**1. AI-crawler blocking scoping (GPTBot/CCBot/amazonbot/etc.) is syntactically valid but should be a deliberate business decision**
- Evidence: `robots.ts` groups `['AhrefsBot', 'SemrushBot', 'DotBot', 'PetalBot', 'ByteSpider', 'GPTBot', 'amazonbot', 'CCBot']` under one rule with `disallow: '/'`. Per the Robots Exclusion Standard, a single rule block with multiple `User-agent` lines followed by shared directives applies those directives to *each* listed agent independently — Next's `robots()` output (verified against `robots.md` in the local Next 16 docs) renders this as one `User-agent:` line per agent followed by the shared `Disallow: /`, which each crawler parses correctly. **The syntax/grouping itself works as intended** — this is a scoping-correctness pass, not a defect. Whether blocking GPTBot/CCBot/amazonbot site-wide is *desirable* is a content-strategy call (AI-citability angle), flagged for the GEO-focused review — but confirm this is intentional, since it was hard-coded identically alongside legitimate SEO-tool-crawler blocks (Ahrefs/Semrush/etc.), suggesting it may have been copy-pasted without a separate decision for AI crawlers specifically.

### Core Web Vitals — Limitation

No PageSpeed Insights API key is configured, and `unlighthouse_run.py` failed in this environment (`npx invocation failed: [WinError 2]`, npx not resolvable from the Python subprocess on this machine) — could not complete before budget cutoff. Only a raw TTFB check was obtained: homepage `TTFB ≈ 129ms`, full response ≈ 141ms (Vercel edge cache HIT, `br` compression, 101KB HTML) — server-response timing looks healthy, but this says nothing about LCP/INP/CLS, which depend on client-side render/hydration and image/video weight. Defer full CWV/Lighthouse analysis to the `seo-performance` agent; this check is incomplete here.

### Not completed (budget cutoff)

- Did not fetch remaining page types beyond the sitemap-driven 60 URLs (e.g., exhaustive internal-link crawl beyond sitemap scope) — out of stated scope anyway per task instructions.
- Did not verify Vercel dashboard-level header/redirect overrides that might exist outside the repo (only repo-declared `next.config.ts`/`robots.ts`/`sitemap.ts` were inspected).
- Did not complete a full Lighthouse/CWV run (see above).
