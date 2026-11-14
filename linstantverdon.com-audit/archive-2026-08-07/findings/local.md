# Local SEO Audit — L'Instant Verdon (linstantverdon.com)

Business type detected: **Hybrid** (physical base address at La Palud-sur-Verdon + service-area guiding across multiple named canyon/climbing sites in the Gorges du Verdon). Industry vertical: **Home/Outdoor Services (adventure tourism guide)**.

## Score: 50/100

### Dimension Breakdown

| Dimension | Weight | Score /100 | Weighted |
|---|---|---|---|
| GBP Signals | 25% | 15 | 3.8 |
| Reviews & Reputation | 20% | 50 | 10.0 |
| Local On-Page SEO | 20% | 65 | 13.0 |
| NAP Consistency & Citations | 15% | 75 | 11.3 |
| Local Schema Markup | 10% | 80 | 8.0 |
| Local Link & Authority Signals | 10% | 40 | 4.0 |
| **Total** | | | **~50** |

---

### What Works

- **NAP is fully consistent** across the Footer (site-wide), `LocalBusiness` JSON-LD (present identically on `/fr/contact` and `/fr/a-propos`), and the visible Contact page text: address `395 Chem. de Haut Bourras, 04120 La Palud-sur-Verdon`, phone `+33 (0)6 89 85 53 81` (`+33689855381` in schema), email `contact@linstantverdon.com`.
- **Comprehensive `LocalBusiness` + `SportsActivityLocation` JSON-LD** present on Contact and About pages, including `telephone`, `email`, `address`, `geo`, `areaServed`, `openingHoursSpecification`, `aggregateRating`, `sameAs`, and `founder`/`employee` entries with credentials. (Deep schema-syntax grading deferred to the schema agent — flagging presence only, per scope.)
- **Dedicated hyper-local landing pages exist for individual canyon/climbing sites** (canyon-artuby, canyon-balene, canyon-baudan-baou, canyon-estelie-imbut, canyon-ferne, canyon-couloir-samson, canyon-st-auban, escalade-grande-voie), all in the sitemap. This structurally matches Whitespark's #1 local-organic ranking factor ("dedicated service pages") and gives each named site its own indexable local-search target (e.g. "canyon artuby avis").
- `areaServed` in schema explicitly lists Gorges du Verdon, Castellane, and La Palud-sur-Verdon — appropriate for a hybrid base-address/service-area guide business.
- **State certification signal is embedded in structured data**: founder Emma Aglaé ("Diplôme d'État de canyonisme", 2020) and staff Angèle Kanapa / Marie Oddo each carry an `EducationalOccupationalCredential`, and the schema `description` states "Guides diplômés d'État" — a strong E-E-A-T trust signal for a regulated outdoor-guiding business.
- Niche local citation present: **verdontourisme.com** (official Verdon tourism board directory listing) is included in `sameAs` — a high-relevance industry/geo citation.
- TripAdvisor business listing is referenced in schema `sameAs`.

---

### Critical

1. **No Google Business Profile signals detected anywhere on-site.** No Maps embed/iframe, no `sameAs` link to a Google Maps/GBP listing, and no "view on Google" / itinéraire CTA on Homepage, Contact, or About. GBP signals are Whitespark's single largest ranking-factor group (32%) and primary GBP category is the #1 individual factor — this is the largest gap found.
   - **Fix:** Confirm the GBP listing for "L'Instant Verdon" (La Palud-sur-Verdon) is claimed and verified; embed Google Maps on the Contact page; add a "Voir sur Google Maps" / directions link using the GBP place ID; add the GBP profile URL to JSON-LD `sameAs`.

2. **TripAdvisor link mismatch between schema and visible homepage link.** JSON-LD `sameAs` points to the business-specific TripAdvisor page (`...-d14924373-...-L_Instant_Verdon-...`), but the homepage's visible TripAdvisor icon links to a **different, generic** listing (`...-d14924372-...-Verdon_la_Palud_sur_Verdon...`) — not the business's own review page.
   - **Fix:** Correct the homepage social-icon link to point to the same TripAdvisor ID declared in schema (verify which ID is actually live/correct first).

---

### High

