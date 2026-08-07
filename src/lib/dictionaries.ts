const dictionaries = {
  fr: {
    meta: {
      title: "L'instant Verdon | Canyoning, Aquarando & Escalade dans le Verdon",
      description: "Découvrez les Gorges du Verdon avec L'instant Verdon. Canyoning, Aqua-rando et escalade encadrés par des professionnels passionnés. Réservez votre aventure !",
    },
    nav: {
      activities: "Activités",
      canyoning: "Canyoning",
      escalade: "Escalade",
      stages: "Week-ends & Stages",
      evenementiel: "Évènementiel",
      aventures: "Parcours Aventure",
      insolite: "Insolite",
      about: "À propos",
      faq: "Infos & FAQ",
      contact: "Contact",
      book: "Réserver",
      blog: "Blog",
    },
    hero: {
      title: "Vivez l'instant présent au cœur du Verdon",
      subtitle: "Aventures authentiques en Canyoning et Aqua-rando dans le plus grand canyon d'Europe.",
      cta: "Découvrir nos sorties",
    },
    about: {
      title: "Qui sommes-nous ?",
      tagline: "L'Aventure humaine au cœur du Canyon",
      intro: "L'Instant Verdon est né d'une passion commune pour les grands espaces et l'aventure. Basés à La Palud-sur-Verdon, au cœur des Gorges du Verdon, nous vous accompagnons dans vos explorations les plus sauvages.",
      history: "L'instant Verdon est un syndicat local (regroupement de travailleurs indépendants) créé en 2018. En 2025, un changement s’opère ; Angèle Kanapa et Emma Aglaé reprennent les rênes de l'Instant Verdon.",
      emma: "Diplômée d’Etat de canyonisme en 2020 et cofondatrice de L’instant Verdon depuis 2018. Emma a grandi dans le Verdon, elle connaît donc la région comme sa poche ! Passionnée de toutes les activités de plein air et d'acro yoga, elle vous fera découvrir les recoins secrets des Gorges avec joie et bonne humeur.",
      angele: "Diplômée du Brevet d’Etat d’escalade et canyonisme en 2013. Angèle a grandi en Ardèche et pratique les activités de pleine nature depuis l'enfance. Après avoir travaillé à Marseille et en Corse, elle s'est installée dans le Verdon pour partager son engouement de l’aventure avec vous.",
      marie: "Diplômée d’Etat d’Escalade et de Canyoning depuis 2020. Marie est passionnée d’escalade sous toutes ses formes ! Des falaises niçoises aux fissures de Chamonix, elle vous fera découvrir les joies de la verticalité et du milieu aquatique avec plaisir.",
      ecology: "Très sensibles aux problématiques de préservation de l'environnement, nous cherchons sans cesse à partager notre terrain de jeu avec vous tout en contribuant à préserver au mieux la biodiversité qui nous entoure.",
      activities: "Nous vous proposons, du canyon, de l’escalade, à la demi-journée, journée ou sous forme de stage ainsi que des soirées insolites dans Gorges du Verdon.",
      vocation: "Notre vocation est de vous transmettre nos expériences au travers d’un programme d'activités de pleine nature. Nous travaillons donc avec des professionnels qualifiés et expérimentés.",
      team: "L'instant Verdon, est composé d’une équipe jeune, dynamique et passionnée.",
      target: "Que vous soyez seul, en couple, en famille, entre amis, un comité d’entreprise, nous vous proposerons une activité adéquate !",
      guideRole: "Co-gérante & Guide",
      marieRole: "Guide Escalade & Canyon",
      partnersTitle: "Nos Partenaires",
      partnersSubtitle: "Ils nous font confiance et partagent nos valeurs",
      partnersActivities: "Activités",
      partnersLodging: "Hébergement",
      partnersOther: "Autre",
    },
    activities: {
      title: "Nos Activités Nature",
      canyoning: {
        name: "Canyoning",
        tagline: "Explorez la magie des canyons et leurs eaux turquoise",
        description: "Le canyoning est un sport de pleine nature, il consiste à descendre un cours d’eau dont le débit sera plus ou moins important selon la saison. Avec votre guide, vous découvrirez différentes techniques de progression sécurisées: marche, nage, saut ou descente en rappel.",
        info: "Pour le choix du canyon, nous vous invitons à nous appeler pour tous renseignements (praticabilité, météo, lieux et horaires de rendez-vous). En fonction de votre niveau ou de votre expérience, notre équipe vous proposera l’activité la plus adaptée. Nos canyons vont de la demi-journée familiale accessible dès 7-8 ans (Balène, Bas-Jabron) aux journées sportives et aquatiques réservées aux plus aguerris (Ferné, Estelié-Imbut) — il y en a pour tous les niveaux.",
        logistics: "Les rendez-vous sont fixés directement sur les points de départ des canyons. Le point GPS accompagné de sa carte de navigation vous sera transmis sur votre e-mail.",
        sections: [
          { title: "Demi journée découverte en famille", points: ["Balène : canyon « pitchoune »", "Bas Jabron : canyon famille", "Baudan-Baou : canyon famille"] },
          { title: "Demi journée découverte entre amis", points: ["Samson : Rando aqua", "La clue d’Artuby"] },
          { title: "Canyon demi-journée sportive", points: ["Clue de St Auban"] },
          { title: "Canyon journée sportive", points: ["Ferné : canyon sportif, vertical et aquatique", "Estelié-Imbut : canyon très sportif et aquatique"] }
        ],
        faqMini: [
          { q: "Faut-il savoir nager pour faire du canyoning ?", a: "Oui, il est impératif de savoir nager au moins 25 mètres et d'être capable de s'immerger. Cette condition est obligatoire pour toutes nos sorties, quel que soit le canyon choisi." },
          { q: "Quel canyon choisir pour débuter ?", a: "Balène, Bas-Jabron et Baudan-Baou sont nos canyons \"famille\", accessibles dès 7-8 ans et sans expérience préalable. Pour une première sortie entre amis avec un peu plus de sensations, Samson et la Clue d'Artuby sont d'excellents choix." },
          { q: "Que se passe-t-il en cas de crue ou de mauvaise météo ?", a: "Votre guide surveille en permanence le niveau d'eau et les prévisions. Si les conditions ne sont pas sûres, la sortie est reportée ou une alternative est proposée, sans frais pour vous." }
        ]
      },
      escalade: {
        name: "Escalade",
        tagline: "Prenez de la hauteur sur les falaises légendaires",
        description: "Le Verdon est réputé mondialement pour des voies d’exceptions. De la falaise d’initiation aux grandes voies de tous niveaux, l’ambiance sera au rendez-vous dans un décor unique.",
        info: "Si vous n’avez pas le vertige et déjà quelques notions d’escalade, on vous conseille fortement de venir découvrir une grande voie avec nous. Nos falaises d'initiation permettent une première approche en toute sécurité, tandis que nos grandes voies (4a à 8b, de 100 à 1000m) raviront les grimpeurs plus expérimentés en quête d'un cadre exceptionnel.",
        sections: [
          { title: "Demi-journée découverte", points: ["Falaise d'initiation", "Perfectionnement technique"] },
          { title: "Grande Voie", points: ["Plus de 200 grandes voies du 4a au 8b", "De 100 à 1000 m de hauteur"] }
        ],
        faqMini: [
          { q: "Faut-il avoir déjà grimpé pour venir avec vous ?", a: "Non, notre demi-journée découverte est conçue pour les débutants complets. Pour une grande voie, quelques notions d'escalade et l'absence de vertige handicapant sont recommandées — contactez-nous pour un conseil personnalisé." },
          { q: "Le matériel est-il fourni ?", a: "Oui, tout le matériel technique (baudrier, casque, corde, chaussons sur demande) est fourni et conforme aux normes CE, encadré par un guide diplômé d'État." },
          { q: "Quel est le niveau des voies dans le Verdon ?", a: "Le Verdon propose plus de 200 grandes voies allant du 4a (initiation) au 8b (très soutenu), sur des hauteurs de 100 à 1000 mètres — un terrain de jeu mondialement reconnu pour tous les niveaux." }
        ]
      },
      aventures: {
        name: "Parcours Aventure",
        tagline: "L'équilibre parfait entre verticalité et liberté",
        description: "Découvrez le Verdon sous un angle vertical avec nos parcours aventure sécurisés, encadrés par des guides diplômés d'État. Du Trou du Renard, parcours découverte en demi-journée, à Main-morte, journée sportive plus engagée, chaque itinéraire combine marche, escalade facilitée et vue imprenable sur les Gorges.",
        sections: [
          { title: "Découverte", points: ["Trou du Renard : demi-journée découverte"] },
          { title: "Sportif", points: ["Main-morte : Journée sportive"] }
        ],
        faqMini: [
          { q: "Un parcours aventure, en quoi ça consiste ?", a: "C'est une progression encadrée en falaise mêlant marche, passages câblés et courtes sections d'escalade facilitée, sans nécessiter d'expérience technique préalable — accessible à toute personne en bonne condition physique." },
          { q: "Quelle différence entre Trou du Renard et Main-morte ?", a: "Trou du Renard est notre parcours découverte en demi-journée, idéal pour une première approche. Main-morte est une journée sportive plus engagée, pour ceux qui veulent prolonger les sensations." },
          { q: "Faut-il être sportif pour participer ?", a: "Une bonne condition physique générale suffit ; aucune expérience technique n'est requise. Votre guide adapte le rythme à votre niveau et vos envies." }
        ]
      },
      insolite: {
        name: "Insolite",
        tagline: "Vivez l'inattendu, osez l'insolite",
        description: "Sortez des sentiers battus avec nos expériences uniques dans les Gorges du Verdon — L'Instant Verdon a été pionnier du portaledge suspendu à la falaise dans la région, à La Palud-sur-Verdon.",
        sections: [
          { title: "Expériences", points: ["Soirée Insolite", "Demi journée insolite à la Carelle", "Grande voie avec Nuit en portaledge"] }
        ],
        faqMini: [
          { q: "Qu'est-ce qu'un portaledge ?", a: "C'est une plateforme suspendue à la falaise, utilisée historiquement par les grimpeurs de big wall (Yosemite) pour bivouaquer en paroi. Nous vous proposons d'y vivre un apéritif au coucher du soleil ou une nuit complète suspendue au-dessus des Gorges du Verdon." },
          { q: "Faut-il être expérimenté pour dormir en portaledge ?", a: "Pour la soirée apéritif suspendu, l'expérience est accessible à tous niveaux grâce à un accès facile depuis le haut des voies. Pour la nuit complète en portaledge, une expérience de l'escalade et l'absence de vertige handicapant sont nécessaires." },
          { q: "Ces expériences sont-elles sécurisées ?", a: "Oui, vous êtes encadrés et sécurisés en permanence par un guide diplômé d'État avec du matériel professionnel homologué, du départ jusqu'au retour." }
        ]
      },
      stages: {
        name: "Week-ends & Stages",
        tagline: "Immergez-vous dans l'univers du Verdon",
        description: "Venez vivre une expérience inoubliable au cœur de la nature avec notre stage multi-activités alliant acro-yoga, escalade et canyoning.",
        info: "Notre stage est conçu pour les passionnés de sensations fortes et de bien-être.",
        sections: [
          { title: "Acro-yoga", points: ["Discipline sportive et poétique", "Mélange yoga et acrobatie"] },
          { title: "Canyon & Escalade", points: ["Perfectionnement technique", "Découverte de lieux magiques"] }
        ]
      },
      evenementiel: {
        name: "Événementiel",
        tagline: "Vos événements sur mesure dans un cadre unique",
        description: "Vous souhaitez organiser un événement sportif ? EVJF, EVG, séminaires... Contactez-nous, on vous proposera une activité adaptée.",
        info: "Nous travaillons pour les comités d’entreprises et les collectivités, et animons les anniversaires."
      }
    },
    blog: {
      title: "Notre Blog & Actualités",
      tagline: "Récits d'aventures et conseils de guides",
      subtitle: "Suivez nos aventures et découvrez les secrets des Gorges du Verdon à travers les récits d'Emma et Angèle.",
      readMore: "Lire l'article",
      backToList: "← Retour aux articles",
      publishedAt: "Publié le",
      author: "Par Emma & Angèle",
      noPosts: "Aucun article disponible pour le moment.",
    },
  },
  en: {
    meta: {
      title: "L'instant Verdon | Canyoning, Water Trekking & Climbing in Verdon",
      description: "Explore the Verdon Gorges with L'instant Verdon.",
    },
    nav: {
      activities: "Activities",
      canyoning: "Canyoning",
      escalade: "Climbing",
      stages: "Weekends & Trips",
      evenementiel: "Events",
      aventures: "Adventures",
      insolite: "Unusual",
      about: "About",
      faq: "Info & FAQ",
      contact: "Contact",
      book: "Book Now",
      blog: "Blog",
    },
    hero: {
      title: "Experience the moment in the heart of Verdon",
      subtitle: "Authentic adventures in Canyoning and Climbing.",
      cta: "Discover our trips",
    },
    about: {
      title: "About Us",
      tagline: "A human adventure at the heart of the Canyon",
      intro: "L'Instant Verdon was born from a shared passion for the great outdoors and adventure. Based in La Palud-sur-Verdon, at the heart of the Verdon Gorges, we guide you through your wildest explorations.",
      history: "L'instant Verdon is a local union created in 2018. In 2025, Angèle Kanapa and Emma Aglaé took over the leadership.",
      emma: "State-certified canyoning guide (Diplôme d'État) since 2020 and co-founder of L'Instant Verdon since 2018. Emma grew up in the Verdon, so she knows the region like the back of her hand! Passionate about outdoor activities and acro-yoga, she'll show you the Gorges' secret corners with joy and good humor.",
      angele: "Holds a Brevet d'État in climbing and canyoning since 2013. Angèle grew up in the Ardèche region and has practiced outdoor activities since childhood. After working in Marseille and Corsica, she settled in the Verdon to share her passion for adventure with you.",
      marie: "State-certified climbing and canyoning guide since 2020. Marie is passionate about climbing in all its forms! From the cliffs of Nice to the cracks of Chamonix, she'll happily introduce you to the joys of verticality and the water.",
      ecology: "We are committed to preserving the environment and biodiversity of our beautiful region.",
      activities: "We offer canyoning, climbing, and unique evening experiences in the Verdon Gorges.",
      vocation: "Our mission is to share our passion through nature activities with qualified professionals.",
      team: "A young, dynamic and passionate team.",
      target: "Whether you are alone, a couple, a family or a group, we have the right activity for you.",
      guideRole: "Co-Manager & Guide",
      marieRole: "Climbing & Canyoning Guide",
      partnersTitle: "Our Partners",
      partnersSubtitle: "They trust us and share our values",
      partnersActivities: "Activities",
      partnersLodging: "Lodging",
      partnersOther: "Other",
    },
    activities: {
      title: "Our Outdoor Activities",
      canyoning: {
        name: "Canyoning",
        tagline: "Explore the magic of the canyons and their turquoise waters",
        description: "Canyoning is an outdoor sport that involves descending a watercourse, with flow varying depending on the season. With your guide, you'll discover different secure progression techniques: walking, swimming, jumping, or abseiling.",
        info: "For choosing a canyon, we invite you to call us for all information (conditions, weather, meeting locations and times). Depending on your level or experience, our team will suggest the best-suited activity. Our canyons range from family-friendly half-days accessible from age 7-8 (Balène, Bas-Jabron) to sporty, aquatic full days for the more experienced (Ferné, Estelié-Imbut) — there's something for every level.",
        logistics: "Meeting points are set directly at the canyons' starting points. The GPS point along with a navigation map will be sent to your email.",
        sections: [
          { title: "Family discovery half day", points: ["Balène: the \"pitchoune\" canyon", "Bas Jabron: family canyon", "Baudan-Baou: family canyon"] },
          { title: "Friends discovery half day", points: ["Samson: water trekking", "La Clue d'Artuby"] },
          { title: "Sporty half day canyon", points: ["Clue de St Auban"] },
          { title: "Sporty full day canyon", points: ["Ferné: sporty, vertical and aquatic canyon", "Estelié-Imbut: very sporty and aquatic canyon"] }
        ],
        faqMini: [
          { q: "Do I need to know how to swim to go canyoning?", a: "Yes, it is mandatory to know how to swim at least 25 meters and be able to submerge underwater. This is a required condition for every outing, whichever canyon you choose." },
          { q: "Which canyon should I choose to start with?", a: "Balène, Bas-Jabron and Baudan-Baou are our \"family\" canyons, accessible from age 7-8 with no prior experience. For a first outing with friends with a bit more thrill, Samson and La Clue d'Artuby are excellent choices." },
          { q: "What happens in case of flooding or bad weather?", a: "Your guide constantly monitors water levels and forecasts. If conditions aren't safe, the outing is rescheduled or an alternative is proposed, at no extra cost to you." }
        ]
      },
      escalade: {
        name: "Climbing",
        tagline: "Reach new heights on legendary cliffs",
        description: "The Verdon is world-renowned for its exceptional climbing routes. From beginner-friendly cliffs to multi-pitch routes for every level, you'll find a great atmosphere in a unique setting.",
        info: "If you're not afraid of heights and already have some climbing experience, we strongly recommend trying a multi-pitch route with us. Our beginner cliffs allow a safe first approach, while our multi-pitch routes (4a to 8b, 100 to 1000m) will delight more experienced climbers looking for an exceptional setting.",
        sections: [
          { title: "Discovery half-day", points: ["Beginner cliff", "Technical improvement"] },
          { title: "Multi-pitch route", points: ["Over 200 multi-pitch routes from 4a to 8b", "100 to 1000m high"] }
        ],
        faqMini: [
          { q: "Do I need to have climbed before to join you?", a: "No, our discovery half-day is designed for complete beginners. For a multi-pitch route, some climbing experience and no disabling fear of heights are recommended — contact us for personalized advice." },
          { q: "Is the equipment provided?", a: "Yes, all technical equipment (harness, helmet, rope, climbing shoes on request) is provided and meets CE standards, supervised by a state-certified guide." },
          { q: "What's the level of routes in the Verdon?", a: "The Verdon offers over 200 multi-pitch routes ranging from 4a (beginner) to 8b (very sustained), on cliffs from 100 to 1000 meters high — a world-renowned playground for every level." }
        ]
      },
      aventures: {
        name: "Adventures",
        tagline: "The perfect balance between verticality and freedom",
        description: "Discover the Verdon from a vertical angle with our secure adventure courses, led by state-certified guides. From Trou du Renard, a half-day discovery course, to Main-morte, a more committing sporty full day, every route combines hiking, easy climbing, and breathtaking views over the Gorges.",
        sections: [
          { title: "Discovery", points: ["Trou du Renard: half-day discovery"] },
          { title: "Sporty", points: ["Main-morte: sporty full day"] }
        ],
        faqMini: [
          { q: "What exactly is an adventure course?", a: "It's a guided progression along the cliff combining hiking, cabled sections, and short easy-climbing passages, with no prior technical experience required — accessible to anyone in good physical shape." },
          { q: "What's the difference between Trou du Renard and Main-morte?", a: "Trou du Renard is our half-day discovery course, ideal for a first approach. Main-morte is a more committing sporty full day, for those who want to extend the thrill." },
          { q: "Do I need to be athletic to take part?", a: "General good physical fitness is enough; no technical experience is required. Your guide adapts the pace to your level and preferences." }
        ]
      },
      insolite: {
        name: "Unusual",
        tagline: "Experience the unexpected, dare the unusual",
        description: "Step off the beaten path with our unique experiences in the Verdon Gorges — L'Instant Verdon pioneered the cliffside portaledge experience in the region, in La Palud-sur-Verdon.",
        sections: [
          { title: "Experiences", points: ["Unusual Evening", "Half-day unusual experience at La Carelle", "Multi-pitch route with a portaledge night"] }
        ],
        faqMini: [
          { q: "What is a portaledge?", a: "It's a platform suspended from the cliff face, historically used by big wall climbers (Yosemite) to bivouac on the rock. We offer you the chance to enjoy a sunset aperitif or a full night suspended above the Verdon Gorges." },
          { q: "Do I need experience to sleep in a portaledge?", a: "For the sunset aperitif evening, the experience is accessible to all levels thanks to easy access from the top of the routes. For the full portaledge night, climbing experience and no disabling fear of heights are required." },
          { q: "Are these experiences safe?", a: "Yes, you are supervised and secured at all times by a state-certified guide with certified professional equipment, from start to finish." }
        ]
      },
      stages: { name: "Stages", tagline: "Immerse yourself in the Verdon" },
      evenementiel: { name: "Events", tagline: "Custom events in a unique setting" },
    },
    blog: {
      title: "Our Blog & News",
      tagline: "Adventure stories and guide advice",
      subtitle: "Follow our adventures and discover the secrets of the Verdon Gorges through Emma and Angèle's stories.",
      readMore: "Read article",
      backToList: "← Back to articles",
      publishedAt: "Published on",
      author: "By Emma & Angèle",
      noPosts: "No posts available at the moment.",
    },
  },
};

export const getDictionary = (locale: 'fr' | 'en') => dictionaries[locale as 'fr' | 'en'] || dictionaries.fr;
