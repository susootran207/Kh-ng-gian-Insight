import { useGardenMotion } from './GardenMotion'
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { MotionRegion } from './MotionRegion'
import { Wisteria } from './Wisteria'
import { CatArt } from './CatArt'

type Point = { x: number; y: number }
const phrases = ['Meo. Mình ngồi cùng bạn nhé.', 'Một ngụm nước, một khoảng nghỉ.', 'Bạn cứ đọc. Mình ở đây.', 'Hôm nay, đi chậm một chút cũng được.']
const expressions = ['curious', 'happy', 'sleepy', 'wink']


export function CatGarden() {
  const boundary = useRef<HTMLDivElement>(null)
  const catButton = useRef<HTMLButtonElement>(null)
  const gesture = useRef<{id:number; start:Point; origin:Point; moved:boolean} | null>(null)
  const suppressClick = useRef(false)
  const {allowed}=useGardenMotion()
  const [inGarden,setInGarden]=useState(true)
  const [action,setAction]=useState('rest')
  const actionTimer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined)
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
  useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>setInGarden(entry.isIntersecting),{threshold:.2})
    if(boundary.current)observer.observe(boundary.current)
    return()=>observer.disconnect()
  },[])
  useEffect(()=>{
    if(!allowed||!inGarden||dragging||moving){setAction('rest');return}
    let timer:ReturnType<typeof setTimeout>,end:ReturnType<typeof setTimeout>
    const wander=()=>{
      const button=catButton.current,b=boundary.current
      if(button&&b&&!button.matches(':hover,:focus')&&!gesture.current){
        setAction('walk')
        setPoint(p=>clamp({x:p.x>b.clientWidth*.45?b.clientWidth*.08:b.clientWidth-button.offsetWidth-14,y:Math.max(0,b.clientHeight-button.offsetHeight-(Math.random()*34+5))}))
        end=setTimeout(()=>setAction(Math.random()>.5?'look':'stretch'),3000)
      }
      timer=setTimeout(wander,14000+Math.random()*9000)
    }
    timer=setTimeout(wander,5000)
    return()=>{clearTimeout(timer);clearTimeout(end)}
  },[allowed,inGarden,dragging,moving])
  useEffect(()=>()=>clearTimeout(actionTimer.current),[])
  const greet=()=>{
    if(suppressClick.current){suppressClick.current=false;return}
    clearTimeout(actionTimer.current)
    setAction(['wave','happy','stretch','look'][expression%4])
    actionTimer.current=setTimeout(()=>setAction('rest'),2100)
    setExpression(e=>(e+1)%expressions.length)
    setMessage(phrases[expression%phrases.length])
  }
  const down=(e:PointerEvent<HTMLButtonElement>)=>{
    if(!e.isPrimary || e.button!==0)return
    suppressClick.current=false
    setAction('rest')
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
        <button ref={catButton} className="cat" data-action={action} data-dragging={dragging} data-keyboard={moving} aria-label="Mây, chú mèo trong vườn. Chạm để đổi biểu cảm" aria-describedby="cat-help" style={{transform:`translate(${point.x}px, ${point.y}px)`}} onPointerDown={down} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={()=>{gesture.current=null;setDragging(false)}} onClick={greet} onKeyDown={key}>
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
