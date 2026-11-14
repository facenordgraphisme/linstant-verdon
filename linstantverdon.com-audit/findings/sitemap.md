# Sitemap: findings (2026-11-14)

**Score: 82/100**

## What works
- `/sitemap.xml` is static (prerendered), declared in robots.txt, 60 URLs, **all 60 return 200**.
- Every indexable page from the crawl (60/60) is in the sitemap; no orphans, no redirects, no 404s.
- FR and EN each get their own `<url>` entry with reciprocal `xhtml:link` hreflang annotations (120), fixing August's item 5.
- `lastmod` for activities and blog posts comes from Sanity (`_updatedAt` / `publishedAt`).

## Findings

| Severity | Finding | Evidence | Fix (`src/app/sitemap.ts`) |
|---|---|---|---|
| Medium | 8 `<loc>` values contain raw unescaped accents (`multi-activité-3-jours`, `soirée-insolite-portaledge`, `escalade-demi-journée-découverte`). The sitemap protocol requires URL-escaped values. A raw UTF-8 request to these URLs returns **HTTP 500** on Vercel (the encoded form returns 200). | `raw/sitemap.xml` | Wrap path segments in `encodeURI()` when building URLs. Longer term, rename the slugs without accents in Sanity, with 308 redirects from the old ones. |
| Low | Static pages get `lastModified: new Date()`, regenerated at each build/revalidation, so `lastmod` always says "today". Google ignores `lastmod` that is systematically inaccurate. | `sitemap.ts` (the `now` variable) | Use a fixed date per static page, or the date of the last real content change. |
| Low | No `x-default` in the sitemap hreflang annotations (the pages' `<head>` do have one on category pages). | `raw/sitemap.xml` | Add `'x-default': frUrl` in `alternates.languages`. |
| Info | `priority` and `changefreq` are ignored by Google. Harmless. | | Optional cleanup. |
