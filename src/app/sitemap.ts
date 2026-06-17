import type { MetadataRoute } from 'next'
import { client } from '@/sanity/client'

const BASE = 'https://www.linstantverdon.com'

// Maps Sanity category slug → canonical URL segment for each locale
const categoryUrlMap: Record<string, { fr: string; en: string }> = {
  canyoning:    { fr: 'canyoning',    en: 'canyoning' },
  climbing:     { fr: 'escalade',     en: 'climbing' },
  aventures:    { fr: 'aventures',    en: 'adventure' },
  insolite:     { fr: 'insolite',     en: 'unusual-activities' },
  weekend:      { fr: 'stages',       en: 'weekend' },
  evenementiel: { fr: 'evenementiel', en: 'evenementiel' },
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  type StaticPath = {
    fr: string
    en: string
    changeFreq: MetadataRoute.Sitemap[number]['changeFrequency']
    priority: number
  }

  const staticPaths: StaticPath[] = [
    { fr: '',              en: '',                    changeFreq: 'weekly',  priority: 1.0 },
    { fr: 'canyoning',    en: 'canyoning',           changeFreq: 'monthly', priority: 0.9 },
    { fr: 'escalade',     en: 'climbing',            changeFreq: 'monthly', priority: 0.9 },
    { fr: 'aventures',    en: 'adventure',           changeFreq: 'monthly', priority: 0.8 },
    { fr: 'stages',       en: 'weekend',             changeFreq: 'monthly', priority: 0.8 },
    { fr: 'insolite',     en: 'unusual-activities',  changeFreq: 'monthly', priority: 0.8 },
    { fr: 'evenementiel', en: 'evenementiel',        changeFreq: 'monthly', priority: 0.8 },
    { fr: 'a-propos',     en: 'a-propos',            changeFreq: 'yearly',  priority: 0.7 },
    { fr: 'faq',          en: 'faq',                 changeFreq: 'monthly', priority: 0.7 },
    { fr: 'blog',         en: 'blog',                changeFreq: 'weekly',  priority: 0.8 },
    { fr: 'contact',      en: 'contact',             changeFreq: 'yearly',  priority: 0.6 },
  ]

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map(({ fr, en, changeFreq, priority }) => ({
    url: `${BASE}/fr${fr ? `/${fr}` : ''}`,
    lastModified: now,
    changeFrequency: changeFreq,
    priority,
    alternates: {
      languages: {
        fr: `${BASE}/fr${fr ? `/${fr}` : ''}`,
        en: `${BASE}/en${en ? `/${en}` : ''}`,
      },
    },
  }))

  // Blog posts from Sanity
  let postEntries: MetadataRoute.Sitemap = []
  try {
    const posts = await client.fetch<Array<{ slug: string; publishedAt: string }>>(`
      *[_type == "post"] { "slug": slug.current, publishedAt }
    `)
    postEntries = posts.map((post) => ({
      url: `${BASE}/fr/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${BASE}/fr/blog/${post.slug}`,
          en: `${BASE}/en/blog/${post.slug}`,
        },
      },
    }))
  } catch {
    // Sanity unavailable at build time — static pages still served
  }

  // Individual activity pages from Sanity
  let activityEntries: MetadataRoute.Sitemap = []
  try {
    const activities = await client.fetch<Array<{ slug: string; categorySlug: string; updatedAt: string }>>(`
      *[_type == "activity"] {
        "slug": slug.current,
        "categorySlug": category->slug.current,
        "updatedAt": _updatedAt
      }
    `)
    activityEntries = activities
      .filter((a) => a.slug && a.categorySlug && categoryUrlMap[a.categorySlug])
      .map((activity) => {
        const map = categoryUrlMap[activity.categorySlug]
        return {
          url: `${BASE}/fr/${map.fr}/${activity.slug}`,
          lastModified: activity.updatedAt ? new Date(activity.updatedAt) : now,
          changeFrequency: 'monthly' as const,
          priority: 0.8,
          alternates: {
            languages: {
              fr: `${BASE}/fr/${map.fr}/${activity.slug}`,
              en: `${BASE}/en/${map.en}/${activity.slug}`,
            },
          },
        }
      })
  } catch {
    // Sanity unavailable at build time
  }

  return [...staticEntries, ...postEntries, ...activityEntries]
}
