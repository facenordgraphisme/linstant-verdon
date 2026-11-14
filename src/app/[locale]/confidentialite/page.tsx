import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '@/components/LegalPage';

export const revalidate = 86400;
export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

const content: Record<'fr' | 'en', { title: string; updated: string; description: string; sections: LegalSection[] }> = {
  fr: {
    title: 'Politique de confidentialité',
    updated: 'Dernière mise à jour : 14 novembre 2026',
    description: "Comment L'Instant Verdon collecte et utilise vos données personnelles et les cookies sur linstantverdon.com.",
    sections: [
      {
        title: 'Responsable du traitement',
        paragraphs: [
          "L'Instant Verdon, 395 Chemin de Haut Bourras, 04120 La Palud-sur-Verdon — contact@linstantverdon.com.",
        ],
      },
      {
        title: 'Données collectées',
        paragraphs: [
          'Formulaire de contact : nom, adresse email, téléphone et contenu de votre message. Ces informations servent uniquement à répondre à votre demande et à organiser votre sortie. Elles sont transmises par email via le service EmailJS.',
          'Réservation en ligne : elle est gérée par la plateforme Book Adventure, qui applique sa propre politique de confidentialité.',
          'Nous ne vendons ni ne cédons vos données à des tiers.',
        ],
      },
      {
        title: 'Cookies et mesure publicitaire',
        paragraphs: [
          "Le site utilise la balise Google (Google Ads) pour mesurer l'efficacité de nos annonces, c'est-à-dire savoir si une visite issue d'une annonce a mené à une demande de contact ou de réservation. Cette balise peut déposer des cookies et transmettre des données techniques (adresse IP, pages vues, identifiant de clic) à Google Ireland Ltd.",
          "Ces cookies ne sont déposés qu'avec votre accord, donné via le bandeau affiché lors de votre première visite. Tant que vous n'avez pas accepté, la balise fonctionne en mode restreint, sans cookie publicitaire. Vous pouvez modifier votre choix à tout moment avec le lien « Cookies » en bas de page.",
          "Votre choix est conservé dans votre navigateur. Vous pouvez aussi gérer la personnalisation des annonces sur adssettings.google.com.",
        ],
      },
      {
        title: 'Durée de conservation',
        paragraphs: [
          'Les messages reçus via le formulaire sont conservés le temps nécessaire au traitement de votre demande, puis au maximum 3 ans après notre dernier échange.',
        ],
      },
      {
        title: 'Hébergement et sous-traitants',
        paragraphs: [
          'Vercel Inc. (hébergement, États-Unis), Sanity AS (contenus du site), EmailJS (envoi des messages du formulaire), Google (mesure publicitaire). Les transferts hors Union européenne sont encadrés par les clauses contractuelles types de la Commission européenne.',
        ],
      },
      {
        title: 'Vos droits',
        paragraphs: [
          "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de limitation du traitement de vos données. Pour l'exercer, écrivez à contact@linstantverdon.com.",
          "Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).",
        ],
      },
    ],
  },
  en: {
    title: 'Privacy policy',
    updated: 'Last updated: 14 November 2026',
    description: "How L'Instant Verdon collects and uses your personal data and cookies on linstantverdon.com.",
    sections: [
      {
        title: 'Data controller',
        paragraphs: ["L'Instant Verdon, 395 Chemin de Haut Bourras, 04120 La Palud-sur-Verdon, France — contact@linstantverdon.com."],
      },
      {
        title: 'Data we collect',
        paragraphs: [
          'Contact form: name, email address, phone number and your message. We use them only to answer your request and organise your trip. They are sent to us by email through the EmailJS service.',
          'Online booking is handled by the Book Adventure platform, under its own privacy policy.',
          'We never sell or share your data with third parties.',
        ],
      },
      {
        title: 'Cookies and ad measurement',
        paragraphs: [
          'This site uses the Google tag (Google Ads) to measure whether a visit from one of our ads led to a contact request or a booking. The tag may set cookies and send technical data (IP address, pages viewed, click identifier) to Google Ireland Ltd.',
          'These cookies are only set with your consent, given through the banner shown on your first visit. Until you accept, the tag runs in restricted mode without advertising cookies. You can change your choice at any time with the "Cookies" link in the footer.',
          'Your choice is stored in your browser. You can also manage ad personalisation at adssettings.google.com.',
        ],
      },
      {
        title: 'Retention',
        paragraphs: ['Messages sent through the form are kept as long as needed to handle your request, and at most 3 years after our last exchange.'],
      },
      {
        title: 'Hosting and processors',
        paragraphs: [
          'Vercel Inc. (hosting, USA), Sanity AS (site content), EmailJS (form delivery), Google (ad measurement). Transfers outside the European Union are covered by the European Commission standard contractual clauses.',
        ],
      },
      {
        title: 'Your rights',
        paragraphs: [
          'Under the GDPR you have the right to access, correct, erase, object to and restrict the processing of your data. To exercise them, email contact@linstantverdon.com.',
          'You may also lodge a complaint with the CNIL, the French data protection authority (www.cnil.fr).',
        ],
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
      canonical: `/${locale}/confidentialite`,
      languages: { fr: '/fr/confidentialite', en: '/en/confidentialite', 'x-default': '/fr/confidentialite' },
    },
  };
}

export default async function Confidentialite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = content[locale as 'fr' | 'en'] || content.fr;
  return <LegalPage title={c.title} updated={c.updated} sections={c.sections} />;
}
