import { client } from '@/sanity/client';
import { getDictionary } from '@/lib/dictionaries';
import Link from 'next/link';
import { ChevronLeft, Clock, Users, Euro, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export default async function ActivityDetailPage({ params }: { params: Promise<{ locale: string; category: string; slug: string }> }) {
  const { locale, category, slug } = await params;
  const dict = getDictionary(locale as 'fr' | 'en');

  const activity = await client.fetch(`
    *[_type == "activity" && slug.current == $slug][0] {
      "title": title[$locale],
      "subtitle": subtitle[$locale],
      "description": description[$locale],
      price,
      minAge,
      duration,
      included,
      requirements,
      "images": images[].asset->url,
      meetingPoint
    }
  `, { slug, locale });

  const imageMapping: Record<string, string> = {
    canyoning: '/assets/canyon/canyon.jpeg',
    escalade: '/assets/escalade/climbing.jpeg',
    aventures: '/assets/aventures/adventure.jpeg',
    stages: '/assets/week%20end%20stage/weekend.webp',
    insolite: '/assets/insolite/unusual2.webp',
    evenementiel: '/assets/evenementiel/events.jpg.jpeg',
  };

  if (!activity) return <div>Activity not found</div>;

  const heroImage = activity.images?.[0] || imageMapping[category] || '/assets/canyon/canyon-verdon.jpg';

  return (
    <main className="min-h-screen bg-white">
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] scale-105 group-hover:scale-100"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <Link href={`/${locale}/${category}`} className="text-primary font-black text-[10px] mb-8 inline-flex items-center gap-3 hover:text-white transition-colors uppercase tracking-[0.4em] drop-shadow-xl bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
            <ChevronLeft size={14} className="text-primary" /> {category}
          </Link>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6 text-white-shadow">
            {activity.title}
          </h1>
          <p className="text-xl text-white/80 font-black tracking-[0.2em] uppercase text-white-shadow">
            {activity.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <div className="prose prose-xl max-w-none">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8">Présentation</h2>
              <p className="text-slate-600 leading-relaxed font-medium text-lg">
                {activity.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                  <span className="w-8 h-px bg-primary" /> Ce qui est inclus
                </h3>
                <ul className="space-y-4">
                  {activity.included?.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-600 font-medium">
                      <CheckCircle2 size={18} className="text-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                  <span className="w-8 h-px bg-primary" /> Pré-requis
                </h3>
                <ul className="space-y-4">
                  {activity.requirements?.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-600 font-medium">
                      <CheckCircle2 size={18} className="text-slate-300" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-2 gap-6">
              {activity.images?.slice(1, 3).map((img: string, idx: number) => (
                <div key={idx} className="rounded-3xl overflow-hidden aspect-video shadow-xl border border-slate-100">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar / Stats */}
          <div className="space-y-10">
            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 space-y-8 sticky top-32">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Tarif</span>
                <span className="text-4xl font-black text-primary">{activity.price}€</span>
              </div>
              
              <div className="space-y-6 border-t border-slate-200 pt-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm border border-slate-100">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Durée</p>
                    <p className="font-bold text-slate-900">{activity.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm border border-slate-100">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Âge minimum</p>
                    <p className="font-bold text-slate-900">{activity.minAge} ans</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm border border-slate-100">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Rendez-vous</p>
                    <p className="font-bold text-slate-900 leading-tight">{activity.meetingPoint}</p>
                  </div>
                </div>
              </div>

              <Link href={`/${locale}/contact`} className="button-glow w-full text-center">
                RÉSERVER MAINTENANT
              </Link>

              <p className="text-[10px] text-slate-400 text-center font-medium">
                Paiement sur place • Réservation obligatoire
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
