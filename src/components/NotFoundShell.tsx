'use client';

import { usePathname } from 'next/navigation';
import { getDictionary } from '@/lib/dictionaries';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloating from '@/components/WhatsAppFloating';
import NotFoundContent from '@/components/NotFoundContent';

// Full-page 404 (navbar + footer) used by app/global-not-found.tsx, which
// renders outside the [locale] layout. Locale is read from the URL client-side
// so the 404 stays fully static (no request-time render on Vercel).
export default function NotFoundShell() {
  const pathname = usePathname() || '';
  const locale = pathname.startsWith('/en') ? 'en' : 'fr';
  const dict = getDictionary(locale);
  return (
    <>
      <Navbar dict={dict} locale={locale} />
      <NotFoundContent locale={locale} />
      <Footer dict={dict} locale={locale} />
      <WhatsAppFloating />
    </>
  );
}
