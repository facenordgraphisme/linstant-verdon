import { getDictionary } from '@/lib/dictionaries';
import ContactSection from '@/components/ContactSection';

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

      <ContactSection dict={dict} locale={locale} />
    </main>
  );
}
