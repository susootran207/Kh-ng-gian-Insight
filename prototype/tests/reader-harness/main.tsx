import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import '@fontsource/be-vietnam-pro/latin-400.css'
import '@fontsource/be-vietnam-pro/vietnamese-400.css'
import '@fontsource/be-vietnam-pro/latin-500.css'
import '@fontsource/be-vietnam-pro/vietnamese-500.css'
import '@fontsource/cormorant-garamond/latin-400.css'
import '@fontsource/cormorant-garamond/vietnamese-400.css'
import '@fontsource/cormorant-garamond/latin-500.css'
import '@fontsource/cormorant-garamond/vietnamese-500.css'
import '../../src/styles/global.css'
import '../../src/styles/atmosphere.css'
import { ReadingShell, RoutePosition } from '../../src/reading/ReadingShell'
import { Library } from '../../src/reading/Router'
import { ArticleReader } from '../../src/reading/markdown/ArticleReader'
import fixture from 'virtual:r1-fixture'

function Notice() { return <aside className="preview-notice">Bản dựng kiểm thử · Nội dung giả lập, chưa xuất bản. Không có bài thật nào được tích hợp trong R1.</aside> }
function FixturePage() {
  const location = useLocation()
  useEffect(() => { document.title = 'Bài giả lập Reader · Không Gian Nội Tâm' }, [location.pathname])
  return <><Notice/><ArticleReader document={fixture.document} title={fixture.title} description={fixture.description}/></>
}
function Index() { return <><h1>Đọc thử một trang giả lập</h1><Notice/><p>Mở một bài kiểm thử để xem bảng, hình và hoạt động đọc.</p><Link className="text-link" to="/r1/fixture" state={{ from: '/thu-vien?q=mua+thi' }}>Mở Reader giả lập</Link></> }
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><HashRouter><RoutePosition/><ReadingShell><Routes><Route path="/" element={<Index/>}/><Route path="/r1/fixture" element={<FixturePage/>}/><Route path="/thu-vien" element={<Library/>}/><Route path="*" element={<h1>Trang kiểm thử không tồn tại.</h1>}/></Routes></ReadingShell></HashRouter></React.StrictMode>)
