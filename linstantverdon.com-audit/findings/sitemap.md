# Sitemap Audit — linstantverdon.com

## Score: 55/100

Sound technical foundation (valid XML, correct hreflang alternates computed, robots.txt wired up correctly, no scale/thin-content risk) undermined by one major coverage gap — the entire `/en` locale is absent from the sitemap as first-class entries — and a related duplicate-content/self-canonicalizing bug discovered while verifying `/en` pages, which compounds indexation risk for a recently-relaunched, previously-deindexed site.

---

### What Works

- **XML is valid**: parses cleanly, 30 unique `<url>` entries (note: task brief said 21 — actual live count is **30**, all unique, no duplicate `<loc>`), well under the 50,000-URL/file limit — no index-file split needed.
- **`hreflang` alternates are correctly computed** for every entry (`fr` self + `en` counterpart), including locale-specific slug translation (e.g. `escalade` → `climbing`, `aventures` → `adventure`) via the `categoryUrlMap` in `src/app/sitemap.ts` — the correct `/en/...` URLs are already known to the code, they're just never emitted as their own `<url>` blocks.
- **robots.txt correctly references** `https://www.linstantverdon.com/sitemap.xml` and disallows `/studio/` (Sanity Studio, correctly kept out of both crawl and sitemap).
- **No location-page doorway risk**: activity pages (canyons, climbing routes, adventure courses) are individually differentiated real content, not a programmatic city/location template — the 30/50-page quality gates for thin location pages don't apply here. No orphan pages identified; every route in `src/app/[locale]/` (home, 6 categories, a-propos, faq, blog index, contact, blog posts, activity details) is represented in the sitemap for the `fr` locale.
- **`sitemap.ts` is dynamically generated** from Sanity (posts + activities) rather than hand-maintained static XML — the right architecture, just incomplete.

---

### Findings

#### 🛑 Critical — Entire `/en` locale missing from sitemap
`src/app/sitemant.ts` generates one `<url>` entry per page for the `fr` locale only, embedding the `/en` URL solely inside `<xhtml:link rel="alternate" hreflang="en">`. Per Google's own documentation, hreflang annotations inside a sitemap **only apply to the URL they're attached to** — they do not cause the referenced alternate URL to be discovered, crawled, or treated as a first-class page. Google explicitly recommends listing every localized URL as its own `<url>` entry with its own full set of alternates.

Verified this is a real, actionable gap, not a false alarm:
- `https://www.linstantverdon.com/en` → **200**, prerendered (`X-Nextjs-Prerender: 1`), `<html lang="en">`, distinct translated content, self-referencing `<link rel="canonical" href=".../en">` — fully indexable, standalone page.
- `https://www.linstantverdon.com/en/canyoning/canyon-artuby` → same: 200, prerendered, self-canonical, unique English content.
- No `noindex` on any sampled `/en` page.

Net effect: **30 fully live, unique, self-canonical, indexable pages (the entire English site) have zero sitemap presence.** For a site that was previously deindexed and relaunched 2026-06-17, this materially slows discovery/reindexing of half the site's URL surface.

Caveat to flag alongside the fix: the `/en` homepage's extracted text still contains untranslated French strings ("Là où l'aventure rencontre la nature", "Le Syndicat Local", "Fondé en 2018") — worth a translation pass before/alongside boosting `/en` crawl priority, so newly-surfaced pages don't read as low-quality mixed-language content.

#### 🔴 High — Self-canonicalizing duplicate category/activity URLs (found while validating the `/en` gap)
`src/app/[locale]/[category]/page.tsx` and `.../[category]/[slug]/page.tsx` build `generateStaticParams()` from a flat list of **both** language variants of each category slug (`canyoning`/`canyon`, `escalade`/`climbing`, `aventures`/`adventure`, `insolite`/`unusual-activities`, `stages`/`weekend`) crossed with **both** locales — not just the correct locale↔slug pairing. This statically generates and serves the "wrong-language" combination too, and `generateMetadata()` sets `canonical: `/${locale}/${category}`` — i.e. it always canonicalizes to *itself*, never to the correct URL.

