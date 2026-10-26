import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import '@fontsource/be-vietnam-pro/latin-400.css'
import '@fontsource/be-vietnam-pro/vietnamese-400.css'
import '@fontsource/be-vietnam-pro/latin-500.css'
import '@fontsource/be-vietnam-pro/vietnamese-500.css'
import '@fontsource/cormorant-garamond/latin-400.css'
import '@fontsource/cormorant-garamond/vietnamese-400.css'
import '@fontsource/cormorant-garamond/latin-500.css'
import '@fontsource/cormorant-garamond/vietnamese-500.css'
import '../src/styles/global.css'
import '../src/styles/atmosphere.css'
import './preview.css'
import { ReadingShell, RoutePosition } from '../src/reading/ReadingShell'
import { Library, ArticleCard } from '../src/reading/Router'
import { ArticleReader } from '../src/reading/markdown/ArticleReader'
import view from 'virtual:c1-preview'

const notice = <aside className="preview-notice c1-notice">Bản nháp đã nghiệm thu nội bộ · Chưa phê duyệt chuyên môn, chưa được phép xuất bản. Chỉ xem cục bộ. Các nhãn duyệt trong bài được giữ nguyên như hồ sơ lịch sử.</aside>
function PreviewReader() {
  const { slug } = useParams(), location = useLocation(), article = view.articles.find(a => a.slug === slug)
  if (!article) return <Missing/>
  const related = article.metadata.relatedArticleIds.map(id => view.articles.find(a => a.id === id)!).filter(Boolean)
  return <><p className="c1-identity">{article.id} · {article.revision} · {article.metadata.topic} · {article.metadata.season}</p>
    <ArticleReader key={article.id} document={article.document} title={article.metadata.title}/>
    <section className="c1-provenance" aria-labelledby="c1-provenance-title"><h2 id="c1-provenance-title">Đối chiếu bản nháp</h2><p>Hồ sơ dưới đây ghi đường dẫn và checksum để đối chiếu tại máy; không mở hồ sơ thô qua web. Các liên kết hồ sơ cuối bài dẫn đến đúng mục tương ứng tại đây.</p><dl><dt>Nguồn ARTICLE</dt><dd>{article.source.path}</dd><dt>SHA-256 nội dung</dt><dd>{article.contentHash}</dd><dt>SHA-256 revision</dt><dd>{article.revisionHash}</dd></dl>
      <ul>{article.dossiers.map(d => <li key={d.name} id={d.anchor} tabIndex={-1}><strong>{d.name}</strong><p>{d.file.path}</p><p>SHA-256: {d.file.sha256}</p></li>)}</ul>
    </section>
    <section className="related-reading"><h2>Đọc tiếp trong bản nháp</h2><p>Quan hệ bài và nhóm chủ đề được giữ theo manifest, chưa phải chuyên đề tuần được duyệt.</p><div className="c1-topic-links">{article.metadata.topicIds.map(id => <Link key={id} to={'/thu-vien?nhom=' + id}>{id}</Link>)}</div><div className="library-list">{related.map(a => <ArticleCard key={a.id} article={a.card}/>)}</div></section>
    <p className="c1-return"><Link className="text-link" to={typeof location.state?.from === 'string' && /^\/thu-vien(?:\?|$)/.test(location.state.from) ? location.state.from : '/thu-vien'}>Quay lại kết quả đã chọn</Link></p></>
}
function PreviewLibrary() {
  const location = useLocation(), group = new URLSearchParams(location.search).get('nhom') ?? ''
  const groups = [...new Set(view.articles.flatMap(a => a.metadata.topicIds))]
  return <><p className="c1-library-note">Chỉ dùng nguồn ARTICLE nghiệm thu: bốn bài r2, các bài còn lại r1. Không trộn bốn mẫu UI legacy cùng slug. Thời gian đọc ước tính theo 200 từ cách trắng/phút; mô tả thẻ lấy nguyên đoạn mở đầu.</p>
    <nav className="c1-topic-links" aria-label="Nhóm chủ đề bản nháp"><Link to="/thu-vien">Tất cả nhóm</Link>{groups.map(id => { const next = new URLSearchParams(location.search); next.set('nhom', id); return <Link key={id} to={'/thu-vien?' + next} aria-current={group === id ? 'page' : undefined}>{id}</Link> })}</nav>
    <Library entries={view.articles.filter(a => !group || a.metadata.topicIds.includes(group)).map(a => a.card)} notice={null}/>
  </>
}
function Missing() { return <><h1>Trang này không có trong bản xem thử.</h1><Link className="text-link" to="/thu-vien">Về thư viện bản nháp</Link></> }
function PageTitle() { const location = useLocation(); useEffect(() => { const a = view.articles.find(a => location.pathname === '/bai-viet/' + a.slug); document.title = (a ? a.metadata.title + ' · ' + a.revision : 'Thư viện bản nháp') + ' · Không Gian Nội Tâm' }, [location.pathname]); return null }
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><HashRouter><RoutePosition/><PageTitle/><ReadingShell>{notice}<Routes><Route path="/" element={<Navigate to="/thu-vien" replace/>}/><Route path="/thu-vien" element={<PreviewLibrary/>}/><Route path="/bai-viet/:slug" element={<PreviewReader/>}/><Route path="*" element={<Missing/>}/></Routes></ReadingShell></HashRouter></React.StrictMode>)
