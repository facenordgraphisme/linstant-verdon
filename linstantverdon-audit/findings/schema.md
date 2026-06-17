# Schema / Structured Data Findings — linstantverdon.com
**Audit date:** 2026-06-17  
**Score: 5 / 100**

---

## Summary

**Zero structured data found** on any page. No JSON-LD, no Microdata, no RDFa detected.

This is a critical gap for a local outdoor adventure business: schema markup directly enables rich results in Google (ratings stars, FAQ dropdowns, event cards, pricing badges) and improves AI search citability.

---

## Missing Schema by Priority

### 1. LocalBusiness / SportsActivityLocation (Critical)
Enables Google Maps rich info panel, local Knowledge Graph, review stars in local results.

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "SportsActivityLocation"],
  "name": "L'Instant Verdon",
  "description": "Guides diplômés d'État proposant canyoning, escalade et parcours aventure dans les Gorges du Verdon.",
  "url": "https://www.linstantverdon.com/fr/",
  "telephone": "+33689855381",
  "email": "contact@linstantverdon.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Place de l'église",
    "addressLocality": "Castellane",
    "postalCode": "04120",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.8478,
    "longitude": 6.5128
  },
  "openingHoursSpecification": [],
  "sameAs": [
    "https://www.facebook.com/linstantverdon",
    "https://www.instagram.com/linstant_verdon/",
    "https://www.tripadvisor.fr/Attraction_Review-g635586-d14924372-..."
  ],
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, Credit Card",
  "image": "https://www.linstantverdon.com/assets/accueil/logo.webp"
}
```

### 2. Service schema per activity (High)
Each service page (/fr/canyoning, /fr/escalade, etc.) should declare an `@type: Service` or `@type: Product`:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Canyoning dans les Gorges du Verdon",
  "provider": { "@type": "LocalBusiness", "name": "L'Instant Verdon" },
  "areaServed": { "@type": "Place", "name": "Gorges du Verdon" },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "EUR",
    "price": "50",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "minPrice": "50",
      "maxPrice": "95"
    }
  }
}
```

### 3. FAQPage schema (High)
The /fr/faq page has FAQ content but no `FAQPage` schema. This enables **FAQ rich results** — accordion dropdowns in SERPs that dramatically increase CTR.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel équipement faut-il apporter pour le canyoning ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Maillot de bain, serviette, chaussures de sport fermées (type baskets) et une bouteille d'eau. Tout le matériel technique (combinaison, casque, harnais) est fourni."
      }
    },
    {
      "@type": "Question",
      "name": "Faut-il savoir nager pour faire du canyoning ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, il est impératif de savoir nager au moins 25 mètres et d'être capable de s'immerger."
      }
    }
  ]
}
```

### 4. Article schema on blog posts (High)
Each blog post needs `@type: Article` with author, datePublished, dateModified:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Les 3 activités à faire dans le Verdon cet été avec l'Instant Verdon",
  "datePublished": "2026-05-15",
  "dateModified": "2026-05-15",
  "author": [
    { "@type": "Person", "name": "Emma Aglaé", "jobTitle": "Guide diplômée d'État canyonisme" },
    { "@type": "Person", "name": "Angèle Kanapa", "jobTitle": "Guide diplômée escalade et canyonisme" }
  ],
  "publisher": {
    "@type": "Organization",
    "name": "L'Instant Verdon",
    "logo": { "@type": "ImageObject", "url": "https://www.linstantverdon.com/assets/accueil/logo.webp" }
  }
}
```

### 5. Person schema for guides (Medium)
Adds E-E-A-T signals for guide credentials on the /fr/a-propos page:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Emma Aglaé",
  "jobTitle": "Guide diplômée d'État canyonisme",
  "worksFor": { "@type": "Organization", "name": "L'Instant Verdon" },
  "hasCredential": { "@type": "EducationalOccupationalCredential", "name": "Diplôme d'État de canyonisme", "dateCreated": "2020" }
}
```

### 6. BreadcrumbList schema (Medium)
Enables breadcrumb display in SERPs. Example for /fr/canyoning:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.linstantverdon.com/fr/" },
    { "@type": "ListItem", "position": 2, "name": "Canyoning", "item": "https://www.linstantverdon.com/fr/canyoning" }
  ]
}
```

### 7. Review / AggregateRating (Medium)
Import TripAdvisor rating to trigger star ratings in SERPs:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "54",
    "bestRating": "5"
  }
}
```
Note: Only add if you have direct control of review data. TripAdvisor scores should match the live listing.

### 8. Event schema (Low)
For weekly stage / retreat activities, `@type: Event` enables event rich results in Google.
