import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'

// Six individually painted sprays, not clones of one enlarged SVG raceme.
const mainSprays = [
  {cell:0,x:-8,y:-64,width:30,arc:1.1,time:12.7,phase:-8},
  {cell:1,x:10,y:-87,width:26,arc:.8,time:15.1,phase:-2},
  {cell:2,x:28,y:-55,width:25,arc:1.3,time:13.8,phase:-10},
  {cell:3,x:47,y:-83,width:27,arc:.9,time:16.4,phase:-5},
  {cell:4,x:67,y:-61,width:27,arc:1.4,time:14.6,phase:-12},
  {cell:5,x:86,y:-76,width:30,arc:1.2,time:15.8,phase:-7},
]
const closeSprays = [
  {cell:0,x:-9,y:-93,width:20,arc:1.9,time:10.3,phase:-6},
  {cell:1,x:37,y:-175,width:17,arc:1.5,time:11.8,phase:-2},
  {cell:2,x:89,y:-121,width:21,arc:2.2,time:9.7,phase:-8},
]
const protectedSelectors='.site-header .brand,.navigation>a,.menu-button,.hero-copy h1,.hero-description,.hero-copy .button,.hero-note,.garden-wrap'

export function TopCanopy() {
  const root=useRef<HTMLDivElement>(null)
  const [mask,setMask]=useState('')
  useLayoutEffect(()=>{
    const canopy=root.current
    if(!canopy)return
    let frame=0,disposed=false
    const measure=()=>{
      if(disposed)return
      const bounds=canopy.getBoundingClientRect()
      const holes=Array.from(document.querySelectorAll<HTMLElement>(protectedSelectors))
        .filter(el=>getComputedStyle(el).display!=='none')
        .map(el=>el.getBoundingClientRect())
        .filter(box=>box.width>0 && box.height>0 && box.top<bounds.bottom+20 && box.bottom>bounds.top)
        .map(box=>`<rect x="${box.left-bounds.left-28}" y="${box.top-bounds.top-28}" width="${box.width+56}" height="${box.height+56}" rx="32" fill="black"/>`).join('')
      // A content-safety mask, not a cutout approximation of the botanical art.
      // The artwork carries its original organic alpha contours independently.
      const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${bounds.width}" height="${bounds.height}" viewBox="0 0 ${bounds.width} ${bounds.height}"><defs><filter id="soft"><feGaussianBlur stdDeviation="8"/></filter><mask id="safe" maskUnits="userSpaceOnUse" x="0" y="0" width="${bounds.width}" height="${bounds.height}"><rect width="100%" height="100%" fill="white"/><g filter="url(#soft)">${holes}</g></mask></defs><rect width="100%" height="100%" fill="white" mask="url(#safe)"/></svg>`
      setMask(`url("data:image/svg+xml,${encodeURIComponent(svg)}")`)
    }
    const request=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(measure)}
    const resize=new ResizeObserver(request)
    resize.observe(canopy)
    document.querySelectorAll(protectedSelectors).forEach(el=>resize.observe(el))
    const menu=document.querySelector('.navigation')
    const mutation=new MutationObserver(request)
    if(menu)mutation.observe(menu,{attributes:true,attributeFilter:['class']})
    window.addEventListener('resize',request,{passive:true})
    document.fonts.ready.then(()=>{if(!disposed)request()})
    measure()
    return()=>{disposed=true;cancelAnimationFrame(frame);resize.disconnect();mutation.disconnect();window.removeEventListener('resize',request)}
  },[])

  return <div ref={root} className="top-garland full-canopy" data-ready={Boolean(mask)} aria-hidden="true" style={{maskImage:mask,WebkitMaskImage:mask}}>
    <div className="canopy-layer canopy-back" data-depth="back"><div className="canopy-roof-art"/></div>
    <div className="canopy-layer canopy-middle" data-depth="main">
      {mainSprays.map(spray=><div key={spray.cell} className={`canopy-cluster painted-spray main-spray spray-${spray.cell}`} style={{'--x':`${spray.x}%`,'--y':`${spray.y}px`,'--spray-width':`${spray.width}%`,'--arc':`${spray.arc}deg`,'--sway':`${spray.time}s`,'--delay':`${spray.phase}s`} as CSSProperties}>
        <div className="spray-art main-spray-art" style={{backgroundPosition:`${(spray.cell%3)*50}% ${Math.floor(spray.cell/3)*100}%`}}/>
      </div>)}
    </div>
    <div className="canopy-layer canopy-front" data-depth="front">
      {closeSprays.map(spray=><div key={spray.cell} className={`canopy-cluster painted-spray close-spray close-${spray.cell}`} style={{'--x':`${spray.x}%`,'--y':`${spray.y}px`,'--spray-width':`${spray.width}%`,'--arc':`${spray.arc}deg`,'--sway':`${spray.time}s`,'--delay':`${spray.phase}s`} as CSSProperties}>
        <div className="spray-art close-spray-art" style={{backgroundPosition:`${spray.cell*50}% 50%`}}/>
      </div>)}
    </div>
  </div>
}
