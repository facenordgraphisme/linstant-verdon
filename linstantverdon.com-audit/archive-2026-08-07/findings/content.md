# Content Quality / E-E-A-T Audit — linstantverdon.com

Methodology: fetched server-rendered HTML (all pages confirmed non-SPA, `mode_used=raw`, i.e. content is present in initial HTML — no client-render gap) via `render_page.py --mode auto`, extracted main content with trafilatura, and manually reviewed text for E-E-A-T signals, word counts, FR/EN parity, and AI-content markers. Pages checked: homepage, canyoning, escalade/climbing, aventures/adventure, stages/weekend, insolite/unusual-activities, evenementiel, a-propos/about, faq, blog index, contact, both blog posts, and 12 individual tour pages (canyon-artuby, canyon-balene, canyon-bas-jabron*, canyon-baudan-baou*, canyon-estelie-imbut, canyon-ferne*, canyon-couloir-samson*, canyon-st-auban*, escalade-demi-journée*, escalade-grande-voie*, insolite-la-carelle*, soirée-insolite-portaledge*, mainmorte*, nuit-portaledge*, stages-3-jours*, stages-7-jours*, trou-du-renard*) — all in FR and EN. (*word counts gathered for all; full text spot-checked on a representative subset — artuby, balene, estelie-imbut, stages, insolite, evenementiel, aventures, canyoning, escalade, home, about, faq, contact, both blog posts.)

**Limitation:** Due to a budget cutoff mid-audit, the remaining ~8 tour pages were fetched for word count only, not fully re-read line-by-line; the patterns found (thin content, template repetition, EN i18n gaps) were confirmed as systemic across the fully-reviewed subset and the word-count data is consistent across all pages, so findings below should generalize, but a follow-up pass reading the unread tour pages verbatim is recommended before treating item counts as exhaustive. Visual/image checks (real photos vs stock, guide headshots) and schema markup were not verified — this pass was text-extraction only.

## Score: 42/100

