const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const categories = [
  { _type: 'category', title: { fr: 'Canyoning', en: 'Canyoning' }, slug: { _type: 'slug', current: 'canyoning' } },
  { _type: 'category', title: { fr: 'Aqua Rando', en: 'Water Trekking' }, slug: { _type: 'slug', current: 'aquarando' } },
  { _type: 'category', title: { fr: 'Escalade', en: 'Climbing' }, slug: { _type: 'slug', current: 'climbing' } },
  { _type: 'category', title: { fr: 'Aventures', en: 'Adventures' }, slug: { _type: 'slug', current: 'aventures' } },
  { _type: 'category', title: { fr: 'Week-ends & Stages', en: 'Weekends & Trips' }, slug: { _type: 'slug', current: 'weekend' } },
];

async function seed() {
  console.log('Seeding categories...');
  for (const cat of categories) {
    try {
      await client.createIfNotExists({ _id: `cat-${cat.slug.current}`, ...cat });
      console.log(`Created category: ${cat.title.fr}`);
    } catch (err) {
      console.error(`Error creating category ${cat.title.fr}:`, err.message);
    }
  }
  console.log('Seeding complete!');
}

seed();
