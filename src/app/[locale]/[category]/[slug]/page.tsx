import type { Metadata } from 'next';
import Image from 'next/image';
import { client } from '@/sanity/client';
import { getDictionary } from '@/lib/dictionaries';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { ChevronLeft, Clock, Users, Euro, MapPin, CheckCircle2 } from 'lucide-react';
import ActivityTabs from '@/components/ActivityTabs';
import { parseMarkdown } from '@/lib/markdown';
import BookingCTA from '@/components/BookingCTA';
import TourSchema from '@/components/TourSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

const slugCategoryAlt: Record<string, { fr: string; en: string }> = {
  canyoning:    { fr: 'canyoning',    en: 'canyoning' },
  canyon:       { fr: 'canyoning',    en: 'canyoning' },
  escalade:     { fr: 'escalade',     en: 'climbing' },
  climbing:     { fr: 'escalade',     en: 'climbing' },
  aventures:    { fr: 'aventures',    en: 'adventure' },
  adventure:    { fr: 'aventures',    en: 'adventure' },
  insolite:     { fr: 'insolite',     en: 'unusual-activities' },
  'unusual-activities': { fr: 'insolite', en: 'unusual-activities' },
  stages:       { fr: 'stages',       en: 'weekend' },
  weekend:      { fr: 'stages',       en: 'weekend' },
  evenementiel: { fr: 'evenementiel', en: 'evenementiel' },
}

// Sanity category document slug -> canonical URL segment per locale.
// Used to redirect wrong-locale/alias URL combos (e.g. /en/escalade/...,
// /fr/canyon/...) to the one true canonical URL instead of serving a
// self-canonicalizing duplicate.
const categoryUrlMap: Record<string, { fr: string; en: string }> = {
  canyoning:    { fr: 'canyoning',    en: 'canyoning' },
  climbing:     { fr: 'escalade',     en: 'climbing' },
  aventures:    { fr: 'aventures',    en: 'adventure' },
  insolite:     { fr: 'insolite',     en: 'unusual-activities' },
  weekend:      { fr: 'stages',       en: 'weekend' },
  evenementiel: { fr: 'evenementiel', en: 'evenementiel' },
}

export const revalidate = 86400;

