import { defineField, defineType } from 'sanity';

export const activityType = defineType({
  name: 'activity',
  title: 'Activité',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'Anglais', type: 'string' },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.fr' },
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre (ex: Demi-journée sportive)',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'Anglais', type: 'string' },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'text' },
        { name: 'en', title: 'Anglais', type: 'text' },
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'images',
      title: 'Galerie d\'images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Lien YouTube',
      type: 'url',
    }),
    defineField({
      name: 'price',
      title: 'Prix par personne (€)',
      type: 'number',
    }),
    defineField({
      name: 'priceDetails',
      title: 'Détails du tarif (ex: 1 à 3 pers: 200€ / 4 à 8 pers: 250€)',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'Anglais', type: 'string' },
      ],
    }),
    defineField({
      name: 'showStartingFrom',
      title: "Afficher 'À partir de' devant le prix dans la boîte latérale",
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'minAge',
      title: 'Âge minimum',
      type: 'number',
    }),
    defineField({
      name: 'duration',
      title: 'Durée totale',
      type: 'string',
    }),
    defineField({
      name: 'approachTime',
      title: 'Marche d\'approche',
      type: 'string',
    }),
    defineField({
      name: 'returnTime',
      title: 'Marche de retour',
      type: 'string',
    }),
    defineField({
      name: 'obstacles',
      title: 'Obstacles (Sauts, Rappels, etc.)',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'text' },
        { name: 'en', title: 'Anglais', type: 'text' },
      ],
    }),
    defineField({
      name: 'meetingPoint',
      title: 'Point de rendez-vous',
      type: 'string',
    }),
    defineField({
      name: 'included',
      title: 'Ce qui est inclus',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'array', of: [{ type: 'string' }] },
        { name: 'en', title: 'Anglais', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
    defineField({
      name: 'requirements',
      title: 'Pré-requis',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'array', of: [{ type: 'string' }] },
        { name: 'en', title: 'Anglais', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
    defineField({
      name: 'provided',
      title: 'Matériel fourni (Nous fournissons)',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'array', of: [{ type: 'string' }] },
        { name: 'en', title: 'Anglais', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
    defineField({
      name: 'toBring',
      title: 'Matériel à apporter (Vous devez apporter)',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'array', of: [{ type: 'string' }] },
        { name: 'en', title: 'Anglais', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'URL Google Maps (Embed)',
      type: 'string',
    }),
    defineField({
      name: 'difficultyGroup',
      title: 'Groupe de difficulté / Catégorie (Optionnel)',
      description: 'Permet de classer l\'activité sous un sous-titre de niveau sur la page catégorie (ex: "Demi journée découverte en famille").',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'Anglais', type: 'string' },
      ],
    }),
  ],
  preview: {
    select: {
      titleFr: 'title.fr',
      titleEn: 'title.en',
      duration: 'duration',
      media: 'mainImage',
    },
    prepare(selection) {
      const { titleFr, titleEn, duration } = selection;
      return {
        title: titleFr || titleEn || 'Sans titre',
        subtitle: duration ? `Durée : ${duration}` : '',
        media: selection.media,
      };
    },
  },
});
