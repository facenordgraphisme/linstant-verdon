import type { NextConfig } from "next";

// Pragmatic CSP: 'unsafe-inline' is kept for script-src/style-src because the
// app relies on Next.js's own inline hydration bootstrap and Tailwind-driven
// inline `style={{...}}` attributes site-wide (no nonce plumbing exists yet).
// It still blocks arbitrary third-party script/frame/connect injection, which
// is the main class of risk for a marketing/booking site like this one.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net",
  "style-src 'self' 'unsafe-inline'",
  // Google Ads conversion pings go out as image/beacon/fetch requests to these
  // hosts; without them every conversion is silently dropped.
  "img-src 'self' data: https://cdn.sanity.io https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com https://www.google.fr https://*.doubleclick.net https://www.googleadservices.com https://pagead2.googlesyndication.com",
  "font-src 'self' data:",
  "media-src 'self' https://pub-badf3a21614b454495059542458030e6.r2.dev",
  "frame-src https://www.youtube.com https://td.doubleclick.net https://www.googletagmanager.com https://www.youtube-nocookie.com https://www.google.com https://maps.google.com",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://www.google.com https://www.google.fr https://*.doubleclick.net https://www.googleadservices.com https://pagead2.googlesyndication.com https://api.emailjs.com https://*.sanity.io",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self' https://api.emailjs.com",
].join('; ');

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    globalNotFound: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/studio/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
  async redirects() {
    return [
      // Root → default locale, handled by Vercel's routing layer (no Function
      // invocation, unlike doing it in proxy.ts).
      { source: '/', destination: '/fr', permanent: true },
      // Wrong-locale / alias category URLs → canonical one (these used to be
      // redirected by the page itself; the category route is now fully static).
      ...[
        ['fr', 'climbing', 'escalade'], ['fr', 'adventure', 'aventures'],
        ['fr', 'unusual-activities', 'insolite'], ['fr', 'weekend', 'stages'],
        ['fr', 'canyon', 'canyoning'],
        ['en', 'escalade', 'climbing'], ['en', 'aventures', 'adventure'],
        ['en', 'insolite', 'unusual-activities'], ['en', 'stages', 'weekend'],
        ['en', 'canyon', 'canyoning'],
      ].map(([locale, from, to]) => ({
        source: `/${locale}/${from}`,
        destination: `/${locale}/${to}`,
        permanent: true,
      })),
      // Old site URLs without locale prefix → new FR URLs (permanent 308)
      { source: '/contact', destination: '/fr/contact', permanent: true },
      { source: '/a-propos', destination: '/fr/a-propos', permanent: true },
      { source: '/faq', destination: '/fr/faq', permanent: true },
      { source: '/blog', destination: '/fr/blog', permanent: true },
      { source: '/blog/:slug', destination: '/fr/blog/:slug', permanent: true },
      { source: '/canyoning', destination: '/fr/canyoning', permanent: true },
      { source: '/canyoning/:slug', destination: '/fr/canyoning/:slug', permanent: true },
      { source: '/escalade', destination: '/fr/escalade', permanent: true },
      { source: '/escalade/:slug', destination: '/fr/escalade/:slug', permanent: true },
      { source: '/aventures', destination: '/fr/aventures', permanent: true },
      { source: '/aventures/:slug', destination: '/fr/aventures/:slug', permanent: true },
      { source: '/insolite', destination: '/fr/insolite', permanent: true },
      { source: '/insolite/:slug', destination: '/fr/insolite/:slug', permanent: true },
      { source: '/stages', destination: '/fr/stages', permanent: true },
      { source: '/stages/:slug', destination: '/fr/stages/:slug', permanent: true },
      { source: '/evenementiel', destination: '/fr/evenementiel', permanent: true },
      { source: '/evenementiel/:slug', destination: '/fr/evenementiel/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
