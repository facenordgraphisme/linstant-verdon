'use strict';
'use client';

import React, { useState } from 'react';
import { MapPin, Compass, Briefcase, Check, ArrowRight, Clock, ShieldAlert, Euro, User2, Trees, Footprints } from 'lucide-react';

interface ActivityTabsProps {
  locale: string;
  categoryTheme: string; // e.g. 'canyoning' or 'climbing'
  data: {
    meetingPoint?: string;
    googleMapsUrl?: string;
    price?: number;
    priceDetails?: string;
    minAge?: number;
    duration?: string;
    approachTime?: string;
    returnTime?: string;
    obstacles?: string;
    provided?: string[];
    toBring?: string[];
  };
}

const themeStyles: Record<string, {
  accent: string;
  bgActive: string;
  borderActive: string;
  iconBg: string;
  bulletBg: string;
  bulletIcon: string;
}> = {
  canyoning: {
    accent: 'text-sky-600',
    bgActive: 'bg-sky-500/10 text-sky-600 border-sky-500/40',
    borderActive: 'border-sky-500',
    iconBg: 'bg-sky-50',
    bulletBg: 'bg-amber-50',
    bulletIcon: 'text-amber-600',
  },
  climbing: {
    accent: 'text-[#0d758b]',
    bgActive: 'bg-[#0d758b]/10 text-[#0d758b] border-[#0d758b]/40',
    borderActive: 'border-[#0d758b]',
    iconBg: 'bg-[#0d758b]/5',
    bulletBg: 'bg-amber-50',
    bulletIcon: 'text-amber-600',
  },
  aventures: {
    accent: 'text-[#f7a271]',
    bgActive: 'bg-[#f7a271]/10 text-[#f7a271] border-[#f7a271]/40',
    borderActive: 'border-[#f7a271]',
    iconBg: 'bg-[#f7a271]/5',
    bulletBg: 'bg-amber-50',
    bulletIcon: 'text-amber-600',
  },
  insolite: {
    accent: 'text-[#ca769e]',
    bgActive: 'bg-[#ca769e]/10 text-[#ca769e] border-[#ca769e]/40',
    borderActive: 'border-[#ca769e]',
    iconBg: 'bg-[#ca769e]/5',
    bulletBg: 'bg-amber-50',
    bulletIcon: 'text-amber-600',
  },
  stages: {
    accent: 'text-[#7c3aed]',
    bgActive: 'bg-[#7c3aed]/10 text-[#7c3aed] border-[#7c3aed]/40',
    borderActive: 'border-[#7c3aed]',
    iconBg: 'bg-[#7c3aed]/5',
    bulletBg: 'bg-purple-50',
    bulletIcon: 'text-purple-600',
  },
  default: {
    accent: 'text-[#10a18b]',
    bgActive: 'bg-[#10a18b]/10 text-[#10a18b] border-[#10a18b]/40',
    borderActive: 'border-[#10a18b]',
    iconBg: 'bg-[#10a18b]/5',
    bulletBg: 'bg-amber-50',
    bulletIcon: 'text-amber-600',
  }
};

