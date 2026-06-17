import { getDictionary } from '@/lib/dictionaries';
import Navbar from '@/components/Navbar';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale as 'fr' | 'en');

  return (
    <main className="min-h-screen bg-white">
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('/assets/accueil/about-us.webp')` }}
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-6 block drop-shadow-lg">
            {dict.about.tagline}
          </span>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white-shadow">
            {dict.nav.about}
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24">
        
        <div className="space-y-32">
          <p className="text-slate-600 text-2xl md:text-3xl font-bold italic leading-tight max-w-4xl border-l-4 border-primary pl-8 py-4">
            L’Instant Verdon est né d’une passion commune pour les grands espaces et l’aventure. 
            Basés à Castellane, au cœur des Gorges du Verdon, nous vous accompagnons dans vos explorations les plus sauvages.
          </p>
          
          {/* Emma */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] rotate-2 group-hover:rotate-0 transition-transform duration-700" />
              <div className="relative card-promax h-[500px] overflow-hidden rounded-[2.5rem]">
                <img src="/assets/a propos/emma.JPG.jpeg" alt="Emma Aglaé" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4">Cofondatrice & Guide</p>
              <h2 className="text-5xl font-black mb-8 text-[#109ea5] uppercase tracking-tighter">Emma Aglaé</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                {dict.about.emma}
              </p>
            </div>
          </div>

          {/* Angèle */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <p className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4">Guide Escalade & Canyon</p>
              <h2 className="text-5xl font-black mb-8 text-[#109ea5] uppercase tracking-tighter">Angèle Kanapa</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                {dict.about.angele}
              </p>
            </div>
            <div className="relative group order-1 lg:order-2">
              <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] -rotate-2 group-hover:rotate-0 transition-transform duration-700" />
              <div className="relative card-promax h-[500px] overflow-hidden rounded-[2.5rem]">
                <img src="/assets/a propos/angele.jpg.jpeg" alt="Angèle Kanapa" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
            </div>
          </div>

          {/* Marie */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] rotate-2 group-hover:rotate-0 transition-transform duration-700" />
              <div className="relative card-promax h-[500px] overflow-hidden rounded-[2.5rem]">
                <img src="/assets/a propos/marie.JPG.jpeg" alt="Marie Oddo" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4">Guide Escalade & Canyon</p>
              <h2 className="text-5xl font-black mb-8 text-[#109ea5] uppercase tracking-tighter">Marie Oddo</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                {dict.about.marie}
              </p>
            </div>
          </div>

          <div className="p-12 bg-slate-50 rounded-[3rem] border border-slate-100 text-center max-w-4xl mx-auto">
            <p className="text-slate-600 text-xl font-medium leading-relaxed italic">
              {dict.about.ecology}
            </p>
          </div>

          {/* Partenaires Section */}
          <div className="pt-24 space-y-20">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black text-[#109ea5] uppercase tracking-tighter mb-4">Nos Partenaires</h2>
              <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">Ils nous font confiance et partagent nos valeurs</p>
            </div>

            {/* Activités */}
            <div className="space-y-12">
              <h3 className="text-xl font-black text-[#109ea5] uppercase tracking-[0.3em] text-center">Activités</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "Verdon tourisme", img: "verdontourisme.webp", url: "https://www.verdontourisme.com" },
                  { name: "Azur Canyoning", img: "azur-canyoning.jpeg", url: "https://www.azurcanyoning.com" },
                  { name: "Ardèche Canyon Aventure", img: "ardeche-canyon-aventure.png", url: "https://www.ardechecanyonaventure.com" },
                  { name: "Koala Grimpe", img: "koala-grimpe.jpg.jpeg", url: "http://www.koalagrimpe.com" },
                  { name: "Val de Grimpe", img: "val-de-grimpe.webp", url: "https://www.valdegrimpe.com" },
                  { name: "Latitude Challenge", img: "latitude-challenge.png", url: "https://www.latitude-challenge.fr" },
                  { name: "Le cheval et soleil", img: "logo-cheval.jpg.jpeg", url: "https://www.facebook.com/chevaletsoleil/" },
                  { name: "Canyon Arrangé", img: "canyon-arrange-logo.png.webp", url: "https://canyon-arrange.re" },
                ].map(p => (
                  <a 
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={p.name} 
                    className="bg-white border border-slate-100 p-8 rounded-3xl flex flex-col items-center justify-center gap-6 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
                  >
                    <div className="h-20 flex items-center justify-center">
                      <img src={`/assets/a propos/${p.img}`} alt={p.name} className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-primary text-center leading-tight">
                      {p.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Hébergement */}
            <div className="space-y-12">
              <h3 className="text-xl font-black text-[#109ea5] uppercase tracking-[0.3em] text-center">Hébergement</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  { name: "Hôtel le Panoramic", img: "panoramic.jpg.jpeg", url: "https://www.hotelverdon.com" },
                  { name: "Hôtel des Gorges", img: "hotel-gorges-du-verdon.png", url: "https://www.hotel-des-gorges-du-verdon.fr" },
                  { name: "Hôtel le Provence", img: "hotel-provence.avif", url: "https://www.hotel-provence-verdon.com" },
                ].map(p => (
                  <a 
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={p.name} 
                    className="bg-white border border-slate-100 p-10 rounded-3xl flex flex-col items-center justify-center gap-8 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
                  >
                    <div className="h-24 flex items-center justify-center">
                      <img src={`/assets/a propos/${p.img}`} alt={p.name} className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-primary text-center">
                      {p.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Autre */}
            <div className="space-y-12">
              <h3 className="text-xl font-black text-[#109ea5] uppercase tracking-[0.3em] text-center">Autre</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {[
                  { name: "Marielle Laubie Photographe", img: "marielle-laubie.png", url: "https://www.mariellelaubie.com" },
                  { name: "L'effet Verdon", img: "effet-verdon.webp", url: "http://effetverdon.com" },
                ].map(p => (
                  <a 
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={p.name} 
                    className="bg-white border border-slate-100 p-10 rounded-3xl flex flex-col items-center justify-center gap-8 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
                  >
                    <div className="h-24 flex items-center justify-center">
                      <img src={`/assets/a propos/${p.img}`} alt={p.name} className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-primary text-center">
                      {p.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
