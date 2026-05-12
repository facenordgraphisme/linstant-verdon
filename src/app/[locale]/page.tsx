import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ActivityGrid from '@/components/ActivityGrid';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale as 'fr' | 'en');

  return (
    <main className="min-h-screen">
      <Hero dict={dict} />
      <AboutSection dict={dict} />
      <ActivityGrid dict={dict} locale={locale} />
    </main>
  );
}
