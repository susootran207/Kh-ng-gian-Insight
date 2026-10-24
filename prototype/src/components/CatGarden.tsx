import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { MotionRegion } from './MotionRegion'
import { Wisteria } from './Wisteria'

type Point = { x: number; y: number }
const phrases = ['Meo. Mình ngồi cùng bạn nhé.', 'Một ngụm nước, một khoảng nghỉ.', 'Bạn cứ đọc. Mình ở đây.', 'Hôm nay, đi chậm một chút cũng được.']
const expressions = ['curious', 'happy', 'sleepy', 'wink']

function CatArt({ expression, dragging }: { expression: string; dragging: boolean }) {
  return <svg viewBox="0 0 160 155" className={`cat-art ${expression} ${dragging ? 'being-carried' : ''}`} aria-hidden="true">
    <ellipse cx="79" cy="143" rx="51" ry="5" fill="#5f6550" opacity=".14"/>
    <path className="cat-tail" d="M111 128c35 13 42-21 26-32" fill="none" stroke="#c8ac85" strokeWidth="14" strokeLinecap="round"/>
    <path d="M41 134c-5-17 0-59 28-65 28-7 48 23 45 65Z" fill="#c8ac85"/>
    <path d="M62 135c-5-17 1-42 14-44 17-2 23 28 19 44" fill="#eee0c4"/>
    <path d="m37 55 2-35 26 18m32 1 25-19-2 38" fill="#c8ac85"/>
    <path d="m43 44 1-15 14 12m45 0 13-12-1 18" fill="#d4b5aa"/>
    <path d="M34 60c-2-23 19-30 43-30 27 0 47 13 47 34 0 23-19 34-45 33-28 0-44-14-45-37" fill="#dcc3a0"/>
    <path d="m68 32 4 13m9-14v13m9-12-3 12" stroke="#b19470" strokeWidth="4" strokeLinecap="round"/>
    <g className="cat-eyes" fill="none" stroke="#484a3b" strokeWidth="2.6" strokeLinecap="round">
      {expression==='happy' || expression==='sleepy' ? <><path d="M52 62q6-7 12 0m29 0q6-7 12 0"/></> : <><ellipse cx="59" cy="61" rx="3" ry={dragging?6:4.5} fill="#484a3b"/>{expression==='wink'?<path d="M94 62q6 5 12-1"/>:<ellipse cx="99" cy="61" rx="3" ry={dragging?6:4.5} fill="#484a3b"/>}</>}
    </g>
    <path d="m74 71 5 5 5-5Z" fill="#af7e77"/><path d="M79 76v4m0 0q-5 5-9 0m9 0q5 5 9 0" fill="none" stroke="#665b4b" strokeWidth="1.5" strokeLinecap="round"/>
    <g stroke="#a88e72" strokeWidth="1" strokeLinecap="round"><path d="m45 75-18-3m20 8-20 3m85-8 18-3m-20 8 20 3"/></g>
    <path d="M44 137h22m25 0h21" stroke="#ae906e" strokeWidth="3" strokeLinecap="round"/>
  </svg>
}

