# Living Garden — implementation and acceptance

This revision follows the user's master brief of 28 October 2026. It supersedes the old companion contract (hidden during scroll, no free drag) and the old almost-invisible gutter-only petals. It does not authorize a merge or deployment.

## Try the interactions

- **Home:** watch individual wisteria clusters, petal groups and leaves move independently. Choose **Gọi một làn gió** to release 14 petals and stir the flowers. Petals also fall across the viewport, in front of surfaces at restrained opacity, without intercepting clicks. They no longer stop merely because the visitor taps.
- **Mây:** after leaving the hero, Mây remains in the viewport while scrolling. Drag with mouse or finger; release to settle outside text and controls when space is available. Tap to greet. Focus and use arrow keys to move, Home/Escape to return. Idle states include looking, waving, sitting and resting; walking, happiness and carried poses respond to input. The character drawing is unchanged. The hero retains its original bounded companion and keyboard controls.
- **Topics:** ten content-specific scene families. Open the gate/light path; create water ripples; move a connecting ribbon; show listening waves; breathe with rising tea steam; reveal notebook lines; disperse attention dots; run hourglass sand; grow new leaves; choose a path branch. Play via the image or its visible button. The button also supports Enter/Space. No scene control is nested inside navigation.
- **Library:** each article has its mapped scene, a moving light layer and independently moving vector elements. Reading navigation is separate from playing the image. The featured entry has its own editorial scale.
- **Flow:** an organic route connects four selectable stage anchors. The chosen stage changes its marker and connector; scene artwork and article filters remain linked to the corresponding school-year stage. The homepage stage selection also swaps its scene.
- **Reader:** the article cover uses the mapped topic scene. Existing chapter spacing, active table of contents, reading progress, academic figure zoom, tables and source anchors remain. No global falling-petal layer appears in articles; Mây and the motion control remain available. The original academic SVGs are not animated or modified.
- **Lantern:** the existing release flight remains, with message clearing before animation and bounded lifetimes. No reflection text is added to particles or companion state.

## Technical choices

React + CSS + authored SVG geometry; no new runtime dependencies, WebGL engine, third-party preview assets or remote fonts. Local painted assets remain the visual base. These are layered painted scenes with subject-specific vector effects and state changes, not newly segmented 3D illustrations. Scene/background/foreground move at different depths. Loops pause when the scene is offscreen, hidden or motion is disabled. The shared motion preference starts on, respects OS reduction, and is ephemeral. Direct drag and textual feedback still work with motion off.

Taste and Impeccable references were read directly. The repository's rule against unreviewed upstream launchers was respected; the Impeccable context loader, detector and upstream scripts did not run. No skill-engine automated pass is claimed.

## Scope and evidence

The source publication records, F0 records, article meaning, original HTML and 29 academic SVGs are unchanged. Standard release and Academic Showcase remain separate build targets. See VALIDATION.md for actual commands/results, engine and device limits. Browser evidence uses Chromium; no physical iPhone/Android or Safari claim is made. Human acceptance is still required: the screen recordings demonstrate behavior but do not replace the user's experience review.

## Build and update deployment after approval

1. Review this single PR and try the extracted Academic Showcase on a local static HTTP server. Opening `index.html` via `file://` is not supported.
2. In `prototype`, run `npm ci`, then `npm run build:academic` for the Academic Showcase. Use `npm run build` only for the normal publication-gated release; it deliberately withholds unapproved academic content.
3. Validate with `npm run test:f0`, `npm run test:academic:browser`, and `npm run scan:academic` (Chromium required; `CHROMIUM_PATH` may select the executable).
4. Check the delivered ZIP SHA-256 against SHA256SUMS.txt. Deploy the **contents** of `dist-academic` (or the ZIP) to the existing static hosting root, preserving the relative paths and HashRouter URLs. Do not deploy the repository, editorial dossiers, source manifests, tests, reports or source maps.
5. Keep the previous artifact for rollback. Verify home, all content counts, article deep links, mobile touch, manual/OS motion settings and lantern privacy on the actual host.

No merge or deployment was performed by this task.
