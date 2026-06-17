import { getDictionary } from '@/lib/dictionaries';

export default function LocalBusinessSchema({ locale }: { locale: string }) {
  const dict = getDictionary(locale as 'fr' | 'en');
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "L'instant Verdon",
    "image": "https://linstantverdon.com/logo.png",
    "@id": "https://linstantverdon.com",
    "url": "https://linstantverdon.com",
    "telephone": "+33689855381",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Place de l'église",
      "addressLocality": "Castellane",
      "postalCode": "04120",
      "addressRegion": "Provence-Alpes-Côte d'Azur",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.8464,
      "longitude": 6.5135
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.facebook.com/linstantverdon",
      "https://www.instagram.com/linstantverdon"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