Confirmed live, 200, self-canonical:
- `/en/escalade` (should redirect/canonicalize to `/en/climbing`) — canonical points to `/en/escalade`
- `/fr/climbing` (should be `/fr/escalade`) — canonical points to `/fr/climbing`
- `/en/canyon`, `/fr/canyon` (aliases of `/en/canyoning`, `/fr/canyoning`) — same pattern
- Same bug replicated at the activity level, e.g. `/en/escalade/escalade-grande-voie` — 200, self-canonical, duplicate of `/en/climbing/escalade-grande-voie`

This produces **~15 extra live, crawlable, self-canonical duplicate pages** not in the sitemap (correctly excluded there) but discoverable by direct crawl/URL-pattern guessing, with no `noindex` and no redirect to the true canonical. This is exactly the "penalty risk" pattern called out for programmatic duplicates — not location pages, but the mechanism (auto-generated URL variants with self-referencing canonical instead of pointing to one true URL) is the same failure mode. Recommend fixing this in the same pass as the sitemap fix: either 301-redirect the wrong-language variant to the correct one, or restrict `generateStaticParams()` to only the correct locale↔slug pairs and let the mismatched combination 404.

#### ℹ️ Info — `priority` and `changefreq` present
Every entry sets `<priority>` and `<changefreq>`. Google has confirmed both are ignored for ranking/crawl-scheduling purposes. Not harmful, but dead weight — safe to remove from `sitemap.ts` to simplify output (Bing/other engines give them negligible weight too).

#### 🔵 Low — Static-page `lastmod` is generation time, not content time
In `sitemap.ts`, `staticEntries` use `lastModified: now` (the timestamp of the sitemap request/build), which is why all 11 static pages share the identical `2026-07-09T15:31:08.972Z` value in the live XML — this isn't when those pages actually last changed, it's just when the sitemap was last generated. Blog posts and activities correctly use real `publishedAt`/`_updatedAt` from Sanity. Recommend tracking a real "last content change" date for static pages too (e.g. via a Sanity singleton per static page, or git/CMS metadata), since an always-current `lastmod` on unchanged pages erodes its usefulness as a freshness signal.

---

### Missing / Extra Pages Summary

| Category | Result |
|---|---|
| Missing from sitemap (should be there) | All 30 `/en/...` equivalents of existing `/fr/...` entries |
| Extra in sitemap (404/redirected/noindexed) | None — spot-checked entries are live 200s |
| Live pages outside sitemap, not flagged as missing (correctly excluded but risky) | ~15 duplicate wrong-locale category/activity URLs (see High finding above) |
| >50k URL limit | Not triggered (30 URLs) |
| Orphan pages in crawl not in sitemap | None identified for `fr`; the `/en` set is the orphan risk |

---

### Recommended Fix

Fix in `src/app/sitemap.ts` (this project's convention — not static XML). Emit one `<url>` entry per locale per page, reusing the already-correct `categoryUrlMap`:

```ts
// Replace staticEntries generation with locale-aware emission:
const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap(({ fr, en, changeFreq, priority }) => {
  const frUrl = `${BASE}/fr${fr ? `/${fr}` : ''}`
  const enUrl = `${BASE}/en${en ? `/${en}` : ''}`
  const languages = { fr: frUrl, en: enUrl }
  return [
    { url: frUrl, lastModified: now, changeFrequency: changeFreq, priority, alternates: { languages } },
    { url: enUrl, lastModified: now, changeFrequency: changeFreq, priority, alternates: { languages } },
  ]
})

// Same pattern for postEntries and activityEntries: emit both
// `${BASE}/fr/blog/${post.slug}` AND `${BASE}/en/blog/${post.slug}`,
// and both `${BASE}/fr/${map.fr}/${activity.slug}` AND `${BASE}/en/${map.en}/${activity.slug}`,
// each with the same `alternates.languages` object pointing at both.
```

This doubles the sitemap to ~60 URLs (still trivially under the 50k cap) and gives Google a first-class discovery path to every English page — critical for reindexing speed post-relaunch. Pair this with the canonical/duplicate-URL fix in `[category]/page.tsx` and `[category]/[slug]/page.tsx` (restrict `generateStaticParams()` to correct locale↔slug pairs, or 301 the mismatched combinations) so the newly-crawled `/en` pages don't lead Googlebot into the duplicate-URL trap alongside them. Also drop `priority`/`changeFrequency` if simplifying, and replace `lastModified: now` for static pages with a real content-change timestamp once available.
