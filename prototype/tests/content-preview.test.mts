import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createContentPreview, sourceNodeCount } from '../build/content-preview.ts'
import { loadManifest, readReference, sha256, selectSourceView } from '../build/content-contract.ts'
import { compileReaderDocument, parseGfm } from '../build/reader-document.ts'
import { createBoundary, assertArtifact } from '../build/publication-scan.ts'
import { editorial } from '../build/editorial.ts'
import { contentPreviewPlugin } from '../build/content-preview-server.ts'
import type { ReaderNode } from '../src/reading/markdown/model.ts'

const root = resolve('..'), manifest = loadManifest(root), view = createContentPreview(root, '127.0.0.1')
function nodes(n: ReaderNode): ReaderNode[] { return [n, ...(n.children ?? []).flatMap(nodes)] }
for (const a of view.articles) test('DATA01–04/READ03/05/06: exact source/AST/metadata/assets ' + a.id, () => {
  const original = manifest.articles.find(s => s.id === a.id)!, source = readReference(root, original.source).toString('utf8')
  assert.equal(a.slug, original.slug); assert.equal(a.revision, original.revision)
  assert.deepEqual(a.metadata, original.metadata)
  assert.equal(a.contentHash, original.contentHash); assert.equal(a.document.sourceHash, sha256(source))
  const fields = ['value','depth','url','title','alt','identifier','ordered','start','checked','lang','align'] as const
  const actual = nodes(a.document.root), independent: Record<string, unknown>[] = []
  function walk(n: any) { independent.push({ type: n.type, start: n.position.start.offset, end: n.position.end.offset, ...Object.fromEntries(fields.map(key => [key, n[key]])) }); n.children?.forEach(walk) }
  walk(parseGfm(source))
  assert.equal(a.document.trace.length, sourceNodeCount(source))
  assert.deepEqual(actual.map(n => ({ type: n.type, start: n.range.start, end: n.range.end, ...Object.fromEntries(fields.map(key => [key, n[key]])) })), independent)
  for (const t of a.document.trace) assert.equal(t.rawHash, sha256(source.slice(t.range.start, t.range.end)))
  assert.equal(actual[1].id, a.document.titleNodeId); assert.equal(actual[1].depth, 1)
  assert.equal(a.document.figures.length, original.assets.length)
  for (const asset of original.assets) {
    const compiled = a.document.assets.find(c => c.sha256 === asset.sha256)!
    assert(compiled); assert.equal(sha256(readReference(root, asset)), compiled.sha256)
    assert(actual.some(n => n.type === 'image' && n.alt === asset.alt && n.url === compiled.key))
  }
  for (const n of actual.filter(n => n.type === 'link')) {
    if (n.url!.startsWith('https:')) continue
    const dossier = a.dossiers.find(d => d.file.path.endsWith('/' + n.url))
    assert(dossier); assert(a.document.localLinks?.some(l => l.source === n.url && l.target === '#' + dossier.anchor))
  }
})
test('DATA01/DATA04: unique 29 routes, four correct r2, no legacy duplicate/title', () => {
  assert.equal(view.articles.length, 29); assert.equal(new Set(view.articles.map(a => a.id)).size, 29); assert.equal(new Set(view.articles.map(a => a.slug)).size, 29)
  assert.deepEqual(view.articles.filter(a => a.revision.endsWith('-r2')).map(a => a.id), ['KGNT-C01','KGNT-C05','KGNT-C17','KGNT-E05'])
  assert.equal(view.articles.filter(a => a.revision.endsWith('-r1')).length, 25)
  assert.equal(view.articles.find(a => a.slug === 'dung-ve-phia-minh')!.metadata.title, 'Một sai sót không kể hết về bạn')
  for (const a of view.articles) for (const id of a.metadata.relatedArticleIds) assert(view.articles.some(other => other.id === id))
})
test('SAFE01: C1 preserves R1 rejection, only first source H1 and declared dossier mapping', () => {
  for (const body of ['# Title\n\n# Second H1', '# Title\n\n#### H4', '# Title\n\n<script>bad()</script>', '# Title\n\n[bad](javascript:alert(1))', '# Title\n\n[bad](UNKNOWN.md)', '# Title\n\n[bad](../REFERENCES.md)']) assert.throws(() => compileReaderDocument(body, [], { titleInHeader: true }))
  for (const source of ['../REFERENCES.md', 'https://example.org/', 'ARTICLE.md?x']) assert.throws(() => compileReaderDocument('# Title', [], { titleInHeader: true, localLinks: [{ source, target: '#provenance-references' }] }))
  assert.throws(() => compileReaderDocument('# Title', [], { titleInHeader: true, localLinks: [{ source: 'REFERENCES.md', target: 'javascript:bad()' }] }))
})
test('PUB01/PUB04/PUB05: F0 remains empty and catches real compiled source/SVG/escaped canary', () => {
  assert.equal(selectSourceView(manifest, root, { kind: 'public' }).articles.length, 0)
  const catalogue = JSON.parse(readFileSync('editorial/catalogue.json', 'utf8')), boundary = createBoundary(root, manifest, catalogue)
  for (const a of view.articles) {
    assert.throws(() => assertArtifact(Buffer.from(JSON.stringify(a.document)), 'accident.js', boundary))
    for (const asset of manifest.articles.find(s => s.id === a.id)!.assets) assert.throws(() => assertArtifact(readReference(root, asset), 'renamed.svg', boundary))
  }
  assert.throws(() => assertArtifact(Buffer.from('"\\u00460_FIXTURE_ONLY_C1_CANARY"'), 'escaped.js', boundary))
})
test('PUB05: clean-code preview modules rejected before emitting production', () => {
  const hook = editorial().generateBundle as unknown as (options: unknown, bundle: unknown) => void
  for (const id of ['/repo/prototype/preview/main.tsx', '\0virtual:c1-preview']) assert.throws(() => hook({}, { 'app.js': { type: 'chunk', code: 'export const harmless = 1', modules: { [id]: {} } } }), /test-only Reader/)
})
test('PUB06/PUB08: F0 denies non-loopback; preview config denies build and host override', () => {
  for (const host of ['localhost','0.0.0.0','127.0.0.1.evil.test','[::1]']) assert.throws(() => createContentPreview(root, host), /literal loopback/)
  const hook = contentPreviewPlugin().configResolved as unknown as (config: unknown) => void
  for (const config of [{ command: 'build', server: { host: '127.0.0.1', port: 4191 } }, { command: 'serve', server: { host: '0.0.0.0', port: 4191 } }, { command: 'serve', server: { host: '127.0.0.1', port: 4192 } }]) assert.throws(() => hook(config))
})
