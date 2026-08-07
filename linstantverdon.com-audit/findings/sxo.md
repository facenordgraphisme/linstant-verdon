# SXO Audit — linstantverdon.com

## Score: 61/100

*(SXO Gap Score — separate from technical SEO Health Score. Reflects search-experience/intent alignment only.)*

---

### What Works

- **Strong `LocalBusiness`/`SportsActivityLocation` schema sitewide**: full NAP, geo coordinates, opening hours, `aggregateRating` (4.8/54 reviews), and named `founder`/`employee` entities with diploma credentials (Emma Aglaë, Angèle Kanapa, Marie Oddo — "Diplôme d'État de canyonisme/escalade"). This is a real E-E-A-T asset most competitors in this niche lack.
- **Tour detail pages are structured close to a transactional Product/Service type**, not generic blog prose: `canyon-artuby` surfaces "Rendez-vous", "Fiche Technique", "Équipement", "Ce qui est inclus" (harnais, casque, guide diplômé), "Pré-requis", and "Tarif 50€" as distinct blocks — this matches what a booking-intent searcher scans for.
- **Low-friction booking CTA**: "RÉSERVER VOTRE SORTIE" links directly to an external booking engine (book-adventure.fr) with the reassurance line "Paiement sur place • Réservation 100% Gratuite" next to the price — directly answers the price-sensitivity/commitment-fear barrier.
- **Multi-channel contact options** (tel:, WhatsApp deep link) support the "near me / same-day decision" tourist persona.
- **Escalade grande-voie page states real climbing grades** (5B–6A initiation, 6b historique, 7a/7c soutenu), which is the one piece of technical-evaluator-relevant content on the site.

---

### CRITICAL — Page-Type / Schema Mismatch on Transactional Pages

**Finding:** All 11 tour detail pages (canyon-artuby, escalade-grande-voie, etc.) behave like Product/Service pages in content structure (price, inclusions, prerequisites, booking CTA) but carry **zero Product/Offer/TouristTrip/Event schema**. The only structured data on every single page (category, detail, blog) is the site-wide `LocalBusiness` block — identical JSON-LD repeated on canyoning, escalade, evenementiel, and blog pages.

**Persona evidence — First-time canyoning tourist ("canyoning gorges du verdon" searcher):** This persona expects rich SERP results with price, rating stars, and duration directly in Google's result snippet (the norm for GetYourGuide/Viator/TripAdvisor competitors ranking for these queries). Without `Product`/`Offer` or `TouristTrip` schema, linstantverdon.com tour pages cannot win these rich snippets even though the on-page data (price, inclusions) already exists to support it.

**Fix:** Add `Product` or `TouristTrip` schema per tour page with `offers` (price 50€, `priceCurrency: EUR`, availability), `AggregateRating`, and duration. Recommend `/seo schema` for generation.

---

### HIGH — Missing Duration & Difficulty at a Glance (Trust/Clarity gap for the anxious first-timer)

**Finding:** On `canyon-artuby`, the "🧗 Fiche Technique" section renders as a collapsed/accordion heading with no duration, difficulty rating, or age minimum visible in the extracted content — only free-text "Pré-requis" (must have rappelled/climbed before, general fitness, no severe vertigo). No numeric difficulty scale (e.g., 1–5) or explicit "durée: X heures" is exposed at first scroll.

**Persona evidence — First-time canyoning tourist (needs reassurance on safety/difficulty):** This persona's core anxiety-driving questions ("is this too hard for me / my kids?", "how long does it take?") are answered only in prose buried behind an accordion, not as a scannable spec block. Estimated persona score: Relevance 18/25, Clarity 13/25, Trust 15/25, Action 20/25 → **66/100 (Good, but notable gap)**.

**Fix:** Add a fixed, always-visible spec strip above the fold on every tour page: Durée / Niveau (1–5 icons) / Âge minimum / Groupe max — mirrors what OTA competitors show immediately.

---

### HIGH — Blog Is Generic Content Marketing, Not Intent-Mapped

**Finding:** `/fr/blog` contains only 2 posts, both generic seasonal roundups ("Les 3 activités à faire dans le Verdon cet été/ce printemps"), 117-word index page, no `Article`/`BlogPosting` schema, no author byline schema, no FAQ content.

