import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
const MotionContext=createContext({motionOff:false,reduced:false,hidden:false,allowed:false,toggle:()=>{}})
// Ephemeral preference, shared across routes. No storage, cookies or network.
export function GardenMotion({children}:{children:ReactNode}){
 const [motionOff,setMotionOff]=useState(false),[reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches),[hidden,setHidden]=useState(document.hidden)
 useEffect(()=>{const query=matchMedia('(prefers-reduced-motion: reduce)'),change=()=>setReduced(query.matches),visibility=()=>setHidden(document.hidden);query.addEventListener('change',change);document.addEventListener('visibilitychange',visibility);return()=>{query.removeEventListener('change',change);document.removeEventListener('visibilitychange',visibility)}},[])
 useEffect(()=>{document.documentElement.dataset.motion=motionOff||reduced?'off':'on';document.documentElement.dataset.documentHidden=String(hidden);return()=>{delete document.documentElement.dataset.motion;delete document.documentElement.dataset.documentHidden}},[motionOff,reduced,hidden])
 return <MotionContext.Provider value={{motionOff,reduced,hidden,allowed:!motionOff&&!reduced&&!hidden,toggle:()=>setMotionOff(v=>!v)}}>{children}</MotionContext.Provider>
}
export const useGardenMotion=()=>useContext(MotionContext)
