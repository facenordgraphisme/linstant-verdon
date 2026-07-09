'use client';

import React from 'react';
import Link from 'next/link';

interface BookingCTAProps {
  bookingUrl: string | null;
  contactUrl: string;
  price: number | null;
  showStartingFrom: boolean;
  colors: {
    hex: string;
    text: string;
    bg: string;
    border: string;
  };
  locale: string;
}

export default function BookingCTA({
  bookingUrl,
  contactUrl,
  price,
  showStartingFrom,
  colors,
  locale,
}: BookingCTAProps) {
  const handleBookingClick = () => {
    if (bookingUrl) {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'ads_conversion_Inscription_1', {});
      }
    }
  };

  return (
    <div className="border-t border-slate-100 pt-6 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase font-black tracking-widest text-slate-600">
          {locale === 'fr' ? 'Tarif' : 'Price'}
        </span>
        <span className={`text-4xl font-black ${colors.text} flex items-baseline gap-1`}>
          {price ? (
            <>
              {showStartingFrom && (
                <span className="text-sm font-bold text-slate-500 uppercase tracking-tight mr-0.5">
                  {locale === 'fr' ? 'dès' : 'from'}
                </span>
              )}
              <span>{price}€</span>
            </>
          ) : '--'}
        </span>
      </div>

      <Link
        href={bookingUrl ? bookingUrl : contactUrl}
        target={bookingUrl ? "_blank" : undefined}
        rel={bookingUrl ? "noopener noreferrer" : undefined}
        onClick={handleBookingClick}
        className="button-glow w-full text-center py-4.5 rounded-2xl block text-white font-black uppercase text-sm tracking-wider transition-all duration-300 hover:scale-[1.02]"
        style={{
          background: colors.hex,
        }}
      >
        {locale === 'fr' ? 'RÉSERVER VOTRE SORTIE' : 'BOOK YOUR TRIP'}
      </Link>

      <p className="text-[11px] text-slate-500 text-center font-bold tracking-tight">
        {locale === 'fr'
          ? 'Paiement sur place • Réservation 100% Gratuite'
          : 'Payment on spot • Free Booking Guarantee'}
      </p>
    </div>
  );
}