export async function generateStaticParams() {
  const activities = await client.fetch(`*[_type == "activity"]{ "slug": slug.current, "category": category->slug.current }`);
  const locales = ['fr', 'en'] as const;
  const params = [];

  for (const activity of activities) {
    if (!activity.slug || !activity.category) continue;
    const map = categoryUrlMap[activity.category];
    if (!map) continue;
    for (const locale of locales) {
      params.push({
        locale,
        category: map[locale],
        slug: activity.slug,
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string; slug: string }> }): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const activity = await client.fetch<{ title: string; description: string; price: number; mainImageUrl: string } | null>(`
    *[_type == "activity" && slug.current == $slug][0] {
      "title": title[$locale],
      "description": description[$locale],
      price,
      "mainImageUrl": mainImage.asset->url
    }
  `, { slug: decodedSlug, locale });

  if (!activity) return {}

  const title = `${activity.title} — Gorges du Verdon | L'instant Verdon`
  const description = activity.description
    ? `${activity.description.slice(0, 140)}…`
    : `Activité ${activity.title} dans les Gorges du Verdon avec L'instant Verdon. Guides diplômés d'État.`

  const altUrls = slugCategoryAlt[category] || { fr: category, en: category }
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/${category}/${decodedSlug}`,
      languages: {
        fr: `/fr/${altUrls.fr}/${decodedSlug}`,
        en: `/en/${altUrls.en}/${decodedSlug}`,
        'x-default': `/fr/${altUrls.fr}/${decodedSlug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/${category}/${decodedSlug}`,
      images: activity.mainImageUrl ? [{ url: activity.mainImageUrl, width: 1200, height: 630, alt: activity.title }] : undefined,
    },
  }
}

// Helper to convert YouTube link into embed url
function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11)
    ? `https://www.youtube.com/embed/${match[2]}`
    : null;
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ locale: string; category: string; slug: string }> }) {
  const { locale, category, slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const dict = getDictionary(locale as 'fr' | 'en');

  // Fetch outing from Sanity with complete tab details
  const activity = await client.fetch(`
    *[_type == "activity" && slug.current == $slug][0] {
      "title": title[$locale],
      "subtitle": subtitle[$locale],
      "description": description[$locale],
      price,
      "priceDetails": priceDetails[$locale],
      showStartingFrom,
      minAge,
      duration,
      approachTime,
      returnTime,
      "obstacles": obstacles[$locale],
      meetingPoint,
      googleMapsUrl,
      videoUrl,
      bookingUrl,
      "included": included[$locale],
      "requirements": requirements[$locale],
      "provided": provided[$locale],
      "toBring": toBring[$locale],
      "mainImageUrl": mainImage.asset->url,
      "images": images[].asset->url,
      "categorySlug": category->slug.current
    }
  `, { slug: decodedSlug, locale });

  if (!activity) notFound();

  // The category segment in the URL must match this activity's real category
  // for this locale — otherwise this is a wrong-locale/alias duplicate
  // (e.g. /en/escalade/... or /fr/canyon/...). Send it to the one true URL
  // instead of rendering a self-canonicalizing copy.
  const canonicalCategory = categoryUrlMap[activity.categorySlug]?.[locale as 'fr' | 'en'];
  if (canonicalCategory && canonicalCategory !== category) {
    permanentRedirect(`/${locale}/${canonicalCategory}/${decodedSlug}`);
  }

  // Map user categories for slug normalizations
  const dictKeyMap: Record<string, string> = {
    canyoning: 'canyoning',
    canyon: 'canyoning',
    climbing: 'escalade',
    escalade: 'escalade',
    adventure: 'aventures',
    aventures: 'aventures',
    'unusual-activities': 'insolite',
    insolite: 'insolite',
    stages: 'stages',
    evenementiel: 'evenementiel'
  };
  const dictKey = dictKeyMap[category] || category;

  // Category specific premium theme styling
  const categoryColorMap: Record<string, { text: string; bg: string; border: string; bgGlow: string; hex: string }> = {
    canyoning: {
      text: 'text-canyoning-blue',
      bg: 'bg-canyoning-blue',
      border: 'border-canyoning-blue',
      bgGlow: 'bg-canyoning-blue/10',
      hex: '#109ea5'
    },
    canyon: {
      text: 'text-canyoning-blue',
      bg: 'bg-canyoning-blue',
      border: 'border-canyoning-blue',
      bgGlow: 'bg-canyoning-blue/10',
      hex: '#109ea5'
    },
    climbing: {
      text: 'text-logo-teal',
      bg: 'bg-logo-teal',
      border: 'border-logo-teal',
      bgGlow: 'bg-logo-teal/10',
      hex: '#10a18b'
    },
    escalade: {
      text: 'text-logo-teal',
      bg: 'bg-logo-teal',
      border: 'border-logo-teal',
      bgGlow: 'bg-logo-teal/10',
      hex: '#10a18b'
    },
    aventures: {
      text: 'text-logo-peach',
      bg: 'bg-logo-peach',
      border: 'border-logo-peach',
      bgGlow: 'bg-logo-peach/10',
      hex: '#f7a271'
    },
    adventure: {
      text: 'text-logo-peach',
      bg: 'bg-logo-peach',
      border: 'border-logo-peach',
      bgGlow: 'bg-logo-peach/10',
      hex: '#f7a271'
    },
    stages: {
      text: 'text-stages-purple',
      bg: 'bg-stages-purple',
      border: 'border-stages-purple',
      bgGlow: 'bg-stages-purple/10',
      hex: '#ca769e'
    },
    insolite: {
      text: 'text-logo-pink',
      bg: 'bg-logo-pink',
      border: 'border-logo-pink',
      bgGlow: 'bg-logo-pink/10',
      hex: '#ca769e'
    },
    'unusual-activities': {
      text: 'text-logo-pink',
      bg: 'bg-logo-pink',
      border: 'border-logo-pink',
      bgGlow: 'bg-logo-pink/10',
      hex: '#ca769e'
    },
    evenementiel: {
      text: 'text-event-rose',
      bg: 'bg-event-rose',
      border: 'border-event-rose',
      bgGlow: 'bg-event-rose/10',
      hex: '#ca769e'
    },
  };

  const colors = categoryColorMap[dictKey] || {
    text: 'text-primary',
    bg: 'bg-primary',
    border: 'border-primary',
    bgGlow: 'bg-primary/10',
    hex: '#10a18b'
  };

  const defaultHero = category === 'climbing' || category === 'escalade'
    ? '/assets/escalade/climbing.jpeg' 
    : '/assets/canyon/canyon.jpeg';
  const heroImage = activity.mainImageUrl || activity.images?.[0] || defaultHero;
  
  const embedVideoUrl = getYouTubeEmbedUrl(activity.videoUrl);

  // Normalizing active sports theme key for tabs component styling
  const tabThemeKey = (category === 'canyon' || category === 'canyoning') ? 'canyoning' : 
                     (category === 'climbing' || category === 'escalade') ? 'climbing' : 
                     (category === 'adventure' || category === 'aventures') ? 'aventures' :
                     (category === 'unusual-activities' || category === 'insolite') ? 'insolite' :
                     (category === 'weekend' || category === 'stages') ? 'stages' : 'default';

  const activityUrl = `https://www.linstantverdon.com/${locale}/${category}/${decodedSlug}`;

  return (
    <main className="min-h-screen bg-slate-50/50">
      <TourSchema
        name={activity.title}
        description={activity.description}
        image={activity.mainImageUrl}
        url={activityUrl}
        price={activity.price}
        minAge={activity.minAge}
        duration={activity.duration}
        locale={locale}
      />
      <BreadcrumbSchema
        items={[
          { name: locale === 'fr' ? 'Accueil' : 'Home', url: `https://www.linstantverdon.com/${locale}` },
          { name: dict.nav[dictKey as keyof typeof dict.nav] || category, url: `https://www.linstantverdon.com/${locale}/${category}` },
          { name: activity.title, url: activityUrl },
        ]}
      />
      {/* Cinematic Hero */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <Link 
            href={`/${locale}/${category}`} 
            className={`${colors.text} font-black text-[10px] mb-8 inline-flex items-center gap-3 hover:text-white transition-colors uppercase tracking-[0.4em] drop-shadow-xl bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10`}
          >
            <ChevronLeft size={14} className={colors.text} /> 
            {dict.nav[dictKey as keyof typeof dict.nav] || category}
          </Link>
          <h1 className={`text-4xl md:text-7xl font-black ${colors.text} uppercase tracking-tighter leading-none mb-6 text-white-shadow`}>
            {activity.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-black tracking-[0.2em] uppercase text-white-shadow">
            {activity.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Description */}
            <div className="prose prose-xl max-w-none">
              <h2 className={`text-3xl md:text-4xl font-black ${colors.text} uppercase tracking-tighter mb-6 flex items-center gap-3`}>
                <span className={`w-8 h-1 rounded-full ${colors.bg}`} /> {locale === 'fr' ? 'Description' : 'Overview'}
              </h2>
              <div className="text-slate-600 leading-relaxed font-semibold text-base md:text-lg">
                {parseMarkdown(activity.description)}
              </div>
            </div>

            {/* Dynamic Tabs Component */}
            <div className="border-t border-slate-200/50 pt-10">
              <ActivityTabs 
                locale={locale} 
                categoryTheme={tabThemeKey} 
                data={{
                  meetingPoint: activity.meetingPoint,
                  googleMapsUrl: activity.googleMapsUrl,
                  price: activity.price,
                  priceDetails: activity.priceDetails,
                  minAge: activity.minAge,
                  duration: activity.duration,
                  approachTime: activity.approachTime,
                  returnTime: activity.returnTime,
                  obstacles: activity.obstacles,
                  provided: activity.provided,
                  toBring: activity.toBring
                }}
              />
            </div>

            {/* Video (YouTube embed) */}
            {embedVideoUrl && (
              <div className="space-y-6 border-t border-slate-200/50 pt-12">
                <h3 className={`text-2xl md:text-3xl font-black ${colors.text} uppercase tracking-tighter flex items-center gap-3`}>
                  <span className={`w-8 h-1 rounded-full ${colors.bg}`} /> 🎥 Aperçu Vidéo
                </h3>
                <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                  <iframe
                    src={embedVideoUrl}
                    title="Aperçu vidéo de l'activité"
                    width="100%"
                    height="100%"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Photo Gallery */}
            {activity.images && activity.images.length > 1 && (
              <div className="space-y-6 border-t border-slate-200/50 pt-12">
                <h3 className={`text-2xl md:text-3xl font-black ${colors.text} uppercase tracking-tighter flex items-center gap-3`}>
                  <span className={`w-8 h-1 rounded-full ${colors.bg}`} /> 📸 {locale === 'fr' ? 'Galerie Photos' : 'Photo Gallery'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {activity.images.slice(1).map((imgUrl: string, idx: number) => (
                    <div 
                      key={idx} 
                      className="rounded-[2rem] overflow-hidden aspect-video shadow-xl border border-white hover:scale-[1.03] transition-all duration-500 group relative"
                    >
                      <Image
                        src={imgUrl}
                        alt={`${activity.title} — photo ${idx + 2}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar / Quick Booking Card */}
          <div className="space-y-8">
            <div className="glass-card p-8 md:p-10 rounded-[3rem] border border-white shadow-2xl space-y-8 sticky top-28 bg-white/80">

              {/* Quick specs — always visible, not hidden behind a tab click.
                  First-time visitors' top questions (price / how long / age
                  minimum) answered at a glance. */}
              <div className="grid grid-cols-3 gap-3 pb-2">
                <div className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <Euro size={18} className={`mx-auto mb-1.5 ${colors.text}`} />
                  <div className="text-sm font-black text-slate-900 leading-tight">
                    {activity.priceDetails || (activity.price ? `${activity.price}€` : '—')}
                  </div>
                  <div className="text-[9px] uppercase font-bold tracking-wider text-slate-400 mt-0.5">
                    {locale === 'fr' ? 'Prix / pers.' : 'Price / person'}
                  </div>
                </div>
                <div className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <Clock size={18} className={`mx-auto mb-1.5 ${colors.text}`} />
                  <div className="text-sm font-black text-slate-900 leading-tight">
                    {activity.duration || '—'}
                  </div>
                  <div className="text-[9px] uppercase font-bold tracking-wider text-slate-400 mt-0.5">
                    {locale === 'fr' ? 'Durée' : 'Duration'}
                  </div>
                </div>
                <div className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <Users size={18} className={`mx-auto mb-1.5 ${colors.text}`} />
                  <div className="text-sm font-black text-slate-900 leading-tight">
                    {activity.minAge ? (locale === 'fr' ? `${activity.minAge} ans+` : `${activity.minAge}+ yrs`) : '—'}
                  </div>
                  <div className="text-[9px] uppercase font-bold tracking-wider text-slate-400 mt-0.5">
                    {locale === 'fr' ? 'Âge min.' : 'Min. age'}
                  </div>
                </div>
              </div>

              {/* Included / Requirements in Sidebar */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs uppercase font-black tracking-widest text-slate-600 mb-4">{locale === 'fr' ? 'Ce qui est inclus' : "What's included"}</h4>
                  <ul className="space-y-3">
                    {activity.included && activity.included.length > 0 ? (
                      activity.included.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-semibold leading-relaxed">
                          <CheckCircle2 size={17} className={`shrink-0 mt-0.5 ${colors.text}`} />
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-slate-600 font-semibold italic">
                        {locale === 'fr' ? 'Matériel technique complet' : 'Full technical equipment'}
                      </li>
                    )}
                  </ul>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h4 className="text-xs uppercase font-black tracking-widest text-slate-600 mb-4">{locale === 'fr' ? 'Pré-requis' : 'Requirements'}</h4>
                  <ul className="space-y-3">
                    {activity.requirements && activity.requirements.length > 0 ? (
                      activity.requirements.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-semibold leading-relaxed">
                          <CheckCircle2 size={17} className="shrink-0 mt-0.5 text-slate-400" />
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-slate-600 font-semibold italic">
                        {locale === 'fr' ? 'Savoir nager' : 'Must know how to swim'}
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Call To Action */}
              <BookingCTA
                bookingUrl={activity.bookingUrl}
                contactUrl={`/${locale}/contact`}
                price={activity.price}
                showStartingFrom={activity.showStartingFrom}
                colors={colors}
                locale={locale}
              />

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
