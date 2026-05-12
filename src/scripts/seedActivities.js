const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const activities = [
  {
    _type: 'activity',
    _id: 'activity-clue-du-haut-jabron',
    title: { fr: 'Clue du Haut Jabron', en: 'Haut Jabron Canyon' },
    slug: { _type: 'slug', current: 'clue-du-haut-jabron' },
    category: { _type: 'reference', _ref: 'cat-canyoning' },
    subtitle: { fr: 'Initiation parfaite', en: 'Perfect initiation' },
    description: { 
      fr: 'Un magnifique canyon idéal pour découvrir le canyoning. Sauts, toboggans et descentes en rappel dans un cadre sauvage.',
      en: 'A beautiful canyon ideal for discovering canyoning. Jumps, slides and abseiling in a wild setting.'
    },
    price: 45,
    minAge: 8,
    duration: '2h30',
    approachTime: '5 min',
    returnTime: '15 min',
    meetingPoint: 'Castellane',
  }
];

async function seedActivities() {
  console.log('Seeding activities...');
  for (const act of activities) {
    try {
      await client.createIfNotExists(act);
      console.log(`Created activity: ${act.title.fr}`);
    } catch (err) {
      console.error(`Error creating activity ${act.title.fr}:`, err.message);
    }
  }
  console.log('Seeding complete!');
}

seedActivities();
