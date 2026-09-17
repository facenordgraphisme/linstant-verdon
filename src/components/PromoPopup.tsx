'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';

const DISMISS_KEY = 'promo-toussaint-2026-dismissed';
const SHOW_DELAY_MS = 4000;

export default function PromoPopup({ locale }: { locale: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // French-only campaign (dates, phone numbers and copy are baked into the
    // flyer image in French) — don't show it on the English site.
    if (locale !== 'fr') return;

    let alreadyDismissed = false;
    try {
      alreadyDismissed = sessionStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      // sessionStorage unavailable (private mode, blocked storage, etc.) —
      // fall back to showing the popup every visit rather than never.
    }
    if (alreadyDismissed) return;

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [locale]);

  useEffect(() => {
    if (!visible) return;

    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const close = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // ignore — worst case the popup reappears on the next page view
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Vacances de la Toussaint — Journée équitation & escalade"
      onClick={close}
    >
      <div
        className="relative w-full max-w-sm md:max-w-md bg-white rounded-[2rem] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Fermer"
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
        >
          <X size={20} />
        </button>

        <div className="relative w-full aspect-[2/3]">
          <Image
            src="/vacances toussaint.jpg"
            alt="Vacances de la Toussaint — journée équitation et escalade à La Palud-sur-Verdon, dimanche 18, mardi 20 et jeudi 22 octobre"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
        </div>

        <div className="p-6">
          <Link
            href="/fr/contact"
            onClick={close}
            className="button-glow w-full flex items-center justify-center py-4 text-sm"
          >
            RÉSERVER MA PLACE
          </Link>
        </div>
      </div>
    </div>
  );
}
