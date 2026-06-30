import React from 'react';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';
import { client } from '@/sanity/client';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

const blogMeta = {
  fr: {
    title: "Blog Aventure Verdon — Récits & Conseils de Guides | L'instant Verdon",
    description: "Récits d'aventures, conseils pratiques et guides saisonniers dans les Gorges du Verdon. Par Emma et Angèle, guides diplômées d'État de L'instant Verdon.",
  },
  en: {
    title: "Verdon Adventure Blog — Stories & Guide Tips | L'instant Verdon",
    description: "Adventure stories, practical tips and seasonal guides in the Verdon Gorges by Emma and Angèle, state-certified guides.",
  },
}

export const revalidate = 86400;

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = blogMeta[locale as 'fr' | 'en'] || blogMeta.fr;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { fr: '/fr/blog', en: '/en/blog', 'x-default': '/fr/blog' },
    },
    openGraph: { title: m.title, description: m.description, url: `/${locale}/blog` },
  };
}

export default async function BlogArchivePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale as 'fr' | 'en');
  
  const blogDict = dict.blog || {
    title: "Notre Blog & Actualités",
    tagline: "Récits d'aventures et conseils de guides",
    subtitle: "Suivez nos aventures et découvrez les secrets des Gorges du Verdon.",
    readMore: "Lire l'article",
    noPosts: "Aucun article disponible pour le moment."
  };

  // Fetch all blog posts
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      "title": title[$locale],
      slug,
      "description": description[$locale],
      publishedAt,
      "imageUrl": mainImage.asset->url
    }
  `, { locale });

  return (
    <main className="min-h-screen bg-white">
      
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] scale-105"
          style={{ backgroundImage: `url('/assets/accueil/home.webp')` }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-6 block drop-shadow-lg">
            {blogDict.tagline}
          </span>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white-shadow">
            {blogDict.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mt-6 font-medium leading-relaxed text-white-shadow">
            {blogDict.subtitle}
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {posts.map((post: any) => {
                const formattedDate = new Date(post.publishedAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                });

                return (
                  <article 
                    key={post._id} 
                    className="group flex flex-col bg-white rounded-[2.5rem] border border-slate-100/80 shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden h-full hover:border-primary/25"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img 
                        src={post.imageUrl || '/assets/canyon/canyon.jpeg'} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                      
                      {/* Date Tag */}
                      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/50">
                        <Calendar size={12} className="text-primary" />
                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-wider">{formattedDate}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow justify-between space-y-6">
                      <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-black text-[#109ea5] leading-tight group-hover:text-primary transition-colors duration-300 uppercase tracking-tight">
                          {post.title}
                        </h2>
                        <p className="text-slate-500 text-xs md:text-sm font-semibold leading-relaxed line-clamp-3">
                          {post.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-50">
                        <Link 
                          href={`/${locale}/blog/${post.slug.current}`}
                          prefetch={false}
                          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900 group-hover:text-primary transition-colors duration-300"
                        >
                          {blogDict.readMore}
                          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-32 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-2xl">
              <BookOpen size={48} className="mx-auto text-slate-300 mb-6" />
              <p className="text-slate-400 font-bold uppercase tracking-wider text-sm">
                {blogDict.noPosts}
              </p>
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
