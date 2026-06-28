'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Users, Leaf, Heart, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection({ dict }: { dict: any }) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

      gsap.fromTo(contentRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">

          {/* Image Side */}
          <div ref={imageRef} className="lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] rotate-3 group-hover:rotate-0 transition-transform duration-700" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5 aspect-[4/5]">
              <img
                src="/assets/accueil/about-us.webp"
                alt="L'instant Verdon Team"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 right-6 p-6 glass-promax rounded-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-primary uppercase tracking-widest">Le Syndicat Local</p>
                    <p className="font-bold text-slate-900">Fondé en 2018</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div ref={contentRef} className="lg:w-1/2 space-y-10">
            <div className="space-y-4">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-xs flex items-center gap-3">
                <span className="w-8 h-px bg-primary" /> {dict.about.tagline}
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-gradient">
                {dict.about.title}
              </h2>
            </div>

            <div className="space-y-8 text-slate-600 leading-relaxed font-medium">
              <p className="text-lg text-slate-900 font-bold leading-snug border-l-4 border-primary pl-6 py-2">
                {dict.about.history}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-primary/20 transition-all group/card">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                      <img src="/assets/a propos/emma.JPG.jpeg" className="w-full h-full object-cover" alt="Emma" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Emma Aglaé</p>
                      <Heart size={14} className="text-primary" fill="currentColor" />
                    </div>
                  </div>
                  <p className="text-[11px] leading-relaxed">{dict.about.emma}</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-primary/20 transition-all group/card">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                      <img src="/assets/a propos/angele.jpg.jpeg" className="w-full h-full object-cover" alt="Angèle" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Angèle Kanapa</p>
                      <Heart size={14} className="text-primary" fill="currentColor" />
                    </div>
                  </div>
                  <p className="text-[11px] leading-relaxed">{dict.about.angele}</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="flex items-start gap-4">
                  <span className="mt-1 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex-shrink-0 flex items-center justify-center">
                    <Leaf size={12} />
                  </span>
                  <span>{dict.about.ecology}</span>
                </p>
                <p className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
                  <span className="relative z-10 block mb-2 opacity-50 text-[10px] uppercase font-black tracking-widest">Notre Offre</span>
                  <span className="relative z-10 block text-lg font-bold italic tracking-tight">{dict.about.vocation}</span>
                  <span className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                </p>
                <p className="text-sm">{dict.about.target}</p>
              </div>
            </div>

            <div className="pt-6">
              <a href="#contact" className="button-glow">
                NOUS REJOINDRE
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
