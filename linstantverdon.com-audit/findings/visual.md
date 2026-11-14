# Visual / Mobile Audit - linstantverdon.com (2026-11-14)
Screenshots (desktop 1366x768, mobile 390x844 @2x; *_full.png = full-page mobile) in screenshots/:
fr, en, fr_canyoning, fr_canyoning_canyon-artuby, fr_contact, en_climbing (suffix _desktop / _mobile).
Method: Playwright, load + 4s wait (networkidle never fires on the site, same as August).

## Findings
1. HIGH - Expired promo popup blocks the FR home on mobile (fr_mobile.png, fr_desktop.png).
   A full-screen "Vacances de la Toussaint" modal (dates 18/20/22 Oct) opens on load; today is 14 Nov. It hides H1, hero and header.
   Also shown on desktop (caught mid-animation as a ghost panel over the hero). Fix: remove or expire by date, and show it once per session after a delay (not on first paint). Ensure the close button is at least 44px (it is about 40px).
2. MEDIUM - "Ghosted duplicate heading" bug is NOT fully fixed (fr_canyoning_mobile.png, fr_canyoning_desktop.png, en_climbing_mobile.png, fr_contact_mobile.png).
   The teal eyebrow/tagline above the H1 (e.g. "EXPLOREZ LA MAGIE DES CANYONS...") is rendered in teal on a busy photo, so it looks like a faint ghost line.
   On /fr/canyoning it runs under the header bar (mobile: overlaps the logo area, y~150-230; desktop: collides with the nav row at y~80, just above the H1). On contact it overlaps the photo subject.
   The H1 itself is no longer duplicated. Fix: add top padding to the hero equal to the header height (about 120px), switch the eyebrow to white or a pill with a dark backdrop, and use a stronger overlay gradient.
3. MEDIUM - French strings on English pages (en_climbing_mobile.png; DOM on /en and /en/climbing).
   CTA "RESERVER VOTRE SORTIE" on /en/climbing, and "NOUS CONTACTER" on /en home. Fix: translate via the i18n dictionary.
4. MEDIUM - Mobile header has no visible booking CTA (all *_mobile.png). Only the logo and the burger are shown; "RESERVER/BOOK NOW" is hidden in the menu (0x0 when closed).
   Desktop has a clear RESERVER button (56px high). Fix: add a compact sticky "Reserver" button or a WhatsApp/phone CTA in the mobile header.
   Mitigation: the hero CTA on category pages is visible above the fold (about 466px, 317x56).
5. MEDIUM - Home hero (desktop) is clear: H1, tagline, "Decouvrir nos activites" and "Nous contacter" are visible (fr_desktop.png). But there are no trust signals above the fold on any page: no rating, reviews, "diplome d'Etat" or insurance badge.
   Fix: add a strip such as "4.x/5 Google - Guides diplomes d'Etat - 7-8 ans+" under the hero CTA.
6. LOW - The WhatsApp floating button (about 56px) overlaps body text on mobile (fr_canyoning_mobile.png, fr_contact_mobile.png, artuby). Fix: add right padding, or hide it while scrolling.
7. LOW - Desktop nav links are 36px tall (below 44px), and "NOUS CONTACTER" is a 22px-high link on the home hero. Mobile body text is 16px (OK).
8. LOW - Artuby detail (fr_canyoning_canyon-artuby_mobile.png): hero is OK, but the "Reserver votre sortie" CTA only appears at y~4527 on mobile, with none above the fold. Fix: add a sticky bottom CTA bar showing the price.
9. LOW - Hero text on a bright photo (contact) has weak contrast for the eyebrow; the H1 teal on a white splash is also marginal.

## Passes
- No horizontal scroll on any page (scrollWidth = viewport at 390 and 1366).
- H1 present and single on every page; mobile H1 sizes are 36-60px.
- Burger is about 48px; the hero CTA is about 56px high.
- The page layout is clean on all 6 pages.
- Background video: networkidle still never fires (carry-over from August; verify the video is lazy or poster-first on mobile).
