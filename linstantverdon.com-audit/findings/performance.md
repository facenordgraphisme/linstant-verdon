# Performance / Core Web Vitals - linstantverdon.com (audit 2026-11-14)

Sources: PSI API v5 (Lighthouse 13.6.0), CrUX API + CrUX History. Raw JSON in `raw/` (psi-fr/canyoning/artuby.json, cruxhist-*.json, crux-origin.json).

## Scores
- **Performance: 66/100** (mobile is what matters: /fr 98, /fr/canyoning 61, /fr/canyoning/canyon-artuby 67; desktop 73 / 90 / 96)
- **Images: 45/100**

## PSI lab (Lighthouse 13.6.0)
| URL | Device | Perf | LCP | TBT | CLS | FCP |
|---|---|---|---|---|---|---|
| /fr | mobile | 98 | 1.7s | 10ms | 0 | 1.7s |
| /fr | desktop | 73 | **6.0s** | 10ms | 0.006 | 0.5s |
| /fr/canyoning | mobile | **61** | **19.2s** | 420ms | 0 | 1.9s |
| /fr/canyoning | desktop | 90 | 0.3s | 0 | 0 | 0.3s |
| /fr/canyoning/canyon-artuby | mobile | **67** | **11.2s** | 190ms | 0 | 1.7s |
| /fr/canyoning/canyon-artuby | desktop | 96 | 1.1s | 110ms | 0 | 0.5s |

Lab server response: 2-90 ms (static/ISR works). Page weight: /fr 12.6 MB mobile, /fr/canyoning 3.9 MB.

## CrUX field data
- Current-period CrUX: **no data** for origin, /fr, /fr/canyoning, /fr/canyon-artuby via the PSI/CrUX call.
- CrUX **History** returns data for **origin and /fr** (latest window 2026-10-11 to 2026-11-07, all devices). Canyoning and artuby: none.

| Metric (p75) | Origin | /fr | Status | Trend since Apr-May |
|---|---|---|---|---|
| LCP | 3.83s (good 41.9%) | 3.64s (43.9%) | Needs improvement | degrading ~+38-40% (was ~2.5s) |
| INP | 158ms (79.1%) | 165ms (78.2%) | Pass | stable |
| CLS | 0.02 (75.9%) | 0.12 (73.9%) | origin pass; /fr borderline | /fr: 0 -> 0.01 -> 0.12 in last 3 windows |
| TTFB | 1.42s (47%) | 1.57s (28.6%) | Poor vs 0.8s target | slightly worse |
| FCP | 3.27s | 3.40s | slow | degrading ~+37% |

Lab vs field: lab server response is ~100 ms but real-user p75 TTFB is ~1.5 s (mobile networks, cache misses, redirects, region). Field LCP/FCP have drifted worse steadily since ~Aug. CLS regression on /fr is recent (Oct); desktop lab attributes the small shifts to the hero content block and CTA (GSAP y/scale animations in Hero.tsx).

## Comparison with previous audit (2026-08-07)
- Then (lab only): /fr mobile 75, LCP 5.27s, TBT 94ms. Now 98, LCP 1.7s. Video deferral, poster and no-opacity title fixes landed. Fixed.
- Not fixed: images (CSS backgrounds + giant originals) are now the dominant issue on inner pages.
- New/worse: inner pages mobile LCP 11-19s; field LCP 3.6-3.8s and rising; field TTFB 1.4-1.6s; desktop /fr LCP 6.0s.

## Top problems (priority order)
1. **CSS `background-image` heroes are the LCP killers on inner pages (mobile LCP 19.2s / 11.2s).** Not discoverable by preload scanner, not optimized, no priority.
   - Files: `src/app/[locale]/[category]/page.tsx:244, 528, 770`; `src/app/[locale]/[category]/[slug]/page.tsx:300` (Sanity hero served raw from cdn.sanity.io, 1200x1600, 490 KB, bypassing /_next/image); also `faq/page.tsx:244`, `contact/page.tsx:48`, `blog/page.tsx:73`, `blog/[slug]/page.tsx:140`, `a-propos/page.tsx:109`.
   - Fix: replace with `<Image src=... fill priority sizes="100vw" quality={70} className="object-cover" />` as first child of the hero section (keep overlay div).
