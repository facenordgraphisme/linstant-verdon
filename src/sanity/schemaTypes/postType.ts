import { defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Article de Blog',
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
      options: {
        source: 'title.fr',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publié le',
      type: 'datetime',
    }),
    defineField({
      name: 'description',
      title: 'Description (SEO et Aperçu)',
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
      name: 'content',
      title: 'Contenu (Markdown)',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français (Markdown)', type: 'text' },
        { name: 'en', title: 'Anglais (Markdown)', type: 'text' },
      ],
    }),
  ],
  preview: {
    select: {
      titleFr: 'title.fr',
      titleEn: 'title.en',
      media: 'mainImage',
    },
    prepare(selection) {
      const { titleFr, titleEn } = selection;
      return {
        title: titleFr || titleEn || 'Sans titre',
        media: selection.media,
      };
    },
  },
});
