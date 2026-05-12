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
  ],
});
