import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, cpSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { gzipSync, brotliCompressSync } from 'node:zlib'
import type { SourceManifest, SourceArticle, ReviewKind, ReviewRecord, PublicView, SourceMetadata } from '../editorial/source-contract.ts'
import type { Catalogue, Article, Topic } from '../editorial/schema.ts'
import { DOSSIERS, REVIEW_KINDS, generateManifest, loadManifest, validateManifest, validateSourceInventory, selectSourceView, resolveArticleLinks, safeFile, sha256, revisionHash, legacyHashes, canonical } from '../build/content-contract.ts'
import { editorial, selectContent, repositoryRoot } from '../build/editorial.ts'
import { assertArtifact, createBoundary, scanProduction, FIXTURE_SENTINEL } from '../build/publication-scan.ts'

const BASE = '498fcf656098aaf4338744f8a289200c01eec26a'
const manifest = loadManifest(repositoryRoot)
const catalogue: Catalogue = JSON.parse(readFileSync(resolve(repositoryRoot, 'prototype/editorial/catalogue.json'), 'utf8'))
const clone = <T,>(value: T): T => structuredClone(value)
const emptyCatalogue: Catalogue = { articles: [], topics: [] }
function write(root: string, path: string, value: string | Buffer) {
  const target = join(root, path); mkdirSync(resolve(target, '..'), { recursive: true }); writeFileSync(target, value)
}
function syntheticSource(root: string, n: number, related: string[] = []) {
  const id = 'KGNT-C' + n
  const metadata: SourceMetadata = {
    title: 'Synthetic article ' + n, collection: 'core', topic: 'Synthetic topic', season: 'Đầu năm',
    keywords: ['synthetic'], audience: ['THCS'], bloom: { remember: 'Identify', understand: 'Explain', apply: 'Apply' },
    topicIds: ['T99'], relatedArticleIds: related,
  }
  const dir = 'docs/phase-3/drafts/C' + n
  write(root, dir + '/ARTICLE.md', '# ' + metadata.title + '\n\n> ' + id + ' c' + n + '-draft-r1\n\n' + FIXTURE_SENTINEL + n + ' An entirely synthetic paragraph for contract tests; no accepted article is changed.\n\n![Synthetic alt text for figure ' + n + '](figure-c' + n + '.svg)\n\n## Tài liệu tham khảo\n\nSynthetic. (2026). Test reference. https://example.test/reference\n')
  for (const name of DOSSIERS) write(root, dir + '/' + name + '.md', '# Synthetic ' + name + '\n\n' + FIXTURE_SENTINEL + 'DOSSIER_' + n + '_' + name + '\n')
  write(root, dir + '/figure-c' + n + '.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 100"><title>Synthetic educational figure ' + n + '</title><desc>Synthetic alt text for figure ' + n + '</desc><text x="5" y="30">Synthetic drawing for article ' + n + '</text></svg>')
  return { id, slug: 'synthetic-' + n, ...metadata }
}
function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'kgnt-f0-'))
  const articles = [syntheticSource(root, 30, ['KGNT-C31']), syntheticSource(root, 31, ['KGNT-C30'])]
  write(root, 'docs/phase-3/matrix.json', JSON.stringify({ articles, topics: [{ id: 'T99', articleIds: articles.map(a => a.id) }] }))
  write(root, 'prototype/src/reading/homepageContent.ts', 'export const fixture = []')
  mkdirSync(join(root, 'prototype/public'), { recursive: true })
  const data = generateManifest(root, BASE)
  return { root, data, close: () => rmSync(root, { recursive: true, force: true }) }
}
function evidence(root: string, expected: { kind: ReviewKind; subjectId: string; revision: string; contentHash: string; revisionHash: string }): ReviewRecord {
  const body = { ...expected, decision: 'approved' as const, by: 'SYNTHETIC TEST ONLY — no real reviewer', at: '2026-01-01T00:00:00Z' }
  const path = 'docs/phase-3/publication-records/' + expected.subjectId + '-' + expected.kind + '.json'
  const bytes = JSON.stringify(body); write(root, path, bytes)
  return { ...body, evidence: { path, sha256: sha256(bytes) } }
}
function publication(root: string, id: string, revision: string, contentHash: string, hash: string) {
  return Object.fromEntries(REVIEW_KINDS.map(kind => [kind, evidence(root, { kind, subjectId: id, revision, contentHash, revisionHash: hash })])) as unknown as SourceArticle['publication']
}
function publish(root: string, data: SourceManifest, index = 0) {
  const a = data.articles[index]
  a.status = 'published'; a.publishedAt = '2026-01-02T00:00:00Z'
  a.publication = publication(root, a.id, a.revision, a.contentHash, a.revisionHash)
  for (const asset of a.assets) asset.rights = evidence(root, { kind: 'assetRights', subjectId: asset.id, revision: asset.revision, contentHash: asset.sha256, revisionHash: a.revisionHash })
}
function legacyArticle(): Article {
  return { slug: 'synthetic-public', title: 'Synthetic legacy test', description: 'Synthetic fixture', topic: 'Synthetic', season: 'Đầu năm', keywords: ['fixture'], status: 'draft', updated: '2026-01-01', readingMinutes: 1, sections: [{ id: 'one', heading: 'Synthetic heading', paragraphs: ['Synthetic test paragraph'] }], sources: [] }
}
function publishLegacy<T extends Article | Topic>(root: string, a: T): T {
  const hashes = legacyHashes(a as unknown as Record<string, unknown>)
  return { ...a, status: 'published', publishedAt: '2026-01-02T00:00:00Z', publication: { revision: 'synthetic-r1', ...hashes, records: publication(root, a.slug, 'synthetic-r1', hashes.contentHash, hashes.revisionHash)!, assets: [] } }
}

