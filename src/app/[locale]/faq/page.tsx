import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import FAQContent from '@/components/FAQContent';

const meta = {
  fr: {
    title: "Infos Pratiques & FAQ Canyoning Verdon | L'instant Verdon",
    description: "Tout savoir avant votre sortie canyoning ou escalade dans le Verdon : équipement, niveau requis, conditions d'annulation, assurances et CGV.",
  },
  en: {
    title: "Practical Info & FAQ Canyoning Verdon | L'instant Verdon",
    description: "Everything you need to know before your canyoning or climbing trip in Verdon: equipment, level required, cancellation policy, insurance.",
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[locale as 'fr' | 'en'] || meta.fr;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${locale}/faq`,
      languages: { fr: '/fr/faq', en: '/en/faq', 'x-default': '/fr/faq' },
    },
    openGraph: { title: m.title, description: m.description, url: `/${locale}/faq` },
  };
}

const faqSchemaFr = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quel équipement dois-je prévoir pour le canyoning ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Maillot de bain, serviette, chaussures de sport fermées (type baskets) et une bouteille d\'eau. Tout le matériel technique (combinaison, casque, harnais) est fourni par L\'instant Verdon.',
      },
    },
    {
      '@type': 'Question',
      name: 'Faut-il savoir nager pour faire du canyoning dans le Verdon ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, il est impératif de savoir nager au moins 25 mètres et d\'être capable de s\'immerger. Cette condition est obligatoire pour toutes nos sorties canyoning.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelles sont les conditions d\'annulation ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Annulation jusqu\'à 6 jours avant la prestation : remboursement intégral des arrhes. Entre 5 jours et 48h avant : encaissement des arrhes. En dessous de 48h : 50% du montant total est dû.',
      },
    },
    {
      '@type': 'Question',
      name: 'Les guides sont-ils diplômés d\'État ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Toutes nos guides détiennent un Diplôme d\'État (DE) ou Brevet d\'État (BE) de canyonisme et/ou d\'escalade, délivré par le Ministère des Sports. Elles sont à jour de leurs recyclages réglementaires.',
      },
    },
    {
      '@type': 'Question',
      name: 'À quel âge peut-on faire du canyoning ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Plusieurs de nos canyons sont accessibles dès 7-8 ans (Balène Pitchoune, Bas-Jabron en famille). L\'âge minimum varie selon l\'activité et est indiqué sur chaque fiche. Contactez-nous pour conseil personnalisé.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment réserver une sortie canyoning ou escalade ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Par téléphone au 06 89 85 53 81 ou par mail à contact@linstantverdon.com. Nous confirmons la réservation après versement d\'un acompte de 50%. Le rendez-vous se fait directement au point de départ de l\'activité.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quels modes de paiement acceptez-vous ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Carte bancaire, chèques vacances ANCV, virement bancaire et espèces le jour du rendez-vous.',
      },
    },
  ],
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale as 'fr' | 'en');

  return (
    <main className="min-h-screen bg-white">
      {locale === 'fr' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaFr) }}
        />
      )}
      {/* Cinematic Hero */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('/assets/canyon/canyon.jpeg')` }}
        />
        <div className="absolute inset-0 bg-black/65 z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4 block drop-shadow-lg">
            {locale === 'en' ? 'Practical Information & FAQ' : 'Informations Pratiques & FAQ'}
          </span>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-2xl">
            {dict.nav.faq}
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <FAQContent locale={locale} dict={dict} />
      </div>
    </main>
  );
}
