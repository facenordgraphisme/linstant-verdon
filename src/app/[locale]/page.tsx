import type { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ActivityGrid from '@/components/ActivityGrid';
import BlogOverview from '@/components/BlogOverview';
import ContactSection from '@/components/ContactSection';
import { client } from '@/sanity/client';

export const revalidate = 60;

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as 'fr' | 'en');
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: '/fr',
        en: '/en',
        'x-default': '/fr',
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale as 'fr' | 'en');

  // Fetch the latest 3 blog posts from Sanity
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc)[0...3] {
      _id,
      "title": title[$locale],
      slug,
      "description": description[$locale],
      publishedAt,
      "imageUrl": mainImage.asset->url
    }
  `, { locale });

  return (
    <main className="min-h-screen">
      <Hero dict={dict} />
      <AboutSection dict={dict} />
      <ActivityGrid dict={dict} locale={locale} />
      <BlogOverview dict={dict} locale={locale} posts={posts} />
      <ContactSection dict={dict} locale={locale} />
    </main>
  );
}
