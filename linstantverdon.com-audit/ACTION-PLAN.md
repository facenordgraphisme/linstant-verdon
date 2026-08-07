# Action Plan — linstantverdon.com

Prioritized by severity and effort. All fixes are Next.js/Sanity codebase changes (this project's convention — no static file overrides), file paths given where identified.

---

## Phase 1: Critical Fixes (Week 1)

These directly block AI-search visibility, risk confusing Google's re-indexing of a recently-relaunched site, or leave money-page schema/duplicate-URL problems live.

| # | Fix | File(s) | Effort |
|---|---|---|---|
| 1 | Remove `gptbot`, `chatgpt-user`, `amazonbot`, `ccbot` from `BANNED_USER_AGENTS` | `src/proxy.ts` | Trivial (1-line edit) |
| 2 | Remove `GPTBot`, `amazonbot`, `CCBot` from the robots.txt disallow group; fix `disallow: '/studio/'` → `disallow: '/studio'` | `src/app/robots.ts` | Trivial (1-line edit) |
| 3 | Call `notFound()` for unmatched activity/category slugs; add a real `not-found.tsx` | `src/app/[locale]/[category]/page.tsx`, `.../[category]/[slug]/page.tsx`, new `not-found.tsx` | Small |
| 4 | Restrict `generateStaticParams()` to correct locale↔slug pairs (or 301 mismatches) — kills ~15 self-canonicalizing duplicate URLs (`/en/escalade`, `/fr/climbing`, etc.) | `src/app/[locale]/[category]/page.tsx`, `.../[category]/[slug]/page.tsx` | Medium |
| 5 | Emit `/en` URLs as first-class `<url>` entries (not just hreflang annotations) | `src/app/sitemap.ts` | Small-Medium |
| 6 | Fix untranslated/duplicated French text on `/en/canyoning`, `/en/climbing`, `/en/adventure`, `/en/unusual-activities`, `/en/a-propos` | Sanity content (en-locale fields) + category-page template fallback logic | Medium |
| 7 | Add `preload="none"` + a compressed poster to the hero `<video>` | `src/components/Hero.tsx` | Small |
| 8 | Add `Product`/`TouristTrip`/`Offer` schema to all 11 tour detail pages (ready-to-paste code in `findings/schema.md`) | `src/app/[locale]/[category]/[slug]/page.tsx` | Medium |
| 9 | Fix homepage TripAdvisor icon link to match schema; reconcile `/llms.txt` address with the real address | Homepage component, `public/llms.txt` (or equivalent) | Trivial |

---

## Phase 2: High-Impact Improvements (Weeks 2-3)

| # | Fix | File(s) | Effort |
|---|---|---|---|
| 10 | Re-encode hero video to <5MB target; defer load until after first paint; remove `opacity:0` GSAP gating on the H1 | `src/components/Hero.tsx`, video asset on R2 | Medium |
| 11 | Migrate raw `<img>` to `next/image` (AboutSection, Footer, Navbar, BlogOverview, category/detail templates) | 6+ component files | Medium-Large |
| 12 | Add security headers (CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy) | `next.config.ts` or `vercel.json` | Small |
| 13 | Add `BreadcrumbList` schema site-wide; fix `LocalBusiness.url` locale bug; add standalone `Person` schema on `/a-propos`; remove `/en/faq` locale gate | `src/components/LocalBusinessSchema.tsx`, new `BreadcrumbSchema.tsx`, `src/app/[locale]/a-propos/page.tsx`, `src/app/[locale]/faq/page.tsx` | Medium |
| 14 | Expand FAQ (FR + EN) to 12-15+ self-contained Q&As; fix the cancellation non-answer | Sanity FAQ content, `faq/page.tsx` | Medium |
| 15 | Add a fixed, always-visible spec strip (Durée / Niveau / Âge minimum / Groupe max) above the fold on tour pages | `[category]/[slug]/page.tsx` | Medium |
| 16 | Add visible "Sécurité & Assurance" trust section + real testimonials; back the schema `aggregateRating` claim with visible review content | Homepage, `a-propos/page.tsx` | Medium |
| 17 | Claim/confirm Google Business Profile; embed Google Maps on Contact page; add GBP link to schema `sameAs` | `contact/page.tsx`, `LocalBusinessSchema.tsx` | Small-Medium |
| 18 | Fix the broken Verdon Tourisme outbound link (404); contact the tourism board to restore the listing | Homepage link, external outreach | Small (+ outreach) |
| 19 | Investigate/fix the mobile category-page ghosted duplicate-heading bug (`screenshots/category_mobile.png`) | Category page hero component, mobile-breakpoint animation logic | Small-Medium |

---

## Phase 3: Content & Authority (Month 2)

| # | Fix | Effort |
|---|---|---|
| 20 | Expand category pages (canyoning, escalade, aventures, insolite, evenementiel) from 83-164 words to 500-800+ words: safety, seasonality, activity differentiation, FAQ | Medium-Large |
| 21 | Translate full EN guide bios and tour-page section labels | Medium |
| 22 | Rewrite blog roadmap toward intent-matched, answer-first posts ("Quel canyon choisir selon son niveau") | Medium (ongoing) |
| 23 | Add group/event logistics specifics (capacity, pricing bands, case studies) to `/fr/evenementiel` | Small-Medium |
| 24 | Add descriptive alt text to tour-page gallery images | Small |
| 25 | Pursue federation/directory link building: FFME, FFS, Comité Régional du Tourisme PACA, La Palud-sur-Verdon mairie, GetYourGuide/Viator, partner gîtes/campings, local press | Ongoing outreach |

---

## Phase 4: Monitoring & Iteration (Ongoing)

| # | Action | Why |
|---|---|---|
| 26 | Configure a Google API key (PageSpeed Insights/CrUX) | Replace lab-based performance estimates with real field data |
| 27 | Set up Google Search Console for the relaunched domain | First-party indexation data + eventual Links report for real backlink data |
| 28 | Re-run Common Crawl checks quarterly | Track when the current site build enters the crawl graph |
| 29 | QA every `/en/` page after each content update | Prevent translation regressions recurring |
| 30 | Complete the deferred visual QA pass + a live SERP capture | Validate remaining screenshots and SXO page-type assumptions with real data |

---

## Notes on Sequencing

- **Items 1, 2, 7, 9** are all one-line-or-smaller edits with outsized impact — do these first regardless of what else is in flight.
- **Items 4, 5, 6** should land together where possible: fixing the sitemap without also fixing the duplicate-URL bug and the EN translation gaps would surface more indexable low-quality pages to Google, working against the recovery goal.
- **Item 8** (tour-page schema) and **item 15** (visible spec strip) address the same underlying gap (duration/price not surfaced) from two angles — schema and UI — and are natural to implement in the same pass through the tour-detail template.
- **Item 11** (`next/image` migration) is large but mechanical; can be split per-component across Phase 2 without blocking other work.
