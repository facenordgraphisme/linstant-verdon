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
      canonical: `/${locale}/faq`,
      languages: { fr: '/fr/faq', en: '/en/faq', 'x-default': '/fr/faq' },
    },
    openGraph: { title: m.title, description: m.description, url: `/${locale}/faq` },
  };
}

// Kept in sync with the visible questions in FAQContent.tsx's `faqs` array —
// Google requires FAQPage schema to reflect content actually visible on the page.
const faqSchemaFr = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quel équipement dois-je prévoir pour le canyoning ou l\'escalade ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Maillot de bain, serviette, chaussures de sport fermées (type baskets) et une bouteille d\'eau. Tout le matériel technique (combinaison, casque, harnais) est fourni par L\'Instant Verdon.',
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
      name: 'Quelles sont vos conditions d\'annulation ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Annulation jusqu\'à 6 jours avant la prestation : remboursement intégral des arrhes. Entre 5 jours et 48h avant : les arrhes sont encaissées. Moins de 48h avant : 50% du montant total est dû. En cas de force majeure (certificat médical à l\'appui), les arrhes sont remboursées.',
      },
    },
    {
      '@type': 'Question',
      name: 'Les guides sont-ils diplômés d\'État ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Toutes nos guides détiennent un Diplôme d\'État (DE) ou Brevet d\'État (BE) de canyonisme et/ou d\'escalade, délivré par le Ministère des Sports, et sont à jour de leurs recyclages réglementaires.',
      },
    },
    {
      '@type': 'Question',
      name: 'À partir de quel âge peut-on faire du canyoning dans le Verdon ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Plusieurs de nos canyons sont accessibles dès 7-8 ans (Balène Pitchoune, Bas-Jabron en famille). L\'âge minimum varie selon l\'activité et est indiqué sur chaque fiche — contactez-nous pour un conseil personnalisé.',
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
    {
      '@type': 'Question',
      name: 'Qu\'est-ce qui est inclus dans le prix ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le prix comprend l\'encadrement par un guide diplômé d\'État et tout le matériel de sécurité conforme aux normes CE. Repas, sacs de couchage et affaires personnelles ne sont pas inclus sauf mention contraire sur la fiche activité.',
      },
    },
    {
      '@type': 'Question',
      name: 'Que se passe-t-il si la météo ou le niveau d\'eau n\'est pas sûr ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Votre guide peut décider d\'annuler ou de reporter une sortie pour des raisons de sécurité (crues, orage, sécheresse, pollution). Aucun frais d\'annulation n\'est appliqué dans ce cas et nous vous proposons une activité ou une date alternative.',
      },
    },
    {
      '@type': 'Question',
      name: 'L\'Instant Verdon est-il assuré ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Nos guides disposent d\'une assurance responsabilité civile et professionnelle ainsi que d\'une assurance individuelle accident client, comme l\'exige le statut de guide diplômé d\'État en France.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la saison pour le canyoning et l\'escalade dans le Verdon ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le canyoning se pratique généralement de mi-avril à fin octobre selon le niveau d\'eau. L\'escalade est possible une grande partie de l\'année selon la météo. Les expériences portaledge se déroulent aux beaux jours — contactez-nous pour connaître les disponibilités actuelles.',
      },
    },
  ],
}

const faqSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What equipment should I bring for canyoning or climbing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "A swimsuit, a towel, closed sports shoes (like sneakers), and a bottle of water. All technical gear (wetsuit, helmet, harness) is provided by L'Instant Verdon.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to know how to swim to go canyoning in the Verdon?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, it is mandatory to know how to swim at least 25 meters and be able to submerge underwater. This is a required condition for every canyoning outing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are your cancellation conditions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cancellation up to 6 days before the activity: full refund of the deposit. Between 5 days and 48 hours before: the deposit is kept. Less than 48 hours before: 50% of the total amount is due. In case of force majeure (e.g. medical certificate), the deposit is refunded.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are the guides state-certified?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All our guides hold a State Diploma (DE) or State Certificate (BE) in canyoning and/or climbing, issued by the French Ministry of Sports, and are up to date on their mandatory refresher training.',
      },
    },
    {
      '@type': 'Question',
      name: 'What age can you start canyoning in the Verdon?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Several of our canyons are accessible from age 7-8 (Balène Pitchoune, Bas-Jabron for families). The minimum age varies by activity and is listed on each activity page — contact us for a personalized recommendation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I book a canyoning or climbing outing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "By phone at +33 (0)6 89 85 53 81 or by email at contact@linstantverdon.com. We confirm the booking once a 50% deposit is received. The meeting takes place directly at the activity's starting point.",
      },
    },
    {
      '@type': 'Question',
      name: 'What payment methods do you accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Credit card, holiday vouchers (ANCV), bank transfer, and cash on the day of the activity.',
      },
    },
    {
      '@type': 'Question',
      name: "What's included in the price?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The price includes supervision by a state-certified guide and all technical safety equipment meeting CE standards. Meals, sleeping bags, and personal gear are not included unless stated on the specific activity page.',
      },
    },
    {
      '@type': 'Question',
      name: "What happens if the weather or water level isn't safe?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Your guide may decide to cancel or reschedule an outing for safety reasons (flooding, storms, drought, pollution). No cancellation fee applies in this case, and we'll propose an alternative activity or date.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is L\'Instant Verdon insured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All our guides carry professional and civil liability insurance as well as individual accident coverage for clients, as required to operate as state-certified outdoor guides in France.',
      },
    },
    {
      '@type': 'Question',
      name: 'When is the canyoning and climbing season in the Verdon?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Canyoning generally runs from mid-April to the end of October, depending on water levels. Climbing is possible most of the year, weather permitting. Portaledge experiences run in the warmer months — contact us to check current availability.',
      },
    },
  ],
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale as 'fr' | 'en');

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locale === 'fr' ? faqSchemaFr : faqSchemaEn) }}
      />
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
