import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join,resolve} from 'node:path'
import type {SourceManifest,SourceArticle,SourceMetadata,ReviewKind,ReviewRecord} from '../../../editorial/source-contract.ts'
import {DOSSIERS,REVIEW_KINDS,generateManifest,sha256} from '../../../build/content-contract.ts'
const BASE='498fcf656098aaf4338744f8a289200c01eec26a'
function write(root: string, path: string, value: string | Buffer) {
  const target = join(root, path); mkdirSync(resolve(target, '..'), { recursive: true }); writeFileSync(target, value)
}
function syntheticSource(root: string, n: number, related: string[] = []) {
  const id = 'KGNT-C' + n
  const metadata: SourceMetadata = {
    title: 'Synthetic article ' + n, collection: 'core', topic: 'Synthetic topic', season: (['Đầu năm','Giữa học kỳ','Mùa thi','Sau thi'] as const)[n%4],
    keywords: ['synthetic'], audience: ['THCS'], bloom: { remember: 'Identify', understand: 'Explain', apply: 'Apply' },
    topicIds: ['T99'], relatedArticleIds: related,
  }
  const dir = 'docs/phase-3/drafts/C' + n
  write(root, dir + '/ARTICLE.md', '# ' + metadata.title + '\n\n> ' + id + ' c' + n + '-draft-r1\n\n' + 'SYNTHETIC TEST DATA ' + n + ' An entirely synthetic paragraph for contract tests; no accepted article is changed.\n\n![Synthetic alt text for figure ' + n + '](figure-c' + n + '.svg)\n\n*Chú thích hình giả lập.*\n\n**Mô tả tương đương bằng chữ:** Một hình minh họa giả lập.\n\n## Tài liệu tham khảo\n\nSynthetic. (2026). Test reference. https://example.test/reference\n')
  for (const name of DOSSIERS) write(root, dir + '/' + name + '.md', '# Synthetic ' + name + '\n\n' + 'SYNTHETIC TEST DATA ' + 'DOSSIER_' + n + '_' + name + '\n')
  write(root, dir + '/figure-c' + n + '.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 100"><title>Synthetic educational figure ' + n + '</title><desc>Synthetic alt text for figure ' + n + '</desc><text x="5" y="30">Synthetic drawing for article ' + n + '</text></svg>')
  return { id, slug: 'synthetic-' + n, ...metadata }
}
export function createLibraryFixture(count = 29) {
  const root = mkdtempSync(join(tmpdir(), 'kgnt-f0-'))
  const articles = Array.from({length:count},(_,i)=>syntheticSource(root,30+i))
  write(root, 'docs/phase-3/matrix.json', JSON.stringify({ articles, topics: [{ id: 'T99', articleIds: articles.map(a => a.id) }] }))
  write(root, 'prototype/src/reading/homepageContent.ts', 'export const fixture = []')
  mkdirSync(join(root, 'prototype/public'), { recursive: true })
  mkdirSync(join(root,'prototype/editorial'),{recursive:true})
  const data = generateManifest(root, BASE)
  return { root, data, close: () => rmSync(root, { recursive: true, force: true }) }
}
function evidence(root: string, expected: { kind: ReviewKind; subjectId: string; revision: string; contentHash: string; revisionHash: string }): ReviewRecord {
  const body = { ...expected, decision: 'approved' as const, by: 'SYNTHETIC TEST ONLY — no real reviewer', at: '2026-01-01T00:00:00Z' }
  const path = 'docs/phase-3/publication-records/' + expected.subjectId + '-' + expected.kind + '.json'
  const bytes = JSON.stringify(body); write(root, path, bytes)
  return { ...body, evidence: { path, sha256: sha256(bytes) } }
}
export function fixturePublication(root: string, id: string, revision: string, contentHash: string, hash: string) {
  return Object.fromEntries(REVIEW_KINDS.map(kind => [kind, evidence(root, { kind, subjectId: id, revision, contentHash, revisionHash: hash })])) as unknown as SourceArticle['publication']
}
export function publishFixture(root: string, data: SourceManifest, index = 0) {
  const a = data.articles[index]
  a.status = 'published'; a.publishedAt = '2026-01-02T00:00:00Z'
  a.publication = fixturePublication(root, a.id, a.revision, a.contentHash, a.revisionHash)
  for (const asset of a.assets) asset.rights = evidence(root, { kind: 'assetRights', subjectId: asset.id, revision: asset.revision, contentHash: asset.sha256, revisionHash: a.revisionHash })
}
