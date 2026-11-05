import NotFoundContent from '@/components/NotFoundContent';

// not-found receives no params. The old version read the locale from request
// headers (`headers()`), which forced every page under [locale] into dynamic
// rendering — a full server render + Sanity fetch on every request, which blew
// the Vercel Fluid Active CPU quota. Instead, render both languages statically
// and let CSS keep the one matching <html lang> (set by the [locale] layout).
export default function LocaleNotFound() {
  return (
    <>
      <style>{`html[lang="en"] .nf-fr, html:not([lang="en"]) .nf-en { display: none; }`}</style>
      <div className="nf-fr"><NotFoundContent locale="fr" /></div>
      <div className="nf-en"><NotFoundContent locale="en" /></div>
    </>
  );
}
