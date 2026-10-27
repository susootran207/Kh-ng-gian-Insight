import { useEffect, useRef, useState } from 'react'
import { CatArt } from './CatArt'
import { useGardenMotion } from './GardenMotion'
// Fixed safe docks, never scroll-pixel tracking. Hide immediately while scrolling;
// reappear only in real whitespace, outside every text/control/image rectangle.
export function ScrollCompanion(){
 const {allowed}=useGardenMotion(),ref=useRef<HTMLButtonElement>(null),[dock,setDock]=useState<{x:number;y:number}|null>(null),[action,setAction]=useState('look'),[message,setMessage]=useState(''),timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined)
 useEffect(()=>{
  if(!allowed){setDock(null);return}
  let frame=0,settle:ReturnType<typeof setTimeout>
  const find=()=>{
    if(document.hidden||document.querySelector('.navigation.open,dialog[open]')||document.activeElement?.matches('input,textarea')){setDock(null);return}
    const hero=document.querySelector('.hero')?.getBoundingClientRect()
    if(!hero||hero.bottom>80){setDock(null);return}
    const size=innerWidth<700?46:60,pad=innerWidth<700?5:12
    const obstacles=Array.from(document.querySelectorAll('h1,h2,h3,p,button,a,input,textarea,label,summary,img,.academic-notice,.reader-table-scroll,.reading-layout')).filter(el=>!el.closest('.floating-may')).map(el=>el.getBoundingClientRect()).filter(r=>r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight)
    for(const y of [innerHeight-94,innerHeight*.63,innerHeight*.43,innerHeight-160])for(const x of [innerWidth-size-pad,pad]){
      if(y<100||y+size>innerHeight-14)continue
      if(obstacles.every(r=>x+size<r.left-5||x>r.right+5||y+size<r.top-7||y>r.bottom+7)){setDock({x,y});return}
    }
    setDock(null)
  }
  const changed=()=>{setDock(null);clearTimeout(settle);settle=setTimeout(()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(find)},200)}
  const observer=new ResizeObserver(changed);document.querySelectorAll('main>section').forEach(el=>observer.observe(el))
  const mutation=new MutationObserver(changed);const nav=document.querySelector('.navigation');if(nav)mutation.observe(nav,{attributes:true,attributeFilter:['class']})
  const focused=(event:FocusEvent)=>{if((event.target as Element)?.closest('.floating-may'))return;changed()}
  window.addEventListener('scroll',changed,{passive:true});window.addEventListener('resize',changed,{passive:true});document.addEventListener('focusin',focused);find()
  return()=>{clearTimeout(settle);cancelAnimationFrame(frame);observer.disconnect();mutation.disconnect();window.removeEventListener('scroll',changed);window.removeEventListener('resize',changed);document.removeEventListener('focusin',focused)}
 },[allowed])
 useEffect(()=>()=>clearTimeout(timer.current),[])
 const greet=()=>{clearTimeout(timer.current);setAction('wave');setMessage('Mây ở đây, ngồi cùng bạn một chút.');timer.current=setTimeout(()=>{setAction('look');setMessage('')},2200)}
 return <div className="floating-may" data-visible={Boolean(dock)} style={dock?{left:dock.x,top:dock.y}:undefined}><button ref={ref} aria-label="Chào Mây, người bạn đồng hành" tabIndex={dock?0:-1} aria-hidden={!dock} onClick={greet} data-action={action}><CatArt expression={action==='wave'?'happy':'curious'} dragging={false}/></button><span className="reader-sr-only" role="status">{message}</span></div>
}
