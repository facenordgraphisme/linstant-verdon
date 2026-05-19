'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { Menu, X, Globe, ChevronDown, Mountain, Compass, Calendar, Star, Tent, PartyPopper } from 'lucide-react';

export default function Navbar({ dict, locale }: { dict: any; locale: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    // Initial entry animation
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
    );

    // Scroll listener for glassmorphism
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathname = usePathname();
  const toggleLocale = locale === 'fr' ? 'en' : 'fr';

  const activityLinks = [
    { key: 'canyoning', href: `/${locale}/canyoning`, icon: <Mountain size={18} /> },
    { key: 'escalade', href: `/${locale}/escalade`, icon: <Compass size={18} /> },
    { key: 'aventures', href: `/${locale}/aventures`, icon: <Star size={18} /> },
    { key: 'stages', href: `/${locale}/stages`, icon: <Calendar size={18} /> },
    { key: 'insolite', href: `/${locale}/insolite`, icon: <Tent size={18} /> },
    { key: 'evenementiel', href: `/${locale}/evenementiel`, icon: <PartyPopper size={18} /> },
  ];

  return (
    <nav 
      ref={navRef} 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-5'}`}
    >
      <div className={`absolute inset-0 transition-all duration-500 ${isScrolled ? 'glass-promax opacity-100 shadow-xl' : 'glass-nav opacity-50'}`} />
      
      <div className="relative max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
        <Link href={`/${locale}`} className="flex items-center gap-4 group">
          <div className="relative w-16 h-16 transition-transform duration-500 group-hover:scale-110">
            <img src="/assets/accueil/logo.webp" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-3xl font-black tracking-tighter text-gradient uppercase">
              L'INSTANT
            </span>
            <span className={`text-xl md:text-3xl font-black tracking-tighter uppercase transition-colors ${isScrolled ? 'text-slate-900' : 'text-white text-white-shadow'}`}>
              Verdon
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('activities')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={`flex items-center gap-2 text-sm font-black uppercase px-4 py-2 transition-all bg-transparent border-none cursor-pointer ${activeDropdown === 'activities' ? 'text-primary' : (isScrolled ? 'text-slate-800' : 'text-white text-white-shadow')}`}>
              {dict.nav.activities} <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'activities' ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-72 pt-4 transition-all duration-300 ${activeDropdown === 'activities' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <div className="glass-promax p-3 rounded-[2rem] shadow-2xl overflow-hidden border border-white/40">
                <div className="flex flex-col gap-1">
                  {activityLinks.map(link => {
                    const hoverColors: Record<string, string> = {
                      canyoning: 'hover:bg-canyoning-blue/10 hover:text-canyoning-blue text-slate-900',
                      escalade: 'hover:bg-logo-teal/10 hover:text-logo-teal text-slate-900',
                      aventures: 'hover:bg-logo-peach/10 hover:text-logo-peach text-slate-900',
                      stages: 'hover:bg-stages-purple/10 hover:text-stages-purple text-slate-900',
                      insolite: 'hover:bg-logo-pink/10 hover:text-logo-pink text-slate-900',
                      evenementiel: 'hover:bg-event-rose/10 hover:text-event-rose text-slate-900',
                    };
                    const hoverClass = hoverColors[link.key] || 'hover:bg-primary/10 hover:text-primary text-slate-900';
                    return (
                      <Link 
                        key={link.key} 
                        href={link.href}
                        className={`flex items-center justify-between py-4 px-6 rounded-2xl transition-all font-black uppercase tracking-[0.15em] text-[10px] group/item ${hoverClass}`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="opacity-75 group-hover/item:scale-110 transition-all">{link.icon}</span>
                          <span>{dict.nav[link.key]}</span>
                        </span>
                        <span className="opacity-0 group-hover/item:opacity-100 transition-opacity translate-x-2 group-hover/item:translate-x-0 transition-transform">→</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <Link href={`/${locale}/a-propos`} className={`text-sm font-black uppercase nav-link ${isScrolled ? 'text-slate-800' : 'text-white text-white-shadow'}`}>
            {dict.nav.about}
          </Link>
          <Link href={`/${locale}/faq`} className={`text-sm font-black uppercase nav-link ${isScrolled ? 'text-slate-800' : 'text-white text-white-shadow'}`}>
            {dict.nav.faq}
          </Link>
          <Link href={`/${locale}/blog`} className={`text-sm font-black uppercase nav-link ${isScrolled ? 'text-slate-800' : 'text-white text-white-shadow'}`}>
            {dict.nav.blog}
          </Link>
          <Link href={`/${locale}/contact`} className={`text-sm font-black uppercase nav-link ${isScrolled ? 'text-slate-800' : 'text-white text-white-shadow'}`}>
            {dict.nav.contact}
          </Link>

          <div className="w-px h-6 bg-slate-200/20 mx-2" />

          <Link 
            href={`/${toggleLocale}`} 
            className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-lg transition-all hover:scale-110 active:scale-95" 
            title={toggleLocale === 'fr' ? 'Version Française' : 'English Version'}
          >
            <img 
              src={toggleLocale === 'fr' ? '/assets/a propos/flag-fr.png' : '/assets/a propos/flag-en.png'} 
              alt={toggleLocale} 
              className="w-full h-full object-cover"
            />
          </Link>
          
          <Link href="#contact" className="button-glow">
            {dict.nav.book.toUpperCase()}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden relative w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 shadow-lg text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 w-full h-screen bg-[#f8f9fa] transition-all duration-500 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'}`}>
        <div className="pt-32 px-8 flex flex-col space-y-10">
          <div className="flex flex-col space-y-6">
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2">{dict.nav.activities}</p>
            {activityLinks.map(link => {
              const themeColors: Record<string, { text: string; hover: string }> = {
                canyoning: { text: 'text-canyoning-blue', hover: 'hover:text-canyoning-blue' },
                escalade: { text: 'text-logo-teal', hover: 'hover:text-logo-teal' },
                aventures: { text: 'text-logo-peach', hover: 'hover:text-logo-peach' },
                stages: { text: 'text-stages-purple', hover: 'hover:text-stages-purple' },
                insolite: { text: 'text-logo-pink', hover: 'hover:text-logo-pink' },
                evenementiel: { text: 'text-event-rose', hover: 'hover:text-event-rose' },
              };
              const colors = themeColors[link.key] || { text: 'text-primary', hover: 'hover:text-primary' };
              return (
                <Link 
                  key={link.key} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className={`text-4xl font-black tracking-tighter text-slate-900 transition-colors flex items-center gap-5 uppercase ${colors.hover}`}
                >
                  <span className={colors.text}>{link.icon}</span> {dict.nav[link.key]}
                </Link>
              );
            })}
          </div>
          
          <div className="h-px bg-slate-200" />
          
          <div className="flex flex-col space-y-6">
            <Link href={`/${locale}/a-propos`} onClick={() => setIsOpen(false)} className="text-3xl font-black tracking-tight text-slate-800 uppercase">{dict.nav.about}</Link>
            <Link href={`/${locale}/faq`} onClick={() => setIsOpen(false)} className="text-3xl font-black tracking-tight text-slate-800 uppercase">{dict.nav.faq}</Link>
            <Link href={`/${locale}/blog`} onClick={() => setIsOpen(false)} className="text-3xl font-black tracking-tight text-slate-800 uppercase">{dict.nav.blog}</Link>
            <Link href={`/${locale}/contact`} onClick={() => setIsOpen(false)} className="text-3xl font-black tracking-tight text-slate-800 uppercase">{dict.nav.contact}</Link>
          </div>

          <div className="pt-10">
             <Link href={`/${toggleLocale}`} onClick={() => setIsOpen(false)} className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-slate-200 font-black text-slate-800 bg-white shadow-lg uppercase text-xs tracking-widest">
                <Globe size={20} /> {toggleLocale === 'fr' ? 'Version Française' : 'English Version'}
             </Link>
          </div>
        </div>
        
        {/* Close button for mobile */}
        <button className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white-5 border border-white-10 flex items-center justify-center shadow-2xl" onClick={() => setIsOpen(false)}>
          <X size={28} />
        </button>
      </div>
    </nav>
  );
}
