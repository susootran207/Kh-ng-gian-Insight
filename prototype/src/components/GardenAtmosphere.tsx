import { useEffect, useState, type CSSProperties } from 'react'
import { ScrollCompanion } from './ScrollCompanion'

// Bounded, deterministic distribution. Negative phases avoid a synchronized start;
// no per-frame JS, particle creation loop, network request, or canvas.
const petals = Array.from({ length: 16 }, (_, i) => ({
  x: (i * 37 + 7) % 98,
  size: 5 + (i * 7) % 8,
  duration: 23 + (i * 11) % 21,
  delay: -((i * 13 + 3) % 41),
  drift: (i % 2 ? -1 : 1) * (22 + (i * 17) % 68),
  opacity: .14 + (i % 4) * .035,
}))

function TopGarland() {
  return <div className="top-garland" aria-hidden="true">
    {['left', 'right'].map((side, sideIndex) => <svg key={side} className={`edge-wisteria edge-${side}`} viewBox="0 0 100 330" fill="none">
      <path d="M-8-5C18 19 8 63 36 75S72 66 91 101" stroke="#81745f" strokeWidth="2"/>
      {[{x:8,y:18,length:204},{x:31,y:49,length:112},{x:53,y:78,length:165},{x:82,y:94,length:90}].map(({x,y,length},i) =>
        <g key={x} className={`canopy-cluster canopy-depth-${i % 2}`} style={{'--pivot':`${x}px ${y}px`,'--sway':`${9 + i * 1.7 + sideIndex}s`,'--delay':`${-i * 3.7 - sideIndex * 5}s`,'--arc':`${1.3 + i * .5}deg`} as CSSProperties}>
          <path d={`M${x} ${y}q7 ${length / 2} 0 ${length}`} stroke="#96a283" strokeWidth=".8"/>
          {Array.from({length:Math.round(length/12)},(_,k) => {
            const t = 1 - k/(length/12), yy=y+12+k*11
            return <g key={k}>
              <ellipse cx={x-5*t} cy={yy} rx={5*t+1} ry={3*t+1} fill={k%3?'#b49bc8':'#9781ad'} transform={`rotate(-32 ${x-5*t} ${yy})`}/>
              <ellipse cx={x+6*t} cy={yy+4} rx={6*t+1} ry={3*t+1} fill={k%2?'#cbb7dd':'#b8a2cd'} transform={`rotate(29 ${x+6*t} ${yy+4})`}/>
            </g>
          })}
        </g>)}
      <path d="M10 20C-3 8-5 33 13 36M36 71C19 51 17 78 38 83M71 91C66 70 47 82 66 96" fill="#a1ae8a"/>
    </svg>)}
    <svg className="canopy-top-line" viewBox="0 0 1440 18" preserveAspectRatio="none"><path d="M0 3Q100 19 190 3T430 4T690 2T940 4T1190 2T1440 3" stroke="#9ca68b" strokeWidth="1" fill="none"/></svg>
  </div>
}

export function GardenAtmosphere({ motionOff }: { motionOff: boolean }) {
  const [available, setAvailable] = useState(false)
  const [quiet, setQuiet] = useState(false)
  const [withinJourney, setWithinJourney] = useState(true)

  useEffect(() => {
    const preference=matchMedia('(prefers-reduced-motion: reduce)')
    let rest:ReturnType<typeof setTimeout> | undefined
    const update=()=>setAvailable(!document.hidden && !preference.matches)
    const focused=()=>document.activeElement?.matches('input,textarea,button,a,summary,[tabindex]:not([tabindex="-1"])') ?? false
    const interrupt=()=>{
      setQuiet(true)
      clearTimeout(rest)
      rest=setTimeout(()=>setQuiet(focused()),7000)
    }
    const focusOut=()=>{
      clearTimeout(rest)
      rest=setTimeout(()=>setQuiet(focused()),4500)
    }
    const footer=document.querySelector('.site-footer')
    const observer=new IntersectionObserver(([entry])=>setWithinJourney(!entry.isIntersecting))
    if(footer)observer.observe(footer)
    const canopy=document.querySelector<HTMLElement>('.top-garland')
    const canopyObserver=new IntersectionObserver(([entry])=>{
      if(canopy)canopy.dataset.paused=String(!entry.isIntersecting)
    })
    if(canopy)canopyObserver.observe(canopy)
    update()
    preference.addEventListener('change',update)
    document.addEventListener('visibilitychange',update)
    document.addEventListener('focusin',interrupt)
    document.addEventListener('focusout',focusOut)
    document.addEventListener('pointerdown',interrupt,{passive:true})
    document.addEventListener('keydown',interrupt)
    return()=>{
      clearTimeout(rest);observer.disconnect();canopyObserver.disconnect()
      preference.removeEventListener('change',update)
      document.removeEventListener('visibilitychange',update)
      document.removeEventListener('focusin',interrupt)
      document.removeEventListener('focusout',focusOut)
      document.removeEventListener('pointerdown',interrupt)
      document.removeEventListener('keydown',interrupt)
    }
  },[])

  const enabled=available&&!motionOff
  return <div className="garden-atmosphere" data-atmosphere-paused={!enabled} data-quiet={quiet} aria-hidden="true">
    <div className="petal-field petal-field-back" data-journey={withinJourney}>
      {petals.map((petal,i)=><span key={i} className={`petal petal-${i}`} style={{left:`${petal.x}%`,'--petal-size':`${petal.size}px`,'--fall-time':`${petal.duration}s`,'--phase':`${petal.delay}s`,'--wind':`${petal.drift}px`,'--petal-opacity':petal.opacity} as CSSProperties}><i/></span>)}
    </div>
    <TopGarland/>
    <div className="petal-field petal-field-front" data-journey={withinJourney}>
      {petals.slice(0,4).map((petal,i)=><span key={i} className="petal" style={{left:i%2?'calc(100% - 12px)':'9px','--petal-size':`${petal.size*.8}px`,'--fall-time':`${petal.duration+7}s`,'--phase':`${petal.delay-8}s`,'--wind':i%2?'-3px':'3px','--petal-opacity':.22} as CSSProperties}><i/></span>)}
    </div>
    <ScrollCompanion enabled={enabled&&!quiet}/>
  </div>
}
