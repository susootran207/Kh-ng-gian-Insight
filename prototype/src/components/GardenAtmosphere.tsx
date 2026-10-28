import { useEffect, useState, type CSSProperties } from 'react'
import { TopCanopy } from './TopCanopy'

// Bounded, deterministic distribution. Negative phases avoid a synchronized start;
// no per-frame JS, particle creation loop, network request, or canvas.
const petals = Array.from({ length: 18 }, (_, i) => ({
  x: 4 + ((i * 37) % 92),
  size: 7 + (i * 7) % 8,
  duration: 12 + (i * 11) % 12,
  delay: -((i * 13 + 3) % 41),
  drift: (i % 2 ? -1 : 1) * (22 + (i * 17) % 68),
  opacity: .30 + (i % 4) * .055,
}))


export function GardenAtmosphere({ motionOff }: { motionOff: boolean }) {
  const [available, setAvailable] = useState(false)
  const [quiet, setQuiet] = useState(false)
  const [lowPower]=useState(()=>navigator.hardwareConcurrency<=4 || ((navigator as Navigator & {deviceMemory?:number;connection?:{saveData?:boolean}}).deviceMemory??8)<=4 || Boolean((navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData))
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

    document.addEventListener('keydown',interrupt)
    return()=>{
      clearTimeout(rest);observer.disconnect();canopyObserver.disconnect()
      preference.removeEventListener('change',update)
      document.removeEventListener('visibilitychange',update)
      document.removeEventListener('focusin',interrupt)
      document.removeEventListener('focusout',focusOut)

      document.removeEventListener('keydown',interrupt)
    }
  },[])

  const enabled=available&&!motionOff
  return <div className="garden-atmosphere" data-atmosphere-paused={!enabled} data-quiet={quiet && Boolean(document.activeElement?.matches('input,textarea'))} data-low-power={lowPower} aria-hidden="true">
    <div className="petal-field petal-field-back" data-journey={withinJourney}>
      {petals.map((petal,i)=><span key={i} className={`petal petal-${i}`} style={{left:`${petal.x}%`,'--petal-size':`${petal.size}px`,'--fall-time':`${petal.duration}s`,'--phase':`${petal.delay}s`,'--wind':`${petal.drift}px`,'--petal-opacity':petal.opacity} as CSSProperties}><i/></span>)}
    </div>
    <TopCanopy/>
    <div className="petal-field petal-field-front" data-journey={withinJourney}>
      {petals.slice(0,4).map((petal,i)=><span key={i} className="petal" style={{left:`${18+i*23}%`,'--petal-size':`${petal.size*.8}px`,'--fall-time':`${petal.duration+7}s`,'--phase':`${petal.delay-8}s`,'--wind':i%2?'-80px':'80px','--petal-opacity':.34} as CSSProperties}><i/></span>)}
    </div>
  </div>
}
