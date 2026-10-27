import { useEffect, useRef, type ReactNode, type PointerEvent } from 'react'
import { useGardenMotion } from './GardenMotion'
// Event-driven depth, at most one style write per frame. Never on prose/forms.
export function DepthSurface({children,className='',reveal=false}:{children:ReactNode;className?:string;reveal?:boolean}){
 const ref=useRef<HTMLDivElement>(null),frame=useRef(0),{allowed}=useGardenMotion()
 const reset=()=>{const el=ref.current;if(!el)return;cancelAnimationFrame(frame.current);el.dataset.tracking='false';for(const key of ['--rx','--ry','--px','--py','--light-x','--light-y'])el.style.removeProperty(key)}
 useEffect(()=>{if(!allowed)reset();return()=>cancelAnimationFrame(frame.current)},[allowed])
 useEffect(()=>{const el=ref.current;if(!el||!reveal||!allowed)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){el.dataset.entered='true';observer.disconnect()}},{threshold:.12});observer.observe(el);return()=>observer.disconnect()},[allowed,reveal])
 const move=(event:PointerEvent<HTMLDivElement>)=>{
  if(!allowed||event.pointerType!=='mouse'||!matchMedia('(hover: hover) and (pointer: fine)').matches)return
  const el=event.currentTarget,box=el.getBoundingClientRect(),x=Math.max(-.5,Math.min(.5,(event.clientX-box.left)/box.width-.5)),y=Math.max(-.5,Math.min(.5,(event.clientY-box.top)/box.height-.5))
  cancelAnimationFrame(frame.current);frame.current=requestAnimationFrame(()=>{el.dataset.tracking='true';el.style.setProperty('--rx',`${-y*5}deg`);el.style.setProperty('--ry',`${x*6}deg`);el.style.setProperty('--px',`${x*9}px`);el.style.setProperty('--py',`${y*9}px`);el.style.setProperty('--light-x',`${(x+.5)*100}%`);el.style.setProperty('--light-y',`${(y+.5)*100}%`)})
 }
 return <div ref={ref} className={'depth-surface '+className} data-reveal={reveal} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>{children}</div>
}
