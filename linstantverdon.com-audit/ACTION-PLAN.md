# Plan d'action — linstantverdon.com (audit du 2026-11-14)

Score SEO : **64/100** (53 le 2026-08-07). Classé par priorité. « Code » = repo Next.js, « Sanity » = contenu à corriger dans le Studio, « Hors site » = action sur un service externe.
Le détail et les preuves de chaque point sont dans `findings/*.md`.

---

## Phase 1 — Urgent (cette semaine)

| # | Action | Où | Effort |
|---|---|---|---|
| 1 | **Débloquer le suivi Google Ads.** La CSP ajoutée le 7 août bloque les envois de conversions (`ad.doubleclick.net`, `www.google.com/ccm/collect`), constaté dans Chrome. Ajouter à `connect-src` et `img-src` : `https://www.google.com https://*.doubleclick.net https://www.googleadservices.com https://googleads.g.doubleclick.net https://*.google.fr`, et à `script-src` `https://www.googleadservices.com https://googleads.g.doubleclick.net`. Ensuite, vérifier dans Google Ads que les actions de conversion repassent en « Active ». Prévenir le client que les conversions d'août à novembre sont sous-comptées. | Code `next.config.ts` | 15 min |
| 2 | **Retirer la popup Toussaint expirée** (18-22 oct.), plein écran sur mobile. Idéalement, la piloter par des dates de début et de fin dans Sanity. | Code `src/app/[locale]/page.tsx`, `PromoPopup.tsx` | 15 min |
| 3 | **Corriger « Paiement sur place • Réservation 100% Gratuite »** : c'est faux, un acompte de 50 % est demandé (FAQ et CGV). Remplacer par « Acompte 50 % • Annulation gratuite jusqu'à J-6 » (EN idem). | Code `src/components/BookingCTA.tsx:71-72` | 5 min |
| 4 | **Libellé de prix.** Les prix par groupe sont affichés « Prix / pers. » (escalade demi-journée 200 €/250 €, Carelle, soirée portaledge…). Ajouter un champ « unité de prix » (par personne / par groupe) et afficher « à partir de 50 €/pers. (groupe de 4) ». Corriger aussi `price` / `unitText` dans le schema. | Code (template activité) + Sanity | 1-2 h |
| 5 | **Supprimer l'AggregateRating 4.9/276 non visible**, injectée sur 60 pages et contraire à la politique Google sur les avis. Sinon, afficher réellement la note et des avis (widget TripAdvisor/Google) sur l'accueil et les fiches. | Code `src/components/LocalBusinessSchema.tsx:41-47` | 10 min (retrait) |
| 6 | **Mentions légales et politique de confidentialité** : les liens du footer pointent vers `#`. Ces pages sont obligatoires (LCEN, et cookies Google Ads → RGPD). Créer `/fr/mentions-legales` et `/fr/confidentialite` (+ EN). | Code + contenu client | 2 h |
| 7 | **Contradictions sur les fiches activités** : Artuby (vendu « initiation » mais prérequis rappel/escalade ; pas de combinaison listée), Nuit portaledge (14 vs 16 ans ; repas inclus vs non fournis), Trou du Renard (12 vs 10 ans ; « guide de haute montagne »), Balène (6 vs 7-8 ans). Faire valider les bonnes valeurs par Emma & Angèle. | Sanity | 1 h + validation client |

## Phase 2 — Fort impact (semaines 2-3)

| # | Action | Où | Effort |
|---|---|---|---|
| 8 | **Navigation EN** : le navbar et le footer pointent vers `/en/escalade`, `/en/aventures`, `/en/insolite`, `/en/stages`, qui redirigent (308) sur chaque page EN. Utiliser une table de slugs par langue partagée. | Code `Navbar.tsx:36-39`, `Footer.tsx` | 30 min |
| 9 | **Textes FR sur les pages EN** : « RÉSERVER VOTRE SORTIE », environ 12 chaînes sur `/en`, footer, encart auteur du blog, planning `/en/weekend`, « local union ». | Code `dictionaries.ts` + Sanity | 1-2 h |
| 10 | **LCP mobile 11 à 19 s sur les pages internes** : les héros sont des `background-image` CSS. Passer à `<Image fill priority sizes="100vw">` (catégories, fiches, faq, contact, blog, à-propos). | Code `[category]/page.tsx:244,528,770`, `[category]/[slug]/page.tsx:300`… | 2-3 h |
| 11 | **Images lourdes** : `events.jpg.jpeg` 6,7 Mo, `canyon.jpeg` 2,9 Mo (×2), `event1/2` 2-2,4 Mo, `multipitch.jpeg` 1,9 Mo, `favicon.svg` 0,9 Mo dupliqué dans chaque dossier. Ré-exporter sous 200-300 Ko, `ActivityGrid` en `next/image`, `images.formats: ['image/avif','image/webp']`. Retirer `priority` sur `PromoPopup`. | Code `public/assets`, `ActivityGrid.tsx`, `next.config.ts` | 1-2 h |
| 12 | **Pages piliers « canyoning verdon » (387 impressions, position 17, CTR 0,5 %) et « escalade verdon »** : H1 descriptif (« Canyoning dans les Gorges du Verdon »), paragraphe de définition de 40 à 60 mots, tableau comparatif HTML des canyons (niveau, âge, durée, prix/pers., saut max), FAQ ciblée, liens vers chaque fiche. | Code (template catégorie) + Sanity | 1 jour |
| 13 | **Accueil** : le H1 n'est que la marque. Mettre un H1 et un paragraphe qui disent ce qu'est l'entreprise (guides diplômés d'État, canyoning et escalade, Gorges du Verdon, La Palud), et afficher les signaux de confiance au-dessus de la ligne de flottaison. | Code `Hero.tsx` | 1 h |
| 14 | **Via ferrata** : environ 570 impressions en position 4 à 8, CTR environ 1 %. Retravailler le title et la meta de la page qui ressort, ou créer une page dédiée si l'activité est proposée. | Sanity / code | 1 h |
| 15 | **Titles et meta des fiches** : 66 à 104 caractères avec suffixe répété ; meta tronquées à 140 caractères avec « … ». Ajouter des champs `seoTitle` / `seoDescription` dans Sanity, avec un fallback coupé au mot. | Code `[category]/[slug]/page.tsx` + schéma Sanity | 2 h |
| 16 | **Liens morts** : 3 liens vers d'anciennes URL WordPress dans l'article de printemps (404), et le lien Verdon Tourisme (404) dans le footer et le `sameAs`. | Sanity + code `Footer.tsx`, `LocalBusinessSchema.tsx` | 30 min |
| 17 | **Google Business Profile** : `sameAs`, le bouton et l'iframe utilisent une recherche Maps générique, et un lien court pointe vers « le point sublime verdon ». Utiliser l'URL de la fiche GBP réelle (place ID). | Code `LocalBusinessSchema.tsx`, `ContactSection.tsx` + hors site | 30 min |
| 18 | **CTA de réservation mobile** : aucun bouton visible dans le header mobile, et sur Artuby le CTA n'apparaît qu'après 4 500 px. Ajouter une barre de réservation collante sur les fiches. | Code `Navbar.tsx`, template fiche | 1-2 h |

