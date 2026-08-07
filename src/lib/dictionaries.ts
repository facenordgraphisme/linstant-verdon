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
        info: "Pour le choix du canyon, nous vous invitons à nous appeler pour tous renseignements (praticabilité, météo, lieux et horaires de rendez-vous). En fonction de votre niveau ou de votre expérience, notre équipe vous proposera l’activité la plus adaptée.",
        logistics: "Les rendez-vous sont fixés directement sur les points de départ des canyons. Le point GPS accompagné de sa carte de navigation vous sera transmis sur votre e-mail.",
        sections: [
          { title: "Demi journée découverte en famille", points: ["Balène : canyon « pitchoune »", "Bas Jabron : canyon famille", "Baudan-Baou : canyon famille"] },
          { title: "Demi journée découverte entre amis", points: ["Samson : Rando aqua", "La clue d’Artuby"] },
          { title: "Canyon demi-journée sportive", points: ["Clue de St Auban"] },
          { title: "Canyon journée sportive", points: ["Ferné : canyon sportif, vertical et aquatique", "Estelié-Imbut : canyon très sportif et aquatique"] }
        ]
      },
      escalade: {
        name: "Escalade",
        tagline: "Prenez de la hauteur sur les falaises légendaires",
        description: "Le Verdon est réputé mondialement pour des voies d’exceptions. De la falaise d’initiation aux grandes voies de tous niveaux, l’ambiance sera au rendez-vous dans un décor unique.",
        info: "Si vous n’avez pas le vertige et déjà quelques notions d’escalade, on vous conseille fortement de venir découvrir une grande voie avec nous.",
        sections: [
          { title: "Demi-journée découverte", points: ["Falaise d'initiation", "Perfectionnement technique"] },
          { title: "Grande Voie", points: ["Plus de 200 grandes voies du 4a au 8b", "De 100 à 1000 m de hauteur"] }
        ]
      },
      aventures: {
        name: "Parcours Aventure",
        tagline: "L'équilibre parfait entre verticalité et liberté",
        description: "Découvrez le Verdon sous un angle vertical avec nos parcours aventure sécurisés.",
        sections: [
          { title: "Découverte", points: ["Trou du Renard : demi-journée découverte"] },
          { title: "Sportif", points: ["Main-morte : Journée sportive"] }
        ]
      },
      insolite: {
        name: "Insolite",
        tagline: "Vivez l'inattendu, osez l'insolite",
        description: "Sortez des sentiers battus avec nos expériences uniques dans les Gorges.",
        sections: [
          { title: "Expériences", points: ["Soirée Insolite", "Demi journée insolite à la Carelle", "Grande voie avec Nuit en portaledge"] }
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
      canyoning: { name: "Canyoning", tagline: "Explore the magic of the canyons" },
      escalade: { name: "Climbing", tagline: "Reach new heights" },
      aventures: { name: "Adventures", tagline: "Balance between verticality and freedom" },
      insolite: { name: "Unusual", tagline: "Experience the unexpected" },
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