export function CatGarden() {
  const boundary = useRef<HTMLDivElement>(null)
  const catButton = useRef<HTMLButtonElement>(null)
  const gesture = useRef<{id:number; start:Point; origin:Point; moved:boolean} | null>(null)
  const suppressClick = useRef(false)
  const [point, setPoint] = useState<Point>({x:0,y:0})
  const [dragging, setDragging] = useState(false)
  const [moving, setMoving] = useState(false)
  const [expression, setExpression] = useState(0)
  const [message, setMessage] = useState('Mình là Mây. Chạm để làm quen nhé.')

  const clamp = (p:Point):Point => {
    const b=boundary.current, c=catButton.current
    if(!b || !c) return p
    return {x:Math.max(0,Math.min(p.x,b.clientWidth-c.offsetWidth)),y:Math.max(0,Math.min(p.y,b.clientHeight-c.offsetHeight))}
  }
  const reset = () => {
    const b=boundary.current,c=catButton.current
    if(b&&c) setPoint({x:(b.clientWidth-c.offsetWidth)*.57,y:Math.max(0,b.clientHeight-c.offsetHeight-7)})
    setMoving(false)
  }
  useEffect(()=>{
    reset()
    const resize=new ResizeObserver(()=>setPoint(p=>clamp(p)))
    if(boundary.current)resize.observe(boundary.current)
    return()=>resize.disconnect()
  },[])
  const greet=()=>{
    if(suppressClick.current){suppressClick.current=false;return}
    setExpression(e=>(e+1)%expressions.length)
    setMessage(phrases[expression%phrases.length])
  }
  const down=(e:PointerEvent<HTMLButtonElement>)=>{
    if(!e.isPrimary || e.button!==0)return
    suppressClick.current=false
    e.currentTarget.focus({preventScroll:true})
    e.currentTarget.setPointerCapture(e.pointerId)
    gesture.current={id:e.pointerId,start:{x:e.clientX,y:e.clientY},origin:point,moved:false}
  }
  const move=(e:PointerEvent<HTMLButtonElement>)=>{
    const g=gesture.current
    if(!g || g.id!==e.pointerId)return
    const dx=e.clientX-g.start.x,dy=e.clientY-g.start.y
    if(Math.hypot(dx,dy)>5)g.moved=true
    if(g.moved){setDragging(true);setPoint(clamp({x:g.origin.x+dx,y:g.origin.y+dy}))}
  }
  const end=(e:PointerEvent<HTMLButtonElement>)=>{
    const g=gesture.current
    if(!g || g.id!==e.pointerId)return
    suppressClick.current=g.moved
    gesture.current=null
    setDragging(false)
    if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId)
    if(g.moved)setMessage('Mây đã tìm được một chỗ ngồi mới.')
  }
  const key=(e:KeyboardEvent<HTMLButtonElement>)=>{
    if(e.key==='Escape'){setMoving(false);return}
    if(e.key==='Home' && moving){e.preventDefault();reset();return}
    if(!moving || !['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return
    e.preventDefault()
    const step=e.shiftKey?24:12
    setPoint(p=>clamp({x:p.x+(e.key==='ArrowRight'?step:e.key==='ArrowLeft'?-step:0),y:p.y+(e.key==='ArrowDown'?step:e.key==='ArrowUp'?-step:0)}))
  }
  return <div className="garden-wrap">
    <MotionRegion className="garden-art">
      <div className="botanical-art" role="img" aria-label="Giàn tử đằng tím trên lối vườn ngập nắng"/>
      <Wisteria/>
      <div ref={boundary} className="cat-boundary" aria-label="Khoảng vườn của Mây">
        <button ref={catButton} className="cat" aria-label="Mây, chú mèo trong vườn. Chạm để đổi biểu cảm" aria-describedby="cat-help" style={{transform:`translate(${point.x}px, ${point.y}px)`}} onPointerDown={down} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={()=>{gesture.current=null;setDragging(false)}} onClick={greet} onKeyDown={key}>
          <CatArt expression={expressions[expression]} dragging={dragging}/>
        </button>
      </div>
      <div className="garden-caption"><span className="little-dot"/> Một khoảng vườn, một người bạn.</div>
    </MotionRegion>
    <div className="cat-companion">
      <p className="cat-message" role="status">{message}</p>
      <div className="cat-tools"><button className="text-button" aria-pressed={moving} onClick={()=>{setMoving(m=>!m);catButton.current?.focus({preventScroll:true})}}>{moving?'Dừng di chuyển':'Di chuyển bằng phím'}<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 12h18M7 8l-4 4 4 4m10-8 4 4-4 4"/></svg></button><button className="text-button" onClick={reset}>Về chỗ cũ</button></div>
      <p id="cat-help" className="cat-help">Kéo Mây bằng chuột hoặc cảm ứng. Bật di chuyển để dùng phím mũi tên; Esc để dừng.</p>
    </div>
  </div>
}
