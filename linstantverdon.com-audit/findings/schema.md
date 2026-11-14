# Structured Data Audit - linstantverdon.com (2026-11-14)

Method: source review (src/components/*Schema.tsx, src/app/[locale]/**) + live fetch of /fr, /en, /fr/canyoning/canyon-artuby, /fr/faq + crawl.json (64 URLs, jsonld_types).

## Score: 68/100 (previous audit: 46)

Big progress since August: Product/TouristTrip + Offer and BreadcrumbList now ship on all 34 activity pages, Person schemas on /a-propos, locale-aware `url`, EN FAQ added. Remaining weaknesses: unbacked AggregateRating (policy risk), no @id graph linking, heavy sitewide duplication, category/blog/contact pages without breadcrumb or page-level schema.

## What works
- JSON-LD only, `https://schema.org` context, absolute URLs, no deprecated types (no HowTo/SpecialAnnouncement).
- LocalBusiness+SportsActivityLocation sitewide: NAP (395 Chem. de Haut Bourras, 04120 La Palud-sur-Verdon, +33689855381) matches Footer and ContactSection exactly. Geo, hours, sameAs (6 profiles) present. `url` is now locale-aware (/en on EN pages) - previous bug fixed.
- Activity pages (live, canyon-artuby): Product+TouristTrip with name, image (Sanity CDN), url, Offer (price 50 EUR, availability), provider ref; BreadcrumbList 3 levels; all URLs match the page locale.
- BlogPosting has author, publisher + logo, inLanguage. FAQPage present FR and EN (info only). Person x3 on /a-propos with worksFor @id.

## Findings

### HIGH 1. AggregateRating 4.9 / 276 has no visible backing on the site
`src/components/LocalBusinessSchema.tsx` lines 41-47. Emitted on all ~60 pages. Rendered text of /fr, an activity page and /contact contains no rating or review text; Footer only links to TripAdvisor. Google's review snippet policy requires ratings to be visible to users on the page, and self-serving reviews on LocalBusiness/Organization are ineligible for stars (ignored at best, manual action at worst). Also hardcoded, so it will drift from the real source (Google/TripAdvisor).
Fix: remove `aggregateRating` from the sitewide block now. Re-add only if you display the rating and its source on the page; even then expect no stars for a self-owned LocalBusiness. Source the numbers from Sanity, not a constant.

### HIGH 2. Entity graph is not linked (weak @id, nodes duplicated, conflicting data)
- LocalBusiness `@id` = `https://www.linstantverdon.com` (bare domain, which 308-redirects to /fr). Use a fragment id (`/#organization`).
- TourSchema `provider` is a LocalBusiness stub (name + @id): should be `{ "@id": ".../#organization" }` only.
- a-propos Person nodes have no `@id`, and the same 3 people are re-declared as full nested objects in the sitewide LocalBusiness (founder/employee) with different credential fields (`name` vs `credentialCategory`) and different job titles (Emma/Angèle are "Co-gérante" on /a-propos, not in the sitewide block). Conflicting data for the same entity.
- Blog `author` Persons and `publisher` Organization have no @id; publisher is a second Organization node with name+url only.
- Files: LocalBusinessSchema.tsx, TourSchema.tsx, a-propos/page.tsx, blog/[slug]/page.tsx.

### MEDIUM 3. Full LocalBusiness (+3 Persons, 6 sameAs, hours) repeated on every page
Valid and NAP is consistent, but it is repeated off-topic on 60 pages (blog, FAQ, activities). Keep the full node on /fr, /en and /contact; elsewhere reference by @id. Move founder/employee to /a-propos only.

### MEDIUM 4. Product/TouristTrip details (TourSchema.tsx)
- `eligibleCustomerType: "Âge minimum: 7"` is a misuse (expects BusinessEntityType). Use `audience: {PeopleAudience, suggestedMinAge}`.
- `itinerary` is an ItemList holding only a duration string ("2h30"). Not a real itinerary; use ISO 8601 (PT2H30M) in an additionalProperty or drop it.
- `description` is cut by `.slice(0,500)` mid-word (visible live: ends with "dan"). Truncate on a word boundary.
- Product has offers but no `brand`; because it is a service, consider dropping `Product` to avoid merchant-listing expectations (shipping/return policy). Keep it if you want the Product snippet and accept warnings.
- `availability: InStock` is hardcoded; for a seasonal activity (canyoning mid-April to end October) consider reflecting that.
- Check that the EN pages localize `description` (same Sanity text may be used).

### MEDIUM 5. Category, contact, blog listing, home have no page-level schema
Only the sitewide LocalBusiness. Missing: BreadcrumbList on category pages and on blog posts (a visual breadcrumb exists at blog/[slug]/page.tsx lines 147-152 but no JSON-LD; crawl confirms), ItemList/CollectionPage on categories, WebSite node, ContactPage on /contact.

### LOW 6. FAQPage (FR + EN)
Info only. Google retired FAQ rich results (May 2026): no SERP benefit, AI/GEO benefit unconfirmed. Harmless to keep. FAQPage is the correct type for first-party Q&A.

### LOW 7. BlogPosting
- `dateModified` = `datePublished` (blog/[slug]/page.tsx ~line 99). Use Sanity `_updatedAt`.
- Missing `mainEntityOfPage`; image is recommended (undefined when absent).
- `author` always lists both guides regardless of the real author.

### LOW 8. LocalBusiness field hygiene
- `image` is the logo; add real photos.
- `openingHoursSpecification` 08:00-20:00 daily for a seasonal guide business: confirm it is true, otherwise remove.
- `sameAs` includes a Google Maps search URL (not a profile): replace with the real Google Business Profile URL or drop.

## Verdict: LocalBusiness on every page
Technically valid and consistent (NAP identical across pages and to visible text), but should be reduced to home/contact with @id references elsewhere.

## Ready-to-paste fixes

### A. LocalBusinessSchema.tsx
```ts
const BASE = 'https://www.linstantverdon.com'
const schema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'SportsActivityLocation'],
  '@id': `${BASE}/#organization`,
  name: "L'instant Verdon",
  url: `${BASE}/${locale}`,
  inLanguage: locale === 'fr' ? 'fr-FR' : 'en',
  logo: { '@type': 'ImageObject', url: `${BASE}/assets/accueil/logo.webp` },
  image: [`${BASE}/assets/accueil/logo.webp` /* + 1-2 real photo URLs */],
  // keep: description, telephone, email, address, geo, areaServed, priceRange, payment, hours, sameAs
  // REMOVE aggregateRating (no visible reviews)
  // REMOVE inline founder/employee; reference instead:
  founder: [{ '@id': `${BASE}/${locale}/a-propos#emma-aglae` }],
  employee: [
    { '@id': `${BASE}/${locale}/a-propos#angele-kanapa` },
    { '@id': `${BASE}/${locale}/a-propos#marie-oddo` },
  ],
}
```
If you later display real reviews on the page (values from Sanity matching what is shown):
```json
"aggregateRating": {"@type":"AggregateRating","ratingValue":4.9,"reviewCount":276,"bestRating":5,"worstRating":1}
```

### B. a-propos/page.tsx - Person with @id (repeat for Angèle and Marie)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.linstantverdon.com/fr/a-propos#emma-aglae",
  "name": "Emma Aglaé",
  "jobTitle": "Co-gérante & Guide diplômée d'État canyonisme",
  "image": "https://www.linstantverdon.com/assets/a%20propos/emma.JPG.jpeg",
  "url": "https://www.linstantverdon.com/fr/a-propos",
  "worksFor": {"@id": "https://www.linstantverdon.com/#organization"},
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "name": "Diplôme d'État de canyonisme",
    "credentialCategory": "degree",
    "dateCreated": "2020"
  }
}
```

