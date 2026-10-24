# Không Gian Nội Tâm — Phase 1 homepage prototype

The original HTML in the repository root is unchanged. This is a separate React + TypeScript + Vite project. No backend, login, publication pipeline, full library, or 24-article dataset is included.

```sh
cd prototype
npm install
npm run dev
npm run build
npm run preview
npm run test:e2e
```

The tests use an installed Chromium at `/usr/bin/chromium` by default. Set `CHROMIUM_PATH` to your local executable or install Playwright Chromium and change the config accordingly. The test server binds localhost only.

All fonts and artwork are local. See `THIRD_PARTY_NOTICES.md` for provenance. No hosting workflow is installed. `base: './'` makes built assets portable; Phase 2's proposed HashRouter is not installed.

## Interactions
- Mobile Menu expands native navigation links; Escape closes and restores focus.
- Mây: tap/click changes expression and message. Drag with mouse/touch within the garden. Enable “Di chuyển bằng phím”, focus goes to Mây; arrows move, Shift+arrows moves farther, Home resets, Escape exits. “Về chỗ cũ” resets at any time.
- Quote control always selects a different locally authored message.
- Weekly excerpt, four timeline stages, and three sample excerpts open within the page.
- Lantern input is ephemeral. Release clears text before animation metadata is created. No sensitive input is stored or transmitted.
- OS reduced motion and the “Giảm chuyển động” button stop ambient movement.

## Review scope
All sample content is unreviewed, explicitly labeled illustrative copy. This prototype is not a public publication of the future article collection. Noindex metadata is an indexing hint, not access control. Do not deploy without the next explicit approval.

## Additive atmosphere revision
The original garden frame and design remain intact. A separate atmosphere layer adds translucent surfaces, edge wisteria, a bounded CSS petal field and occasional decorative Mây visits in safe section padding. Mobile reduces particles, character size and frequency. OS/manual reduced motion stops spontaneous visits; the interactive hero cat remains available. Input, focus, expanded reads and hero visibility take precedence. See DESIGN.md and docs/prototype/REVIEW.md in the repository root for behavior and measured limits.

## Current trellis review round
Three alternatives remain available on the same homepage: `/?wisteria=A`, `/?wisteria=B`, `/?wisteria=C`. B is provisional default, not an approved choice; A/C are retained. The parameter only selects decorative composition, with no persisted preference or article routing. See `../docs/prototype/screenshots/variants/README.md` for matched 1440px screenshots and the review board.
