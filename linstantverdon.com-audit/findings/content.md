# Content Quality, E-E-A-T and On-Page SEO Audit: linstantverdon.com

Audit date: 2026-11-14. Compared with the previous audit dated 2026-08-07 (`archive-2026-08-07/findings/content.md`).

**How the pages were checked:** I used `raw/crawl.json` (64 URLs: 60 return 200, 4 are EN 308 redirects). I fetched 47 pages again as server-rendered HTML with `render_page.py --mode never`. All of them are SSR, so the content is in the first HTML response. That set covers:
- every FR detail page (17),
- all hubs in FR and EN,
- the About, FAQ, Blog and Contact pages,
- both blog posts,
- 9 EN detail and blog pages for translation QA.

Word counts come from two sources:
- **trafilatura `extracted_text`**: main content only. The E-E-A-T scores use this.
- **crawl `words`**: includes about 150 words of nav and footer.

I ran the templated-metadata check across all 60 title/description pairs. Readability uses Kandel-Moles, the French adaptation of Flesch.

## Scores

| Score | Value | August |
|---|---|---|
| **Content Quality (E-E-A-T, depth, accuracy, translation)** | **61 / 100** | 42 |
| **On-Page SEO (titles, metas, headings, internal links, URLs)** | **58 / 100** | n/a |
| AI citation readiness | 60 / 100 | 48 |

### E-E-A-T breakdown (this skill's internal weighting, not Google's)

| Factor | Weight | Score | Rationale |
|---|---|---|---|
| Experience | 20% | 12/20 | The blog voice is first-person and local ("La Gardoise", Trigance, vultures, Bas Jabron only flows in spring). Detail pages have real photo galleries and a video on Balène. There are no visible customer testimonials, the detail pages carry no guide anecdotes, and there has been no new post in 6 months. |
| Expertise | 25% | 19/25 | Three named guides list their diploma type and year (DE canyonisme 2020, BE escalade/canyonisme 2013, DE escalade/canyon 2020). Every hub now has a "Sécurité & Encadrement" block naming DE/BE and the Ministère des Sports. Detail pages still do not say which guide leads the trip, and some technical claims are inconsistent or doubtful (see C2, M1). |
| Authoritativeness | 25% | 13/25 | The partner list names real local businesses (Verdon Tourisme, hotels, other canyon companies), and the footer links to Verdon Tourisme and TripAdvisor. There are no press mentions, no federation/SNAPE-type affiliation, and no reviews shown on the site. |
| Trustworthiness | 30% | 17/30 | Better than August: insurance (RC Pro and client individual accident cover) is stated on the hubs and in the FAQ, the cancellation policy is now written out, the SIRET is shown, and the phone, address and email are visible. Remaining problems: the booking card contradicts the CGV on payment, the footer "Mentions Légales" and "Confidentialité" links point to `#`, two different contact emails are used, the schema claims a 4.9★ rating from 276 reviews that no page shows, and several detail pages contradict themselves. |
| **Weighted** | | **61/100** | |

---

## What works (keep this)

1. **The FAQ is rebuilt and strong.** `/fr/faq` now has 11 Q&As plus "Fonctionnement", "Assurances", "Mentions légales" and the full CGV (about 1,100 words of main content, FAQPage schema). Each answer stands alone and contains a fact (25 m swimming, mid-April to end of October season, 6-day / 48 h cancellation tiers, ANCV accepted). These are the most citable passages on the site.
2. **The hubs went from stubs to real pages.** Each hub now has an intro, a level-routing paragraph, a "Sécurité & Encadrement" block and 3 activity-specific FAQs. Main-content word counts (trafilatura):
   - `/fr/canyoning`: 133 → 375 (680 in the full page)
   - `/fr/escalade`: 83 → 293
   - `/fr/aventures`: 99 → 285
   - `/fr/insolite`: 134 → 315
