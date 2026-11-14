# Google SEO Data (Tier 1: API key + service account; GA4 not configured)
Source: Google API (field data). Property: sc-domain:linstantverdon.com (permission siteRestrictedUser). GSC lag 2-3 days; last 3 days incomplete. Raw: raw/gsc-*.json

## Key numbers (GSC, web)
| Window | Clicks | Impr. | CTR | Avg pos |
|---|---|---|---|---|
| 3 months (2026-08-11..11-14) | 307 | 10,146 | 3.03% | 10.2 |
| Last 28 d (10-18..11-14) | 35 | 1,424 | 2.46% | 12.3 |
| Apr1-Jun16 (pre-relaunch, 77d) | 281 | 10,321 | 2.72% | 8.1 |
| Jun17-Jul31 (post-relaunch) | 436 | 11,897 | 3.66% | 10.9 |
| Aug | 299 | 6,739 | 4.44% | 9.1 |
| Sep | 87 | 3,365 | 2.59% | 10.1 |
| Oct | 53 | 2,184 | 2.43% | 11.1 |
Weekly clicks: 20,19,10,15,13,11,11,9 (wk 14 Sep -> 2 Nov): steady decline; impressions 760 -> 373/wk; avg position 9-12 -> 13.2.
Note: the Apr-Jun and Jul-Aug highs are partly seasonal (summer canyoning/climbing demand) - no prior-year baseline is available for the new site.

## Trend / causality
- Relaunch 2026-06-17: July impressions x2.7 vs June (3.7k -> 10.3k) and clicks x3.3; avg position worsened 8.0 -> 11.3 (more queries ranked, broader but lower). Consistent with relaunch + summer seasonality; not separable.
- Performance deploy ~2026-11-06: no visible effect yet. Nov 1-5 ~2.4 clicks/day, Nov 6-14 4 clicks in 9 days (impr 236 / 9d ~ 26/d vs ~51/d late Oct, but last 3 days are incomplete). Too little data; decline predates the deploy (began after Aug peak). Do not attribute.
- Google updates in window (seo_updates.py, verified 2026-10-22): only September 2026 Spam Update (2026-09-24) is a ranking-relevant one; all others are documentation/product changes (Search Console multimodal reporting 09-24, etc.). Weekly clicks fell 20 -> 10 in the week of 28 Sep, just after the Spam Update, but the site had been declining from Aug already and traffic is tiny (~10 clicks/wk) - correlation only, low confidence. Seasonal decline (end of summer) is the most plausible driver. No core update listed since June 2026 in the tool.

## Segments (3 months)
- Devices: mobile 248 clk / 6,854 impr (CTR 3.62%, pos 6.8); desktop 58 / 3,223 (1.8%, pos 17.4); tablet 1. Desktop ranking is far worse (pos 17-21 vs 7) - investigate.
- Countries: FR 267 clk / 7,185 impr; BE 8; GB 8 / 178; DE 7 / 287; AT 4; US 4 / 363 (CTR 1.1%); CH 3; IT 3 / 208.
- Pages (3m): `http://linstantverdon.com/` 175 clk / 6,728 impr (pos 6.1; mostly brand); /fr 65 clk / 1,165 (pos 23.1); /fr/escalade 8 / 640 (pos 18.7); /fr/aventures/trou-du-renard 7 / 353; /en/canyoning/canyon-baudan-baou 6 / 393; /fr/canyoning 6 / 438 (pos 11.7).
- FR vs EN pages (3m): FR 106 clk / 3,377 impr (27 pages, CTR 3.14%, pos 15.8); EN 28 clk / 1,601 impr (39 pages, CTR 1.75%, pos 10.4); root/http 176 clk. 28d: FR 20 clk / 630 impr, EN 5 / 323. EN is ~1/3 of FR volume.
- Top queries: brand "l'instant verdon" 60 clk (CTR 42%, pos 2.4), "instant verdon" 34 clk (47%, pos 1). Brand = ~30% of clicks; non-brand is almost non-existent. 404 distinct queries in 3m (GSC anonymizes some).

## Opportunities
| Severity | Query / page | Data | Action |
|---|---|---|---|
| High | "canyoning verdon" | 387 impr, 2 clk, pos 17, CTR 0.52% | Strengthen /fr/canyoning (title, H1, internal links, content) to reach top 10 |
| High | "via ferrata (gorge/gorges) du verdon" | 161+134 impr, pos 7-8, CTR ~1% (query "via ferrata verdon": 268 impr, 10 clk, pos 4.7) | Rewrite title/meta of the via ferrata page; check it exists as distinct page |
| High | "canyoning (gorges du) verdon" variants | 155+95+51 impr, pos 3-17 | Same canyoning hub; consolidate keyword variants |
| Medium | "verdon climbing" / "stage escalade verdon" / "escalade verdon" | 141 impr pos 6.3, 0 clk; 211 impr pos 35; 69 impr pos 12.7 | Optimise /en/climbing and /fr/stages, /fr/escalade titles; /fr/escalade has 640 impr, CTR 1.25% |
| Medium | "baudan", "balene", "trou du renard", "vertical verdon" | 90/73/49/112 impr, 0-1 clk | Titles/meta for canyon pages; trou-du-renard page 353 impr, pos 9.3 |
| Medium | /fr (home FR) avg pos 23 | 1,165 impr | Google mostly shows root `http://linstantverdon.com/` for brand; non-brand home queries rank poorly |
| Low | US impressions (363, CTR 1.1%) | EN pages | Low intent; ignore |

## Indexation (URL Inspection, all PASS)
| URL | Status | Google canonical = declared | Last crawl |
|---|---|---|---|
| /fr | Submitted and indexed | yes | 2026-11-09 |
| /en | Submitted and indexed | yes | 2026-11-02 |
| /fr/canyoning | Submitted and indexed | yes | 2026-11-01 |
| /fr/escalade | Submitted and indexed | yes | 2026-11-11 |
| /fr/canyoning/canyon-artuby | Submitted and indexed | yes | 2026-10-27 |
| /fr/stages/multi-activit%C3%A9-3-jours | Submitted and indexed | yes | 2026-07-20 (stale: 4 months, low crawl priority) |
| /fr/blog/3-activites-verdon-ete | Submitted and indexed | yes | 2026-11-12 |
| /en/climbing | Submitted and indexed | yes | 2026-11-10 |
All: robots allowed, fetch successful, crawled as MOBILE. Mobile usability: API field deprecated (no verdict available; rely on PSI/Lighthouse). Rich results: Review snippets detected on /fr (no issues).
Issue (Medium): /fr/stages/multi-activit-3-jours last crawled 2026-07-20 - improve internal links / request indexing.

## Sitemaps (GSC)
- https://www.linstantverdon.com/sitemap.xml: submitted 2026-08-07, 60 URLs, 0 errors, 0 warnings, not pending. (Local sitemap fetch should be compared to 60.)
- https://linstantverdon.com/sitemap-0.xml: last submitted 2026-05-04, 55 URLs, 0 errors - STALE legacy sitemap (old site, non-www). Severity Medium: delete it from GSC (it may list old URL structure); only keep the www sitemap.
- Also: GSC reports `http://linstantverdon.com/` as the top page (175 clicks) - the HTTP/non-www root still surfaces in results. Verify http->https and non-www->www 301s and that the root `/` redirects to /fr in one hop. (Severity Medium)