test('DATA01: real baseline has 29 unique IDs/slugs, four r2 and 25 r1; no prose in manifest', () => {
  assert.equal(manifest.articles.length, 29)
  assert.equal(new Set(manifest.articles.map(a => a.id)).size, 29)
  assert.equal(new Set(manifest.articles.map(a => a.slug)).size, 29)
  assert.equal(manifest.articles.filter(a => a.revision.endsWith('-r2')).length, 4)
  assert.equal(manifest.articles.filter(a => a.revision.endsWith('-r1')).length, 25)
  assert.equal(canonical(manifest), canonical(generateManifest(repositoryRoot, BASE)))
  for (const a of manifest.articles) assert(!('sections' in a || 'paragraphs' in a || 'body' in a))
})
test('DATA01: real 29-source structure accepts a synthetic 30th article', () => {
  const x = fixture()
  try {
    cpSync(resolve(repositoryRoot, 'docs/phase-3/drafts'), join(x.root, 'docs/phase-3/drafts'), { recursive: true })
    // Remove initial synthetic C31; replace C30 with metadata compatible with the full matrix.
    rmSync(join(x.root, 'docs/phase-3/drafts/C31'), { recursive: true })
    const m = JSON.parse(readFileSync(resolve(repositoryRoot, 'docs/phase-3/matrix.json'), 'utf8'))
    const extra = syntheticSource(x.root, 30, ['KGNT-C01'])
    extra.topicIds = ['T01']
    m.articles.push(extra); m.topics[0].articleIds.push(extra.id)
    write(x.root, 'docs/phase-3/matrix.json', JSON.stringify(m))
    const thirty = generateManifest(x.root, BASE)
    validateSourceInventory(thirty, x.root)
    assert.equal(thirty.articles.length, 30)
    assert.equal(thirty.articles.at(-1)!.id, 'KGNT-C30')
  } finally { x.close() }
})
test('DATA02: all 203 accepted source/dossier/SVG hashes match before and after tests', () => {
  const refs = manifest.articles.flatMap(a => [a.source, ...Object.values(a.dossiers), ...a.assets])
  assert.equal(refs.length, 203)
  for (const ref of refs) assert.equal(sha256(readFileSync(safeFile(repositoryRoot, ref.path))), ref.sha256)
})
test('contract rejects duplicate IDs/slugs and unknown/asymmetric relations', () => {
  for (const mutate of [
    (m: SourceManifest) => { m.articles[1].id = m.articles[0].id },
    (m: SourceManifest) => { m.articles[1].slug = m.articles[0].slug },
    (m: SourceManifest) => { m.articles[0].metadata.relatedArticleIds = ['KGNT-C99']; m.articles[0].revisionHash = revisionHash(m.articles[0]) },
    (m: SourceManifest) => { m.topicRegistry[0].articleIds = [] },
    (m: SourceManifest) => { m.articles[0].metadata.topicIds = ['T98']; m.articles[0].revisionHash = revisionHash(m.articles[0]) },
  ]) {
    const m = clone(manifest); mutate(m); assert.throws(() => validateManifest(m, repositoryRoot))
  }
})
test('contract rejects invalid revision, digest, stage, audience, metadata extras, URL and asset reference', () => {
  const mutations = [
    (a: SourceArticle) => { a.revision = 'c01-draft-r999' },
    (a: SourceArticle) => { a.contentHash = 'f'.repeat(64) },
    (a: SourceArticle) => { a.source.sha256 = 'no-hash' },
    (a: SourceArticle) => { a.metadata.season = 'Unknown' as SourceMetadata['season'] },
    (a: SourceArticle) => { a.metadata.audience = ['Unknown' as 'THCS'] },
    (a: SourceArticle) => { (a.metadata as unknown as Record<string, unknown>).extra = 'unreviewed' },
    (a: SourceArticle) => { a.referenceUrls[0] = 'javascript:alert(1)' },
    (a: SourceArticle) => { a.assets[0].path = 'docs/phase-3/drafts/C01/unknown.svg' },
    (a: SourceArticle) => { a.assets[0].alt = 'wrong alt' },
    (a: SourceArticle) => { delete (a.dossiers as Partial<SourceArticle['dossiers']>).REFERENCES },
  ]
  for (const mutate of mutations) { const m = clone(manifest); mutate(m.articles[0]); assert.throws(() => validateManifest(m, repositoryRoot)) }
})
test('path traversal, encoded paths, absolute paths, backslashes, symlinks and missing files are rejected', () => {
  for (const path of ['../ARTICLE.md', '/etc/passwd', 'docs/../PRODUCT.md', 'docs/%2e%2e/PRODUCT.md', 'C:\\secret', 'docs//x', 'docs/phase-3/missing.md']) assert.throws(() => safeFile(repositoryRoot, path))
  const x = fixture()
  try { symlinkSync(resolve(repositoryRoot, 'PRODUCT.md'), join(x.root, 'link.md')); assert.throws(() => safeFile(x.root, 'link.md'), /symlink/) } finally { x.close() }
})
test('source/asset/dossier/metadata changes invalidate old hashes, without changing accepted sources', () => {
  for (const part of ['source', 'asset', 'dossier', 'metadata', 'local-link', 'active-svg']) {
    const x = fixture()
    try {
      const a = x.data.articles[0]
      if (part === 'metadata') a.metadata.keywords.push('new metadata')
      else {
        const path = part === 'asset' || part === 'active-svg' ? a.assets[0].path : part === 'dossier' ? a.dossiers.REFERENCES.path : a.source.path
        let bytes = readFileSync(join(x.root, path), 'utf8') + '\nChanged'
        if (part === 'local-link') bytes += '\n[bad](../../secret.md)'
        if (part === 'active-svg') bytes = bytes.replace('</svg>', '<script>alert(1)</script></svg>')
        write(x.root, path, bytes)
      }
      assert.throws(() => validateManifest(x.data, x.root))
      if (part === 'local-link' || part === 'active-svg') assert.throws(() => generateManifest(x.root, BASE))
    } finally { x.close() }
  }
})
test('PUB01: real PublicView is empty, legacy public empty, and all three withheld statuses stay excluded', () => {
  assert.deepEqual(selectSourceView(manifest, repositoryRoot, { kind: 'public' }), { kind: 'public', articles: [] })
  assert.deepEqual(selectContent(catalogue, false), emptyCatalogue)
  assert.equal(selectContent(catalogue, true).articles.length, 4)
  for (const status of ['draft', 'in_review', 'approved'] as const) {
    const m = clone(manifest); m.articles[0].status = status
    assert.equal(selectSourceView(m, repositoryRoot, { kind: 'public' }).articles.length, 0)
  }
})
test('PreviewView contract only accepts literal 127.0.0.1; no query or host alias grants access', () => {
  const view = selectSourceView(manifest, repositoryRoot, { kind: 'preview', host: '127.0.0.1' })
  assert.equal(view.kind, 'preview')
  for (const host of ['0.0.0.0', 'localhost', '::1', '127.0.0.1.example.test', '127.0.0.1?preview=true']) assert.throws(() => selectSourceView(manifest, repositoryRoot, { kind: 'preview', host }), /literal loopback/)
})
test('PUB02: synthetic approved release is selected only with every matching proof and asset right', () => {
  const x = fixture()
  try {
    publish(x.root, x.data)
    const view = selectSourceView(x.data, x.root, { kind: 'public' }) as PublicView
    assert.equal(view.articles.length, 1)
    assert.deepEqual(view.articles[0].metadata.relatedArticleIds, [])
    assert.deepEqual(view.articles[0].metadata.topicIds, [])
    assert(!('dossiers' in view.articles[0] || 'publication' in view.articles[0]))
  } finally { x.close() }
})
test('PUB02/PUB07: missing reviews, wrong revision/hash/scope/proof/date/rights all fail closed', () => {
  const cases: ((a: SourceArticle) => void)[] = [
    a => { a.publication = null }, a => { a.publishedAt = null },
    a => { a.publication!.expertReview = null as unknown as ReviewRecord },
    a => { a.publication!.learnerReview.contentHash = 'f'.repeat(64) },
    a => { a.publication!.editorialApproval.revision = 'stale-r1' },
    a => { a.publication!.publicationAuthorization.revisionHash = 'f'.repeat(64) },
    a => { a.publication!.readerQA.subjectId = 'KGNT-C31' },
    a => { a.publication!.expertReview.evidence.sha256 = 'f'.repeat(64) },
    a => { a.publication!.expertReview.evidence.path = '../escape.json' },
    a => { a.assets[0].rights = null },
    a => { a.assets[0].rights!.contentHash = 'f'.repeat(64) },
    a => { a.assets[0].rights!.revision = 'old' },
    a => { a.publication!.expertReview.by = '' },
    a => { a.publishedAt = '2026-02-30T00:00:00Z' },
    a => { a.publishedAt = '2099-01-01T00:00:00Z' },
    a => { a.publication!.expertReview.at = '2026-01-03T00:00:00Z' },
  ]
  for (const mutate of cases) {
    const x = fixture()
    try { publish(x.root, x.data); mutate(x.data.articles[0]); assert.throws(() => selectSourceView(x.data, x.root, { kind: 'public' })) } finally { x.close() }
  }
})
test('PUB02: changing proof bytes or a correctly rehashed contradictory proof is rejected', () => {
  for (const rehash of [false, true]) {
    const x = fixture()
    try {
      publish(x.root, x.data); const r = x.data.articles[0].publication!.expertReview
      const bytes = JSON.stringify({ kind: 'wrong', by: 'not the recorded reviewer' })
      write(x.root, r.evidence.path, bytes); if (rehash) r.evidence.sha256 = sha256(bytes)
      assert.throws(() => validateManifest(x.data, x.root))
    } finally { x.close() }
  }
})
test('PUB03: topic/related/stage/homepage placements use one eligible set and reject unknown IDs', () => {
  const x = fixture()
  try {
    publish(x.root, x.data)
    assert.deepEqual(resolveArticleLinks(x.data, x.root, ['KGNT-C31', 'KGNT-C30']), ['KGNT-C30'])
    assert.throws(() => resolveArticleLinks(x.data, x.root, ['KGNT-C99']), /unknown placement/)
  } finally { x.close() }
})
test('legacy catalogue rejects old approval-only, stale payloads, missing topic proof and invalid links', () => {
  const x = fixture()
  try {
    const sample = legacyArticle()
    assert.throws(() => selectContent({ articles: [{ ...sample, status: 'published', approval: { by: 'TEST ONLY', at: '2026-01-01', revision: 'r1' }, publishedAt: '2026-01-02' }], topics: [] }, false, x.root))
    const approved = publishLegacy(x.root, sample)
    const draft = { ...legacyArticle(), slug: 'synthetic-draft' }
    const topic = publishLegacy(x.root, { slug: 'synthetic-topic', title: 'Synthetic topic', description: 'Synthetic description', status: 'draft', articleSlugs: [approved.slug, draft.slug] } as Topic)
    const selected = selectContent({ articles: [approved, draft], topics: [topic] }, false, x.root)
    assert.equal(selected.articles.length, 1); assert.deepEqual(selected.topics[0].articleSlugs, [approved.slug])
    assert.throws(() => selectContent({ articles: [{ ...approved, title: 'changed' }], topics: [] }, false, x.root), /hash mismatch/)
    assert.throws(() => selectContent({ articles: [approved], topics: [{ ...topic, publication: undefined }] }, false, x.root))
    assert.throws(() => selectContent({ articles: [draft], topics: [{ ...topic, status: 'draft', articleSlugs: ['unknown'] }] }, false, x.root), /invalid topic/)
  } finally { x.close() }
})
test('PUB04/PUB05: scanner catches real article prose, revision, renamed SVG bytes, raw JSON/MD/map and fixtures', () => {
  const b = createBoundary(repositoryRoot, manifest, catalogue), a = manifest.articles[0]
  for (const [bytes, name] of [
    [Buffer.from(a.revision), 'leak.js'],
    [readFileSync(safeFile(repositoryRoot, a.source.path)), 'renamed.js'],
    [readFileSync(safeFile(repositoryRoot, a.assets[0].path)), 'renamed.svg'],
    [Buffer.from('{}'), 'catalogue.json'], [Buffer.from('text'), 'notes.md'], [Buffer.from('{}'), 'app.js.map'],
    [Buffer.from(FIXTURE_SENTINEL + 'FAKE_APPROVAL'), 'fixture.js'],
    [Buffer.from('safe'), a.slug + '.js'],
  ] as [Buffer, string][]) assert.throws(() => assertArtifact(bytes, name, b))
  assert.doesNotThrow(() => assertArtifact(Buffer.from('console.log("clean build")'), 'app.js', b))
})
test('PUB04: scanner detects JSON/JS/HTML escaped text and gzip/brotli artifacts', () => {
  const b = createBoundary(repositoryRoot, manifest, catalogue), marker = manifest.articles[0].revision
  const escaped = [...marker].map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).join('')
  const html = [...marker].map(c => '&#' + c.charCodeAt(0) + ';').join('')
  for (const bytes of [Buffer.from(escaped), Buffer.from(html)]) assert.throws(() => assertArtifact(bytes, 'chunk.js', b))
  assert.throws(() => assertArtifact(Buffer.from(encodeURIComponent(manifest.articles[0].metadata.title)), 'inline.js', b))
  assert.throws(() => assertArtifact(Buffer.from(readFileSync(safeFile(repositoryRoot, manifest.articles[0].assets[0].path)).toString('base64')), 'inline.js', b))
  assert.throws(() => assertArtifact(gzipSync(marker), 'app.js.gz', b))
  assert.throws(() => assertArtifact(brotliCompressSync(Buffer.from(marker)), 'app.js.br', b))
})
test('PUB05/PUB08: full-tree scan rejects a stale preview asset, symlink, and unapproved raster', () => {
  const out = mkdtempSync(join(tmpdir(), 'kgnt-f0-artifact-'))
  try {
    write(out, 'index.html', '<html><body>Empty public catalogue</body></html>')
    assert.equal(scanProduction(repositoryRoot, out, manifest, catalogue).files, 1)
    const bad = join(out, 'nested/leak.svg')
    write(out, 'nested/leak.svg', readFileSync(safeFile(repositoryRoot, manifest.articles[0].assets[0].path)))
    assert.throws(() => scanProduction(repositoryRoot, out, manifest, catalogue))
    rmSync(bad)
    write(out, 'unknown.png', Buffer.from([137, 80, 78, 71, 0, 0]))
    assert.throws(() => scanProduction(repositoryRoot, out, manifest, catalogue), /unapproved static/)
    rmSync(join(out, 'unknown.png'))
    symlinkSync(resolve(repositoryRoot, 'PRODUCT.md'), join(out, 'link.txt'))
    assert.throws(() => scanProduction(repositoryRoot, out, manifest, catalogue), /symlink/)
  } finally { rmSync(out, { recursive: true, force: true }) }
})
test('DATA02 final: accepted source bytes and all 29 publication statuses remain unchanged', () => {
  const current = loadManifest(repositoryRoot)
  assert.equal(canonical(current), canonical(manifest))
  for (const a of current.articles) { assert.equal(a.status, 'draft'); assert.equal(a.publication, null); assert(a.assets.every(x => x.rights === null)) }
})