3. **The English site is almost fully translated.** In August, whole EN hubs were in French. Now the bios, About lede, hub intros, FAQ, detail-page labels ("Meeting Point", "What's included", "Requirements", "Photo Gallery") and the CGV are translated with natural English. FR and EN are real translations, correctly cross-referenced with hreflang, so they do not count as duplicate content.
4. **Hub metadata is hand-written and good.** Titles are 43–69 characters and keyword-led ("Canyoning Verdon avec Guide Diplômé"). Descriptions are 110–160 characters and include a price ("À partir de 50€ / personne"), named canyons and the credential. The site-wide template check found **no bulk templating**: `site_risk: low`, `templated_ratio: 0.0`, no shared CTA phrases.
5. **Detail pages carry concrete facts in a structured block:** price, duration, minimum age, meeting point, what's included, prerequisites, jump heights (up to 8 m on Artuby), a 35 m zip line (Trou du Renard), a 220 kg portaledge limit. This is good material for answer extraction.
6. **Readability is good for the audience.** Hubs and blog posts average 10–12 words per sentence, Kandel-Moles 58–62 (fairly easy). The FAQ/CGV scores 45, which is acceptable for legal text. There is no keyword stuffing.
7. **The blog posts show real first-hand knowledge.** They are signed "Par Emma & Angèle", dated, include an author box, and cite external sources (Wikipedia, YouTube, partner VerdonEBike).

---

## Findings

### Critical

**C1. The booking card's payment promise contradicts the CGV and FAQ on every detail page.**
- **Evidence:** every detail page shows "Paiement sur place • Réservation 100% Gratuite" ("Payment on spot • Free Booking Guarantee" in EN) under the price. The FAQ and CGV on `/fr/faq` say the opposite: "Nous confirmons la réservation après versement d'un acompte de 50%", "Aucune réservation ne sera enregistrée sans règlement. Pour les réservations de dernière minute, le règlement total sera nécessaire."
- **Why it matters:** this is a direct trust and consumer-information conflict at the point of conversion, which is the heaviest-weighted E-E-A-T factor. It can also cause disputes.
- **Fix (code):** the string is hard-coded in the detail-page booking card component. Replace it with a wording that matches the CGV, for example "Acompte de 50 % à la réservation • Solde sur place", or drive it from a Sanity field. Fix the EN string at the same time.

**C2. Several detail pages contradict themselves, which is a factual-accuracy problem for safety-sensitive bookings.** All of these are fixed in Sanity content.

| Page | Contradiction |
|---|---|
| `/fr/insolite/nuit-portaledge` | "Ce qui est inclus: **Bivouac complet et repas**", but the body says "L'Instant Verdon **ne fournit pas les repas**, sac de couchages et les chaussons d'escalade". The age badge says "**14 ans+**" while the prerequisites say "Âge minimum **16 ans**". The meeting point is "L'instant Verdon Castellane", but the business is in La Palud. |
| `/fr/canyoning/canyon-artuby` | It is described as "parcours d'**initiation** … pour les petits et les grands" with "7 ans+", yet the prerequisites say "**Avoir déjà pratiqué la descente en rappel ou l'escalade**", "Condition physique sportive", "Ne pas souffrir de vertige sévère". These look copied from a climbing product. "Inclus" lists harness, descender and ropes but **no wetsuit**, which every other canyon includes and the FAQ promises ("combinaison … fournie"). |
| `/fr/aventures/trou-du-renard` | Badge "12 ans+" vs prerequisite "Âge minimum 10 ans accompagné". "Inclus" says "guide de **haute montagne** / escalade", but none of the listed guides holds the guide de haute montagne diploma. Do not claim a credential the team does not hold. |
| `/fr/canyoning` FAQ vs `/fr/canyoning/canyon-balene` | The FAQ says family canyons are "accessibles dès 7-8 ans", but Balène shows "6 ans+". |
| `/fr/aventures/mainmorte` | Duration is shown as "—". |
| Group-priced products | `escalade-demi-journée-découverte` ("1 à 3 pers. : 200€ / 4 à 8 pers. : 250€"), `insolite-la-carelle` (170€/220€) and `soirée-insolite-portaledge` (per portaledge) are all labelled "**Prix / pers.**". The escalade hub card then shows "À partir de 200€", which reads as €200 per person. This is a code issue: the label must switch to "Prix / groupe" when the price is a group price. |

**Fix:** go through every product in Sanity and reconcile age, inclusions, prerequisites and meeting point with the body text. Add a "price unit" field (per person / per group / per portaledge) and render the label from it.

### High

