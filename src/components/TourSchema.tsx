type TourSchemaProps = {
  name: string;
  description?: string;
  image?: string;
  url: string;
  price?: number;
  priceDetails?: string;
  minAge?: number;
  duration?: string;
  locale: string;
};

export default function TourSchema({ name, description, image, url, price, priceDetails, minAge, duration, locale }: TourSchemaProps) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['Product', 'TouristTrip'],
    name,
    ...(description ? { description: description.replace(/[#*_]/g, '').slice(0, 500) } : {}),
    ...(image ? { image } : {}),
    url,
    provider: {
      '@type': 'LocalBusiness',
      name: "L'instant Verdon",
      '@id': 'https://www.linstantverdon.com/#organization',
    },
    touristType: locale === 'fr'
      ? ['Familles', 'Sportifs', 'Débutants']
      : ['Families', 'Sports enthusiasts', 'Beginners'],
    ...(duration ? {
      itinerary: {
        '@type': 'ItemList',
        name: locale === 'fr' ? 'Durée & déroulé' : 'Duration & itinerary',
        description: duration,
      },
    } : {}),
    ...(typeof price === 'number' ? {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency: 'EUR',
        // Free-text detail such as group pricing, so the bare price is not
        // read as a per-person price.
        ...(priceDetails ? { description: priceDetails } : {}),
        availability: 'https://schema.org/InStock',
        url,
        ...(minAge ? { eligibleCustomerType: `${locale === 'fr' ? 'Âge minimum' : 'Minimum age'}: ${minAge}` } : {}),
      },
    } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
