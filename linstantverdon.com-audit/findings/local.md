# Local SEO - L'Instant Verdon (2026-11-14) - Score 58/100 (August: 50)

Type: hybrid (base address + service area). Vertical: outdoor activity provider (canyoning, climbing). Schema: ["LocalBusiness","SportsActivityLocation"].

| Dimension | Weight | Score | Pts |
|---|---|---|---|
| GBP signals | 25% | 45 | 11.3 |
| Reviews and reputation | 20% | 45 | 9.0 |
| Local on-page | 20% | 60 | 12.0 |
| NAP and citations | 15% | 70 | 10.5 |
| Local schema | 10% | 75 | 7.5 |
| Local links/authority | 10% | 40 | 4.0 |
| Total | | | ~54-58 (reported 58 with round-up for the fixed Maps embed) |

## Progress since August
- FIXED: Google Maps iframe embed on /fr/contact (output=embed, titled) and "view on Google Maps" link; Maps search URL added to JSON-LD sameAs (item 17 partly done).
- FIXED: TripAdvisor link now consistent (homepage/footer and schema both use d14924373).
- FIXED: aggregateRating updated 4.8/54 to 4.9/276.
- FIXED: /llms.txt now carries NAP, SIRET, guides and credentials.
- NOT FIXED: verdontourisme.com listing URL still returns 404 (item 18), still linked in footer on all 60 pages and in sameAs.
- NOT FIXED: geo still 4 decimals (43.7797, 6.3421); no visible reviews; no Castellane/Moustiers pages.

## NAP consistency
Footer/contact/JSON-LD/llms.txt all match: 395 Chem. de Haut Bourras, 04120 La Palud-sur-Verdon; +33 (0)6 89 85 53 81 (schema +33689855381, fine); contact@linstantverdon.com. No discrepancy found. Minor: the Maps embed query uses "Chemin" instead of "Chem." (harmless). Name casing varies: "L'instant Verdon" (schema/title) vs "L'Instant Verdon" (H1/llms/maps). Pick one.
Third parties: Facebook (linstantverdon) and Instagram (linstant_verdon) return 200 but NAP content is login-walled and unverifiable. TripAdvisor returned 403 to bots (cannot verify). Verdon Tourisme = 404. PagesJaunes, Bing Places, Apple Business Connect: not checked (no paid tools/search); unknown. A maps.app.goo.gl short link is in the HTML (appears in some pages' external links) but it resolves to "le point sublime verdon", NOT the business GBP, so it must not be used as the GBP link.

## Findings
1. HIGH - Verdon Tourisme listing 404 (https://www.verdontourisme.com/commerces-services/linstant-verdon-la-palud-sur-verdon/), linked on every page plus sameAs. Lost best local citation, broken link in footer. Fix: ask the tourism office for the new URL or re-register; remove from footer/sameAs until restored.
2. HIGH - GBP still not verifiable/linked: the sameAs/CTA use a search URL (maps/search/?api=1&query=...), not the real GBP/CID/place URL. The embed is a query embed, so a place card (rating, photos) is not guaranteed. Fix: use the GBP "share" URL (g.page / maps.app.goo.gl of the real listing) in sameAs and the CTA, and the Maps Embed API place_id embed. Confirm primary category (Canyoning agency / Rock climbing instructor) and SAB service-area settings in GBP. Cannot be checked without GBP access or DataForSEO.
3. HIGH - Reviews: schema claims 4.9 / 276 reviews, but no visible rating, count or review text on home, contact, or canyon pages (0 matches for avis/4,9/276 in rendered text). Google guidelines: ratings must be visible on page and from a verifiable source; self-serving LocalBusiness ratings are ineligible for stars anyway. Fix: add a visible review block (Google/TripAdvisor excerpts with source and links) or remove aggregateRating from the sitewide schema. Note the same AggregateRating is injected on all 60 pages (sitewide), a risk.
4. HIGH - No local landing pages for Castellane, Moustiers-Sainte-Marie, La Palud, or "Gorges du Verdon" intent beyond the home/canyoning pages. Castellane and Moustiers appear nowhere in titles/H1/H2 or visible text; areaServed lists only Gorges du Verdon, Castellane, La Palud. Canyon pages are thin (283-462 words; est. 300 median), with templated schema. Fix: add 2-3 location/intent pages (e.g. "Canyoning près de Castellane", "Activités à La Palud-sur-Verdon", "Canyoning Gorges du Verdon") with meeting points, drive times, FAQs, plus add Moustiers, Rougon, Trigance, Quinson, Aiguines to areaServed as City objects.
5. MEDIUM - Credentials/insurance: Diplôme d'État/BE is stated in schema, llms.txt and the FAQ (assurance/RC pro mentioned 7 times on /fr/faq), but not on home, canyon pages or contact in visible text (0 matches on /fr and canyon-artuby). SIRET is only in llms.txt/FAQ, not in the footer; /fr/mentions-legales returns 404 though "Mentions" text appears in footer, so verify the actual legal page URL. Fix: add a trust strip (guides diplômés d'État, RC Pro insurance, SIRET, ENSA/FFCAM affiliations if any) in footer and on activity pages.
6. MEDIUM - Schema: geo has 4 decimals (need 5); openingHoursSpecification is a single 08:00-20:00 daily block for a seasonal business (mid-April to end October per llms.txt; add validFrom/validThrough or a season note); priceRange value is a mojibake "��" (encoding error in "€€" at the HTML level, or a literal; verify and write "€€"); LocalBusiness block is repeated on every page and each canyon page emits a second LocalBusiness (different entity) without @id, risking duplicate entities. Fix: reference the main entity by @id and use TouristAttraction/Product/Offer for the activity.
7. MEDIUM - Booking: all CTAs go to app.book-adventure.fr (third-party widget; a visible link plus WhatsApp). Acceptable; add ReserveAction in schema and make sure the booking domain is not diluting brand searches.
8. LOW - Team roster in schema (Emma Aglaé, Angèle Kanapa, Marie Oddo) unchanged; confirm it is current. Credentials mismatched wording: "Brevet d'état" (Kanapa, 2013) vs "Diplôme d'État" in jobTitle.
9. LOW - Citation breadth unknown: no evidence of Bing Places, Apple Business Connect, PagesJaunes, Petzl/FFME/Canyon directories, GetYourGuide/Viator. Outbound sidebar links to partner hotels/guides exist (hotelverdon.com, koalagrimpe, etc.) which could be reciprocal link opportunities.
10. LOW - Social: Facebook and Instagram live and linked in schema; Facebook group/Facebook page of a person (La Gardoise) linked in some content, not NAP-relevant.

## Top actions
1. Restore or remove the Verdon Tourisme link (404).
2. Replace the maps/search sameAs and CTA with the real GBP URL; verify GBP category and service area.
3. Make reviews visible or drop sitewide AggregateRating.
4. Create Castellane / Moustiers / La Palud / Gorges du Verdon landing pages.
5. Surface credentials, insurance and SIRET in the footer and activity pages; fix the mentions légales URL.
6. Geo to 5 decimals, seasonal hours, fix priceRange, de-duplicate LocalBusiness with @id.
7. Build Bing Places, Apple Business Connect, PagesJaunes and activity-marketplace citations.

## Limitations
No GBP/DataForSEO access: GBP claim status, category, photos, posts, review velocity, response rate, local pack rank not assessed. TripAdvisor (403), Facebook and Instagram NAP not machine-verifiable. PagesJaunes/Bing/Apple not checked. Proximity (about 55% of ranking variance) is outside control. Word counts come from the crawl.
