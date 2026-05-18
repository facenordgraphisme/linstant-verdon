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
  // CATEGORY: PARCOURS AVENTURE (aventures)
  {
    _id: 'outing-trou-du-renard',
    _type: 'activity',
    title: {
      fr: 'Le Trou du Renard - Via Cordata',
      en: 'Trou du Renard - Via Cordata Adventure'
    },
    slug: {
      _type: 'slug',
      current: 'trou-du-renard'
    },
    subtitle: {
      fr: 'Un parcours vertical aérien unique suspendu au-dessus du vide dans les Gorges du Verdon.',
      en: 'A unique aerial vertical path suspended high above the void in the Verdon Gorges.'
    },
    description: {
      fr: "Un parcours vertical inoubliable, suspendu sur une vire rocheuse à plus de 200 mètres au-dessus du lit du Verdon. Le Trou du Renard est un mélange parfait de via ferrata et d'escalade accessible à tous. Le clou du spectacle ? Une tyrolienne vertigineuse de 40 mètres qui vous propulsera au milieu des falaises calcaires, et le fameux passage du pont de singe. Des sensations fortes garanties dans un décor naturel sauvage à couper le souffle, sous le regard des vautours fauves.",
      en: "An unforgettable vertical adventure, suspended on a rocky ledge more than 200 meters above the Verdon riverbed. Trou du Renard is a perfect blend of via ferrata and climbing, accessible to all. The highlight of the trip? A breathtaking 40-meter zipline propelling you straight into the limestone cliffs, and the famous monkey bridge crossing. Thrills guaranteed in a wild and stunning natural setting under the watchful eyes of Griffon vultures."
    },
    price: 50,
    minAge: 10,
    duration: '3h',
    approachTime: '15 min',
    returnTime: '10 min',
    obstacles: {
      fr: "Traversées sur vires aériennes, pont de singe, tyrolienne de 40m en fil d'araignée, descente en rappel de 15m.",
      en: "Aerial ledge crossings, monkey bridge, 40m free-hanging zipline, 15m abseil descent."
    },
    provided: {
      fr: ["Baudrier complet", "Casque homologué", "Longes de via ferrata avec absorbeur d'énergie", "Poulie double pour tyrolienne", "Encadrement par un guide diplômé d'État"],
      en: ["Full harness", "Certified helmet", "Via ferrata lanyards with energy absorber", "Double pulley for zipline", "Guiding by a certified State-licensed guide"]
    },
    toBring: {
      fr: ["Chaussures de sport (baskets ou rando)", "Tenue de sport confortable", "Petit sac à dos", "Bouteille d'eau (1L min.)", "Petite collation (barres de céréales)"],
      en: ["Sport shoes (sneakers or hiking boots)", "Comfortable athletic clothing", "Small backpack", "Bottle of water (1L min.)", "Small snack (energy bars)"]
    },
    included: {
      fr: ["Encadrement par un guide de haute montagne / escalade diplômé", "Assurance Responsabilité Civile Professionnelle", "Tout le matériel technique nécessaire"],
      en: ["Guiding by a certified State-licensed climbing guide", "Professional Civil Liability Insurance", "All necessary technical equipment"]
    },
    requirements: {
      fr: ["Ne pas être sujet au vertige sévère", "Bonne condition physique générale", "Âge minimum 10 ans accompagné"],
      en: ["No severe vertigo/fear of heights", "Good general physical condition", "Minimum age 10 accompanied by an adult"]
    },
    meetingPoint: "Parking du Couloir Samson (Route des Crêtes), Castellane / La Palud-sur-Verdon",
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.4673966557683!2d6.388836376742517!3d43.78393524419515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c26ea6bc095cb9%3A0xe54d6ea4d23253b!2sParking%20du%20Couloir%20Samson!5e0!3m2!1sfr!2sfr!4v1715800000000!5m2!1sfr!2sfr",
    category: {
      _type: 'reference',
      _ref: 'cat-aventures'
    }
  },
  {
    _id: 'outing-mainmorte-sec',
    _type: 'activity',
    title: {
      fr: 'Rappel Géant de Mainmorte',
      en: 'Mainmorte Giant Abseil & Adventure'
    },
    slug: {
      _type: 'slug',
      current: 'mainmorte-sec'
    },
    subtitle: {
      fr: 'Un canyon sec sauvage combinant rappels vertigineux et remontée par une via ferrata aérienne.',
      en: 'A wild dry canyon combining spectacular abseiling and climbing up a dramatic via ferrata.'
    },
    description: {
      fr: "Mainmorte est l'un des parcours d'aventure les plus spectaculaires du Verdon. Ce canyon sec (sans eau) offre une descente technique caractérisée par une succession de rappels verticaux, dont un rappel géant de 45 mètres en fil d'araignée suspendu dans le vide absolu. La remontée s'effectue par une via ferrata sportive et aérienne équipée de marches métalliques et de câbles à flanc de falaise. Un parcours complet idéal pour les amateurs de hauteur et de techniques de cordes.",
      en: "Mainmorte is one of the most spectacular adventure trails in the Verdon. This dry canyon (without water) offers a technical descent characterized by a series of vertical abseils, including a giant 45-meter free-hanging rappel suspended in absolute void. The return is made by climbing a sporty and high-aerial via ferrata equipped with metal steps and cables directly on the cliffside. A comprehensive itinerary ideal for height enthusiasts and rope technique lovers."
    },
    price: 60,
    minAge: 12,
    duration: '4h',
    approachTime: '10 min',
    returnTime: '20 min',
    obstacles: {
      fr: "Succession de rappels de 10m à 45m (rappel en fil d'araignée), remontée via ferrata athlétique et gazeuse.",
      en: "Series of rappels from 10m to 45m (free-hanging abseil), athletic and high-exposure via ferrata climb."
    },
    provided: {
      fr: ["Baudrier avec double longe et absorbeur", "Système de descente en rappel (descendeur et mousquetons)", "Casque de protection", "Encadrement professionnel par un guide diplômé"],
      en: ["Harness with double lanyard and absorber", "Abseiling device and carabiners", "Protective helmet", "Professional guiding by a State-certified instructor"]
    },
    toBring: {
      fr: ["Chaussures adhérentes (trail ou baskets de qualité)", "Tenue de sport protégeant les genoux et les coudes", "Sac à dos individuel avec 1.5L d'eau minimum", "Pique-nique ou barres énergétiques"],
      en: ["Grippy athletic shoes (trail runners or hiking sneakers)", "Sport clothing covering knees and elbows", "Individual backpack with at least 1.5L of water", "Picnic lunch or energy bars"]
    },
    included: {
      fr: ["Matériel de sécurité individuel et collectif", "Encadrement par un guide diplômé d'État", "Assurance RC Pro"],
      en: ["Individual and group safety gear", "Guiding by a certified State-licensed instructor", "Professional Liability Insurance"]
    },
    requirements: {
      fr: ["Très bonne condition physique", "Ne pas être sujet au vertige", "Expérience préalable en rappel souhaitée"],
      en: ["Very good physical fitness", "No vertigo / fear of heights", "Previous abseiling experience recommended"]
    },
    meetingPoint: "Parking de Mainmorte (Route des Crêtes), La Palud-sur-Verdon",
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.8824151740924!2d6.347525376742051!3d43.776606044738596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c26fa347895e69%3A0xe54d6ea4f23253b!2sRoute%20des%20Cr%C3%AAtes!5e0!3m2!1sfr!2sfr!4v1715800000001!5m2!1sfr!2sfr",
    category: {
      _type: 'reference',
      _ref: 'cat-aventures'
    }
  },

  // CATEGORY: INSOLITE (insolite)
  {
    _id: 'outing-evening-portaledge',
    _type: 'activity',
    title: {
      fr: 'Coucher de Soleil sur Portaledge',
      en: 'Sunset Cliffside Portaledge Evening'
    },
    slug: {
      _type: 'slug',
      current: 'evening-portaledge'
    },
    subtitle: {
      fr: "Vivez l'expérience inoubliable d'un apéritif suspendu au milieu des falaises géantes du Verdon.",
      en: "Live the unforgettable experience of an aperitif suspended in the middle of Verdon's giant cliffs."
    },
    description: {
      fr: "Installez-vous confortablement sur un portaledge (plateforme de camping de paroi suspendue sur corde) à plus de 150 mètres au-dessus du vide pour savourer un apéritif dînatoire face au coucher de soleil. Une expérience insolite à couper le souffle où le temps semble s'arrêter. Guidé et sécurisé en permanence par un moniteur professionnel, vous découvrirez des sensations de verticalité uniques en toute sécurité, confortablement assis avec une vue panoramique imprenable sur le grand canyon.",
      en: "Settle comfortably onto a portaledge (suspended cliff-camping platform) over 150 meters above the void to enjoy an aperitif dinner facing the setting sun. A breathtaking unusual experience where time stands still. Constantly guided and secured by a professional instructor, you will discover unique feelings of height in absolute safety, comfortably seated with a panoramic view of the great canyon."
    },
    price: 120,
    minAge: 12,
    duration: '3h30',
    approachTime: '10 min',
    returnTime: '10 min',
    obstacles: {
      fr: "Accès en rappel de 10m à 20m pour rejoindre la plateforme, suspension et confort en baudrier de paroi.",
      en: "Abseil access of 10m to 20m to reach the platform, suspension and comfort in a wall harness."
    },
    provided: {
      fr: ["Portaledge haut de gamme double ou triple", "Baudrier grand confort de paroi", "Matériel de sécurité individuel", "Apéritif complet à base de produits locaux du terroir", "Encadrement personnalisé par un guide"],
      en: ["High-end double or triple portaledge", "High-comfort big-wall harness", "Individual safety gear", "Full aperitif with local terroir products", "Personal guiding by a certified instructor"]
    },
    toBring: {
      fr: ["Veste chaude (type doudoune ou coupe-vent car les soirées peuvent être fraîches)", "Pantalons longs confortables", "Chaussures fermées", "Appareil photo sécurisé avec dragonne"],
      en: ["Warm jacket (down jacket or windbreaker as evenings can get cool)", "Comfortable long trousers", "Closed-toe shoes", "Camera or smartphone secured with a lanyard"]
    },
    included: {
      fr: ["Matériel technique et de confort", "Apéritif dinatoire (boissons locales et planches de spécialités)", "Encadrement professionnel privé", "Assurance RC Pro"],
      en: ["Technical and comfort equipment", "Aperitif dinner (local drinks and specialty platters)", "Private professional guiding", "Professional Liability Insurance"]
    },
    requirements: {
      fr: ["Aucune expérience en escalade nécessaire", "Ne pas souffrir d'un vertige paralysant", "Poids maximum par portaledge : 220kg"],
      en: ["No prior climbing experience required", "No paralyzing fear of heights", "Maximum weight per portaledge: 220kg"]
    },
    meetingPoint: "Belvédère de la Carelle (Route des Crêtes), La Palud-sur-Verdon",
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.7925151740924!2d6.368525376742051!3d43.778606044738596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c26fa347895e69%3A0xe54d6ea4f23253b!2sFalaise%20de%20la%20Carelle!5e0!3m2!1sfr!2sfr!4v1715800000002!5m2!1sfr!2sfr",
    category: {
      _type: 'reference',
      _ref: 'cat-insolite'
    }
  },
  {
    _id: 'outing-carelle',
    _type: 'activity',
    title: {
      fr: 'Sensations Verticales à la Carelle',
      en: 'Vertical Thrills at La Carelle Cliff'
    },
    slug: {
      _type: 'slug',
      current: 'carelle'
    },
    subtitle: {
      fr: "Une initiation au rappel géant et à la verticalité sur la falaise la plus mythique du Verdon.",
      en: "An initiation to giant abseiling and height on the most legendary cliff of the Verdon."
    },
    description: {
      fr: "La falaise de la Carelle est le temple historique de l'escalade dans le Verdon. Ce parcours insolite vous propose une immersion totale au cœur du vide sans avoir besoin d'être un grimpeur chevronné. Après une initiation aux techniques de descente, vous vous élancerez pour des rappels vertigineux de plus de 40 mètres plein gaz, suspendu entre ciel et terre. C'est l'activité parfaite pour dompter son appréhension du vide et faire le plein d'adrénaline dans un cadre absolument majestueux.",
      en: "La Carelle cliff is the historical temple of climbing in the Verdon. This unusual adventure offers you total immersion in the heart of the void without needing to be an experienced climber. After an initiation to descent techniques, you will embark on spectacular vertical abseils of over 40 meters, suspended between sky and earth. It is the perfect activity to master your fear of heights and fill up on adrenaline in an absolutely majestic setting."
    },
    price: 55,
    minAge: 10,
    duration: '3h',
    approachTime: '5 min',
    returnTime: '10 min',
    obstacles: {
      fr: "Rappels successifs verticaux de 20m à 45m plein gaz (fil d'araignée), passages aériens en falaise.",
      en: "Successive vertical abseils of 20m to 45m (free-hanging), high-exposure cliff sections."
    },
    provided: {
      fr: ["Baudrier d'escalade", "Casque", "Système de descente autofreinant (sécurité maximale)", "Encadrement rapproché par un moniteur diplômé d'État"],
      en: ["Climbing harness", "Helmet", "Self-braking abseil device (maximum safety)", "Close supervision by a certified State instructor"]
    },
    toBring: {
      fr: ["Baskets fermées avec une bonne semelle", "Vêtements de sport souples", "Crème solaire et lunettes de soleil", "Eau (1L par personne)"],
      en: ["Closed-toe athletic shoes with good grip", "Flexible athletic wear", "Sunscreen and sunglasses", "Water (1L per person)"]
    },
    included: {
      fr: ["Prêt du matériel technique", "Encadrement personnalisé", "Assurance RC Professionnelle"],
      en: ["Loan of technical equipment", "Personalized guiding", "Professional RC Insurance"]
    },
    requirements: {
      fr: ["Accessible aux débutants", "Condition physique normale", "Pas de contre-indication médicale à la hauteur"],
      en: ["Beginner-friendly", "Normal physical fitness", "No medical contraindications regarding heights"]
    },
    meetingPoint: "Belvédère de la Carelle (Route des Crêtes), La Palud-sur-Verdon",
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.7925151740924!2d6.368525376742051!3d43.778606044738596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c26fa347895e69%3A0xe54d6ea4f23253b!2sFalaise%20de%20la%20Carelle!5e0!3m2!1sfr!2sfr!4v1715800000002!5m2!1sfr!2sfr",
    category: {
      _type: 'reference',
      _ref: 'cat-insolite'
    }
  },
  {
    _id: 'outing-night-portaledge',
    _type: 'activity',
    title: {
      fr: 'Une Nuit Suspendue en Portaledge',
      en: 'An Overnight Cliffside Portaledge Stay'
    },
    slug: {
      _type: 'slug',
      current: 'night-portaledge'
    },
    subtitle: {
      fr: "Dormez à la belle étoile suspendu sur une falaise vertigineuse. Une nuit inoubliable.",
      en: "Sleep under the stars suspended on a dizzying cliff. An unforgettable night."
    },
    description: {
      fr: "L'aventure ultime par excellence : passer une nuit complète suspendu à flanc de falaise dans les Gorges du Verdon. Confortablement allongé sur un portaledge, vous vous endormirez sous la voie lactée avec le murmure lointain de la rivière 200 mètres plus bas, et vous vous réveillerez aux premières lueurs de l'aube face à un panorama grandiose. Encadré par un guide de haute montagne expert qui bivouaque à proximité immédiate pour assurer une sécurité absolue, cette expérience hors du commun restera gravée à vie dans votre mémoire.",
      en: "The ultimate adventure: spend a full night suspended on a sheer cliffside in the Verdon Gorges. Comfortably lying down on a portaledge, you will fall asleep under the Milky Way with the distant murmur of the river 200 meters below, and wake up to the first light of dawn facing a grand panorama. Guided by an expert mountain guide bivouacking close by to ensure absolute safety, this extraordinary experience will stay with you forever."
    },
    price: 250,
    minAge: 16,
    duration: '15h (18h à 9h)',
    approachTime: '15 min',
    returnTime: '15 min',
    obstacles: {
      fr: "Descente en rappel de nuit, installation et nuit en suspension complète dans le vide sur portaledge sécurisé.",
      en: "Abseil descent at dusk, setup and full overnight suspension in the void on a secured portaledge."
    },
    provided: {
      fr: ["Portaledge grand modèle double de paroi", "Matériel de couchage grand froid (duvet grand confort, matelas gonflable)", "Harnais de sécurité de nuit et longes", "Repas du soir traditionnel et petit-déjeuner complet", "Présence continue du guide de haute montagne"],
      en: ["Large-model double wall portaledge", "Cold-weather sleeping gear (high-comfort down sleeping bag, inflatable pad)", "Night safety harness and lanyards", "Traditional evening meal and full breakfast", "Continuous presence of the expert mountain guide close by"]
    },
    toBring: {
      fr: ["Vêtements très chauds (doudoune, polaire, bonnet, gants)", "Lampe frontale avec piles neuves", "Appareil photo ou téléphone sécurisé", "Nécessaire de toilette minimal", "Brosse à dents et bouteille d'eau"],
      en: ["Very warm clothing (down jacket, fleece, beanie, gloves)", "Headlamp with fresh batteries", "Secured phone or camera", "Minimal toiletry kit", "Toothbrush and bottle of water"]
    },
    included: {
      fr: ["Bivouac complet et repas", "Encadrement privé exclusif par un guide diplômé d'État", "Tout le matériel de sécurité de pointe"],
      en: ["Full overnight gear and meals", "Exclusive private guiding by a State-certified mountain guide", "All cutting-edge safety equipment"]
    },
    requirements: {
      fr: ["Bonne condition physique et mentale", "Ne pas souffrir de vertige handicapant", "Âge minimum 16 ans"],
      en: ["Good physical and mental condition", "No disabling fear of heights", "Minimum age 16"]
    },
    meetingPoint: "Belvédère de la Carelle (Route des Crêtes), La Palud-sur-Verdon",
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.7925151740924!2d6.368525376742051!3d43.778606044738596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c26fa347895e69%3A0xe54d6ea4f23253b!2sFalaise%20de%20la%20Carelle!5e0!3m2!1sfr!2sfr!4v1715800000002!5m2!1sfr!2sfr",
    category: {
      _type: 'reference',
      _ref: 'cat-insolite'
    }
  }
];

async function seed() {
  console.log("Starting seedMoreOutings script...");
  try {
    // 1. Double check / Create 'insolite' category to prevent any reference error
    const insoliteCategory = {
      _id: 'cat-insolite',
      _type: 'category',
      title: {
        fr: 'Insolite',
        en: 'Unusual Activities'
      },
      slug: {
        _type: 'slug',
        current: 'insolite'
      }
    };
    console.log("Ensuring category 'cat-insolite' exists...");
    await client.createOrReplace(insoliteCategory);
    console.log("Category 'cat-insolite' successfully ensured!");

    // 2. Import all outings
    for (const outing of outings) {
      await client.createOrReplace(outing);
      console.log(`Successfully seeded outing: ${outing.title.fr} (${outing.slug.current})`);
    }
    console.log("Additional seeding complete!");
  } catch (err) {
    console.error("Seeding error:", err);
  }
}

seed();
