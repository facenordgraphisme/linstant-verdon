# AI Search Readiness (GEO) Findings: linstantverdon.com
**Audit date:** 2026-11-14 (previous: 2026-08-07, score 50/100)
**Scope:** live UA tests (17 crawler/agent UAs x 4 URLs), robots.txt, /llms.txt, discovery files, Markdown delivery, passage-level citability on /fr, /fr/canyoning, /fr/escalade, /fr/faq, /fr/canyoning/canyon-artuby, /fr/a-propos, /fr/contact; source `src/app/robots.ts`, `src/proxy.ts`, `public/llms.txt`, `src/components/{Navbar,ContactSection,PromoPopup}.tsx`; crawl data `raw/crawl.json` (60 URLs, all 200).
DataForSEO MCP not available, so platform scores are estimates and were not queried live.

## Score: 61/100 (+11 vs August)

| Dimension (weight) | Score | Note |
|---|---|---|
| Citability (25%) | 62 | FAQ now has 11 self-contained Q&As, with the cancellation policy stated inline. Detail pages give price, duration and minimum age. The homepage has no definition passage, the listing cards are fragmented tokens, and a few facts contradict each other. |
| Structural Readability (20%) | 55 | FAQ questions are visible H3s. Detail pages have a single H2, "Description", and the specs sit in unlabelled divs. There is no comparison table. |
| Multi-Modal (15%) | 45 | 0 images without alt text across 60 URLs and galleries are present. The hero video has no `<track>` or transcript. There are no tables. |
| Authority & Brand (20%) | 55 | Good LocalBusiness + Person + credential schema and sameAs links (TripAdvisor, YouTube, Verdon Tourisme). No Wikipedia/Wikidata entity. Naming and contact details are inconsistent (see F4), and the rating appears only in JSON-LD. |
| Technical Accessibility (20%) | 82 | Every AI UA gets 200 with byte-identical HTML. Pages are prerendered (`X-Nextjs-Prerender: 1`, `is_spa: false`). llms.txt is accurate. No Markdown variants, no llms-full.txt. Google-Extended is blocked. |

Weighted: 0.25x62 + 0.20x55 + 0.15x45 + 0.20x55 + 0.20x82 = **60.7, rounded to 61**

Agent readiness (separate, informational): **~50/100**. Content is fully readable, but the action layer is weak: unnamed nav buttons, labels not tied to their inputs, an expired modal on the homepage, a booking engine on a third-party JS SPA, and no discovery files.

---

## What works

