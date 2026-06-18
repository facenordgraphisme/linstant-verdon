'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

import { ArrowRight } from 'lucide-react';

export default function Hero({ dict }: { dict: any }) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const videoRef = useRef(null);
  const [videoVisible, setVideoVisible] = React.useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    // Subtle fade in for smoothness
    gsap.fromTo(videoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, delay: 0.5 }
    );

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.8 }
    )
      .fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.5'
      );
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video - Guaranteed Cover */}
      <div ref={videoRef} className="video-container" style={{ opacity: 0 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video-linstant-verdon.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Strong Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 text-center px-6 w-full max-w-5xl flex flex-col items-center">
        <div className="mb-12">
          <span className="px-6 py-2.5 bg-primary/20 text-primary rounded-full text-xs font-black uppercase tracking-[0.5em] border border-primary/30 backdrop-blur-2xl">
            La Palud sur Verdon
          </span>
        </div>

        <h1 ref={titleRef} className="text-6xl md:text-8xl font-black mb-12 leading-[0.85] tracking-tighter text-white uppercase italic text-white-shadow">
          L'Instant <br />
          <span className="text-gradient not-italic">Verdon</span>
        </h1>

        <p ref={subtitleRef} className="text-lg md:text-2xl text-white/90 mb-24 max-w-2xl leading-relaxed font-medium tracking-tight text-white-shadow">
          "Là où l’aventure rencontre la nature"
        </p>

        <div ref={ctaRef} className="flex flex-col md:flex-row items-center justify-center gap-12">
          <a href="#activities" className="button-glow py-4 px-10 text-sm">
            DÉCOUVRIR NOS ACTIVITÉS
          </a>
          <a href="#contact" className="text-white font-black text-sm uppercase tracking-widest hover:text-primary transition-all flex items-center gap-3 group text-white-shadow leading-none">
            NOUS CONTACTER <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>

      {/* Premium Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-30">
        <div className="w-px h-24 bg-gradient-to-b from-white/60 to-transparent" />
      </div>

      {/* Smooth transition to light mode section - Softened */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/10 to-transparent z-20" />
    </section>
  );
}