**H1. Broken internal links in the blog: all three "Plus d'information" links in the spring post return 404.**
- **Evidence:** `/fr/blog/3-activites-verdon-printemps` links to the old WordPress URLs `https://linstantverdon.com/fr/canyon/bas-jabron/`, `/fr/adventure/mainmorte-sec/` and `/fr/unusual-activities/half-day-carelle/`. I tested all three: each redirects twice and ends in **404**. The EN version of the post probably carries the same links, and the summer post should be checked too.
- **Fix:**
  - **Sanity content:** re-point the links to `/fr/canyoning/canoyn-bas-jabron`, `/fr/aventures/mainmorte` and `/fr/insolite/insolite-la-carelle`.
  - **Code:** add 301 redirects from the legacy WordPress paths (`/fr/canyon/*`, `/fr/adventure/*`, `/fr/unusual-activities/*`) to the new slugs in `next.config`, because the old URLs may also have backlinks.

**H2. Detail pages, which are the money pages, are still thin and identically structured. Not fixed since August.**
- **Evidence:** main content ranges from 142 words (escalade demi-journée) and 158 (Balène) to about 306 (nuit portaledge). In the crawl, every detail page has exactly one H2 ("Description"/"Overview"). They are a single description paragraph plus the facts block. None covers:
  - difficulty rating (the standard French canyon grade, e.g. v3a3),
  - best season or water level,
  - approach and return walk times,
  - distance from La Palud, Castellane or Moustiers,
  - what to bring for this specific canyon,
  - who the trip is NOT for,
  - a guide's comment.
- The descriptions themselves are specific and human-written, so this is not low-quality AI content. They are simply too short to rank for "canyon de l'Artuby", "couloir Samson canyoning", "clue de Saint-Auban canyon" against Verdon competitors and the topo sites.
- **Fix (Sanity content, plus code for the new sections):** add structured fields and render them as H2 sections: "Niveau & cotation", "Saison idéale", "Déroulé de la sortie" (approach / descent / return with times), "À prévoir", "Bon à savoir / avis du guide". Target 400–600 words per page. Start with the highest-demand pages: Couloir Samson, Artuby, Balène, Grande Voie, Nuit Portaledge.

**H3. The site claims a 4.9★ rating from 276 reviews, but no review appears anywhere.**
- **Evidence:** the JSON-LD on every page contains `"aggregateRating":{"ratingValue":"4.9","reviewCount":"276"}`. No page shows a rating, star, testimonial or the word "avis". The only social proof is a TripAdvisor icon in the footer.
- **Why it matters:** markup that describes content the user cannot see is a structured-data guideline violation, and self-serving LocalBusiness review stars are not eligible for rich results anyway. For trust, real reviews are the strongest Experience/Trust signal a guided-activity business can show.
- **Fix:**
  - **Code:** add a testimonials block on the homepage and hubs, showing 3–6 real Google/TripAdvisor reviews with first name, month and activity, plus the overall rating with a link to the source.
  - **Sanity:** add a "témoignages" document type.
  - **Code:** keep `aggregateRating` only if the same figure is shown on the page and matches the live source. Coordinate with the schema findings.

**H4. The footer legal links are dead (`href="#"`) on every page.**
- **Evidence:** "Mentions Légales" and "Confidentialité" both point to `#`. The legal information exists only inside `/fr/faq` (SIRET, statut syndicat local), and there is no privacy policy, even though the site collects contact-form data.
- **Fix (code + content):**
  - Create `/[locale]/mentions-legales` and `/[locale]/confidentialite` pages: publisher, director of publication, host (Vercel), SIRET, plus GDPR treatment of contact-form and analytics data.
  - Link them from the footer.
  - This is a French legal requirement (LCEN) and a basic trust signal.

**H5. The English site still has visible French strings.** August items 1, 2, 7 and 8 are mostly fixed; these remain. All are code (hard-coded strings or missing i18n keys) unless noted.
- **All EN hub pages:** CTA "RÉSERVER VOTRE SORTIE" (`/en/canyoning`, `/en/climbing`, `/en/adventure`, `/en/unusual-activities`).
- **EN homepage:**
  - "Là où l'aventure rencontre la nature", "DÉCOUVRIR NOS ACTIVITÉS", "NOUS CONTACTER", "Le Syndicat Local", "Fondé en 2018", "Notre Offre", "NOUS REJOINDRE", "Explorer la catégorie" (×6), "Voir tous les articles"
  - The H3 "Stages" is untranslated, and the "Stages" and "Events" cards have **no EN description** (empty Sanity EN fields).
