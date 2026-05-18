const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function checkTypes() {
  try {
    const categories = await client.fetch('*[_type == "category"]{_id, title, slug}');
    console.log('Categories in Sanity:', JSON.stringify(categories, null, 2));
    
    const activities = await client.fetch('*[_type == "activity"]{_id, title, slug, category->{slug}}');
    console.log('Activities in Sanity:', JSON.stringify(activities, null, 2));
  } catch (err) {
    console.error('Error fetching data:', err.message);
  }
}

checkTypes();
