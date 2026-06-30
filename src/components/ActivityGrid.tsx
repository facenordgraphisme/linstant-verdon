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
    const targets = cardsRef.current.filter(Boolean);
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(targets, {
        start: 'top 85%',
        onEnter: (batch) => {
          gsap.fromTo(batch,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.15,
              overwrite: 'auto'
            }
          );
        },
        onLeaveBack: (batch) => {
          gsap.set(batch, { y: 50, opacity: 0, overwrite: 'auto' });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activities = [
    { key: 'canyoning', icon: <Mountain size={40} />, img: '/assets/canyon/canyon.jpeg' },
    { key: 'escalade', icon: <Compass size={40} />, img: '/assets/escalade/climbing.jpeg' },
    { key: 'aventures', icon: <Star size={40} />, img: '/assets/aventures/adventure.jpeg' },
    { key: 'stages', icon: <Calendar size={40} />, img: '/assets/week%20end%20stage/weekend.webp' },
    { key: 'insolite', icon: <Tent size={40} />, img: '/assets/insolite/unusual2.webp' },
    { key: 'evenementiel', icon: <PartyPopper size={40} />, img: '/assets/evenementiel/events.jpg.jpeg' },
  ];

  const colorMap: Record<string, { text: string; bg: string; border: string; bgGlow: string; hoverText: string; hoverBorder: string; hex: string }> = {
    canyoning: {
      text: 'text-canyoning-blue',
      bg: 'bg-canyoning-blue',
      border: 'border-canyoning-blue',
      bgGlow: 'bg-canyoning-blue/10',
      hoverText: 'group-hover:text-canyoning-blue',
      hoverBorder: 'hover:border-canyoning-blue/30',
      hex: '#109ea5'
    },
    escalade: {
      text: 'text-logo-teal',
      bg: 'bg-logo-teal',
      border: 'border-logo-teal',
      bgGlow: 'bg-logo-teal/10',
      hoverText: 'group-hover:text-logo-teal',
      hoverBorder: 'hover:border-logo-teal/30',
      hex: '#109ea5'
    },
    aventures: {
      text: 'text-logo-peach',
      bg: 'bg-logo-peach',
      border: 'border-logo-peach',
      bgGlow: 'bg-logo-peach/10',
      hoverText: 'group-hover:text-logo-peach',
      hoverBorder: 'hover:border-logo-peach/30',
      hex: '#f7a271'
    },
    stages: {
      text: 'text-stages-purple',
      bg: 'bg-stages-purple',
      border: 'border-stages-purple',
      bgGlow: 'bg-stages-purple/10',
      hoverText: 'group-hover:text-stages-purple',
      hoverBorder: 'hover:border-stages-purple/30',
      hex: '#f7a271'
    },
    insolite: {
      text: 'text-logo-pink',
      bg: 'bg-logo-pink',
      border: 'border-logo-pink',
      bgGlow: 'bg-logo-pink/10',
      hoverText: 'group-hover:text-logo-pink',
      hoverBorder: 'hover:border-logo-pink/30',
      hex: '#ca769e'
    },
    evenementiel: {
      text: 'text-event-rose',
      bg: 'bg-event-rose',
      border: 'border-event-rose',
      bgGlow: 'bg-event-rose/10',
      hoverText: 'group-hover:text-event-rose',
      hoverBorder: 'hover:border-event-rose/30',
      hex: '#ca769e'
    },
  };

  return (
    <section id="activities" ref={containerRef} className="py-32 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-7xl text-center mb-20 text-gradient font-black uppercase tracking-tighter">
          {dict.activities.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {activities.map((activity, index) => {
            const colors = colorMap[activity.key] || {
              text: 'text-primary',
              bg: 'bg-primary',
              border: 'border-primary',
              bgGlow: 'bg-primary/10',
              hoverText: 'group-hover:text-primary',
              hoverBorder: 'hover:border-primary/30',
              hex: '#10a18b'
            };
            return (
              <div
                key={activity.key}
                ref={(el) => { if (el) cardsRef.current[index] = el as any; }}
                className="h-full flex flex-col"
              >
                <Link 
                  href={`/${locale}/${activity.key}`}
                  prefetch={false}
                  className={`card-promax group h-full border border-black/5 ${colors.hoverBorder}`}
                >
                  <div className="relative h-72 image-zoom-container">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${activity.img})`, backgroundColor: '#1a1a1a' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] to-transparent opacity-60" />
                    <div className={`absolute top-5 left-5 p-3 glass-promax rounded-2xl ${colors.text} shadow-2xl border border-white-10`}>
                      {activity.icon}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <p className={`${colors.text} text-[10px] font-black mb-2 uppercase tracking-[0.3em]`}>
                      {dict.activities[activity.key]?.tagline || "Verdon Adventure"}
                    </p>
                    <h3 className={`text-2xl font-black mb-4 uppercase tracking-tight ${colors.text} transition-colors`}>
                      {dict.activities[activity.key]?.name || dict.nav[activity.key]}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-8 font-medium text-sm line-clamp-2">
                      {dict.activities[activity.key]?.description}
                    </p>
                    <div className={`flex items-center text-xs font-black tracking-widest ${colors.text} group-hover:translate-x-2 transition-all uppercase`}>
                      Explorer la catégorie <span className="ml-2">→</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
