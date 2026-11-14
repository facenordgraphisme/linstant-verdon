# Audit SEO complet — linstantverdon.com

**Date :** 2026-11-14 · **Précédent audit :** 2026-08-07 (53/100) · **Type d'activité :** entreprise locale hybride (base à La Palud-sur-Verdon + zone d'intervention Gorges du Verdon), guides outdoor (canyoning, escalade, aventure, insolite, stages). FR par défaut sous `/fr`, EN sous `/en`. Next.js 16 + Sanity sur Vercel.

**Périmètre :** 64 URL crawlées (60 en 200, 4 redirections, 0 erreur) ; données réelles Google Search Console (propriété `sc-domain:linstantverdon.com`) ; PageSpeed Insights, CrUX et historique CrUX ; tests navigateur (Chrome, Playwright) ; lecture du code source. Les findings détaillés par domaine sont dans `findings/`, les captures dans `screenshots/` et les données brutes dans `raw/`.

---

## Résumé

### Score SEO : 64 / 100 (+11 depuis août)

| Catégorie | Poids | Score | Août |
|---|---|---|---|
| SEO technique | 22 % | 74 | 60 |
| Qualité du contenu | 23 % | 61 | 42 |
| SEO on-page | 20 % | 58 | — |
| Schema / données structurées | 10 % | 68 | 46 |
| Performance (CWV) | 10 % | 66 | — |
| Préparation à la recherche IA | 10 % | 61 | 50 |
| Images | 5 % | 45 | — |

Indicateurs complémentaires, hors score : SEO local 58 (50 en août) · Sitemap 82 · Préparation agents IA environ 50.

### Ce qui a progressé depuis août
- Les robots d'IA (GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot…) ne sont plus bloqués. Vérifié avec 17 user-agents : tous reçoivent une réponse 200 et une page identique.
- Il n'y a plus de soft 404 ni d'URL dupliquées : les URL invalides renvoient de vraies 404, et les URL dans la mauvaise langue redirigent en 308 vers la bonne.
- Le sitemap contient les URL EN, avec un hreflang réciproque. Les 8 URL inspectées sont indexées, avec le canonical attendu.
- En-têtes de sécurité, schema TouristTrip/Offer et BreadcrumbList sur les 34 fiches, FAQ passée à 11 questions, NAP cohérent, carte Google Maps sur la page contact.
- Accueil mobile : PageSpeed 75 → 98, LCP 5,3 s → 1,7 s.
- Depuis le 6 novembre, toutes les pages sont pré-rendues et servies depuis le cache CDN (57 réponses du cache sur 60).

### Les 5 problèmes critiques
1. **Le suivi des conversions Google Ads est bloqué depuis le 7 août** par la Content-Security-Policy (constaté dans Chrome : `ad.doubleclick.net` et `google.com/ccm/collect` refusés). Ce n'est pas un problème SEO, mais c'est le plus coûteux pour le client : ses campagnes sont optimisées sans données de conversion depuis 3 mois.
2. **La promesse « Paiement sur place • Réservation 100% Gratuite »**, affichée sur chaque fiche, contredit l'acompte de 50 % exigé dans la FAQ et les CGV.
3. **Des prix par groupe sont affichés « Prix / pers. »** (par exemple escalade initiation « 1 à 3 pers. : 200€ » sous « Prix / pers. »). Le visiteur comprend un prix quatre fois supérieur au marché.
4. **Une note de 4.9★ sur 276 avis est déclarée en JSON-LD sur 60 pages, mais n'est visible nulle part**, ce qui expose à une action manuelle Google pour données structurées trompeuses.
5. **Les liens « Mentions légales » et « Confidentialité » pointent vers `#`**, alors que ces pages sont obligatoires (LCEN, RGPD avec les cookies Ads). À cela s'ajoute une popup Toussaint expirée qui couvre l'accueil sur mobile.

### Les 5 gains rapides
1. CSP : ajouter les domaines Google Ads (15 min, `next.config.ts`).
2. Retirer la popup Toussaint et le `priority` de son image (15 min).
3. Navigation EN : corriger les 4 liens qui redirigent sur chaque page EN (30 min).
4. Corriger le texte du `BookingCTA` et retirer l'AggregateRating (15 min).
5. Retravailler le title et la meta « via ferrata » : environ 570 impressions en position 4 à 8 pour un CTR d'environ 1 %.

---

## Données Google réelles (Search Console)