- **The August access wall is gone.** `src/proxy.ts` now only redirects un-prefixed paths to `/fr/...`, with no UA logic. Live check on 2026-11-14 against /fr, /fr/canyoning, /fr/faq and /llms.txt: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Perplexity-User, Google-Extended, Googlebot, bingbot, CCBot, Applebot, Amazonbot, anthropic-ai, claude-web and DuckAssistBot all returned **200**, with identical byte sizes per URL (133,160 / 145,147 / 123,012 / 1,249). No cloaking and no UA-based variation.
- **robots.txt matches `robots.ts` exactly.** `*` is allowed except /studio. Every search/answer crawler is allowed: OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, Bingbot, Applebot. The sitemap is declared.
- **The /llms.txt address mismatch is fixed.** It now reads "395 Chem. de Haut Bourras, 04120 La Palud-sur-Verdon", the same as the JSON-LD `PostalAddress`, the /fr/contact meta description and /fr/a-propos. Phone, email, guides and credentials, "since 2018", the €50 starting price and the season (mid-April to end of October) all match the site. Served as `text/plain; charset=utf-8`, 200, cached at the edge.
- **The FAQ is now a real citation asset.** It went from 3 to 11 Q&As (11 on /en/faq too), as visible H3 questions plus `FAQPage` JSON-LD. Answers are short, direct and self-contained: 25 m swimming requirement, cancellation tiers (6 days / 5 days-48h / <48h = 50%), 50% deposit, payment methods (CB, ANCV, transfer, cash), insurance, season, what is included.
- **Detail pages have spec sheets.** Artuby shows "50€ Prix / pers.", "2h30 Durée", "7 ans+ Âge min.", meeting point (L'écluse de Comps-sur-Artuby), inclusions and prerequisites. The August "missing duration" gap is closed. `Product`+`TouristTrip` JSON-LD carries price, duration and age.
- **/fr/canyoning lists all 8 canyons** with price (€50–95), duration (2h–7h) and minimum age (6–14), and ends with a 3-question mini FAQ. /fr/escalade gives concrete figures: 200+ multi-pitch routes, 4a–8b, 100–1000 m.
- **Entity schema:** `LocalBusiness`+`SportsActivityLocation` with geo, areaServed, founder/employee `Person` + `EducationalOccupationalCredential` (with years), and sameAs links (Facebook, Instagram, YouTube, TripAdvisor, Verdon Tourisme, Maps). /fr/a-propos adds per-guide Person blocks. Blog posts have `BlogPosting` with an author.
- **Bilingual parity.** All 30 FR pages have EN counterparts that return 200.

---

## Findings

### High

**F1. The homepage has no extractable "who/what/where" passage.**
The H1 is just "L'Instant Verdon" and the hero is a tagline ("Là où l'aventure rencontre la nature"). In trafilatura's boilerplate-stripped output, the first passage is a **blog teaser** ("Les 3 activités à faire dans le Verdon cet été…"), followed by "Le Syndicat Local / Fondé en 2018 / …un syndicat local (regroupement de travailleurs indépendants)". An LLM summarising the homepage would describe the business as a "syndicat local" before it describes it as a canyoning and climbing guide company. Marie Oddo is not mentioned on the homepage at all.
*Fix:* add a 40–60 word definition paragraph directly under the H1 (server-rendered), for example: "L'Instant Verdon est un bureau de guides diplômés d'État basé à La Palud-sur-Verdon (04) depuis 2018. Emma Aglaé, Angèle Kanapa et Marie Oddo encadrent canyoning (dès 50 €, de 6 à 14 ans min. selon le canyon), escalade en falaise et grandes voies, parcours aventure et nuits en portaledge dans les Gorges du Verdon, de mi-avril à fin octobre." Also make the H1 descriptive, for example "Guides canyoning & escalade dans les Gorges du Verdon". Do the same on /en. *Effort: 30 min.*

**F2. The canyon and route cards are fragmented tokens, not sentences or tables.**
On /fr/canyoning, the structured facts render as `À partir de|50|€|…|Âge min.|6|ans|Durée|2h`. trafilatura drops the whole "Notre Sélection" block from `extracted_text`, so the best fact set on the site (8 canyons x price/duration/age) is invisible to passage-level extractors. The same pattern applies on /fr/escalade, /fr/aventures and /fr/insolite.
*Fix:* add a real HTML `<table>` below the cards, for example "Comparatif des canyons": Canyon | Niveau | Âge min. | Durée | Prix dès. Alternatively give each card a one-line sentence ("La Clue d'Artuby : 2h30, dès 7 ans, à partir de 50 €/pers."). Tables are among the formats AI answers lift most often. *Effort: 1–2 h (component over existing Sanity fields).*

**F3. Facts contradict each other across pages, which weakens answer confidence.**
- Balène minimum age: card says **6 ans**, but /fr/faq and the /fr/canyoning FAQ say "dès 7-8 ans (Balène Pitchoune, Bas-Jabron)".
- Baudan-Baou: the /fr/canyoning FAQ calls it accessible "dès 7-8 ans", but the card says **8 ans**.
- Artuby: /fr/canyoning recommends it for "une première sortie", and the page itself says "tous niveaux… parfait pour la découverte" with `touristType: Débutants`, but its prerequisites say "**Avoir déjà pratiqué la descente en rappel ou l'escalade**". An LLM asked "Artuby pour débutant ?" gets conflicting evidence.
*Fix:* make the card/Sanity value the single source of truth and generate the FAQ age text from it, or rewrite it as "dès 6 ans (Balène), 8 ans (Bas-Jabron, Baudan-Baou)". Correct the Artuby prerequisites in Sanity. *Effort: 30 min.*

### Medium

**F4. Entity and NAP inconsistencies inside /fr/faq (CGV and insurance blocks).**
- The CGV give the booking email as **linstantverdon@gmail.com**. Everywhere else (llms.txt, schema, contact) it is **contact@linstantverdon.com**.
- The insurance list reads "Assurances **Emma Four**", but the guide is named **Emma Aglaé** everywhere else, including the Person schema. An LLM may treat this as a fourth person or as conflicting data.
- Legal form is described as both "bureau des moniteurs… Syndicat Local" and "regroupement de travailleurs indépendants", while the schema says LocalBusiness. This is acceptable, but it should be stated once and consistently.
*Fix:* use contact@ in the CGV. If "Four" is Emma's legal surname, say so once ("Emma Aglaé (Four)") or use the public name. *Effort: 10 min in Sanity.*

**F5. The expired Toussaint promo modal still fires on the FR homepage.**
`PromoPopup` is mounted in `src/app/[locale]/page.tsx`. Four seconds after load it opens an `aria-modal="true"` full-screen dialog, locks body scroll, and advertises dates (18/20/22 October) that have passed. Browser agents (ChatGPT agent, Claude in Chrome, Perplexity Comet) land on a modal they must dismiss before they can act, and they read stale offer data. The dialog itself is well built: role, label, Escape, and a named close button.
*Fix:* remove the mount now. For future campaigns, add an `endDate` check in the component (`if (Date.now() > END) return null`). *Effort: 5 min.*

**F6. Agent accessibility tree: unnamed controls, and labels not tied to inputs.**
- In `Navbar.tsx`, the mobile hamburger (around line 155) and the overlay close button (line 213) are icon-only `<button>`s with **no accessible name**, so they show up as `button ""` in the AX tree. The "Activités" dropdown button has no `aria-expanded`/`aria-controls`, and the menu opens on hover only.
- In `ContactSection.tsx`, the `<label>`s have no `htmlFor` and the inputs have no `id`, so names fall back to the placeholder. There are no `autocomplete` attributes (`name`, `email`, `tel`). Submission goes through EmailJS on the client (`e.preventDefault()`), so no-JS or HTTP-level agents cannot submit, and the form has no `action`.
- Social and WhatsApp icon links rely on `title` only. This works, but `aria-label` is more reliable.
- The FAQ H3s contain a decorative `<span>?</span>`, so the heading text extracts as "?Quel équipement…". Add `aria-hidden="true"` to the span.
*Fix:* add `aria-label={locale==='fr'?'Ouvrir le menu':'Open menu'}` / `'Fermer le menu'`, `aria-expanded` and `aria-controls` on the toggles, matching `id`/`htmlFor` pairs, and `autocomplete="name|email|tel"`. *Effort: 30 min.*

**F7. The booking flow is a third-party JS SPA with no machine-readable booking path.**
"Réserver" goes to `app.book-adventure.fr/public/booking/…` (Angular SPA, Stripe). Its static HTML is an 11 KB shell with no content. Agents must fully render it, and its own robots.txt returns HTML rather than a robots file. The site has no `potentialAction`/`ReserveAction` in schema, and the Offer `url` points back to the activity page rather than to the per-product booking URL (`?productId=…`), which already exists in the page links.
*Fix:* in the `Product`/`TouristTrip` JSON-LD, set `offers.url` to the per-product Book'Adventure URL, or add `potentialAction: {"@type":"ReserveAction","target":"<booking url>"}`. Keep the phone and WhatsApp CTAs, which already work as agent-friendly fallbacks. *Effort: 30 min.*

**F8. Google-Extended is blocked in robots.txt, at a Gemini visibility cost.**
Blocking Google-Extended does **not** affect Google Search or AI Overviews, which follow Googlebot, and Googlebot is allowed. It does stop the content being used for **Gemini app / Vertex grounding** and for training. For a small tourism business that wants to be recommended, this is probably a net loss. The rest of the training opt-out list is also incoherent: `anthropic-ai` is a legacy UA (Anthropic's training crawler is **ClaudeBot**, which is allowed), and **GPTBot, CCBot and Applebot-Extended are allowed**. So the file blocks training for Google and Cohere but not for OpenAI, Anthropic, Common Crawl or Apple.
*Fix:* choose a policy. To maximise visibility (recommended), remove `Google-Extended` and the no-op `anthropic-ai`. To opt out of training consistently, add `GPTBot`, `ClaudeBot`, `CCBot` and `Applebot-Extended`, accepting the trade-off. Never block OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, Bingbot or Applebot. *Effort: 5 min (`src/app/robots.ts`).*

### Low

**F9. llms.txt is accurate but thin, and not in the canonical llms.txt link format.**
URLs are bare, not `- [Titre](url): description`. The EN section lists only 3 of 11 EN hubs (missing /en/adventure, /en/weekend, /en/unusual-activities, /en/evenementiel, /en/a-propos, /en/faq, /en/contact). No activity detail pages are listed, and there is no per-activity price, duration or age, which is the exact data LLMs are asked about. There is no llms-full.txt (404).
*Fix:* rewrite as markdown links with one-line descriptions, add a "Canyons" section (name, duration, minimum age, price from), and fill in the EN list. Ideally generate it from Sanity through a route handler (`src/app/llms.txt/route.ts`) so it cannot drift again. Note that the email in the CGV is different (see F4). *Effort: 1 h.*

**F10. No Markdown delivery and no discovery files.**
`Accept: text/markdown` returns HTML. `/fr.md`, `/fr/canyoning.md`, `/llms-full.txt`, `/.well-known/*` (agent card, MCP, api-catalog, security.txt), RSS feed, web manifest and RSL license all return 404. Apart from llms.txt, none of these are needed for ranking or citation. A blog RSS feed (`/fr/feed.xml`) and per-page Markdown are low-cost extras.
*Fix (optional):* add an RSS route for the blog and an `/{locale}/{path}.md` route handler that serialises the Sanity portable text. *Effort: 2–3 h.*

**F11. Ratings and freshness signals exist only in markup.**
`AggregateRating` 4.9 / 276 is in JSON-LD on every page, but no visible text shows the rating or review count. Google treats self-serving LocalBusiness ratings as ineligible, and invisible ratings are a trust and consistency risk. Service and detail pages have no visible "mis à jour le" date or `dateModified` (blog posts do). `openingHoursSpecification` claims 08:00–20:00 every day, all year, which conflicts with "mi-avril à fin octobre".
*Fix:* show "4,9/5 sur 276 avis (TripAdvisor/Google)" with a link to the source, or remove `aggregateRating`. Add seasonal `validFrom`/`validThrough` to the opening hours. *Effort: 30 min.*

**F12. The hero video has no captions or transcript.** It is an autoplay muted loop with `<track>` count 0. This is decorative, so impact is low. A short visible caption describing the scene would add some extractable text.

---

## Brand / entity presence

| Signal | Status |
|---|---|
| Wikipedia (fr) | **None.** 0 search hits for "instant verdon". Not realistic for a local SME. |
| Wikidata | **None.** No entity. A Wikidata item (instance of: guide company, location La Palud-sur-Verdon, website, sameAs) is low effort and feeds Google/Bing knowledge graphs. *Effort: 30 min.* |
| YouTube | A channel exists and is in sameAs (UCvOPoMuJYkrMgZWiXiErugw). Its activity level could not be verified. YouTube mentions correlate most strongly with AI citations (~0.74), so 5–10 short canyon videos titled like "Canyon de l'Artuby avec guide – Verdon", with descriptions linking to the detail pages, are the best available off-site lever. |
| Reddit | Not verifiable: the API blocked the request. Likely little or no presence. Organic answers in r/france, r/travel or r/climbing threads about the Verdon would help, but they must come from real customers or staff and must not be spam. |
| TripAdvisor / Verdon Tourisme / Google Maps | Present and linked via sameAs. These are the strongest third-party entity corroboration right now. |
| LinkedIn | Not in sameAs. Optional. |

---

## Platform estimates (qualitative, not live-queried)

| Platform | Est. | Basis |
|---|---|---|
| Google AI Overviews | 62 | Googlebot allowed; strong FAQ and spec data; the homepage definition gap and fragmented cards limit it |
| ChatGPT (Search + browsing) | 60 | All OpenAI UAs now 200 (was 403 for GPTBot/ChatGPT-User); depends on Bing index plus content |
| Perplexity | 64 | PerplexityBot/Perplexity-User 200; FAQ answers are highly quotable |
| Bing Copilot | 60 | Bingbot 200; same content gaps |
| Claude | 62 | Claude-SearchBot, Claude-User and ClaudeBot all 200 (claude-web block removed) |
| Gemini app | 45 | Google-Extended disallowed, so content is excluded from Gemini grounding |

---

## Top 5 changes

| # | Change | Effort | Impact |
|---|---|---|---|
| 1 | Add a 40–60 word definition paragraph plus a descriptive H1 on /fr and /en (F1) | 30 min | High |
| 2 | Add a canyon comparison `<table>` (price/duration/age/level) on /fr/canyoning, and the same on escalade/aventures/insolite (F2) | 1–2 h | High |
| 3 | Fix contradictions: Balène/Baudan ages, Artuby prerequisites, gmail vs contact@, "Emma Four" (F3, F4) | 30 min | High/Med |
| 4 | Remove the expired Toussaint modal; add aria-labels, aria-expanded and label/id pairs (F5, F6) | 30 min | Medium (agents + a11y) |
| 5 | Decide the robots training policy (unblock Google-Extended, drop `anthropic-ai`); expand llms.txt with per-activity facts and markdown links (F8, F9) | 1 h | Medium |

Next after these: create a Wikidata item, add ReserveAction/per-product booking URLs in schema (F7), and post a YouTube video series.

---

### Structured findings (for audit-data.json, category "AI Search Readiness")
```json
{"category":"AI Search Readiness","score":61,"previous_score":50,"findings":[
{"id":"GEO-1","severity":"high","title":"Homepage lacks extractable entity definition passage; first extracted passage is a blog teaser","fix":"Add 40-60 word definition under descriptive H1 on /fr and /en"},
{"id":"GEO-2","severity":"high","title":"Activity cards render as fragmented tokens; trafilatura drops price/duration/age data","fix":"Add HTML comparison table or one-sentence summaries per card"},
{"id":"GEO-3","severity":"high","title":"Contradictory facts: Balene min age 6 vs 7-8, Baudan 8 vs 7-8, Artuby beginner vs prerequisite rappel experience","fix":"Single source of truth in Sanity; correct FAQ and Artuby prerequisites"},
{"id":"GEO-4","severity":"medium","title":"CGV email linstantverdon@gmail.com vs contact@; 'Emma Four' vs 'Emma Aglae'","fix":"Harmonise in Sanity"},
{"id":"GEO-5","severity":"medium","title":"Expired Toussaint aria-modal popup still opens on FR homepage after 4s","fix":"Remove mount; add endDate guard"},
{"id":"GEO-6","severity":"medium","title":"Unnamed hamburger/close buttons, no aria-expanded, labels not associated, no autocomplete, JS-only form","fix":"aria-label, aria-expanded, htmlFor/id, autocomplete"},
{"id":"GEO-7","severity":"medium","title":"Booking on third-party SPA; no ReserveAction; Offer.url not the booking URL","fix":"Set offers.url to productId booking URL or add potentialAction ReserveAction"},
{"id":"GEO-8","severity":"medium","title":"Google-Extended disallowed (Gemini grounding loss); incoherent training opt-out (anthropic-ai legacy, GPTBot/ClaudeBot/CCBot allowed)","fix":"Remove Google-Extended and anthropic-ai, or block training bots consistently"},
{"id":"GEO-9","severity":"low","title":"llms.txt accurate (address fixed) but bare URLs, incomplete EN list, no per-activity facts, no llms-full.txt","fix":"Markdown links + descriptions, canyon facts section, generate from Sanity"},
{"id":"GEO-10","severity":"low","title":"No Markdown delivery, RSS, or .well-known discovery files","fix":"Optional RSS + .md route handler"},
{"id":"GEO-11","severity":"low","title":"AggregateRating 4.9/276 only in JSON-LD; year-round opening hours vs seasonal operation; no visible dates on service pages","fix":"Show rating with source or remove; seasonal hours"},
{"id":"GEO-12","severity":"low","title":"Hero video without captions/transcript","fix":"Add caption text"}],
"crawler_access":{"GPTBot":200,"OAI-SearchBot":200,"ChatGPT-User":200,"ClaudeBot":200,"Claude-User":200,"Claude-SearchBot":200,"PerplexityBot":200,"Perplexity-User":200,"Google-Extended":"200 (robots disallow)","Googlebot":200,"bingbot":200,"CCBot":200,"Applebot":200,"Amazonbot":200},
"llms_txt":"present, accurate, minimal format"}
```
