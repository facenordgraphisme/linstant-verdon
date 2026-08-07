# Schema.org / Structured Data Audit — linstantverdon.com

Audited: homepage (`/fr`), tour detail page (`/fr/canyoning/canyon-artuby`), category pages, `/fr/faq` + `/en/faq`, `/fr/a-propos`, `/fr/blog/3-activites-verdon-ete`. Verified both against source (`src/app/`, `src/components/`) and live rendered HTML (`python render_page.py --mode auto`).

## Score: 46/100

The site has more schema than a typical fresh relaunch (LocalBusiness sitewide, BlogPosting on articles, FAQPage in French) and what exists is mostly well-formed JSON-LD with correct `@context`/absolute URLs. But the highest-commercial-value templates — tour/activity detail pages, category pages, breadcrumbs — have **zero** structured data, there's a locale bug leaking the French URL into English pages, and the sitewide `aggregateRating` needs a provenance check.

## Limitation

Due to a budget stop mid-audit, `/fr/contact`, `/fr/blog` (listing), and the `stages`/`evenementiel` category templates were not individually re-verified via rendered HTML (source-code review shows no JSON-LD in those files, consistent with the pattern found elsewhere, but this wasn't independently confirmed live). Treat findings for those templates as high-confidence but not double-checked.

---

### What Works

- **JSON-LD everywhere it exists** — no Microdata/RDFa, correct `<script type="application/ld+json">` usage, `@context: "https://schema.org"` (HTTPS, correct).
- **`LocalBusiness` + `SportsActivityLocation`** (`src/components/LocalBusinessSchema.tsx`, injected in `src/app/[locale]/layout.tsx`) renders on every single page. Confirmed live on `/fr`, `/fr/canyoning/canyon-artuby`, `/fr/faq`, `/en/faq`, `/fr/blog/...`, `/fr/a-propos`. Contains name, `@id`, address (`PostalAddress`), `geo`, `telephone`, `email`, `areaServed`, `priceRange`, `openingHoursSpecification`, `sameAs` (Facebook/Instagram/YouTube/TripAdvisor/Verdon Tourisme), and nested `founder`/`employee` `Person` entries with `hasCredential`.
- **`BlogPosting`** on `/fr/blog/[slug]` — correctly typed, includes `headline`, `description`, `datePublished`, `image` (real Sanity CDN URL), `author[]` (two named guides with `jobTitle`/`worksFor`), and `publisher` with logo `ImageObject`. This is the strongest block on the site.
- **`FAQPage`** on `/fr/faq` — 7 well-formed `Question`/`Answer` pairs, real content (no placeholders), correctly scoped to `mainEntity`.
- No deprecated types in use (no `HowTo`, no `SpecialAnnouncement`).

---

### Critical

**1. Tour/activity detail pages have no schema at all (beyond the generic sitewide LocalBusiness).**
`src/app/[locale]/[category]/[slug]/page.tsx` — confirmed live on `/fr/canyoning/canyon-artuby` — has zero `Product`/`TouristTrip`/`Offer` markup despite the Sanity `activity` document already containing price, duration, minAge, meeting point, images, and a Google Maps URL. These are the site's highest commercial-intent pages (bookable tours) and the ones most likely to benefit from price/availability rich results. This is the single biggest missed opportunity on the site.

**2. No `BreadcrumbList` anywhere on the site.**
Grep of `src/app/` and `src/components/` found no breadcrumb JSON-LD. The blog post template renders a *visual* breadcrumb (`Accueil / Blog / {title}`) but never emits structured data for it. With a 3-level URL hierarchy (`/category/slug`), this is a straightforward, low-risk win for sitelinks/breadcrumb rich results and for AI crawlers mapping site architecture.

---

### High

**3. `LocalBusiness.url` is hardcoded to the French homepage even on English pages — locale bug.**
`src/components/LocalBusinessSchema.tsx` line 11: `url: 'https://www.linstantverdon.com/fr'` is a static string, not locale-aware. Confirmed live: on `/en/faq` the emitted schema still declares `"url":"https://www.linstantverdon.com/fr"` while the `description` field correctly switches to English. This is a validation inconsistency — the `@id` should be stable, but `url` should reflect the entity's canonical page per locale (or just point to the root domain instead of a locale variant).

**4. `aggregateRating` (4.8 / 54 reviews) has no visible on-page counterpart and unclear provenance.**
The same hardcoded `ratingValue: "4.8"` / `reviewCount: "54"` is repeated on every page (blog posts, FAQ, tour pages) via the sitewide component. Google's structured data guidelines require aggregate ratings to reflect ratings **visibly available to users on the page** (or the site as a whole) and sourced from a legitimate, verifiable collection process — self-declared numbers not shown anywhere in the UI risk a manual action or the rich result simply being suppressed. Recommend: (a) confirm 4.8/54 is pulled from an actual source (Google Business Profile, TripAdvisor — the TripAdvisor `sameAs` link suggests that might be it), (b) display the rating/count somewhere visible on-site (e.g., homepage or About page), and (c) keep the numbers in sync with the real source going forward rather than a hardcoded constant.

---

### Medium

**5. Full guide roster + address + rating duplicated on every page template, including blog/FAQ pages.**
Not invalid, but the entire `founder`/`employee` array (Emma, Angèle, Marie with credentials) and the `aggregateRating` are repeated verbatim across every route via the root layout. This bloats every page's HTML with content unrelated to that page's topic (e.g., a blog post about summer activities emits full business "founder credential" data). Consider a leaner `Organization`/`@id`-reference block sitewide, with the full `LocalBusiness` detail (founder, employee, rating) only on the homepage and `/a-propos`/`/contact`.

**6. `/en/faq` has no `FAQPage` schema at all.**
`src/app/[locale]/faq/page.tsx` gates the schema behind `{locale === 'fr' && (...)}` — confirmed live, `/en/faq` emits only the sitewide `LocalBusiness` block, no `FAQPage`. Per current Google policy, FAQPage no longer produces SERP rich results for any site (retired May 7 2026), so this isn't a ranking-feature loss — but it is an inconsistency, and the markup still helps AI/LLM systems answer questions about the English-language business. Low effort to fix (translate the existing 7 Q&As, remove the locale gate).

**7. No standalone `Person` schema for the guides on `/a-propos`.**
The two/three guides (Emma Aglaé, Angèle Kanapa, Marie Oddo) only exist as nested `founder`/`employee` objects inside the sitewide `LocalBusiness` block — there's no dedicated `Person` entity (with `image`, `url`, `sameAs`, `hasCredential`) anchored to the About page, which is the natural page for E-E-A-T/entity signals about who the guides are.

---

### Low / Info

**8. `BlogPosting.dateModified` always equals `datePublished`.**
`src/app/[locale]/blog/[slug]/page.tsx` sets both fields from the same `post.publishedAt` value — there's no Sanity `_updatedAt`/modified-date field wired in. Not invalid, just imprecise; if posts are ever edited, the schema won't reflect it. Low priority: swap in Sanity's `_updatedAt` if/when available.

**9. Existing `FAQPage` (fr) — keep, downgrade expectations.**
Per current policy, Google retired FAQ rich results for all sites; this markup will not produce a SERP feature. It's still useful for AI/LLM citation and entity resolution, so **do not remove it** — just don't expect a SERP rich result from it.

**10. `LocalBusiness.image` points to the logo, not a representative photo.**
Google's LocalBusiness guidance prefers `image` to be an actual photo of the business/activity (a canyon or a guide in action) rather than a logo mark. Minor; consider adding a real photo URL in addition to/instead of the logo.

---

### Missing Opportunities (no code exists yet)

- `Product`/`TouristTrip` + `Offer` on tour detail pages (Critical #1 above).
- `BreadcrumbList` site-wide (Critical #2 above).
- Standalone `Person` schema for guides on `/a-propos` (Medium #7 above).
- `CollectionPage`/`ItemList` on category listing pages (`/canyoning`, `/escalade`, etc.) linking out to each tour — helps Google and AI understand the catalogue structure. Optional, not drafted below (lower priority than the tour pages themselves).

---

## Recommended JSON-LD

### 1. `TouristTrip` + `Offer` for tour/activity detail pages

Drop this into `src/app/[locale]/[category]/[slug]/page.tsx`, built from the already-fetched `activity` Sanity object (values below are wired to real fields, not hardcoded — the only literal example values shown are what render on `/fr/canyoning/canyon-artuby` today: title "La clue d'Artuby", canonical `https://www.linstantverdon.com/fr/canyoning/canyon-artuby`, image `https://cdn.sanity.io/images/h48oam2s/production/0c4bff3f610915dc8e234e815a5eff2350c0ce2f-1200x1600.jpg`).

`Product` is intentionally included alongside `TouristTrip` (multi-type array) because Google's Product rich-result eligibility (price/availability snippet) covers bookable services/experiences, not just retail goods — `TouristTrip` alone gets no Google rich-result treatment but is the semantically correct schema.org type. No `aggregateRating`/`review` is included since there is no verified per-tour review data — do not fabricate one; add it only once real per-tour reviews exist.

```tsx
// Add near the top of ActivityDetailPage, after `activity` is fetched:

const activityUrl = `https://www.linstantverdon.com/${locale}/${category}/${decodedSlug}`;

const tourSchema = {
  '@context': 'https://schema.org',
  '@type': ['Product', 'TouristTrip'],
  name: activity.title,
  description: activity.description?.replace(/[#*_]/g, '').slice(0, 500),
  image: activity.mainImageUrl || activity.images?.[0],
  url: activityUrl,
  provider: {
    '@type': 'LocalBusiness',
    name: "L'instant Verdon",
    '@id': 'https://www.linstantverdon.com',
  },
  touristType: locale === 'fr'
    ? ['Familles', 'Sportifs', 'Débutants']
    : ['Families', 'Sports enthusiasts', 'Beginners'],
  ...(activity.duration ? {
    // ISO 8601 duration is preferable; if `duration` is a free-text string
    // (e.g. "3h"), keep it as a human-readable itinerary note instead:
    itinerary: {
      '@type': 'ItemList',
      name: locale === 'fr' ? 'Durée & déroulé' : 'Duration & itinerary',
      description: activity.duration,
    },
  } : {}),
  offers: {
    '@type': 'Offer',
    price: activity.price,
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: activity.bookingUrl || activityUrl,
    ...(activity.minAge ? { eligibleCustomerType: `${locale === 'fr' ? 'Âge minimum' : 'Minimum age'}: ${activity.minAge}` } : {}),
  },
};

// Then in the JSX, right after <main ...>:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(tourSchema) }}
/>
```

> Note: `activity.price` must be a plain number (schema.org `Offer.price` expects a numeric string/number, not `"À partir de 50€"`). Confirm the Sanity field stores a raw number — the `showStartingFrom` flag suggests prices may be "from" prices, in which case add `priceSpecification` with `minPrice` instead of a flat `price` if the CMS supports a range.

---

### 2. `BreadcrumbList` — reusable component, site-wide

New file `src/components/BreadcrumbSchema.tsx`:

```tsx
type Crumb = { name: string; url: string };

export default function BreadcrumbSchema({ items }: { items: Crumb[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

Usage on the tour detail page (`[category]/[slug]/page.tsx`):

```tsx
<BreadcrumbSchema
  items={[
    { name: locale === 'fr' ? 'Accueil' : 'Home', url: `https://www.linstantverdon.com/${locale}` },
    { name: dict.nav[dictKey as keyof typeof dict.nav] || category, url: `https://www.linstantverdon.com/${locale}/${category}` },
    { name: activity.title, url: activityUrl },
  ]}
/>
```

Usage on the blog post page (replacing the visual-only breadcrumb with matching structured data):

```tsx
<BreadcrumbSchema
  items={[
    { name: locale === 'fr' ? 'Accueil' : 'Home', url: `https://www.linstantverdon.com/${locale}` },
    { name: 'Blog', url: `https://www.linstantverdon.com/${locale}/blog` },
    { name: post.title, url: `https://www.linstantverdon.com/${locale}/blog/${decodedSlug}` },
  ]}
/>
```

---

### 3. Standalone `Person` schema for the guides — `/a-propos`

Add to `src/app/[locale]/a-propos/page.tsx`. Uses only real, already-published facts (names, roles, credentials already present in `LocalBusinessSchema.tsx`); no fabricated bios, ratings, or awards.

```tsx
const guidesSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Emma Aglaé',
    jobTitle: locale === 'fr' ? "Co-gérante & Guide diplômée d'État canyonisme" : 'Co-manager & State-certified canyoning guide',
    image: 'https://www.linstantverdon.com/assets/a%20propos/emma.JPG.jpeg',
    url: `https://www.linstantverdon.com/${locale}/a-propos`,
    worksFor: { '@type': 'Organization', name: "L'instant Verdon", '@id': 'https://www.linstantverdon.com' },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: locale === 'fr' ? "Diplôme d'État de canyonisme" : 'State canyoning diploma',
      dateCreated: '2020',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Angèle Kanapa',
    jobTitle: locale === 'fr' ? "Co-gérante & Guide diplômée d'État escalade & canyonisme" : 'Co-manager & State-certified climbing & canyoning guide',
    image: 'https://www.linstantverdon.com/assets/a%20propos/angele.jpg.jpeg',
    url: `https://www.linstantverdon.com/${locale}/a-propos`,
    worksFor: { '@type': 'Organization', name: "L'instant Verdon", '@id': 'https://www.linstantverdon.com' },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: locale === 'fr' ? "Brevet d'État d'escalade et canyonisme" : 'State climbing & canyoning certificate',
      dateCreated: '2013',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Marie Oddo',
    jobTitle: locale === 'fr' ? "Guide diplômée d'État escalade & canyonisme" : 'State-certified climbing & canyoning guide',
    image: 'https://www.linstantverdon.com/assets/a%20propos/marie.JPG.jpeg',
    url: `https://www.linstantverdon.com/${locale}/a-propos`,
    worksFor: { '@type': 'Organization', name: "L'instant Verdon", '@id': 'https://www.linstantverdon.com' },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: locale === 'fr' ? "Diplôme d'État d'escalade et canyonisme" : 'State climbing & canyoning diploma',
      dateCreated: '2020',
    },
  },
];

// In JSX, right after <main ...>:
{guidesSchema.map((schema, i) => (
  <script
    key={i}
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
  />
))}
```

---

### 4. `FAQPage` — English version for `/en/faq`

Remove the `{locale === 'fr' && ...}` gate in `src/app/[locale]/faq/page.tsx` and add an English equivalent (translate the existing 7 Q&As — example below covers the first three, replicate the pattern for the remaining four using the existing `faqSchemaFr` content as the source of truth):

```tsx
const faqSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What equipment should I bring for canyoning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Swimsuit, towel, closed sports shoes (trainers) and a water bottle. All technical gear (wetsuit, helmet, harness) is provided by L\'instant Verdon.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to know how to swim to go canyoning in the Verdon?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you must be able to swim at least 25 metres and be comfortable submerging underwater. This is mandatory for all our canyoning outings.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are the guides state-certified?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All our guides hold a State Diploma (DE) or State Certificate (BE) in canyoning and/or climbing, issued by the French Ministry of Sports, and are up to date on mandatory refresher training.',
      },
    },
  ],
};

// Render unconditionally (both locales):
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(locale === 'fr' ? faqSchemaFr : faqSchemaEn) }}
/>
```

---

### 5. Fix — `LocalBusiness.url` locale bug

In `src/components/LocalBusinessSchema.tsx`, change:

```tsx
url: 'https://www.linstantverdon.com/fr',
```

to:

```tsx
url: `https://www.linstantverdon.com/${locale}`,
```

(keep `@id: 'https://www.linstantverdon.com'` as the stable, locale-independent identifier — only `url` needs to vary).
