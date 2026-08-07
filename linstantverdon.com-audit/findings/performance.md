# Performance / Core Web Vitals Audit — linstantverdon.com

> **Methodology note:** No Google PageSpeed Insights / CrUX API key is configured on this
> machine, so the figures below are **lab-based estimates** (Lighthouse 13.4.1, mobile,
> simulated throttling) — not real Google field data (75th-percentile CrUX). Lab data can
> diverge from field data, especially for network-bound issues like the oversized hero
> video documented below, which will disproportionately hurt real users on slower
> connections. Only the homepage (`/fr`) got a full Lighthouse run before the audit budget
> was cut short; `/fr/canyoning/canyon-artuby` and `/fr/blog/3-activites-verdon-ete` were
> assessed via direct source-code inspection only (see Limitations).

## Score: 75/100

(Lighthouse Performance score, homepage `/fr`, mobile, simulated throttling)

| Metric | Homepage `/fr` (measured) | Status |
|---|---|---|
| LCP | **5.27 s** | Poor (>4.0s) |
| CLS | 0 | Good |
| TBT (proxy for INP) | 94 ms | Good |
| FCP | 1.1 s | Good |
| TTFB | 119 ms (root doc ~20ms via edge cache) | Good |
| Time to Interactive | 10.6 s | Poor |

