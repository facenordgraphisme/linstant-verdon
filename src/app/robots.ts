import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/studio',
      },
      {
        userAgent: [
          'AhrefsBot', 'SemrushBot', 'DotBot', 'rogerbot', 'PetalBot', 'Bytespider',
          'MJ12bot', 'YandexBot', 'Baiduspider', 'Sogou', 'Exabot', 'Diffbot',
          'cohere-ai', 'anthropic-ai', 'Google-Extended',
        ],
        disallow: '/',
      }
    ],
    sitemap: 'https://www.linstantverdon.com/sitemap.xml',
  }
}
