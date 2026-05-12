import { client } from '@/sanity/client';
import { getDictionary } from '@/lib/dictionaries';
import Link from 'next/link';

export default async function CategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale, category } = await params;
  const dict = getDictionary(locale as 'fr' | 'en');
  
  // Type-safe activity data fetch
  const activityData = category !== 'title' ? (dict.activities as any)[category] : null;

  if (!activityData || typeof activityData === 'string') return <div>Category not found</div>;

  const imageMapping: Record<string, string> = {
    canyoning: '/assets/canyon/canyon.jpeg',
    escalade: '/assets/escalade/climbing.jpeg',
    aventures: '/assets/aventures/adventure.jpeg',
    stages: '/assets/week%20end%20stage/weekend.webp',
    insolite: '/assets/insolite/unusual2.webp',
    evenementiel: '/assets/evenementiel/events.jpg.jpeg',
  };

  const bgImage = imageMapping[category] || '/assets/canyon/canyon-verdon.jpg';

  // Fetch activities from Sanity
  const activities = await client.fetch(`
    *[_type == "activity" && category->slug.current == $category] {
      _id,
      "title": title[$locale],
      slug,
      "subtitle": subtitle[$locale],
      price,
      minAge,
      duration,
      "imageUrl": images[0].asset->url
    }
  `, { category, locale });

  if (!activityData) return <div>Category not found</div>;

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
          <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-6 block drop-shadow-lg">
            {activityData.tagline}
          </span>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8 text-white-shadow">
            {activityData.name}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed text-white-shadow mb-10">
            {activityData.description}
          </p>
          <a href="#booking" className="button-glow">
            RÉSERVER VOTRE SORTIE
          </a>
        </div>
      </section>

      {/* Info Bar */}
      <section className="py-12 bg-slate-50 border-b border-slate-100 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
            <div className="flex-grow">
              <p className="text-slate-600 font-medium leading-relaxed italic border-l-4 border-primary pl-6">
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
      <section className="py-24 px-6 bg-white">
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
            {activityData.sections?.map((section: any, idx: number) => (
              <div key={idx} className="group cursor-default">
                <div className="relative mb-8 overflow-hidden rounded-3xl aspect-[4/5] bg-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <div className="absolute bottom-8 left-8 right-8 z-20">
                    <p className="text-primary font-black text-[10px] uppercase tracking-widest mb-2">{section.title}</p>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">{section.title}</h3>
                  </div>
                </div>
                <div className="space-y-4">
                  <ul className="space-y-3">
                    {section.points?.map((point: string, pIdx: number) => (
                      <li key={pIdx} className="flex items-start gap-3 text-slate-600 text-sm font-medium leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                     <Link 
                      href={`/${locale}/contact`}
                      className="text-[10px] font-black text-slate-900 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2 group/link"
                    >
                      En savoir plus <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Sanity Activities */}
            {activities.map((activity: any) => (
              <Link 
                href={`/${locale}/${category}/${activity.slug.current}`}
                key={activity._id}
                className="group card-promax overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={activity.imageUrl} 
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg z-20">
                    <span className="text-xs font-black text-primary uppercase">À partir de {activity.price}€</span>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">{activity.subtitle}</p>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors">
                    {activity.title}
                  </h3>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-300 uppercase mb-1">Âge min.</span>
                      <span className="text-sm font-bold text-slate-900">{activity.minAge} ans</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[9px] font-black text-slate-300 uppercase mb-1">Durée</span>
                      <span className="text-sm font-bold text-slate-900">{activity.duration}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
