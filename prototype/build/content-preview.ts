// Server-side adapter only. No production entry imports this module.
import { basename } from 'node:path'
import type { SourceMetadata, FileReference } from '../editorial/source-contract.ts'
import type { LibraryArticle } from '../src/reading/Router.tsx'
import type { ReaderDocument } from '../src/reading/markdown/model.ts'
import { plainText } from '../src/reading/markdown/model.ts'
import { loadManifest, selectSourceView, readReference, requireThat } from './content-contract.ts'
import { compileReaderDocument, loadReaderAsset, parseGfm } from './reader-document.ts'

export interface PreviewArticle {
  id: string; slug: string; revision: string; contentHash: string; revisionHash: string
  source: FileReference; metadata: SourceMetadata; card: LibraryArticle; document: ReaderDocument
  dossiers: { name: string; anchor: string; file: FileReference }[]
}
export interface ContentPreview { kind: 'preview'; host: '127.0.0.1'; articles: PreviewArticle[] }
export function createContentPreview(root: string, host: string): ContentPreview {
  const view = selectSourceView(loadManifest(root), root, { kind: 'preview', host })
  requireThat(view.kind === 'preview', 'F0 must select PreviewView')
  const articles = view.articles.map(a => {
    const source = readReference(root, a.source).toString('utf8')
    const dossiers = Object.entries(a.dossiers).map(([name, file]) => ({ name, file, anchor: 'provenance-' + name.toLowerCase() }))
    const assets = a.assets.map(asset => loadReaderAsset(root, asset, basename(asset.path), previewAssetUrl(a.id, asset.sha256, basename(asset.path))))
    const document = compileReaderDocument(source, assets, { titleInHeader: true, localLinks: dossiers.map(d => ({ source: basename(d.file.path), target: '#' + d.anchor })) })
    requireThat(document.sourceHash === a.contentHash, a.id + ': source hash differs from F0')
    requireThat(plainText(document.root.children![0]) === a.metadata.title, a.id + ': H1 differs from manifest')
    requireThat(document.assets.length === document.figures.length && document.assets.every(asset => document.figures.some(f => {
      const paragraph = document.root.children!.find(n => n.id === f.paragraph)
      const image = paragraph?.children?.[0]
      return image?.url === asset.key && a.assets.some(original => original.sha256 === asset.sha256 && original.alt === image.alt)
    })), a.id + ': manifest figure mismatch')
    // An exact source paragraph, never an authored summary or a legacy sample excerpt.
    const intro = document.root.children!.find(n => n.type === 'paragraph')
    requireThat(intro, a.id + ': missing introductory paragraph')
    const words = source.trim().split(/\s+/).length
    const card: LibraryArticle = { slug: a.slug, title: a.metadata.title, description: plainText(intro), topic: a.metadata.topic, season: a.metadata.season, keywords: a.metadata.keywords, status: a.status, revision: a.revision, readingMinutes: Math.max(1, Math.ceil(words / 200)) }
    return { id: a.id, slug: a.slug, revision: a.revision, contentHash: a.contentHash, revisionHash: a.revisionHash, source: a.source, metadata: a.metadata, card, document, dossiers }
  })
  return { kind: 'preview', host: '127.0.0.1', articles }
}
export function previewAssetUrl(id: string, hash: string, key: string): string {
  requireThat(/^KGNT-[CE]\d{2}$/.test(id) && /^[a-f0-9]{64}$/.test(hash) && /^[a-z0-9-]+\.svg$/.test(key), 'invalid preview asset identity')
  return '/__c1_assets/' + id.toLowerCase() + '/' + hash + '/' + key
}
// Independent source count used by tests/audit; no slicing of H1/notice/dossier links.
export function sourceNodeCount(source: string): number {
  function count(node: ReturnType<typeof parseGfm> | { children?: unknown[] }): number { return 1 + (node.children ?? []).reduce<number>((sum, child) => sum + count(child as typeof node), 0) }
  return count(parseGfm(source))
}
