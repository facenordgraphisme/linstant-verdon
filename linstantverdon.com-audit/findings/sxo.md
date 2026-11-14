# SXO Audit - linstantverdon.com

Date: 2026-11-14 | Scope: /fr/canyoning, /en/canyoning, /fr/escalade (+ initiation detail), /fr/insolite (+ nuit-portaledge), /fr/evenementiel, plus the Artuby detail page as the reference product page.
Method: pages rendered with `render_page.py --mode always` (Playwright, post-JS DOM). Not SPA (`is_spa=false`), all pages 200. SERP sampled for 9 queries via WebSearch, top ~10-20 results each.

## SXO Gap Score: 56/100 (primary page /fr/canyoning)

*This is the SXO Gap Score. It is separate from the SEO Health Score and only measures how well the page matches search intent and the search experience.*

| Page | SXO Gap Score | Mismatch severity |
|---|---|---|
| /fr/canyoning | 56 | MEDIUM: format matches; depth and trust lag |
| /en/canyoning | 50 | MEDIUM: same, plus French UI text left in |
| /fr/escalade + /fr/escalade/escalade-demi-journée-découverte | 48 | HIGH: group price shown as "€ / pers." |
| /fr/insolite + /fr/insolite/nuit-portaledge | 52 | MEDIUM for "nuit portaledge" (winnable); HIGH for "activité insolite verdon" (listicle SERP) |
| /fr/evenementiel | 34 | HIGH: generic "contact us" page; EVJF intent wants packages |

---

## 1. Lead finding: the site is invisible in non-branded SERPs. Marketplaces, tourism offices and affiliate blogs rank instead.

**Severity: CRITICAL (visibility). Format mismatch itself: MEDIUM.**

linstantverdon.com did not appear in any results for the sampled non-branded queries. Branded "linstantverdon canyoning La Palud" only returned third-party listings (moustiers.fr, provence-alpes-cotedazur.com, verdontourisme.com). linstantverdon.com itself was not returned.

### SERP composition (backwards analysis)