- **EN blog posts:** the author box ("Les Auteurs", "Guides diplômées d'État passionnées par le Verdon…") and the whole closing CTA ("L'AVENTURE VOUS ATTEND", "Rejoignez-nous pour une sortie inoubliable !…", "Nous contacter", "Voir les départs").
- **EN footer, site-wide:** the tagline "Expert en aventures outdoor dans les Gorges du Verdon…", nav "Escalade"/"Stages", "Mentions Légales", "Propulsé par".
- **`/en/weekend` schedule table (Sanity):** "Acro Yoga et surprise le soir!", "Acro Yoga et JAM, débrief".
- **Mistranslation (Sanity):** "L'instant Verdon is a **local union**". In English, "union" means a trade union. Use "an association of independent, state-certified guides (syndicat local)".
- **Awkward EN (code labels):** "Payment on spot" → "Pay on site". "Free Booking Guarantee" also needs fixing per C1.
- **Fix:** move every remaining hard-coded string into the i18n dictionary. Add a build-time or CI check that fails when an EN page renders known FR tokens.

### Medium

**M1. A doubtful factual claim on `/fr/escalade` and `/en/climbing`.**
- **Evidence:** "nos grandes voies (4a à 8b, **de 100 à 1000m**)". In the hub FAQ: "plus de 200 grandes voies … sur des hauteurs de 100 à 1000 mètres".
- The highest walls in the Verdon are roughly 300–400 m. A 1,000 m figure is the kind of error experienced climbers, and AI answer engines cross-checking topos, will catch, and it undermines expertise.
- **Fix (Sanity):** have Angèle or Marie confirm the real figure (e.g. "jusqu'à 300–400 m") and the route count. Similar numbers the guides should confirm: "plus de 200 grandes voies", "jusqu'à 50 personnes".

**M2. Detail-page meta descriptions are auto-generated from the body, cut at 140 characters with "…" and sometimes contain line breaks.**
- **Evidence:** all 34 detail pages have a description of exactly 141 characters ending in "…", e.g. "…dans le Pa…", "…de nombreux peti…". The nuit-portaledge description contains `\n\n`.
- Because of this fallback, the 3-day and 7-day stages share the same description in FR ("Venez vivre une expérience inoubliable au cœur de la nature…") and in EN ("Come and experience an unforgettable adventure…"). Those are the duplicates already observed.
- The EN homepage description is only 48 characters ("Explore the Verdon Gorges with L'instant Verdon.").
- **Fix:**
  - **Code:** add `seoTitle` and `seoDescription` fields (per locale) to the activity schema in Sanity. In `generateMetadata`, fall back to a sentence-aware truncation (cut at the last full stop or word, no mid-word "…", strip newlines).
  - **Sanity:** write unique 140–155-character descriptions for the 34 detail pages and the EN homepage, leading with activity + place + level + price. For example: "Canyoning à la clue d'Artuby (Verdon) : sauts jusqu'à 8 m, dès 7 ans, 2h30 avec guide diplômé d'État. 50 €/pers."

**M3. Detail-page titles are templated, too long, and some lack the activity keyword.**
- **Evidence:** the pattern `{nom} — Gorges du Verdon | L'instant Verdon` gives 66–104 characters. The stages pages are 102–104 characters and will be cut off around 60.
- Several titles never say "canyoning" or "escalade": "La clue d'Artuby — Gorges du Verdon", "Le Canyon de La Ferné", "La Clue de Saint-Auban", "Demi journée insolite à la Carelle".
- Inconsistent capitalization ("Bas Jabron- Family Canyon", "Demi journée", "porta ledge").
- **Fix:**
  - **Code:** use `seoTitle` when set. Otherwise build `{keyword-led name} | L'instant Verdon` and drop " — Gorges du Verdon" when the total exceeds about 60 characters.
  - **Sanity:** example titles: "Canyoning Clue d'Artuby (Verdon) dès 7 ans | L'instant Verdon", "Canyon de Saint-Auban – canyoning sportif Verdon", "Stage multi-activités 3 jours Verdon".

**M4. The H1s are generic one-word category names, and the homepage H1 is only the brand name.**
- **Evidence:**
  - Homepage H1 "L'Instant Verdon".
  - Hub H1s: "Canyoning", "Escalade", "Parcours Aventure", "Insolite", "Événementiel", "À propos", "Infos & FAQ".
  - EN H1s "Unusual", "Adventures".
  - The target phrases "canyoning Verdon" and "escalade Verdon" appear in titles but not in any H1.
