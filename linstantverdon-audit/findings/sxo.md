# Search Experience Optimization (SXO) Findings — linstantverdon.com
**Audit date:** 2026-06-17

---

## SERP Intent Analysis

### Primary target queries and intent matching:

| Query | Searcher Intent | Page Type Needed | What Site Has | Match? |
|-------|----------------|-----------------|---------------|--------|
| "canyoning Verdon" | Transactional — find & book a tour | Service landing page with pricing, booking CTA | /fr/canyoning — exists but thin | Partial |
| "canyoning Verdon prix" | Transactional — compare prices | Pricing page / price table | Prices embedded in page, not prominent | Weak |
| "activités Verdon été" | Informational / Navigational | Guide / blog post | Blog post exists but thin | Weak |
| "guide canyoning Verdon" | Transactional | Agency page with credentials | /fr/a-propos — exists | Partial |
| "escalade Verdon débutant" | Transactional | Beginner-specific landing page | No beginner filter page | Missing |
| "EVJF activités nature Verdon" | Transactional | Event/group booking page | /fr/evenementiel — exists | Partial |
| "que faire Verdon printemps" | Informational | Seasonal guide | Blog post exists | Weak |
| "canyoning famille enfant Verdon" | Transactional | Family-specific page | Not found | Missing |

### Key page-type mismatches:
1. **Homepage** tries to do everything — activity showcase + about + blog + contact — diffuses all signals
2. **Service pages** lack transactional conversion optimization (no booking widget, no urgency signals, no live availability)
3. **Blog posts** target informational queries but are too thin to rank for them

---

## User Journey Assessment

### Conversion funnel:
1. **Awareness** (organic search) → Site is nearly invisible (only 1 page indexed)
2. **Interest** (service pages) → Present but incomplete — missing difficulty ratings, duration clarity, group size limits
3. **Decision** (pricing + social proof) → Prices present but no reviews on-site, no comparison tool
4. **Action** (booking) → "RÉSERVER" button exists — where it leads was not tested; no booking widget or calendar visible
5. **Loyalty** (return visit) → Blog exists but too thin to drive repeat traffic

### Critical conversion gap:
There is no **online booking system** or **availability calendar** visible. Most competitors (CheckYeti, FunBooker, GetYourGuide) show live availability and instant booking. The current flow appears to be: visitor → contact form → phone call → booking. This introduces friction that loses transactional intent traffic.

---

## User Story Analysis

**Persona 1: French family with children, planning summer Verdon trip**
- Query: "activités canyoning famille verdon" / "canyoning enfant verdon"
- What they want: Age minimums, family-friendly canyon options, group pricing, what kids need to bring
- What they find: No family-specific page, no age filter, no family pricing
- Outcome: Likely bounces to FunBooker or CheckYeti which show filters

**Persona 2: Corporate HR planning team-building event**
- Query: "team building activités pleine nature Verdon" / "séminaire outdoor Verdon"
- What they want: Group pricing, capacity, catering options, logistical info
- What they find: /fr/evenementiel exists but content is thin ("Contactez-nous")
- Outcome: May convert if they call, but loses to competitors with detailed group pages

**Persona 3: Young adult sports enthusiast**
- Query: "canyon sportif Verdon" / "canyoning sport niveau intermédiaire"
- What they want: Difficulty ratings, specific canyon descriptions, photos/video
- What they find: Canyon pages exist but difficulty info and visual content is limited
- Outcome: Likely uses CheckYeti to compare operators

**Persona 4: German/English tourist**
- Query: "canyoning Verdon" in English
- What they find: /en version exists but appears to be a basic translation
- Language switcher present — good
- Hreflang missing — English version may not rank in English-language SERPs

---

## Quick Wins for SXO

1. Add difficulty ratings (★★☆ Intermédiaire) and minimum age to each activity card
2. Add a "Convient pour" badge: Famille / Groupe / Solo / Entreprise
3. Feature TripAdvisor star rating prominently in hero section ("★★★★★ 54 avis")
4. Add estimated duration and group size to every activity listing
5. Make pricing immediately visible on service pages (currently requires scrolling)
6. Add a sticky booking CTA that follows the user on mobile
