import Link from 'next/link';
import { headers } from 'next/headers';

const copy = {
  fr: {
    eyebrow: '404 — PAGE INTROUVABLE',
    title: "Cette page n'existe pas (ou plus)",
    body: "Le lien que vous avez suivi est cassé, ou l'activité a changé d'adresse. Voici quelques pages utiles :",
    home: "Retour à l'accueil",
    canyoning: 'Canyoning',
    escalade: 'Escalade',
    insolite: 'Expériences insolites',
    contact: 'Nous contacter',
  },
  en: {
    eyebrow: '404 — PAGE NOT FOUND',
    title: "This page doesn't exist (or not anymore)",
    body: "The link you followed is broken, or the activity has moved. Here are a few useful pages:",
    home: 'Back to home',
    canyoning: 'Canyoning',
    escalade: 'Climbing',
    insolite: 'Unusual experiences',
    contact: 'Contact us',
  },
};

export default async function LocaleNotFound() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const locale = pathname.startsWith('/en') ? 'en' : 'fr';
  const t = copy[locale];

  const links = locale === 'fr'
    ? [
        { href: '/fr', label: t.home },
        { href: '/fr/canyoning', label: t.canyoning },
        { href: '/fr/escalade', label: t.escalade },
        { href: '/fr/insolite', label: t.insolite },
        { href: '/fr/contact', label: t.contact },
      ]
    : [
        { href: '/en', label: t.home },
        { href: '/en/canyoning', label: t.canyoning },
        { href: '/en/climbing', label: t.escalade },
        { href: '/en/unusual-activities', label: t.insolite },
        { href: '/en/contact', label: t.contact },
      ];

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-32 bg-slate-50/50">
      <div className="max-w-xl text-center space-y-8">
        <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">
          {t.eyebrow}
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
          {t.title}
        </h1>
        <p className="text-slate-500 font-medium leading-relaxed">{t.body}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest bg-slate-900 text-white hover:bg-primary transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
