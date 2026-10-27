import { useEffect, useRef, useState } from 'react'
import { SmallFlower } from './Icons'
import { quotes } from '../content'
import { useGardenMotion } from './GardenMotion'
export function HeroMessage(){
 const [quote,setQuote]=useState<number|null>(null),[turn,setTurn]=useState(0),[changing,setChanging]=useState(false),timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined),{allowed}=useGardenMotion()
 useEffect(()=>()=>clearTimeout(timer.current),[])
 const change=()=>{if(changing)return;setChanging(true);setTurn(t=>t+1);timer.current=setTimeout(()=>{setQuote(old=>old===null?Math.floor(Math.random()*quotes.length):(old+1+Math.floor(Math.random()*(quotes.length-1)))%quotes.length);setChanging(false)},allowed?240:0)}
 return <div className="hero-note interactive-message" data-changing={changing}><button className="message-flower" aria-label="Nở một lời nhắn khác" onClick={change} aria-controls="hero-message"><span key={turn} className={turn?'flower-response':''}><SmallFlower/></span></button><div className="hero-message-frame"><p id="hero-message" aria-live="polite" aria-atomic="true" key={quote??'default'}>{quote===null?<>Không cần phải ổn mọi lúc.<br/><span>Ở đây, cứ là bạn thôi.</span></>:quotes[quote]}</p><span className="message-invitation">Chạm vào hoa để nhận một lời nhắn khác</span></div></div>
}