- **Fix (code + Sanity):** add an optional `h1` field to the category document, or render H1 = "Canyoning dans les Gorges du Verdon" with the short label kept as the eyebrow/breadcrumb. Homepage H1: "Canyoning, escalade et aventures dans les Gorges du Verdon", with the brand as a visual element.

**M5. Detail pages have a broken heading hierarchy, and emojis appear in headings.**
- **Evidence:** H1 → H2 "Description" → H4 "Lieu de rendez-vous" → H3 "📸 Galerie Photos" → H4 "Ce qui est inclus" / "Pré-requis". Levels are skipped and the order is inverted. On `/fr/faq`, every question's H3 starts with a stray "?" character (icon glyph inside the heading; August item 10, still open).
- **Fix (code):** make "Rendez-vous", "Fiche technique", "Ce qui est inclus", "Pré-requis" and "Galerie" H2s. Move the emoji into an `aria-hidden` span outside the heading text, and the "?" icon outside the `<h3>`.

**M6. Internal linking is shallow.**
- Detail pages link only to their parent hub (breadcrumb) and the nav. There are no links to sibling tours ("autres canyons famille"), related blog posts, the FAQ or the About/guides page.
- The blog links out to its own posts but not to the hubs in context (and its detail links are broken, H1).
- The language switch always goes to the other language's homepage (`/en`, `/fr`) instead of the equivalent page, even though hreflang knows the right URL.
- **Fix (code):**
  - Add a "Vous aimerez aussi" block (same category, similar level) and a "Votre guide" block linking to `/a-propos`.
  - Use contextual anchors in the hub intros: "Balène", "Bas-Jabron" and "Ferné" are already mentioned in the `/fr/canyoning` text but not linked.
  - Wire the language switcher to the hreflang alternate of the current page.

**M7. The blog is stale and thin.**
- **Evidence:** still 2 posts (10 April and 15 May 2026), nothing in 6 months, and none for autumn. 196–310 words of main content each. The blog index has 72 words of main content.
- **Fix (Sanity content):** these seasonal posts are fine, but add evergreen, intent-matched guides of 1,200–1,800 words, signed by a named guide and linked to the relevant products (see Content gaps). Aim for 1 post per month in season.

**M8. Hub coverage is still below the service-page floor, and `/fr/evenementiel` is unchanged.**
- **Evidence:** the hubs are 285–375 words of main content against an 800-word floor. `/fr/evenementiel` is 165 words, the same as in August. It has no prices or price ranges, no example programmes, no group-size or season matrix, and no client references. The homepage card and the hero repeat the same sentence ("Vous souhaitez organiser un événement sportif ? EVJF, EVG, séminaires…").
- **Fix (Sanity):**
  - Add a "Quel canyon choisir ?" comparison table to `/fr/canyoning` (level, age, duration, jumps, price, season). It is ideal for AI citation and featured snippets.
  - Add an "Escalade débutant vs grande voie" section to `/fr/escalade`.
  - Rebuild `/fr/evenementiel` with 2–3 sample formats (EVJF demi-journée, séminaire journée), price ranges, capacity (up to 50) and logistics.

### Low

**L1. URL slugs have problems.**
- A typo: `canoyn-bas-jabron`.
- Accented characters in slugs: `escalade-demi-journée-découverte`, `soirée-insolite-portaledge`, `multi-activité-3-jours`.
- EN pages reuse FR slugs: `/en/evenementiel`, `/en/a-propos`, `/en/climbing/escalade-…`.
- **Fix (Sanity slug + code redirects):** move to ASCII slugs (`canyon-bas-jabron`, `escalade-demi-journee-decouverte`) with 301s. Use EN slugs for EN where worthwhile. This is low priority because the URLs work. Coordinate with technical findings.

**L2. Hub pages have no `og:image`, yet declare `twitter:card=summary_large_image`.** Affected: the homepage and all hub, About, FAQ, Blog and Contact pages. Social shares therefore show no image. **Fix (code):** add a default OG image per category from Sanity.

