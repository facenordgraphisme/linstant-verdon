# Technical SEO Findings - linstantverdon.com (2026-11-14)

## Score: 74/100 (previous audit 2026-08-07: 53 overall / 60 technical)

Scope: raw/crawl.json (64 URLs), robots.txt, sitemap.xml, live curl checks, source review.

## What works
- 60/60 sitemap URLs return 200, all served from Vercel cache (x-vercel-cache HIT/STALE) after the SSG/ISR move. Sitemap now has first-class /en entries (60 <loc>).
- Real 404s: /fr/canyoning/xyz and /fr/xx return HTTP 404 (noindex meta on the not-found page). Soft-404 bug fixed.
- Canonical present everywhere, self-referencing; hreflang fr/en/x-default (x-default=/fr) reciprocal on every page crawled (fr and en counterparts mapped to the right localised category slugs).
- Exactly one H1 per page; titles/descriptions unique; html lang correct; viewport OK.
- Security headers now present: CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS (max-age 2y, no includeSubDomains/preload). X-Powered-By removed.
- Redirects are single hop: http->https, apex->www, /->/fr, /xx->/fr/xx, trailing slash stripped, wrong-category slug -> right category.
- robots.txt valid; GPTBot, ChatGPT-User, CCBot, Amazonbot, ClaudeBot, PerplexityBot are no longer blocked; /studio rule fixed (no trailing slash).
- /llms.txt exists (200).

## August action plan: status
- FIXED: AI bots unblocked (1,2 partially, see Low-1), soft 404 -> real 404 (3), wrong-locale duplicate URLs now 308 to canonical (4), /en in sitemap (5), security headers (12), X-Powered-By, robots /studio, llms.txt exists.
- Not verifiable here / not technical: items 6-11, 13-25 (content, schema, images, video).

## Critical
None.

## High
**H1. Sitemap <loc> contain raw UTF-8 accented slugs; raw request returns HTTP 500**
- Evidence: sitemap.xml lines 39,40,49,50,55-58 (escalade-demi-journee-decouverte, soiree-insolite-portaledge, multi-activite-3-jours / 7-jours; FR and EN = 8 URLs). `curl --path-as-is .../fr/canyoning/multi-activité-3-jours` -> 500; the percent-encoded form -> 200 (or 308 to the right category). Canonical tags on those pages are percent-encoded, so sitemap and canonical disagree. Also invalid XML-sitemap practice (URLs must be RFC3986 encoded). Google may drop or error these entries (all 4 stage and 2 climbing/insolite money pages).
- Fix (src/app/sitemap.ts): encode slug when building URLs, e.g. `encodeURIComponent(activity.slug)` for activity and post slugs (frUrl/enUrl and `languages`). Better: change the slugs in Sanity to ASCII (multi-activite-3-jours) and add redirects from the old accented ones in next.config.ts; this also removes the % in canonicals and shortens the title length outliers.

**H2. EN navigation and footer link to URLs that 308 redirect**
- Evidence: every /en page links to /en/escalade, /en/aventures, /en/insolite, /en/stages (also /en/canyoning ok); each -> 308 -> /en/climbing, /en/adventure, /en/unusual-activities, /en/weekend. Appears on all 60 pages (sitewide internal-link redirect, wasted crawl hop, dilutes link signals).
- Fix: src/components/Navbar.tsx lines 36-39 and src/components/Footer.tsx (line ~71 and siblings) hardcode FR slugs for both locales. Reuse the category slug map from sitemap.ts (fr: escalade/aventures/stages/insolite, en: climbing/adventure/weekend/unusual-activities) via a shared helper. Check Hero/homepage cards and blog components for the same pattern.

## Medium
**M1. og:image missing on all non-detail pages**
- Evidence: crawl og_image is empty for home, categories, faq, contact, a-propos, blog and several details (escalade demi-journee, stages 3/7 days). Page-level `openGraph: {title, description, url}` replaces (shallow merge) the layout's openGraph.images. Files: src/app/[locale]/page.tsx:35, [category]/page.tsx:89, a-propos:36, blog:38, contact:34, faq:34; detail pages only set images when the Sanity image exists. Fix: add `images` default (shared constant) in each openGraph, or use a file-based src/app/opengraph-image.*. Also og:locale/og:type not set per locale.