| Période | Clics | Impressions | CTR | Position |
|---|---|---|---|---|
| 1 avr. → 16 juin (ancien site) | 281 | 10 300 | — | 8,1 |
| 17 juin → 31 juil. (refonte, en saison) | 436 | 11 900 | — | 10,9 |
| 3 derniers mois (11 août → 14 nov.) | 307 | 10 146 | 3,0 % | 10,2 |
| 28 derniers jours | 35 | 1 424 | 2,5 % | 12,3 |

- **Clics mensuels :** juillet 381, août 299, septembre 87, octobre 53. La baisse est en grande partie saisonnière (le canyoning s'arrête fin octobre), mais elle a commencé dès août. La Spam Update du 24 septembre est la seule mise à jour Google dans la fenêtre ; la corrélation est faible et rien ne permet de conclure.
- **Le trafic est surtout de marque :** environ 94 des 307 clics viennent de « l'instant verdon », avec un CTR supérieur à 40 %. Le trafic hors marque est quasi nul.
- **Mobile à la position 6,8, desktop à la position 17,4.** Les pages FR font 106 clics, les pages EN 28.
- **Opportunités :** « canyoning verdon » (387 impressions, position 17, 2 clics) et ses variantes (environ 300 impressions) ; « via ferrata verdon / gorges du verdon » (environ 570 impressions, position 4 à 8) ; « verdon climbing » (141 impressions, position 6,3, 0 clic) ; les noms de canyons (Baudan, Balène, Trou du Renard), à 50 à 110 impressions chacun et presque aucun clic.
- **Indexation :** les 8 URL clés sont indexées et Google retient le canonical déclaré. La page multi-activité 3 jours n'a pas été recrawlée depuis le 20 juillet. Un ancien sitemap (`sitemap-0.xml`, 55 URL) reste déclaré dans la GSC.
- **Recherche en ligne (hors GSC) :** le site n'apparaît pas dans les résultats échantillonnés pour les requêtes cibles. Celles-ci sont dominées par les places de marché (Manawa, Funbooker, CheckYeti…), les offices de tourisme et les guides éditoriaux avec tableaux comparatifs.

---

## SEO technique — 74/100
Détail : `findings/technical.md`, `findings/sitemap.md`.
- **Élevé :** le navbar et le footer EN pointent vers 4 URL FR qui redirigent (`Navbar.tsx:36-39`).
- **Élevé :** 8 slugs accentués apparaissent non encodés dans le sitemap ; demandée non encodée, l'URL renvoie 500. À terme, passer les slugs en ASCII.
- **Moyen :** og:image absente des pages qui surchargent `openGraph` (accueil, catégories, faq, contact, à-propos, blog).
- **Moyen :** faute de frappe dans le slug `canoyn-bas-jabron` ; `/studio` indexable ; `lastmod` = date du build ; `http://linstantverdon.com` fait 3 redirections ; ancien sitemap dans la GSC.
- **Bas :** `anthropic-ai` dans robots.txt est obsolète et la politique sur les robots d'entraînement est incohérente.

## Contenu — 61/100 · On-page — 58/100
Détail : `findings/content.md`, `findings/sxo.md`. E-E-A-T : Expérience 12/20, Expertise 19/25, Autorité 13/25, Confiance 17/30.
- **Critique :** promesse de paiement contraire aux CGV ; contradictions sur les fiches (âges, repas, prérequis, combinaison, « guide de haute montagne ») ; prix par groupe libellés par personne.
- **Élevé :**
  - Fiches minces (142 à 306 mots de contenu propre), sans difficulté, saison ni approche.
  - Blog : 2 articles, rien depuis mai, et 3 liens vers d'anciennes URL WordPress en 404.
  - Avis invisibles et pages légales absentes.
  - Textes FR restés sur les pages EN.
- **On-page :** H1 génériques (l'accueil n'affiche que la marque, et aucun H1 ne contient « canyoning Verdon ») ; titles de 66 à 104 caractères ; meta tronquées automatiquement à 140 caractères ; H2 → H4 → H3 ; pas de liens entre fiches ; le sélecteur de langue renvoie vers l'accueil.
- **SXO :** `/fr/evenementiel` ne répond pas à l'intention « EVJF » (pas de formules ni de prix). Les hubs n'ont pas le tableau comparatif présent dans les pages qui se classent. Persona la plus mal servie : l'organisatrice d'EVJF (40/100) ; la mieux servie : la famille avec ados (69/100).

## Schema — 68/100
Détail et JSON-LD prêt à coller : `findings/schema.md`.
- **Élevé :** AggregateRating non visible ; graphe d'entités non relié (le `@id` est le domaine nu, qui redirige ; les guides sont dupliqués sans `@id`).
- **Moyen :** LocalBusiness complet répété sur toutes les pages ; TourSchema (`eligibleCustomerType` mal utilisé, `itinerary` = « 2h30 », description coupée au milieu d'un mot, `touristType` identique partout) ; pas de BreadcrumbList sur les catégories ni le blog ; pas de WebSite ni de ContactPage.
- **Bas :** horaires 08:00-20:00 toute l'année alors que l'activité est saisonnière ; `sameAs` qui pointe vers une recherche Maps ; `dateModified` = `datePublished`.

## Performance — 66/100 · Images — 45/100
Détail : `findings/performance.md`.

| Page | Mobile (score / LCP) | Desktop (score / LCP) |
|---|---|---|
| /fr | 98 / 1,7 s | 73 / 6,0 s |
| /fr/canyoning | 61 / **19,2 s** | 90 / 0,3 s |
| /fr/canyoning/canyon-artuby | 67 / **11,2 s** | 96 / 1,1 s |

- **Terrain (CrUX, origine, p75) :** LCP 3,83 s (à améliorer, en dégradation depuis le printemps) ; INP 158 ms (bon) ; CLS 0,02 (0,12 sur /fr) ; TTFB 1,42 s.
- **Causes :**
  - Héros des pages internes en `background-image` CSS, non optimisés.
  - Images de cartes de 2 à 6,7 Mo, avec un poids de page /fr de 12,6 Mo sur mobile.
  - `priority` sur l'image de la popup.
  - Vidéo de 59,6 Mo sur une URL r2.dev.
  - JS inutilisé (Maps, gtag, GSAP).
- **Images :** des `<img>` bruts restent dans `AboutSection` et `a-propos` ; des textes alt sont génériques ; les formats AVIF/WebP ne sont pas activés.

## Préparation IA — 61/100
Détail : `findings/geo.md`.
- **Fonctionne :** l'accès des robots, llms.txt (corrigé et cohérent) et le rendu serveur.
- **Élevé :**
  - L'accueil ne dit jamais ce qu'est l'entreprise.
  - Les faits clés (prix, âge, durée) sont éclatés en fragments dans les cartes et donc illisibles par les extracteurs.
  - Certains faits se contredisent.
- **Moyen :** popup expirée ; agents (le burger et le formulaire n'ont pas de nom accessible, la réservation passe par une application JS tierce) ; robots.txt incohérent.

## SEO local — 58/100
Détail : `findings/local.md`.
- **Fonctionne :** NAP cohérent partout ; carte et lien Maps sur le contact ; lien TripAdvisor aligné avec le schema.
- **Élevé :**
  - La fiche Google Business Profile n'est pas reliée (recherche générique, et un lien court mène à un autre lieu).
  - Le lien Verdon Tourisme est toujours en 404.
  - Aucun avis n'est visible.
  - Aucune page Castellane, Moustiers ou La Palud.
- **Moyen :** diplômes, assurance et SIRET ne figurent que sur la FAQ ; pas de page de mentions légales.

## Visuel et mobile
Détail : `findings/visual.md`, captures dans `screenshots/`.
- Popup Toussaint plein écran sur mobile.
- Accroche d'en-tête peu contrastée, sous le header, sur les catégories et le contact : le bug d'août est corrigé à moitié.
- Pas de CTA « Réserver » dans le header mobile.
- Aucun signal de confiance au-dessus de la ligne de flottaison.
- Le bouton WhatsApp recouvre le texte sur mobile.
- Points validés : pas de scroll horizontal, un seul H1 par page, corps de texte en 16 px.

---

## Plan d'action
Voir `ACTION-PLAN.md` : 35 actions en 4 phases, avec fichiers et effort estimé.

## Limites
- GA4 non configuré, donc pas de données de trafic organique côté Analytics.
- Pas de DataForSEO : positions SERP échantillonnées hors Google.fr live, sans volumes de recherche.
- Fiche GBP, TripAdvisor (bloque les robots), annuaires (PagesJaunes, Bing Places, Apple) et tunnel Book'Adventure non audités.
- Données CrUX limitées à l'origine et à /fr.
