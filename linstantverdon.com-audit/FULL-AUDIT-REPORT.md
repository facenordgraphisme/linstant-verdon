# Full SEO Audit — linstantverdon.com

**Audit date:** 2026-08-07
**Business:** L'Instant Verdon — canyoning, climbing & adventure guide, Gorges du Verdon, France
**Business type:** Local Service / Adventure Tourism (hybrid fixed-address + service-area), bilingual FR/EN
**Stack:** Next.js App Router + Sanity CMS, hosted on Vercel
**Context:** Site relaunched 2026-06-17 after the previous site was deindexed — this audit assesses recovery progress

---

## Executive Summary

### Overall SEO Health Score: 53 / 100

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 58/100 |
| Content Quality | 23% | 42/100 |
| On-Page SEO (composite) | 20% | 58/100 |
| Schema / Structured Data | 10% | 46/100 |
| Performance (lab-based) | 10% | 75/100 |
| AI Search Readiness | 10% | 50/100 |
| Images | 5% | 35/100 |

**Supplementary specialist scores** (not folded into the weighted score above, included because this is a Local Service business with bilingual/AI-visibility priorities): Sitemap Structure 55/100 · SXO 61/100 · Local SEO 50/100 · Visual/UX 50/100 (provisional) · Backlinks: insufficient data (Tier 0, qualitative findings only).

Seven weeks after relaunching a previously-deindexed site, the technical foundation is more solid than a typical fresh build (correct canonical/hreflang implementation, real structured data, no client-rendering gap), but a small number of severe, easily-fixed defects are actively undermining the recovery: an AI-crawler access wall, soft 404s, a half-broken English site, and zero commercial schema on the pages that actually generate bookings.

### Top 5 Critical Issues

1. **AI crawlers are hard-blocked at the middleware level.** `src/proxy.ts` returns HTTP 403 to GPTBot, ChatGPT's live link-fetch agent (`chatgpt-user`), Claude's link-share agent (`claude-web`), CCBot, and `amazonbot` — not an advisory robots.txt rule, an actual access wall. A user pasting the site's URL into ChatGPT or Claude gets nothing.
2. **Soft 404s everywhere.** No route ever calls Next's `notFound()` — any typo'd or removed URL returns a clean HTTP 200. On a site trying to recover from deindexing, this risks Search Console flagging pages as thin/low-value instead of cleanly erroring.
3. **The English site is half-broken.** 30 English pages have zero sitemap presence, several leak untranslated French text (`/en/canyoning` duplicates a French paragraph twice), and ~15 wrong-locale URL combinations (`/en/escalade` instead of `/en/climbing`) are live, self-canonicalizing duplicates.
4. **Zero commercial schema on the only pages that make money.** The 11 tour/activity detail pages have price, duration, and inclusions data ready in Sanity but emit no `Product`/`Offer`/`TouristTrip` schema — forfeiting rich-snippet real estate that OTA competitors (GetYourGuide, Viator) win.
5. **A 62.5MB hero video is destroying homepage LCP** (5.27s, "Poor" on Lighthouse mobile), compounded by the LCP element (the H1 title) being hidden at `opacity:0` until a client-side animation runs.

### Top 5 Quick Wins

1. **`src/app/robots.ts`**: change `disallow: '/studio/'` → `disallow: '/studio'` — the current rule doesn't block the live Sanity Studio admin shell at all.
2. **`src/proxy.ts`**: remove `gptbot`, `chatgpt-user`, `amazonbot`, `ccbot` from `BANNED_USER_AGENTS` — one array edit restores AI-search access.
3. **`Hero.tsx`**: add `preload="none"` and a poster image to the hero `<video>` — immediate LCP improvement, no re-encoding required as a first step.
4. **Homepage TripAdvisor icon**: currently links to the wrong (generic) listing instead of the business's own page declared in schema.
5. **`/llms.txt`**: states the wrong address (Castellane) — reconcile with the real, schema-consistent address (La Palud-sur-Verdon) to remove an entity-confusion signal.

---

## Technical SEO — 58/100

**Scope:** all 60 sitemap-declared URLs (30 FR + 30 EN), fetched directly; source code reviewed (`robots.ts`, `sitemap.ts`, `next.config.ts`, every `generateMetadata`).

### What Works
- All 60 tested URLs return clean single-hop 200s — no broken links or redirect chains
- Canonical tags implemented correctly and consistently via `generateMetadata` on every page type
- hreflang is fully reciprocal at the page level (including `x-default`) on both `/fr` and `/en`
- Viewport meta, `html lang`, and JSON-LD present on every page tested
- HSTS present site-wide; locale/www redirects are clean single 308 hops