## Phase 3 — Contenu et autorité (mois 2)

| # | Action | Où |
|---|---|---|
| 19 | Enrichir les fiches (142 à 306 mots de contenu propre) : déroulé, difficulté et cotation, approche, sauts et rappels, saison, ce qu'il faut apporter, mini-FAQ, liens vers les activités proches. Corriger la hiérarchie H2 → H4 → H3. | Sanity + template |
| 20 | Page `/fr/evenementiel/evjf-evg-verdon` avec des formules et des prix par personne : aucun opérateur du Verdon ne se positionne sur « evjf verdon ». | Sanity + code |
| 21 | Blog : 2 articles, aucun depuis le 15 mai. Viser 1 à 2 articles par mois : « quel canyon choisir dans le Verdon », « prix du canyoning dans le Verdon », « escalade grande voie Verdon débutant », un top des activités insolites. | Sanity |
| 22 | Pages locales Castellane, Moustiers et La Palud (canyons accessibles depuis chacune, temps d'accès) : ces villes n'apparaissent nulle part sur le site. | Sanity + code |
| 23 | Schema : `@id` stable (`/#organization`) ; LocalBusiness complet seulement sur l'accueil et le contact, référencé ailleurs ; corriger TourSchema (`eligibleCustomerType`, `itinerary`, description tronquée, `touristType`) ; BreadcrumbList sur catégories et blog ; WebSite ; horaires saisonniers ; `geo` plus précis. JSON-LD prêt à coller dans `findings/schema.md`. | Code |
| 24 | Le sélecteur de langue renvoie vers l'accueil de l'autre langue : il doit pointer vers la page équivalente. | Code `Navbar.tsx` |
| 25 | CGV : remplacer l'email gmail par contact@ et « Emma Four » par le bon nom ; uniformiser « L'Instant Verdon ». | Sanity |
| 26 | Accessibilité et agents : `aria-label` sur le burger et sur le bouton de fermeture ; `aria-expanded` sur les menus ; labels associés aux champs du formulaire et `autocomplete`. | Code `Navbar.tsx`, `ContactSection.tsx` |
| 27 | Off-site : élément Wikidata, vidéos YouTube intégrées sur les fiches, démarchage des listicles « activités insolites Verdon » et de l'office de tourisme. | Hors site |

## Phase 4 — Hygiène et suivi (continu)

| # | Action | Où |
|---|---|---|
| 28 | Sitemap : encoder les slugs accentués (`encodeURI`), qui renvoient 500 s'ils sont demandés non encodés ; à terme, slugs ASCII avec redirections. Mettre un `lastmod` réel pour les pages statiques. Ajouter `x-default`. | Code `sitemap.ts` |
| 29 | Corriger le slug `canoyn-bas-jabron` → `canyon-bas-jabron`, avec une redirection 308. | Sanity + `next.config.ts` |
| 30 | Supprimer l'ancien sitemap `https://linstantverdon.com/sitemap-0.xml` dans la Search Console. | Hors site (GSC) |
| 31 | `http://linstantverdon.com/` fait 3 redirections avant `/fr` : configurer le domaine nu dans Vercel pour rediriger directement vers `https://www.linstantverdon.com`. | Hors site (Vercel) |
| 32 | `/studio` : ajouter `X-Robots-Tag: noindex`. og:image par défaut sur les pages qui en surchargent `openGraph`. | Code `next.config.ts`, pages |
| 33 | robots.txt : `anthropic-ai` est obsolète ; décider d'une politique cohérente pour les robots d'entraînement (bloquer GPTBot, ClaudeBot, CCBot et Google-Extended, ou n'en bloquer aucun). | Code `robots.ts` |
| 34 | Vidéo de fond : 59,6 Mo sur une URL `r2.dev` de développement. Ré-encoder sous 5 Mo et la servir via un domaine personnalisé. | R2 + code `Hero.tsx` |
| 35 | Suivre dans la GSC les requêtes « canyoning verdon », « escalade verdon » et « via ferrata verdon », et le CTR des fiches, chaque mois. Le trafic actuel est surtout de marque (environ 94 clics sur 307 en 3 mois). | GSC |
