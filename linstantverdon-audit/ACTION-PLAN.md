# SEO Action Plan — L'Instant Verdon
**Domain:** https://www.linstantverdon.com  
**Audit date:** 2026-06-17

---

## Phase 1 — Critical Fixes (Week 1)
*These blocks indexation and must be done before anything else.*

### 1.1 Fix robots.txt (30 min)
- Create a valid static robots.txt served at https://www.linstantverdon.com/robots.txt
- Content:
  ```
  User-agent: *
  Allow: /
  
  User-agent: GPTBot
  Allow: /
  
  User-agent: ClaudeBot
  Allow: /
  
  Sitemap: https://www.linstantverdon.com/sitemap.xml
  ```
- Test: `curl -I https://www.linstantverdon.com/robots.txt` should return 200

### 1.2 Generate and submit XML sitemap (2 hours)
- Create sitemap covering all canonical URLs:
  - `/fr/`, `/fr/canyoning`, `/fr/escalade`, `/fr/aventures`, `/fr/stages`, `/fr/insolite`, `/fr/evenementiel`
  - `/fr/a-propos`, `/fr/faq`, `/fr/blog`, `/fr/contact`
  - `/fr/blog/3-activites-verdon-ete`, `/fr/blog/3-activites-verdon-printemps`
  - All individual canyon/route/activity pages
  - English equivalents: `/en`, `/en/canyon/`, etc.
- Include lastmod, changefreq, priority
- Submit to Google Search Console: https://search.google.com/search-console/
- Submit to Bing Webmaster Tools: https://www.bing.com/webmasters/

### 1.3 Set up canonical URLs on all pages (2 hours)
- Add `<link rel="canonical" href="https://www.linstantverdon.com[PATH]" />` to every page
- Ensures www is the canonical version
- Prevents duplicate content between www and non-www

### 1.4 Implement 301 redirects for old URL structure (1 hour)
- Redirect `/canyon/*` → `/fr/canyoning/*`
- Redirect `/en/canyon/*` → `/en/canyon/*` (or appropriate new path)
- Redirect old paths found in Google index to their current equivalents
- Test all redirects return 301 status codes

### 1.5 Fix www vs. non-www redirect (30 min)
- Confirm non-www (`linstantverdon.com`) 301-redirects to `www.linstantverdon.com`
- Test: `curl -I http://linstantverdon.com/` should show `Location: https://www.linstantverdon.com/`

### 1.6 Resolve NAP inconsistency (1 hour)
- Decide on ONE canonical address
- Update website to match external directories OR update all external directory listings
- Update: Verdon Tourisme, Provence-Alpes-Côte d'Azur Tourism, TripAdvisor, Facebook, Google Business Profile

---

## Phase 2 — High-Impact Improvements (Weeks 2–3)

### 2.1 Write unique title tags for every page (2 hours)
See recommended titles in [findings/onpage.md](findings/onpage.md). Key principle: each title should contain the primary keyword for that page + brand name.

### 2.2 Write unique meta descriptions for every page (2 hours)
150–160 characters, action-oriented, include main keyword and location. See examples in [findings/onpage.md](findings/onpage.md).

### 2.3 Fix H1 structure on homepage (30 min)
- Keep one H1: e.g., "Canyoning, Escalade & Aventures dans les Gorges du Verdon"
- Demote "Qui sommes-nous ?", "Nos Activités Nature", "Notre Blog & Actualités", "À VOTRE ÉCOUTE" to H2 or H3

### 2.4 Fix all image alt texts (1 hour)
Priority fixes:
- Logo: `alt="L'Instant Verdon — Guide Canyoning & Escalade dans les Gorges du Verdon"`
- Emma: `alt="Emma Aglaé, guide diplômée d'État canyonisme, co-fondatrice L'Instant Verdon"`
- Angèle: `alt="Angèle Kanapa, guide diplômée d'État escalade et canyonisme, L'Instant Verdon"`
- All activity images: describe activity + location

### 2.5 Implement hreflang for fr/en versions (1 hour)
Add to every page's `<head>`:
```html
<link rel="alternate" hreflang="fr" href="https://www.linstantverdon.com/fr/[current-path]" />
<link rel="alternate" hreflang="en" href="https://www.linstantverdon.com/en/[current-path]" />
<link rel="alternate" hreflang="x-default" href="https://www.linstantverdon.com/fr/[current-path]" />
```

