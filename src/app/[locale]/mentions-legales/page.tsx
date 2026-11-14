import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '@/components/LegalPage';

export const revalidate = 86400;
export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

const content: Record<'fr' | 'en', { title: string; updated: string; description: string; sections: LegalSection[] }> = {
  fr: {
    title: 'Mentions légales',
    updated: 'Dernière mise à jour : 14 novembre 2026',
    description: "Mentions légales du site linstantverdon.com : éditeur, hébergeur, propriété intellectuelle.",
    sections: [
      {
        title: 'Éditeur du site',
        paragraphs: [
          "L'Instant Verdon, bureau des moniteurs déclaré sous le statut de syndicat local, regroupant des travailleurs indépendants.",
          'Adresse : 395 Chemin de Haut Bourras, 04120 La Palud-sur-Verdon, France.',
          'SIRET : 843 902 420 00010.',
          'Téléphone : +33 (0)6 89 85 53 81 — Email : contact@linstantverdon.com.',
          'Directrice de la publication : Emma Aglaé.',
        ],
      },
      {
        title: 'Hébergement',
        paragraphs: [
          'Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com.',
          'Les contenus éditoriaux sont stockés par Sanity AS (sanity.io).',
        ],
      },
      {
        title: 'Conception et réalisation',
        paragraphs: ['Face Nord Graphisme — www.facenordgraphisme.fr.'],
      },
      {
        title: 'Propriété intellectuelle',
        paragraphs: [
          "L'ensemble des contenus du site (textes, photographies, vidéos, logo) est la propriété de L'Instant Verdon ou de ses moniteurs, sauf mention contraire. Toute reproduction, même partielle, sans autorisation écrite préalable est interdite.",
        ],
      },
      {
        title: 'Responsabilité',
        paragraphs: [
          "Les informations du site (tarifs, horaires, conditions d'accès aux activités) sont données à titre indicatif et peuvent évoluer. Seules les informations confirmées lors de la réservation et les conditions générales de vente font foi.",
        ],
      },
      {
        title: 'Données personnelles',
        paragraphs: [
          'Le traitement des données personnelles et des cookies est décrit dans notre politique de confidentialité, accessible depuis le pied de page.',
        ],
      },
    ],
  },
  en: {
    title: 'Legal notice',
    updated: 'Last updated: 14 November 2026',
    description: 'Legal notice for linstantverdon.com: publisher, host, intellectual property.',
    sections: [
      {
        title: 'Publisher',
        paragraphs: [
          "L'Instant Verdon, an association of independent, state-certified guides (registered in France as a syndicat local).",
          'Address: 395 Chemin de Haut Bourras, 04120 La Palud-sur-Verdon, France.',
          'SIRET: 843 902 420 00010.',
          'Phone: +33 (0)6 89 85 53 81 — Email: contact@linstantverdon.com.',
          'Publication director: Emma Aglaé.',
        ],
      },
      {
        title: 'Hosting',
        paragraphs: [
          'The site is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA — vercel.com.',
          'Editorial content is stored by Sanity AS (sanity.io).',
        ],
      },
      {
        title: 'Design and development',
        paragraphs: ['Face Nord Graphisme — www.facenordgraphisme.fr.'],
      },
      {
        title: 'Intellectual property',
        paragraphs: [
          "All content on this site (text, photos, videos, logo) belongs to L'Instant Verdon or its instructors unless stated otherwise. Any reproduction, even partial, without prior written permission is prohibited.",
        ],
      },
      {
        title: 'Liability',
        paragraphs: [
          'Information on this site (prices, times, activity requirements) is indicative and may change. Only the details confirmed at booking and the terms and conditions of sale are binding.',
        ],
      },
      {
        title: 'Personal data',
        paragraphs: ['How we handle personal data and cookies is described in our privacy policy, linked in the footer.'],
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = content[locale as 'fr' | 'en'] || content.fr;
  return {
    title: `${c.title} | L'instant Verdon`,
    description: c.description,
    alternates: {
      canonical: `/${locale}/mentions-legales`,
      languages: { fr: '/fr/mentions-legales', en: '/en/mentions-legales', 'x-default': '/fr/mentions-legales' },
    },
  };
}

export default async function MentionsLegales({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = content[locale as 'fr' | 'en'] || content.fr;
  return <LegalPage title={c.title} updated={c.updated} sections={c.sections} />;
}
