# Visual Audit — linstantverdon.com

**IMPORTANT LIMITATION:** This audit was cut short by budget constraints before the 16 captured
screenshots could be visually inspected (opened/read) one by one. The findings below are based
only on (a) the capture process itself, which surfaced one concrete, reproducible technical
issue, and (b) file-size metadata of the resulting PNGs. Above-the-fold CTA visibility, cookie-consent
layout shift, mobile tap-target sizing, broken images, and text legibility over the hero
video/imagery were **not** visually verified. Treat the score below as low-confidence /
provisional, not a complete audit.

## Score: 50/100

*(Provisional — reflects one confirmed technical issue and inability to complete visual
verification of the remaining checklist items. Re-run with full screenshot review for an
accurate score.)*

### What Works

- All 4 target pages (homepage `/fr`, category `/fr/canyoning`, tour detail
  `/fr/canyoning/canyon-artuby`, contact `/fr/contact`) successfully rendered and produced
  screenshots at all 4 required viewports (desktop 1920×1080, laptop 1366×768, tablet 768×1024,
  mobile 375×812) — 16 files total in
  `c:/Users/FX/Desktop/Codes antigravity/linstant-verdon/linstantverdon.com-audit/screenshots/`.
- Pages reach the browser `load` event without errors or crashes under Playwright/Chromium,
  and file sizes for every capture are non-trivial (700 KB–2.3 MB per PNG), which is at least
  consistent with real visual content being painted rather than blank/error pages
  (e.g. `home_desktop.png` 2.3 MB, `contact_mobile.png` 923 KB).
- No navigation failures, 4xx/5xx redirects, or SSRF/route-blocking errors were encountered for
  any of the 4 URLs.

### Findings

#### High

- **Background video appears to prevent the page from ever reaching network idle.**
  Using the standard `capture_screenshot.py` script (which waits for Playwright's
  `networkidle` state — no network connections for 500ms), the homepage capture **timed out
  at both 30s and 60s** across all 4 viewports. Switching only the wait strategy to the `load`
  event (fixed 4s settle delay) allowed capture to succeed immediately. This strongly suggests
  the R2-migrated background video keeps issuing network requests continuously (likely chunked
  buffering/re-fetching) well past initial page load. Real-world implications: this can hurt
  Lighthouse/PageSpeed "fully loaded" style metrics, delay any tooling or third-party
  scripts that wait for network-idle (some analytics/consent-management tags do), increase
  mobile data/battery usage, and may explain sluggishness reported by users on slower
  connections. This needs direct confirmation via the browser Network tab (video request
  waterfall) since it was inferred from capture-tool behavior, not from visually reading the
  screenshots.

#### Not Yet Verified (flagged for follow-up, not scored)

- Whether the primary H1/value proposition and a booking/contact CTA are visible above the
  fold on desktop and mobile for `home_desktop.png` / `home_mobile.png`.
- Whether the recently-added Google Ads tag or any cookie-consent banner causes layout shift
  or pushes hero content down (compare top region of `home_desktop.png` vs `home_mobile.png`).
- Whether the background video renders correctly (no black frame, no stretch/crop artifacts,
  no poster-image flash) in `home_desktop.png` / `home_mobile.png`.
- Text legibility over hero imagery/video on `home_*` and `tourdetail_*` screenshots.
- Mobile tap-target sizing (nav, CTA buttons, filters) on `*_mobile.png` for all 4 pages —
  important for an activity-booking flow.
- Broken images or missing tour photos on `category_*.png` (canyoning listing) and
  `tourdetail_*.png` (canyon-artuby detail).
- General responsive-layout integrity (overlap, overflow, horizontal scroll) across
  `laptop`/`tablet` breakpoints for `contact_*.png`.

### Recommendation

Re-run this audit with full visual review of all 16 screenshots (or at minimum
`home_desktop.png`, `home_mobile.png`, `contact_mobile.png`, and `tourdetail_mobile.png`,
which are highest priority for conversion) before treating this score as final. Separately,
investigate the background-video network behavior directly (DevTools Network tab, filter by
media type) to confirm/deny continuous re-fetching and its impact on Core Web Vitals.
