import { getDictionary } from '@/lib/dictionaries';
import Navbar from '@/components/Navbar';

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale as 'fr' | 'en');

  const faqs = [
    { q: "Quel équipement dois-je prévoir ?", a: "Maillot de bain, serviette, chaussures de sport fermées (type baskets) et une bouteille d'eau." },
    { q: "Faut-il savoir nager ?", a: "Oui, il est impératif de savoir nager au moins 25 mètres et d'être capable de s'immerger." },
    { q: "Quelles sont les conditions d'annulation ?", a: "Consultez nos conditions générales de vente pour plus de détails." },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('/assets/canyon/canyon.jpeg')` }}
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-6 block drop-shadow-lg">
            Vos questions, nos réponses
          </span>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white-shadow">
            {dict.nav.faq}
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="space-y-8">
          {faqs.map((faq, i) => (
            <div key={i} className="card-promax p-12 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary opacity-30" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-6 text-slate-900 group-hover:text-primary transition-colors flex items-start gap-5">
                  <span className="text-primary text-4xl leading-none font-black">?</span>
                  <span className="leading-tight">{faq.q}</span>
                </h3>
                <p className="text-slate-500 leading-relaxed font-medium text-lg border-l border-slate-100 pl-10 ml-3">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
