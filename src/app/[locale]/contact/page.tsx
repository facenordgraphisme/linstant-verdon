import { getDictionary } from '@/lib/dictionaries';
import Navbar from '@/components/Navbar';
import { Mail, Phone, MapPin } from 'lucide-react';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale as 'fr' | 'en');

  return (
    <main className="min-h-screen bg-white">
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('/assets/accueil/home.webp')` }}
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-6 block drop-shadow-lg">
            Parlons de votre prochaine aventure
          </span>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white-shadow">
            {dict.nav.contact}
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
        <div>
          <h2 className="text-4xl md:text-5xl font-black mb-10 uppercase tracking-tighter text-slate-900 leading-tight">
            Une question ?<br />Contactez-nous.
          </h2>
          <p className="text-lg text-slate-500 mb-20 font-medium leading-relaxed max-w-xl">
            Notre équipe est à votre écoute pour organiser votre sortie idéale dans le Verdon. Nous répondons généralement en moins de 24h.
          </p>

          <div className="space-y-12">
            <div className="flex items-center gap-8 group">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-primary border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                <Phone size={32} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-2">Téléphone</p>
                <p className="text-3xl font-black tracking-tight text-slate-900">+33 (0)6 61 47 31 39</p>
              </div>
            </div>
            <div className="flex items-center gap-8 group">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-primary border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                <Mail size={32} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-2">Email</p>
                <p className="text-3xl font-black tracking-tight text-slate-900">contact@linstantverdon.com</p>
              </div>
            </div>
            <div className="flex items-center gap-8 group">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-primary border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                <MapPin size={32} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-2">Adresse</p>
                <p className="text-3xl font-black tracking-tight leading-tight text-slate-900">Place de l'église, 04120 Castellane</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-16 rounded-[4rem] border border-slate-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <form className="space-y-10 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Nom complet</label>
                <input type="text" className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-900 focus:border-primary outline-none transition-all placeholder:text-slate-300 shadow-sm" placeholder="Votre nom" />
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Email</label>
                <input type="email" className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-900 focus:border-primary outline-none transition-all placeholder:text-slate-300 shadow-sm" placeholder="votre@email.com" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Message</label>
              <textarea rows={6} className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-900 focus:border-primary outline-none transition-all placeholder:text-slate-300 shadow-sm" placeholder="Dites-nous tout sur votre projet d'aventure..."></textarea>
            </div>
            <button className="button-glow w-full py-6 text-sm">
              ENVOYER VOTRE MESSAGE
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
