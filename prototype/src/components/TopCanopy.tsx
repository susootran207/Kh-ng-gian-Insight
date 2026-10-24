import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'

type Spray = {x:number; y:number; length:number; width:number; lean:number; time:number; phase:number}
const leftSprays:Spray[] = [
  {x:16,y:18,length:132,width:7.4,lean:5,time:12.7,phase:-8},
  {x:36,y:7,length:101,width:6.8,lean:-3,time:15.1,phase:-2},
  {x:66,y:1,length:65,width:5.2,lean:4,time:13.8,phase:-10},
  {x:111,y:-15,length:40,width:4.4,lean:-2,time:16.4,phase:-5},
  {x:178,y:-13,length:31,width:3.6,lean:2,time:14.6,phase:-12},
  {x:247,y:-18,length:28,width:3,lean:-1,time:17.8,phase:-7},
]
const rightSprays:Spray[] = [
  {x:16,y:11,length:116,width:7,lean:4,time:14.3,phase:-4},
  {x:32,y:4,length:88,width:6.3,lean:-4,time:16.1,phase:-11},
  {x:63,y:-2,length:59,width:4.9,lean:3,time:13.5,phase:-6},
  {x:116,y:-13,length:37,width:3.9,lean:-2,time:18.1,phase:-2},
  {x:185,y:-15,length:29,width:3.2,lean:2,time:15.4,phase:-9},
  {x:260,y:-19,length:25,width:2.7,lean:0,time:19.2,phase:-13},
]

function Raceme({spray,paint,near=false}:{spray:Spray;paint:string;near?:boolean}) {
  const rows=Math.ceil(spray.length/12)
  return <g className="canopy-cluster corner-raceme" data-length={spray.length} style={{transformOrigin:`${spray.x}px ${spray.y}px`,'--arc':near?'1.6deg':'1.1deg','--sway':`${spray.time}s`,'--delay':`${spray.phase}s`} as CSSProperties}>
    <path d={`M${spray.x} ${spray.y}q${spray.lean} ${spray.length*.48} 0 ${spray.length}`} fill="none" stroke="#9aa58b" strokeWidth=".65"/>
    {Array.from({length:rows},(_,i)=>{
      const t=1-i/rows,yy=spray.y+7+i*11,bulge=spray.width*t,x=spray.x+Math.sin(i/rows*Math.PI)*spray.lean
      return <g key={i} transform={`translate(${x} ${yy}) scale(${.42+t*.5})`}>
        <path d={`M0 1C${-bulge*.6} -8 ${-bulge*2} -6 ${-bulge*1.6} 1Q${-bulge} 8 0 1Z`} fill={`url(#${paint})`}/>
        <path d={`M0 5C${bulge*.6} -4 ${bulge*2} -1 ${bulge*1.6} 5Q${bulge} 12 0 5Z`} fill={i%3===0?'#c6b2d8':i%3===1?'#b7a0ca':'#d4c3e1'}/>
      </g>
    })}
  </g>
}

function CornerWisteria({side}:{side:'left'|'right'}) {
  const sprays=side==='left'?leftSprays:rightSprays
  const paint=`corner-petal-${side}`
  return <svg className={`corner-wisteria corner-${side}`} viewBox="0 0 300 220" fill="none">
    <defs><linearGradient id={paint} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a88dbf"/><stop offset=".5" stopColor="#bca5ce"/><stop offset="1" stopColor="#d8cae4"/></linearGradient></defs>
    <g className="canopy-layer corner-branches" data-depth="back">
      <path d="M-8 47C-2 20 13 9 57 7S138 11 174 5 250 8 298 1M1-5C14 27-3 58 10 91S1 145 8 183" stroke="#91846e" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M0 22Q34 25 68 1M27 8Q73 17 111 2M148 6Q181 15 217 3M4 70Q19 57 25 36" stroke="#a2aa8c" strokeWidth=".8"/>
      {[{x:12,y:7,angle:20},{x:38,y:8,angle:-12},{x:75,y:3,angle:14},{x:135,y:5,angle:9},{x:202,y:3,angle:-5},{x:266,y:1,angle:7},{x:5,y:61,angle:70},{x:7,y:114,angle:83}].map(({x,y,angle},i)=><g key={x+':'+y} transform={`translate(${x} ${y}) rotate(${angle})`} opacity={1-i*.055}>
        <path d="M0 0Q-13-13-23-4-16 7 0 0M1 0Q15-12 25-4 17 7 1 0" fill={i%2?'#a1ae8d':'#b2bba0'}/><path d="m-18-3 19 3 18-3" stroke="#899979" strokeWidth=".5"/>
      </g>)}
    </g>
    <g className="canopy-layer corner-blooms" data-depth="main">{sprays.map(spray=><Raceme key={spray.x} spray={spray} paint={paint}/>)}</g>
    <g className="canopy-layer corner-near" data-depth="front"><Raceme near paint={paint} spray={{x:10,y:47,length:76,width:7.5,lean:4,time:11.4,phase:side==='left'?-4:-9}}/></g>
  </svg>
}

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
        .map(box=>`<rect x="${box.left-bounds.left-10}" y="${box.top-bounds.top-10}" width="${box.width+20}" height="${box.height+20}" rx="10" fill="black"/>`).join('')
      // A content-safety mask, not a cutout approximation of the botanical art.
      // The artwork carries its original organic alpha contours independently.
      const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${bounds.width}" height="${bounds.height}" viewBox="0 0 ${bounds.width} ${bounds.height}"><defs><filter id="soft"><feGaussianBlur stdDeviation="2"/></filter><mask id="safe" maskUnits="userSpaceOnUse" x="0" y="0" width="${bounds.width}" height="${bounds.height}"><rect width="100%" height="100%" fill="white"/><g filter="url(#soft)">${holes}</g></mask></defs><rect width="100%" height="100%" fill="white" mask="url(#safe)"/></svg>`
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

  return <div ref={root} className="top-garland corner-frame" data-ready={Boolean(mask)} aria-hidden="true" style={{maskImage:mask,WebkitMaskImage:mask}}>
    <CornerWisteria side="left"/>
    <CornerWisteria side="right"/>
  </div>
}
