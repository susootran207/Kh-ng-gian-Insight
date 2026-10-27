// Build-side only: eligibility is decided by F0 before any Reader payload is made.
import { basename } from 'node:path'
import type { Article, Catalogue } from '../editorial/schema.ts'
import type { PublicView, SourceManifest } from '../editorial/source-contract.ts'
import { loadManifest, readReference, selectSourceView } from './content-contract.ts'
import { compileSourceArticles } from './source-reader.ts'
import { selectContent } from './select-content.ts'

export function publicAssetUrl(_id: string, hash: string, key: string) {
  return '/assets/articles/' + hash + '/' + key
}
export function createPublicLibrary(root: string, legacy: Catalogue, manifest: SourceManifest = loadManifest(root), now = Date.now()) {
  const view = selectSourceView(manifest, root, { kind: 'public' }, now) as PublicView
  const descriptors = new Map(view.articles.map(a => [a.id, a]))
  const selected = manifest.articles.filter(a => descriptors.has(a.id))
  const compiled = compileSourceArticles(root, selected, publicAssetUrl)
  const articles: Article[] = compiled.map(a => {
    const descriptor = descriptors.get(a.id)!
    // Internal dossier bytes/paths/proof and build trace never cross this boundary.
    // Local source links retain their label and point to an explanatory Reader note.
    const document = structuredClone(a.document)
    document.trace = []
    document.localLinks = document.localLinks?.map(l => ({source:l.source,target:'#publication-information'}))
    return { ...a.card, id:a.id, collection:a.metadata.collection, status:'published',
      updated:manifest.articles.find(s => s.id === a.id)!.publishedAt!.slice(0,10),
      sections:[], sources:[], document,
      relatedSlugs:descriptor.metadata.relatedArticleIds.flatMap(id => descriptors.has(id) ? [descriptors.get(id)!.slug] : []),
    }
  })
  // A legacy sample with the same slug never substitutes for a withheld ARTICLE.
  const reserved = new Set(manifest.articles.map(a => a.slug))
  const old = selectContent(legacy, false, root, now)
  const catalogue: Catalogue = { articles:[...articles,...old.articles.filter(a => !reserved.has(a.slug))], topics:[] }
  const assets = selected.flatMap(a => a.assets.map(asset => ({url:publicAssetUrl(a.id,asset.sha256,basename(asset.path)),bytes:readReference(root,asset)})))
  return { catalogue, assets }
}
