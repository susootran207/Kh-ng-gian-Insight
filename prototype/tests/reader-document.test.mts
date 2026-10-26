import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { compileReaderDocument, loadReaderAsset, parseGfm } from '../build/reader-document.ts'
import { sha256, loadManifest, selectSourceView } from '../build/content-contract.ts'
import { repositoryRoot, editorial } from '../build/editorial.ts'
import { assertArtifact, createBoundary } from '../build/publication-scan.ts'
import { plainText, safeLink, safeAssetSource, type ReaderNode } from '../src/reading/markdown/model.ts'
import type { Catalogue } from '../editorial/schema.ts'

const root = fileURLToPath(new URL('../', import.meta.url)), fixturePath = new URL('./fixtures/reader/article.md', import.meta.url)
const source = readFileSync(fixturePath, 'utf8'), path = 'tests/fixtures/reader/reader-long-figure.svg'
const bytes = readFileSync(new URL('./fixtures/reader/reader-long-figure.svg', import.meta.url))
const asset = loadReaderAsset(root, { path, sha256: sha256(bytes) }, 'reader-long-figure.svg', '/__r1_assets/reader-long-figure.svg')
const doc = compileReaderDocument(source, [asset])
function nodes(node: ReaderNode): ReaderNode[] { return [node, ...(node.children ?? []).flatMap(nodes)] }

