import { client } from '@/sanity/client';
import { getDictionary } from '@/lib/dictionaries';
import Link from 'next/link';
import Image from 'next/image';

export default async function CategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale, category } = await params;
  const dict = getDictionary(locale as 'fr' | 'en');
  
  // Normalization maps for URL routing
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
    weekend: 'stages',
    evenementiel: 'evenementiel'
  };
  
  const dictKey = dictKeyMap[category] || category;

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

  if (!activityData || typeof activityData === 'string') return <div className="p-20 text-center font-bold text-slate-800">Category not found</div>;

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
                <img 
                  src="/assets/evenementiel/event1.jpg.jpeg" 
                  alt="Événementiel Photo 1" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                <img 
                  src="/assets/evenementiel/event2.jpg.jpeg" 
                  alt="Événementiel Photo 2" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
      "imageUrl": coalesce(mainImage.asset->url, images[0].asset->url)
    }
  `, { sanityCategory, locale });

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
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-4">Notre Sélection</h2>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Découvrez nos parcours phares</p>
            </div>
            <div className="hidden md:block w-px h-20 bg-slate-100 mx-12" />
            <div className="hidden md:block max-w-md">
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Chaque parcours est encadré par un guide diplômé d'État passionné par son métier et son territoire.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Sanity Activities */}
            {activities.map((activity: any) => (
              <Link 
                href={`/${locale}/${category}/${activity.slug.current}`}
                key={activity._id}
                className={`group card-promax overflow-hidden transition-all duration-500 ${colors.hoverBorder}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={activity.imageUrl || bgImage} 
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg z-20">
                    <span className={`text-xs font-black ${colors.text} uppercase`}>À partir de {activity.price}€</span>
                  </div>
                </div>
                <div className="p-8">
                  <p className={`text-[10px] font-black ${colors.text} uppercase tracking-[0.2em] mb-3`}>{activity.subtitle}</p>
                  <h3 className={`text-2xl font-black ${colors.text} mb-6 uppercase tracking-tighter leading-tight transition-colors`}>
                    {activity.title}
                  </h3>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-500 uppercase mb-1">Âge min.</span>
                      <span className="text-sm font-bold text-slate-900">{activity.minAge} ans</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[9px] font-black text-slate-500 uppercase mb-1">Durée</span>
                      <span className="text-sm font-bold text-slate-900">{activity.duration}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
