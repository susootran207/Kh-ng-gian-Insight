> **Cập nhật tiếp theo trên PR #37:** xem [hoa chạm tay và scene 2.5D nhiều lớp](depth-v2/README.md) cùng [bằng chứng/kiểm thử mới](depth-v2/VALIDATION.md). Tài liệu và GIF của lần đầu bên dưới được giữ để đối chiếu; ZIP và checksum trỏ tới bản mới nhất.

# Validation — 28 October 2026

## Final artifact

- `npm run build`: PASS (TypeScript, Vite and publication-boundary scan). Normal release withholds 29 unapproved source articles; the canary is detected.
- `npm run build:academic`: PASS, including 2 Academic Showcase contract tests and the release scanner: **29 articles, 29 academic SVGs, 10 topics, 68 output files**.
- `npm run test:f0`: **22 passed**. The Academic Showcase build also verifies all 107 protected records. No publication record, F0 source or academic content file was modified by this revision.
- `playwright test -c playwright.academic.config.ts`: **16 passed, 2.6 minutes**, against the final built Academic Showcase, not Vite dev fixtures.
- `git diff --check`: PASS.
- Original HTML SHA-256 remains `4f78efcea9aa8b57f0603261abc4af3a56efb35111646bb7a9fbd7e7c70a4928`.

## What the browser checks actually exercised

System Chromium headless; viewports 320, 390, 768, 1024 and 1440 px. Every article route was opened/reloaded at all five widths, all source node IDs were compared, all 29 academic images loaded, 25 source tables remained, and topic/Flow/library links worked. No horizontal page overflow remained, including the corrected 1024 px Flow layout.

Desktop checks sampled the rendered transform matrices of falling petals, individual flower clusters and leaves across 900 ms, exercised the gust, dragged the floating Mây to x=570/y=370, released it, moved it by keyboard and scrolled while it remained visible. Ten topic scenes were pointed at, clicked, photographed, toggled by Enter and taken offscreen to verify pausing. Lantern flight was measured at different times; the private canary never entered animation state and the lantern expired.

Mobile checks used a real browser touch context and CDP touchStart/touchMove/touchEnd input, not a resized desktop mouse alone. They tapped the water scene and measured changing ripple transforms; dragged Mây with touch; released it; exercised OS reduced motion and retained textual scene feedback. Existing hero touch drag, keyboard controls and mobile table of contents were also checked.

**Native-pan limit:** this system Chromium delivered touch pointer movement without native scrolling on both the scene and a plain 4000 px HTML control page. The test records this limit in `evidence/native-pan-limit.json` and verifies document scrolling by wheel as a fallback. It does **not** claim native finger-swipe scrolling passed. Physical iPhone/Android, Safari and on-device performance remain unverified. No pass assertion was obtained by adding artificial JS scrolling to the product.

Axe checks returned no WCAG A/AA violations on Reader at 390 and 1440 px. This is an automated check of those surfaces, not a claim of full-site accessibility certification.

## Local performance sample

Chromium, 390 px, no CPU/network throttling: DOMContentLoaded 282 ms; CLS 0.00018; median frame interval 16.7 ms, p95 33.4 ms across 60 idle frames; initial encoded resources about 3.21 MB. These numbers are a local idle sample, not an on-device scroll benchmark or Lighthouse score. Raw values are in `evidence/garden-performance.json`.

## Evidence and downloads

- [Desktop GIF](evidence/desktop.gif) · [desktop video](evidence/desktop.mp4): flowers, gust, following/drag and keyboard movement.
- [Mobile GIF](evidence/mobile.gif) · [mobile video](evidence/mobile.mp4): touch scene and touch drag; Chromium emulation.
- `evidence/scene-0.png` through `scene-9.png`: the ten scene states, including subject-specific vector responses.
- `evidence/desktop-motion.json`: actual sampled poses, opacity and drag position.
- [Academic ZIP](artifacts/Academic-Showcase-Living-Garden.zip) · [SHA-256](artifacts/SHA256SUMS.txt).
- Deployment/update steps are in [REVIEW.md](REVIEW.md#build-and-update-deployment-after-approval). No merge or deployment performed.

To reproduce video capture, install the Playwright ffmpeg helper or point `PLAYWRIGHT_BROWSERS_PATH` at an existing compatible helper directory. This session used the existing system `/usr/bin/ffmpeg` via a symlink in `work/pw-browsers/ffmpeg-1013/ffmpeg-linux`, and `/usr/bin/chromium`. No upstream skill engine was run.
