export type LegalSection = { title: string; paragraphs: string[] };

export default function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <main className="min-h-screen bg-slate-50/50 pb-24">
      {/* Dark band so the transparent, white-text navbar stays readable. */}
      <section className="bg-slate-900 text-white pt-40 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">{title}</h1>
          <p className="text-sm text-white/60 font-semibold">{updated}</p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">
                {section.title}
              </h2>
              <div className="space-y-3 text-slate-600 leading-relaxed font-medium">
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