test('READ01: standard GFM AST has stable Vietnamese/duplicate anchors, nested h3 and long DOI links', () => {
  assert.equal(doc.format, 'gfm-mdast-v1')
  assert.equal(doc.offsetEncoding, 'utf16')
  assert.equal(doc.toc[0].id, 'mot-khoang-dung-de-doc')
  assert(doc.toc.some(h => h.id === 'mot-khoang-dung-de-doc-2'))
  assert(doc.toc.some(h => h.depth === 3))
  assert.deepEqual(doc, compileReaderDocument(source, [asset]))
  assert(nodes(doc.root).some(n => n.type === 'link' && n.url!.includes('#reader-layout-fixture-')))
})
test('DATA03: every parsed node has exact source range/hash and semantic receipts; none silently dropped', () => {
  const ast = parseGfm(source)
  function count(n: { children?: unknown[] }): number { return 1 + (n.children ?? []).reduce<number>((sum, child) => sum + count(child as { children?: unknown[] }), 0) }
  assert.equal(doc.trace.length, count(ast))
  assert.equal(doc.trace.length, nodes(doc.root).length)
  assert.equal(new Set(doc.trace.map(t => t.id)).size, doc.trace.length)
  assert.equal(doc.sourceHash, sha256(source))
  for (const trace of doc.trace) assert.equal(trace.rawHash, sha256(source.slice(trace.range.start, trace.range.end)))
  const values = doc.trace.filter(t => t.value !== undefined).map(t => t.value)
  assert(values.includes('Câu 1:'))
  assert(values.some(v => v?.includes('F0_FIXTURE_ONLY_R1_READER')))
})
test('READ02/READ05/READ06: lists/blockquote/table/APA/emphasis and full activity/feedback remain', () => {
  const all = nodes(doc.root)
  for (const type of ['list', 'listItem', 'blockquote', 'table', 'tableRow', 'tableCell', 'emphasis', 'strong', 'delete', 'inlineCode', 'code', 'thematicBreak', 'linkReference', 'definition', 'break']) assert(all.some(n => n.type === type), type)
  for (const text of ['1. Nhớ:', '2. Hiểu:', '3. Vận dụng:', 'Câu 1:', 'Câu 2:', 'Câu 3:', 'Krathwohl, D. R.', '212–218']) assert(plainText(doc.root).includes(text))
  assert(all.some(n => n.type === 'listItem' && n.checked === true))
})
test('READ03/READ04: image groups exact caption and equivalent text; SVG is pinned', () => {
  assert.equal(doc.figures.length, 1)
  const group = doc.figures[0], all = nodes(doc.root)
  for (const id of Object.values(group)) assert(all.some(n => n.id === id))
  assert(plainText(all.find(n => n.id === group.caption)!).includes('Hình giả lập'))
  assert(plainText(all.find(n => n.id === group.description)!).startsWith('Mô tả tương đương bằng chữ:'))
  assert.equal(asset.sha256, sha256(bytes)); assert(asset.height > asset.width * 3)
})
test('SAFE01: raw HTML/MDX and JavaScript/data/protocol-relative/credential URLs fail closed', () => {
  for (const body of [
    '<script>globalThis.bad = true</script>', '<img src=x onerror=alert(1)>', '<Component value="unsafe" />',
    '[bad](javascript:alert(1))', '[bad](java&#x73;cript:alert(1))', '[bad](data:text/html,unsafe)',
    '[bad](//example.org/)', '[bad](http://example.org/)', '[bad](https://user:password@example.org/)',
  ]) assert.throws(() => compileReaderDocument('## Safe\n\n' + body, []), body)
})
test('SAFE01: code stays inert text; unsupported GFM nodes/headings reject explicitly', () => {
  const inert = compileReaderDocument('## Safe\n\n{notExecuted}.\n\n~~~html\n<script>never()</script>\n~~~\n', [])
  assert(nodes(inert.root).some(n => n.type === 'code' && n.value!.includes('<script>')))
  assert(nodes(doc.root).some(n => n.type === 'inlineCode' && n.value!.includes('<script>')))
  assert.throws(() => compileReaderDocument('# Title not a body h2\n', []), /h2\/h3/)
  assert.throws(() => compileReaderDocument('## Footnote\n\nText[^x].\n\n[^x]: Not supported yet.\n', []), /unsupported/)
})
test('SAFE01: traversal/remote/unlisted images, missing alt/caption and inline images reject', () => {
  for (const target of ['../reader-long-figure.svg', '/reader-long-figure.svg', 'https://example.org/figure.svg', 'reader-long-figure.svg?query=true', '%2e%2e/reader-long-figure.svg', 'unknown.svg']) assert.throws(() => compileReaderDocument(source.replace('(reader-long-figure.svg)', '(' + target + ')'), [asset]))
  assert.throws(() => compileReaderDocument(source.replace('![Ba vùng chữ minh họa việc đọc dữ kiện, giữ điều chưa biết và chọn bước tiếp trong tình huống giả định.]', '![]'), [asset]))
  assert.throws(() => compileReaderDocument('## A\n\n![Alt](reader-long-figure.svg)\n', [asset]), /caption/)
  assert.throws(() => compileReaderDocument('## A\n\nInline ![Alt](reader-long-figure.svg) example.\n', [asset]), /standalone/)
})
test('SAFE01: SVG active/external content and stale hashes reject using F0', () => {
  const temp = mkdtempSync(join(tmpdir(), 'r1-svg-'))
  try {
    for (const svg of [
      '<svg viewBox="0 0 320 100"><script>alert(1)</script></svg>',
      '<svg viewBox="0 0 320 100" onload="bad()"></svg>',
      '<svg viewBox="0 0 320 100"><image href="https://example.org/image"/></svg>',
      '<svg viewBox="0 0 320 100" style="fill: u' + String.fromCharCode(92) + '72l(https://example.org/x)"/>',
      '<svg viewBox="0 0 320 100" fill="u&#114;l(https://example.org/x)"/>',
      '<!DOCTYPE svg><svg viewBox="0 0 320 100"/>', '<svg viewBox="0 0 320 100"><foreignObject/></svg>',
    ]) {
      writeFileSync(join(temp, 'bad.svg'), svg)
      assert.throws(() => loadReaderAsset(temp, { path: 'bad.svg', sha256: sha256(svg) }, 'bad.svg', '/assets/bad.svg'))
    }
    writeFileSync(join(temp, 'bad.svg'), bytes)
    assert.throws(() => loadReaderAsset(temp, { path: 'bad.svg', sha256: 'f'.repeat(64) }, 'bad.svg', '/assets/bad.svg'))
  } finally { rmSync(temp, { recursive: true, force: true }) }
})
test('READ01/SAFE01: heading anchors/reference definitions resolve, unknown or duplicate references fail', () => {
  assert.equal(safeLink('#mot-khoang-dung-de-doc', doc.toc.map(h => h.id)), '#mot-khoang-dung-de-doc')
  assert.throws(() => compileReaderDocument('## A\n\n[bad](#unknown)\n', []))
  assert.throws(() => compileReaderDocument('## A\n\n[ref][x]\n\n[x]: https://example.org/\n[x]: https://example.com/\n', []), /duplicate/)
  for (const src of ['https://example.org/a.svg', '//example.org/a.svg', '/assets/../a.svg', '/assets/a.svg?x']) assert.throws(() => safeAssetSource(src))
})
test('DATA03: changed source changes provenance; stable heading/source IDs on identical input', () => {
  const changed = compileReaderDocument(source.replace('Minh đang sắp xếp', 'Minh đang chuẩn bị'), [asset])
  assert.notEqual(changed.sourceHash, doc.sourceHash)
  assert.deepEqual(doc.toc, changed.toc)
})
test('PUB04/PUB05: F0 scanner catches compiled fixture/escaped canary/SVG; public remains empty', () => {
  const manifest = loadManifest(repositoryRoot), catalogue: Catalogue = JSON.parse(readFileSync(new URL('../editorial/catalogue.json', import.meta.url), 'utf8'))
  const boundary = createBoundary(repositoryRoot, manifest, catalogue)
  for (const [value, filename] of [[JSON.stringify(doc), 'accidental.js'], [JSON.stringify({ id: '\\u00460_FIXTURE_ONLY_R1_READER' }), 'escaped.js'], [bytes.toString('utf8'), 'renamed.svg']]) assert.throws(() => assertArtifact(Buffer.from(value), filename, boundary))
  assert.equal(selectSourceView(manifest, repositoryRoot, { kind: 'public' }).articles.length, 0)
})
test('PUB05: fixture module IDs are rejected even without a canary in emitted text', () => {
  const hook = editorial().generateBundle as unknown as (options: unknown, bundle: unknown) => void
  for (const module of ['/tests/fixtures/reader/article.md', '/tests/reader-harness/main.tsx', '\0virtual:r1-fixture']) assert.throws(() => hook({}, { 'app.js': { type: 'chunk', code: 'export const empty = true', modules: { [module]: {} } } }), /test-only Reader/)
})
