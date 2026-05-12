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
    const types = await client.fetch('*[0...100]{_type}');
    const uniqueTypes = [...new Set(types.map(t => t._type))];
    console.log('Unique types in Sanity:', uniqueTypes);
  } catch (err) {
    console.error('Error fetching types:', err.message);
  }
}

checkTypes();
