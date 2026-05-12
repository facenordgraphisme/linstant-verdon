'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Send } from 'lucide-react';

export default function Footer({ dict, locale }: { dict: any; locale: string }) {
  return (
    <footer className="relative bg-white pt-24 pb-12 overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          
          {/* Left Side: Brand & Socials */}
          <div className="space-y-10">
            <Link href={`/${locale}`} className="flex items-center gap-4 group">
              <div className="w-16 h-16 transition-transform duration-500 group-hover:scale-110">
                <img src="/assets/accueil/logo.webp" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black tracking-tighter text-gradient uppercase">
                  L'INSTANT
                </span>
                <span className="text-sm font-black tracking-tighter text-slate-900 uppercase">
                  Verdon
                </span>
              </div>
            </Link>
            <p className="text-slate-500 leading-relaxed max-w-md font-medium">
              Expert en aventures outdoor dans les Gorges du Verdon. 
              Canyoning, escalade et moments inoubliables au cœur d’une nature sauvage et préservée.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-slate-100 text-slate-400">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-slate-100 text-slate-400">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Right Side: Links & Contact Grouped */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] mb-8 opacity-40">Navigation</h4>
              <ul className="space-y-4">
                <li><Link href={`/${locale}/canyoning`} className="text-slate-600 hover:text-primary transition-colors font-bold text-sm uppercase tracking-tight">Canyoning</Link></li>
                <li><Link href={`/${locale}/escalade`} className="text-slate-600 hover:text-primary transition-colors font-bold text-sm uppercase tracking-tight">Escalade</Link></li>
                <li><Link href={`/${locale}/stages`} className="text-slate-600 hover:text-primary transition-colors font-bold text-sm uppercase tracking-tight">Stages</Link></li>
                <li><Link href={`/${locale}/a-propos`} className="text-slate-600 hover:text-primary transition-colors font-bold text-sm uppercase tracking-tight">{dict.nav.about}</Link></li>
                <li><Link href={`/${locale}/contact`} className="text-slate-600 hover:text-primary transition-colors font-bold text-sm uppercase tracking-tight">{dict.nav.contact}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] mb-8 opacity-40">Contact</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-3 text-slate-600">
                  <MapPin size={18} className="text-primary shrink-0 mt-1" />
                  <span className="text-sm font-bold leading-relaxed">Place de l'église, 04120 Castellane</span>
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <Phone size={18} className="text-primary shrink-0" />
                  <span className="text-sm font-bold">+33 (0)6 61 47 31 39</span>
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <Mail size={18} className="text-primary shrink-0" />
                  <span className="text-sm font-bold">contact@linstantverdon.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-400 text-[10px] font-black tracking-[0.3em] uppercase">
            © {new Date().getFullYear()} L'INSTANT VERDON.
          </p>
          <div className="flex gap-8 text-slate-400 text-[10px] font-black tracking-[0.3em] uppercase">
            <Link href="#" className="hover:text-primary transition-colors">Mentions Légales</Link>
            <Link href="#" className="hover:text-primary transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