### C. TourSchema.tsx output (example canyon-artuby, FR)
```json
{
  "@context": "https://schema.org",
  "@type": ["TouristTrip", "Product"],
  "@id": "https://www.linstantverdon.com/fr/canyoning/canyon-artuby#trip",
  "name": "La clue d'Artuby",
  "description": "La clue de l'Artuby est un beau parcours de canyoning d'initiation ou intermédiaire, pour les petits et les grands sachant nager, dans le Parc régional du Verdon.",
  "image": "https://cdn.sanity.io/images/h48oam2s/production/0c4bff3f610915dc8e234e815a5eff2350c0ce2f-1200x1600.jpg",
  "url": "https://www.linstantverdon.com/fr/canyoning/canyon-artuby",
  "inLanguage": "fr-FR",
  "brand": {"@id": "https://www.linstantverdon.com/#organization"},
  "provider": {"@id": "https://www.linstantverdon.com/#organization"},
  "touristType": ["Familles", "Sportifs", "Débutants"],
  "audience": {"@type": "PeopleAudience", "suggestedMinAge": 7},
  "additionalProperty": {"@type": "PropertyValue", "name": "Durée", "value": "PT2H30M"},
  "offers": {
    "@type": "Offer",
    "price": 50,
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "url": "https://www.linstantverdon.com/fr/canyoning/canyon-artuby",
    "seller": {"@id": "https://www.linstantverdon.com/#organization"}
  }
}
```
Code changes: replace `itinerary` with `additionalProperty` (convert "2h30" to ISO 8601), replace `eligibleCustomerType` with `audience`, use `{ '@id': ... }` for provider/brand/seller, and truncate on a word boundary:
```ts
const clean = description.replace(/[#*_]/g, '');
const short = clean.length > 300 ? clean.slice(0, clean.lastIndexOf(' ', 300)) + '…' : clean;
```

