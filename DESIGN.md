# Không Gian Nội Tâm — garden / editorial system

## Committed world
Poetic Interactive Garden × Editorial Design. A private pause under wisteria, not a medical dashboard. Homepage: Experience and gentle wayfinding; excerpts: Read. Concept: the garden offers a seat before it offers advice. Wisteria and Mây the cat are the identifying objects. The lantern is a small closing ritual, never a simulated inbox.

## Layout and sequence
1. Plain wordmark/navigation, calm first screen, stable two-line headline and explicit school-wellbeing purpose.
2. Large arched botanical artwork; independent wisteria clusters; cat in an exclusive bounded lower area.
3. Lavender quotation spread with a single change control.
4. Weekly reading spread: geometric night-window illustration and large literary title.
5. Two-column platform introduction, leaf mark opposite text.
6. Four school-year milestones with one expanded content region.
7. Three staggered editorial entries, each with a short inline read-through.
8. Sage night garden with form on one side and lantern scene on the other.
9. Quiet branded close and privacy disclosure.

A shared frame controls equal margins. Mobile is a deliberate single-column composition, with compact horizontal image/text article entries and a separately stacked night scene. No section reveals or scroll hijacking. Content is visible by default.

## Tokens
See `prototype/src/styles/global.css` for source of truth.
- Ground `--cream: #f7f3e9`, paper `#fffdf7`, inset ground `#eee7d8`.
- Ink `#333e32`, supporting ink `#616656`.
- Sage `#dce3d2`, primary action `#4d634b`.
- Wisteria `#b6a0c9`, quote field `#e9e2ee`, purple ink `#655274`.
- Warm gold `#e8c77c`, night garden `#30483e`.
- Display Cormorant Garamond 400/500; body Be Vietnam Pro 400/500. Latin and Vietnamese subsets bundled via Fontsource, SIL OFL-1.1. No Google Fonts or Tailwind CDN.
- Display maximum 80px, headings fluid, letter-spacing no tighter than -.035em; text wraps balanced for headings and pretty for prose.
- Buttons: flat fill, 2px corners; article navigation 44px square; quote control circular. Focus 3px purple or gold on dark.

## Illustration and provenance
`prototype/public/garden.webp`: custom AI-generated botanical gouache artwork for this project, generated with OpenAI image tool on 24 October 2026. Not a photograph of a real school or location; no claim of exclusive copyright. Original generation retained outside repository at `/workspace/generated_images/exec-01785ca9-5b6b-4446-8e5f-523db7e1adce.png`. WebP is a locally optimized derivative.
Wisteria geometry, cat vector, night-window composition, editorial motifs, leaf and arrow icons are authored for the prototype. SVG is used for crisp petal geometry, mascot mechanics, and symbols, not a sketch substitute for the hero painting. Font licenses are copied to `prototype/public/licenses/` after install; see THIRD_PARTY_NOTICES.md.

## Motion contract
- Signature: wisteria clusters sway independently around their own branch attachments, 6–11s, tiny rotations.
- Hero companion: cat tail and blink, occasional head tilt, gesture-driven position inside the original garden. A decorative reading companion reuses the exact same CatArt; it is anchored in section padding, never a fixed widget over text.
- Closing action: lantern rises with gently varying direction and duration; no user text attached.
- Feedback 150–200ms. No repeated entrance choreography or waiting to read.
- Pause loops offscreen or when document hidden. OS reduced motion and manual reduction stop ambient loops; meaningful confirmation persists. Explicit drag remains available, because it is user-controlled.
- Maximum four released lanterns. Expire after 9.5s even when animation is paused.

## Component vocabulary / NameThatUI
Offline taxonomy applied, no live sources visited. Main navigation is native links with a disclosure button on small screens (not an application menu). Timeline is an ordered list with disclosure buttons (not a progress stepper or tablist). Article preview is inline expanded content (not a modal). Privacy is native details/summary. Confirmation is a polite status region. Dragging has pointer and keyboard paths plus reset, never drag-only.

## Skills actually used and execution limits
- Taste: subject inventory (wisteria, school-year rhythm, unread drafts, private writing, Mây, cream paper, pauses, lantern release), art-direction sentence, stable title, shared margins, distinct section compositions, full content, screenshots and refinement. Explicit user palette overrides its violet prohibition; user-approved new stack overrides its migration default. This one-page garden does not pursue a stock-photo count or animation-count target at the expense of the approved calm design.
- NameThatUI: read SKILL.md and component-families.md; native semantics chosen by behavior. No helper, live lookup, or eval claimed.
- Impeccable: read SKILL.md, new-work overview, craft-floor, typeset, animate, adapt; use product language, intentional hierarchy, accessible states, restrained motion, default-visible content and responsive composition. Direction already approved by user; no new concept workshop.
- No upstream scripts, random direction engine, Impeccable launcher/context binary, detector, hook, or incomplete scroll scenes executed. Auto-discovery not established. Browser testing uses project-owned Playwright code, separate from all skill engines. No claims of passing their automated gates.

## Phase 1 additive atmosphere revision — 24 October 2026

Scope is a supplement, not a redesign. `global.css`, hero `Wisteria.tsx`, the garden asset, its arched frame, fonts, colors, layout and all original behaviors remain unchanged. Overrides live in `prototype/src/styles/atmosphere.css`; `GardenAtmosphere` is an independent decorative layer. The original HTML remains immutable.

