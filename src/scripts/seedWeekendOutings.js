const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8n1sk0j8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-03-11',
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN
});

const outings = [
  {
    _id: 'outing-program-3-days',
    _type: 'activity',
    title: {
      fr: 'Stage Multi-Activités - 3 Jours',
      en: 'Multi-Activity Camp - 3 Days'
    },
    slug: {
      _type: 'slug',
      current: 'program-3-days'
    },
    subtitle: {
      fr: 'Un week-end prolongé intense mêlant Escalade, Canyoning et Acro-Yoga au cœur du Verdon.',
      en: 'An intense long weekend combining Climbing, Canyoning, and Acro-Yoga in the Verdon.'
    },
    description: {
      fr: "Profitez d'un week-end prolongé de 3 jours pour vous ressourcer et faire le plein de sensations fortes dans le cadre exceptionnel des Gorges du Verdon. Ce programme équilibré allie la technicité de l'escalade sur les falaises mythiques de la route des crêtes, la fraîcheur aquatique d'un parcours de canyoning (Couloir Samson ou Baudan-Baou), et la poésie sportive de l'acro-yoga (yoga acrobatique pratiqué en groupe). Un break parfait pour développer votre concentration, votre confiance en vous et partager des moments fun et inoubliables en pleine nature sauvage.",
      en: "Enjoy an intense 3-day long weekend to recharge your batteries and experience great thrills in the unique setting of the Verdon Gorges. This balanced program combines the technical aspects of climbing on the legendary cliffs of the Route des Crêtes, the aquatic freshness of a canyoning descent (Couloir Samson or Baudan-Baou), and the physical poetry of acro-yoga (acrobatic yoga practiced in groups). A perfect getaway to build your focus, self-confidence, and share fun, unforgettable moments in wild nature."
    },
    price: 280,
    minAge: 16,
    duration: '3 jours',
    approachTime: 'N/A',
    returnTime: 'N/A',
    obstacles: {
      fr: "Escalade en falaise d'initiation et de perfectionnement, descente de canyon (marche, nage, sauts et rappels), ateliers d'acro-yoga collectifs.",
      en: "Climbing on initiation and progression cliffs, canyoning descent (walking, swimming, jumps, and abseils), group acro-yoga workshops."
    },
    provided: {
      fr: [
        "Équipement technique de canyoning complet (combinaison néoprène 5mm, casque, baudrier)", 
        "Équipement complet d'escalade (cordes, baudrier, casque, chaussons si besoin)", 
        "Tatamis et espace ombragé pour l'acro-yoga", 
        "Transports locaux en minibus entre les activités", 
        "Encadrement par des moniteurs diplômés d'État"
      ],
      en: [
        "Complete technical canyoning equipment (5mm neoprene wetsuit, helmet, harness)", 
        "Complete climbing gear (ropes, harness, helmet, climbing shoes if needed)", 
        "Tatamis and shaded area for acro-yoga", 
        "Local transport in minibus between activities", 
        "Guiding by certified State-licensed instructors"
      ]
    },
    toBring: {
      fr: [
        "Tenue de sport souple et confortable", 
        "Chaussures de sport (baskets fermées)", 
        "Maillot de bain et serviette", 
        "Bouteille d'eau (1.5L par jour)", 
        "Votre logement (camping, gîte ou hôtel)", 
        "Vos repas et pique-niques de midi"
      ],
      en: [
        "Flexible and comfortable athletic wear", 
        "Closed-toe athletic shoes", 
        "Swimsuit and towel", 
        "Water bottle (1.5L per day)", 
        "Your own accommodation (campsite, cottage, or hotel)", 
        "Your lunch picnics and dinners"
      ]
    },
    included: {
      fr: [
        "Toutes les sessions sportives encadrées", 
        "Prêt de tout le matériel technique haut de gamme", 
        "Transport local en minibus", 
        "Assurance RC Pro"
      ],
      en: [
        "All guided sports sessions", 
        "Loan of all top-tier technical equipment", 
        "Local minibus transport", 
        "Professional Liability Insurance"
      ]
    },
    requirements: {
      fr: [
        "Savoir nager au moins 25 mètres", 
        "Bonne condition physique générale", 
        "Aucune expérience préalable en acro-yoga ou escalade requise"
      ],
      en: [
        "Must know how to swim at least 25 meters", 
        "Good general physical condition", 
        "No prior experience in acro-yoga or climbing required"
      ]
    },
    meetingPoint: "Castellane / Bureau L'Instant Verdon",
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.9255675402924!2d6.51268397674341!3d43.843685243169824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c266df16d55cb9%3A0xe54d6ea4d23253b!2sCastellane!5e0!3m2!1sfr!2sfr!4v1715800000003!5m2!1sfr!2sfr",
    category: {
      _type: 'reference',
      _ref: 'cat-weekend'
    }
  },
  {
    _id: 'outing-program-7-days',
    _type: 'activity',
    title: {
      fr: 'Stage Multi-Activités - 7 Jours',
      en: 'Multi-Activity Camp - 7 Days'
    },
    slug: {
      _type: 'slug',
      current: 'program-7-days'
    },
    subtitle: {
      fr: "Une semaine d'immersion totale Verdon mêlant Canyoning, Escalade et Acro-Yoga.",
      en: "A week of total Verdon immersion combining Canyoning, Climbing, and Acro-Yoga."
    },
    description: {
      fr: "Vivez l'expérience ultime de L'Instant Verdon avec notre stage complet d'une semaine. Ce séjour de 7 jours vous offre une immersion profonde au cœur du Parc Naturel Régional des Gorges du Verdon. Le programme est conçu pour progresser à votre rythme : perfectionnement en escalade sur des voies aériennes d'exception, descente de plusieurs canyons emblématiques de la région (comme le Couloir Samson et le Baudan-Baou), et pratique quotidienne approfondie de l'acro-yoga (yoga acrobatique). Des washings machines à l'icarianne en passant par les whips pop, vous apprendrez à lâcher prise et à développer une symbiose totale avec vos partenaires dans un cadre majestueux.",
      en: "Experience the ultimate adventure of L'Instant Verdon with our comprehensive one-week multi-activity camp. This 7-day program offers deep immersion in the heart of the Verdon Gorges. The schedule is tailored for progressive learning: climbing advancement on spectacular high-altitude cliffs, descending several legendary canyons (including Couloir Samson and Baudan-Baou), and daily in-depth acro-yoga practices. From washing machines to icarian and whips pop, you will learn to let go and develop a perfect harmony with your partners in a majestic setting."
    },
    price: 470,
    minAge: 16,
    duration: '7 jours',
    approachTime: 'N/A',
    returnTime: 'N/A',
    obstacles: {
      fr: "Progression technique en escalade de falaise (manipulations de cordes), descente de multiples canyons d'initiation et intermédiaires, sessions poussées d'acro-yoga acrobatique.",
      en: "Technical progression in cliff climbing (rope work), descending multiple initiation and intermediate canyons, advanced acrobatic acro-yoga sessions."
    },
    provided: {
      fr: [
        "Tout le matériel technique de canyoning (combinaison néoprène 5mm, casque, baudrier)", 
        "Tout le matériel de sécurité d'escalade (cordes, assureurs, baudrier, casque, chaussons)", 
        "Tatamis et espace ombragé pour l'acro-yoga", 
        "Transports locaux en minibus", 
        "Accompagnement personnalisé par des guides certifiés"
      ],
      en: [
        "All technical canyoning equipment (5mm neoprene wetsuit, helmet, harness)", 
        "All climbing safety gear (ropes, belay devices, harness, helmet, shoes)", 
        "Tatamis and shaded area for acro-yoga", 
        "Local transport in minibus between activities", 
        "Personalized coaching by certified State instructors"
      ]
    },
    toBring: {
      fr: [
        "Tenue de sport confortable", 
        "Chaussures adhérentes pour l'eau et la falaise", 
        "Maillot de bain et serviette de bain", 
        "Bouteille d'eau réutilisable", 
        "Votre hébergement (camping, hôtel ou gîte)", 
        "Vos repas et pique-niques pour la semaine"
      ],
      en: [
        "Comfortable sport clothing", 
        "Grippy shoes suitable for water and climbing", 
        "Swimsuit and towel", 
        "Reusable water bottle", 
        "Your own accommodation (campsite, hotel, or cottage)", 
        "Your food and picnic lunches for the week"
      ]
    },
    included: {
      fr: [
        "Ensemble des cours et sorties encadrés", 
        "Prêt des équipements de sécurité professionnels", 
        "Transports locaux inclus", 
        "Assurance RC Pro"
      ],
      en: [
        "All guided courses and excursions", 
        "Loan of professional safety gear", 
        "Local transportation included", 
        "Professional Liability Insurance"
      ]
    },
    requirements: {
      fr: [
        "Savoir nager (25m)", 
        "Bonne condition physique générale pour enchaîner les journées d'activités", 
        "Accessible aux débutants motivés comme aux intermédiaires"
      ],
      en: [
        "Must know how to swim (25m)", 
        "Good general fitness to enjoy back-to-back active days", 
        "Open to motivated beginners as well as intermediates"
      ]
    },
    meetingPoint: "Castellane / Bureau L'Instant Verdon",
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.9255675402924!2d6.51268397674341!3d43.843685243169824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c266df16d55cb9%3A0xe54d6ea4d23253b!2sCastellane!5e0!3m2!1sfr!2sfr!4v1715800000003!5m2!1sfr!2sfr",
    category: {
      _type: 'reference',
      _ref: 'cat-weekend'
    }
  }
];

async function seed() {
  console.log("Starting seedWeekendOutings script...");
  try {
    for (const outing of outings) {
      await client.createOrReplace(outing);
      console.log(`Successfully seeded program: ${outing.title.fr} (${outing.slug.current})`);
    }
    console.log("Weekend outings seeding complete!");
  } catch (err) {
    console.error("Seeding error:", err);
  }
}

seed();
