import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { CatArt } from './CatArt'
import { useGardenMotion } from './GardenMotion'
type Point={x:number;y:number}
// User-controlled drag is available even with reduced motion. No persisted position.
export function ScrollCompanion(){
 const {allowed}=useGardenMotion(),root=useRef<HTMLDivElement>(null),[point,setPoint]=useState<Point>({x:12,y:innerHeight-120}),[action,setAction]=useState('sit'),[visible,setVisible]=useState(false),[dragging,setDragging]=useState(false),[message,setMessage]=useState(''),gesture=useRef<{x:number;y:number;origin:Point;moved:boolean}|null>(null),suppress=useRef(false),timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined)
 const bound=(p:Point)=>({x:Math.max(6,Math.min(innerWidth-90,p.x)),y:Math.max(88,Math.min(innerHeight-94,p.y))})
 const safe=(p:Point)=>{
  const obstacles=Array.from(document.querySelectorAll('a,button,input,textarea,summary,h1,h2,h3,p,label,.breadcrumbs,.academic-notice')).filter(el=>!el.closest('.floating-may')).map(el=>el.getBoundingClientRect()).filter(r=>r.width&&r.height&&r.bottom>0&&r.top<innerHeight)
  const free=(q:Point)=>obstacles.every(r=>q.x+84<r.left||q.x>r.right||q.y+100<r.top||q.y>r.bottom)
  if(free(p))return p
  const candidates=[{x:6,y:innerHeight-108},{x:innerWidth-90,y:innerHeight-108}]
  for(let y=100;y<innerHeight-100;y+=24)for(const x of [innerWidth-90,6])candidates.push({x,y})
  return candidates.find(free)??candidates.reduce((best,q)=>{const overlap=(at:Point)=>obstacles.reduce((sum,r)=>sum+Math.max(0,Math.min(at.x+84,r.right)-Math.max(at.x,r.left))*Math.max(0,Math.min(at.y+100,r.bottom)-Math.max(at.y,r.top)),0);return overlap(q)<overlap(best)?q:best})
 }
 useEffect(()=>{
  let rest:ReturnType<typeof setTimeout>,frame=0,lastY=scrollY
  const visibility=()=>{const hero=document.querySelector('.hero')?.getBoundingClientRect();setVisible((!hero||hero.bottom<120)&&!document.querySelector('dialog[open],.navigation.open')&&!document.activeElement?.matches('input,textarea'))}
  const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
   visibility()
   if(gesture.current)return
   const direction=scrollY>=lastY?1:-1;lastY=scrollY
   if(allowed){setAction('walk');setPoint(p=>safe(bound({x:p.x+direction*24,y:innerHeight-108})))}
   clearTimeout(rest);rest=setTimeout(()=>{setAction(document.querySelector('.reader-chapter')?'rest':'sit');setPoint(p=>safe(bound(p)))},650)
  })}
  const resize=()=>setPoint(p=>safe(bound(p)))
  const observer=new MutationObserver(()=>{visibility()})
  observer.observe(document.getElementById('root')!,{childList:true,subtree:true,attributes:true,attributeFilter:['class','open']})
  document.addEventListener('focusin',visibility);window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',resize);update()
  const idle=setInterval(()=>{if(!allowed||gesture.current||document.activeElement?.closest('.floating-may'))return;setAction(a=>a==='look'?'wave':a==='wave'?'rest':'look')},6500)
  return()=>{cancelAnimationFrame(frame);clearTimeout(rest);clearInterval(idle);observer.disconnect();document.removeEventListener('focusin',visibility);window.removeEventListener('scroll',update);window.removeEventListener('resize',resize)}
 },[allowed])
 useEffect(()=>()=>clearTimeout(timer.current),[])
 const greet=()=>{if(suppress.current){suppress.current=false;return}setAction('happy');setMessage('Mây ở đây. Bạn có thể kéo mình đi cùng, hoặc dùng phím mũi tên.');clearTimeout(timer.current);timer.current=setTimeout(()=>{setAction('wave');setMessage('')},2400)}
 const down=(e:PointerEvent<HTMLButtonElement>)=>{if(e.button!==0)return;e.currentTarget.setPointerCapture(e.pointerId);gesture.current={x:e.clientX,y:e.clientY,origin:point,moved:false};setDragging(true);setAction('look')}
 const move=(e:PointerEvent<HTMLButtonElement>)=>{const g=gesture.current;if(!g)return;const dx=e.clientX-g.x,dy=e.clientY-g.y;if(Math.hypot(dx,dy)>5)g.moved=true;setPoint(bound({x:g.origin.x+dx,y:g.origin.y+dy}))}
 const up=()=>{if(!gesture.current)return;suppress.current=gesture.current.moved;gesture.current=null;setDragging(false);setPoint(p=>safe(bound(p)));setAction('sit')}
 return <div ref={root} className="floating-may" data-visible={visible} data-dragging={dragging} data-animated={allowed} style={{left:0,top:0,transform:`translate3d(${point.x}px,${point.y}px,0)`}}>
  <button aria-label="Chào Mây, người bạn đồng hành" title="Kéo Mây · Phím mũi tên để di chuyển · Home để về góc" tabIndex={visible?0:-1} aria-hidden={!visible} data-action={action} onClick={greet} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onKeyDown={e=>{const directions:Record<string,Point>={ArrowLeft:{x:-24,y:0},ArrowRight:{x:24,y:0},ArrowUp:{x:0,y:-24},ArrowDown:{x:0,y:24}};if(directions[e.key]){e.preventDefault();const d=directions[e.key];setPoint(p=>bound({x:p.x+d.x,y:p.y+d.y}));setAction('walk')}if(e.key==='Home'||e.key==='Escape'){e.preventDefault();setPoint(safe({x:6,y:innerHeight-94}));setAction('sit')}}} onBlur={()=>{setPoint(p=>safe(bound(p)));setAction('sit')}}><CatArt expression={action==='happy'?'happy':action==='rest'?'sleepy':'curious'} dragging={dragging}/></button>
  <span className="may-name" aria-hidden="true">Mây · kéo mình đi</span><span className="reader-sr-only" role="status">{message}</span>
 </div>
}