LCP element identified by Lighthouse: the `<h1>` "L'INSTANT VERDON" text block. TTFB (119ms)
+ element render delay (425ms) only account for ~545ms of the 5.27s — the remaining ~4.7s
is consistent with main-thread/network contention from the hero video (see Critical #1)
delaying paint, compounded by the GSAP opacity-fade-in animation on the title (Critical #2).

`/fr/canyoning/canyon-artuby` and `/fr/blog/3-activites-verdon-ete` were not lab-tested this
run (budget constraint) but share the same `Hero`/layout/image patterns identified below via
source inspection, so the same root causes (raw `<img>`, no `next/image`) apply — see
Limitations.

## What Works

- **Fonts**: `next/font/google` (Inter, Outfit) is used correctly in `src/app/[locale]/layout.tsx` — fonts are self-hosted, preloaded as `woff2` with `crossorigin`, avoiding extra DNS/connection round-trips and FOIT/FOUT layout shift. This is confirmed in the rendered `<head>` (`/_next/static/media/*.woff2` preload links).
- **Google Ads tag** (`AW-797772111`) is loaded via `next/script` with `strategy="afterInteractive"` in the root layout — not render-blocking, follows Next.js's own recommendation for tag-manager/analytics scripts.
- **TTFB is excellent** (~20-120ms) — Vercel edge caching (`X-Vercel-Cache: HIT`, `X-Nextjs-Prerender: 1`) is serving the homepage from a static/ISR cache.
- **CLS is currently 0** on the homepage in this lab run — no obvious layout-shift regressions were observed in this pass, though see Medium #1 for a latent risk.
- The hero video was already migrated off the Vercel build/edge to Cloudflare R2 (per commit `df59361`), which was the right instinct — but the migration is incomplete (see Critical #1).

## Critical

### 1. Hero background video is 62.5 MB and loads eagerly with no `preload`/poster strategy
- **File:** `src/components/Hero.tsx` (lines 44-53)
- **Evidence:** `curl -I https://pub-badf3a21614b454495059542458030e6.r2.dev/video-linstant-verdon.mp4` → `Content-Length: 62491068` (59.6 MiB), `Content-Type: video/mp4`.
- **Issue:** The `<video autoPlay muted loop playsInline>` has no `preload` attribute (defaults to `preload="auto"`, i.e. browser tries to buffer the whole file) and no `poster`. On every homepage visit — mobile or desktop — the browser starts pulling a ~60MB file immediately, saturating bandwidth and competing with the fonts/JS/CSS/hero text for the same connection. This is the primary driver of the observed 5.27s LCP (the H1 text is stuck behind network contention) and will be dramatically worse on 4G/3G mobile connections in the field (CrUX would very likely fail LCP at the 75th percentile).
- **Fix (Next.js-specific):**
  - Add `preload="none"` and a lightweight `poster="/assets/accueil/hero-poster.webp"` (a compressed still frame, <100KB) so something paints instantly and the video becomes a true LCP candidate that Lighthouse/CrUX can optimize against, instead of an untracked background element.
  - Re-encode the source video: 60MB for a looping hero background is 10-20x oversized. Target H.264/VP9 at ~1080p, 2-4 Mbps, trimmed to a short seamless loop (5-10s) — should land under 5MB. Serve via R2 with an additional lower-res poster/first-frame.
  - Defer the video load until after first paint: keep the poster as the LCP element, then swap in the `<video>` via a `useEffect` that sets `src` (or toggles `preload`) after `requestIdleCallback`/on mount, so it never blocks the critical rendering path.
  - Consider `next/image` for the poster with `priority` so it's preloaded and optimized (AVIF/WebP, correctly sized) instead of a raw `<img>`/CSS background.

### 2. Hero title is hidden (`opacity:0`) until client-side GSAP runs, delaying LCP paint
- **File:** `src/components/Hero.tsx` (lines 1, 20-38)
- **Issue:** `Hero` is a `'use client'` component. The `<h1>` (confirmed LCP element) is animated in via GSAP: `opacity: 0 → 1` starting after a `0.8s` delay with `1.2s` duration. This means the LCP element cannot be marked "visually complete" until JS has hydrated, GSAP has loaded/executed, and the fade-in has progressed — adding a hard floor of ~0.8-2s to LCP that no amount of image/video optimization can remove, on top of the video's network contention.
- **Fix:**
  - Render the H1 (and subtitle/CTA) server-side with full opacity by default (no inline animation-driven `opacity:0` starting state) and apply the GSAP entrance animation only as a progressive enhancement (e.g. animate `y`/`scale` but not `opacity` from 0, or use `autoAlpha` with a much shorter/no delay for the title specifically).
  - Alternatively, keep `Hero`'s static markup (title/subtitle/CTA) as a Server Component and isolate only the video/GSAP logic in a small client sub-component, so the title text is part of the server-rendered, non-JS-gated HTML and paints immediately.

## High

### 3. Raw `<img>` tags used almost everywhere instead of `next/image`
- **Evidence:** `grep -rl "next/image" src --include="*.tsx"` returns exactly **one** file (`src/app/[locale]/[category]/page.tsx`); `grep -rn "<img" src` returns 20+ matches across `AboutSection.tsx`, `Footer.tsx`, `Navbar.tsx`, `BlogOverview.tsx`, `a-propos/page.tsx`, `blog/page.tsx`, `blog/[slug]/page.tsx`, `[category]/page.tsx`, `[category]/[slug]/page.tsx`.
- **Issue:** These images bypass all of Next.js's built-in image optimization: no automatic WebP/AVIF re-encoding, no responsive `srcset`/`sizes` for viewport-appropriate downloads, no automatic lazy-loading below the fold, no CLS protection via inferred aspect ratio, and no CDN-level resizing. Team photos are served as `emma.JPG.jpeg` / `angele.jpg.jpeg` (double extensions strongly suggest an unoptimized raw upload — full-resolution camera JPEGs, likely 1-5MB+ each) directly from `/public`, downloaded at full size on every device regardless of the rendered thumbnail size.
- **Fix:** Replace `<img src="..." className="w-full h-full object-cover">` with `next/image`:
  ```tsx
  import Image from 'next/image';
  <Image src="/assets/a propos/emma.JPG.jpeg" alt="Emma Aglaé" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
  ```
  For above-the-fold hero/team images add `priority`. This alone should meaningfully cut transferred image bytes (WebP/AVIF re-encoding + responsive sizing) across `/a-propos`, `/blog`, and all `[category]`/`[slug]` tour pages, improving LCP on every non-homepage page and reducing CLS risk on pages where explicit `width`/`height`/aspect-ratio isn't already CSS-enforced.
- **Scope beyond homepage:** This is the dominant issue on `/fr/canyoning/canyon-artuby` (gallery-heavy) and `/fr/blog/3-activites-verdon-ete` (author photos, inline blog images) per source inspection — both routes render through `src/app/[locale]/[category]/[slug]/page.tsx` and `src/app/[locale]/blog/[slug]/page.tsx`, which use raw `<img>` for gallery/content images (e.g. `[category]/[slug]/page.tsx:349`, `blog/[slug]/page.tsx:218-221`).

### 4. Unnecessary image preload competing with critical resources on the homepage
- **Evidence:** Rendered `<head>` for `/fr` includes `<link rel="preload" as="image" href="/assets/a propos/flag-en.png"/>` alongside the two font preloads and the logo preload.
- **Issue:** `flag-en.png` is a small language-switcher flag icon, not a homepage LCP candidate. Preloading it consumes early connection/priority budget that should go to the font files and (once fixed per #1) the hero poster image. This preload appears to be an artifact of Next.js's automatic preload heuristics picking up an `<Image priority>` or similar used in a shared component (likely `Navbar.tsx`) rendered on every page.
- **Fix:** Locate the flag icon usage (likely in `Navbar.tsx`'s language switcher) and remove any `priority` prop / manual preload hint on it — it's below-the-fold-equivalent (a small UI control) and should lazy-load normally.

## Medium

### 5. Client-heavy `Hero` component increases Time to Interactive (10.6s observed)
- **Issue:** GSAP (`gsap` import) plus the video/animation logic all live in a `'use client'` component that must hydrate before the hero becomes interactive/animated. Combined with the 60MB video download saturating the network (delaying JS chunk fetch/parse too), TTI reached 10.6s in this lab run — well past the point most users would consider the page "ready."
- **Fix:** Once the video is fixed (#1) and the title isn't animation-gated (#2), re-measure; if TTI is still high, consider dynamically importing GSAP (`next/dynamic` with `ssr: false`) so it doesn't block the main JS bundle's parse/execute time for a purely decorative animation.

### 6. No explicit `width`/`height` on raw `<img>` tags — latent CLS risk
- **Issue:** All raw `<img>` tags found rely on parent-container CSS (`w-full h-full object-cover`) rather than intrinsic `width`/`height` attributes. CLS measured 0 on the homepage in this run because containers happen to have fixed heights via Tailwind classes today, but this is fragile — any future layout change (e.g. a responsive breakpoint without an explicit height) reintroduces layout shift with no safety net, since the browser doesn't know the image's aspect ratio ahead of load. `next/image` (fix #3) solves this automatically.

## Low

### 7. Double file extensions on public image assets suggest no image-optimization pipeline
- **Evidence:** `/assets/a propos/emma.JPG.jpeg`, `angele.jpg.jpeg`, `marie.JPG.jpeg` — filenames indicate a raw export/upload (camera JPEG renamed with an extra `.jpeg`) rather than a processed/compressed asset.
- **Fix:** Once migrated to `next/image` (fix #3), this becomes largely moot (Next.js re-encodes on the fly), but consider renaming source files during the migration for maintainability.

## Limitations of this audit

- No PageSpeed Insights/CrUX API key configured — all metrics above are **lab estimates**, not field data. Real-world 75th-percentile figures could be worse (slower devices/networks, especially for the 60MB video issue) or the site could already be failing CWV in the field for exactly this reason — this should be verified once API access is available.
- Only `/fr` received a full Lighthouse run (Performance score 75, LCP 5.27s, CLS 0, TBT 94ms) before the audit budget was cut short by the orchestrator.
- `/fr/canyoning/canyon-artuby` and `/fr/blog/3-activites-verdon-ete` were **not** lab-measured (no Lighthouse run) — findings for those pages are based on static source-code inspection of the shared components/routes they render through (`[category]/[slug]/page.tsx`, `blog/[slug]/page.tsx`), confirming the same `next/image` gap applies, but no LCP/CLS/TBT numbers are available for them. Recommend re-running Lighthouse against both once budget allows.
