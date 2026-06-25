import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
