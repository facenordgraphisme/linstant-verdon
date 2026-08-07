import type { Metadata } from 'next';
import { client } from '@/sanity/client';
import { getDictionary } from '@/lib/dictionaries';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, permanentRedirect } from 'next/navigation';

const dictKeyMap: Record<string, string> = {
  canyoning: 'canyoning', canyon: 'canyoning',
  climbing: 'escalade', escalade: 'escalade',
  adventure: 'aventures', aventures: 'aventures',
  'unusual-activities': 'insolite', insolite: 'insolite',
  stages: 'stages', weekend: 'stages',
  evenementiel: 'evenementiel',
}

const categoryAltMap: Record<string, { fr: string; en: string }> = {
  canyoning:    { fr: 'canyoning',    en: 'canyoning' },
  escalade:     { fr: 'escalade',     en: 'climbing' },
  aventures:    { fr: 'aventures',    en: 'adventure' },
  insolite:     { fr: 'insolite',     en: 'unusual-activities' },
  stages:       { fr: 'stages',       en: 'weekend' },
  evenementiel: { fr: 'evenementiel', en: 'evenementiel' },
}

const categoryMeta: Record<string, { title: { fr: string; en: string }; description: { fr: string; en: string } }> = {
  canyoning: {
    title: { fr: "Canyoning Verdon avec Guide Diplômé | L'instant Verdon", en: "Canyoning in Verdon with Certified Guide | L'instant Verdon" },
    description: { fr: "Descendez les plus beaux canyons du Verdon avec des guides diplômés d'État. Clue d'Artuby, Balène, Bas-Jabron… À partir de 50€ / personne.", en: "Explore the best canyons in Verdon with state-certified guides. From €50/person. Easy booking." },
  },
  escalade: {
    title: { fr: "Escalade dans les Gorges du Verdon | L'instant Verdon", en: "Climbing in the Gorges du Verdon | L'instant Verdon" },
    description: { fr: "Escalade dans le Verdon mondialement réputé pour ses voies d'exception. Initiation et grandes voies avec guides brevetés d'État.", en: "Climb world-famous routes in the Verdon Gorges. Beginner initiation to multi-pitch climbs with certified guides." },
  },
  aventures: {
    title: { fr: "Parcours Aventure Verdon | L'instant Verdon", en: "Adventure Courses in Verdon | L'instant Verdon" },
    description: { fr: "Parcours aventure verticaux dans les Gorges du Verdon. Trou du Renard, Main-morte… Sensations fortes avec L'instant Verdon.", en: "Vertical adventure courses in the Verdon Gorges. Breathtaking views and unique thrills." },
  },
  stages: {
    title: { fr: "Stage Multi-Activités Verdon | L'instant Verdon", en: "Multi-Activity Courses in Verdon | L'instant Verdon" },
    description: { fr: "Stage multi-activités Verdon : acro-yoga, escalade et canyoning. Week-ends immersifs dans les Gorges du Verdon avec des guides passionnés.", en: "Multi-activity courses: acro-yoga, climbing and canyoning in the Verdon Gorges." },
  },
  insolite: {
    title: { fr: "Expériences Insolites dans le Verdon | L'instant Verdon", en: "Unusual Experiences in Verdon | L'instant Verdon" },
    description: { fr: "Vivez des expériences insolites dans le Verdon : portaledge, soirée en canyon, demi-journée à la Carelle. Sortez des sentiers battus.", en: "Live unique experiences in Verdon: portaledge, canyon evenings, and unusual adventures." },
  },
  evenementiel: {
    title: { fr: "Évènementiel & Team Building Verdon | L'instant Verdon", en: "Events & Team Building in Verdon | L'instant Verdon" },
    description: { fr: "Organisez votre EVJF, EVG, séminaire ou team building dans les Gorges du Verdon. Activités outdoor sur mesure avec encadrement diplômé d'État.", en: "Bachelorette parties, bachelor parties, seminars and team building in the Verdon Gorges. Tailor-made outdoor activities." },
  },
}

export const revalidate = 86400;

