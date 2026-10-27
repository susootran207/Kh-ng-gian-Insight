import { GardenIllustration } from '../../components/GardenIllustration'
import { ReadingProgress } from './ReadingProgress'
import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb } from '../ReadingShell'
import { Arrow } from '../../components/Icons'
import { plainText, safeAssetSource, safeLink, type ReaderAsset, type ReaderDocument, type ReaderNode } from './model'
import '../../styles/markdown-reader.css'

function assetSource(src: string) {
  const safe = safeAssetSource(src)
  return safe.startsWith('/assets/articles/') ? new URL('.'+safe, new URL(import.meta.env.BASE_URL, window.location.href)).pathname : safe
}
interface FigureView { image: ReaderNode; asset: ReaderAsset; caption: ReaderNode; description: ReaderNode; opener: HTMLButtonElement }
function FigureViewer({ figure, onDismiss }: { figure: FigureView; onDismiss(): void }) {
  const dialog = useRef<HTMLDialogElement>(null), [scale, setScale] = useState(1)
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (!dialog.current?.open) dialog.current?.showModal()
    dialog.current?.querySelector<HTMLButtonElement>('button')?.focus()
    return () => { document.body.style.overflow = previous }
  }, [])
  const close = () => {
    onDismiss()
    requestAnimationFrame(() => { if (figure.opener.isConnected) figure.opener.focus({ preventScroll: true }) })
  }
  return <dialog ref={dialog} className="reader-figure-dialog" aria-labelledby="reader-figure-dialog-title" onClose={close} onKeyDown={event => {
    if (event.key !== 'Tab') return
    const targets = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled),[href],[tabindex="0"]')]
    const first = targets[0], last = targets.at(-1)
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }}>
    <div className="reader-viewer-controls"><h2 id="reader-figure-dialog-title">Xem hình lớn</h2><button className="text-link" onClick={() => dialog.current?.close()}>Đóng hình</button></div>
    <div className="reader-zoom-controls"><button onClick={() => setScale(s => Math.min(3, s + .5))} disabled={scale >= 3}>Phóng to</button><button onClick={() => setScale(s => Math.max(1, s - .5))} disabled={scale <= 1}>Thu nhỏ</button><span role="status">{Math.round(scale * 100)}%</span></div>
    <p className="reader-pan-hint">Có thể dùng phím mũi tên để cuộn hình. Nhấn Escape để đóng.</p>
    <div className="reader-image-viewport" tabIndex={0} role="region" aria-label="Hình phóng lớn, dùng phím mũi tên để cuộn"><img src={assetSource(figure.asset.src)} alt={figure.image.alt!} style={{ width: Math.max(640, figure.asset.width) * scale }} /></div>
    <p className="reader-viewer-caption">{plainText(figure.caption)}</p>
    <p>{plainText(figure.description)}</p>
  </dialog>
}
export function ArticleReader({ document: doc, title, description, publicationLabel, metadata }: { document: ReaderDocument; title: string; description?: string; publicationLabel?: string;metadata?:{topic:string;season:string;readingMinutes:number;illustration?:number} }) {
  const location = useLocation(), [figure, setFigure] = useState<FigureView | null>(null),[active,setActive]=useState(doc.toc[0]?.id??''),[tocOpen,setTocOpen]=useState(false)
  useEffect(()=>{const targets=doc.toc.filter(t=>t.depth===2).map(t=>document.getElementById(t.id)).filter((e):e is HTMLElement=>e!==null);const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setActive(entry.target.id)},{rootMargin:'-8% 0px -72% 0px',threshold:0});targets.forEach(el=>observer.observe(el));return()=>observer.disconnect()},[doc])
  const anchors = [...doc.toc.map(item => item.id), ...(doc.localLinks ?? []).map(l => l.target.slice(1))]
  const back = typeof location.state?.from === 'string' && /^\/thu-vien(?:\?|$)/.test(location.state.from) ? location.state.from : '/thu-vien'
  const index = new Map<string, ReaderNode>()
  function collect(node: ReaderNode) { index.set(node.id, node); node.children?.forEach(collect) }
  collect(doc.root)
  const groups = new Map(doc.figures.map(f => [f.paragraph, f]))
  const grouped = new Set(doc.figures.flatMap(f => [f.caption, f.description]))
  const tocGroups: { parent: ReaderDocument['toc'][number]; children: ReaderDocument['toc'] }[] = []
  for (const item of doc.toc) {
    if (item.depth === 3 && tocGroups.length) tocGroups.at(-1)!.children.push(item)
    else tocGroups.push({ parent: item, children: [] })
  }
  function tocLink(item: ReaderDocument['toc'][number]) {
    return <Link to={{ pathname: location.pathname, search: location.search, hash: '#' + item.id }} state={location.state} aria-current={active===item.id?'location':undefined} onClick={()=>{setActive(item.id);setTocOpen(false)}}>{item.title}</Link>
  }
  function render(node: ReaderNode, context: { header?: boolean; align?: ReaderNode['align']; column?: number } = {}): ReactNode {
    const attrs = { 'data-source-id': node.id, 'data-source-start': node.range.start, 'data-source-end': node.range.end }
    const children = () => node.children?.map(child => <Fragment key={child.id}>{render(child)}</Fragment>)
    const group = groups.get(node.id)
    if (group) {
      const image = index.get(group.image)!, caption = index.get(group.caption)!, description = index.get(group.description)!
      const asset = doc.assets.find(a => a.key === image.url)
      if (!asset) throw new Error('Reader: asset is not allowlisted')
      return <figure {...attrs} className="reader-figure">
        <div data-source-id={image.id} data-source-start={image.range.start} data-source-end={image.range.end}><img src={assetSource(asset.src)} alt={image.alt!} width={asset.width} height={asset.height} aria-describedby={description.id} />
          <button className="text-link reader-enlarge" onClick={e => setFigure({ image, asset, caption, description, opener: e.currentTarget })}>Xem hình lớn <Arrow diagonal /></button></div>
        <figcaption data-source-id={caption.id} data-source-start={caption.range.start} data-source-end={caption.range.end}>{caption.children?.map(child => <Fragment key={child.id}>{render(child)}</Fragment>)}</figcaption>
        <p id={description.id} data-source-id={description.id} data-source-start={description.range.start} data-source-end={description.range.end} className="reader-equivalent">{description.children?.map(child => <Fragment key={child.id}>{render(child)}</Fragment>)}</p>
      </figure>
    }
    switch (node.type) {
      case 'text': return <span {...attrs}>{node.value}</span>
      case 'paragraph': return <p {...attrs}>{children()}</p>
      case 'heading': return node.depth === 2 ? <h2 {...attrs} id={node.anchor} tabIndex={-1}>{children()}</h2> : <h3 {...attrs} id={node.anchor} tabIndex={-1}>{children()}</h3>
      case 'strong': return <strong {...attrs}>{children()}</strong>
      case 'emphasis': return <em {...attrs}>{children()}</em>
      case 'delete': return <del {...attrs}>{children()}</del>
      case 'break': return <br {...attrs} />
      case 'blockquote': return <blockquote {...attrs}>{children()}</blockquote>
      case 'list': return node.ordered ? <ol {...attrs} start={node.start ?? 1}>{children()}</ol> : <ul {...attrs}>{children()}</ul>
      case 'listItem': return <li {...attrs}>{typeof node.checked === 'boolean' && <input type="checkbox" checked={node.checked} disabled aria-label="Dấu chọn có sẵn trong tài liệu, không tương tác" />}{children()}</li>
      case 'link':
      case 'linkReference': {
        const url = safeLink(doc.localLinks?.find(l => l.source === node.url)?.target ?? node.url!, anchors)
        return url.startsWith('#') ? <Link {...attrs} to={{ pathname: location.pathname, search: location.search, hash: url }} state={location.state}>{children()}</Link> : <a {...attrs} href={url} title={node.title ?? undefined} target="_blank" rel="noopener noreferrer">{children()}<span className="reader-sr-only"> (mở tab mới)</span></a>
      }
      case 'definition': return <span {...attrs} data-reference-url={node.url} hidden />
      case 'table': return <div className="reader-table-scroll" role="region" aria-label={'Bảng đọc tại dòng ' + node.range.line} tabIndex={0}><table {...attrs}><thead>{node.children?.slice(0, 1).map(row => <Fragment key={row.id}>{render(row, { header: true, align: node.align })}</Fragment>)}</thead><tbody>{node.children?.slice(1).map(row => <Fragment key={row.id}>{render(row, { align: node.align })}</Fragment>)}</tbody></table></div>
      case 'tableRow': return <tr {...attrs}>{node.children?.map((cell, column) => <Fragment key={cell.id}>{render(cell, { ...context, column })}</Fragment>)}</tr>
      case 'tableCell': return context.header ? <th {...attrs} scope="col" style={{ textAlign: context.align?.[context.column ?? 0] ?? undefined }}>{children()}</th> : <td {...attrs} style={{ textAlign: context.align?.[context.column ?? 0] ?? undefined }}>{children()}</td>
      case 'inlineCode': return <code {...attrs}>{node.value}</code>
      case 'code': return <pre {...attrs} tabIndex={0} aria-label="Đoạn mã trong tài liệu"><code>{node.value}</code></pre>
      case 'thematicBreak': return <hr {...attrs} />
      default: throw new Error('Reader: unsupported AST node ' + node.type)
    }
  }
  if (doc.format !== 'gfm-mdast-v1') throw new Error('Reader: unsupported document format')
  const chapters:{key:string;heading?:string;nodes:ReaderNode[]}[]=[]
  for(const node of doc.root.children?.filter(node=>!grouped.has(node.id)&&node.id!==doc.titleNodeId)??[]){
    if(node.type==='heading'&&node.depth===2)chapters.push({key:node.id,heading:node.anchor,nodes:[node]})
    else {if(!chapters.length)chapters.push({key:'opening',nodes:[]});chapters.at(-1)!.nodes.push(node)}
  }
  const titleNode = doc.titleNodeId ? index.get(doc.titleNodeId) : undefined
  const rootAttrs = { 'data-source-id': doc.root.id, 'data-source-start': doc.root.range.start, 'data-source-end': doc.root.range.end }
  return <article className="markdown-reader" {...(titleNode ? rootAttrs : {})}>
    <ReadingProgress/><Breadcrumb title={title} />
    <header className="article-title reader-editorial-hero">{metadata&&<div className="reader-cover"><GardenIllustration index={metadata.illustration??0} eager/><div className="reader-cover-meta"><span>{metadata.topic}</span><span>{metadata.readingMinutes} phút đọc · {metadata.season}</span></div></div>}<div className="reader-heading"><h1 {...(titleNode ? { 'data-source-id': titleNode.id, 'data-source-start': titleNode.range.start, 'data-source-end': titleNode.range.end } : {})}>{titleNode ? titleNode.children?.map(child => <Fragment key={child.id}>{render(child)}</Fragment>) : title}</h1>{description && <p className="article-deck">{description}</p>}{!description&&metadata&&<p className="article-deck">{plainText(doc.root.children?.find(n=>n.type==='paragraph')??doc.root)}</p>}{publicationLabel&&<p className="article-metadata">{publicationLabel}</p>}</div></header>
    <div className="reader-layout"><nav className="table-of-contents reader-toc" aria-label="Mục lục" data-open={tocOpen}><h2>Trong trang này</h2><button className="reader-toc-toggle" aria-expanded={tocOpen} aria-controls="reader-chapter-links" onClick={()=>setTocOpen(o=>!o)}>Mục lục bài đọc <span aria-hidden="true">{tocOpen?'−':'+'}</span></button><ol id="reader-chapter-links">{tocGroups.map(({ parent, children }) => <li key={parent.id}>{tocLink(parent)}{children.length > 0 && <ol>{children.map(item => <li key={item.id}>{tocLink(item)}</li>)}</ol>}</li>)}</ol></nav>
      <div className="article-prose" {...(!titleNode ? rootAttrs : {})}>{chapters.map(chapter=><section className="reader-chapter" key={chapter.key} aria-labelledby={chapter.heading}>{chapter.nodes.map(node=><Fragment key={node.id}>{render(node)}</Fragment>)}</section>)}{doc.localLinks?.some(l=>l.target==='#publication-information')&&<aside id="publication-information" tabIndex={-1} className="editorial-note"><h2>Thông tin về hồ sơ bài viết</h2><p>Các nhãn liên kết hồ sơ trong nội dung gốc được giữ để đối chiếu. Hồ sơ biên soạn nội bộ không được cung cấp trên website đọc bài.</p></aside>}<Link className="text-link" to={back}>Quay lại thư viện <Arrow /></Link></div>
    </div>
    {figure && <FigureViewer key={figure.image.id} figure={figure} onDismiss={() => setFigure(null)} />}
  </article>
}
