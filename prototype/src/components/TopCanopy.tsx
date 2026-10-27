import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'

import { approvedWisteria, type BotanicalSpray } from './wisteriaDesign'

// Atlas roots match each individually painted botanical twig, not a uniform bar.
const rootAnchors=[.75,.52,.68,.38,.47,.42]

const protectedSelectors='.site-header .brand,.navigation>a,.menu-button,.hero-copy h1,.hero-description,.hero-copy .button,.hero-note,.garden-wrap'

export function TopCanopy() {
  const root=useRef<HTMLDivElement>(null)
  const [mask,setMask]=useState('')
  const [width,setWidth]=useState(()=>window.innerWidth)
  const composition=approvedWisteria
  const scale=width<700?.46:width<1100?.8:1
  useLayoutEffect(()=>{
    const canopy=root.current
    if(!canopy)return
    let frame=0,disposed=false
    const measure=()=>{
      if(disposed)return
      const bounds=canopy.getBoundingClientRect()
      setWidth(bounds.width)
      const holes=Array.from(document.querySelectorAll<HTMLElement>(protectedSelectors))
        .filter(el=>getComputedStyle(el).display!=='none')
        .map(el=>el.getBoundingClientRect())
        .filter(box=>box.width>0 && box.height>0 && box.top<bounds.bottom+20 && box.bottom>bounds.top)
        .map(box=>`<rect x="${box.left-bounds.left-16}" y="${box.top-bounds.top-16}" width="${box.width+32}" height="${box.height+32}" rx="20" fill="black"/>`).join('')
      // A content-safety mask, not a cutout approximation of the botanical art.
      // The artwork carries its original organic alpha contours independently.
      const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${bounds.width}" height="${bounds.height}" viewBox="0 0 ${bounds.width} ${bounds.height}"><defs><filter id="soft"><feGaussianBlur stdDeviation="4"/></filter><mask id="safe" maskUnits="userSpaceOnUse" x="0" y="0" width="${bounds.width}" height="${bounds.height}"><rect width="100%" height="100%" fill="white"/><g filter="url(#soft)">${holes}</g></mask></defs><rect width="100%" height="100%" fill="white" mask="url(#safe)"/></svg>`
      setMask(`url("data:image/svg+xml,${encodeURIComponent(svg)}")`)
    }
    const request=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(measure)}
    const resize=new ResizeObserver(request)
    resize.observe(canopy)
    document.querySelectorAll(protectedSelectors).forEach(el=>resize.observe(el))
    const menu=document.querySelector('.navigation')
    const mutation=new MutationObserver(request)
    if(menu)mutation.observe(menu,{attributes:true,attributeFilter:['class']})
    const scrollRequest=()=>{if(scrollY<240)request()}
    window.addEventListener('scroll',scrollRequest,{passive:true})
    window.addEventListener('resize',request,{passive:true})
    document.fonts.ready.then(()=>{if(!disposed)request()})
    measure()
    return()=>{disposed=true;cancelAnimationFrame(frame);resize.disconnect();mutation.disconnect();window.removeEventListener('resize',request);window.removeEventListener('scroll',scrollRequest)}
  },[])

  const renderSpray=(spray:BotanicalSpray,index:number,near=false)=>{
    const size=spray.size*scale
    const anchor=near?.52:rootAnchors[spray.cell]
    return <div key={spray.cell} className={`canopy-cluster botanical-spray ${near?'near-botanical':'main-botanical'}`} data-cell={spray.cell} data-position={spray.x} style={{left:`calc(${spray.x}% - ${size/2}px)`,top:`${spray.y*scale}px`,width:`${size}px`,transformOrigin:`${anchor*100}% 7%`,'--lean':`${spray.lean}deg`,'--arc':`${near?1.7:.9+(index%3)*.2}deg`,'--sway':`${near?11.3+index*1.7:14.2+index*1.3}s`,'--delay':`${-index*2.7-(near?6:2)}s`} as CSSProperties}>
      <div className="botanical-paint" style={{backgroundPosition:near?`${spray.cell*50}% 50%`:`${(spray.cell%3)*50}% ${Math.floor(spray.cell/3)*100}%`}}/>
    </div>
  }
  return <div ref={root} className="top-garland living-trellis" data-variant="B" data-ready={Boolean(mask)} aria-hidden="true" style={{maskImage:mask,WebkitMaskImage:mask}}>
    <div className="trellis-distant-leaves"/>
    <svg className="canopy-layer trellis-branches" data-depth="back" viewBox={`0 0 ${width} 210`} preserveAspectRatio="none" fill="none">
      <path className="trellis-main-branch" d={`M-6 47C${width*.04} 5 ${width*.09} 2 ${width*.19} 13S${width*.31} 32 ${width*.39} 12Q${width*.45} -2 ${width*.51} 13M${width+6} 43C${width*.96} 5 ${width*.91} -1 ${width*.83} 10S${width*.68} 28 ${width*.61} 11Q${width*.55} 2 ${width*.51} 13`} stroke="#8e8068" strokeWidth={width<700?1.5:2.5} strokeLinecap="round"/>
      <path d={`M-3 6Q13 44 5 132M${width+2} 1Q${width-14} 54 ${width-3} 142M${width*.11} 8Q${width*.22} -5 ${width*.29} 17M${width*.71} 17Q${width*.86} -9 ${width*.97} 13`} stroke="#a99c80" strokeWidth="1.1" strokeLinecap="round"/>
      {composition.front.map(spray=>{
        const size=spray.size*scale,tip=spray.x/100*width+size*.02,y=spray.y*scale+size*.065
        return <path key={spray.cell} d={`M${spray.x/100*width+18*scale} 14Q${tip+6*scale} ${y-9*scale} ${tip} ${y}`} stroke="#93866e" strokeWidth="1.2"/>
      })}
      {composition.main.map(spray=>{
        const size=spray.size*scale, tip=spray.x/100*width-size/2+size*rootAnchors[spray.cell]
        const y=spray.y*scale+size*.08
        return <path key={spray.cell} d={`M${spray.x/100*width-14*scale} 12Q${tip-8*scale} ${y-7*scale} ${tip} ${y}`} stroke="#9d9479" strokeWidth="1.1"/>
      })}
      {composition.foliage.map((x,i)=><g key={x} transform={`translate(${width*x/100} ${7+(i%3)*3}) rotate(${i%2?12:-15}) scale(${width<700?.58:.9})`}>
        <path d="M0 0C-8-13-21-14-25-6-18 3-8 5 0 0M1 0C11-11 23-12 28-3 18 6 9 5 1 0" fill={i%3?'#a7b390':'#bdc3a8'}/><path d="m-20-5 21 5 21-2" stroke="#829574" strokeWidth=".6"/>
      </g>)}
    </svg>
    <svg className="canopy-leaf-breath" viewBox={`0 0 ${width} 170`} aria-hidden="true">{composition.foliage.filter((_,i)=>i%2===0).map((x,i)=><g key={x} style={{transformOrigin:`${width*x/100}px 18px`,animationDelay:`${-i*2.1}s`}}><path d={`M${width*x/100} 18q-18 13-16 31 20-3 16-31m2 0q25 6 27 24-23 2-27-24`} fill="#a7b390" opacity=".42"/></g>)}</svg><div className="canopy-layer trellis-blooms" data-depth="main">{composition.main.map((spray,i)=>renderSpray(spray,i))}</div>
    <div className="canopy-layer trellis-near" data-depth="front">{composition.front.map((spray,i)=>renderSpray(spray,i,true))}</div>
  </div>
}
