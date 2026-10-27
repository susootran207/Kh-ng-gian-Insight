import { useEffect, useState } from 'react'
import { useGardenMotion } from './GardenMotion'
export function BackToTop(){
 const [visible,setVisible]=useState(false),{allowed}=useGardenMotion()
 useEffect(()=>{let frame=0;const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>setVisible(scrollY>650))};update();window.addEventListener('scroll',update,{passive:true});return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update)}},[])
 return <button className="reading-back-top" data-visible={visible} tabIndex={visible?0:-1} aria-hidden={!visible} aria-label="Về đầu trang" onClick={()=>{window.scrollTo({top:0,behavior:allowed?'smooth':'instant'});const header=document.querySelector<HTMLElement>('.site-header');header?.setAttribute('tabindex','-1');header?.focus({preventScroll:true})}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M12 20V4m-6 6 6-6 6 6"/></svg></button>
}
