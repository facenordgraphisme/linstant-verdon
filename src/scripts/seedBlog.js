const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function uploadImage(localPath) {
  const filePath = path.resolve(localPath);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return null;
  }
  try {
    console.log(`Uploading ${path.basename(filePath)} to Sanity...`);
    const stream = fs.createReadStream(filePath);
    const asset = await client.assets.upload('image', stream, {
      filename: path.basename(filePath),
    });
    console.log(`Successfully uploaded! Asset ID: ${asset._id}`);
    return asset;
  } catch (err) {
    console.error(`Failed to upload ${filePath}:`, err.message);
    return null;
  }
}

async function seed() {
  console.log('Starting blog seeding script...');

  // Upload main images
  const summerImageAsset = await uploadImage('public/assets/canyon/canyon.jpeg');
  const springImageAsset = await uploadImage('public/assets/escalade/climbing.jpeg');

  const posts = [
    {
      _id: 'blog-3-activites-verdon-ete',
      _type: 'post',
      title: {
        fr: 'Les 3 activités à faire dans le Verdon cet été avec l’Instant Verdon',
        en: 'The 3 Activities to Do in the Verdon This Summer with l’Instant Verdon'
      },
      slug: {
        _type: 'slug',
        current: '3-activites-verdon-ete'
      },
      publishedAt: new Date('2026-05-15T08:00:00.000Z').toISOString(),
      description: {
        fr: 'Emma et Angèle partagent trois idées de sorties estivales entre rando aquatique, parcours aventure et canyon sportif.',
        en: 'Emma and Angèle share three ideas for summer outings: water trekking, adventure courses, and sports canyons.'
      },
      mainImage: summerImageAsset ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: summerImageAsset._id
        }
      } : undefined,
      content: {
        fr: `Emma et Angèle vous conseillent trois activités à faire dans le Verdon cet été avec L’Instant Verdon.

## La randonnée aquatique du couloir Samson
Tout le monde veut voir le Point Sublime, mais le mieux, c’est d’être au cœur de celui-ci. Venez nager dans les eaux turquoise du Verdon, au centre du canyon, avec ses parois de 300 mètres de part et d’autre de la rivière.

Le départ se situe ici : [Google Maps](https://maps.app.goo.gl/nL2LL8bDrWZEHhku5).

[Plus d’information](https://linstantverdon.com/fr/canyon/samson/)

## Le parcours aventure du Trou du Renard
La légende raconte qu’on pouvait y voir un renard. Quoi de mieux que d’y aller en fin de journée pour espérer l’apercevoir et profiter des couleurs du coucher de soleil ainsi que des températures plus fraîches.

Jetez un œil à la vidéo sur notre site internet : [Trou du Renard](https://linstantverdon.com/fr/adventure/trou-du-renard/).

[Plus d’information](https://linstantverdon.com/fr/adventure/trou-du-renard/)

## Le canyon du Saint-Auban
Sportif et aquatique, c’est le canyon le plus « complet » de la région. En chemin, vous pourrez vous arrêter afin d’acheter des victuailles locales et traditionnelles de qualité chez [La Gardoise](https://www.facebook.com/people/La-Gardoise-04120/61558844774696/).

[Plus d’information](https://linstantverdon.com/fr/canyon/st-auban/)

## Envie de découvrir d'autres activités ?
Si vous souhaitez plus d'informations, découvrir d'autres activités ou vérifier les prochains départs disponibles, contactez-nous directement ou consultez notre plateforme de réservation en ligne.

[Nous appeler](tel:+33689855381)  
[Voir les départs disponibles](https://app.book-adventure.fr/public/booking/65eb5a8dfb9e3e414973b8b0)`,
        en: `Emma and Angèle advise you on three activities to do in the Verdon this summer with L'Instant Verdon.

## Water trekking of the Samson Corridor
Everyone wants to see the Point Sublime, but the best way is to be in the heart of it. Come swim in the turquoise waters of the Verdon, in the center of the canyon, with its 300-meter cliffs on either side of the river.

The departure is located here: [Google Maps](https://maps.app.goo.gl/nL2LL8bDrWZEHhku5).

[More information](https://linstantverdon.com/fr/canyon/samson/)

## The adventure course of Trou du Renard
Legend has it that a fox could be seen there. What could be better than going there at the end of the day to hope to catch a glimpse of it and enjoy the colors of the sunset as well as the cooler temperatures.

Take a look at the video on our website: [Trou du Renard](https://linstantverdon.com/fr/adventure/trou-du-renard/).

[More information](https://linstantverdon.com/fr/adventure/trou-du-renard/)

## The Saint-Auban canyon
Sporty and aquatic, it is the most "complete" canyon in the region. On the way, you can stop to buy quality traditional local foodstuffs at [La Gardoise](https://www.facebook.com/people/La-Gardoise-04120/61558844774696/).

[More information](https://linstantverdon.com/fr/canyon/st-auban/)

## Want to discover other activities?
If you want more information, discover other activities or check the next available departures, contact us directly or consult our online booking platform.

[Call us](tel:+33689855381)  
[See available departures](https://app.book-adventure.fr/public/booking/65eb5a8dfb9e3e414973b8b0)`
      }
    },
    {
      _id: 'blog-3-activites-verdon-printemps',
      _type: 'post',
      title: {
        fr: 'Les 3 activités à faire dans le Verdon ce printemps avec l’Instant Verdon',
        en: 'The 3 Activities to Do in the Verdon This Spring with l’Instant Verdon'
      },
      slug: {
        _type: 'slug',
        current: '3-activites-verdon-printemps'
      },
      publishedAt: new Date('2026-04-10T09:00:00.000Z').toISOString(),
      description: {
        fr: 'Emma et Angèle partagent trois idées de sorties printanières entre canyon éphémère, canyon sec et escalade sur la route des crêtes.',
        en: 'Emma and Angèle share three ideas for spring outings: ephemeral canyons, dry canyons, and climbing on the Route des Crêtes.'
      },
      mainImage: springImageAsset ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: springImageAsset._id
        }
      } : undefined,
      content: {
        fr: `Emma et Angèle vous conseillent trois activités à faire dans le Verdon ce printemps avec L’Instant Verdon.

## Le Bas Jabron
Le Bas Jabron coule seulement au printemps. C’est un canyon éphémère à faire absolument avant l’été. Il faut profiter de son eau plutôt chaude pour la saison et de ses biefs sculptés. C’est aussi un canyon peu fréquenté du fait de sa temporalité originale.

En plus, vous êtes proches de Trigance, un magnifique village avec son Château du Soleil. Le site du village de Trigance domine la vallée du Jabron et est inscrit parmi les « sites remarquables » selon [Wikipedia](https://fr.wikipedia.org/wiki/Trigance).

[Plus d’information](https://linstantverdon.com/fr/canyon/bas-jabron/)

## Le canyon sec de Main-morte
Avec les températures du printemps, l’eau des canyons peut encore être fraîche. Le canyon sec de Main-morte permet donc d’allier aventure et nature sans trop se mouiller. En avril, ne te découvre pas d’un fil.

Cette sortie est vertigineuse. Il ne faut pas avoir peur du vide car on domine le Verdon qui se trouve à 100 mètres en dessous de nous. Vous pouvez aussi regarder la vidéo du canyon en eau, ce qui arrive très rarement : [YouTube](https://www.youtube.com/watch?v=PTR_glJXs_o).

[Plus d’information](https://linstantverdon.com/fr/adventure/mainmorte-sec/)

## L’escalade en moulinette au-dessus du belvédère de la Carelle
L’escalade en moulinette au-dessus du belvédère de la Carelle se pratique sur la fameuse route des crêtes. La plupart des gens font la route des crêtes en vélo électrique avec notre partenaire [VerdonEBike](https://verdonebike.com/).

Cette activité est réservée aux grimpeurs. Si vous avez l’habitude de grimper en salle, osez. Il ne vous manque plus qu’à enfiler un baudrier, un casque et des chaussons. Attaché à une corde, vos mouvements seront d’autant plus agréables et vous pourrez connaître cette sensation de flow. Vous pourrez aussi observer les vautours.

[Plus d’information](https://linstantverdon.com/fr/unusual-activities/half-day-carelle/)

## Envie de découvrir d'autres activités ?
Si vous souhaitez plus d'informations, découvrir d'autres activités ou vérifier les prochains départs disponibles, contactez-nous directement ou consultez notre plateforme de réservation en ligne.

[Nous appeler](tel:+33689855381)  
[Voir les départs disponibles](https://app.book-adventure.fr/public/booking/65eb5a8dfb9e3e414973b8b0)`,
        en: `Emma and Angèle advise you on three activities to do in the Verdon this spring with L'Instant Verdon.

## The Bas Jabron
The Bas Jabron flows only in spring. It is an ephemeral canyon that is a must-do before summer. You must enjoy its water, which is rather warm for the season, and its sculpted pools. It is also a canyon that is not very busy due to its original seasonality.

In addition, you are close to Trigance, a beautiful village with its Château du Soleil. The site of the village of Trigance dominates the Jabron valley and is listed among the "remarkable sites" according to [Wikipedia](https://en.wikipedia.org/wiki/Trigance).

[More information](https://linstantverdon.com/fr/canyon/bas-jabron/)

## The dry canyon of Main-morte
With the spring temperatures, the canyon water can still be cool. The dry canyon of Main-morte allows you to combine adventure and nature without getting too wet.

This outing is dizzying. You shouldn't be afraid of heights because we dominate the Verdon which is 100 meters below us. You can also watch the video of the canyon with flowing water, which happens very rarely: [YouTube](https://www.youtube.com/watch?v=PTR_glJXs_o).

[More information](https://linstantverdon.com/fr/adventure/mainmorte-sec/)

## Top-rope climbing above the Carelle viewpoint
Top-rope climbing above the Carelle viewpoint is practiced on the famous Route des Crêtes. Most people do the Route des Crêtes by electric bike with our partner [VerdonEBike](https://verdonebike.com/).

This activity is reserved for climbers. If you are used to indoor climbing, dare to try! All you need to do is put on a harness, a helmet, and climbing shoes. Tied to a rope, your movements will be all the more pleasant, and you can experience that wonderful flow state. You can also observe the vultures.

[More information](https://linstantverdon.com/fr/unusual-activities/half-day-carelle/)

## Want to discover other activities?
If you want more information, discover other activities or check the next available departures, contact us directly or consult our online booking platform.

[Call us](tel:+33689855381)  
[See available departures](https://app.book-adventure.fr/public/booking/65eb5a8dfb9e3e414973b8b0)`
      }
    }
  ];

  for (const post of posts) {
    try {
      console.log(`Seeding post: ${post.title.fr}...`);
      await client.createOrReplace(post);
      console.log(`Seeding of ${post.title.fr} successful!`);
    } catch (err) {
      console.error(`Failed to seed ${post.title.fr}:`, err.message);
    }
  }

  console.log('Seeding process completed!');
}

seed();