export async function generateStaticParams() {
  const locales = ['fr', 'en'] as const;
  const dictKeys = ['canyoning', 'escalade', 'aventures', 'insolite', 'stages', 'evenementiel'];
  const params = [];
  for (const locale of locales) {
    for (const dictKey of dictKeys) {
      const alt = categoryAltMap[dictKey] || { fr: dictKey, en: dictKey };
      params.push({ locale, category: alt[locale] });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale, category } = await params;
  const dictKey = dictKeyMap[category] || category;
  const m = categoryMeta[dictKey]
  if (!m) return {}
  const altUrls = categoryAltMap[dictKey] || { fr: dictKey, en: dictKey }
  const title = m.title[locale as 'fr' | 'en'] || m.title.fr
  const description = m.description[locale as 'fr' | 'en'] || m.description.fr
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/${category}`,
      languages: {
        fr: `/fr/${altUrls.fr}`,
        en: `/en/${altUrls.en}`,
        'x-default': `/fr/${altUrls.fr}`,
      },
    },
    openGraph: { title, description, url: `/${locale}/${category}` },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale, category } = await params;
  const dict = getDictionary(locale as 'fr' | 'en');

  const dictKey = dictKeyMap[category] || category;

  // The category segment in the URL must match the canonical one for this
  // locale — otherwise this is a wrong-locale/alias duplicate (e.g.
  // /en/escalade instead of /en/climbing, or /fr/canyon instead of
  // /fr/canyoning). Send it to the one true URL instead of rendering a
  // self-canonicalizing copy.
  const canonicalForLocale = categoryAltMap[dictKey]?.[locale as 'fr' | 'en'];
  if (canonicalForLocale && canonicalForLocale !== category) {
    permanentRedirect(`/${locale}/${canonicalForLocale}`);
  }

  const sanityCategoryMap: Record<string, string> = {
    canyoning: 'canyoning',
    canyon: 'canyoning',
    climbing: 'climbing',
    escalade: 'climbing',
    adventure: 'aventures',
    aventures: 'aventures',
    'unusual-activities': 'insolite',
    insolite: 'insolite',
    stages: 'weekend',
    weekend: 'weekend',
    evenementiel: 'evenementiel'
  };
  
  const sanityCategory = sanityCategoryMap[category] || category;

  // Type-safe activity data fetch from dictionary
  const activityData = dictKey !== 'title' ? (dict.activities as any)[dictKey] : null;

  if (!activityData || typeof activityData === 'string') notFound();

  let stagesData = null;
  if (dictKey === 'stages') {
    stagesData = await client.fetch(`
      *[_type == "stagesPage"][0] {
        "title": title[$locale],
        "tagline": tagline[$locale],
        "description": description[$locale],
        "heroImage": coalesce(heroImage.asset->url, ""),
        "whereTitle": whereTitle[$locale],
        "whereText": whereText[$locale],
        "acroYogaTitle": acroYogaTitle[$locale],
        "acroYogaText": acroYogaText[$locale],
        "canyonTitle": canyonTitle[$locale],
        "canyonText": canyonText[$locale],
        "climbingTitle": climbingTitle[$locale],
        "climbingText": climbingText[$locale],
        program3Days,
        program7Days,
        "logisticsAccommodation": logisticsAccommodation[$locale],
        "logisticsGear": logisticsGear[$locale],
        "logisticsTransport": logisticsTransport[$locale],
        "toBring": toBring[$locale],
        "prices": prices[$locale],
        "gallery": gallery[].asset->url
      }
    `, { locale });
  }

  const imageMapping: Record<string, string> = {
    canyoning: '/assets/canyon/canyon.jpeg',
    escalade: '/assets/escalade/climbing.jpeg',
    aventures: '/assets/aventures/adventure.jpeg',
    stages: '/assets/week%20end%20stage/weekend.webp',
    insolite: '/assets/insolite/unusual2.webp',
    evenementiel: '/assets/evenementiel/events.jpg.jpeg',
  };

  const bgImage = imageMapping[dictKey] || '/assets/canyon/canyon-verdon.jpg';

  const categoryColorMap: Record<string, { text: string; bg: string; border: string; bgGlow: string; hoverText: string; hoverBorder: string; hex: string }> = {
    canyoning: {
      text: 'text-canyoning-blue',
      bg: 'bg-canyoning-blue',
      border: 'border-canyoning-blue',
      bgGlow: 'bg-canyoning-blue/10',
      hoverText: 'group-hover:text-canyoning-blue',
      hoverBorder: 'hover:border-canyoning-blue/30',
      hex: '#109ea5'
    },
    escalade: {
      text: 'text-logo-teal',
      bg: 'bg-logo-teal',
      border: 'border-logo-teal',
      bgGlow: 'bg-logo-teal/10',
      hoverText: 'group-hover:text-logo-teal',
      hoverBorder: 'hover:border-logo-teal/30',
      hex: '#109ea5'
    },
    aventures: {
      text: 'text-logo-peach',
      bg: 'bg-logo-peach',
      border: 'border-logo-peach',
      bgGlow: 'bg-logo-peach/10',
      hoverText: 'group-hover:text-logo-peach',
      hoverBorder: 'hover:border-logo-peach/30',
      hex: '#f7a271'
    },
    stages: {
      text: 'text-stages-purple',
      bg: 'bg-stages-purple',
      border: 'border-stages-purple',
      bgGlow: 'bg-stages-purple/10',
      hoverText: 'group-hover:text-stages-purple',
      hoverBorder: 'hover:border-stages-purple/30',
      hex: '#f7a271'
    },
    insolite: {
      text: 'text-logo-pink',
      bg: 'bg-logo-pink',
      border: 'border-logo-pink',
      bgGlow: 'bg-logo-pink/10',
      hoverText: 'group-hover:text-logo-pink',
      hoverBorder: 'hover:border-logo-pink/30',
      hex: '#ca769e'
    },
    evenementiel: {
      text: 'text-event-rose',
      bg: 'bg-event-rose',
      border: 'border-event-rose',
      bgGlow: 'bg-event-rose/10',
      hoverText: 'group-hover:text-event-rose',
      hoverBorder: 'hover:border-event-rose/30',
      hex: '#ca769e'
    },
  };

  const colors = categoryColorMap[dictKey] || {
    text: 'text-primary',
    bg: 'bg-primary',
    border: 'border-primary',
    bgGlow: 'bg-primary/10',
    hoverText: 'group-hover:text-primary',
    hoverBorder: 'hover:border-primary/30',
    hex: '#10a18b'
  };

  if (dictKey === 'stages' && stagesData) {
    const heroBg = stagesData.heroImage || bgImage;
    return (
      <main className="min-h-screen bg-slate-50/50">
        {/* Hero Section */}
        <section className="relative h-[65vh] flex items-center justify-center pt-24 md:pt-32 overflow-hidden bg-black text-white">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] scale-105"
            style={{ backgroundImage: `url('${heroBg}')` }}
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
          
          <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
            <span className="text-[#10a18b] font-black uppercase tracking-[0.4em] text-xs mb-6 block drop-shadow-lg">
              {stagesData.tagline}
            </span>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8 text-white-shadow text-white">
              {stagesData.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed text-white-shadow mb-10">
              {stagesData.description}
            </p>
            <Link 
              href={`/${locale}/contact`}
              className="button-glow transition-all duration-300 inline-block px-10 py-5 rounded-full font-black text-xs uppercase tracking-wider text-white shadow-2xl scale-[1.02] hover:scale-[1.05]"
              style={{ background: '#10a18b' }}
            >
              {locale === 'fr' ? 'RÉSERVER VOTRE STAGE' : 'BOOK YOUR CAMP'}
            </Link>
          </div>
        </section>

        {/* Section Où ? */}
        <section className="py-20 px-6 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
              {stagesData.whereTitle}
            </h2>
            <p className="text-lg text-slate-600 font-semibold leading-relaxed">
              {stagesData.whereText}
            </p>
          </div>
        </section>

        {/* Section Nos Activités */}
        <section className="py-24 px-6 bg-slate-50/50">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter">
                {locale === 'fr' ? 'Nos Activités' : 'Our Activities'}
              </h2>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mt-2">
                {locale === 'fr' ? 'Un programme complet et varié' : 'A complete and varied program'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Activity 1 */}
              <div className="card-promax bg-white p-10 space-y-6 relative overflow-hidden group animate-fadeIn">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#10a18b]" />
                <h3 className="text-2xl font-black text-[#0d758b] uppercase tracking-tight">
                  {stagesData.acroYogaTitle}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {stagesData.acroYogaText}
                </p>
              </div>

              {/* Activity 2 */}
              <div className="card-promax bg-white p-10 space-y-6 relative overflow-hidden group animate-fadeIn">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#10a18b]" />
                <h3 className="text-2xl font-black text-[#0d758b] uppercase tracking-tight">
                  {stagesData.canyonTitle}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {stagesData.canyonText}
                </p>
              </div>

              {/* Activity 3 */}
              <div className="card-promax bg-white p-10 space-y-6 relative overflow-hidden group animate-fadeIn">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#10a18b]" />
                <h3 className="text-2xl font-black text-[#0d758b] uppercase tracking-tight">
                  {stagesData.climbingTitle}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {stagesData.climbingText}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Programmation (Tables) */}
        <section className="py-24 px-6 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter">
                {locale === 'fr' ? 'Programme du Stage' : 'Camp Schedule'}
              </h2>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mt-2">
                {locale === 'fr' ? 'Découvrez le déroulement de votre aventure' : 'Discover the schedule of your adventure'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Table 1: Formule 3 jours */}
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight border-b-2 border-[#10a18b] pb-2">
                  {locale === 'fr' ? 'Programmation Formule 3 jours' : '3-Day Camp Schedule'}
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-xl">
                  <table className="w-full text-left border-collapse bg-white">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-500">
                        <th className="p-5">{locale === 'fr' ? 'Jour' : 'Day'}</th>
                        <th className="p-5">{locale === 'fr' ? 'Matin' : 'Morning'}</th>
                        <th className="p-5">{locale === 'fr' ? 'Après-midi (1 avril - 31 octobre)' : 'Afternoon (Apr 1 - Oct 31)'}</th>
                        <th className="p-5">{locale === 'fr' ? 'Après-midi (1 novembre – 31 mars)' : 'Afternoon (Nov 1 - Mar 31)'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-600">
                      {stagesData.program3Days?.map((row: any, index: number) => (
                        <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-5 font-black text-[#10a18b]">{row.day}</td>
                          <td className="p-5">{row.morning}</td>
                          <td className="p-5">{row.afternoon}</td>
                          <td className="p-5">{row.afternoonWinter}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table 2: Formule 7 jours */}
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight border-b-2 border-[#10a18b] pb-2">
                  {locale === 'fr' ? 'Programmation Formule 7 jours' : '7-Day Camp Schedule'}
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {locale === 'fr' ? '(1 avril - 31 octobre, hors vacances scolaires estivales)' : '(April 1 - October 31, excluding summer school holidays)'}
                </p>
                <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-xl">
                  <table className="w-full text-left border-collapse bg-white">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-500">
                        <th className="p-5">{locale === 'fr' ? 'Jour' : 'Day'}</th>
                        <th className="p-5">{locale === 'fr' ? 'Matin (9H30 - 12H)' : 'Morning (9:30 - 12:00)'}</th>
                        <th className="p-5">{locale === 'fr' ? 'Après-midi (13H30 – 16H)' : 'Afternoon (13:30 - 16:00)'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-600">
                      {stagesData.program7Days?.map((row: any, index: number) => (
                        <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-5 font-black text-[#10a18b]">{row.day}</td>
                          <td className="p-5">{row.morning}</td>
                          <td className="p-5">{row.afternoon}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logistics & Practical details */}
        <section className="py-24 px-6 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Prise en charge */}
            <div className="card-promax bg-white p-10 space-y-4">
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                {locale === 'fr' ? 'Prise en charge' : 'Accommodation & Food'}
              </h4>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                {stagesData.logisticsAccommodation}
              </p>
            </div>

            {/* Prêt de matériel */}
            <div className="card-promax bg-white p-10 space-y-4">
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                {locale === 'fr' ? 'Prêt de matériel' : 'Gear Provided'}
              </h4>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                {stagesData.logisticsGear}
              </p>
            </div>

            {/* Transport */}
            <div className="card-promax bg-white p-10 space-y-4">
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                {locale === 'fr' ? 'Transport' : 'Transport'}
              </h4>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                {stagesData.logisticsTransport}
              </p>
            </div>
          </div>
        </section>

        {/* Bring checklists, prices, & CTA */}
        <section className="py-24 px-6 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Checklist: Vous devez prévoir */}
            <div className="lg:col-span-6 space-y-8">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                {locale === 'fr' ? 'Vous devez prévoir :' : 'You must bring :'}
              </h3>
              <ul className="space-y-4">
                {stagesData.toBring?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-4 text-slate-600 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10a18b] mt-2 shrink-0" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Box */}
            <div className="lg:col-span-6 bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-8">
              <h3 className="text-3xl font-black text-[#0d758b] uppercase tracking-tight">
                {locale === 'fr' ? 'Tarifs' : 'Rates'}
              </h3>
              <ul className="space-y-4 text-slate-600 font-medium leading-relaxed">
                {stagesData.prices?.map((priceLine: string, i: number) => (
                  <li key={i} className={`flex items-start gap-3 text-base ${i < 2 ? 'font-black text-slate-950 text-lg border-b border-slate-200/50 pb-2' : ''}`}>
                    {i >= 2 && <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 shrink-0" />}
                    <span>{priceLine}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 space-y-4">
                <Link 
                  href={`/${locale}/contact`}
                  className="w-full text-center block bg-slate-900 text-white font-black uppercase text-xs tracking-widest py-5 rounded-2xl hover:bg-[#10a18b] hover:shadow-lg transition-all duration-300"
                >
                  {locale === 'fr' ? 'CONTACTER LE BUREAU DES MONITEURS' : 'CONTACT INSTRUCTORS OFFICE'}
                </Link>
                <p className="text-xs text-slate-400 font-bold text-center uppercase tracking-wider">
                  {locale === 'fr' ? 'Pour les dates de stage suivez nous sur instagram' : 'For camp dates follow us on Instagram'}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Gallery Section */}
        {stagesData.gallery && stagesData.gallery.length > 0 && (
          <section className="py-24 px-6 bg-slate-50 border-t border-slate-100">
            <div className="max-w-7xl mx-auto space-y-16">
              <div className="text-center">
                <h3 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
                  {locale === 'fr' ? 'Galerie Photo' : 'Photo Gallery'}
                </h3>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mt-2">
                  {locale === 'fr' ? 'Souvenirs de nos stages' : 'Memories of our camps'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {stagesData.gallery.map((imgUrl: string, idx: number) => (
                  <div key={idx} className="group overflow-hidden rounded-[2rem] border-4 border-white shadow-xl aspect-[4/3] bg-slate-200 relative">
                    <Image
                      src={imgUrl}
                      alt={`Stage Photo ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    );
  }

  if (dictKey === 'evenementiel') {
    return (
      <main className="min-h-screen bg-slate-50/50">
        {/* Hero Section - Cinematic Glassmorphism */}
        <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-black text-white">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] scale-105"
            style={{ backgroundImage: `url('/assets/evenementiel/events.jpg.jpeg')` }}
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
          
          <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
            <span className={`${colors.text} font-black uppercase tracking-[0.4em] text-xs mb-6 block drop-shadow-lg`}>
              {locale === 'fr' ? 'SÉMINAIRES, EVG / EVJF & GROUPES' : 'SEMINARS, BACHELOR PARTIES & GROUPS'}
            </span>
            <h1 className={`text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8 text-white-shadow ${colors.text}`}>
              {activityData.name}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed text-white-shadow mb-10">
              {activityData.description}
            </p>
            <Link 
              href={`/${locale}/contact`}
              className="button-glow transition-all duration-300 inline-block px-10 py-5 rounded-full font-black text-xs uppercase tracking-wider text-white shadow-2xl scale-[1.02] hover:scale-[1.05]"
              style={{
                background: colors.hex
              }}
            >
              {locale === 'fr' ? 'RÉSERVER VOTRE ÉVÉNEMENT' : 'BOOK YOUR EVENT'}
            </Link>
          </div>
        </section>

        {/* Content Section - Two Column Premium Layout */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              
              {/* Left Column - Main Copy */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-3 bg-rose-50 border border-rose-100 rounded-full px-5 py-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">
                    {locale === 'fr' ? 'Sur-mesure & Aventure' : 'Tailor-made & Adventure'}
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                  {locale === 'fr' ? 'Organisez un événement sportif !' : 'Organize a sports event!'}
                </h2>
                <p className="text-lg text-slate-600 font-semibold leading-relaxed">
                  {locale === 'fr' 
                    ? "Vous souhaitez organiser un événement sportif ? Ou vous désirez organiser un enterrement de vie de jeune fille ou garçon ?"
                    : "Looking to organize a sports event? Or planning a bachelor or bachelorette party?"
                  }
                </p>
                <div className="h-px bg-slate-100 my-8" />
                <p className="text-slate-500 font-medium leading-relaxed">
                  {locale === 'fr'
                    ? "Contactez-nous, on vous proposera une activité adaptée en fonction de votre groupe et de la saison. Nos activités de pleine nature assurent une cohésion d'équipe tout en gardant un esprit d'aventure. Vous profiterez d'un environnement exceptionnel dans les Gorges du Verdon."
                    : "Contact us, and we will offer a custom activity adapted to your group size and the season. Our outdoor activities ensure team cohesion while keeping an adventurous spirit. You will enjoy an exceptional environment in the Verdon Gorges."
                  }
                </p>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {locale === 'fr'
                    ? "Nous travaillons pour les comités d'entreprises et les collectivités, et animons les anniversaires et enterrement de vie de jeune fille / garçon."
                    : "We work with corporate committees, local governments, and animate birthdays as well as bachelor/bachelorette parties."
                  }
                </p>
              </div>

              {/* Right Column - Premium Event CTA Card */}
              <div className="lg:col-span-5">
                <div className="glass-card p-10 rounded-[3rem] border border-slate-100 shadow-2xl space-y-8 bg-slate-50/50">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                    {locale === 'fr' ? 'Projets Sur-Mesure' : 'Custom Projects'}
                  </h3>
                  <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                    {locale === 'fr'
                      ? "Que ce soit pour un grand comité d'entreprise (jusqu'à 50 personnes), une collectivité ou un groupe d'amis intime, nous modulons nos ateliers et guidages pour offrir une expérience inoubliable."
                      : "Whether for a large corporate committee (up to 50 people), a local government, or an intimate group of friends, we customize our workshops and guiding to offer an unforgettable experience."
                    }
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4 text-sm text-slate-600 font-semibold">
                      <div className="p-1 rounded-full bg-rose-50 text-rose-600 shadow-sm mt-0.5">
                        <svg className="w-4 h-4 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      </div>
                      <span>{locale === 'fr' ? "Canyoning, Aqua-Rando & Escalade" : "Canyoning, Water Trekking & Climbing"}</span>
                    </li>
                    <li className="flex items-start gap-4 text-sm text-slate-600 font-semibold">
                      <div className="p-1 rounded-full bg-rose-50 text-rose-600 shadow-sm mt-0.5">
                        <svg className="w-4 h-4 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      </div>
                      <span>{locale === 'fr' ? "Encadrement privé diplômé d'État" : "State-certified private instructors"}</span>
                    </li>
                    <li className="flex items-start gap-4 text-sm text-slate-600 font-semibold">
                      <div className="p-1 rounded-full bg-rose-50 text-rose-600 shadow-sm mt-0.5">
                        <svg className="w-4 h-4 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      </div>
                      <span>{locale === 'fr' ? "Photos souvenir offertes pour le groupe" : "Free souvenir photos for the group"}</span>
                    </li>
                  </ul>
                  <div className="pt-4">
                    <Link 
                      href={`/${locale}/contact`}
                      className="w-full text-center block bg-slate-900 text-white font-black uppercase text-xs tracking-widest py-4.5 rounded-2xl hover:bg-rose-600 hover:shadow-lg transition-all duration-300"
                    >
                      {locale === 'fr' ? "CONTACTER L'ÉQUIPE" : "CONTACT THE TEAM"}
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Premium Photographic Showcase Section */}
        <section className="py-24 px-6 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
                {locale === 'fr' ? "L'Aventure en Groupe" : "Group Adventure"}
              </h3>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">
                {locale === 'fr' ? "Découvrez nos souvenirs d'événements" : "Discover our event memories"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Photo 1 */}
              <div className="group overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl relative aspect-[4/3] bg-slate-100">
                <Image
                  src="/assets/evenementiel/event1.jpg.jpeg"
                  alt={locale === 'fr' ? 'Enterrement de vie de célibataire dans le Verdon' : 'Bachelor/bachelorette party in the Verdon'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block mb-2">
                    {locale === 'fr' ? "ENTERREMENT DE VIE DE CÉLIBATAIRE" : "BACHELOR / BACHELORETTE PARTY"}
                  </span>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tight">
                    {locale === 'fr' ? "Cohésion, Rires & Sensations Fortes" : "Cohesion, Laughter & Great Thrills"}
                  </h4>
                </div>
              </div>

              {/* Photo 2 */}
              <div className="group overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl relative aspect-[4/3] bg-slate-100">
                <Image
                  src="/assets/evenementiel/event2.jpg.jpeg"
                  alt={locale === 'fr' ? 'Séminaire et team building dans le Verdon' : 'Corporate seminar and team building in the Verdon'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block mb-2">
                    {locale === 'fr' ? "SÉMINAIRES & COLLECTIVITÉS" : "CORPORATE EVENTS & LOCAL GOVERNMENTS"}
                  </span>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tight">
                    {locale === 'fr' ? "Renforcer la synergie d'équipe en pleine nature" : "Strengthen team synergy in the wild"}
                  </h4>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    );
  }

  // Fetch activities from Sanity belonging to the resolved category slug
  const activities = await client.fetch(`
    *[_type == "activity" && category->slug.current == $sanityCategory] {
      _id,
      "title": title[$locale],
      slug,
      "subtitle": subtitle[$locale],
      price,
      minAge,
      duration,
      "imageUrl": coalesce(mainImage.asset->url, images[0].asset->url),
      "difficultyGroup": difficultyGroup[$locale]
    }
  `, { sanityCategory, locale });

  // Custom sorting: Ensure "Trou du Renard" is sorted before "Main Morte"
  activities.sort((a: any, b: any) => {
    const aTitle = (a.title || '').toLowerCase();
    const bTitle = (b.title || '').toLowerCase();
    if (aTitle.includes('renard') || aTitle.includes('fox')) return -1;
    if (bTitle.includes('renard') || bTitle.includes('fox')) return 1;
    return 0;
  });

  // Check if we should group them by difficulty
  const hasDifficultyGrouping = activities.some((act: any) => act.difficultyGroup);

  // Group activities if grouping is active
  const groupedActivities: Record<string, any[]> = {};
  const ungroupedActivities: any[] = [];

  if (hasDifficultyGrouping) {
    activities.forEach((act: any) => {
      if (act.difficultyGroup) {
        if (!groupedActivities[act.difficultyGroup]) {
          groupedActivities[act.difficultyGroup] = [];
        }
        groupedActivities[act.difficultyGroup].push(act);
      } else {
        ungroupedActivities.push(act);
      }
    });
  }

  // Predefined logical order of difficulty headings
  const difficultyOrder = [
    "Demi journée découverte en famille",
    "Family discovery half day",
    "Demi journée découverte entre amis",
    "Friends discovery half day",
    "Canyon demi-journée sportive",
    "Sporty half day canyon",
    "Canyon journée sportive",
    "Sporty full day canyon"
  ];

  const sortedGroupedEntries = Object.entries(groupedActivities).sort(([aName], [bName]) => {
    const aIndex = difficultyOrder.indexOf(aName);
    const bIndex = difficultyOrder.indexOf(bName);
    if (aIndex === -1 && bIndex === -1) return aName.localeCompare(bName);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section for Category - Cinematic Version */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <span className={`${colors.text} font-black uppercase tracking-[0.4em] text-xs mb-6 block drop-shadow-lg`}>
            {activityData.tagline}
          </span>
          <h1 className={`text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8 text-white-shadow ${colors.text}`}>
            {activityData.name}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed text-white-shadow mb-10">
            {activityData.description}
          </p>
          <a 
            href="#booking" 
            className="button-glow transition-all duration-300"
            style={{
              background: colors.hex
            }}
          >
            RÉSERVER VOTRE SORTIE
          </a>
        </div>
      </section>

      {/* Info Bar */}
      <section className="py-12 bg-slate-50 border-b border-slate-100 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
            <div className="flex-grow">
              <p className={`text-slate-600 font-medium leading-relaxed italic border-l-4 ${colors.border} pl-6`}>
                {activityData.info}
              </p>
            </div>
            {activityData.logistics && (
              <div className="lg:w-1/3 bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  {activityData.logistics}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="py-24 px-6 bg-white" id="booking">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-4">
                {locale === 'fr' ? 'Notre Sélection' : 'Our Selection'}
              </h2>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">
                {locale === 'fr' ? 'Découvrez nos parcours phares' : 'Discover our signature outings'}
              </p>
            </div>
            <div className="hidden md:block w-px h-20 bg-slate-100 mx-12" />
            <div className="hidden md:block max-w-md">
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                {locale === 'fr'
                  ? "Chaque parcours est encadré par un guide diplômé d'État passionné par son métier et son territoire."
                  : 'Every outing is led by a state-certified guide passionate about their craft and their region.'}
              </p>
            </div>
          </div>

          {/* Grouped Activities display */}
          {hasDifficultyGrouping ? (
            <div className="space-y-24">
              {sortedGroupedEntries.map(([groupName, groupActs]) => (
                <div key={groupName} className="space-y-10">
                  <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                    <span className={`w-8 h-1.5 rounded-full ${colors.bg}`} />
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter">
                      {groupName}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {groupActs.map((activity) => (
                      <Link 
                        href={`/${locale}/${category}/${activity.slug.current}`}
                        prefetch={false}
                        key={activity._id}
                        className={`group card-promax overflow-hidden transition-all duration-500 ${colors.hoverBorder}`}
                      >
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={activity.imageUrl || bgImage}
                            alt={activity.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg z-20">
                            <span className={`text-xs font-black ${colors.text} uppercase`}>{locale === 'fr' ? 'À partir de' : 'From'} {activity.price}€</span>
                          </div>
                        </div>
                        <div className="p-8">
                          <p className={`text-[10px] font-black ${colors.text} uppercase tracking-[0.2em] mb-3`}>{activity.subtitle}</p>
                          <h3 className={`text-2xl font-black ${colors.text} mb-6 uppercase tracking-tighter leading-tight transition-colors`}>
                            {activity.title}
                          </h3>
                          <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                            <div className="flex flex-col">
                              <span className="text-[9px] font-black text-slate-500 uppercase mb-1">{locale === 'fr' ? 'Âge min.' : 'Min. age'}</span>
                              <span className="text-sm font-bold text-slate-900">{activity.minAge} ans</span>
                            </div>
                            <div className="flex flex-col text-right">
                              <span className="text-[9px] font-black text-slate-500 uppercase mb-1">{locale === 'fr' ? 'Durée' : 'Duration'}</span>
                              <span className="text-sm font-bold text-slate-900">{activity.duration}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Ungrouped Activities fallback */}
              {ungroupedActivities.length > 0 && (
                <div className="space-y-10 pt-10 border-t border-slate-100">
                  <div className="flex items-center gap-4 pb-4">
                    <span className="w-8 h-1.5 rounded-full bg-slate-400" />
                    <h3 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tighter">
                      {locale === 'fr' ? 'Autres parcours' : 'Other tours'}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {ungroupedActivities.map((activity) => (
                      <Link 
                        href={`/${locale}/${category}/${activity.slug.current}`}
                        prefetch={false}
                        key={activity._id}
                        className="group card-promax overflow-hidden transition-all duration-500 hover:border-slate-300"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={activity.imageUrl || bgImage}
                            alt={activity.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg z-20">
                            <span className="text-xs font-black text-slate-600 uppercase">{locale === 'fr' ? 'À partir de' : 'From'} {activity.price}€</span>
                          </div>
                        </div>
                        <div className="p-8">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{activity.subtitle}</p>
                          <h3 className="text-2xl font-black text-slate-800 mb-6 uppercase tracking-tighter leading-tight transition-colors">
                            {activity.title}
                          </h3>
                          <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                            <div className="flex flex-col">
                              <span className="text-[9px] font-black text-slate-500 uppercase mb-1">{locale === 'fr' ? 'Âge min.' : 'Min. age'}</span>
                              <span className="text-sm font-bold text-slate-900">{activity.minAge} ans</span>
                            </div>
                            <div className="flex flex-col text-right">
                              <span className="text-[9px] font-black text-slate-500 uppercase mb-1">{locale === 'fr' ? 'Durée' : 'Duration'}</span>
                              <span className="text-sm font-bold text-slate-900">{activity.duration}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Standard Flat Grid Layout */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {activities.map((activity: any) => (
                <Link 
                  href={`/${locale}/${category}/${activity.slug.current}`}
                  prefetch={false}
                  key={activity._id}
                  className={`group card-promax overflow-hidden transition-all duration-500 ${colors.hoverBorder}`}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={activity.imageUrl || bgImage}
                      alt={activity.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg z-20">
                      <span className={`text-xs font-black ${colors.text} uppercase`}>{locale === 'fr' ? 'À partir de' : 'From'} {activity.price}€</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className={`text-[10px] font-black ${colors.text} uppercase tracking-[0.2em] mb-3`}>{activity.subtitle}</p>
                    <h3 className={`text-2xl font-black ${colors.text} mb-6 uppercase tracking-tighter leading-tight transition-colors`}>
                      {activity.title}
                    </h3>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-500 uppercase mb-1">{locale === 'fr' ? 'Âge min.' : 'Min. age'}</span>
                        <span className="text-sm font-bold text-slate-900">{activity.minAge} ans</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[9px] font-black text-slate-500 uppercase mb-1">{locale === 'fr' ? 'Durée' : 'Duration'}</span>
                        <span className="text-sm font-bold text-slate-900">{activity.duration}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Photo Gallery Section */}
      {dictKey === 'insolite' && (
        <section className="py-24 px-6 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
                {locale === 'fr' ? 'Galerie Photos' : 'Photo Gallery'}
              </h2>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">
                {locale === 'fr' ? "Un avant-goût de l'aventure insolite" : 'A taste of the unusual adventure'}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 12 }, (_, i) => {
                const num = String(i + 1).padStart(5, '0');
                return (
                  <div
                    key={num}
                    className={`group overflow-hidden rounded-[2rem] border-4 border-white shadow-xl relative aspect-square bg-slate-100 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${colors.hoverBorder}`}
                  >
                    <Image
                      src={`/assets/insolite/gallerie/portaledgesitelinstantverdon${num}.jpg`}
                      alt={`Activité insolite Verdon ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
