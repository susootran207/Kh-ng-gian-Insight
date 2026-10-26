// Shared build-side compiler. Callers must select the F0 view before invoking it.
import { basename } from 'node:path'
import type { SourceArticle, SourceMetadata, FileReference } from '../editorial/source-contract.ts'
import type { LibraryArticle } from '../src/reading/Router.tsx'
import type { ReaderDocument } from '../src/reading/markdown/model.ts'
import { plainText } from '../src/reading/markdown/model.ts'
import { readReference, requireThat } from './content-contract.ts'
import { compileReaderDocument, loadReaderAsset } from './reader-document.ts'

export interface PreviewArticle {
  id: string; slug: string; revision: string; contentHash: string; revisionHash: string
  source: FileReference; metadata: SourceMetadata; card: LibraryArticle; document: ReaderDocument
  dossiers: { name: string; anchor: string; file: FileReference }[]
}
export function compileSourceArticles(root: string, selected: SourceArticle[], assetUrl: (id: string, hash: string, key: string) => string): PreviewArticle[] {
  return selected.map(a => {
    const source = readReference(root, a.source).toString('utf8')
    const dossiers = Object.entries(a.dossiers).map(([name, file]) => ({ name, file, anchor: 'provenance-' + name.toLowerCase() }))
    const assets = a.assets.map(asset => loadReaderAsset(root, asset, basename(asset.path), assetUrl(a.id, asset.sha256, basename(asset.path))))
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
}
