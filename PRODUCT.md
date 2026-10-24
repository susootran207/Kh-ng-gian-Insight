# Không Gian Nội Tâm

## Product and audience
A Vietnamese school-wellbeing frontend for students who want a calm place to read, pause, and understand everyday school experiences. No diagnosis, treatment, crisis-response service, account, backend, or human inbox is provided.

## Current authorization
Phase 1 ONLY: a visually complete responsive homepage prototype. The user explicitly approved implementation on 24 October 2026. Phases 2–4 require separate review and approval. The original `Không Gian Nội Tâm.html` is immutable, SHA-256 `4f78efcea9aa8b57f0603261abc4af3a56efb35111646bb7a9fbd7e7c70a4928`.

## Phase 1 acceptance
- New React + TypeScript + Vite project under `prototype/`.
- Responsive header, layered wisteria hero, bounded draggable cat, keyboard alternative, random quote and change control.
- Weekly sample, platform introduction, interactive school-year timeline, exactly three clearly labeled illustrative draft excerpts opening inline.
- Reflection and lantern interaction: ephemeral input only, no message in lantern state, no transmission, persistence, analytics, or logging.
- Footer privacy disclosure, visible keyboard focus, reduced motion, no content hidden behind animation.
- Verify widths 320, 390, 768, 1440; build and browser checks; report real evidence and gaps.
- Separate branch and PR into main; no merge or hosting deployment.

## Editorial truth
The three excerpts and weekly text are visual prototype samples, NOT the future 24 full drafts. Sources have not been researched for these excerpts. They are labeled as unreviewed and must not claim specialist approval. Phase 2 will introduce dev-only review and a build-time publication gate. Phase 3 will create 24 sourced drafts; neither is implemented here.

## Privacy boundaries
Reflection text exists only in component state and the textarea DOM during the current page visit. Release clears both before creating animation metadata. It is never put in a URL, storage, logs, animation, network request, or analytics. Page hiding through pagehide clears the form, and leaving/unmounting discards it. This is not a promise of physical memory erasure. Fonts and illustrations are local. Host access logs and browser extensions are outside this prototype's control.

## Future routing decision (not implemented)
Use HashRouter on GitHub Pages in Phase 2, with article URLs `/#/bai-viet/:slug`, avoiding server-route 404s. Phase 1 uses same-page anchors only and Vite relative asset base. No deployment workflow is created.

## Review checkpoints
1. Approve homepage aesthetics and interactions.
2. Approve reading flow, route behavior, and draft preview mechanism.
3. Review complete features and each sourced article independently.
4. Approve final checks and explicit publication selection.