### Translucent surfaces
Existing cream/lilac/sage surfaces use 84–98% tint opacity rather than a white overlay. Backdrop blur is bounded to the header, quote and reading panels (4–10px, lower on mobile). Broad weekly/timeline fields have tint without full-screen blur. The dark reflection and lantern sky keep their legibility. Solid-color fallback is declared for browsers lacking backdrop-filter. This user-requested frosted treatment explicitly supersedes Taste's default no-glass rule and Impeccable's default avoidance of decorative blur; it does not alter the established composition.

### Top garland and petal journey
Two independent edge SVGs hang into outer gutters, with different branch lengths, cluster delays, depth opacities and 9–15s sway rhythms. A shallow branch follows the very top edge. Widths are capped at 66px desktop, 34px tablet, 18px mobile, outside all existing text/control margins. The original hero wisteria is not changed. The garland pauses offscreen.

Petals are CSS transforms on a fixed, bounded set: 16 behind content plus four in front exclusively at the far page edges. Mobile renders six behind and two at the edges; tablet renders ten plus four. Negative phases, 23–50s durations, varied size/opacity, alternating drift and independent rotation prevent a synchronized fall. No canvas, particle spawning loop or frame-by-frame React updates. The field persists during scrolling through the reflection area and fades/pauses when the footer is reached. Petals behind content cannot cover the ink; front petals stay outside the reading frame. All decoration has pointer-events:none and aria-hidden.

### One Mây, two rendering contexts
CatArt is extracted unchanged except named head/paw groups for motion; hero drag, expressions, keyboard and reset retain their original code. The hero has a rare 27s head movement cycle, suspended on focus/drag. The decorative companion has no button, focus target, live region or pointer handling.

Before a visit, choose a visible section bottom near the lower viewport and test the entire 156×65px travel corridor against headings, paragraphs, controls, illustration/read panels and preview content, with additional safety clearance. Mobile corridor is 92×49px. If no safe space exists, do not appear. Absolute document anchoring lets Mây move naturally with the section when scrolling, without a lagging overlay crossing text. New visits fade into a validated dock after a rest; they do not jump visibly between locations. Hero visibility, expanded previews, layout/viewport change, pointer/keyboard activity, typing or a focused control take priority and dismiss or suppress the decorative visit. This intentionally conservative behavior may leave some sections without a visit.

Desktop visits last 6.8s, separated by 20–32s rests; mobile lasts 4.8s with 42–58s rests and no run. Actions choose wave, look, run (86px within the corridor) or masked peek, avoiding consecutive repeats. Initial opportunity is after 6.5s desktop / 14s mobile, gated by scroll settling. This is bounded decorative behavior, not a route-following or emotion-detection agent. No text input is inspected.

### Shared restraint and accessibility
OS reduction, manual reduction and hidden document disable the new spontaneous system; user-requested interaction with the hero remains possible. Content interaction also pauses petals/garland and suppresses ambient visits. Reduced motion leaves the static top garland and readable surfaces; no ambient screen-reader announcements or focus changes. No new dependencies, backend, storage, analytics or network services. Existing lantern state/cleanup is untouched.

### Evidence
See `docs/prototype/REVIEW.md`, the refreshed eight responsive screenshots, two actual idle-visit screenshots and `performance.json`. Headless measurements are a sanity check, not proof of GPU performance or physical-device smoothness. Skill-engine execution limits remain as documented above.

## Full viewport canopy revision — current, 24 October 2026

This revision supersedes the earlier two-edge-SVG garland (66/34/18px edge widths above). That garland was not approved by the user. The scope is exclusively the overhead roof; hero frame, existing hero wisteria, Mây (both contexts), petals, frosted surfaces, layout, type, copy and interactions remain intact.

- **Edge-to-edge structure:** `.top-garland` is an absolute viewport-wide layer outside all page-width containers. Height budgets are 350px desktop, 250px tablet and 145px mobile; no header/hero padding, content coordinates or flow heights change. These are decorative extents, not added empty space.
- **Three planes:** continuous branch/leaf panorama in the back (58% opacity, subtle .5px blur, 21s breeze), six unique middle sprays (85% opacity, 12.7–16.4s), three different near bouquets (94%, larger petals, stronger 1.5–2.2° sway, 9.7–11.8s). Each atlas cell is used once. Layers overlap, with stronger weight at the outer edges and unequal heights/offset phases. Actual artwork supplies petal volume; no WebGL, particle engine or enlarged legacy SVG.
- **Safety is measured:** TopCanopy measures the visible logo, nav links, mobile menu, hero heading/prose/action/note and original garden frame. An alpha mask with padded, softly feathered exclusions clears these actual bounds. ResizeObserver, font readiness and menu-class changes update it without a scroll/frame loop. Safe areas take precedence over density. No new UI plaque or layout component is added.
- **Responsive delivery:** half-resolution transparent WebP variants load below 700px, about 482kB total; desktop/tablet originals about 1.83MB total. Masks use the rendered viewport size, not a stretched fixed-width exclusion map. Sprays are shorter and repositioned on mobile while the roof still spans the entire screen.
- **Restraint:** the existing manual/OS reduction, quiet-on-interaction, document visibility and offscreen pause apply to all roof layers, including the back panorama. Static canopy remains visible under reduced motion. All decoration is aria-hidden and pointer-events:none; no focus or announcements.
- **Visual evidence:** hero screenshots at 1440/768/390 and isolated roof screenshots at each width. The isolated construction views intentionally omit content and its safety mask, exposing the full composition; live hero images are the authority for readability.

The original skill execution limits remain: direct document application only, no upstream launcher, engine, detector or hook. This is a refinement of the unapproved roof, not a new visual world.