3. **No visible on-page reviews/testimonials or Google review count found** on Homepage, Contact, or About (checked via rendered HTML), despite `aggregateRating` (4.8, 54 reviews) being declared in JSON-LD on two pages. Structured-data ratings with no corresponding visible content create a user-trust gap and a data-consistency risk.
   - **Fix:** Add a visible testimonials/reviews section (Home and/or About) pulling real review excerpts and the review count from Google/TripAdvisor, so the schema claim is backed by visible content.

4. **Individual canyon/site landing pages were not fetched or content-audited in this session** (budget-limited) — their uniqueness, depth, and local-keyword targeting (difficulty, duration, distance, group size, "canyon artuby avis"-type phrasing) are unverified.
   - **Fix (follow-up):** Audit each canyon page for unique descriptive content vs. templated boilerplate, embedded local keywords, and internal links to/from Contact/About/blog.

---

### Medium

5. **No SIRET / business registration number found** on Contact, About, or footer. A "Mentions Légales" footer link exists but its content was not checked this session.
   - **Fix:** Confirm SIRET is present on the Mentions Légales page (legally required in France); consider also surfacing it in the footer as an added trust signal.

6. `geo` coordinates in JSON-LD use **4 decimal places** (43.7797, 6.3421) rather than the recommended 5-decimal precision.
   - **Fix:** Flagged for the schema-validation agent to formalize; increase precision if source data allows.

7. **Citation footprint appears thin.** Only TripAdvisor + verdontourisme.com confirmed via `sameAs`; no evidence checked/found for Bing Places, Apple Business Connect, a verified Facebook Business Page, or French directories (PagesJaunes, etc.). 3 of the top 5 AI-visibility ranking factors are citation-related (Whitespark 2026).
   - **Fix:** Build out Tier 1/industry citations (Bing Places, Apple Business Connect, confirm Facebook Page NAP matches, relevant outdoor-tourism directories).

---

### Low

8. **Team roster discrepancy to verify:** schema lists three people (founder Emma Aglaé + employees Angèle Kanapa and Marie Oddo), while the audit brief describes the business as currently run by two named guides.
   - **Fix:** Confirm Marie Oddo's status is current and intentional in schema; remove if outdated to avoid NAP/team inconsistency.

9. Opening hours in schema are a single blanket spec (08:00–20:00, all 7 days) — reasonable for a guide business but worth confirming this reflects real seasonal/booking availability, since "business open at time of search" is a documented Local Pack factor.
   - **Fix:** Consider seasonal `openingHoursSpecification` overrides if winter availability differs.

10. Keyword searches for "Diplôme d'État" / insurance ("assurance", "responsabilité civile") wording did **not** match in rendered Contact/About HTML text, though the credential exists in schema. Encoding artifacts (mojibake on accented characters) observed in this session's tooling output make this an unreliable negative signal rather than a confirmed absence.
    - **Fix:** Manually re-verify (in-browser) that certification/insurance trust badges are prominent in visible page copy, not only in structured data.

---

### Limitations

- No DataForSEO or Google Business Profile API access on this machine — GBP claim status, category, photo count, Posts activity, and live/native Google review data could not be verified directly. All GBP findings above are inferred solely from the *absence* of on-page linkage/embeds, not from checking the profile itself.
- Per coordinator instruction, this audit was stopped early to conserve budget. The individual canyon/climbing landing pages, the Mentions Légales/SIRET page, and any homepage review-widget/testimonial section were **not** fetched or directly inspected — related findings (#4, #5, #7) are inferred from sitemap structure and partial keyword searches only and should be treated as provisional.
- Rendered HTML captures in this session displayed character-encoding artifacts (mojibake on accented French characters) in local tooling output. This may have caused accented-keyword searches (e.g., "diplôme", "témoignage") to under-match even where content genuinely exists; findings dependent on those searches (#10) need manual re-verification in-browser.
- Citation presence was checked only via schema `sameAs` and visible homepage social icons — no direct `site:` search or fetch of Yelp, BBB, PagesJaunes, Bing Places, or Apple Business Connect was performed.
- Review velocity (the "18-day rule") and owner response rate could not be assessed — only a static `aggregateRating` snapshot (4.8/54) was available.
- LocalBusiness schema subtype correctness and full property completeness are being assessed in depth by a separate schema-validation agent; this report only flags presence/absence and a couple of local-relevant observations (geo precision, GBP absence in `sameAs`).
