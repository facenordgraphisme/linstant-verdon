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

  // Emit one <url> entry per locale per page — hreflang annotations inside a
  // sitemap don't cause the referenced alternate URL to be discovered on its
  // own, so each language version needs its own first-class entry.
  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap(({ fr, en, changeFreq, priority }) => {
    const frUrl = `${BASE}/fr${fr ? `/${fr}` : ''}`
    const enUrl = `${BASE}/en${en ? `/${en}` : ''}`
    const languages = { fr: frUrl, en: enUrl }
    return [
      { url: frUrl, lastModified: now, changeFrequency: changeFreq, priority, alternates: { languages } },
      { url: enUrl, lastModified: now, changeFrequency: changeFreq, priority, alternates: { languages } },
    ]
  })

  // Blog posts from Sanity
  let postEntries: MetadataRoute.Sitemap = []
  try {
    const posts = await client.fetch<Array<{ slug: string; publishedAt: string }>>(`
      *[_type == "post"] { "slug": slug.current, publishedAt }
    `)
    postEntries = posts.flatMap((post) => {
      const frUrl = `${BASE}/fr/blog/${post.slug}`
      const enUrl = `${BASE}/en/blog/${post.slug}`
      const languages = { fr: frUrl, en: enUrl }
      const lastModified = post.publishedAt ? new Date(post.publishedAt) : now
      return [
        { url: frUrl, lastModified, changeFrequency: 'monthly' as const, priority: 0.7, alternates: { languages } },
        { url: enUrl, lastModified, changeFrequency: 'monthly' as const, priority: 0.7, alternates: { languages } },
      ]
    })
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
      .flatMap((activity) => {
        const map = categoryUrlMap[activity.categorySlug]
        const frUrl = `${BASE}/fr/${map.fr}/${activity.slug}`
        const enUrl = `${BASE}/en/${map.en}/${activity.slug}`
        const languages = { fr: frUrl, en: enUrl }
        const lastModified = activity.updatedAt ? new Date(activity.updatedAt) : now
        return [
          { url: frUrl, lastModified, changeFrequency: 'monthly' as const, priority: 0.8, alternates: { languages } },
          { url: enUrl, lastModified, changeFrequency: 'monthly' as const, priority: 0.8, alternates: { languages } },
        ]
      })
  } catch {
    // Sanity unavailable at build time
  }

  return [...staticEntries, ...postEntries, ...activityEntries]
}
