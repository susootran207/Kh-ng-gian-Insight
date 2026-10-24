# Asset and dependency notices

## Bundled fonts
- Be Vietnam Pro, Fontsource package `@fontsource/be-vietnam-pro`: SIL Open Font License 1.1. Full upstream copyright and license: `public/licenses/Be-Vietnam-Pro-OFL.txt`.
- Cormorant Garamond, Fontsource package `@fontsource/cormorant-garamond`: SIL Open Font License 1.1. Full upstream copyright and license: `public/licenses/Cormorant-Garamond-OFL.txt`.
- Only normal 400/500 Latin and Vietnamese subsets are imported. Fonts are bundled and served locally, never requested from a font CDN.

## Artwork
`public/garden.webp` is custom AI-generated botanical art made for this prototype with OpenAI's image tool on 24 October 2026, then optimized to WebP. It does not represent a real school, team, person, or location. Use follows the applicable OpenAI output terms; no third-party artist attribution or exclusive copyright is claimed. The original generation is preserved in the workspace outside the repository. The prompt and purpose are documented in `../docs/prototype/ARTWORK.md`.

Other vectors, geometric compositions and icons are authored specifically for this project; no third-party illustration pack or external image host is used.

## Software
Runtime: React and React DOM (MIT), Fontsource font packages (OFL-1.1 fonts). Build/test dependencies and exact versions are recorded in package-lock.json. Their respective licenses remain in the installed packages. No external runtime service is required.
