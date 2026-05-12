'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Waves, Mountain, Compass, Calendar, Star, PartyPopper, Tent } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function ActivityGrid({ dict, locale }: { dict: any; locale: string }) {
  const containerRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.1
        }
      );
    });
  }, []);

  const activities = [
    { key: 'canyoning', icon: <Mountain size={40} />, img: '/assets/canyon/canyon.jpeg' },
    { key: 'escalade', icon: <Compass size={40} />, img: '/assets/escalade/climbing.jpeg' },
    { key: 'aventures', icon: <Star size={40} />, img: '/assets/aventures/adventure.jpeg' },
    { key: 'stages', icon: <Calendar size={40} />, img: '/assets/week%20end%20stage/weekend.webp' },
    { key: 'insolite', icon: <Tent size={40} />, img: '/assets/insolite/unusual2.webp' },
    { key: 'evenementiel', icon: <PartyPopper size={40} />, img: '/assets/evenementiel/events.jpg.jpeg' },
  ];

  return (
    <section id="activities" ref={containerRef} className="py-32 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-7xl text-center mb-20 text-gradient font-black uppercase tracking-tighter">
          {dict.activities.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {activities.map((activity, index) => (
            <Link 
              href={`/${locale}/${activity.key}`}
              key={activity.key}
              ref={(el) => { if (el) cardsRef.current[index] = el as any; }}
              className="card-promax group"
            >
              <div className="relative h-72 image-zoom-container">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${activity.img})`, backgroundColor: '#1a1a1a' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] to-transparent opacity-60" />
                <div className="absolute top-5 left-5 p-3 glass-promax rounded-2xl text-primary shadow-2xl border border-white-10">
                  {activity.icon}
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-primary text-[10px] font-black mb-2 uppercase tracking-[0.3em]">
                  {dict.activities[activity.key]?.tagline || "Verdon Adventure"}
                </p>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">
                  {dict.activities[activity.key]?.name || dict.nav[activity.key]}
                </h3>
                <p className="text-slate-500 leading-relaxed mb-8 font-medium text-sm line-clamp-2">
                  {dict.activities[activity.key]?.description}
                </p>
                <div className="flex items-center text-xs font-black tracking-widest text-primary group-hover:translate-x-2 transition-all uppercase">
                  Explorer la catégorie <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
