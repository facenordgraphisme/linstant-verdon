const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const outings = [
  // ================= CLIMBING / ESCALADE =================
  {
    _type: 'activity',
    _id: 'activity-half-day-discovery',
    title: { fr: 'Initiation & Découverte Falaise', en: 'Introduction & Cliff Discovery' },
    slug: { _type: 'slug', current: 'half-day-discovery' },
    category: { _type: 'reference', _ref: 'cat-climbing' },
    subtitle: { fr: 'Demi-journée d\'initiation', en: 'Half-day introduction' },
    description: {
      fr: 'Parfait pour s\'initier aux techniques de grimpe sur les magnifiques dalles de calcaire du Verdon. Encadré par un guide pro, vous apprendrez la sécurité en toute confiance.',
      en: 'Perfect for learning climbing techniques on the magnificent limestone slabs of the Verdon. Supervised by a pro guide, you will learn safety with confidence.'
    },
    price: 45,
    minAge: 6,
    duration: '3h',
    approachTime: '10 min',
    returnTime: '10 min',
    obstacles: {
      fr: 'Voies d\'initiation de 15 à 30 mètres de hauteur, dalles crochetantes et ludiques.',
      en: 'Initiation routes from 15 to 30 meters high, grippy and fun limestone slabs.'
    },
    meetingPoint: 'Castellane / Couloir Samson',
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.136284698579!2d6.3986927!3d43.8344199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c2ca7b960b73c9%3A0xe9f7e813f8c5123d!2sGorges+du+Verdon!5e0!3m2!1sfr!2sfr!4v1700000000000',
    included: {
      fr: [
        'Encadrement par un guide diplômé d\'État',
        'Matériel technique complet (baudrier, casque, cordes)',
        'Assurance Responsabilité Civile Professionnelle (RCP)'
      ],
      en: [
        'Supervision by a state-certified guide',
        'Complete technical equipment (harness, helmet, ropes)',
        'Professional Liability Insurance (RCP)'
      ]
    },
    requirements: {
      fr: [
        'Pas de contre-indication médicale à la pratique de l\'escalade',
        'Aucune expérience préalable requise'
      ],
      en: [
        'No medical contraindication to climbing practice',
        'No previous experience required'
      ]
    },
    provided: {
      fr: [
        'Harnais d\'escalade réglable',
        'Casque homologué',
        'Chaussons d\'escalade adaptés',
        'Cordes, mousquetons et systèmes d\'assurage'
      ],
      en: [
        'Adjustable climbing harness',
        'Certified helmet',
        'Adapted climbing shoes',
        'Ropes, carabiners, and belay devices'
      ]
    },
    toBring: {
      fr: [
        'Tenue de sport confortable',
        'Baskets ou chaussures de marche légères',
        'Bouteille d\'eau (1L minimum)',
        'Crème solaire et lunettes de soleil'
      ],
      en: [
        'Comfortable sports clothing',
        'Sneakers or light walking shoes',
        'Water bottle (1L minimum)',
        'Sunscreen and sunglasses'
      ]
    }
  },
  {
    _type: 'activity',
    _id: 'activity-multi-pitch',
    title: { fr: 'Grandes Voies du Verdon', en: 'Verdon Multi-Pitch Climbing' },
    slug: { _type: 'slug', current: 'multi-pitch' },
    category: { _type: 'reference', _ref: 'cat-climbing' },
    subtitle: { fr: 'L\'expérience de la verticalité absolue', en: 'The absolute vertical experience' },
    description: {
      fr: 'Parcourez les falaises mythiques de l\'Escalès de 100 à 300 mètres de haut. Une aventure hors norme réservée aux initiés cherchant du gaz sous les pieds.',
      en: 'Climb the legendary cliffs of l\'Escalès from 100 to 300 meters high. An exceptional adventure reserved for experienced climbers looking for vertical thrills.'
    },
    price: 150,
    minAge: 14,
    duration: '5h à 7h',
    approachTime: '15 min',
    returnTime: '20 min',
    obstacles: {
      fr: 'Grande voie verticale calcaire, relais suspendus en falaise, rappels impressionnants en fil d\'araignée.',
      en: 'Vertical limestone multi-pitch, hanging cliff belays, impressive free-hanging abseils.'
    },
    meetingPoint: 'La Palud-sur-Verdon',
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.013589886738!2d6.3400512!3d43.8159114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c2cedec4ff8e5d%3A0x6b44574a36f5627!2sLa+Palud-sur-Verdon!5e0!3m2!1sfr!2sfr!4v1700000000000',
    included: {
      fr: [
        'Encadrement personnalisé par un guide diplômé d\'État spécialiste des grandes voies',
        'Matériel technique complet nécessaire à la verticalité',
        'Photos souvenirs de votre ascension dans les falaises'
      ],
      en: [
        'Personalized supervision by a state-certified multi-pitch specialist guide',
        'Complete technical equipment needed for vertical climbing',
        'Souvenir photos of your ascent in the cliffs'
      ]
    },
    requirements: {
      fr: [
        'Avoir déjà pratiqué l\'escalade en falaise',
        'Savoir assurer en second de cordée',
        'Ne pas souffrir de vertige sévère'
      ],
      en: [
        'Previous experience in outdoor cliff climbing',
        'Ability to belay as a second climber',
        'No severe fear of heights'
      ]
    },
    provided: {
      fr: [
        'Baudrier premium confortable',
        'Casque',
        'Système d\'assurage et longes de sécurité',
        'Cordes de grande voie et matériel de protection'
      ],
      en: [
        'Comfortable premium harness',
        'Helmet',
        'Belay system and safety lanyards',
        'Multi-pitch ropes and protective equipment'
      ]
    },
    toBring: {
      fr: [
        'Chaussons d\'escalade personnels',
        'Petit sac à dos d\'assaut (20L maximum)',
        'Coupe-vent et veste légère chaude',
        'Barres énergétiques et repas froid compact',
        'Eau (2L minimum)'
      ],
      en: [
        'Personal climbing shoes',
        'Small day pack (20L maximum)',
        'Windbreaker and warm light jacket',
        'Energy bars and compact cold lunch',
        'Water (2L minimum)'
      ]
    }
  },

  // ================= CANYONING =================
  {
    _type: 'activity',
    _id: 'activity-balene',
    title: { fr: 'Ravinement de Balène', en: 'Balene Canyon' },
    slug: { _type: 'slug', current: 'balene' },
    category: { _type: 'reference', _ref: 'cat-canyoning' },
    subtitle: { fr: 'Le paradis des enfants (Pitchounes)', en: 'Children\'s paradise (Pitchounes)' },
    description: {
      fr: 'Un canyon d\'initiation ultra-ludique, idéal pour les plus jeunes. Des toboggans naturels et de petits sauts dans une eau limpide et ensoleillée.',
      en: 'An ultra-fun introductory canyon, ideal for the youngest. Natural water slides and small jumps in clear, sunny water.'
    },
    price: 40,
    minAge: 6,
    duration: '2h',
    approachTime: '10 min',
    returnTime: '5 min',
    obstacles: {
      fr: 'Petits toboggans creusés dans la roche calcaire, sauts faciles et très progressifs (non obligatoires, max 3m).',
      en: 'Small slides carved in limestone, easy and progressive jumps (non-mandatory, max 3m).'
    },
    meetingPoint: 'Rive droite du Verdon - Entrée du Canyon',
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.541284688579!2d6.402123!3d43.831200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c2ca7b960b73c9%3A0xe9f7e813f8c5123d!2sGorges+du+Verdon!5e0!3m2!1sfr!2sfr!4v1700000000000',
    included: {
      fr: [
        'Combinaison néoprène intégrale',
        'Casque',
        'Encadrement sécurisé par un guide diplômé d\'État'
      ],
      en: [
        'Full neoprene wetsuit',
        'Helmet',
        'Safe supervision by a state-certified guide'
      ]
    },
    requirements: {
      fr: [
        'Savoir nager au moins 25 mètres',
        'Être capable de s\'immerger brièvement sous l\'eau'
      ],
      en: [
        'Ability to swim at least 25 meters',
        'Ability to submerge briefly under water'
      ]
    },
    provided: {
      fr: [
        'Combinaison néoprène 5mm',
        'Chaussettes néoprène de protection',
        'Casque homologué de canyoning'
      ],
      en: [
        '5mm neoprene wetsuit',
        'Protective neoprene socks',
        'Certified canyoning helmet'
      ]
    },
    toBring: {
      fr: [
        'Maillot de bain',
        'Baskets fermées pouvant aller dans l\'eau (pas de sandales ni de Crocs)',
        'Serviette de bain',
        'Cordon de lunettes si vous devez les conserver'
      ],
      en: [
        'Swimsuit',
        'Closed sneakers that can go in water (no sandals or Crocs)',
        'Bath towel',
        'Glasses strap if you must wear them'
      ]
    }
  },
  {
    _type: 'activity',
    _id: 'activity-bas-jabron',
    title: { fr: 'Le Bas Jabron', en: 'Bas Jabron Canyon' },
    slug: { _type: 'slug', current: 'bas-jabron' },
    category: { _type: 'reference', _ref: 'cat-canyoning' },
    subtitle: { fr: 'Canyon d\'initiation et de fraîcheur', en: 'Initiation and refreshing canyon' },
    description: {
      fr: 'Un canyon d\'initiation parfait pour les familles et groupes d\'amis. Un parcours court mais varié, abrité sous de magnifiques encaissements rocheux.',
      en: 'A perfect introductory canyon for families and groups of friends. A short but varied route, sheltered under beautiful rock enclosures.'
    },
    price: 45,
    minAge: 8,
    duration: '2h30',
    approachTime: '5 min',
    returnTime: '15 min',
    obstacles: {
      fr: 'Toboggans ludiques sculptés, sauts (jusqu\'à 6m, aucun n\'étant obligatoire), initiation facile au rappel.',
      en: 'Fun sculpted slides, jumps (up to 6m, none mandatory), easy introduction to abseiling.'
    },
    meetingPoint: 'Castellane / Parking du Jabron',
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.1012351235!2d6.512345!3d43.841234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cc123456789%3A0xabcdef123456!2sCastellane!5e0!3m2!1sfr!2sfr!4v1700000000000',
    included: {
      fr: [
        'Combinaison néoprène isotherme 5mm',
        'Baudrier de canyoning complet avec longes',
        'Casque',
        'Guide diplômé d\'État canyoning'
      ],
      en: [
        '5mm isothermal neoprene wetsuit',
        'Full canyoning harness with lanyards',
        'Helmet',
        'State-certified canyoning guide'
      ]
    },
    requirements: {
      fr: [
        'Savoir nager',
        'Aucune appréhension de l\'eau vive'
      ],
      en: [
        'Must know how to swim',
        'No fear of moving water'
      ]
    },
    provided: {
      fr: [
        'Veste et pantalon néoprène 5mm',
        'Chaussettes néoprène',
        'Harnais complet avec double longe',
        'Casque de protection'
      ],
      en: [
        '5mm neoprene jacket and pants',
        'Neoprene socks',
        'Full harness with double lanyard',
        'Protective helmet'
      ]
    },
    toBring: {
      fr: [
        'Maillot de bain',
        'Paire de baskets à lacets (qui vont dans l\'eau)',
        'Bouteille d\'eau',
        'Petite collation après-effort'
      ],
      en: [
        'Swimsuit',
        'Pair of laced sneakers (will get wet)',
        'Water bottle',
        'Small post-effort snack'
      ]
    }
  },
  {
    _type: 'activity',
    _id: 'activity-baudan-baou',
    title: { fr: 'Le Baudan Baou', en: 'Baudan Baou Canyon' },
    slug: { _type: 'slug', current: 'baudan-baou' },
    category: { _type: 'reference', _ref: 'cat-canyoning' },
    subtitle: { fr: 'Un joyau secret et sauvage', en: 'A secret and wild gem' },
    description: {
      fr: 'Parcourez ce canyon caché et préservé. Un enchaînement féerique de cascades et de piscines suspendues dans un écrin de végétation luxuriante.',
      en: 'Travel through this hidden and preserved canyon. A magical succession of waterfalls and hanging pools in a setting of lush vegetation.'
    },
    price: 48,
    minAge: 8,
    duration: '2h30',
    approachTime: '15 min',
    returnTime: '10 min',
    obstacles: {
      fr: 'Descentes en rappel sous cascade (jusqu\'à 15m), petits sauts ludiques et marches dans le lit du torrent sauvage.',
      en: 'Abseiling under waterfalls (up to 15m), small fun jumps and walking in the wild torrent bed.'
    },
    meetingPoint: 'La Palud-sur-Verdon',
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.013589886738!2d6.3400512!3d43.8159114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c2cedec4ff8e5d%3A0x6b44574a36f5627!2sLa+Palud-sur-Verdon!5e0!3m2!1sfr!2sfr!4v1700000000000',
    included: {
      fr: [
        'Équipement complet de protection individuelle (combinaison, harnais, casque)',
        'Guide professionnel diplômé d\'État'
      ],
      en: [
        'Full personal protective equipment (wetsuit, harness, helmet)',
        'State-certified professional guide'
      ]
    },
    requirements: {
      fr: [
        'Savoir nager 25m et savoir s\'immerger sous l\'eau',
        'Bonne condition physique générale pour la marche'
      ],
      en: [
        'Swim 25m and know how to submerge under water',
        'Good general physical condition for walking'
      ]
    },
    provided: {
      fr: [
        'Combinaison néoprène 5mm double épaisseur',
        'Casque de canyoning',
        'Harnais technique avec culotte de protection'
      ],
      en: [
        'Double thickness 5mm neoprene wetsuit',
        'Canyoning helmet',
        'Technical harness with protective seat'
      ]
    },
    toBring: {
      fr: [
        'Maillot de bain',
        'Chaussures de sport fermées adhérentes',
        'Vêtements de rechange secs pour l\'après-canyon'
      ],
      en: [
        'Swimsuit',
        'Closed grippy sports shoes',
        'Dry change of clothes for after the canyon'
      ]
    }
  },
  {
    _type: 'activity',
    _id: 'activity-samson',
    title: { fr: 'Rando Aqua du Couloir Samson', en: 'Couloir Samson Water Trekking' },
    slug: { _type: 'slug', current: 'samson' },
    category: { _type: 'reference', _ref: 'cat-canyoning' },
    subtitle: { fr: 'La majesté absolue des Gorges du Verdon', en: 'The absolute majesty of the Verdon Gorges' },
    description: {
      fr: 'Une randonnée aquatique unique au plus profond du grand canyon du Verdon. Nagez au pied des falaises de 400 mètres et explorez des grottes mystérieuses.',
      en: 'A unique water trek in the deepest part of the Verdon Grand Canyon. Swim at the foot of 400-meter cliffs and explore mysterious caves.'
    },
    price: 50,
    minAge: 10,
    duration: '3h',
    approachTime: '10 min',
    returnTime: '20 min',
    obstacles: {
      fr: 'Nage dans le courant du Verdon (Floating), passages étroits magiques, sauts de 2 à 6m (non obligatoires), visite de la grotte de la Baume aux pigeons.',
      en: 'Swimming in the Verdon current (Floating), magical narrow passes, jumps from 2 to 6m (non-mandatory), visit of the Baume aux pigeons cave.'
    },
    meetingPoint: 'Parking du Couloir Samson / Sub-Chasteuil',
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.3214234123!2d6.3986927!3d43.8344199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c2ca7b960b73c9%3A0xe9f7e813f8c5123d!2sGorges+du+Verdon!5e0!3m2!1sfr!2sfr!4v1700000000000',
    included: {
      fr: [
        'Combinaison néoprène renforcée adaptée au courant',
        'Gilet de sauvetage spécifique d\'aide à la flottabilité (si nécessaire)',
        'Casque',
        'Guide de haute rivière diplômé d\'État'
      ],
      en: [
        'Reinforced neoprene wetsuit adapted to current',
        'Specific buoyancy aid life jacket (if needed)',
        'Helmet',
        'State-certified high-river guide'
      ]
    },
    requirements: {
      fr: [
        'Être parfaitement à l\'aise dans l\'eau vive',
        'Savoir nager 50m minimum',
        'Âge minimum 10 ans révolus obligatoires'
      ],
      en: [
        'Be perfectly comfortable in moving water',
        'Swim 50m minimum',
        'Minimum age 10 years old mandatory'
      ]
    },
    provided: {
      fr: [
        'Combinaison intégrale néoprène 5mm',
        'Casque homologué',
        'Sacs et bidons étanches collectifs pour le groupe'
      ],
      en: [
        'Full 5mm neoprene wetsuit',
        'Certified helmet',
        'Collective bags and dry containers for the group'
      ]
    },
    toBring: {
      fr: [
        'Maillot de bain',
        'Baskets de sport fermées robustes',
        'Bouteille d\'eau',
        'Pic-nique ou encas énergétique léger'
      ],
      en: [
        'Swimsuit',
        'Robust closed sports sneakers',
        'Water bottle',
        'Picnic or light energy snack'
      ]
    }
  },
  {
    _type: 'activity',
    _id: 'activity-artuby',
    title: { fr: 'Le Canyon de l\'Artuby', en: 'Artuby Canyon' },
    slug: { _type: 'slug', current: 'artuby' },
    category: { _type: 'reference', _ref: 'cat-canyoning' },
    subtitle: { fr: 'Canyon sec et sauvage très vertical', en: 'Dry, wild and very vertical canyon' },
    description: {
      fr: 'Un parcours atypique de canyoning sec, très sauvage, caractérisé par d\'immenses descentes en rappel et une ambiance calcaire grandiose.',
      en: 'An atypical dry canyoning route, very wild, characterized by huge abseils and a grandiose limestone atmosphere.'
    },
    price: 65,
    minAge: 12,
    duration: '4h',
    approachTime: '20 min',
    returnTime: '30 min',
    obstacles: {
      fr: 'Succession d\'immenses rappels verticaux impressionnants (jusqu\'à 35m), désescalade technique, marche engagée en chaos de blocs.',
      en: 'Succession of huge impressive vertical abseils (up to 35m), technical downclimbing, committed walking in boulder chaos.'
    },
    meetingPoint: 'Pont de l\'Artuby / Comps-sur-Artuby',
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2881.012356123!2d6.381234!3d43.731234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c2cf123456789%3A0xabcdefabcdef!2sPont+de+l\'Artuby!5e0!3m2!1sfr!2sfr!4v1700000000000',
    included: {
      fr: [
        'Matériel de verticalité complet homologué (harnais, descendeur, cordes)',
        'Casque',
        'Guide de canyoning professionnel diplômé'
      ],
      en: [
        'Full certified verticality equipment (harness, descender, ropes)',
        'Helmet',
        'State-certified professional canyoning guide'
      ]
    },
    requirements: {
      fr: [
        'Avoir déjà pratiqué la descente en rappel ou l\'escalade',
        'Condition physique sportive générale',
        'Ne pas souffrir de vertige sévère'
      ],
      en: [
        'Previous experience in abseiling or climbing',
        'General sporty physical condition',
        'No severe fear of heights'
      ]
    },
    provided: {
      fr: [
        'Baudrier de canyoning avec double longe et descendeur',
        'Casque homologué',
        'Sacs de canyoning collectifs'
      ],
      en: [
        'Canyoning harness with double lanyard and descender',
        'Certified helmet',
        'Collective canyoning bags'
      ]
    },
    toBring: {
      fr: [
        'Chaussures de marche ou bonnes baskets de trail adhérentes',
        'Petit sac à dos personnel',
        'Pique-nique de sport',
        'Eau (1.5L minimum)'
      ],
      en: [
        'Hiking shoes or good grippy trail sneakers',
        'Small personal backpack',
        'Sports lunch',
        'Water (1.5L minimum)'
      ]
    }
  },
  {
    _type: 'activity',
    _id: 'activity-st-auban',
    title: { fr: 'La Clue de Saint-Auban', en: 'Saint-Auban Canyon' },
    slug: { _type: 'slug', current: 'st-auban' },
    category: { _type: 'reference', _ref: 'cat-canyoning' },
    subtitle: { fr: 'La référence aquatique et sportive', en: 'The aquatic and sporty reference' },
    description: {
      fr: 'Le canyon sportif par excellence ! Une eau abondante toute l\'année, d\'immenses cascades, des toboggans ultra-rapides et une tyrolienne géante de 40 mètres finissant dans l\'eau.',
      en: 'The ultimate sporty canyon! Abundant water all year round, huge waterfalls, ultra-fast slides, and a giant 40-meter zip line ending in the water.'
    },
    price: 55,
    minAge: 12,
    duration: '3h',
    approachTime: '2 min',
    returnTime: '2 min',
    obstacles: {
      fr: 'Tyrolienne spectaculaire de 40m suspendue, grands sauts techniques (jusqu\'à 8m, facultatifs), toboggans éjecteurs rapides, rappels arrosés.',
      en: 'Spectacular suspended 40m zip line, big technical jumps (up to 8m, optional), fast ejector slides, wet abseils.'
    },
    meetingPoint: 'Village de Saint-Auban / Parking du Canyon',
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2872.2341235612!2d6.721234!3d43.851234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cc23456789abc%3A0xdefabcdef!2sSaint-Auban!5e0!3m2!1sfr!2sfr!4v1700000000000',
    included: {
      fr: [
        'Combinaison néoprène renforcée 5mm',
        'Harnais de canyoning équipé avec poulies et mousquetons',
        'Casque de protection',
        'Guide diplômé d\'État spécialisé canyon'
      ],
      en: [
        '5mm reinforced neoprene wetsuit',
        'Canyoning harness equipped with pulleys and carabiners',
        'Protective helmet',
        'State-certified specialized canyon guide'
      ]
    },
    requirements: {
      fr: [
        'Savoir nager impérativement',
        'Bonne condition athlétique générale',
        'Rechercher des sensations fortes et ludiques'
      ],
      en: [
        'Must know how to swim',
        'Good general athletic condition',
        'Looking for strong and fun sensations'
      ]
    },
    provided: {
      fr: [
        'Combinaison néoprène 5mm haut de gamme',
        'Harnais avec longe et double poulie pour tyrolienne',
        'Casque homologué'
      ],
      en: [
        'Premium 5mm neoprene wetsuit',
        'Harness with lanyard and double pulley for zip line',
        'Certified helmet'
      ]
    },
    toBring: {
      fr: [
        'Maillot de bain',
        'Paire de baskets de running avec une bonne adhérence (pas de sandales)',
        'Serviette de bain',
        'Encadrement de sport et bonne humeur !'
      ],
      en: [
        'Swimsuit',
        'Pair of running sneakers with good grip (no sandals)',
        'Bath towel',
        'Sports spirit and good mood!'
      ]
    }
  },
  {
    _type: 'activity',
    _id: 'activity-ferne',
    title: { fr: 'Le Canyon du Ferné', en: 'Ferne Canyon' },
    slug: { _type: 'slug', current: 'ferne' },
    category: { _type: 'reference', _ref: 'cat-canyoning' },
    subtitle: { fr: 'Canyon sauvage de grande envergure', en: 'Large-scale wild canyon' },
    description: {
      fr: 'Un canyon d\'exception, technique, très sauvage et vertical. Réservé aux personnes en excellente condition physique cherchant une immersion totale dans les gorges secrètes du Verdon.',
      en: 'An exceptional, technical, very wild and vertical canyon. Reserved for people in excellent physical condition looking for a total immersion in the secret gorges of the Verdon.'
    },
    price: 90,
    minAge: 16,
    duration: '6h',
    approachTime: '1h',
    returnTime: '1h30',
    obstacles: {
      fr: 'Grandes verticales techniques de plus de 40 mètres, marche d\'approche engagée, nage prolongée en eau froide sauvage.',
      en: 'Large technical vertical drops over 40 meters, committed approach walk, prolonged swimming in wild cold water.'
    },
    meetingPoint: 'Castellane / Route des Crêtes',
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.136284698579!2d6.3986927!3d43.8344199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c2ca7b960b73c9%3A0xe9f7e813f8c5123d!2sGorges+du+Verdon!5e0!3m2!1sfr!2sfr!4v1700000000000',
    included: {
      fr: [
        'Équipement néoprène premium complet (avec cagoule)',
        'Harnais de verticalité double longe homologué',
        'Sacs de portage robustes et bidons étanches individuels',
        'Guide professionnel de canyoning hautement qualifié'
      ],
      en: [
        'Full premium neoprene equipment (with hood)',
        'Certified double lanyard verticality harness',
        'Robust portage bags and individual dry containers',
        'Highly qualified professional canyoning guide'
      ]
    },
    requirements: {
      fr: [
        'Être dans une excellente forme physique et très sportif',
        'Savoir parfaitement nager 100m',
        'Avoir une première expérience réussie en rappel vertical',
        'Excellente endurance à l\'effort physique continu'
      ],
      en: [
        'Be in excellent physical shape and highly active',
        'Swim 100m perfectly',
        'Previous successful experience in vertical abseiling',
        'Excellent endurance for continuous physical effort'
      ]
    },
    provided: {
      fr: [
        'Combinaison néoprène 5.5mm avec cagoule intégrée',
        'Harnais technique de verticalité expert',
        'Casque de canyoning expert',
        'Sac à dos de canyoning et bidon étanche individuel'
      ],
      en: [
        '5.5mm neoprene wetsuit with integrated hood',
        'Expert technical verticality harness',
        'Expert canyoning helmet',
        'Canyoning backpack and individual dry container'
      ]
    },
    toBring: {
      fr: [
        'Maillot de bain',
        'Baskets de trail ou de marche robustes à profil adhérent',
        'Pique-nique énergétique froid et compact',
        'Eau (2L minimum)',
        'Barres de céréales, barres de chocolat, fruits secs'
      ],
      en: [
        'Swimsuit',
        'Robust trail or hiking sneakers with grippy profile',
        'Cold, compact, energetic picnic',
        'Water (2L minimum)',
        'Cereal bars, chocolate bars, dried fruit'
      ]
    }
  },
  {
    _type: 'activity',
    _id: 'activity-estelie',
    title: { fr: 'Le Canyon de l\'Estelié', en: 'Estelie Canyon' },
    slug: { _type: 'slug', current: 'estelie' },
    category: { _type: 'reference', _ref: 'cat-canyoning' },
    subtitle: { fr: 'Canyon très sportif et aquatique', en: 'Very sporty and aquatic canyon' },
    description: {
      fr: 'Le canyon le plus technique et physique des Gorges du Verdon. Une aventure aquatique grandiose, engagée, au cœur de la zone de l\'Imbut. Sensations vertigineuses et aquatiques extrêmes garanties.',
      en: 'The most technical and physical canyon of the Verdon Gorges. A grandiose, committed aquatic adventure in the heart of the Imbut area. Extreme vertical and aquatic sensations guaranteed.'
    },
    price: 110,
    minAge: 16,
    duration: '6h à 7h',
    approachTime: '1h15',
    returnTime: '1h30',
    obstacles: {
      fr: 'Sauts de grande hauteur dans des vasques agitées, siphons (tous évitables), rappels techniques sous cascade très arrosés.',
      en: 'High jumps into turbulent pools, siphons (all avoidable), very wet technical abseils under waterfalls.'
    },
    meetingPoint: 'La Palud-sur-Verdon / Chalet de la Maline',
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.013589886738!2d6.3400512!3d43.8159114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c2cedec4ff8e5d%3A0x6b44574a36f5627!2sLa+Palud-sur-Verdon!5e0!3m2!1sfr!2sfr!4v1700000000000',
    included: {
      fr: [
        'Combinaison néoprène renforcée 5mm',
        'Matériel de canyoning expert homologué (harnais, longes, mousquetons)',
        'Guide pro spécialiste de l\'engagement extrême du Verdon'
      ],
      en: [
        '5mm reinforced neoprene wetsuit',
        'Certified expert canyoning equipment (harness, lanyards, carabiners)',
        'Pro guide specialist in extreme Verdon commits'
      ]
    },
    requirements: {
      fr: [
        'Condition physique athlétique rigoureuse requise',
        'Avoir déjà accompli avec succès plusieurs canyons techniques',
        'Aucune appréhension du vide, de la hauteur et de l\'eau vive remuante'
      ],
      en: [
        'Rigorous athletic physical condition required',
        'Previous successful completions of technical canyons',
        'No apprehension of heights, void, or turbulent moving water'
      ]
    },
    provided: {
      fr: [
        'Combinaison néoprène renforcée 5mm',
        'Harnais de canyoning expert double longe et descendeur',
        'Casque de protection robuste',
        'Bidon étanche individuel et sac de portage de canyoning'
      ],
      en: [
        '5mm reinforced neoprene wetsuit',
        'Expert canyoning harness with double lanyard and descender',
        'Robust protective helmet',
        'Individual dry container and canyoning portage bag'
      ]
    },
    toBring: {
      fr: [
        'Maillot de bain',
        'Excellentes baskets de trail ou de marche (très important pour l\'adhérence)',
        'Pique-nique froid compact (sandwich sous plastique)',
        'Eau (2L minimum)',
        'En-cas rapides (fruits secs, barres céréales)'
      ],
      en: [
        'Swimsuit',
        'Excellent trail or hiking sneakers (very important for grip)',
        'Compact cold picnic (wrapped sandwich)',
        'Water (2L minimum)',
        'Quick snacks (dried fruit, cereal bars)'
      ]
    }
  }
];

async function seedOutings() {
  console.log('Starting seedOutings script...');
  for (const outing of outings) {
    try {
      await client.createOrReplace(outing);
      console.log(`Successfully seeded outing: ${outing.title.fr} (${outing.slug.current})`);
    } catch (err) {
      console.error(`Failed to seed outing ${outing.title.fr}:`, err.message);
    }
  }
  console.log('Seeding process complete!');
}

seedOutings();