### Critical
- **Soft 404s site-wide** — `notFound()` is never called anywhere in the codebase; invalid URLs return HTTP 200 with generic fallback content. *Fix: call `notFound()` in `[category]/page.tsx` and `[category]/[slug]/page.tsx`; add `not-found.tsx`.*
- **`Disallow: /studio/` doesn't block `/studio`** — the live Sanity Studio admin shell is reachable and unblocked (no trailing slash), while the one path that *is* blocked 308-redirects straight to it. *Fix: change to `disallow: '/studio'` in `robots.ts`.*

### High
- **No security headers beyond HSTS** — no CSP, X-Content-Type-Options, X-Frame-Options, or Referrer-Policy anywhere. *Fix: add a `headers()` function to `next.config.ts`.*

### Medium
- Sitemap `<loc>` uses raw accented characters while canonical tags use percent-encoding (spec-compliance/hygiene issue, not currently causing duplicate indexing)
- `X-Powered-By: Next.js` exposed on every response

### Low
- AI-crawler blocking in `robots.txt` is syntactically valid but appears to be an unintentional copy-paste alongside generic SEO-scraper blocking (see AI Search Readiness for the more severe middleware-level block of the same crawlers)

*Full detail: `findings/technical.md`*

---

## Sitemap Structure — 55/100

### What Works
- Valid XML, 30 unique entries, well under the 50,000-URL limit
- hreflang alternates correctly computed for every entry, including locale-specific slug translation
- Dynamically generated from Sanity (correct architecture), just incomplete

### Critical
- **Entire `/en` locale absent from the sitemap as first-class entries.** hreflang annotations inside a sitemap don't cause the referenced URL to be discovered — Google recommends each language version have its own `<url>` entry. Verified live: `/en` and `/en/canyoning/canyon-artuby` are both indexable 200s with zero sitemap presence.
- **Self-canonicalizing duplicate wrong-locale URLs** — `generateStaticParams()` cross-products both language variants of each category slug with both locales, generating ~15 extra live pages (e.g. `/en/escalade`, `/fr/climbing`) that each canonicalize to themselves instead of the correct URL.

### Info / Low
- `priority`/`changefreq` present but ignored by Google — safe to remove
- Static-page `lastmod` reflects sitemap build time, not actual content changes

*Full detail: `findings/sitemap.md`*

---

## Content Quality — 42/100

**Scope:** homepage, all 6 category pages, about, FAQ, blog (index + 2 posts), 12 individual tour pages, FR and EN.

### What Works
- Named, credentialed guides with real, specific bios (state diplomas, dates, personal history) — genuine expertise signal
- Authentic first-person voice, not generic AI filler
- Tour pages carry concrete, quotable facts (meeting points, jump heights, age minimums)
- The multi-day "stages" camp page (812 words, itineraries, transparent pricing) is the best-executed page on the site

### Critical
- **English pillar pages are effectively broken** — `/en/canyoning`, `/en/climbing`, `/en/adventure`, `/en/unusual-activities` render 42-114 words, missing the FR intro, with untranslated French UI strings duplicated twice on the same page.
- **`/en/a-propos` (the primary trust page) has an entire untranslated French paragraph.**

### High
- Category pages sit at 83-164 words despite carrying the highest sitemap priority (0.8-0.9) — far below an 800-word service-page floor
- No trust/safety signals anywhere: no insurance mention, no federation beyond "syndicat local," no reviews, cancellation policy hidden behind an off-page link
- FAQ is 3 questions, ~64-68 words, missing obvious questions (weather cancellation, age minimums, group size, pricing)

### Medium
- Tour pages (150-300 words) share rigid, near-verbatim boilerplate across 12+ pages
- EN tour pages leave section headers untranslated even where body prose is translated
- EN guide bios are meaningfully abridged versus FR (missing cofounder credential, personality detail)

### Low
- Blog has only 2 short posts (~196-310 words) — fine as "seasonal picks" but not evergreen long-form content

**E-E-A-T breakdown:** Experience 12/20 · Expertise 17/25 · Authoritativeness 11/25 · Trustworthiness 12/30 (weighted raw ~50/100, folded into the overall 42/100 alongside thin-content penalties). **AI Citation Readiness: 48/100.**

*Full detail: `findings/content.md`*

---

## Schema / Structured Data — 46/100

### What Works
- JSON-LD used correctly everywhere it exists — no Microdata/RDFa, correct `@context`
- `LocalBusiness` + `SportsActivityLocation` on every page with full NAP, geo, credentials
- `BlogPosting` on blog posts is well-formed — the strongest block on the site
- `FAQPage` on `/fr/faq` with 7 real Q&A pairs

