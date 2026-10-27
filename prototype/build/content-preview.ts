// Server-side adapter only. No production entry imports this module.
import { loadManifest, selectSourceView, requireThat } from './content-contract.ts'
import { parseGfm } from './reader-document.ts'
import { compileSourceArticles } from './source-reader.ts'

import type { PreviewArticle } from './source-reader.ts'
export type { PreviewArticle } from './source-reader.ts'
export interface ContentPreview { kind: 'preview'; host: '127.0.0.1'; articles: PreviewArticle[] }
export function createContentPreview(root: string, host: string): ContentPreview {
  const view = selectSourceView(loadManifest(root), root, { kind: 'preview', host })
  requireThat(view.kind === 'preview', 'F0 must select PreviewView')
  const articles = compileSourceArticles(root, view.articles, previewAssetUrl)
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
