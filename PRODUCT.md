# Không Gian Nội Tâm

## Acceptance status — 24 October 2026
Phase 1 was approved with wisteria B and merged through PR #2. The user explicitly authorized Phase 2 (reading flow and sample content) on 24 October 2026. Phase 2 is implemented on a separate branch for review; it is not yet user-approved, merged or deployed. Phase 3 remains unauthorized.

## Product and audience
A Vietnamese school-wellbeing frontend for students who want a calm place to read, pause, and understand everyday school experiences. No diagnosis, treatment, crisis-response service, account, backend, or human inbox is provided.

## Current authorization
Phase 2: preserve the approved homepage and extend React + TypeScript + Vite in `prototype/` with HashRouter, an editorial library, article and topic reading pages, and a development-only preview/publication boundary. No backend, authentication, 24-article collection, merge or hosting deployment. The original `Không Gian Nội Tâm.html` remains immutable (SHA-256 `4f78efcea9aa8b57f0603261abc4af3a56efb35111646bb7a9fbd7e7c70a4928`).

## Phase 1 acceptance
- New React + TypeScript + Vite project under `prototype/`.
- Responsive header, layered wisteria hero, bounded draggable cat, keyboard alternative, random quote and change control.
- Weekly sample, platform introduction, interactive school-year timeline, exactly three clearly labeled illustrative draft excerpts opening inline.
- Reflection and lantern interaction: ephemeral input only, no message in lantern state, no transmission, persistence, analytics, or logging.
- Footer privacy disclosure, visible keyboard focus, reduced motion, no content hidden behind animation.
- Verify widths 320, 390, 768, 1440; build and browser checks; report real evidence and gaps.
- Separate branch and PR into main; no merge or hosting deployment.

## Editorial truth
Four illustrative articles and one topic live in `prototype/editorial/catalogue.json`; all are `draft` or `in_review`. No article has expert approval or publication authorization. The old three homepage excerpts and weekly excerpt remain available in development to preserve the approved interactions. They are excluded from public builds.

`draft → in_review → approved → published` is the schema's editorial lifecycle. `approved` alone does not publish. A published item must include an explicit approval record and publication date; actual human review is a repository/code-review responsibility. This frontend does not authenticate or manufacture reviewer approval. Source links in the samples are real WHO/NHS resources, checked for availability; the sample prose has not been fully source-verified or professionally reviewed. Two samples intentionally have no sources and say so.

The Vite virtual content module serializes only published entries at build time, and removes links to excluded articles from published topics. No raw content catalogue is copied to public assets, no production preview query unlocks drafts, and source maps are disabled. `npm run build` scans every output file for unapproved catalogue text and the legacy homepage excerpts; it fails if any are found. Source files in this public GitHub repository are still publicly readable: the boundary protects the website build, not repository confidentiality.

Because there are currently zero published articles/topics, production uses truthful empty-library/topic states and replaces the homepage's draft weekly/excerpt text with pending-publication copy. Homepage art, layout system, fonts, mascot and non-content interactions remain intact. This narrow content difference is necessary to meet the publication requirement; development is the full sample-reading review mode.

## Privacy boundaries
Reflection text exists only in component state and the textarea DOM during the current page visit. Release clears both before creating animation metadata. It is never put in a URL, storage, logs, animation, network request, or analytics. Page hiding through pagehide clears the form, and leaving/unmounting discards it. This is not a promise of physical memory erasure. Fonts and illustrations are local. Host access logs and browser extensions are outside this prototype's control.

## Phase 2 routing and discovery
HashRouter routes: `/`, `/thu-vien`, `/bai-viet/:slug`, `/chuyen-de`, `/chuyen-de/:slug`, and an in-app 404. Native-looking navigation links retain homepage sections at `/#/#nen-tang`, `/#/#dong-chay`, and `/#/#tam-tinh`. Vite's relative base is verified under `/Kho-ng-gian-Insight/` on a static server without route fallback. A page reload requests the repository index, not a server article route.

Library search normalizes Vietnamese accents and đ/Đ, matches every query word across title, description and keywords, and combines topic/year-stage filters. Query parameters inside the router fragment (`q`, `chu-de`, `giai-doan`) are the state source; reload and Back/Forward restore them. Opening an article records the library URL in browser history state; the return link restores filters, with `/thu-vien` as a direct-entry fallback. Route changes focus the main region; table-of-contents links focus their destination. Preview labels are persistent and explicit.

## Review checkpoints
1. Approve homepage aesthetics and interactions.
2. Approve reading flow, route behavior, and draft preview mechanism.
3. Review complete features and each sourced article independently.
4. Approve final checks and explicit publication selection.
