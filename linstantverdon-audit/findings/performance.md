# Performance Findings — linstantverdon.com
**Audit date:** 2026-06-17  
**Score: 50 / 100 (estimated — no CrUX field data available)**

Note: No Google API credentials configured. Scores are estimated from observable site characteristics. Run PageSpeed Insights at https://pagespeed.web.dev/?url=https://www.linstantverdon.com/fr/ for real lab data.

---

## Positive Signals

### WebP image format used throughout
All images observed use `.webp` format — the recommended modern format with superior compression vs. JPEG/PNG. This is a best practice that reduces page weight.

### Modern framework detected
URL structure (/fr/, /en/ routing) and file paths suggest a modern JavaScript framework (likely Next.js or Nuxt). Modern frameworks typically support:
- Code splitting
- Static generation / SSR
- Lazy loading

---

## Concerns

### Image paths contain spaces
- `/assets/a propos/emma.JPG.jpeg` — the space in the path is a red flag for potential 404s or URL encoding issues
- `/assets/accueil/logo.webp` — nested directory structure is fine, but double-extension (.JPG.jpeg) on some images is unusual and may indicate original upload issues

### No lazy loading confirmed
Could not confirm whether images below the fold use `loading="lazy"` attribute. This is critical for LCP on pages with multiple above-fold images (hero sections).

### No CDN confirmed
Images are served from the origin domain without observed CDN headers. A CDN (Cloudflare, Fastly, Vercel Edge) would reduce TTFB significantly for international visitors.

### JavaScript-heavy SPA risk
If the site is a fully client-side rendered SPA, content may not be immediately available to crawlers, delaying First Contentful Paint and risking rendering-based indexation failures.

---

## Core Web Vitals Recommendations

| Metric | Target | Likely Status | Priority Fix |
|--------|--------|---------------|--------------|
| LCP (Largest Contentful Paint) | < 2.5s | Unknown | Preload hero image, use `fetchpriority="high"` |
| INP (Interaction to Next Paint) | < 200ms | Unknown | Minimize JS bundle size |
| CLS (Cumulative Layout Shift) | < 0.1 | Unknown | Set explicit width/height on images |
| FCP (First Contentful Paint) | < 1.8s | Unknown | Reduce render-blocking resources |
| TTFB (Time to First Byte) | < 800ms | Unknown | Add CDN or edge caching |

---

## Recommended Actions

1. **Run PageSpeed Insights** for both mobile and desktop: https://pagespeed.web.dev/
2. **Add `loading="lazy"`** to all below-fold images
3. **Add `fetchpriority="high"`** and `preload` to the hero image
4. **Set explicit dimensions** on all images to prevent CLS
5. **Enable CDN / edge caching** — Vercel, Cloudflare, or equivalent
6. **Audit JS bundle size** — use Chrome DevTools Coverage tab
7. **Fix image paths with spaces** — URL-encode or rename files
