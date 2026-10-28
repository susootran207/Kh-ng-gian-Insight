import { useBotanicalTouch } from './useBotanicalTouch'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { sceneAsset, sceneParts } from './sceneParts'
export function LayeredScene({index,eager,visible,description}:{index:number;eager:boolean;visible:boolean;description:string}){
 const root=useRef<HTMLDivElement>(null);useBotanicalTouch(root,visible)
 const [urls,setUrls]=useState<Record<string,string>>({})
 useEffect(()=>{if(!visible&&!eager)return;let live=true;Promise.all([...new Set(sceneParts[index].map(p=>p.asset))].map(async name=>[name,await sceneAsset(name)])).then(entries=>{if(live)setUrls(Object.fromEntries(entries))});return()=>{live=false}},[index,eager,visible])
 return <div ref={root} data-assets-ready={sceneParts[index].every(p=>Boolean(urls[p.asset]))} className="scene-stage" aria-label={description} role="img">
  <div className="scene-room" aria-hidden="true">
   <div className="scene-backdrop" data-layer="background"/><div className="scene-floor" data-layer="midground"/>
   {index===9&&<svg className="scene-fork" viewBox="0 0 400 400"><path d="M210 405Q195 310 145 250T90 170M210 405Q195 310 250 225T300 155" fill="none" stroke="#f9f0d1" strokeWidth="24" strokeLinecap="round"/></svg>}
   {sceneParts[index].map((part,i)=><div className={`scene-part part-${part.motion}`} data-layer={part.role} data-object={part.asset} key={part.asset+i} style={{left:`${part.x}%`,top:`${part.y}%`,width:`${part.width}%`,'--depth':`${part.depth}px`,'--projection':850/(850-part.depth),'--camera-x':`${part.x-50}cqw`,'--camera-y':`${part.y-50}cqh`,zIndex:100+part.depth,'--factor':part.depth/28,'--phase':`${-i*.7}s`,'--order':i} as CSSProperties}><div className={part.motion==='branch'?'botanical-joint prop-joint':'prop-joint'} data-botanical={part.motion==='branch'?'scene-branch':undefined}><div className="prop-body"><img src={urls[part.asset]} alt="" width="384" height="342" loading={eager?'eager':'lazy'} decoding="async" draggable={false}/></div></div><i className="prop-shadow"/></div>)}
   {index===1&&<div className="water-surface" data-layer="subject"><i className="scene-ripple"/><i className="scene-ripple"/><i className="scene-ripple"/></div>}
   {index===4&&<div className="tea-steam" data-layer="subject"><i/><i/><i/></div>}
   {index===7&&<div className="hourglass-stream" data-layer="subject"/>}
   {index===2&&<div className="connection-glint" data-layer="subject"/>}
   <div className="scene-daylight" data-layer="foreground"/>
  </div>
 </div>
}
