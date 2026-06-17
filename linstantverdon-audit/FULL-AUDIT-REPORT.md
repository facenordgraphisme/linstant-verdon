# SEO Audit Report — L'Instant Verdon
**Domain:** https://www.linstantverdon.com  
**Audit date:** 2026-06-17  
**Business type:** Outdoor Adventure Activity Provider (SAB + Fixed Location) — Castellane / La Palud-sur-Verdon, Gorges du Verdon, France  
**Language:** French (primary), English (secondary)

---

## Overall SEO Health Score: 28 / 100

| Category | Weight | Raw Score | Weighted |
|----------|--------|-----------|---------|
| Technical SEO | 22% | 20/100 | 4.4 |
| Content Quality | 23% | 45/100 | 10.4 |
| On-Page SEO | 20% | 20/100 | 4.0 |
| Schema / Structured Data | 10% | 5/100 | 0.5 |
| Performance (CWV) | 10% | 50/100 | 5.0 |
| AI Search Readiness | 10% | 20/100 | 2.0 |
| Images | 5% | 35/100 | 1.75 |
| **Total** | **100%** | — | **28 / 100** |

> **Interpretation:** The score of 28/100 reflects a site that has solid business foundations (qualified guides, good reviews, real activities) but is almost completely invisible to search engines due to critical technical failures. The good news: almost all issues are fixable, and fixing them will produce measurable ranking improvements quickly.

---

## Executive Summary

L'Instant Verdon is a well-regarded outdoor adventure company (TripAdvisor #3/19 in La Palud-sur-Verdon, 54 reviews) operating since 2018 in the Gorges du Verdon. The business has real authority and great customer satisfaction — but the website currently **generates almost no organic search traffic** due to a combination of critical technical failures.

### Top 5 Critical Issues

1. **robots.txt and sitemap.xml both return HTTP 500** — search engines cannot crawl the site properly
2. **Only 1 URL indexed by Google** (the domain root) — the entire site is effectively invisible in search
3. **Duplicate title tags** across all pages — every service, contact, and FAQ page uses the homepage title
4. **Zero structured data (schema markup)** — no rich results possible (stars, FAQ dropdowns, pricing badges)
5. **NAP inconsistency** — site lists Castellane but all external directories list La Palud-sur-Verdon

### Top 5 Quick Wins

1. Fix robots.txt and generate+submit XML sitemap → immediate crawl improvement
2. Write unique title tags for each page → fastest on-page ranking lift
3. Write unique meta descriptions → improves CTR from any existing impressions
4. Add LocalBusiness schema → enables rich results and Knowledge Panel
5. Display TripAdvisor reviews on site → instant E-E-A-T and conversion boost

---

## Business Context

