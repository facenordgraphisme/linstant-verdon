# Technical SEO Findings — linstantverdon.com
**Audit date:** 2026-06-17  
**Score: 20 / 100**

---

## CRITICAL

### 1. robots.txt returns HTTP 500
- **URL:** https://www.linstantverdon.com/robots.txt
- **Observed:** Server returns 500 Internal Server Error
- **Impact:** Googlebot cannot read crawl rules. When robots.txt is unreachable, search engines may fall back to crawling everything — or some bots may refuse to crawl entirely. Either way, it signals a server error visible to crawlers.
- **Fix:** Ensure a valid robots.txt is served at the root. Minimum content:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://www.linstantverdon.com/sitemap.xml
  ```

### 2. sitemap.xml returns HTTP 500
- **URLs tested:** /sitemap.xml, /sitemap_index.xml
- **Observed:** Both return 500 Internal Server Error
- **Impact:** Google has no machine-readable list of URLs to crawl. Combined with very low indexation (see below), this is a primary cause of the site being nearly invisible in search.
- **Fix:** Generate and serve a valid XML sitemap covering all canonical pages. Submit it in Google Search Console.

### 3. Critically low Google indexation
- **Observed:** `site:linstantverdon.com` returns only 1 result (the domain root)
- **Expected:** A site with 10+ pages should have most pages indexed
- **Root causes:** Broken sitemap, broken robots.txt, possible www/non-www canonical confusion, possible noindex tags not yet confirmed, old URL structure still being indexed
- **Impact:** The vast majority of site content is invisible to search engines
- **Fix:** Fix sitemap → submit to GSC → monitor indexation coverage report weekly

### 4. No canonical URLs declared on any page
- **Observed:** No `<link rel="canonical">` tag found on any page checked (homepage, canyoning, escalade, contact, faq, blog, blog posts)
- **Impact:** Without canonicals, search engines must guess the preferred URL. With www/non-www versions both potentially serving content, this creates duplicate content risk.
- **Fix:** Add canonical self-referencing tags to every page. Example:
  ```html
  <link rel="canonical" href="https://www.linstantverdon.com/fr/canyoning" />
  ```

---

## HIGH

### 5. No hreflang implementation
- **Observed:** Site has French (/fr/) and English (/en/) versions but no hreflang attributes on any page
- **Impact:** Google doesn't know which language version to serve to which audience. English content may compete with French content for the same queries.
- **Fix:** Add hreflang tags on all pages:
  ```html
  <link rel="alternate" hreflang="fr" href="https://www.linstantverdon.com/fr/" />
  <link rel="alternate" hreflang="en" href="https://www.linstantverdon.com/en/" />
  <link rel="alternate" hreflang="x-default" href="https://www.linstantverdon.com/fr/" />
  ```

### 6. Old URL structure still indexed / no redirects confirmed
- **Observed:** Search results show old URL patterns: `/canyon/`, `/canyon/1`, `/en/canyon/` alongside new `/fr/canyoning/` structure
- **Impact:** Link equity split across old and new URLs; broken backlinks; duplicate content
- **Fix:** Implement 301 redirects from all old URL patterns to new canonical URLs

### 7. www vs. non-www redirect status unclear
- **Observed:** Both `www.linstantverdon.com` and `linstantverdon.com` appear in search results. The non-www domain content is unclear.
- **Impact:** Potential duplicate content; split PageRank
- **Fix:** Pick one version (recommend www) and 301-redirect the other permanently

---

## MEDIUM

### 8. HTTPS implemented correctly
- All observed pages load over HTTPS — positive signal

### 9. No X-Robots-Tag security headers observed
- Could add `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN` as security best practice

### 10. Server error rate
- Multiple 500 errors (robots.txt, sitemap.xml, sitemap_index.xml) suggest backend instability or misconfiguration
- **Fix:** Check server logs for recurring 500 errors; may indicate Next.js/Node.js routing issue
