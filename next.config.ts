import type { NextConfig } from "next";

// Pragmatic CSP: 'unsafe-inline' is kept for script-src/style-src because the
// app relies on Next.js's own inline hydration bootstrap and Tailwind-driven
// inline `style={{...}}` attributes site-wide (no nonce plumbing exists yet).
// It still blocks arbitrary third-party script/frame/connect injection, which
// is the main class of risk for a marketing/booking site like this one.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://cdn.sanity.io",
  "font-src 'self' data:",
  "media-src 'self' https://pub-badf3a21614b454495059542458030e6.r2.dev",
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://maps.google.com",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://api.emailjs.com https://*.sanity.io",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self' https://api.emailjs.com",
].join('; ');

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
    ];
  },
  async redirects() {
    return [
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
