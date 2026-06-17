# AI Search Readiness (GEO) Findings — linstantverdon.com
**Audit date:** 2026-06-17  
**Score: 20 / 100**

---

## AI Crawler Access

### No llms.txt file
- **URL checked:** https://www.linstantverdon.com/llms.txt — not found
- **Impact:** AI assistants (ChatGPT, Perplexity, Claude, Gemini) that respect llms.txt cannot efficiently discover what content is available and citable on this domain
- **Fix:** Create `/llms.txt` listing key pages:
  ```
  # L'Instant Verdon
  > Expert en canyoning, escalade et aventure dans les Gorges du Verdon depuis 2018
  
  ## Pages principales
  - https://www.linstantverdon.com/fr/canyoning
  - https://www.linstantverdon.com/fr/escalade
  - https://www.linstantverdon.com/fr/a-propos
  - https://www.linstantverdon.com/fr/faq
  - https://www.linstantverdon.com/fr/blog
  ```

### robots.txt unavailable (500 error)
AI crawlers (GPTBot, ClaudeBot, PerplexityBot) check robots.txt first. A 500 error may cause them to skip the site entirely.

---

## Citability Assessment

### Passage-level citability: POOR
For AI search to cite a site, it needs:
1. **Clear factual statements** that answer questions directly — the site has some, but they're buried in marketing prose
2. **Structured Q&A format** — FAQ exists but is minimal (3 questions)
3. **Expert attribution** — author credentials mentioned but not structured
4. **Date signals** — blog posts have dates but pages don't show "last updated"

### Specific citability gaps:

| Query type | Current ability to be cited | Fix |
|---|---|---|
| "canyoning Verdon prix" | Low — price info is on service pages but not answer-formatted | Add price tables with "À partir de X€/pers" in FAQ |
| "canyoning Verdon débutant" | Low — difficulty info scattered | Create beginner guide page |
| "activités Verdon printemps/été" | Partial — blog posts exist but too thin | Expand seasonal guides |
| "guide canyoning Verdon diplômé" | Low — credentials in body text | Add FAQ: "Vos guides sont-ils diplômés ?" with structured answer |
| "réserver canyoning Verdon" | Low — no booking platform integration visible | Add booking CTA schema |

---

## Brand Mention Signals

### Positive
- Listed on Verdon Tourisme (authority regional directory)
- Listed on Provence-Alpes-Côte d'Azur Tourism
- Listed on Tourisme Alpes Haute-Provence
- TripAdvisor presence with 54 reviews (#3 in La Palud-sur-Verdon)
- Facebook, Instagram, YouTube, WhatsApp presence

### Missing
- No Wikipedia mention
- No press / media articles
- No mentions in major French outdoor publications (Altimountain, Outdoor, etc.)
- Site content not indexed well enough to appear in AI training data

---

## Structural AI Optimization Recommendations

1. **Answer-first content format:** Start each service page with a 2-3 sentence direct answer to the primary query. Example for /fr/canyoning:
   > *"L'Instant Verdon propose des sorties canyoning dans les Gorges du Verdon, encadrées par des guides diplômés d'État. Les activités durent de 2 à 7 heures, pour tous niveaux, à partir de 50€ par personne."*

2. **Expand FAQ to 15+ questions** with direct, quotable answers

3. **Add structured author bios** with schema markup (Person + Credential)

4. **Create a "Qui sommes-nous" page optimized for brand queries** with detailed history, certifications, philosophy

5. **Build citation capsules** — short, fact-dense paragraphs that AI can quote:
   > *"Le canyoning dans le Verdon est praticable de mi-avril à fin octobre. Le Verdon compte plus de 20 canyons allant du niveau initiation au niveau sportif. L'Instant Verdon propose 6 canyons différents avec des durées de 2h à 7h."*

6. **Add llms.txt** to signal AI crawlers which pages are authoritative

7. **Publish more substantive content** — AI models cite sites with dense, accurate, sourced content