test('PUB05/PUB06/PUB08: actual Vite hooks serialize only the public catalogue and reject contaminated bundles/output', () => {
  const out = mkdtempSync(join(tmpdir(), 'kgnt-f0-hooks-'))
  const hooks = editorial() as unknown as {
    configResolved(config: unknown): void
    buildStart(this: { addWatchFile(path: string): void }): void
    load(this: { addWatchFile(path: string): void }, id: string): string
    generateBundle(options: unknown, bundle: Record<string, { type: 'chunk'; code: string } | { type: 'asset'; source: Buffer }>): void
    writeBundle(): void
  }
  try {
    const context = { addWatchFile(_path: string) {} }
    hooks.configResolved({ command: 'build', root: out, build: { outDir: '.', sourcemap: false } })
    hooks.buildStart.call(context)
    assert.equal(hooks.load.call(context, '\0virtual:editorial'), 'export default {"articles":[],"topics":[]}')
    assert.throws(() => hooks.configResolved({ command: 'build', root: out, build: { outDir: '.', sourcemap: true } }), /source maps/)
    hooks.generateBundle({}, { 'clean.js': { type: 'chunk', code: 'export const clean = true' } })
    assert.throws(() => hooks.generateBundle({}, { 'hidden.js': { type: 'chunk', code: manifest.articles[0].revision } }))
    assert.throws(() => hooks.generateBundle({}, { 'renamed.svg': { type: 'asset', source: readFileSync(safeFile(repositoryRoot, manifest.articles[0].assets[0].path)) } }))
    write(out, 'index.html', '<html>Clean public site</html>')
    hooks.writeBundle()
    write(out, 'stale/preview.md', readFileSync(safeFile(repositoryRoot, manifest.articles[0].source.path)))
    assert.throws(() => hooks.writeBundle())
    rmSync(join(out, 'stale'), { recursive: true })
    hooks.writeBundle()
  } finally { rmSync(out, { recursive: true, force: true }) }
})

