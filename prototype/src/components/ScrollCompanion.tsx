import { useEffect, useRef } from 'react'
import { CatArt } from './CatArt'

type Action = 'wave' | 'look' | 'run' | 'peek'
type Dock = {x:number; y:number; width:number; section:string}
const protectedSelectors='h1,h2,h3,p,blockquote,button,a,input,textarea,label,summary,.weekly-art,.reading-layout,.season-panel,.garden-wrap,.sample-preview,.weekly-excerpt'

// The character only borrows existing empty bottom padding. Validate the entire
// travel corridor (not just its starting point) against actual rendered content.
function findDock(): Dock | null {
  if(document.querySelector('.navigation.open,#sample-preview,#weekly-excerpt'))return null
  const hero=document.querySelector('.garden-wrap')?.getBoundingClientRect()
  if(hero && hero.bottom>0 && hero.top<innerHeight)return null
  const mobile=innerWidth<700, size=mobile?49:65, corridor=mobile?92:156
  const sections=['chuyen-de','nen-tang','dong-chay','bai-viet','tam-tinh']
    .map(id=>document.getElementById(id))
    .filter((section): section is HTMLElement=>section!==null)
    .sort((a,b)=>Math.abs(a.getBoundingClientRect().bottom-(innerHeight-110))-Math.abs(b.getBoundingClientRect().bottom-(innerHeight-110)))
  for(const section of sections){
    const box=section.getBoundingClientRect(), y=box.bottom-size-8
    if(y<70 || y+size>innerHeight-14)continue
    const gutter=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gutter'))||24
    for(const x of [box.right-gutter-corridor,box.left+gutter,(box.left+box.right-corridor)/2]){
      if(x<8 || x+corridor>innerWidth-8)continue
      const collision=Array.from(section.querySelectorAll(protectedSelectors)).some(el=>{
        const r=el.getBoundingClientRect()
        return r.width>0 && r.height>0 && x<r.right+8 && x+corridor>r.left-8 && y<r.bottom+6 && y+size>r.top-6
      })
      if(!collision)return {x,y:y+scrollY,width:corridor,section:section.id}
    }
  }
  return null
}

export function ScrollCompanion({enabled}:{enabled:boolean}) {
  const stage=useRef<HTMLDivElement>(null)
  const character=useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const el=stage.current,cat=character.current
    if(!el||!cat)return
    el.dataset.visible='false'
    el.dataset.active='false'
    if(!enabled)return
    const compact=matchMedia('(max-width: 699px)')
    let timer:ReturnType<typeof setTimeout>, end:ReturnType<typeof setTimeout>
    let lastScroll=performance.now(), previous:Action|null=null
    let current:Dock|null=null
    const hide=()=>{el.dataset.visible='false';el.dataset.active='false';current=null}
    const schedule=(first=false)=>{
      const delay=first?(compact.matches?14000:6500):compact.matches?42000+Math.random()*16000:20000+Math.random()*12000
      timer=setTimeout(visit,delay)
    }
    const visit=()=>{
      if(performance.now()-lastScroll<650){timer=setTimeout(visit,1000);return}
      const dock=findDock()
      if(!dock){timer=setTimeout(visit,2200);return}
      const choices:Action[]=compact.matches?['wave','look','peek']:['wave','look','run','peek']
      const actions=choices.filter(action=>action!==previous)
      const action=actions[Math.floor(Math.random()*actions.length)]
      previous=action;current=dock
      el.dataset.safe='true'
      el.style.transform=`translate3d(${dock.x}px,${dock.y}px,0)`
      el.style.width=`${dock.width}px`
      el.dataset.section=dock.section
      cat.dataset.action=action
      el.dataset.active='true'
      el.dataset.visible='true'
      end=setTimeout(()=>{hide();schedule()},compact.matches?4800:6800)
    }
    const scroll=()=>{
      lastScroll=performance.now()
      if(current){
        const hero=document.querySelector('.garden-wrap')?.getBoundingClientRect()
        if(hero && hero.bottom>0 && hero.top<innerHeight){el.dataset.safe='false';hide();return}
        // Absolute positioning follows the document naturally: no lagging overlay
        // crosses text as the user scrolls. Actions don't restart on scroll.
        const screenY=current.y-scrollY
        if(screenY<-80 || screenY>innerHeight+30)hide()
      }
    }
    const resize=()=>{el.dataset.safe='false';hide();clearTimeout(end);clearTimeout(timer);schedule()}
    // Any layout expansion invalidates the cached safe corridor immediately.
    const observer=new ResizeObserver(()=>{if(current){el.dataset.safe='false';hide()}})
    document.querySelectorAll('main>section').forEach(section=>observer.observe(section))
    window.addEventListener('scroll',scroll,{passive:true})
    window.addEventListener('resize',resize,{passive:true})
    schedule(true)
    return()=>{hide();clearTimeout(timer);clearTimeout(end);observer.disconnect();window.removeEventListener('scroll',scroll);window.removeEventListener('resize',resize)}
  },[enabled])

  return <div className="companion-stage" aria-hidden="true"><div ref={stage} className="scroll-companion" data-visible="false" data-active="false"><div className="companion-mask"><div ref={character} className="companion-character" data-action="look"><CatArt expression="curious" dragging={false}/></div></div></div></div>
}
