import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Compass } from 'lucide-react';

const TripAdvisorIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1.992c-5.522 0-10 4.477-10 10 0 5.522 4.478 10 10 10 5.523 0 10-4.478 10-10 0-5.523-4.477-10-10-10zm0 1.25c4.836 0 8.75 3.914 8.75 8.75s-3.914 8.75-8.75 8.75-8.75-3.914-8.75-8.75 3.914-8.75 8.75-8.75zm-3.666 4.375c-1.381 0-2.5 1.119-2.5 2.5 0 1.381 1.119 2.5 2.5 2.5 1.38 0 2.5-1.119 2.5-2.5 0-1.381-1.12-2.5-2.5-2.5zm7.332 0c-1.38 0-2.5 1.119-2.5 2.5 0 1.381 1.12 2.5 2.5 2.5 1.381 0 2.5-1.119 2.5-2.5 0-1.381-1.119-2.5-2.5-2.5zm-7.332 1.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25zm7.332 0c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25zM12 13.842c-.859 0-1.572-.647-1.666-1.488a.627.627 0 011.242-.14c.03.272.264.478.544.478.28 0 .514-.206.544-.478a.627.627 0 011.242.14c-.094.841-.807 1.488-1.666 1.488z" />
  </svg>
);

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Footer({ dict, locale }: { dict: any; locale: string }) {
  return (
    <footer className="relative bg-white pt-24 pb-12 overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          
          {/* Left Side: Brand & Socials */}
          <div className="space-y-10">
            <Link href={`/${locale}`} prefetch={false} className="flex items-center gap-4 group">
              <div className="relative w-16 h-16 transition-transform duration-500 group-hover:scale-110">
                <Image src="/assets/accueil/logo.webp" alt="Logo" fill className="object-contain" sizes="64px" />
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
            <div className="flex flex-wrap gap-4">
              <a href="https://www.verdontourisme.com/commerces-services/linstant-verdon-la-palud-sur-verdon/" target="_blank" rel="noopener noreferrer" title="Verdon Tourisme" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-slate-100 text-slate-400">
                <Compass size={20} />
              </a>
              <a href="https://www.facebook.com/linstantverdon" target="_blank" rel="noopener noreferrer" title="Facebook" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-slate-100 text-slate-400">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/linstant_verdon/" target="_blank" rel="noopener noreferrer" title="Instagram" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-slate-100 text-slate-400">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/channel/UCvOPoMuJYkrMgZWiXiErugw" target="_blank" rel="noopener noreferrer" title="YouTube" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-slate-100 text-slate-400">
                <Youtube size={20} />
              </a>
              <a href="https://www.tripadvisor.fr/Attraction_Review-g635586-d14924373-Reviews-L_Instant_Verdon-La_Palud_sur_Verdon_Alpes_de_Haute_Provence_Provence_Alpes_Cote.html" target="_blank" rel="noopener noreferrer" title="TripAdvisor" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-slate-100 text-slate-400">
                <TripAdvisorIcon size={20} />
              </a>
              <a href="https://api.whatsapp.com/send?phone=33689855381" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-slate-100 text-slate-400">
                <WhatsAppIcon size={20} />
              </a>
            </div>
          </div>

          {/* Right Side: Links & Contact Grouped */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] mb-8 opacity-40">Navigation</h4>
              <ul className="space-y-4">
                <li><Link href={`/${locale}/canyoning`} prefetch={false} className="text-slate-600 hover:text-primary transition-colors font-bold text-sm uppercase tracking-tight">Canyoning</Link></li>
                <li><Link href={`/${locale}/escalade`} prefetch={false} className="text-slate-600 hover:text-primary transition-colors font-bold text-sm uppercase tracking-tight">Escalade</Link></li>
                <li><Link href={`/${locale}/stages`} prefetch={false} className="text-slate-600 hover:text-primary transition-colors font-bold text-sm uppercase tracking-tight">Stages</Link></li>
                <li><Link href={`/${locale}/blog`} prefetch={false} className="text-slate-600 hover:text-primary transition-colors font-bold text-sm uppercase tracking-tight">{dict.nav.blog}</Link></li>
                <li><Link href={`/${locale}/a-propos`} prefetch={false} className="text-slate-600 hover:text-primary transition-colors font-bold text-sm uppercase tracking-tight">{dict.nav.about}</Link></li>
                <li><Link href={`/${locale}/contact`} prefetch={false} className="text-slate-600 hover:text-primary transition-colors font-bold text-sm uppercase tracking-tight">{dict.nav.contact}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] mb-8 opacity-40">Contact</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-3 text-slate-600">
                  <MapPin size={18} className="text-primary shrink-0 mt-1" />
                  <span className="text-sm font-bold leading-relaxed">395 Chem. de Haut Bourras, 04120 La Palud-sur-Verdon</span>
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <Phone size={18} className="text-primary shrink-0" />
                  <a href="tel:+33689855381" className="text-sm font-bold hover:text-primary transition-colors">+33 (0)6 89 85 53 81</a>
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
          <div className="text-slate-500 text-xs md:text-sm font-black tracking-[0.2em] uppercase flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
            <span>© {new Date().getFullYear()} L'INSTANT VERDON.</span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <a href="https://www.facenordgraphisme.fr" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-bold normal-case tracking-normal">
              Propulsé par Face Nord Graphisme
            </a>
          </div>
          <div className="flex gap-8 text-slate-500 text-xs md:text-sm font-black tracking-[0.2em] uppercase">
            <Link href="#" prefetch={false} className="hover:text-primary transition-colors">Mentions Légales</Link>
            <Link href="#" prefetch={false} className="hover:text-primary transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
