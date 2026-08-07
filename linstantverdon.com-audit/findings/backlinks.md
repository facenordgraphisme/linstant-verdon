# Backlink Profile Analysis — linstantverdon.com

**Date:** 2026-08-07
**Site type:** Small local business (canyoning/climbing guide, Gorges du Verdon, France)
**Relaunched:** 2026-06-17 on new stack (Next.js + Sanity, Vercel) — previous site had been deindexed

## Score: INSUFFICIENT DATA (Tier 0 — see rationale)

Per Tier 0 methodology, only 1 of the 7 weighted scoring factors (referring domain
count, domain quality distribution, anchor text naturalness, toxic link ratio, link
velocity, follow/nofollow ratio, geographic relevance) has any real data, and even
that one factor has only a single spot-checked data point. Producing a 0–100 number
here would imply a precision the data doesn't support and could mask the real
finding, which is qualitative: **this is a brand-new domain relaunch with an
essentially unmeasured, presumed-thin backlink profile — expected and not alarming
at this stage, but action is needed to build it.**

## Data Source Tier

```
python C:/Users/FX/.claude/skills/seo/scripts/backlinks_auth.py --check --json
```

**Tier 0 — Common Crawl + Verify only.** No Moz API key or Bing Webmaster API key is
configured in this environment. No DataForSEO MCP tools available either.

| Factor | Data available? | Source |
|---|---|---|
| Referring domain count | Partial (1 spot-check, unfavorable) | Verify crawler (0.95) |
| Domain quality distribution | No | — |
| Anchor text naturalness | No | — |
| Toxic link ratio | No | — |
| Link velocity trend | No | — |
| Follow/nofollow ratio | No | — |
| Geographic relevance | No (qualitative only, see recommendations) | — |

## Common Crawl Results

```
python C:/Users/FX/.claude/skills/seo/scripts/commoncrawl_graph.py linstantverdon.com --json
```

| Metric | Value | Source |
|---|---|---|
| In Common Crawl index | Yes | Common Crawl (confidence: 0.50) |
| In host-rank rankings | No — below ranking threshold | Common Crawl (confidence: 0.50) |
| PageRank | null | Common Crawl (confidence: 0.50) |
| Harmonic centrality | null | Common Crawl (confidence: 0.50) |
| Referring hosts (n_hosts) | null | Common Crawl (confidence: 0.50) |
| Top referring domains | none surfaced | Common Crawl (confidence: 0.50) |

**CC release used:** `cc-main-2026-jan-feb-mar`.

**Important dating caveat:** this crawl window (Jan–Mar 2026) **predates** the
2026-06-17 relaunch. The domain being "in crawl" almost certainly reflects the
**previous, deindexed version of the site**, not the current Next.js/Sanity build.
Do not interpret "in crawl but below ranking threshold" as a measurement of the
current site's authority — the current site has likely not been picked up by any
Common Crawl release yet. This is normal seven weeks post-relaunch and will resolve
as new quarterly CC releases (and Google/Bing's own indexes) catch up.

## Backlink Verification Crawler

No pre-supplied list of known backlinks was provided. Two candidate referring pages
were identified by extracting the homepage's own outbound `<a href>` targets
(`homepage-fr.html`) — pages the business itself links out to, and which are
plausible/expected reciprocal-link sources for a local tourism business — then
checked with the verification crawler for a live link back:

```
python C:/Users/FX/.claude/skills/seo/scripts/verify_backlinks.py --target https://www.linstantverdon.com/fr --links candidate_links.json --json
```

| Source page | Result | Notes |
|---|---|---|
| `verdontourisme.com/commerces-services/linstant-verdon-la-palud-sur-verdon/` | **404 — page does not exist** | Verified directly (also re-checked with a plain fetch, confirmed 404, no redirect). Source: Verify crawler (confidence: 0.95) |
| `tripadvisor.fr` attraction page for La Palud-sur-Verdon | 403 — blocked | TripAdvisor blocks automated requests; this is inconclusive, **not** a confirmed loss. Source: Verify crawler (confidence: 0.30 — anti-bot block, not a real signal either way) |

**Finding — broken outbound link to regional tourism board (High severity):** the
site's own homepage links to a Verdon Tourisme ("Office de Tourisme du Verdon")
business listing page that now returns a 404. This is notable for two reasons: (1)
it's a broken outbound link on the live homepage that should be fixed regardless,
and (2) it strongly suggests the business's listing on the regional tourism board's
directory — a highly relevant, authoritative local link — was either removed, never
completed, or moved to a different URL when the tourism board redesigned their site.
This is a concrete, actionable link-recovery opportunity, not a general
recommendation. Source: Verify crawler, cross-checked directly (confidence: 0.95).

No other outbound links found on the homepage point to plausible local link-building
partners (no gîtes/campings, no federation sites, no press). Social profiles
(Facebook, Instagram, YouTube) and a WhatsApp contact link are present but are trust
signals, not SEO backlink sources. Source: manual extraction from
`homepage-fr.html` (confidence: 0.95, direct observation).

## What Works

- The site is already discoverable by Common Crawl's historical index (via the prior
  domain generation), which is a mild positive sign the domain itself isn't
  brand-new/unknown to crawlers, even though the current build hasn't been picked up
  yet.
- The business already has an existing relationship with **Verdon Tourisme**
  (regional Office de Tourisme) — a listing existed at some point. This is the
  single easiest, highest-relevance link to recover (see High priority below),
  because it requires reactivating an existing relationship rather than cold
  outreach.
- A TripAdvisor attraction/listing page for the location appears to exist
  (could not be verified for a live link due to anti-bot blocking, but its presence
  suggests some baseline marketplace visibility already exists).