**L3. Inconsistent contact email.** The CGV says `linstantverdon@gmail.com`, while the rest of the site uses `contact@linstantverdon.com`. The insurance list names "Assurances **Emma Four**", but the guide appears everywhere else as Emma Aglaé. The homepage introduces 2 guides, the About page 3, and the title "Emma, Angèle & Marie". **Fix (Sanity):** use one email everywhere and consistent names, or explain the name difference.

**L4. Generic marketing phrasing in some product intros.** Examples: "Plongez au cœur des majestueuses Gorges du Verdon pour une expérience inoubliable…" (Estelié-Imbut) and "Venez vivre une expérience inoubliable au cœur de la nature…" (stages). The rest of the copy is specific, so this is minor. **Fix (Sanity):** open with the concrete differentiator, e.g. "7 h dans le grand canyon, 2 rappels de 20 m, réservé aux 14 ans+ sportifs".

**L5. Low-value metadata flags.** The template checker flagged `brand_suffix_in_description` on 9 pages. Most are natural sentences ("L'instant Verdon répond en moins de 24h"), so I am not treating them as a problem. `/fr/stages` gets `description_echoes_title` ("Stage multi-activités Verdon : …"). **Fix (Sanity):** optionally rewrite the `/fr/stages` description so it opens with new information.

---

## Content gaps vs search demand (canyoning / escalade Verdon)

Pages or sections that do not exist yet, in priority order. All are Sanity content; new page types also need code.