test('PUB07: rehashing changed source/dossier/asset/metadata cannot reuse an old release approval', () => {
  for (const changed of ['source', 'dossier', 'asset', 'metadata']) {
    const x = fixture()
    try {
      publish(x.root, x.data)
      const a = x.data.articles[0], oldRevisionHash = a.revisionHash
      if (changed === 'metadata') a.metadata.keywords.push('new keyword')
      else {
        const ref = changed === 'source' ? a.source : changed === 'dossier' ? a.dossiers.REFERENCES : a.assets[0]
        const original = readFileSync(join(x.root, ref.path), 'utf8')
        const bytes = changed === 'source' ? original + '\n\nAdditional synthetic source bytes.' : original.replace('Synthetic', 'Updated')
        write(x.root, ref.path, bytes)
        ref.sha256 = sha256(bytes)
        if (changed === 'source') a.contentHash = ref.sha256
        if (changed === 'asset') a.assets[0].revision = ref.sha256
      }
      a.revisionHash = revisionHash(a)
      assert.notEqual(a.revisionHash, oldRevisionHash)
      assert.throws(() => validateManifest(x.data, x.root))
    } finally { x.close() }
  }
})
test('PUB04: a shared legacy slug is not blacklisted forever after a source revision has valid publication evidence', () => {
  const x = fixture()
  try {
    publish(x.root, x.data)
    const a = x.data.articles[0], old = legacyArticle()
    old.slug = a.slug; old.title = a.metadata.title
    old.sections[0].paragraphs = ['Old withheld legacy wording that is not part of the newly approved synthetic source.']
    const boundary = createBoundary(x.root, x.data, { articles: [old], topics: [] })
    assert.doesNotThrow(() => assertArtifact(Buffer.from(a.slug), 'approved-link.js', boundary))
    assert.throws(() => assertArtifact(Buffer.from(old.sections[0].paragraphs[0]), 'old-prose.js', boundary))
  } finally { x.close() }
})

test('PUB04/PUB05: copying a draft fragment or metadata into public/ does not turn it into an allowed asset', () => {
  const x = fixture()
  try {
    write(x.root, 'prototype/public/leak.json', JSON.stringify({ id: x.data.articles[0].id }))
    write(x.root, 'prototype/public/leak.txt', FIXTURE_SENTINEL + 'LEAKED_FRAGMENT')
    write(x.root, 'prototype/public/renamed.svg', readFileSync(join(x.root, x.data.articles[0].assets[0].path), 'utf8') + '\n')
    const boundary = createBoundary(x.root, x.data, emptyCatalogue)
    for (const path of ['leak.json', 'leak.txt', 'renamed.svg']) assert.throws(() => assertArtifact(readFileSync(join(x.root, 'prototype/public', path)), path, boundary))
  } finally { x.close() }
})