| Query | Marketplace product/category | Tourism office / regional listing | Editorial guide / listicle | Operator's own site | Dominant type (confidence) |
|---|---|---|---|---|---|
| canyoning verdon | Manawa x2, Yumping x3, Funbooker | lacs-gorges-verdon x2, provence-alpes-cotedazur x2, moustiers.fr | voyagetips, checkyeti blog, france.fr, ultimatefrance, verdonsecret, voyageavecnous | none | Product/marketplace + Comparison guide (approx. 40/35/25) |
| canyoning gorges du verdon | Manawa x6 (Baou, Artuby, category, map), Funbooker, Adrenactive | lacs-gorges-verdon | voyagetips x3, voyageavecnous, checkyeti, ultimatefrance | none | Product/marketplace (approx. 55%) |
| canyoning verdon gorge (EN) | Manawa (DE), Yumping x2, ebookers, kimkim, Explore-Share, CheckYeti, lokalee | lacs-gorges-verdon, provence-alpes-cotedazur | voyagetips, france.fr, ultimatefrance | none | Product/marketplace (approx. 60%) |
| escalade gorges du verdon initiation | Manawa x2, Adrenactive x3, Explore-Share x4, Yumping | provence-alpes-cotedazur x6 (Rock'n Wild, Rocksiders, Vertigo, Corditelle), lacs-gorges-verdon | (dumas thesis) | none | Product page "initiation 1/2 journée" (approx. 70%) |
| escalade verdon guide | Manawa x2, Explore-Share x2 | provence-alpes-cotedazur, verdontourisme | topo/guidebook sites (thecrag, climbingaway, planetmountain, mountainproject) | none | Mixed: Service + Topo (no consensus) |
| nuit portaledge verdon | none | verdontourisme (portaledge evening), other regions' tourism offices (Chamrousse, Courchevel, Grenoble, Haute-Savoie) | forums (randonner-leger), "où dormir" guides | none | Product listing, but weak SERP with low competition |
| activité insolite verdon | Funbooker x2, Manawa x4, Adrenactive x2 | moustiers.fr | voyagetips, cap-adrenaline "top 12", jds "7 activités", sixt magazine, kayak.fr | none | Listicle/Comparison (approx. 55%) |
| evjf verdon / EVJF gorges du verdon canyoning | Manawa activity pages | verdontourisme | vvanat.fr (EVJF agency, Pyrénées) | none | No consensus. The intent is under-served and is an opportunity. |

### What the winners show (Manawa Artuby listing, run by Rocksiders, used as the benchmark)
"Dès 65 €", 3h30, 10 years and up, "Sportif occasionnel" level, max 8 per instructor, 6 photos, **Annulation : Flexible + garantie météo**, an itemised **included list with "combinaison néoprène"**, an excluded list, a what-to-bring list, a meeting-point map, an availability calendar, languages EN/FR, and a site-wide rating of 4.7 from 38k reviews.
The editorial winner, voyagetips (about 4-5k words), uses a **canyon comparison table (durée / niveau / prix dès)**, eight named canyons (including Balène and Ferné, which L'Instant Verdon sells), an FAQ, and affiliate links to Manawa/GetYourGuide/Adrenaline-Hunter.

### Diagnosis
- **The page type is right but the format is incomplete.** /fr/canyoning is a catalog hub with 8 cards (price, minimum age, duration), so it matches the marketplace category format. It is missing the fields the SERP uses for decisions: **niveau/difficulty, max jump/rappel height, group size, cancellation/weather guarantee, visible reviews, and languages**.
- **Content depth:** 658 rendered words compared with about 4-5k for the editorial winner. There is no comparison table and no "quel canyon choisir" matrix.
- **Distribution gap:** competitors win through *listings*, not just their own sites. The fastest channel is to list L'Instant Verdon products on Manawa / CheckYeti / Explore-Share and to get the canyons mentioned in voyagetips / checkyeti blog / cap-adrenaline. This is off-page, so see `/seo backlinks`.

---

## 2. Page-level findings (concrete changes)

### HIGH: Escalade initiation shows a group price as "Prix / pers.", which reads as 4x the market rate
- /fr/escalade card: "À partir de 200€". Detail page: the value is "1 à 3 pers. : 200€ / 4 à 8 pers. : 250€" but the label says **"Prix / pers."**. Product schema has `price: 200` with no unit.
- Competitors in the "escalade gorges du verdon initiation" SERP (Manawa, Adrenactive, Yumping) all show per-person prices of roughly €45-65. A family of 4 actually pays €62.50/person, which is competitive, but the page reads as €200/person.
- **Change:** card label "Dès 31€/pers. (groupe de 8)" or "Groupe privé dès 200€ (1-3 pers.)". Rename the detail label from "Prix / pers." to "Prix du groupe". Add a small table (1 / 2 / 3 / 4 / 6 / 8 pers. → €/pers.). In schema, use `PriceSpecification` with `referenceQuantity` or one `Offer` per group band, or drop the Product schema price.
- Same check needed on /fr/escalade/escalade-grande-voie ("À partir de 200€") and on insolite cards (170€ / 190€ / 650€). It must be clear whether these are per person or per group.

### HIGH: Contradictory decision data on product pages (trust killer for families and gift buyers)
| Page | Contradiction |
|---|---|
| /fr/canyoning/canyon-artuby | Sold as "initiation ... tous niveaux, 7 ans+" and recommended in the hub FAQ for a "première sortie", but **Pré-requis = "Avoir déjà pratiqué la descente en rappel ou l'escalade"** (copied from escalade-grande-voie, the only other page with this string). "Ce qui est inclus" lists **no combinaison néoprène**, although every other canyon page mentions one. The EN page has the same problem. |
| /fr/insolite/nuit-portaledge | Spec strip **"14 ans+"** vs prerequisite **"Âge minimum 16 ans"**. "Inclus : Bivouac complet **et repas**" vs description "L'Instant Verdon **ne fournit pas les repas**, sacs de couchage". Duration "15h (18h à 9h)" vs "descente en rappel dans l'après-midi". Meeting point "L'instant Verdon **Castellane**" while the business is in La Palud. Product schema `touristType: Familles, Sportifs, Débutants`, which is wrong for an experienced-climbers-only product. |
| /fr/canyoning hub | FAQ says family canyons are "dès 7-8 ans (Balène, Bas-Jabron)", but the Balène card says **6 ans**. |
| All Product schemas | `touristType` is hard-coded ["Familles","Sportifs","Débutants"] on every product. |
- **Change:** fix the Sanity content per product (prerequisites, included list, age, meeting point). Make `touristType` a per-product CMS field.

### HIGH: 4.9/5 from 276 reviews exists only in JSON-LD, with no visible social proof on money pages
- `aggregateRating 4.9 / 276` is in the site-wide LocalBusiness schema. Rendered pages contain no visible rating, star, testimonial or review quote. "avis" appears only on /fr/stages, and TripAdvisor is just a footer link.
- Every SERP competitor shows a rating next to the price. Marked-up ratings that are not visible also carry a structured-data policy risk.
- **Change:** add a review strip under the hero of every hub ("★ 4.9/5 - 276 avis Google/TripAdvisor" + 3 short quotes segmented by persona: famille, groupe d'amis, EVJF). Add 2-3 product-specific quotes on each detail page. Only keep `aggregateRating` in markup where it is visible.

### HIGH: /fr/evenementiel does not answer EVJF intent (306 words, no offer)
- The content is "Contactez-nous, on vous proposera une activité adaptée". There is no package, no price band, no programme, and no group-size table beyond "jusqu'à 50 personnes". The two gallery captions are the only EVJF content. The CTA goes to the generic /fr/contact.
- The "evjf verdon" SERP is unclaimed: no Verdon operator page ranks, and the only EVJF agency result is about the Pyrénées. A dedicated page could rank quickly.
- **Change:** create `/fr/evenementiel/evjf-evg-verdon` (and EN `/en/evenementiel/hen-stag-party-verdon`) with:
  - **2-3 packages**: "EVJF Fraîcheur - Canyon Artuby/Samson 2h30, dès X€/pers., 6-15 pers."; "EVJF Sensations - Saint-Auban + apéro portaledge"; "EVG Aventure - Trou du Renard + canyon".
  - A **price-per-person table by group size**, a "déguisement autorisé?" FAQ, photo pack, a timeline (matin canyon / après-midi libre), nearby lodging and restaurants in La Palud.
  - A **devis form** (date, group size, budget, level) plus a WhatsApp CTA.
  - Real EVJF photos and testimonials.
- Keep /fr/evenementiel as a hub with separate blocks for team building / séminaire (capacity, indoor fallback, invoicing/CE).

### MEDIUM: /en pages leak French UI
- /en/canyoning (and the other EN hubs) hero CTA is **"RÉSERVER VOTRE SORTIE"**. The EN footer tagline is French ("Expert en aventures outdoor dans les Gorges du Verdon..."). Detail pages are translated ("BOOK YOUR TRIP").
- The hub copy tells foreign visitors to **"call us"** to choose a canyon, which is a high barrier for non-French speakers. The page also never says which languages the guides speak; Manawa shows "EN/FR".
- **Change:** translate the hero CTA and footer. Add "Guides speak English" (plus any other languages) to the spec strip. Replace "call us" with a 3-question canyon chooser or a level table, plus a WhatsApp CTA ("Message us on WhatsApp, we reply in English").

### MEDIUM: Missing decision fields on canyoning cards and detail pages compared with the SERP benchmark
- Add to every card or spec strip: **Niveau (1-5 or Famille / Découverte / Sportif)**, **saut max / rappel max (m)**, **taille de groupe max**, **langues**, **période (mi-avril → fin octobre)**.
- Add a **"Annulation gratuite + garantie météo"** badge next to the price. The policy already exists in /fr/faq CGV and in the hub FAQ ("reportée ... sans frais"), but it is not shown at the decision point.
- On the hub, add a **comparison table** (canyon / âge / durée / niveau / sauts / prix dès / idéal pour). This is the voyagetips format that ranks, and it is also a candidate for a table featured snippet.
- Grow the hub to roughly 1,200-1,500 words: "quel canyon choisir selon votre groupe", what to bring, season and water levels, and the difference between canyoning and aqua-rando (Couloir Samson).

### MEDIUM: "activité insolite verdon" is a listicle SERP and /fr/insolite is a 3-product hub
- The ranking pages are "top 12 / 7 activités sensationnelles / meilleures activités" lists and marketplace category pages. Portaledge is the most unusual offer in the gorge and is absent from those lists.
- **Change:** publish a blog listicle "10 activités insolites dans les Gorges du Verdon" (portaledge apéro and nuit, La Carelle giant rappel, via cordata Trou du Renard, Couloir Samson, plus third-party ideas such as bungee at the Artuby bridge or ballooning near Valensole). Include a comparison table and link to /fr/insolite. Pitch the portaledge to jds.fr / cap-adrenaline / voyagetips for inclusion.
- The "nuit portaledge verdon" SERP is weak (tourism listings for other regions, forums, and the verdontourisme portaledge listing does not name an operator). The /fr/insolite/nuit-portaledge page can win it once the contradictions are fixed. Add an FAQ (toilettes, météo/vent, est-ce autorisé dans les gorges, que faire si j'ai peur, couple/2 pers. pricing, idée cadeau), put "nuit en portaledge" in the H1, and offer a **bon cadeau** CTA.
- The nuit-portaledge, Carelle and grande-voie "RÉSERVER VOTRE SORTIE" buttons go to /fr/contact but sit next to "Paiement sur place • Réservation 100% Gratuite". Either label the button "Demander une date" or connect it to the booking engine.

### LOW
- Escalade hub copy says "grandes voies ... de 100 à 1000m". Verdon walls top out around 300-400 m, so an experienced climber will notice. Correct it to the real range.
- The hub and detail pages have no video, although a YouTube channel exists. Embed a 30-60s canyon clip on /fr/canyoning and a portaledge clip on /fr/insolite. Media is a key persuasion asset for "insolite".
- /fr/faq H3s render with a leading "?" (icon glyph likely in the heading text). Move the icon out of the heading.

---

## 3. User stories (derived from SERP signals)

1. **Awareness, family.** As a parent of teens, I want to know which Verdon canyon suits a 12- and 14-year-old, because I am anxious about safety, but I'm blocked by Artuby saying "7 ans+" and "must have rappelled before" at the same time. *Signal: AI answer blocks for "canyoning gorges du verdon" segment by age ("Couloir Samson dès 7 ans", "Saint-Auban 14 ans+", "Riou/Saint-Auban pas recommandés en famille"); voyagetips table with a "niveau" column.*
2. **Consideration, price comparer.** As a visitor comparing offers on Manawa/Yumping, I want a per-person price, duration and level I can compare at a glance, because marketplaces show "Dès 65€, 3h30, 4.7★", but I'm blocked by "200€" labelled per person and no visible rating. *Signal: marketplace product pages hold 40-70% of results for every canyoning/escalade query; result titles include duration ("3 hours", "2h", "1/2 day").*
3. **Decision, foreign tourist.** As an English-speaking tourist, I want to book a canyon without phoning anyone, because I'm unsure of my French, but I'm blocked by "call us to choose your canyon" and French buttons. *Signal: the EN query SERP is dominated by Manawa/Yumping/ebookers/kimkim with instant booking and listed languages.*
4. **Consideration, EVJF organiser.** As the maid of honour, I want a ready-made EVJF package with a price per person for 10-12 friends, because I need to collect money upfront, but I'm blocked by "contactez-nous" with no numbers. *Signal: "evjf verdon" returns no relevant operator page; the EVJF agency result (vvanat) sells canyoning/rafting packages for the format.*
5. **Decision, insolite gift buyer.** As someone buying a portaledge night as a gift, I want to know what is included and the minimum age, because it costs 650€, but I'm blocked by 14 vs 16 ans and "repas inclus" vs "repas non fournis". *Signal: "nuit portaledge" results from other regions (Chamrousse, Haute-Savoie at 390/540€) list clear inclusions and tiers; verdontourisme lists a "soirée suspendue en portaledge".*

---

## 4. Persona scoring (weakest first)

| Persona (page) | Relevance | Clarity | Trust | Action | Total |
|---|---|---|---|---|---|
| EVJF organiser (/fr/evenementiel) | 11 | 7 | 9 | 13 | **40** |
| Price comparer from marketplaces (/fr/escalade + initiation) | 16 | 8 | 14 | 14 | **52** |
| Insolite / gift buyer (/fr/insolite/nuit-portaledge) | 20 | 11 | 13 | 10 | **54** |
| Foreign tourist (/en/canyoning) | 18 | 14 | 13 | 15 | **60** |
| Experienced sporty group (Ferné / Estelié-Imbut / grande voie) | 18 | 14 | 15 | 16 | **63** |
| Family with teens (/fr/canyoning + Artuby) | 20 | 17 | 14 | 18 | **69** |

Key fixes per persona:
- **EVJF organiser (40):** dedicated EVJF page with packages, €/pers. by group size, devis form + WhatsApp, real EVJF photos and testimonials.
- **Price comparer (52):** per-person price display, rating next to price, "annulation gratuite / garantie météo" badge, levels on cards.
- **Gift buyer (54):** fix contradictions, add a "bon cadeau" CTA, a real booking path (not a contact form), a portaledge FAQ and video.
- **Foreign tourist (60):** translate the remaining FR UI, add guide languages, replace "call us" with a chooser or table, add WhatsApp in English, show reviews.
- **Sporty group (63):** technical sheet per sporty canyon (longest rappel, number of rappels, approach/return time, cotation v/a/I), group discount, combination stays (link /fr/stages).
- **Family (69):** fix the Artuby prerequisites and the missing wetsuit, add a "niveau famille" badge, max jump height with "sauts non obligatoires" in the spec strip, family testimonials.

---

## 5. Gap analysis detail (/fr/canyoning)

| Dimension | Score | Evidence |
|---|---|---|
| Page type | 10/15 | Catalog hub with priced cards matches the marketplace category format. It lacks the comparison table and level data that the editorial winners use. |
| Content depth | 7/15 | 658 rendered words and 3 FAQs, compared with about 4-5k words, 8 canyons, a table and an FAQ on voyagetips. |
| UX signals | 10/15 | CTA above the fold, card spec (price/age/duration), booking engine and "paiement sur place". The hub says to "call us" to choose, and there is no level filter or cancellation badge. |
| Schema | 8/15 | LocalBusiness + aggregateRating sitewide. Detail pages have Product+TouristTrip+Offer and BreadcrumbList. The hub has no ItemList/FAQPage (FAQPage gives no rich result now anyway). Offers lack a price unit, `touristType` is generic, and the rating is not visible. |
| Media | 8/15 | 11 images on the hub with alt text present. No video, and no image per canyon showing difficulty. |
| Authority | 8/15 | DE/BE credentials and insurance are stated. The 276 reviews are invisible, there are no testimonials, and there are no press or partner badges (Parc du Verdon / verdontourisme). |
| Freshness | 5/10 | No season or "mis à jour 2026" signal on the page. htmldate guesses 2026-01-01. |
| **Total** | **56/100** | |

---

## 6. Cross-skill recommendations
- `/seo schema`: per-product `touristType`, group-price `PriceSpecification`, and visible-only `aggregateRating`.
- `/seo content`: EVJF page, the canyon comparison guide, the "activités insolites" listicle, and the review/testimonial E-E-A-T layer.
- `/seo local`: the Google Business Profile is the main lever for "canyoning verdon"-type map packs. The third-party listings (moustiers.fr, PACA tourism, verdontourisme) already rank for the brand.
- `/seo backlinks`: marketplace listings (Manawa/CheckYeti/Explore-Share) and inclusion in the voyagetips / checkyeti / cap-adrenaline listicles.

## 7. Structured findings (for audit-data.json, category "Search Experience")
```json
[
 {"id":"sxo-01","severity":"critical","title":"Site absent from all sampled non-branded SERPs; marketplaces/tourism offices/blogs dominate","pages":["/fr/canyoning","/en/canyoning","/fr/escalade","/fr/insolite"]},
 {"id":"sxo-02","severity":"high","title":"Group price displayed as 'Prix / pers.' (escalade initiation 200EUR) vs EUR45-65/pers in SERP","pages":["/fr/escalade","/fr/escalade/escalade-demi-journée-découverte"]},
 {"id":"sxo-03","severity":"high","title":"Contradictory prerequisites/age/inclusions on product pages (Artuby, Nuit portaledge, Balène age)","pages":["/fr/canyoning/canyon-artuby","/fr/insolite/nuit-portaledge","/fr/canyoning"]},
 {"id":"sxo-04","severity":"high","title":"4.9/276 rating only in JSON-LD; no visible reviews on money pages","pages":["sitewide"]},
 {"id":"sxo-05","severity":"high","title":"Evenementiel page lacks EVJF packages/prices/quote form; 'evjf verdon' SERP unclaimed","pages":["/fr/evenementiel"]},
 {"id":"sxo-06","severity":"medium","title":"EN hubs keep French CTA/footer; 'call us' barrier; no guide languages","pages":["/en/canyoning","/en/climbing","/en/unusual-activities"]},
 {"id":"sxo-07","severity":"medium","title":"Missing level, max jump, group size, cancellation badge, comparison table vs SERP benchmark","pages":["/fr/canyoning"]},
 {"id":"sxo-08","severity":"medium","title":"'activité insolite verdon' is a listicle SERP; no listicle content; portaledge contact-only CTA","pages":["/fr/insolite","/fr/insolite/nuit-portaledge"]},
 {"id":"sxo-09","severity":"low","title":"Escalade copy '100 à 1000m' inaccurate; no video; FAQ heading glyph","pages":["/fr/escalade","/fr/faq"]}
]
```

## Limitations
- The SERP was sampled with the WebSearch tool, which is **not a live Google.fr SERP**. Ads, local pack, PAA, AI Overview and exact positions could not be captured, and the site's absence may partly reflect that index. Verify positions in Google Search Console (Performance → queries "canyoning verdon", "canyoning gorges du verdon") or with a rank tracker.
- No search volume data. "evjf verdon" and "nuit portaledge verdon" are likely low volume, so the opportunity is judged on intent and competition only.
- Competitor depth was checked on 2 pages (the Manawa Artuby listing and the voyagetips guide). The other classifications come from titles, URLs and snippets.
- The book-adventure.fr booking flow (languages, instant confirmation, mobile UX) was not tested. Above-the-fold layout was judged from DOM order, not screenshots.
- Mobile rendering and Core Web Vitals are out of scope (see the performance findings).

Generate a PDF report? Use `/seo google report`.
