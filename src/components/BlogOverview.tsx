'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Calendar, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  publishedAt: string;
  imageUrl: string;
}

export default function BlogOverview({ dict, locale, posts }: { dict: any; locale: string; posts: Post[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Cards Staggered Animation
      const cards = gridRef.current?.querySelectorAll('.blog-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            stagger: 0.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const blogDict = dict.blog || {
    title: "Notre Blog & Actualités",
    tagline: "Récits d'aventures et conseils de guides",
    subtitle: "Suivez nos aventures et découvrez les secrets des Gorges du Verdon.",
    readMore: "Lire l'article",
    noPosts: "Aucun article disponible pour le moment."
  };

  return (
    <section ref={sectionRef} className="py-32 bg-slate-50/50 border-t border-slate-100 overflow-hidden relative">
      {/* Premium background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-logo-teal/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs flex items-center gap-3">
              <span className="w-8 h-px bg-primary" /> {blogDict.tagline}
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-gradient leading-none">
              {blogDict.title}
            </h2>
            <p className="text-slate-500 max-w-xl font-medium leading-relaxed mt-2 text-sm md:text-base">
              {blogDict.subtitle}
            </p>
          </div>
          <div>
            <Link 
              href={`/${locale}/blog`}
              prefetch={false}
              className="group inline-flex items-center gap-3 px-8 py-4.5 rounded-2xl bg-white border border-slate-100 shadow-xl hover:border-primary/20 text-slate-800 hover:text-primary transition-all duration-300 font-black uppercase tracking-wider text-xs"
            >
              Voir tous les articles
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Blog Grid */}
        {posts && posts.length > 0 ? (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post) => {
              const formattedDate = new Date(post.publishedAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              });

              return (
                <article 
                  key={post._id} 
                  className="blog-card group flex flex-col bg-white rounded-[2.5rem] border border-slate-100/80 shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden h-full hover:border-primary/25"
                >
                  {/* Image wrapper with shine and zoom */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={post.imageUrl || '/assets/canyon/canyon.jpeg'}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                    
                    {/* Date Tag */}
                    <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/50">
                      <Calendar size={12} className="text-primary" />
                      <span className="text-[10px] font-black text-slate-800 uppercase tracking-wider">{formattedDate}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex flex-col flex-grow justify-between space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight group-hover:text-primary transition-colors duration-300 uppercase tracking-tight">
                        {post.title}
                      </h3>
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
          <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-2xl">
            <p className="text-slate-400 font-bold uppercase tracking-wider text-sm">
              {blogDict.noPosts}
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
