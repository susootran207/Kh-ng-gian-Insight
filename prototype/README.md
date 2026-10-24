# Không Gian Nội Tâm — prototype

React + TypeScript + Vite; Phase 2 review branch. No hosting workflow or deployment.

Requires Node 22.18+ (Node 24 recommended) and npm. Install with `npm ci`.

- `npm run dev`: full sample review mode. Open `/#/thu-vien`, `/#/chuyen-de`, `/#/bai-viet/khi-mua-thi-den-gan`, `/#/chuyen-de/dem-dai`.
- `npm run build`: TypeScript, production build, then publication guard. Unpublished articles, topics and legacy homepage excerpts must not appear in dist.
- `npm run preview`: inspect the production artifact. There are currently no published articles; empty states are expected. Preview flags cannot unlock drafts.
- `npm run test:e2e`: development reading flow plus all retained homepage checks, Chromium at 320/390/768/1440px. Uses `/usr/bin/chromium` or `CHROMIUM_PATH`.
- `npm run test:production`: after build, serves dist under `/Kho-ng-gian-Insight/` without SPA fallback and checks assets, reload and unpublished-route exclusion. Uses a separate output directory.
- `npm run test:content`: schema selection tests and full dist leak scan (build first).

## Editorial changes

Edit `editorial/catalogue.json` outside `public/`. `editorial/schema.ts` defines articles/topics, statuses and reference links. Content must undergo actual editorial/source review before changing status. `approved` stays private to development; `published` requires `approval: {by, at, revision}` and `publishedAt`. Record the reviewed revision in the approval record; changed prose requires re-review. Metadata is not authentication or proof of expert approval. Use a reviewed PR to record the human decision. Nothing is published in this phase.

Vite's build plugin constructs `virtual:editorial` from eligible records before client bundling. Never import the raw catalogue into frontend code or put drafts in public assets. The guard also checks the Phase 1 excerpt strings. This is website-build exclusion, not source-repository privacy.

HashRouter keeps server requests on the repository index; Vite `base: './'` keeps local assets relative to that index. New article/topic slugs are route parameters. Library query filters live inside the hash (`/#/thu-vien?q=mua+thi`); homepage sections use the second fragment (`/#/#dong-chay`). See `../docs/phase-2/REVIEW.md` for review evidence and remaining limits.
