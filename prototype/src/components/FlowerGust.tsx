import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useGardenMotion } from './GardenMotion'
export function FlowerGust(){
 const {allowed}=useGardenMotion(),[gust,setGust]=useState(0),timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined)
 useEffect(()=>()=>clearTimeout(timer.current),[])
 return <div className="flower-ritual" data-gust={Boolean(gust)}><button className="flower-gust-button" onClick={()=>{clearTimeout(timer.current);setGust(v=>v+1);timer.current=setTimeout(()=>setGust(0),3600)}}>Gọi một làn gió <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8h12q7-7 5-1-1 3-5 3H6m-3 4h15q5 0 3 4-2 3-5-1M3 19h7" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg></button>{gust>0&&<><span className="reader-sr-only" role="status">Một làn gió vừa ghé qua giàn hoa.</span><div key={gust} className="flower-burst" data-animated={allowed} aria-hidden="true">{Array.from({length:14},(_,i)=><i key={i} style={{left:`${8+i*6}%`,'--gust-delay':`${i*.055}s`,'--gust-drift':`${(i%2?-1:1)*(25+i*5)}px`,'--gust-turn':`${i*35}deg`} as CSSProperties}/>)}</div></> }</div>
}
