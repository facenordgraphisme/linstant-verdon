import { getDictionary } from '@/lib/dictionaries';
import FAQContent from '@/components/FAQContent';

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale as 'fr' | 'en');

  return (
    <main className="min-h-screen bg-white">
      {/* Cinematic Hero */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('/assets/canyon/canyon.jpeg')` }}
        />
        <div className="absolute inset-0 bg-black/65 z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4 block drop-shadow-lg">
            {locale === 'en' ? 'Practical Information & FAQ' : 'Informations Pratiques & FAQ'}
          </span>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-2xl">
            {dict.nav.faq}
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <FAQContent locale={locale} dict={dict} />
      </div>
    </main>
  );
}