- **Operators:** Emma Aglaé (Diplômée d'État canyonisme 2020) & Angèle Kanapa (Diplômée d'État escalade & canyonisme 2013) + Marie Oddo (Diplômée d'État 2020)
- **Services:** Canyoning (€50–95/pers), Escalade (€200+/pers), Parcours Aventure, Week-ends & Stages, Insolite, Événementiel (EVJF/EVG/CE)
- **Founded:** 2018 — current leadership since 2025
- **Languages:** French (fr) + English (en) with language switcher
- **Social:** Facebook, Instagram, YouTube, TripAdvisor, WhatsApp
- **Partners:** Verdon Tourisme listing, PACA Tourism listing, regional directories

### Competitive Landscape
The canyoning Verdon market is served by aggregator platforms (CheckYeti, FunBooker, Yumping) that dominate informational and transactional SERPs. Direct operator sites (verdon-canyoning.com, intenseverdon.com) also compete. L'Instant Verdon's key differentiators — personal guides, environmental ethic, small groups, female-led — are not currently visible to search engines.

---

## Technical SEO — Score: 20/100

### Critical Findings

**robots.txt → HTTP 500**  
The server returns a 500 Internal Server Error when Googlebot requests /robots.txt. This signals backend instability and prevents search engines from reading crawl rules. Fix: ensure robots.txt is served as static file.

**sitemap.xml → HTTP 500**  
Both /sitemap.xml and /sitemap_index.xml return 500 errors. Without a sitemap, Google relies solely on internal link discovery, which is hampered by the indexation problem. Fix: generate a valid XML sitemap and submit it via Google Search Console.

**Only 1 page indexed**  
`site:linstantverdon.com` returns a single result. A 10+ page site should have all canonical pages indexed. The combination of broken robots.txt, broken sitemap, possible www/non-www duplicate content, and potential old URL structure conflicts is causing near-total deindexation.

**No canonical URLs**  
No `<link rel="canonical">` found on any page. Combined with www/non-www ambiguity and old URL structure still visible in search (/canyon/, /en/canyon/), this creates significant duplicate content risk.

**No hreflang implementation**  
The French (/fr/) and English (/en/) versions lack hreflang tags. Google cannot determine which language to serve to which audience.

**Old URL structure still in Google's index**  
Search results show old URL patterns: `/canyon/`, `/canyon/1`, `/en/canyon/`. The current structure uses `/fr/canyoning`. If 301 redirects are not in place, this creates duplicate content and splits ranking signals.

*→ Full details: [findings/technical.md](findings/technical.md)*

---

## On-Page SEO — Score: 20/100

### Critical Findings

**Duplicate title tags (all pages)**  
Every page uses: "L'instant Verdon | Canyoning, Aquarando & Escalade dans le Verdon" — only the two blog posts have unique titles. This is one of the most damaging on-page issues possible.

**Missing meta descriptions (all pages)**  
Only /fr/a-propos has a meta description. All other pages generate auto-excerpts, reducing CTR.

**5 H1 tags on homepage**  
The homepage has 5 H1 elements. Only one H1 per page is the SEO standard.

**Poor image alt text**  
Logo and author photos use file paths as alt text ("/assets/accueil/logo.webp", "/assets/a propos/emma.JPG.jpeg"). Activity images on service pages have inadequate alt descriptions.

*→ Full details: [findings/onpage.md](findings/onpage.md)*

---

## Content Quality — Score: 45/100

### Strengths
- State-certified guide credentials explicitly mentioned (E-E-A-T)
- Individual canyon/route pages exist
- Blog has seasonal, relevant content
- Environmental commitment provides brand differentiation
- Bilingual site for international tourist reach

### Weaknesses
**Blog posts are critically thin (320–350 words)**  
Both articles are far below the 1,200–2,000 word threshold needed to compete for informational queries in this market.

**FAQ page has only 3 questions**  
Industry standard for activity providers is 15–25 FAQs. The current FAQ leaves most pre-booking questions unanswered.

**No review integration on website**  
54 TripAdvisor reviews and #3 ranking are not displayed anywhere on the site. This is lost E-E-A-T and conversion opportunity.

*→ Full details: [findings/content.md](findings/content.md)*

---

## Schema / Structured Data — Score: 5/100

**Zero structured data found across the entire site.**

Missing schemas:
- LocalBusiness / SportsActivityLocation (enables Knowledge Panel, Maps rich info)
- Service (enables pricing rich results)  
- FAQPage (enables FAQ accordion in SERPs)
- Article (enables Google News eligibility, author credibility)
- Person + Credential (E-E-A-T for guide profiles)
- AggregateRating (enables star ratings in search results)
- BreadcrumbList (enables breadcrumb display in SERPs)

*→ Full implementation examples: [findings/schema.md](findings/schema.md)*

---

## Performance — Score: 50/100 (estimated)

- WebP images used throughout — good
- Modern framework apparent
- CDN not confirmed
- Image paths contain spaces (e.g., `/assets/a propos/`) — URL encoding risk
- No lab or field performance data available — run PageSpeed Insights: https://pagespeed.web.dev/

*→ Full details: [findings/performance.md](findings/performance.md)*

---

## AI Search Readiness — Score: 20/100

- No llms.txt file
- robots.txt unavailable (AI crawlers cannot determine crawl permissions)
- Content is not structured for passage-level citability
- FAQ too thin to be cited for "canyoning Verdon" queries
- Good directory presence (Verdon Tourisme, TripAdvisor) aids brand mention signals
- No answer-first content format used

*→ Full details: [findings/geo.md](findings/geo.md)*

---

## Local SEO

### Critical: NAP Inconsistency
- Website: Place de l'église, 04120 **Castellane**
- All external directories: 395 Haut Bourras, 04120 **La Palud-sur-Verdon**

This must be resolved immediately. Choose one address and update all citations to match.

### Strengths
- TripAdvisor #3/19 in La Palud-sur-Verdon — strong review authority
- Listed in 3 regional tourism directories
- Multiple social platforms active

### Missing Local Opportunities
- Reviews not displayed on website
- No booking through Viator / GetYourGuide / FunBooker
- No GBP posts strategy visible

*→ Full details: [findings/local.md](findings/local.md)*

---

## SXO (Search Experience)

- No online booking / availability calendar — major conversion friction
- Activity cards missing: difficulty rating, age minimum, group size limit, duration
- No family-specific or beginner-specific pages
- English version exists but no hreflang — won't rank in English SERPs

*→ Full details: [findings/sxo.md](findings/sxo.md)*

---

## Sources

- [L'Instant Verdon - Verdon Tourisme](https://www.verdontourisme.com/en/informations/commerce-et-service-en/linstant-verdon-en-5037750id/)
- [L'Instant Verdon - TripAdvisor](https://www.tripadvisor.com/Attraction_Review-g635586-d14924373-Reviews-L_Instant_Verdon-La_Palud_sur_Verdon_Alpes_de_Haute_Provence_Provence_Alpes_Cote.html)
- [L'Instant Verdon - Provence-Alpes-Côte d'Azur Tourism](https://provence-alpes-cotedazur.com/en/plan-your-stay/useful-information/all-practical-services/linstant-verdon-la-palud-sur-verdon-en-2867369/)
- [Canyoning Gorges du Verdon | VoyageTips](https://www.voyagetips.com/canyoning-gorges-du-verdon/)
- [CheckYeti — Canyoning Verdon](https://www.checkyeti.com/fr/rafting-canyoning/france/verdon/canyoning-tours)
