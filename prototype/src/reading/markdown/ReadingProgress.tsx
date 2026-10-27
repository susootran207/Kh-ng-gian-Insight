import { useEffect, useRef } from 'react'
export function ReadingProgress(){
 const ref=useRef<HTMLDivElement>(null)
 useEffect(()=>{let frame=0;const measure=()=>{const el=ref.current,article=document.querySelector('.markdown-reader');if(!el||!article)return;const box=article.getBoundingClientRect(),fraction=Math.max(0,Math.min(1,-box.top/Math.max(1,box.height-innerHeight)));el.style.setProperty('--read-progress',String(fraction));el.setAttribute('aria-valuenow',String(Math.round(fraction*100)))};const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(measure)};window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update,{passive:true});update();return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',update)}},[])
 return <div ref={ref} className="reading-progress" role="progressbar" aria-label="Tiến trình đọc bài" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}><span/></div>
}