### Critical
- **Tour/activity detail pages — the site's only revenue-generating pages — have zero `Product`/`Offer`/`TouristTrip` schema**, despite price/duration/inclusions already existing in Sanity.
- **No `BreadcrumbList` anywhere on the site.**

### High
- `LocalBusiness.url` hardcoded to `/fr` even on English pages (confirmed live on `/en/faq`)
- Sitewide `aggregateRating` (4.8/54) has no visible on-page counterpart and unclear provenance

### Medium
- Full guide roster/rating duplicated verbatim on every page, including unrelated blog/FAQ pages
- `/en/faq` has no `FAQPage` schema at all (locale-gated in code)
- No standalone `Person` schema for guides on `/a-propos`

Ready-to-paste JSON-LD for all Critical/High fixes (Product/TouristTrip, BreadcrumbList, Person, EN FAQPage, URL bug fix) is included in `findings/schema.md`, wired to real Sanity fields.

*Full detail: `findings/schema.md`*

---

## Performance (Core Web Vitals) — 75/100 (lab-based, homepage only)

> No PageSpeed Insights/CrUX API key is configured on this machine — figures below are Lighthouse lab estimates (mobile, simulated throttling), not real Google field data.

| Metric | Homepage `/fr` | Status |
|---|---|---|
| LCP | 5.27s | Poor |
| CLS | 0 | Good |
| TBT | 94ms | Good |
| TTFB | 119ms | Good |
| Time to Interactive | 10.6s | Poor |

### Critical
- **62.5MB hero video** loads eagerly with no `preload`/poster strategy — the primary driver of the 5.27s LCP.
- **Hero title (the LCP element) is hidden at `opacity:0`** until a client-side GSAP animation runs, adding a hard ~0.8-2s floor to LCP.

### High
- **`next/image` used in only 1 file sitewide** — 20+ raw `<img>` tags bypass all Next.js image optimization (team photos served as full-resolution camera JPEGs)
- Unnecessary preload of a small flag icon competing with critical resources

### Medium
- Client-heavy `Hero` component (GSAP + video logic) drives a 10.6s Time to Interactive
- No explicit width/height on raw `<img>` tags — latent CLS risk

*Full detail: `findings/performance.md`*

---

## Images — 35/100

- Same root cause as Performance's High finding (near-total absence of `next/image`), scored separately as an image-specific gap
- Tour-page gallery images missing alt text: 7/10 on canyon-artuby, 3/6 on escalade-grande-voie (category pages have full coverage)
- Unoptimized raw camera-export images (double file extensions, e.g. `emma.JPG.jpeg`)

---

## AI Search Readiness (GEO) — 50/100

**Improvement noted:** this is a meaningful jump from a prior 2026-06-17 baseline audit that scored 20/100 with zero structured data and no `llms.txt`.

### What Works
- `/llms.txt` exists and is well-formed (phone, email, address, SIRET, guide credentials, pricing)
- Structured data added since the last audit (LocalBusiness, Person + credentials, AggregateRating, FAQPage)
- Full SSR — no client-rendering gap hiding content from crawlers
- Googlebot, Bingbot, ClaudeBot, OAI-SearchBot, PerplexityBot, DuckAssistBot all confirmed unblocked

### Critical
- **`src/proxy.ts` middleware hard-blocks GPTBot and the live link-fetch agents `chatgpt-user`/`claude-web` with HTTP 403** — more severe than robots.txt; there is no way for these agents to read the site under any circumstance, including a user directly asking ChatGPT/Claude to open the URL.
- **`robots.txt` duplicates the same over-broad block**, sending a conflicting signal to any AI crawler that does respect it.

### High
- FAQ page too thin to serve as a citation asset; the cancellation-policy answer is a non-answer (redirects to CGV instead of stating the policy)
- Canyon-Artuby detail page is missing duration — an obvious direct-answer query the page currently can't satisfy

### Medium
- **NAP inconsistency**: `/llms.txt` lists "Castellane" while the live site/schema say "La Palud-sur-Verdon" — an entity-confusion risk for any LLM cross-referencing sources
- Question-phrased headings are underused (labels like "Description" instead of "Que comprend la sortie ?")

**Platform-specific estimate:** Perplexity ~60/100 · Google AI Overviews ~55/100 · Bing Copilot ~55/100 · Claude ~45/100 · ChatGPT ~40/100 (capped by the `chatgpt-user`/`GPTBot` block).

*Full detail: `findings/geo.md`*

---

## Search Experience Optimization (SXO) — 61/100