### What Works
- **Named, credentialed guides with real bios.** Homepage and About page name three guides — Emma Aglaé (Diplômée d'État de canyonisme, 2020, cofounder since 2018), Angèle Kanapa (Brevet d'État d'escalade et canyonisme, 2013), Marie Oddo (Diplômée d'État, 2020) — with personal, specific bios (grew up in the Verdon / grew up in Ardèche, worked in Marseille and Corsica, etc.). This is exactly the first-hand-expertise signal Google's QRG rewards for a safety-relevant activity business, and it's rare for small tourism sites to do this well.
- **Authentic first-person voice**, not generic AI filler: homepage and blog content is attributed to "Emma et Angèle" recommending specific real places ("Le canyon du Saint-Auban... vous pourrez acheter des victuailles locales chez La Gardoise"), which reads as genuine local knowledge rather than templated copy.
- **Individual tour pages carry concrete, specific, quotable facts**: exact meeting points, promised GPS-pin delivery by email, jump heights ("sauts pouvant aller jusqu'à 8 mètres"), age minimums, durations, inclusions, and prerequisites. This is good raw material for AI-citation/snippet extraction even though page length is thin (see Medium #6).
- **The multi-day "stages" (camp) page is genuinely strong**: 812 words (FR), day-by-day itinerary tables for both the 3-day and 7-day formats, transparent pricing, packing list, and transport/accommodation policy. It clears the service-page word floor and is the best-executed page on the site — a template other pillar pages should be brought up to.
- No evidence of keyword stuffing anywhere reviewed; keyword usage (canyoning, escalade, Gorges du Verdon) reads naturally.

### Findings

#### Critical

**1. English pillar/category pages are effectively broken — untranslated French UI strings and missing intro copy, duplicated fragments.**
`/en/canyoning`, `/en/climbing`, `/en/adventure`, `/en/unusual-activities` render with only 42–114 words each and are missing the entire editorial intro paragraph present on the FR equivalents. What text does render is largely **still in French**, verbatim: "Notre Sélection", "Découvrez nos parcours phares", "Chaque parcours est encadré par un guide diplômé d'État passionné par son métier et son territoire", "À partir de", "Âge min.", "ans", "Durée". On `/en/canyoning` and `/en/climbing` this French fragment is even **duplicated twice** on the same page. Example, full extracted text of `/en/canyoning`:
```
Notre Sélection
Découvrez nos parcours phares
Chaque parcours est encadré par un guide diplômé d'État passionné par son métier et son territoire.
Notre Sélection
Découvrez nos parcours phares
Chaque parcours est encadré par un guide diplômé d'État passionné par son métier et son territoire.
```
This is shown to users on an `en` hreflang URL, which is worse than "thin" — it's mixed-language content served to English-only visitors exactly when they need certainty about safety-critical adventure bookings. It also risks Google evaluating the EN page as near-duplicate/low-value against FR. **Fix:** audit Sanity for missing `en`-locale values on the category-page schema (intro text, CTA, card labels: "Notre Sélection" → "Our Selection", "À partir de" → "From", "Âge min." → "Min. age", "Durée" → "Duration", "ans" → suffix removed/translated); fix the template so a missing translation renders nothing/a placeholder rather than leaking the FR fallback twice; QA every `/en/` URL before next deploy.

**2. `/en/a-propos` (About) — the primary trust/E-E-A-T page — has an entire lede paragraph left in French.**
Extracted EN text: *"L'Instant Verdon est né d'une passion commune pour les grands espaces et l'aventure. Basés à la Palud sur Verdon, au cœur des Gorges du Verdon, nous vous accompagnons dans vos explorations les plus sauvages."* — untranslated on the English page, along with "Nos Partenaires" / "Ils nous font confiance et partagent nos valeurs". On the page whose job is to build authority and trust, this reads as unfinished/careless to English-speaking prospects (a large share of Verdon tourism traffic) and undercuts the credential signals sitting right next to it. **Fix:** fill the missing `en` fields in Sanity for the about-page document; add a translation-completeness lint/QA step to the publish flow.

#### High

**3. Category/pillar pages sit far below the 800-word service-page floor — and these carry the highest sitemap priority (0.8–0.9).**
FR word counts: `/fr/escalade` 83, `/fr/aventures` 99, `/fr/canyoning` 133, `/fr/insolite` 134, `/fr/evenementiel` 164. Each is essentially a one-line intro + booking CTA + card grid pointing to tour pages, with no coverage of safety standards, seasonal availability, difficulty spread, who each activity suits, or activity-specific FAQ. These are the pages meant to establish topical authority for "canyoning Verdon" / "escalade Verdon" etc. and currently under-deliver relative to competitors likely covering this ground. **Fix:** expand each to 500–800+ words: safety/certification overview, seasonal notes, how the listed tours differ, and 3–5 activity-specific FAQ entries (also gives FAQPage schema material).

**4. No trust/safety signals found anywhere in the site's text content.**
Across every page reviewed (home, about, contact, FAQ, all category and tour pages), there is no mention of: professional liability insurance, a recognized federation/qualifying body beyond the generic "syndicat local" (regroupement de travailleurs indépendants), customer reviews or ratings (no Google/TripAdvisor/Avis Vérifiés content), or a stated safety/incident protocol. Trustworthiness is the heaviest-weighted E-E-A-T factor (30%) and is precisely what a safety-conscious visitor booking canyoning/climbing/via-ferrata activities is looking for. The FAQ even defers the cancellation policy to an off-page CGV link rather than summarizing it. **Fix:** add a visible "Sécurité & Assurance" section (insurance carrier, guide certifying body, safety protocol summary) on About/homepage; embed real testimonials/review content with names/dates on homepage and tour pages.

**5. FAQ page is extremely thin: 3 questions, 64 words (FR) / 68 words (EN).**
Only equipment, swimming requirement, and a cancellation-policy deferral are covered. Obvious missing questions for an outdoor adventure operator: weather/river-level cancellation policy, minimum age per activity, physical-fitness/medical restrictions, group size limits, pricing range, deposit/payment method, parking, changing facilities. **Fix:** expand to 10–15 real on-page Q&As (strong AI-citation and FAQPage-schema opportunity, currently wasted).

#### Medium

**6. Individual tour pages are short (150–300 words) and follow a rigid, repeated template with near-verbatim boilerplate.**
Structure is consistently Description / Lieu de rendez-vous / Ce qui est inclus / Pré-requis, and phrases like "guide diplômé d'État" and "Le point GPS exact accompagné d'un plan de rendez-vous détaillé vous sera également envoyé par e-mail après réservation" repeat near-identically across canyon-artuby, canyon-balene, canyon-estelie-imbut, and (by word-count pattern) the remaining canyon/climbing/insolite pages. The per-canyon descriptive paragraph itself does read as genuinely specific (different jump heights, difficulty, location), so this isn't hollow AI content — but the September 2025 QRG explicitly flags "repetitive structure across pages" as a marker to watch for, and several pages (172 words for a multi-hour guided descent with real risk factors like canyon-artuby) sit below even the 300–400 word complex-product-page floor. **Fix:** vary connective boilerplate per page; add 1–2 unique paragraphs per canyon (difficulty grade, best season, a guide anecdote/highlight) to reduce structural sameness and lift thinner pages over 300–400 words.

**7. EN tour pages leave section headers untranslated even where body prose is translated.**
On `canyon-artuby/en` and `canyon-estelie-imbut/en`, the description paragraphs are fully translated into fluent English, but section labels remain French: "📸 Galerie Photos", "Ce qui est inclus", "Pré-requis". Smaller instance of the same i18n bug as Critical #1/#2, but present at the detail-page level too — likely a hardcoded/shared component rather than a CMS field. **Fix:** extend the translation fix to the tour-page template's static labels, not just CMS body fields.

**8. EN guide bios are meaningfully abridged versus FR, weakening the expertise signal for English readers.**
Emma's FR bio (homepage/about) is 3 sentences: cofounder since 2018, grew up in the Verdon, passion for outdoor activities and acro-yoga, personality note. The EN version is 1 sentence: "State-certified canyoning instructor since 2020. Emma grew up in the Verdon and knows every secret corner of the Gorges." — missing the cofounder credential and personality detail. Same pattern for Angèle. **Fix:** translate full bios rather than shortened summaries.

#### Low

**9. Blog has only 2 posts (~196–310 words), both short seasonal listicles rather than in-depth guides.**
Content is genuinely first-hand (named-guide authorship, real place names, concrete local tips — e.g. "achetez des victuailles locales chez La Gardoise") which is a real E-E-A-T positive worth preserving, but at this length they function as short update posts, not the 1,500-word evergreen guides that best serve organic search/AI-citation goals. **Fix:** either keep as short "seasonal picks" posts (fine as a content type) or invest in 1–2 flagship long-form guides (e.g., "Complete guide to canyoning in the Verdon: difficulty levels, season, what to expect") if blog is meant to drive organic acquisition.

**10. Minor extraction artifact on FAQ pages**: each question is preceded by a stray "?" character in the extracted text (both FR and EN), suggesting an icon-font glyph that may not render for all users/fonts. Cosmetic; verify visually in-browser rather than relying on this text-only pass.

---

### E-E-A-T Breakdown

| Factor | Weight | Score | Rationale |
|---|---|---|---|
| Experience | 20% | 12/20 | Strong first-hand voice and named-guide storytelling on homepage/blog, but no visible customer reviews/testimonials, and this signal doesn't extend into the thin category pages. |
| Expertise | 25% | 17/25 | Genuine, specific state diplomas for 3 named guides (dates, certification type) — but this detail lives only on homepage/about; individual tour pages just say "guide diplômé d'État" generically without naming/linking the guide. |
| Authoritativeness | 25% | 11/25 | "Nos Partenaires" section exists but partner names/logos not verifiable in text; no press mentions, no federation affiliation stated beyond "syndicat local," no external citations found. |
| Trustworthiness | 30% | 12/30 | Address and phone present, 24h response promise — but no insurance/safety statement, no reviews, cancellation policy hidden behind a CGV link, and the EN version of the trust-building About page is partly untranslated. |
| **Weighted total** | | **~50/100 raw E-E-A-T** (folded into overall content score alongside thin-content and duplication penalties) | |

### AI Citation Readiness: 48/100
Positives: tour pages contain concrete, structured, quotable facts (prices, durations, age minimums, jump heights, inclusions/prerequisites lists) that are extraction-friendly. Negatives: pillar pages and FAQ are too thin to serve as citation sources for broader queries ("is canyoning safe for beginners in the Verdon," "what to bring canyoning"); no visible FAQ/HowTo schema signal in extracted content; EN pages' language-mixing would likely disqualify them from clean citation in English-language AI answers. Schema markup itself was not verified in this text-only pass — recommend a follow-up technical check.
