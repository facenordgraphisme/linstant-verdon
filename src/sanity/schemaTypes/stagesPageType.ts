import { defineField, defineType } from 'sanity';

export const stagesPageType = defineType({
  name: 'stagesPage',
  title: 'Page Stages & Week-ends',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la page',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'Anglais', type: 'string' },
      ],
    }),
    defineField({
      name: 'tagline',
      title: 'Slogan / Tagline',
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
      name: 'heroImage',
      title: 'Image principale (Hero)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'whereTitle',
      title: 'Titre de la section "Où ?"',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'Anglais', type: 'string' },
      ],
    }),
    defineField({
      name: 'whereText',
      title: 'Texte de la section "Où ?"',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'text' },
        { name: 'en', title: 'Anglais', type: 'text' },
      ],
    }),
    defineField({
      name: 'acroYogaTitle',
      title: 'Titre Acro-Yoga',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'Anglais', type: 'string' },
      ],
    }),
    defineField({
      name: 'acroYogaText',
      title: 'Texte Acro-Yoga',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'text' },
        { name: 'en', title: 'Anglais', type: 'text' },
      ],
    }),
    defineField({
      name: 'canyonTitle',
      title: 'Titre Canyoning',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'Anglais', type: 'string' },
      ],
    }),
    defineField({
      name: 'canyonText',
      title: 'Texte Canyoning',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'text' },
        { name: 'en', title: 'Anglais', type: 'text' },
      ],
    }),
    defineField({
      name: 'climbingTitle',
      title: 'Titre Escalade',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'en', title: 'Anglais', type: 'string' },
      ],
    }),
    defineField({
      name: 'climbingText',
      title: 'Texte Escalade',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'text' },
        { name: 'en', title: 'Anglais', type: 'text' },
      ],
    }),
    defineField({
      name: 'program3Days',
      title: 'Programme Formule 3 jours',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'programRow3Days',
          fields: [
            { name: 'day', title: 'Jour', type: 'string' },
            { name: 'morning', title: 'Matin', type: 'string' },
            { name: 'afternoon', title: 'Après-midi (1 avril - 31 octobre)', type: 'string' },
            { name: 'afternoonWinter', title: 'Après-midi (1 novembre - 31 mars)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'program7Days',
      title: 'Programme Formule 7 jours',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'programRow7Days',
          fields: [
            { name: 'day', title: 'Jour', type: 'string' },
            { name: 'morning', title: 'Matin (9H30 - 12H)', type: 'string' },
            { name: 'afternoon', title: 'Après-midi (13H30 - 16H)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'logisticsAccommodation',
      title: 'Hébergement / Prise en charge',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'text' },
        { name: 'en', title: 'Anglais', type: 'text' },
      ],
    }),
    defineField({
      name: 'logisticsGear',
      title: 'Prêt de matériel',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'text' },
        { name: 'en', title: 'Anglais', type: 'text' },
      ],
    }),
    defineField({
      name: 'logisticsTransport',
      title: 'Transport',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'text' },
        { name: 'en', title: 'Anglais', type: 'text' },
      ],
    }),
    defineField({
      name: 'toBring',
      title: 'À prévoir / apporter',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'array', of: [{ type: 'string' }] },
        { name: 'en', title: 'Anglais', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
    defineField({
      name: 'prices',
      title: 'Tarifs et inclusions',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'array', of: [{ type: 'string' }] },
        { name: 'en', title: 'Anglais', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie d\'images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: {
      titleFr: 'title.fr',
      titleEn: 'title.en',
      media: 'heroImage',
    },
    prepare(selection) {
      const { titleFr, titleEn, media } = selection;
      return {
        title: titleFr || titleEn || 'Configuration Page Stages',
        media,
      };
    },
  },
});