### D. BreadcrumbList on blog posts and category pages
```tsx
<BreadcrumbSchema items={[
  { name: locale === 'fr' ? 'Accueil' : 'Home', url: `https://www.linstantverdon.com/${locale}` },
  { name: 'Blog', url: `https://www.linstantverdon.com/${locale}/blog` },
  { name: post.title, url: `https://www.linstantverdon.com/${locale}/blog/${decodedSlug}` },
]} />
```
Category: Home -> category label (`https://www.linstantverdon.com/${locale}/${category}`).

### E. BlogPosting corrections
```ts
dateModified: post._updatedAt ?? post.publishedAt,
mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.linstantverdon.com/${locale}/blog/${decodedSlug}` },
author: [{ '@id': `https://www.linstantverdon.com/${locale}/a-propos#emma-aglae` }, { '@id': `https://www.linstantverdon.com/${locale}/a-propos#angele-kanapa` }],
publisher: { '@id': 'https://www.linstantverdon.com/#organization' },
```
(add `_updatedAt` to the GROQ projection.)

### F. Optional WebSite and ContactPage
```json
{"@context":"https://schema.org","@type":"WebSite","@id":"https://www.linstantverdon.com/#website","url":"https://www.linstantverdon.com/","name":"L'instant Verdon","publisher":{"@id":"https://www.linstantverdon.com/#organization"},"inLanguage":["fr-FR","en"]}
```
```json
{"@context":"https://schema.org","@type":"ContactPage","url":"https://www.linstantverdon.com/fr/contact","about":{"@id":"https://www.linstantverdon.com/#organization"}}
```

## Priority order
1. Remove or back AggregateRating (HIGH 1)
2. Introduce `#organization` and Person @ids, stop duplicating (HIGH 2, MED 3)
3. Fix TourSchema properties (MED 4)
4. BreadcrumbList on category + blog, dateModified (MED 5, LOW 7)
5. Housekeeping (LOW 6, 8)