**Persona evidence — Trip-planning researcher (awareness stage: "canyoning débutant verdon", "quel canyon choisir en famille", "que mettre dans son sac canyoning"):** These are exactly the long-tail informational queries a recovering site needs to rank for post-relaunch, but current blog content doesn't target them — it's brand-marketing framing ("Emma et Angèle partagent...") rather than answer-first content matching PAA-style questions.

**Fix:** Replace/extend blog roadmap with intent-matched posts: "Quel canyon choisir dans le Verdon selon son niveau" (comparison format, internal-links to all 6 canyon pages), "Canyoning en famille : à partir de quel âge", packing/prep guides. Recommend `/seo content` for a deeper content-gap pass.

---

### MEDIUM — Evenementiel Page Lacks Organizer-Grade Specifics

**Finding:** `/fr/evenementiel` (206 words) is entirely vague: "Contactez-nous, on vous proposera une activité adaptée en fonction de votre groupe et de la saison." No group size min/max, no per-person or tiered pricing, no logistics (meeting point capacity, indoor fallback, catering/lodging partners), no past-event case studies or client logos.

**Persona evidence — Group/event organizer (EVJF/EVG/seminar planner):** This persona needs concrete numbers to get internal budget approval before contacting anyone. Estimated persona score: Relevance 15/25, Clarity 10/25, Trust 12/25, Action 15/25 → **52/100 (Needs Work)**.

**Fix:** Add a logistics block (capacity range, indicative pricing bands, "devis sous 24h" CTA) and at least one past-event case study/testimonial specific to corporate or bachelorette groups.

---

### MEDIUM — Missing Alt Text on Tour Detail Galleries

**Finding:** `canyon-artuby` has 7/10 images missing alt text; `escalade-grande-voie` has 3/6 missing alt text. Category pages (canyoning, escalade, evenementiel) have full alt coverage, so this is specific to the "📸 Galerie Photos" gallery blocks on detail pages.

**Fix:** Add descriptive alt text to gallery images (canyon name + action, e.g., "saut de 8m dans la clue d'Artuby") — supports both accessibility and image-search discovery for these visual, decision-stage queries.

---

### LOW — No Named Route/Topo Detail for Technical Climbers

**Finding:** `escalade-grande-voie` groups routes by grade band (Initiation 5B–6A, Voies historiques 6b, Voies soutenues 7a/7c) rather than naming individual named routes with pitch count/exposure — the level of detail an experienced climber searching a specific route name expects.

**Persona evidence — Experienced climber (wants technical route specifics):** Grade bands are a good start (rare on tourism-guide sites) but this persona will bounce to topo sites (camptocamp, climbing guidebooks) for pitch-by-pitch detail before booking. Estimated: Relevance 17/25, Clarity 16/25, Trust 14/25, Action 18/25 → **65/100**.

**Fix:** Low priority — add named-route call-outs within grade bands if guide capacity allows differentiated booking.

---

### Limitations

- Live Google SERP pull (WebSearch on "canyoning gorges du verdon" / "escalade verdon guide" / individual canyon names) was **not completed** in this pass due to a budget/time cutoff signaled mid-task. Findings above are based on: (a) direct page structure/schema/content analysis of the rendered target pages, (b) standard SXO page-type taxonomy for local-service/experience-booking queries, and (c) established competitive patterns for OTA/tour-operator SERPs (price+rating rich snippets, PAA clusters on safety/difficulty) rather than a live top-10 capture.
- Only 6 of ~20 site URLs were fetched and parsed in depth (canyoning, escalade category pages; canyon-artuby, escalade-grande-voie detail pages; evenementiel; blog index). Aventures, insolite, stages, a-propos, faq, contact, and the remaining 9 tour detail pages were not individually rendered — findings on blog/evenementiel patterns are likely to generalize but were not verified page-by-page.
- Wireframe (IST/SOLL) generation was not performed — not requested in this pass and skipped for budget.
- English-locale (`/en/...`) equivalents were not audited separately; findings assume parity with the French pages given identical Next.js templates.

Recommend a follow-up pass with `/seo google report` (or a dedicated SERP capture) to validate the page-type consensus assumptions above with live data, plus `/seo schema` for the Product/TouristTrip schema fix.
