export default function LocalBusinessSchema({ locale }: { locale: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'SportsActivityLocation'],
    name: "L'instant Verdon",
    description: locale === 'fr'
      ? "Guides diplômés d'État pour sorties canyoning, escalade et aventures dans les Gorges du Verdon. Basé à La Palud-sur-Verdon depuis 2018."
      : "State-certified guides for canyoning, climbing and adventure outings in the Gorges du Verdon since 2018.",
    image: 'https://www.linstantverdon.com/assets/accueil/logo.webp',
    '@id': 'https://www.linstantverdon.com',
    url: 'https://www.linstantverdon.com/fr',
    telephone: '+33689855381',
    email: 'contact@linstantverdon.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: "395 Chem. de Haut Bourras",
      addressLocality: 'La Palud-sur-Verdon',
      postalCode: '04120',
      addressRegion: 'Provence-Alpes-Côte d\'Azur',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.7797,
      longitude: 6.3421,
    },
    areaServed: [
      { '@type': 'Place', name: 'Gorges du Verdon' },
      { '@type': 'Place', name: 'Castellane' },
      { '@type': 'Place', name: 'La Palud-sur-Verdon' },
    ],
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Chèques vacances, Virement bancaire',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '54',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.facebook.com/linstantverdon',
      'https://www.instagram.com/linstant_verdon/',
      'https://www.youtube.com/channel/UCvOPoMuJYkrMgZWiXiErugw',
      'https://www.tripadvisor.fr/Attraction_Review-g635586-d14924373-Reviews-L_Instant_Verdon-La_Palud_sur_Verdon_Alpes_de_Haute_Provence_Provence_Alpes_Cote.html',
      'https://www.verdontourisme.com/commerces-services/linstant-verdon-la-palud-sur-verdon/',
    ],
    founder: [
      {
        '@type': 'Person',
        name: 'Emma Aglaé',
        jobTitle: locale === 'fr' ? "Guide diplômée d'État canyonisme" : 'State-certified canyoning guide',
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: "Diplôme d'État de canyonisme",
          dateCreated: '2020',
        },
      },
    ],
    employee: [
      {
        '@type': 'Person',
        name: 'Angèle Kanapa',
        jobTitle: locale === 'fr' ? "Guide diplômée d'État escalade & canyonisme" : 'State-certified climbing & canyoning guide',
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: "Brevet d'État d'escalade et canyonisme",
          dateCreated: '2013',
        },
      },
      {
        '@type': 'Person',
        name: 'Marie Oddo',
        jobTitle: locale === 'fr' ? "Guide diplômée d'État escalade & canyonisme" : 'State-certified climbing & canyoning guide',
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: "Diplôme d'État d'escalade et canyonisme",
          dateCreated: '2020',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