1. **"Quel canyon choisir dans le Verdon ?"**: a comparison by level, age and season. It targets "canyoning Verdon débutant / famille / enfant / sportif". Put it on the hub and expand it in a blog post.
2. **Couloir Samson guide page or post.** "Couloir Samson" and "randonnée aquatique Verdon / aquarando Verdon" are high-volume queries. The current page is about 380 words and has no parking, shuttle, water-level or season info.
3. **"Prix canyoning Verdon"**: a transparent price table on the hub. The prices exist but are scattered across cards.
4. **"Escalade Verdon débutant" and "grande voie Verdon avec guide"**: explain the cotations (5b, 6a…), what a grande voie with a guide involves, the famous sectors (Escalès, La Carelle, Belvédères), and how to prepare.
5. **Via ferrata wording.** Trou du Renard is described as "un mélange de via ferrata et d'accrobranche", but no page targets "via ferrata Verdon". Add the term to the `/fr/aventures` title, H1 and intro if it is accurate.
6. **Local intent.** Canyoning near Castellane, Moustiers-Sainte-Marie, La Palud, Lac de Sainte-Croix: give drive times from each meeting point on every detail page.
7. **Practical before-you-go content:** what to wear, water temperature by month, the June–August heat and drought (dry canyons), what happens when EDF releases water (lâchers d'eau, important for Verdon safety), and how to get there.
8. **EN-specific:** "Verdon Gorge canyoning tour English-speaking guide". State clearly that the guides speak English (I found no such statement), and use EN slugs.

---

## Status of the August 2026 content items

| # | August finding | Status | Evidence |
|---|---|---|---|
| 1 | EN hubs render French/duplicate fragments | **Mostly fixed** | Intros, cards, Safety and FAQ are translated. Only the "RÉSERVER VOTRE SORTIE" CTA remains (H5). |
| 2 | EN About lede in French | **Fixed** | "L'Instant Verdon was born from a shared passion…". "Our Partners" is translated. |
| 3 | Hubs thin (83–164 words) | **Partially fixed** | 285–375 words now. `/fr/evenementiel` is unchanged at 165 (M8). |
| 4 | No trust/safety signals | **Partially fixed** | Safety & insurance blocks on the hubs, insurance FAQ, SIRET. Still no visible reviews (H3), legal links dead (H4), payment contradiction (C1). |
| 5 | FAQ 3 questions / 64 words | **Fixed** | 11 Q&As plus CGV, about 1,100 words, FAQPage schema. |
| 6 | Detail pages thin and templated | **Not fixed** | Still 142–306 words, single H2. New internal contradictions found (C2, H2). |
| 7 | EN detail-page labels in French | **Fixed** | "Meeting Point", "What's included", "Requirements", "Photo Gallery". |
| 8 | EN guide bios abridged | **Fixed** | The EN bios now match the FR bios in full. |
| 9 | Blog: 2 short posts | **Not fixed** | Still 2 posts, none since 15 May, 3 broken links (H1). |
| 10 | Stray "?" in FAQ questions | **Not fixed** | The "?" glyph is still inside each `<h3>` (M5). |

---

## AI citation readiness: 60/100

**Strengths:**
- The FAQ has self-contained, factual answers (swim 25 m, season mid-April to end of October, cancellation tiers, payment methods).
- The hub FAQs are in the same style.
- Each detail page has a facts block (price, duration, minimum age, inclusions).
- The sites are server-rendered.
- FAQPage, BreadcrumbList and BlogPosting schema are present.
- Named, credentialed authors.

**Weaknesses:**
- Contradictory facts on the same page (C2). An LLM may quote the wrong age or claim meals are included.
- The 1,000 m claim (M1).
- No comparison table or "best canyon for X" passage.
- Detail pages have no grade, season or approach data.
- No visible reviews to support "4.9/5".
- EN pages still mix in French UI strings.

---

## Structured findings (for audit-data.json, category "Content Quality")

```json
{
  "category": "Content Quality",
  "score": 61,
  "onpage_seo_score": 58,
  "ai_citation_readiness": 60,
  "eeat": {"experience": 12, "expertise": 19, "authoritativeness": 13, "trustworthiness": 17},
  "findings": [
    {"id": "C1", "severity": "critical", "title": "Booking card 'Paiement sur place / Réservation 100% gratuite' contradicts CGV 50% deposit", "fix_location": "code"},
    {"id": "C2", "severity": "critical", "title": "Detail pages contradict themselves (portaledge meals/age, Artuby prereqs/wetsuit, Trou du Renard age/'haute montagne', per-person label on group prices)", "fix_location": "sanity+code"},
    {"id": "H1", "severity": "high", "title": "3 blog links to legacy WordPress URLs return 404", "fix_location": "sanity+code(redirects)"},
    {"id": "H2", "severity": "high", "title": "Detail pages thin (142-306 words), single H2, no grade/season/approach", "fix_location": "sanity+code"},
    {"id": "H3", "severity": "high", "title": "Schema aggregateRating 4.9/276 with no visible reviews on site", "fix_location": "code+sanity"},
    {"id": "H4", "severity": "high", "title": "Footer Mentions légales / Confidentialité link to '#'; no privacy policy", "fix_location": "code+content"},
    {"id": "H5", "severity": "high", "title": "Residual French UI strings on EN pages (CTA, homepage, blog author box/CTA, footer); 'local union' mistranslation", "fix_location": "code+sanity"},
    {"id": "M1", "severity": "medium", "title": "Doubtful claim 'grandes voies de 100 à 1000 m'", "fix_location": "sanity"},
    {"id": "M2", "severity": "medium", "title": "Detail meta descriptions auto-truncated at 140 chars with '…'; stages 3j/7j duplicate; EN home desc 48 chars", "fix_location": "code+sanity"},
    {"id": "M3", "severity": "medium", "title": "Detail titles 66-104 chars, templated suffix, missing activity keyword", "fix_location": "code+sanity"},
    {"id": "M4", "severity": "medium", "title": "Generic one-word H1s; homepage H1 brand-only", "fix_location": "code+sanity"},
    {"id": "M5", "severity": "medium", "title": "Detail heading hierarchy H2>H4>H3>H4, emoji/'?' inside headings", "fix_location": "code"},
    {"id": "M6", "severity": "medium", "title": "No cross-links between tours/blog/guides; language switch goes to homepage", "fix_location": "code"},
    {"id": "M7", "severity": "medium", "title": "Blog stale: 2 posts, none since 2026-05-15", "fix_location": "sanity"},
    {"id": "M8", "severity": "medium", "title": "Hubs 285-375 words; evenementiel unchanged at 165", "fix_location": "sanity"},
    {"id": "L1", "severity": "low", "title": "Slug typo 'canoyn', accented slugs, FR slugs on EN", "fix_location": "sanity+code"},
    {"id": "L2", "severity": "low", "title": "No og:image on hub pages", "fix_location": "code"},
    {"id": "L3", "severity": "low", "title": "Two contact emails; 'Emma Four' vs 'Emma Aglaé'", "fix_location": "sanity"},
    {"id": "L4", "severity": "low", "title": "Some generic marketing intros", "fix_location": "sanity"},
    {"id": "L5", "severity": "low", "title": "Metadata checker: site_risk low, templated_ratio 0.0; minor echo on /fr/stages", "fix_location": "sanity"}
  ]
}
```