**M2. Slug typo "canoyn-bas-jabron" (FR + EN)**
- Live at /fr/canyoning/canoyn-bas-jabron and /en/...; in sitemap, canonical and hreflang. Fix slug in Sanity to canyon-bas-jabron, add redirect in next.config.ts (both locales, permanent), update llms.txt if listed. Do it together with H1 to batch redirect work.

**M3. Redirect for a wrong-category activity path is generic**
- /fr/canyoning/multi-activite-3-jours redirects to /fr/stages/... (good, single hop), but only because the page does it at runtime; confirm it is not a Function invocation (cost) - if needed, rely on dynamicParams and not-found.

**M4. Sitemap lastmod is build time for static pages**
- All static pages have identical lastmod 2026-11-05T23:12:25Z (`new Date()` in src/app/sitemap.ts). Google ignores non-truthful lastmod; changefreq/priority are ignored. Fix: omit lastModified for static pages or use real dates (post.publishedAt/_updatedAt already used for Sanity content).

**M5. /studio is crawlable-by-fetch and has no noindex**
- /studio returns 200; robots disallows it (now correct), but the Studio HTML has no robots meta and no X-Robots-Tag. Fix: add `{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }` for source '/studio/:path*' (and '/studio') in next.config.ts headers().

## Low
- L1. robots.txt blocks Google-Extended, anthropic-ai, cohere-ai, Diffbot (AI training opt-out; fine if intentional, but note Google-Extended does not affect Search; Anthropic's token is ClaudeBot/Claude-SearchBot, not anthropic-ai, so that line has no effect). YandexBot/Baiduspider blocks lose some Russian/Chinese traffic; Bing/Google/OpenAI/Perplexity allowed. Consider adding explicit comment. File: src/app/robots.ts.
- L2. Titles over 60 chars on 25+ URLs (blog 87-92 chars, multi-activite 102-104 chars, home 65, a-propos 64, contact 64). They will truncate. Shorten in Sanity/metadata templates; the 102-104 ones likely append the brand twice or long slugs.
- L3. EN meta descriptions short (home EN 48 chars, /en/weekend 79, /en/adventure 87, /en/canyoning 94). Expand to 130-155 chars. Detail pages all have a 141-char description (probably identical template text across all 28 detail pages - verify uniqueness; crawl shows exactly 141 on every one).
- L4. Several category/blog/contact pages are thin (contact 177-182 words, blog 206-221, evenementiel 260-310); detail pages 260-480 words.
- L5. HSTS lacks includeSubDomains/preload (src: Vercel default). Low priority.
- L6. CSP uses 'unsafe-inline' (documented in next.config.ts); acceptable.
- L7. 308 (permanent) used for locale-prefix redirects of unknown paths: /xx -> /fr/xx -> 404 (two hops for junk URLs, harmless). proxy.ts also catches e.g. /robots-like paths without extension; fine.
- L8. Short-lived caching: Cache-Control public, max-age=0, must-revalidate (Vercel default) - fine as Vercel edge caches.

## Mobile / rendering / CWV (source-level)
- Viewport present; pages are server-rendered/prerendered (home 815 words in raw HTML, no SPA shell), so no JS-rendering dependency for content or JSON-LD.
- CWV not measured (no field data). Known risks carried over from August: hero video weight, GSAP opacity:0 gating on H1 (LCP), raw <img> usage. Re-verify with PageSpeed/CrUX.
- IndexNow: not implemented (low value for Google; relevant for Bing). Optional.

## Priority order
1. H1 sitemap encoding / ASCII slugs (and the 500)  2. H2 EN nav links  3. M1 og:image  4. M2 slug typo + redirect  5. M5 Studio noindex, M4 lastmod.
