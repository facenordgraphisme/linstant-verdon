'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Google Consent Mode v2. The default state ("denied") is set in the inline
// gtag script of [locale]/layout.tsx, before the tag is configured; this
// banner only records the visitor's choice and sends the matching update.
// The choice lives in localStorage (client only — never read cookies/headers
// on the server, that would make every page dynamic).
export const CONSENT_KEY = 'liv-consent-v1';
export const OPEN_EVENT = 'liv-open-consent';

type Choice = 'granted' | 'denied';

function applyConsent(choice: Choice) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.('consent', 'update', {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
}

export default function CookieConsent({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const fr = locale !== 'en';

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CONSENT_KEY);
    } catch {
      // storage blocked: ask every visit
    }
    if (stored !== 'granted' && stored !== 'denied') setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const choose = (choice: Choice) => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // ignore
    }
    applyConsent(choice);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={fr ? 'Gestion des cookies' : 'Cookie settings'}
      className="fixed inset-x-3 bottom-3 md:inset-x-auto md:left-6 md:bottom-6 md:max-w-md z-[90] bg-white rounded-3xl shadow-2xl border border-slate-100 p-6"
    >
      <p className="text-sm text-slate-700 font-medium leading-relaxed">
        {fr
          ? "Nous utilisons des cookies Google Ads pour mesurer l'efficacité de nos annonces. Aucun cookie publicitaire n'est déposé sans votre accord."
          : 'We use Google Ads cookies to measure how well our ads work. No advertising cookie is set without your consent.'}{' '}
        <Link href={`/${fr ? 'fr' : 'en'}/confidentialite`} className="underline hover:text-primary">
          {fr ? 'En savoir plus' : 'Learn more'}
        </Link>
      </p>
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={() => choose('denied')}
          className="flex-1 py-3 rounded-2xl border border-slate-200 text-slate-800 font-black uppercase text-xs tracking-wider hover:bg-slate-50 transition-colors"
        >
          {fr ? 'Refuser' : 'Decline'}
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          className="flex-1 py-3 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-wider hover:opacity-90 transition-opacity"
        >
          {fr ? 'Accepter' : 'Accept'}
        </button>
      </div>
    </div>
  );
}
