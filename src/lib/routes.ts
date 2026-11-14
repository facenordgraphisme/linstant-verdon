// Category URL segment per locale. Navigation must link to these canonical
// segments directly: the aliases (e.g. /en/escalade) only exist as 308
// redirects in next.config.ts.
export const categorySlugs = {
  canyoning: { fr: 'canyoning', en: 'canyoning' },
  escalade: { fr: 'escalade', en: 'climbing' },
  aventures: { fr: 'aventures', en: 'adventure' },
  stages: { fr: 'stages', en: 'weekend' },
  insolite: { fr: 'insolite', en: 'unusual-activities' },
  evenementiel: { fr: 'evenementiel', en: 'evenementiel' },
} as const;

export type CategoryKey = keyof typeof categorySlugs;
type Locale = 'fr' | 'en';

const asLocale = (locale: string): Locale => (locale === 'en' ? 'en' : 'fr');

export function categoryHref(key: CategoryKey, locale: string) {
  const l = asLocale(locale);
  return `/${l}/${categorySlugs[key][l]}`;
}

// Same page in the other language: swap the locale prefix and translate the
// category segment (activity and blog slugs are shared between languages).
export function switchLocalePath(pathname: string | null, target: string) {
  const to = asLocale(target);
  const parts = (pathname || '/').split('/').filter(Boolean);
  if (parts[0] !== 'fr' && parts[0] !== 'en') return `/${to}`;
  const from = parts[0] as Locale;
  parts[0] = to;
  if (parts[1]) {
    const entry = Object.values(categorySlugs).find((c) => c[from] === parts[1]);
    if (entry) parts[1] = entry[to];
  }
  return `/${parts.join('/')}`;
}
