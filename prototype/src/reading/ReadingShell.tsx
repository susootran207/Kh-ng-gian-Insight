import { AcademicNotice, isAcademicShowcase } from './AcademicNotice'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Arrow, LeafMark } from '../components/Icons'
import '../styles/reading.css'

export function RoutePosition() {
  const location=useLocation(), previous=useRef(location.pathname)
  useEffect(()=>{
    const frame=requestAnimationFrame(()=>{
      if(location.hash){const target=document.getElementById(location.hash.slice(1).replace(/%[0-9a-f]{2}(?:%[0-9a-f]{2})*/gi,value=>{try{return decodeURIComponent(value)}catch{return value}}));target?.scrollIntoView({behavior:'instant',block:'start'});target?.setAttribute('tabindex','-1');target?.focus({preventScroll:true})}
      else if(previous.current!==location.pathname){window.scrollTo({top:0,behavior:'instant'});document.querySelector<HTMLElement>('main')?.focus({preventScroll:true})}
      previous.current=location.pathname
    })
    return ()=>cancelAnimationFrame(frame)
  },[location.pathname,location.hash])
  return null
}
function ReadingHeader(){
  const [open,setOpen]=useState(false),button=useRef<HTMLButtonElement>(null),location=useLocation()
  useEffect(()=>setOpen(false),[location])
  useEffect(()=>{const resize=()=>{if(innerWidth>=1100)setOpen(false)};window.addEventListener('resize',resize);return()=>window.removeEventListener('resize',resize)},[])
  return <header className="site-header" onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);button.current?.focus()}}}><div className="header-inner"><Link className="brand" to="/" aria-label="Không Gian Nội Tâm — trang chủ"><LeafMark/><span>Không Gian<br/>Nội Tâm<span className="brand-period">.</span></span></Link><button ref={button} className="menu-button" aria-controls="reading-navigation" aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?'Đóng':'Menu'}<Arrow/></button><nav id="reading-navigation" className={open?'navigation open':'navigation'} aria-label="Điều hướng chính"><NavLink to="/chuyen-de">{isAcademicShowcase?'Lịch minh họa':'Chuyên đề tuần'}</NavLink><Link to="/#nen-tang">Về khu vườn</Link><Link to="/#dong-chay">Dòng chảy</Link><NavLink to="/thu-vien">Góc đọc</NavLink><Link className="nav-reflection" to="/#tam-tinh">Góc tâm tình <Arrow diagonal/></Link></nav></div></header>
}

export function Breadcrumb({title,library=true,parent}:{title:string;library?:boolean;parent?:{to:string;label:string}|null}){return <nav className="breadcrumbs" aria-label="Đường dẫn"><Link to="/">Trang chủ</Link><span aria-hidden="true">/</span>{parent!==null&&<><Link to={parent?.to??(library?'/thu-vien':'/chuyen-de')}>{parent?.label??(library?'Thư viện':'Chuyên đề')}</Link><span aria-hidden="true">/</span></>}<span aria-current="page">{title}</span></nav>}

export function ReadingShell({children}:{children:ReactNode}){return <div className="reading-site"><a className="skip-link" href="#reading-main" onClick={e=>{e.preventDefault();document.getElementById('reading-main')?.focus()}}>Đến nội dung chính</a><ReadingHeader/><main id="reading-main" tabIndex={-1} className="page-width reading-main"><AcademicNotice/>{children}</main><footer className="site-footer page-width"><div className="footer-top"><Link className="brand" to="/"><LeafMark/><span>Không Gian<br/>Nội Tâm.</span></Link><p>Một nơi để đọc, để thở, để là mình.</p><Link className="text-link" to="/thu-vien">Thư viện bài viết <Arrow/></Link></div><p className="support-note">Nội dung không thay thế tư vấn cá nhân, chẩn đoán hoặc điều trị. Không có tài khoản, theo dõi hay hộp thư nhận tin nhắn.</p></footer></div>}
