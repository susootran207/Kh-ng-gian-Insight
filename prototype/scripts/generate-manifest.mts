import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { generateManifest, canonical, requireThat } from '../build/content-contract.ts'

const root = fileURLToPath(new URL('../../', import.meta.url))
const target = new URL('../editorial/source-manifest.json', import.meta.url)
const args = process.argv.slice(2), check = args.includes('--check')
const commit = args.find(arg => /^[a-f0-9]{40}$/.test(arg)) ?? JSON.parse(readFileSync(target, 'utf8')).sourceCommit
const manifest = generateManifest(root, commit)
if (check) requireThat(canonical(JSON.parse(readFileSync(target, 'utf8'))) === canonical(manifest), 'generated manifest is stale')
else {
  if (existsSync(target)) {
    const existing = JSON.parse(readFileSync(target, 'utf8'))
    requireThat(existing.articles.every((a: { status: string; publication: unknown; publishedAt: unknown; assets: { rights: unknown }[] }) => a.status === 'draft' && a.publication === null && a.publishedAt === null && a.assets.every(asset => asset.rights === null)), 'regeneration cannot overwrite review/publication state')
  }
  writeFileSync(target, JSON.stringify(manifest, null, 2) + '\n')
}
console.log(`Source manifest: ${manifest.articles.length} records; ${check ? 'unchanged' : 'generated'}; no publication grants.`)