### What Works
- Strong `LocalBusiness` schema with named, credentialed guides — a real E-E-A-T asset most competitors lack
- Tour pages structured close to a transactional Product/Service type with scannable blocks
- Low-friction booking CTA with clear no-commitment reassurance next to the price

### Critical
- Page-type/schema mismatch: all 11 tour pages look and function like Product pages but carry zero Product/Offer schema (duplicates the Schema category's top finding, from a search-intent angle)

### High
- Duration/difficulty buried in a collapsed accordion instead of shown at-a-glance — a trust gap for anxious first-time canyoning tourists
- Blog is generic content marketing, not mapped to real trip-planning search intent

### Medium
- `/fr/evenementiel` lacks the concrete capacity/pricing/logistics an event organizer needs for budget approval

*Full detail: `findings/sxo.md`*

---

## Local SEO — 50/100

**Business type detected:** Hybrid (fixed base address + service-area guiding across named canyon/climbing sites)

### What Works
- NAP fully consistent across footer, schema, and visible Contact page text
- Dedicated hyper-local landing pages for individual canyon/climbing sites — matches the #1 local-organic ranking factor (dedicated service pages)
- State certification signals embedded in structured data for all guides

### Critical
- **No Google Business Profile signals detected anywhere on-site** — no Maps embed, no `sameAs` link, no directions CTA. GBP is the single largest local ranking-factor group.
- **TripAdvisor link mismatch**: the homepage icon links to a different, generic listing than the one declared in schema.

### High
- No visible reviews/testimonials despite a schema `aggregateRating` claim (4.8/54)

### Medium
- No visible SIRET; thin citation footprint (only TripAdvisor + verdontourisme.com confirmed)

*Full detail: `findings/local.md`*

---

## Visual / UX — 50/100 (provisional)

> The automated visual pass ran out of budget before reviewing all 16 captured screenshots. This report supplements it with a direct manual spot-check of 4 key screenshots, which surfaced 2 new confirmed issues below.

### What Works
- All pages render correctly at all 4 tested viewports with no errors
- Homepage above-the-fold: clear value proposition, two visible CTAs, legible text over the hero background

### High
- **Background video appears to prevent the page from ever reaching network-idle** (screenshot capture timed out waiting for it) — likely continuous re-fetching/re-buffering
- **New finding (manual spot-check): duplicate/ghosted heading text overlaps the "CANYONING" H1 on the mobile category page** (`screenshots/category_mobile.png`) — appears to be a stacked/un-faded animation layer specific to the mobile breakpoint

### Medium
- Tour detail page: no price or duration visible in the above-the-fold "inclus" sidebar, confirming the SXO accordion finding visually

*Full detail: `findings/visual.md`. Screenshots: `screenshots/`*

---

## Backlink Profile — insufficient data (Tier 0)

No Moz/Bing/DataForSEO API access configured; only Common Crawl (predates the relaunch) and live verification checks were available. A numeric score would imply false precision — the real finding is qualitative.

### What Works
- An existing relationship with Verdon Tourisme (regional tourism board) is evidenced by a since-broken listing — easier to recover than build from scratch

### High
- **Broken outbound link to the Verdon Tourisme business directory (404)** — the site's own homepage links to a listing that no longer resolves; recommend fixing the link and contacting the board to restore it (highest-relevance, lowest-effort link opportunity available)

### Medium
- No verifiable current backlinks to the new domain build (expected 7 weeks post-relaunch)
- No federation/directory/partner links found anywhere (FFME, FFS, local gîtes, marketplaces)

*Full detail: `findings/backlinks.md`*

---

## Methodology Notes & Limitations

- **No Google API credentials** (PageSpeed Insights, CrUX, Search Console, GA4) were configured on this machine — Performance figures are lab-based Lighthouse estimates, not real field data, and indexation/traffic data wasn't available.
- **No Moz, Bing Webmaster, or DataForSEO access** — the Backlinks category is Tier 0 (Common Crawl only) and the Local/Maps categories could not pull live Google Business Profile data.
- Several specialist subagents (content, schema, sitemap, technical, local, SXO, visual) hit their analysis budget mid-task and were resumed with instructions to finalize using what they'd already gathered; each affected report explicitly notes which pages weren't independently re-verified. Patterns found were confirmed as systemic across the reviewed subset in each case, but a follow-up pass on the unread pages is recommended before treating item counts as fully exhaustive.
- The Visual/UX audit is provisional — only 4 of 16 captured screenshots were manually reviewed (2 by the automated pass's process-level observation, 2 more by direct inspection during aggregation).

---

*See `ACTION-PLAN.md` for a prioritized, phased implementation plan.*