### 2.6 Add LocalBusiness schema to homepage (2 hours)
Implement JSON-LD as specified in [findings/schema.md](findings/schema.md). Include:
- Business name, address, phone, email, URL
- Geo coordinates
- sameAs links to social profiles and directory listings
- AggregateRating (TripAdvisor: 4.8/5, 54 reviews)

### 2.7 Add Service schema to each activity page (2 hours)
Add `@type: Service` with offers/pricing to: /fr/canyoning, /fr/escalade, /fr/aventures, /fr/stages, /fr/insolite, /fr/evenementiel

### 2.8 Add FAQPage schema to /fr/faq (1 hour)
Implement JSON-LD FAQPage schema for all existing questions. Also expand FAQ to 15+ questions (see content recommendations below).

### 2.9 Add Article schema to blog posts (1 hour)
Add `@type: Article` with author, datePublished, image, publisher to both existing blog posts.

### 2.10 Display TripAdvisor reviews on website (3 hours)
- Add a "Avis Clients" section on the homepage
- Show 3–5 featured reviews with reviewer name, date, and rating
- Display aggregate rating badge: "★★★★★ 4.8/5 — 54 avis TripAdvisor"
- Add link to full TripAdvisor listing

---

## Phase 3 — Content & Authority (Month 2)

### 3.1 Expand both blog posts to 1,200+ words (4 hours each)
For each seasonal guide:
- Expand each activity section with practical details (duration, difficulty, what to bring, price, age minimum, meeting point)
- Add a section on the Verdon region context
- Add 5–8 FAQs at the end of each article
- Add author quotes/personal experience (E-E-A-T)
- Add internal links to relevant service pages

### 3.2 Expand FAQ page to 20+ questions (3 hours)
Add questions covering:
- Age minimums by activity
- Family / children suitability
- Weather conditions and cancellation
- Meeting point / parking / getting to Verdon
- What equipment is provided
- Group size limits
- Gift vouchers
- Corporate / team-building options
- Difficulty levels
- Seasonal availability

### 3.3 Publish 2 new blog posts per month
Content calendar priorities:
1. "Guide complet du canyoning dans le Verdon — tout ce qu'il faut savoir" (pillar page, 2,000 words)
2. "Canyoning en famille dans le Verdon — les meilleures sorties pour les enfants" (family audience)
3. "Escalade dans le Verdon pour débutants — voies d'initiation et conseils" (beginner audience)
4. "EVJF original dans les Gorges du Verdon — activités outdoor entre filles" (event audience)

### 3.4 Create a /fr/avis page
Aggregate customer testimonials, TripAdvisor embed, link to Google reviews. Implement AggregateRating schema.

### 3.5 Add activity difficulty ratings and filters
Add visible difficulty indicators (Initiation / Intermédiaire / Expert) to all activity listings, plus age minimum, duration, and group size info.

### 3.6 Create llms.txt file (30 min)
```
# L'Instant Verdon
> Guides diplômés d'État pour canyoning, escalade et aventures dans les Gorges du Verdon depuis 2018.

## Activités principales
- https://www.linstantverdon.com/fr/canyoning
- https://www.linstantverdon.com/fr/escalade
- https://www.linstantverdon.com/fr/faq
- https://www.linstantverdon.com/fr/a-propos
```

### 3.7 Get listed on activity aggregators
- FunBooker.com
- CheckYeti.com
- GetYourGuide
- Viator
- Komoot (French/German outdoor community)

---

## Phase 4 — Monitoring & Iteration (Ongoing)

### 4.1 Set up Google Search Console (if not done)
- Verify domain ownership
- Submit sitemap
- Monitor: Coverage report, Core Web Vitals, Search performance

### 4.2 Set up Google Analytics 4
- Track organic traffic growth
- Set up conversion events: form submissions, phone clicks, WhatsApp clicks

### 4.3 Monitor indexation weekly
- Check `site:linstantverdon.com` weekly for new pages appearing
- Target: all 10+ main pages indexed within 4 weeks of sitemap submission

### 4.4 Run PageSpeed Insights monthly
- Mobile score target: 70+
- Lighthouse performance target: 80+
- Fix any new CWV failures immediately

### 4.5 Content calendar: 2 posts/month minimum
Each post: 1,000+ words, unique meta, proper schema, author bio, 3+ internal links

### 4.6 Review acquisition: ask every customer for a Google Review
- Add CTA to post-activity email / WhatsApp message: "Laissez-nous un avis Google !"
- Goal: build Google Reviews alongside TripAdvisor presence
