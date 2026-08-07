# AI Search Readiness (GEO) Findings — linstantverdon.com
**Audit date:** 2026-08-07
**Pages checked:** homepage (/fr), /fr/canyoning, /fr/canyoning/canyon-artuby, /fr/faq, /fr/a-propos, robots.txt, llms.txt

## Score: 50/100

| Dimension (weight) | Score | Note |
|---|---|---|
| Citability (25%) | 50/100 | Overview & detail pages have real facts (prices, includes, prerequisites); FAQ is thin (3 Q&As, one is a non-answer); Artuby page is missing duration |
| Structural Readability (20%) | 45/100 | Clean H1/H2/H3 hierarchy and labeled spec sections (Tarif, Ce qui est inclus, Pré-requis) exist, but headings aren't question-phrased and answer-first framing is inconsistent |
| Multi-Modal Content (15%) | 40/100 | Images have descriptive alt text; hero video present but no transcripts/captions observed; no comparison/spec tables |
| Authority & Brand Signals (20%) | 55/100 | Person + EducationalOccupationalCredential + AggregateRating schema now present sitewide (big improvement since last audit); undermined by an address inconsistency between `/llms.txt` and the live schema/page content |
| Technical Accessibility (20%) | 55/100 | Pages are server-rendered/pre-rendered (no CSR gap) and fully readable by Googlebot, Bingbot, ClaudeBot, OAI-SearchBot, PerplexityBot — **but a middleware-level bot block returns a hard HTTP 403 to GPTBot and, critically, to `chatgpt-user` (ChatGPT's real-time link-fetch agent)** |

Weighted: 0.25×50 + 0.20×45 + 0.15×40 + 0.20×55 + 0.20×55 ≈ **50/100**

This is a meaningful improvement over the pre-relaunch baseline (previously scored 20/100 on 2026-06-17 with zero structured data and no llms.txt) — `llms.txt` now exists and is well-formed, and schema.org markup has been added. However, a hard bot-blocking rule is actively preventing OpenAI's crawler and its live-browsing agent from reading the site at all, which caps the score regardless of content quality.

---

### What Works

- **`/llms.txt` exists and is well-formed** — `https://www.linstantverdon.com/llms.txt` returns HTTP 200, `Content-Type: text/plain`, and lists key FR/EN pages plus a concise fact block (phone, email, address, SIRET, guide names with certifications and years, starting price, season dates). This is genuinely good GEO practice and was not present at the last audit.
- **Structured data has been added** — JSON-LD now includes `LocalBusiness`/`Place`, `Person` + `EducationalOccupationalCredential` for each guide, `AggregateRating`, and `FAQPage` (on `/fr/faq`). This directly supports entity clarity and E-E-A-T for an LLM trying to identify "who is L'Instant Verdon and are its guides qualified."
- **SSR/pre-rendering is solid** — homepage served with `X-Nextjs-Prerender: 1`, full content present in the raw (pre-JS) HTML (`is_spa: false`). No client-side-rendering gap that would hide content from crawlers that don't execute JavaScript.
- **`/fr/canyoning` and `/fr/canyoning/canyon-artuby` contain real, specific facts**, not just marketing copy: 7-8 named canyons with durations (2h–7h) and prices ("À partir de 50€" to "95€"); the Artuby detail page has labeled sections for price ("Tarif 50€"), inclusions (harness, descender, rope, helmet, certified guide), and prerequisites (must swim, prior rappel/climbing experience, no severe vertigo, jumps up to 8m). This is close to the "spec sheet" format LLMs can extract cleanly.
- **Googlebot, Bingbot, ClaudeBot, OAI-SearchBot, PerplexityBot, and DuckAssistBot are all unblocked** (verified live, HTTP 200 with each UA) — the important real-time answer/citation crawlers for Google AI Overviews, Claude's web search, ChatGPT Search, Perplexity, and DuckDuckGo AI are not caught in the block.

---

### Critical

**1. A server-side bot block (not just robots.txt) actively 403s GPTBot and ChatGPT's live-browsing agent**

The real enforcement mechanism is not `robots.txt` (which crawlers can choose to ignore) — it's `src/proxy.ts`, this project's Next.js middleware, which inspects the `User-Agent` header on every request and returns a hard `403 Access Denied (Bad Bot)` before the page ever renders:

```ts
// src/proxy.ts
const BANNED_USER_AGENTS = [
  'ahrefsbot','semrushbot','dotbot','rogerbot','lipperhey','sogou','exabot',
  'loadtimebot','petalbot','bytespider',
  'gptbot','chatgpt-user','cohere-ai','anthropic-ai','claude-web','google-extended',
  'mj12bot','yandexbot','baiduspider','screaming frog','amazonbot','ccbot','diffbot'
];
```

Live verification (curl with each UA against `https://www.linstantverdon.com/fr`):

| User-Agent | Result | Significance |
|---|---|---|
| `GPTBot` | **403** | OpenAI's primary crawler (training + some ChatGPT Search corpus building) — blocked |
| `chatgpt-user` | **403** | **ChatGPT's real-time link-fetch agent** — this is what fires when a user pastes `linstantverdon.com` into ChatGPT and asks "what does this offer?" It is blocked. |
| `CCBot` | **403** | Common Crawl — feeds many LLM training sets and some retrieval pipelines |
| `amazonbot` | **403** | Amazon's crawler (Alexa/Rufus) |
| `anthropic-ai` | **403** | Anthropic's training crawler |
| `cohere-ai` | **403** | Cohere's training crawler |
| `claude-web` | **403** | **Claude's real-time link-fetch agent** — same issue as `chatgpt-user` but for Claude |
| `google-extended` | **403** | Controls use of content for Gemini/Bard training and some grounding — does **not** affect classic Google Search indexing or Google AI Overviews (those use plain `Googlebot`, which is unblocked) |
| `ClaudeBot` | 200 | Anthropic's search-index crawler for Claude web search — unaffected |
| `OAI-SearchBot` | 200 | ChatGPT Search's citation crawler — unaffected |
| `PerplexityBot` | 200 | Unaffected |
| `Googlebot` / `Bingbot` | 200 | Unaffected |

This is more severe than a `robots.txt` disallow: `robots.txt` is advisory and well-behaved bots that ignore it (or crawl anyway on a user's explicit request) would normally still succeed — but this hard 403 wall means **there is no way for GPTBot, `chatgpt-user`, or `claude-web` to read this site under any circumstance**, including when a real user directly asks ChatGPT or Claude to open the URL.

**Fix — edit `src/proxy.ts`:**
```ts
const BANNED_USER_AGENTS = [
  // Generic SEO/scraper bots — keep blocking, unrelated to AI-search visibility
  'ahrefsbot','semrushbot','dotbot','rogerbot','lipperhey','sogou','exabot',
  'loadtimebot','petalbot','bytespider','mj12bot','yandexbot','baiduspider',
  'screaming frog','diffbot',
  // REMOVE the following — they block real AI-search discovery and live browsing:
  // 'gptbot', 'chatgpt-user', 'amazonbot', 'ccbot'
];
```
- **Must remove:** `gptbot`, `chatgpt-user`, `amazonbot`, `ccbot` — these directly affect discoverability/citation in ChatGPT and Amazon's AI assistant, and Common Crawl's downstream retrieval use.
- **Optional, lower priority:** `anthropic-ai`, `cohere-ai`, `google-extended` are training-only crawlers (per current GEO guidance, these are legitimate to keep blocked if the business wants to opt out of AI training use without hurting live citation). However, `claude-web` should be treated like `chatgpt-user` and unblocked if the goal is to let users successfully share the site's URL with Claude.
- `/studio/` blocking is untouched by this change (handled separately, `pathname.startsWith('/studio')` short-circuits before the UA check) — no risk there.

**2. `robots.txt` (generated by `src/app/robots.ts`) duplicates the same over-broad block and should be fixed in tandem**

```ts
// src/app/robots.ts — current
{
  userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot', 'PetalBot', 'ByteSpider', 'GPTBot', 'amazonbot', 'CCBot'],
  disallow: '/',
}
```
This is grouped as one generic "scraper block" rule, but `GPTBot`, `amazonbot`, and `CCBot` don't belong with `AhrefsBot`/`SemrushBot`/`DotBot`/`PetalBot`/`ByteSpider` if the intent is SEO-tool-blocking — they're AI-search crawlers, not rank-tracking scrapers. Even after fixing `proxy.ts`, leaving these in `robots.txt` sends a conflicting/discouraging signal to any AI crawler that does respect it.

**Fix — edit `src/app/robots.ts`:**
```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/studio/' },
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot', 'PetalBot', 'ByteSpider'],
        disallow: '/',
      },
    ],
    sitemap: 'https://www.linstantverdon.com/sitemap.xml',
  }
}
```
Remove `GPTBot`, `amazonbot`, `CCBot` from the disallow group entirely (matching the `proxy.ts` fix above). `PetalBot`/`ByteSpider` blocking can stay — low priority for this audience (Huawei Petal Search / Bytedance), and Bing's own crawler (`Bingbot`) is untouched either way (verified live, 200).

---

### High Priority

**3. FAQ page is too thin to be a citation asset (only 3 Q&As, one is a non-answer)**
`/fr/faq` currently has:
- "Quel équipement dois-je prévoir ?" → good, specific, directly quotable
- "Faut-il savoir nager ?" → good, specific ("nager au moins 25 mètres")
- "Quelles sont les conditions d'annulation ?" → **poor** — answer is "Consultez notre onglet CGV..." instead of stating the policy inline. LLMs can't extract an answer from a redirect.

This hasn't changed since the June audit (still 3 Q&As). Expand to 12-15+ questions with self-contained answers (target 134-167 words per answer block per GEO citation-length research), covering: pricing by activity, difficulty/fitness levels, guide credentials, what's included/not included, cancellation terms stated inline (not just "see CGV"), age minimums, seasonal availability, booking process. Add these as visible on-page text, not just inside the existing `FAQPage` JSON-LD.

**4. Canyon-Artuby detail page is missing duration**
Price, inclusions, and prerequisites are all clearly stated ("Tarif 50€", equipment list, physical requirements), but **duration is absent from both the detail page and clearly attributable on the overview page** — a likely query is "combien de temps dure le canyon d'Artuby" / "how long is canyon artuby," and the site currently can't answer it directly. Add a labeled "Durée" field to match the existing "Tarif" / "Ce qui est inclus" / "Pré-requis" spec-sheet format — this page is otherwise the best-structured example on the site and just needs this one gap closed. Apply the same spec-sheet audit (duration explicitly labeled) to the other 6-7 canyon detail pages.

---

### Medium Priority

**5. NAP inconsistency between `/llms.txt` and the live site/schema — entity confusion risk**
- `llms.txt`: *"Adresse : Place de l'église, 04120 Castellane"*
- Live page (`/fr/a-propos`) and JSON-LD `PostalAddress`: *"395 Chem. de Haut Bourras, 04120 La Palud-sur-Verdon"*

Two different addresses in two different towns (Castellane vs. La Palud-sur-Verdon) for the same entity is exactly the kind of contradiction that undermines confidence when an LLM cross-references sources to build an entity profile. Fix: make `llms.txt` match the schema/page address exactly (confirm which is actually correct first — the site content and structured data are the more likely source of truth since they're consistent with each other).

**6. Question-phrased headings are underused**
Headings are structurally clean (H1/H2/H3) but phrased as labels ("Description," "Ce qui est inclus," "Pré-requis") rather than as the natural-language questions users/LLMs are matching against ("Que comprend la sortie canyoning d'Artuby ?", "Faut-il être sportif pour faire le canyon d'Artuby ?"). Reformatting section headers as questions — while keeping the same concise, factual answers underneath — increases the odds of being lifted as a direct answer without changing the underlying content effort much.

---

### Low Priority / Notes

- **RSL 1.0 licensing:** not present anywhere on the domain. This is a very new, low-adoption standard — not worth prioritizing over the fixes above, but worth a one-line mention: no explicit AI content-licensing terms are declared.
- **ByteSpider / PetalBot** remain blocked in both `robots.txt` and `proxy.ts`. This is defensible generic-scraper hygiene for this audience (Bytedance/Huawei ecosystem is low-relevance for French/English Provence tourism searches) and lower priority than the OpenAI/Amazon/Common Crawl fixes above. Bing's actual crawler (`Bingbot`) is confirmed unaffected.
- Multi-modal content (video, tables, transcripts) was only lightly assessed in this pass — the homepage hero video (recently migrated to Cloudflare R2 per commit `df59361`) has no evident transcript/caption text on-page, which is a missed extractable-text opportunity but not urgent.

---

## Platform-Specific Visibility Estimate (qualitative, based on crawler access + content audit — not live-queried; DataForSEO MCP tools were not available in this session)

| Platform | Est. Score | Basis |
|---|---|---|
| Perplexity | ~60/100 | `PerplexityBot` fully allowed; decent fact density on service pages; thin FAQ caps upside |
| Google AI Overviews | ~55/100 | `Googlebot` fully allowed, schema present, but thin FAQ + missing durations limit direct-answer extraction |
| Bing Copilot | ~55/100 | `Bingbot` allowed; same content gaps as Google AIO |
| Claude (web search / link-share) | ~45/100 | `ClaudeBot` (search index) allowed, but `claude-web` (user link-share agent) is hard-blocked by `proxy.ts` |
| ChatGPT (Search + browsing) | ~40/100 | `OAI-SearchBot` allowed (so ChatGPT Search could theoretically surface/cite it), but `GPTBot` and — critically — `chatgpt-user` (live link fetch) are hard-blocked, so a user pasting the URL into ChatGPT will fail |

---

## Priority Fix Summary

| # | Fix | Effort | Impact |
|---|---|---|---|
| 1 | Remove `gptbot`, `chatgpt-user`, `amazonbot`, `ccbot` from `src/proxy.ts` BANNED_USER_AGENTS | Trivial (1-line edit) | Critical — currently a total access wall for OpenAI |
| 2 | Remove `GPTBot`, `amazonbot`, `CCBot` from `src/app/robots.ts` disallow group | Trivial (1-line edit) | Critical — aligns declared policy with actual access |
| 3 | Expand `/fr/faq` to 12-15+ self-contained Q&As; fix the cancellation non-answer | Medium (content work) | High — FAQ is the highest-leverage citation format |
| 4 | Add explicit "Durée" field to canyon-artuby and other detail pages | Low | High — closes a common direct-answer query gap |
| 5 | Reconcile address in `llms.txt` with live schema/page content | Trivial | Medium — removes entity-confusion risk |
| 6 | Rephrase key section headings as questions | Low-Medium | Medium — improves answer-extraction odds |