2. **Multi-MB originals in `/public/assets` used as CSS backgrounds on the homepage cards (/fr = 12.6 MB).**
   - `src/components/ActivityGrid.tsx:45-50, 142`: `events.jpg.jpeg` 7.0 MB, `canyon.jpeg` 3.0 MB, `unusual2.webp` 824 KB, `about-us.webp` 392 KB, `adventure.jpeg` 326 KB. Others: `multipitch.jpeg` 2.0 MB, `event1/event2.jpg.jpeg` 2.1/2.5 MB.
   - Fix: use `<Image fill sizes="(max-width:768px) 100vw, 33vw">` (lazy) and re-export originals to <=1600px WebP/AVIF under 200 KB. Biggest single win: homepage ~12.6 MB -> ~2 MB.
3. **/fr desktop LCP 6.0s (perf 73).** Candidates: `PromoPopup.tsx:86` uses `priority` (high-priority preload of a popup image on every page, may become LCP); Hero wrapper starts at `opacity:0` and GSAP fades it in (`Hero.tsx`, `style={{opacity:0}}` on `.video-container`), delaying poster paint. Fix: remove `priority` from PromoPopup and mount it after idle; render the poster as `<Image priority>` (or preload it with fetchpriority=high) and drop the opacity-0 start.
4. **Field TTFB 1.4-1.6s and FCP 3.3s.** Check `x-vercel-cache` from several regions and after the 24h `revalidate` (`[category]/page.tsx:53`), function region (cdg1/fra), redirect chain (`/` -> `/fr`, `next.config.ts` redirects). Prefer on-demand revalidation (Sanity webhook) over time-based. Add `preconnect` to cdn.sanity.io.
5. **Mobile TBT 420 ms (canyoning), 190 ms (artuby); unused JS 112-347 KiB.** Google Maps JS on artuby, GTM 153 KB, GSAP. Lazy-mount Maps on intersection, `next/dynamic` for animation code, gtag `lazyOnload` in `src/app/[locale]/layout.tsx:61` if conversion tracking allows.
6. **CSP blocks Google Ads calls** (console errors on /fr): `connect-src` in `next.config.ts` lacks `https://www.google.com`, `https://ad.doubleclick.net`, `https://*.g.doubleclick.net`. Hurts ad measurement and Best Practices (92).
7. **CLS creeping up (/fr field 0.12).** Ensure fixed heights/aspect-ratio for hero content and card images; check PromoPopup insertion.
8. **Hero video** still 59.6 MB from `pub-*.r2.dev` (dev URL, not CDN-grade). Re-encode to <5 MB, serve from a custom domain via Cloudflare, skip on mobile/saveData.

## Images (score 45/100)
Positives: `next/image` used for blog cards, category listings, team photos, logo, flags, Sanity galleries (with `sizes`); no `alt=""` found; Sanity listing images go via /_next/image (WebP, w=750, q=75); below-fold iframes lazy.
Problems:
- Formats/sizes: ~20 files >400 KB in `/public/assets`, several JPEGs of 2-7 MB with double extensions. `favicon.svg` is 982 KB and duplicated in each asset folder: replace with an optimized SVG (<5 KB).
- CSS background images (ActivityGrid and all heroes) skip next/image: no responsive sizes, AVIF/WebP, lazy control or preload.
- Raw `<img>`: `src/components/AboutSection.tsx:59` (about-us.webp 392 KB, no dimensions, not lazy), `src/app/[locale]/a-propos/page.tsx:216, 243, 269` (partner logos, no dimensions: CLS risk).
- Sanity hero on slug pages loaded directly from cdn.sanity.io (~170 KB waste).
- Alt quality: generic strings (`Stage Photo ${idx+1}`, `Activité insolite Verdon ${i+1}`, `Logo`, `Emma`); make descriptive. Hero CSS backgrounds carry no alt at all (lost image-SEO signal).
- `priority` is used on PromoPopup (wrong) and not on real heroes.
- Quick wins: `images.formats: ['image/avif','image/webp']` and `minimumCacheTTL` in `next.config.ts`.

## What works
next/font; gtag afterInteractive; lab server response ~100 ms; field INP 158-165 ms passes; CLS 0 on inner pages in lab; small DOM (~445 elements); SEO 92-100; hero video deferred with poster.

## CWV verdict (field, origin)
LCP 3.83s needs improvement (degrading) | INP 158ms pass | CLS 0.02 pass (/fr 0.12 borderline) | TTFB 1.42s poor.
