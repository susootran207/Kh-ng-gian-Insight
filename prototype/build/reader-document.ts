import { fromMarkdown } from 'mdast-util-from-markdown'
import { gfm } from 'micromark-extension-gfm'
import { gfmFromMarkdown } from 'mdast-util-gfm'
import type { Root, Nodes } from 'mdast'
import { assertSafeSvg, readReference, requireThat, sha256 } from './content-contract.ts'
import type { FileReference } from '../editorial/source-contract.ts'
import { plainText, safeAssetSource, safeLink } from '../src/reading/markdown/model.ts'
import type { FigureGroup, ReaderAsset, ReaderDocument, ReaderNode } from '../src/reading/markdown/model.ts'

const supported = new Set(['root', 'heading', 'paragraph', 'text', 'strong', 'emphasis', 'delete', 'break', 'link', 'linkReference', 'definition', 'image', 'imageReference', 'blockquote', 'list', 'listItem', 'table', 'tableRow', 'tableCell', 'inlineCode', 'code', 'thematicBreak'])
export function loadReaderAsset(root: string, file: FileReference, key: string, src: string): ReaderAsset {
  requireThat(/^[a-z0-9]+(?:-[a-z0-9]+)*\.svg$/.test(key), 'invalid reader asset key')
  const svg = readReference(root, file).toString('utf8')
  assertSafeSvg(svg)
  const viewBox = svg.match(/\bviewBox="([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)"/)
  requireThat(viewBox && +viewBox[3] > 0 && +viewBox[4] > 0, 'reader SVG needs a valid viewBox')
  return { key, src: safeAssetSource(src), sha256: file.sha256, width: +viewBox[3], height: +viewBox[4] }
}
export function parseGfm(source: string): Root {
  return fromMarkdown(source, { extensions: [gfm()], mdastExtensions: [gfmFromMarkdown()] })
}
export interface ReaderCompileOptions {
  titleInHeader?: boolean
  localLinks?: { source: string; target: string }[]
}
export function compileReaderDocument(source: string, assets: ReaderAsset[], options: ReaderCompileOptions = {}): ReaderDocument {
  const localLinks = options.localLinks ?? []
  requireThat(new Set(localLinks.map(l => l.source)).size === localLinks.length, 'duplicate local link mapping')
  localLinks.forEach(l => requireThat(/^[A-Z-]+\.md$/.test(l.source) && /^#provenance-[a-z-]+$/.test(l.target), 'invalid provenance link mapping'))
  requireThat(new Set(assets.map(a => a.key)).size === assets.length, 'duplicate reader asset key')
  assets.forEach(a => { safeAssetSource(a.src); requireThat(/^[a-f0-9]{64}$/.test(a.sha256) && a.width > 0 && a.height > 0, 'invalid reader asset') })
  const ast = parseGfm(source), trace: ReaderDocument['trace'] = [], toc: ReaderDocument['toc'] = []
  const used = new Set(['reading-main', 'reader-figure-dialog-title', ...localLinks.map(l => l.target.slice(1))])
  const titleInput = options.titleInHeader ? ast.children[0] : undefined
  if (options.titleInHeader) requireThat(titleInput?.type === 'heading' && titleInput.depth === 1, 'source must start with H1')
  function convert(input: Nodes | Root): ReaderNode {
    requireThat(supported.has(input.type), 'unsupported/unsafe GFM node: ' + input.type)
    const p = input.position
    requireThat(p && Number.isInteger(p.start.offset) && Number.isInteger(p.end.offset), 'missing GFM source position')
    const range = { start: p.start.offset!, end: p.end.offset!, line: p.start.line, column: p.start.column }
    const id = 'source-' + input.type + '-' + range.start + '-' + range.end
    const node: ReaderNode = { id, type: input.type, range }
    if ('value' in input) node.value = input.value
    if ('children' in input) node.children = input.children.map(child => convert(child))
    for (const key of ['depth', 'url', 'title', 'alt', 'identifier', 'ordered', 'start', 'checked', 'lang', 'align'] as const) {
      if (key in input) Object.assign(node, { [key]: input[key as keyof typeof input] })
    }
    trace.push({ id, type: input.type, range, rawHash: sha256(source.slice(range.start, range.end)), ...('value' in input ? { value: input.value } : {}) })
    if (input.type === 'heading') {
      requireThat((input === titleInput && input.depth === 1) || input.depth === 2 || input.depth === 3, 'reader body headings must be h2/h3')
      const text = plainText(node)
      const base = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'muc'
      let anchor = base, suffix = 2
      while (used.has(anchor)) anchor = base + '-' + suffix++
      used.add(anchor); node.anchor = anchor
      if (input.depth !== 1) toc.push({ id: anchor, depth: input.depth, title: text })
    }
    return node
  }
  const root = convert(ast), definitions = new Map<string, ReaderNode>()
  const nodes: ReaderNode[] = []
  function walk(node: ReaderNode) { nodes.push(node); (node.children ?? []).forEach(walk) }
  walk(root)
  for (const node of nodes.filter(n => n.type === 'definition')) {
    requireThat(node.identifier && !definitions.has(node.identifier), 'duplicate reference definition')
    definitions.set(node.identifier, node)
  }
  const anchors = toc.map(t => t.id)
  for (const node of nodes) {
    if (node.type === 'linkReference' || node.type === 'imageReference') {
      const definition = definitions.get(node.identifier ?? '')
      requireThat(definition, 'unresolved Markdown reference')
      node.url = definition.url; node.title = definition.title
    }
    if (node.type === 'link' || node.type === 'linkReference' || node.type === 'definition') {
      // A definition used exclusively by an image may use the allowlisted asset key.
      const imageDefinition = node.type === 'definition' && nodes.some(n => n.type === 'imageReference' && n.identifier === node.identifier)
      if (imageDefinition) requireThat(assets.some(a => a.key === node.url), 'unknown image definition')
      else if (!localLinks.some(l => l.source === node.url)) safeLink(node.url!, anchors)
    }
    if (node.type === 'image' || node.type === 'imageReference') {
      requireThat(node.alt?.trim() && assets.some(a => a.key === node.url), 'missing alt or unlisted reader asset')
    }
  }
  const figures: FigureGroup[] = [], children = root.children ?? []
  for (let i = 0; i < children.length; i++) {
    const paragraph = children[i], image = paragraph.type === 'paragraph' && paragraph.children?.length === 1 ? paragraph.children[0] : undefined
    if (image && ['image', 'imageReference'].includes(image.type)) {
      const caption = children[i + 1], description = children[i + 2]
      requireThat(caption?.type === 'paragraph' && caption.children?.length === 1 && caption.children[0].type === 'emphasis', 'figure requires an italic caption paragraph')
      requireThat(description?.type === 'paragraph' && description.children?.[0]?.type === 'strong' && plainText(description).startsWith('Mô tả tương đương bằng chữ:'), 'figure requires an equivalent text description')
      figures.push({ paragraph: paragraph.id, image: image.id, caption: caption.id, description: description.id })
    }
  }
  requireThat(nodes.filter(n => ['image', 'imageReference'].includes(n.type)).every(n => figures.some(f => f.image === n.id)), 'images must be standalone figures with caption/description')
  requireThat(new Set(trace.map(t => t.id)).size === trace.length, 'ambiguous source node IDs')
  return { format: 'gfm-mdast-v1', offsetEncoding: 'utf16', sourceHash: sha256(source), root, toc, assets, figures, trace, ...(titleInput ? { titleNodeId: root.children![0].id } : {}), ...(localLinks.length ? { localLinks } : {}) }
}
