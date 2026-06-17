# On-Page SEO Findings — linstantverdon.com
**Audit date:** 2026-06-17  
**Score: 20 / 100**

---

## CRITICAL

### 1. Duplicate title tags across all pages
**Observed:** Every page (except one blog post) uses the identical title:
> "L'instant Verdon | Canyoning, Aquarando & Escalade dans le Verdon"

Pages confirmed with duplicate titles:
- Homepage (`/fr/`)
- Canyoning (`/fr/canyoning`)
- Escalade (`/fr/escalade`)
- Contact (`/fr/contact`)
- FAQ (`/fr/faq`)
- À propos (`/fr/a-propos`)
- English homepage (`/en`)

**Impact:** Google treats each page as competing for the same query. This suppresses all pages and is a strong negative ranking signal.

**Fix:** Write unique, keyword-rich titles for every page (50–60 characters):

| Page | Recommended Title |
|------|------------------|
| /fr/canyoning | Canyoning Verdon avec Guide — L'Instant Verdon |
| /fr/escalade | Escalade dans les Gorges du Verdon — L'Instant Verdon |
| /fr/aventures | Parcours Aventure Verdon — L'Instant Verdon |
| /fr/stages | Stage Multi-Activités Verdon — L'Instant Verdon |
| /fr/insolite | Expériences Insolites dans le Verdon — L'Instant Verdon |
| /fr/evenementiel | Événementiel Outdoor Verdon (EVG, EVJF, CE) |
| /fr/a-propos | Guides Diplômés Canyoning & Escalade Verdon |
| /fr/faq | FAQ Canyoning & Escalade Verdon — L'Instant Verdon |
| /fr/contact | Réservez votre Aventure Verdon — L'Instant Verdon |
| /fr/blog | Blog Aventure Verdon — Conseils & Récits |

---

### 2. Missing meta descriptions on most pages
**Observed:** No meta description found on: homepage, canyoning, escalade, contact, FAQ, blog, blog posts. Only `/fr/a-propos` has one: *"Expert en aventures outdoor dans les Gorges du Verdon. Canyoning, escalade et moments inoubliables au cœur d'une nature sauvage et préservée."*

**Impact:** Google auto-generates snippets from page content, usually choosing poorly. CTR suffers significantly.

**Fix:** Write unique meta descriptions (150–160 characters) for every page:

| Page | Recommended Meta Description |
|------|------------------------------|
| Homepage | Guides diplômés d'État pour vos sorties canyoning, escalade et aventure dans les Gorges du Verdon. Réservez dès €50. Castellane – Verdon. |
| Canyoning | Découvrez les plus beaux canyons du Verdon avec nos guides diplômés. Clue d'Artuby, Balène, Saint-Auban… À partir de €50/pers. |
| Escalade | Falaises d'initiation aux grandes voies mythiques du Verdon. Guides brevetés d'État. Demi-journée à partir de €200. |
| FAQ | Tout ce qu'il faut savoir avant votre sortie canyoning ou escalade dans le Verdon : équipement, niveau requis, conditions météo. |

---

## HIGH

### 3. Multiple H1 tags on homepage (5 H1s)
**Observed:** Five separate H1 elements on the homepage:
1. "L'Instant Verdon"
2. "Qui sommes-nous ?"
3. "Nos Activités Nature"
4. "Notre Blog & Actualités"
5. "À VOTRE ÉCOUTE"

**Impact:** A single H1 should define the main topic of each page. Multiple H1s dilute relevance signals and confuse crawlers.

**Fix:** Keep one H1 per page (e.g. "Canyoning, Escalade & Aventure dans les Gorges du Verdon"). Demote all others to H2 or H3.

### 4. Poor image alt texts throughout
**Observed:**
- Logo: alt="/assets/accueil/logo.webp" (file path, not descriptive)
- Author images: alt="/assets/a propos/emma.JPG.jpeg", alt="/assets/a propos/angele.jpg.jpeg"
- Activity images on canyoning/escalade pages: no alt text or vague labels
- Blog article images: match article title (acceptable)

**Fix:**
- Logo: `alt="L'Instant Verdon — Guide Canyoning & Escalade Verdon"`
- Emma: `alt="Emma Aglaé, guide diplômée d'État canyonisme, L'Instant Verdon"`
- Angèle: `alt="Angèle Kanapa, guide diplômée escalade et canyonisme, L'Instant Verdon"`
- Activity images: describe the activity and location

---

## MEDIUM

### 5. Blog posts have correct unique titles
**Positive finding:** Blog articles use descriptive, keyword-relevant titles:
- "Les 3 activités à faire dans le Verdon cet été avec l'Instant Verdon"
- "Les 3 activités à faire dans le Verdon ce printemps avec l'Instant Verdon"

Recommend adding the year to these titles for freshness signals: "...cet été 2026..."

### 6. H1 on service pages
**Positive:** Service pages use dual H1 structure (one phrase + activity name). While better practice is a single H1, the keyword is present.

### 7. Internal linking is functional
- Navigation is consistent across pages
- Blog posts link back to service pages (good)
- No clear content hub / pillar page structure yet

### 8. Breadcrumb navigation absent
No breadcrumb trail on any page. Adds crawlability, click context in SERPs, and enables BreadcrumbList schema.