- Clean social presence (Facebook, Instagram, YouTube) is in place and linked from
  the homepage, providing a foundation for content that can be cited/linked by
  press or partners later.

## Findings by Severity

### High

1. **Broken/lost link from Verdon Tourisme business directory (404).** The
   homepage links to
   `https://www.verdontourisme.com/commerces-services/linstant-verdon-la-palud-sur-verdon/`,
   which no longer resolves. Fix the outbound link on-site, and — more importantly —
   contact Verdon Tourisme to find out whether the listing was removed in a site
   migration and get it restored/re-linked. This is the highest-relevance backlink
   opportunity available (exact geographic + activity match, regional tourism board
   authority) and it appears to have been lost, not merely never built.

### Medium

2. **No verifiable current backlinks to the new domain build.** Between CC's
   pre-relaunch data and the lack of any confirmed live referring domain, the
   current site (post 2026-06-17 relaunch) has effectively zero *confirmed*
   third-party links. This is expected for a 7-week-old relaunch of a small local
   business site, but it means off-page authority building needs to start
   essentially from zero and should be prioritized alongside on-page work.
3. **No federation, directory, or partner links found anywhere in the homepage's
   outbound link set.** No links to Fédération Française de la Montagne et de
   l'Escalade (FFME), Fédération Française de Spéléo-Canyonisme (FFS), local
   gîtes/campings, or activity marketplaces (GetYourGuide, Viator) — meaning none of
   these relationships appear to exist yet, either as outbound mentions or
   (presumably) inbound links. This is a genuine off-page gap for a niche where
   these are standard, low-effort, high-relevance link sources.

### Low

4. **TripAdvisor link status unverifiable** due to anti-bot blocking (403). Not a
   confirmed problem, but worth a manual check in a browser to confirm the listing
   is live, claimed by the business, and linking to the correct current URL
   (`linstantverdon.com`, not a defunct predecessor domain).

## Recommendations — Local Link Building (Priority Order)

Given this is a small, geographically-precise outdoor activity provider (canyoning/
climbing, Gorges du Verdon, Alpes-de-Haute-Provence), the highest-value link targets
are local/regional and activity-federation sources, not generic high-DA directories.

### High Priority

1. **Recover the Verdon Tourisme listing** (verdontourisme.com — Office de Tourisme
   du Verdon). Contact them directly to fix the 404'd business listing and confirm
   it links to `https://www.linstantverdon.com`. This is a confirmed lost link with
   an existing relationship — the fastest win available.
2. **Comité Régional du Tourisme Provence-Alpes-Côte d'Azur** (tourismepaca.fr) —
   request/verify a listing for canyoning/escalade providers in the Verdon area;
   regional tourism boards commonly maintain activity-provider directories.
3. **Fédération Française de la Montagne et de l'Escalade (FFME)** — verify whether
   guides/instructors are affiliated and listed in the FFME structure directory
   (club/pro finder), particularly for the escalade (climbing) offering.
4. **Fédération Française de Spéléo-Canyonisme (FFS)** — same logic for the
   canyoning activity; the FFS maintains regional/departmental listings of
   affiliated canyon operators.
5. **La Palud-sur-Verdon municipal site / mairie** — small commune sites often list
   local businesses and activity providers; low competition, high geographic
   relevance.

### Medium Priority

6. **Marketplace listings**: GetYourGuide, Viator, and TripAdvisor (confirm the
   existing TripAdvisor listing is live and correctly linked, per the Low-severity
   finding above). These are followed, high-traffic listing pages even when
   nofollowed for SEO — they still drive referral traffic and citation signals.
7. **Partner accommodation**: gîtes, campings, and chambres d'hôtes around La
   Palud-sur-Verdon and Moustiers-Sainte-Marie commonly publish "activités à
   proximité" pages — reciprocal links are standard practice and low-effort to
   arrange via direct outreach to nearby establishments.
8. **Local press**: La Provence (Alpes-de-Haute-Provence edition), France Bleu
   Provence — seasonal "que faire dans le Verdon cet été" roundup articles are a
   recurring, pitchable opportunity each spring.

### Lower Priority / Ongoing

9. **Google Business Profile** — ensure it's complete and linked to
   linstantverdon.com; while not a classic backlink, it indirectly supports local
   SEO and can surface in aggregator scrapes that eventually feed web-graph
   datasets like Common Crawl.
10. **Pull Google Search Console's Links report** once enough data accrues — this is
    first-party data, not dependent on third-party crawl sampling, and will be the
    fastest way to see real referring domains for the new domain build. This is
    likely the single most useful next step given Tier 0's current blind spot.
11. Re-run Common Crawl checks each quarter (new releases roughly every 2–3 months)
    to see when the *current* site build enters the crawl graph — a useful proxy
    signal for growing external visibility.
12. Once 3+ real backlinks are known (from GSC or manual discovery), re-run
    `verify_backlinks.py` against them to confirm they're live, followed, and point
    to the correct current domain.

## Data Freshness Notes

- **Common Crawl:** quarterly release cadence (`cc-main-2026-jan-feb-mar` used
  here); reflects a crawl window that predates the 2026-06-17 relaunch, so it
  cannot be taken as a measurement of the current site.
- **Verify crawler:** live, real-time HTTP checks at time of audit (2026-08-07).
- **Moz / Bing / DataForSEO:** not available this run (Tier 0). Would refresh at
  ~3 days (Moz) or near-real-time (Bing) if configured.

## Cross-Skill Notes

- This report covers off-page backlink signals only. For on-page E-E-A-T / content
  quality, run `/seo content <url>`.
- For crawlability/technical issues affecting whether crawlers can discover and
  index the new site build going forward, run `/seo technical <url>`.
