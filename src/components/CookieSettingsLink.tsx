'use client';

import { OPEN_EVENT } from './CookieConsent';

export default function CookieSettingsLink({ label, className }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={`${className ?? ''} bg-transparent border-none p-0 cursor-pointer uppercase`}
    >
      {label}
    </button>
  );
}
