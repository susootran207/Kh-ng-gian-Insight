// Offsets use UTF-16 code units, as in MDAST; hashes use UTF-8 encoding.
export interface SourceRange { start: number; end: number; line: number; column: number }
export interface ReaderNode {
  id: string
  type: string
  range: SourceRange
  value?: string
  children?: ReaderNode[]
  depth?: number
  anchor?: string
  url?: string
  title?: string | null
  alt?: string | null
  identifier?: string
  ordered?: boolean | null
  start?: number | null
  checked?: boolean | null
  lang?: string | null
  align?: ('left' | 'right' | 'center' | null)[]
}
export interface ReaderAsset {
  key: string
  src: string
  sha256: string
  width: number
  height: number
}
export interface FigureGroup { paragraph: string; image: string; caption: string; description: string }
export interface ReaderDocument {
  format: 'gfm-mdast-v1'
  offsetEncoding: 'utf16'
  sourceHash: string
  titleNodeId?: string
  localLinks?: { source: string; target: string }[]
  root: ReaderNode
  toc: { id: string; depth: number; title: string }[]
  assets: ReaderAsset[]
  figures: FigureGroup[]
  trace: { id: string; type: string; range: SourceRange; rawHash: string; value?: string }[]
}
export function plainText(node: ReaderNode): string {
  return node.value ?? (node.type === 'image' || node.type === 'imageReference' ? node.alt ?? '' : (node.children ?? []).map(plainText).join(''))
}
export function safeLink(url: string, anchors: string[] = []): string {
  if (/^#[a-z0-9-]+$/.test(url) && anchors.includes(url.slice(1))) return url
  if (!/^https:\/\//i.test(url) || /[\x00-\x20\x7f]/.test(url)) throw new Error('Reader: only HTTPS or known heading anchors are allowed')
  const parsed = new URL(url)
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password) throw new Error('Reader: unsafe link')
  return url
}
export function safeAssetSource(src: string): string {
  if (!/^\/(?:[a-z0-9_-]+\/)*[a-z0-9-]+\.svg$/.test(src)) throw new Error('Reader: asset must use an allowlisted local SVG path')
  return src
}
