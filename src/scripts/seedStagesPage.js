const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');

dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'h48oam2s',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-05-01',
  token: process.env.SANITY_API_TOKEN
});

async function run() {
  console.log('Fetching existing image assets to populate the gallery...');
  const images = await client.fetch(`*[_type == "sanity.imageAsset"][0..5]`);
  
  const galleryRefs = images.map(img => ({
    _type: 'image',
    _key: img._id,
    asset: {
      _type: 'reference',
      ref: img._id
    }
  }));

  const heroImageAsset = images[0] ? {
    _type: 'image',
    asset: {
      _type: 'reference',
      ref: images[0]._id
    }
  } : undefined;

  const doc = {
    _id: 'stages-page-config',
    _type: 'stagesPage',
    title: {
      fr: 'Stage Multi-Activités : Acro-Yoga, Escalade et Canyoning',
      en: 'Multi-Activity Camp: Acro-Yoga, Climbing and Canyoning'
    },
    tagline: {
      fr: 'Nature sauvage, sensation forte, partez a l’aventure',
      en: 'Wild nature, strong sensations, go on an adventure'
    },
    description: {
      fr: 'Venez vivre une expérience inoubliable au cœur de la nature avec notre stage multi-activités alliant acro-yoga, escalade et canyoning. Ce stage est conçu pour les passionnés de sensations fortes et de bien-être, quel que soit votre niveau. Que vous soyez débutant ou expérimenté, vous trouverez votre place dans cette aventure unique au sein d’une nature sauvage.',
      en: 'Come live an unforgettable experience in the heart of nature with our multi-activity course combining acro-yoga, climbing and canyoning. This course is designed for thrill and well-being enthusiasts, whatever your level. Whether you are a beginner or experienced, you will find your place in this unique adventure within a wild nature.'
    },
    heroImage: heroImageAsset,
    whereTitle: {
      fr: 'Où ?',
      en: 'Where?'
    },
    whereText: {
      fr: 'Le stage se déroule dans le cadre magnifique du Parc Naturel Régional des Gorges du Verdon, un lieu réputé pour ses paysages à couper le souffle et ses activités de plein air. Vous serez immergé dans un environnement naturel exceptionnel, propice à l\'aventure et à la détente.',
      en: 'The course takes place in the magnificent setting of the Verdon Regional Natural Park, a place famous for its breathtaking landscapes and outdoor activities. You will be immersed in an exceptional natural environment, conducive to adventure and relaxation.'
    },
    acroYogaTitle: {
      fr: 'Acro Yoga',
      en: 'Acro Yoga'
    },
    acroYogaText: {
      fr: 'Cette activité est une discipline sportive et poétique qui mélange le yoga, l’acrobatie et le cirque. Ce sport se pratique à plusieurs. Les aspects intéressants de cette activité sont la concentration et la confiance en soi et en l’autre, mais aussi l’équilibre, les postures, les mouvements, le partage, le fun, et l’entraide ! Lors des stages vous aurez le plaisir de vous initiez aux washings machines, à l’icarianne et aux whips pop… Nous pouvons adapter la pratique à chaque niveau de débutant à intermédiaire avancé.',
      en: 'This activity is a sporty and poetic discipline that mixes yoga, acrobatics and circus. This sport is practiced in groups. The interesting aspects of this activity are concentration and trust in oneself and in the other, but also balance, postures, movements, sharing, fun, and mutual aid! During the courses you will have the pleasure of initiating yourselves to washing machines, icarian and whips pop… We can adapt the practice to each level from beginner to advanced intermediate.'
    },
    canyonTitle: {
      fr: 'Canyon',
      en: 'Canyoning'
    },
    canyonText: {
      fr: 'Le canyoning est un sport de pleine nature, il consiste à descendre un cours d’eau. Vous y trouverez différentes techniques dictées par le relief du canyon. Aussi bien en marchant, nageant, sautant qu’en descendant en rappel, il s’agira de franchir chaque obstacle rencontré en toute sécurité. Cette discipline permet d’explorer des paysages naturels, spectaculaires souvent inaccessible par d’autres moyen.\nLors des stages vous découvrirez plusieurs canyons comme le majestueux Couloir Samson et le canyon du Baudan-Baou en demie journée découverte. Cela permet de développer le sens de l’aventure, la connaissance de son corps dans un milieu aquatique, de contempler des paysages sauvages, et vivifier vos muscles dans l’eau fraîche des cours d’eau.',
      en: 'Canyoning is an outdoor sport, consisting of going down a watercourse. You will find different techniques dictated by the relief of the canyon. Whether walking, swimming, jumping or abseiling, it will be a matter of crossing each obstacle encountered in complete safety. This discipline allows you to explore natural, spectacular landscapes that are often inaccessible by other means.\nDuring the courses you will discover several canyons like the majestic Couloir Samson and the Baudan-Baou canyon in a half-day discovery. This helps develop a sense of adventure, body awareness in an aquatic environment, contemplation of wild landscapes, and tone your muscles in the cool water of the streams.'
    },
    climbingTitle: {
      fr: 'L\'escalade',
      en: 'Climbing'
    },
    climbingText: {
      fr: 'Les Gorges du Verdon sont réputées mondialement pour ses voies d’exceptions. De la falaise d’initiation aux grandes voies de tous niveaux, l’ambiance sera au rendez-vous dans un décor vertigineux.\nLors des stages vous irez pratiquer ce sport de pleine nature sur le belvédère de la route des crêtes avec l’ambiance Verdonesque. Vous pourrez également vous perfectionner en falaise, ça sera l’occasion d’apprendre les manipulations de corde. Cette activité est tout autant physique (équilibre et placement) que mental (confiance en soi) et elle suscite de belles émotions avec ses compagnons de cordées (moment de partage).',
      en: 'The Verdon Gorges are world famous for their exceptional routes. From initiation cliffs to multi-pitch climbs of all levels, the atmosphere will be there in a vertiginous setting.\nDuring the courses you will practice this outdoor sport on the belvedere of the route des crêtes with the Verdon atmosphere. You can also progress in single-pitch cliffs, it will be the opportunity to learn rope work. This activity is as much physical (balance and placement) as mental (self-confidence) and it creates beautiful emotions with climbing partners (moment of sharing).'
    },
    program3Days: [
      { _key: 'row1', day: '1', morning: 'Acro Yoga', afternoon: 'L\'escalade', afternoonWinter: 'L\'escalade' },
      { _key: 'row2', day: '2', morning: 'Acro Yoga', afternoon: 'Canyon', afternoonWinter: 'Via Corda' },
      { _key: 'row3', day: '3', morning: 'Acro Yoga', afternoon: 'Via Corda', afternoonWinter: 'L\'escalade' }
    ],
    program7Days: [
      { _key: 'row1', day: '1', morning: 'Acro Yoga', afternoon: 'Canyon' },
      { _key: 'row2', day: '2', morning: 'Acro Yoga', afternoon: 'L\'escalade' },
      { _key: 'row3', day: '3', morning: 'Acro Yoga', afternoon: 'Canyon' },
      { _key: 'row4', day: '4', morning: 'Yoga (9h30 - 10h30)', afternoon: 'OFF' },
      { _key: 'row5', day: '5', morning: 'Acro Yoga', afternoon: 'L\'escalade' },
      { _key: 'row6', day: '6', morning: 'Canyon', afternoon: 'Acro Yoga et surprise le soir!' },
      { _key: 'row7', day: '7', morning: 'Yoga', afternoon: 'Acro Yoga et JAM, débrief' }
    ],
    logisticsAccommodation: {
      fr: 'Nous nous occupons uniquement des activités sportives. L\'hébergement est à votre charge, mais nous pouvons vous renseigner sur les hôtels, gîtes et campings à proximité. La restauration est également à votre charge, et nous serons ravis de vous recommander de bonnes adresses !',
      en: 'We only take care of sports activities. Accommodation is at your expense, but we can inform you about hotels, cottages and campsites nearby. Dining is also at your expense, and we will be delighted to recommend good addresses!'
    },
    logisticsGear: {
      fr: 'Nous mettons à votre disposition un équipement de qualité pour le canyoning et l\'escalade. Bien que nous puissions vous prêter des chaussons d\'escalade, nous vous conseillons d\'apporter les vôtres pour un meilleur confort. Pour l\'acro-yoga, des tatamis et un espace ombragé seront disponibles.',
      en: 'We provide you with quality equipment for canyoning and climbing. Although we can lend you climbing shoes, we advise you to bring your own for better comfort. For acro-yoga, tatami mats and a shaded area will be available.'
    },
    logisticsTransport: {
      fr: 'Le transport de votre domicile à l\'Instant Verdon n\'est pas inclus. Vous devrez nous rejoindre au point de rendez-vous par vos propres moyens. Pour accéder aux différentes activités, nous utiliserons le minibus de l\'Instant Verdon, mais il se peut que nous ayons également besoin de vos véhicules.',
      en: 'Transport from your home to l\'Instant Verdon is not included. You will have to join us at the meeting point by your own means. To access the different activities, we will use the l\'Instant Verdon minibus, but we may also need your vehicles.'
    },
    toBring: {
      fr: [
        'Une tenue adaptée en fonction de l\'activité (vêtements souples, baskets...)',
        'Une bouteille d\'eau',
        'Le logement',
        'Les piques niques'
      ],
      en: [
        'A suitable outfit depending on the activity (flexible clothing, sneakers...)',
        'A bottle of water',
        'Accommodation',
        'Picnic lunches'
      ]
    },
    prices: {
      fr: [
        '280 euros pour les trois jours (245 euros pour les early bird).',
        '470 euros pour la semaine (430 euros pour les early bird).',
        'Ces tarifs comprennent l\'encadrement des activités :',
        'Le canyoning',
        'L\'escalade',
        'Les cours d\'acro-yoga',
        'Les cours de yoga',
        'Toutes les séances sont encadrées par des professionnels diplômés.'
      ],
      en: [
        '280 euros for three days (245 euros for early birds).',
        '470 euros for the week (430 euros for early birds).',
        'These rates include guiding of activities:',
        'Canyoning',
        'Climbing',
        'Acro-yoga classes',
        'Yoga classes',
        'All sessions are supervised by certified professionals.'
      ]
    },
    gallery: galleryRefs
  };

  console.log('Writing stagesPage document to Sanity...');
  await client.createOrReplace(doc);
  console.log('Stages page seeded successfully!');
}

run().catch(console.error);
