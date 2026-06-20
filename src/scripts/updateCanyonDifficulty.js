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

const difficultyMappings = [
  {
    slug: 'balene-canyon-pitchoune',
    difficulty: {
      fr: 'Demi journée découverte en famille',
      en: 'Family discovery half day'
    }
  },
  {
    slug: 'bas-jabron-canyon-famille',
    difficulty: {
      fr: 'Demi journée découverte en famille',
      en: 'Family discovery half day'
    }
  },
  {
    slug: 'baudan-baou-canyon-famille',
    difficulty: {
      fr: 'Demi journée découverte en famille',
      en: 'Family discovery half day'
    }
  },
  {
    slug: 'couloir-samson-rando-aqua',
    difficulty: {
      fr: 'Demi journée découverte entre amis',
      en: 'Friends discovery half day'
    }
  },
  {
    slug: 'clue-d-artuby',
    difficulty: {
      fr: 'Demi journée découverte entre amis',
      en: 'Friends discovery half day'
    }
  },
  {
    slug: 'clue-de-st-auban',
    difficulty: {
      fr: 'Canyon demi-journée sportive',
      en: 'Sporty half day canyon'
    }
  },
  {
    slug: 'canyon-de-ferne',
    difficulty: {
      fr: 'Canyon journée sportive',
      en: 'Sporty full day canyon'
    }
  },
  {
    slug: 'canyon-estelie-imbut',
    difficulty: {
      fr: 'Canyon journée sportive',
      en: 'Sporty full day canyon'
    }
  }
];

async function run() {
  console.log('Fetching all activities to patch difficulties...');
  const activities = await client.fetch(`*[_type == "activity"]`);
  
  for (const activity of activities) {
    const slugVal = activity.slug?.current;
    const match = difficultyMappings.find(m => m.slug === slugVal);
    
    if (match) {
      console.log(`Patching activity: ${slugVal} with difficulty: "${match.difficulty.fr}"`);
      await client
        .patch(activity._id)
        .set({ difficultyGroup: match.difficulty })
        .commit();
    } else {
      // Fallbacks in case slug differs slightly
      if (slugVal && (slugVal.includes('balene') || slugVal.includes('pitchoune'))) {
        await client.patch(activity._id).set({ difficultyGroup: { fr: 'Demi journée découverte en famille', en: 'Family discovery half day' } }).commit();
      } else if (slugVal && slugVal.includes('jabron')) {
        await client.patch(activity._id).set({ difficultyGroup: { fr: 'Demi journée découverte en famille', en: 'Family discovery half day' } }).commit();
      } else if (slugVal && slugVal.includes('baudan')) {
        await client.patch(activity._id).set({ difficultyGroup: { fr: 'Demi journée découverte en famille', en: 'Family discovery half day' } }).commit();
      } else if (slugVal && (slugVal.includes('samson') || slugVal.includes('artuby'))) {
        await client.patch(activity._id).set({ difficultyGroup: { fr: 'Demi journée découverte entre amis', en: 'Friends discovery half day' } }).commit();
      } else if (slugVal && slugVal.includes('auban')) {
        await client.patch(activity._id).set({ difficultyGroup: { fr: 'Canyon demi-journée sportive', en: 'Sporty half day canyon' } }).commit();
      } else if (slugVal && (slugVal.includes('ferne') || slugVal.includes('imbut') || slugVal.includes('estelie'))) {
        await client.patch(activity._id).set({ difficultyGroup: { fr: 'Canyon journée sportive', en: 'Sporty full day canyon' } }).commit();
      }
    }
  }
  
  console.log('All activities patched successfully!');
}

run().catch(console.error);
