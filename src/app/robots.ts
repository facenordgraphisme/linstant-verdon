import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/studio/',
      },
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot', 'PetalBot', 'ByteSpider', 'GPTBot', 'amazonbot', 'CCBot'],
        disallow: '/',
      }
    ],
    sitemap: 'https://www.linstantverdon.com/sitemap.xml',
  }
}
