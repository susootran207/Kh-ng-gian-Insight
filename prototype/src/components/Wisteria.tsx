import type { CSSProperties } from 'react'

// Crisp vector petal geometry overlays the locally packaged botanical artwork.
// Each cluster pivots around its own attachment, with bounded, offset rhythms.
export function Wisteria() {
  return <svg className="wisteria" viewBox="0 0 680 470" fill="none" aria-hidden="true">
    <path d="M674 16C552 89 428 9 326 52 242 88 133 12 35 30" stroke="#74694e" strokeWidth="4" strokeLinecap="round"/>
    {[{x:80,y:32,l:112},{x:145,y:36,l:177},{x:224,y:57,l:140},{x:302,y:57,l:218},{x:380,y:41,l:166},{x:454,y:48,l:255},{x:535,y:53,l:182},{x:596,y:44,l:244}].map(({x,y,l},i)=><g key={x} className={`flower-cluster layer-${i%3}`} style={{'--pivot':`${x}px ${y}px`,'--sway':`${6.4+i*.53}s`,'--delay':`${-i*1.71}s`} as CSSProperties}>
      <path d={`M${x} ${y}q12 ${l*.45} 0 ${l}`} stroke="#8f9d78" strokeWidth="1.1"/>
      {Array.from({length:Math.round(l/13)},(_,k)=>{
        const taper = 1-k/(l/13), yy=y+10+k*12
        return <g key={k} className="living-petals" style={{transformOrigin:`${x}px ${y}px`,'--petal-lag':`${-k*.73-i*.4}s`} as CSSProperties} opacity={.78+(i%3)*.1}>
          <ellipse cx={x-9*taper} cy={yy} rx={10*taper+1.5} ry={5.4*taper+1.8} fill={k%3===0?'#9e83b5':'#bba3d1'} transform={`rotate(-28 ${x-9*taper} ${yy})`}/>
          <ellipse cx={x+10*taper} cy={yy+5} rx={10*taper+1.3} ry={5.1*taper+1.6} fill={k%3===1?'#d6c6e3':'#c9b4da'} transform={`rotate(30 ${x+10*taper} ${yy+5})`}/>
        </g>
      })}
    </g>)}
    {[50,175,265,405,505,625].map((x,i)=><g key={x} className="leaf-sway" style={{animationDelay:`${-i*1.2}s`,transformOrigin:`${x}px 36px`}}>
      <path d={`M${x} 36q-23 -30 -45 -19 5 29 45 19M${x} 36q18-34 42-26-1 29-42 26`} fill={i%2?'#8e9e79':'#a5b290'}/>
      <path d={`m${x-37} 19 37 17 34-23`} stroke="#758364" strokeWidth=".8"/>
    </g>)}
  </svg>
}
