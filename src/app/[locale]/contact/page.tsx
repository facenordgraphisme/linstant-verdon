import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import ContactSection from '@/components/ContactSection';

const meta = {
  fr: {
    title: "Réserver votre Sortie Verdon — Contactez-nous | L'instant Verdon",
    description: "Réservez votre sortie canyoning, escalade ou aventure dans les Gorges du Verdon. L'instant Verdon répond en moins de 24h. 395 Chem. de Haut Bourras, 04120 La Palud-sur-Verdon.",
  },
  en: {
    title: "Book your Verdon Adventure — Contact Us | L'instant Verdon",
    description: "Book your canyoning, climbing or adventure outing in the Gorges du Verdon. L'instant Verdon replies within 24h.",
  },
}

export const revalidate = 86400;

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[locale as 'fr' | 'en'] || meta.fr;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { fr: '/fr/contact', en: '/en/contact', 'x-default': '/fr/contact' },
    },
    openGraph: { title: m.title, description: m.description, url: `/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale as 'fr' | 'en');

  return (
    <main className="min-h-screen bg-white">
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('/assets/accueil/home.webp')` }}
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-6 block drop-shadow-lg">
            Parlons de votre prochaine aventure
          </span>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white-shadow">
            {dict.nav.contact}
          </h1>
        </div>
      </section>

      <ContactSection dict={dict} locale={locale} />
    </main>
  );
}