export default function ActivityTabs({ locale, categoryTheme, data }: ActivityTabsProps) {
  const [activeTab, setActiveTab] = useState<'rendezvous' | 'specs' | 'equipment'>('rendezvous');

  const theme = themeStyles[categoryTheme] || themeStyles.default;

  const labels = {
    fr: {
      tabRendezvous: '📍 Rendez-vous',
      tabSpecs: '🧗 Fiche Technique',
      tabEquipment: '🎒 Équipement',
      meetingPlace: 'Lieu de rendez-vous',
      noMap: 'Aucune carte de rendez-vous disponible pour cette sortie.',
      priceLabel: 'Prix par personne',
      ageLabel: 'Âge minimum',
      durationLabel: 'Durée totale',
      approachLabel: 'Approche',
      returnLabel: 'Retour',
      obstaclesLabel: 'Obstacles',
      providedLabel: 'Nous fournissons',
      toBringLabel: 'Vous devez apporter',
      providedSubtitle: 'Tout le matériel technique nécessaire de qualité professionnelle',
      toBringSubtitle: 'Vos affaires personnelles recommandées pour la sortie',
      noEquipment: 'Aucune information d\'équipement fournie.'
    },
    en: {
      tabRendezvous: '📍 Meeting Point',
      tabSpecs: '🧗 Specs & Info',
      tabEquipment: '🎒 Equipment',
      meetingPlace: 'Meeting Point',
      noMap: 'No meeting map available for this outing.',
      priceLabel: 'Price per person',
      ageLabel: 'Minimum Age',
      durationLabel: 'Total Duration',
      approachLabel: 'Approach',
      returnLabel: 'Return Walk',
      obstaclesLabel: 'Obstacles & Terrain',
      providedLabel: 'We Provide',
      toBringLabel: 'You Should Bring',
      providedSubtitle: 'All necessary state-of-the-art professional technical gear',
      toBringSubtitle: 'Your recommended personal belongings for the outing',
      noEquipment: 'No equipment information provided.'
    }
  }[locale as 'fr' | 'en'] || {
    tabRendezvous: '📍 Rendez-vous',
    tabSpecs: '🧗 Fiche Technique',
    tabEquipment: '🎒 Équipement',
    meetingPlace: 'Lieu de rendez-vous',
    noMap: 'Aucune carte de rendez-vous disponible.',
    priceLabel: 'Prix par personne',
    ageLabel: 'Âge minimum',
    durationLabel: 'Durée totale',
    approachLabel: 'Approche',
    returnLabel: 'Retour',
    obstaclesLabel: 'Obstacles',
    providedLabel: 'Nous fournissons',
    toBringLabel: 'Vous devez apporter',
    providedSubtitle: 'Tout le matériel technique de qualité',
    toBringSubtitle: 'Vos affaires personnelles recommandées',
    noEquipment: 'Aucune information d\'équipement.'
  };

  return (
    <div className="w-full mt-10">
      {/* Tabs Header */}
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center border-b border-slate-200/60 pb-6 mb-8">
        <button
          onClick={() => setActiveTab('rendezvous')}
          className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-black uppercase text-xs tracking-wider transition-all duration-300 ${
            activeTab === 'rendezvous'
              ? theme.bgActive + ' shadow-md scale-[1.02]'
              : 'bg-white hover:bg-slate-50 text-slate-500 border border-slate-200'
          }`}
        >
          <MapPin size={16} />
          {labels.tabRendezvous}
        </button>

        <button
          onClick={() => setActiveTab('specs')}
          className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-black uppercase text-xs tracking-wider transition-all duration-300 ${
            activeTab === 'specs'
              ? theme.bgActive + ' shadow-md scale-[1.02]'
              : 'bg-white hover:bg-slate-50 text-slate-500 border border-slate-200'
          }`}
        >
          <Compass size={16} />
          {labels.tabSpecs}
        </button>

        <button
          onClick={() => setActiveTab('equipment')}
          className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-black uppercase text-xs tracking-wider transition-all duration-300 ${
            activeTab === 'equipment'
              ? theme.bgActive + ' shadow-md scale-[1.02]'
              : 'bg-white hover:bg-slate-50 text-slate-500 border border-slate-200'
          }`}
        >
          <Briefcase size={16} />
          {labels.tabEquipment}
        </button>
      </div>

      {/* Tabs Content Container */}
      <div className="transition-all duration-500">
        
        {/* TAB 1: Rendez-vous */}
        {activeTab === 'rendezvous' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
            {/* Info details */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="glass-card p-8 rounded-[2rem] border border-white/50 shadow-xl flex flex-col gap-4">
                <div className={`p-4 rounded-2xl w-fit ${theme.iconBg} ${theme.accent}`}>
                  <MapPin size={28} />
                </div>
                <h4 className="text-xl font-black text-slate-900 tracking-tight">{labels.meetingPlace}</h4>
                <p className="text-slate-600 font-semibold leading-relaxed">
                  {data.meetingPoint || 'Castellane, Gorges du Verdon'}
                </p>
                <div className="text-xs text-slate-400 mt-4 font-medium italic border-t border-slate-100 pt-4">
                  {locale === 'fr' 
                    ? 'Le point GPS exact accompagné d\'un plan de rendez-vous détaillé vous sera également envoyé par e-mail après réservation.'
                    : 'The exact GPS point along with a detailed meeting map will be sent to your email address after booking.'
                  }
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="lg:col-span-2">
              <div className="relative w-full h-[350px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                {data.googleMapsUrl ? (
                  <iframe
                    src={data.googleMapsUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps Location"
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 font-semibold">
                    {labels.noMap}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Specs */}
        {activeTab === 'specs' && (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              
              {/* Price */}
              <div className="glass-card p-6 rounded-[2rem] border border-white/50 shadow-lg flex items-center gap-4">
                <div className={`p-3 rounded-xl ${theme.iconBg} ${theme.accent}`}>
                  <Euro size={20} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-slate-500">{labels.priceLabel}</div>
                  <div className={`${data.priceDetails && data.priceDetails.length > 12 ? 'text-[11px] md:text-xs' : 'text-xl'} font-black text-slate-900 leading-snug`}>
                    {data.priceDetails ? data.priceDetails : (data.price ? `${data.price}€` : '--')}
                  </div>
                </div>
              </div>

              {/* Age */}
              <div className="glass-card p-6 rounded-[2rem] border border-white/50 shadow-lg flex items-center gap-4">
                <div className={`p-3 rounded-xl ${theme.iconBg} ${theme.accent}`}>
                  <User2 size={20} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-slate-500">{labels.ageLabel}</div>
                  <div className="text-xl font-black text-slate-900">{data.minAge ? `${data.minAge} ans+` : '--'}</div>
                </div>
              </div>

              {/* Duration */}
              <div className="glass-card p-6 rounded-[2rem] border border-white/50 shadow-lg flex items-center gap-4">
                <div className={`p-3 rounded-xl ${theme.iconBg} ${theme.accent}`}>
                  <Clock size={20} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-slate-500">{labels.durationLabel}</div>
                  <div className="text-xl font-black text-slate-900">{data.duration || '--'}</div>
                </div>
              </div>

              {/* Approach Time */}
              <div className="glass-card p-6 rounded-[2rem] border border-white/50 shadow-lg flex items-center gap-4">
                <div className={`p-3 rounded-xl ${theme.iconBg} ${theme.accent}`}>
                  <Trees size={20} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-slate-500">{labels.approachLabel}</div>
                  <div className="text-xl font-black text-slate-900">{data.approachTime || '--'}</div>
                </div>
              </div>

              {/* Return Time */}
              <div className="glass-card p-6 rounded-[2rem] border border-white/50 shadow-lg flex items-center gap-4">
                <div className={`p-3 rounded-xl ${theme.iconBg} ${theme.accent}`}>
                  <Footprints size={20} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-slate-500">{labels.returnLabel}</div>
                  <div className="text-xl font-black text-slate-900">{data.returnTime || '--'}</div>
                </div>
              </div>
            </div>

            {/* Obstacles description */}
            <div className="glass-card p-8 rounded-[2.5rem] border border-white/50 shadow-xl flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme.iconBg} ${theme.accent}`}>
                  <Compass size={24} />
                </div>
                <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">{labels.obstaclesLabel}</h4>
              </div>
              <p className="text-slate-600 font-semibold leading-relaxed text-sm md:text-base">
                {data.obstacles || (locale === 'fr' ? 'Parcours d\'aventure sauvage varié et dépaysant.' : 'Varied and scenic wild adventure course.')}
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: Equipment */}
        {activeTab === 'equipment' && (
          <div className="animate-fadeIn">
            {((data.provided && data.provided.length > 0) || (data.toBring && data.toBring.length > 0)) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Column 1: Provided */}
                <div className="glass-card p-8 rounded-[2.5rem] border border-white/50 shadow-xl flex flex-col gap-6">
                  <div>
                    <h4 className={`text-xl font-black uppercase tracking-tight ${theme.accent} mb-1`}>{labels.providedLabel}</h4>
                    <p className="text-xs text-slate-400 font-medium">{labels.providedSubtitle}</p>
                  </div>
                  <ul className="flex flex-col gap-4">
                    {data.provided?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3.5 text-slate-600 font-semibold text-sm leading-snug">
                        <div className="p-1 rounded-full bg-emerald-50 text-emerald-600 mt-0.5 shadow-sm">
                          <Check size={14} className="stroke-[3]" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: To Bring */}
                <div className="glass-card p-8 rounded-[2.5rem] border border-white/50 shadow-xl flex flex-col gap-6">
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-tight text-amber-600 mb-1">{labels.toBringLabel}</h4>
                    <p className="text-xs text-slate-400 font-medium">{labels.toBringSubtitle}</p>
                  </div>
                  <ul className="flex flex-col gap-4">
                    {data.toBring?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3.5 text-slate-600 font-semibold text-sm leading-snug">
                        <div className={`p-1 rounded-full ${theme.bulletBg} ${theme.bulletIcon} mt-0.5 shadow-sm`}>
                          <ArrowRight size={14} className="stroke-[3]" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ) : (
              <div className="glass-card p-8 rounded-[2rem] text-center text-slate-400 font-semibold">
                {labels.noEquipment}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
