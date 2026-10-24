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
- Companion: cat tail and blink; gesture-driven position; no free-floating widget.
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
