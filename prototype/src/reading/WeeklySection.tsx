import { useState } from 'react'
import '../styles/weekly.css'
import { Link } from 'react-router-dom'
import { Arrow } from '../components/Icons'
import { currentWeekly, weeklyView } from './weekly'

export function WeeklySection() {
  const [open,setOpen]=useState(false), topic=currentWeekly
  return <section id="chuyen-de" className="weekly section-anchor">
    <div className="page-width weekly-grid">
      <div className="weekly-art" aria-hidden="true"><div className="window-arch"><div className="window-moon"/><div className="window-hill"/><div className="window-hill second"/><div className="window-mullion"/></div><div className="book book-one"/><div className="book book-two"/><div className="teacup"><span/></div><div className="table-line"/></div>
      <div className="weekly-copy">
        <h2>Chuyên đề tuần này</h2>
        {topic ? <><h3>{topic.title}</h3><p>{topic.description}</p><div className="weekly-meta"><span>{weeklyView.reason === 'fallback' ? 'Đọc lại chuyên đề gần nhất' : 'Chuyên đề đang mở'}</span></div><button className="text-link" aria-expanded={open} aria-controls="weekly-excerpt" onClick={()=>setOpen(v=>!v)}>{open?'Khép lại chuyên đề':'Mở một trang đọc'}<Arrow/></button><Link className="text-link home-reading-route" to={'/chuyen-de/'+topic.slug}>Xem chuyên đề đầy đủ <Arrow/></Link></> : <><h3>Một trang mới,<br/>đang được vun trồng.</h3><p>Chuyên đề sẽ mở khi nội dung được duyệt xuất bản.</p><Link className="text-link" to="/chuyen-de">Ghé trang chuyên đề <Arrow/></Link></>}
      </div>
      {topic && open && <div className="weekly-excerpt" id="weekly-excerpt"><h3>{topic.title}</h3><p>{topic.description}</p><ol>{topic.articleSlugs.map(slug=>{const a=weeklyView.articles.find(a=>a.slug===slug)!;return <li key={slug}><Link to={'/bai-viet/'+slug} state={{from:'/thu-vien?chuyen-de='+topic.slug}}>{a.title}</Link></li>})}</ol></div>}
    </div>
  </section>
}
