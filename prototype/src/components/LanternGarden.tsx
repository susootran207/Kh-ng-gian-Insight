import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { Arrow } from './Icons'
import { MotionRegion } from './MotionRegion'

type Lantern = {id:number; x:number; drift:number; duration:number}
export function LanternGarden() {
  const [text,setText]=useState('')
  const [lanterns,setLanterns]=useState<Lantern[]>([])
  const [sent,setSent]=useState(false)
  const input=useRef<HTMLTextAreaElement>(null)
  const nextId=useRef(0)
  const timers=useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(()=>{
    const clear=()=>{setText('');if(input.current)input.current.value=''}
    window.addEventListener('pagehide',clear)
    return()=>{window.removeEventListener('pagehide',clear);timers.current.forEach(clearTimeout)}
  },[])
  const release=(e:FormEvent)=>{
    e.preventDefault()
    if(!text.trim()){input.current?.focus();return}
    // Never copy the message into animation data, DOM attributes, URL or storage.
    setText('')
    if(input.current)input.current.value=''
    setSent(true)
    const id=++nextId.current
    setLanterns(previous=>[...previous.slice(-3),{id,x:25+Math.random()*50,drift:(Math.random()-.5)*90,duration:7+Math.random()*2}])
    timers.current.push(setTimeout(()=>setLanterns(items=>items.filter(item=>item.id!==id)),9500))
  }
  return <section id="tam-tinh" className="reflection section-anchor">
    <div className="reflection-copy">
      <h2>Góc tâm tình</h2>
      <p className="reflection-lead">Có một điều<br/>bạn muốn buông xuống?</p>
      <p>Không cần viết hay. Không cần kể hết.<br className="desktop-break"/> Chỉ một điều bạn muốn đặt xuống lúc này.</p>
      <form onSubmit={release} autoComplete="off">
        <label htmlFor="reflection">Điều bạn muốn gửi theo ánh đèn</label>
        <textarea ref={input} id="reflection" name="reflection" value={text} onChange={e=>{setText(e.target.value);setSent(false)}} rows={3} maxLength={500} placeholder="Ở đây, bạn có thể viết cho riêng mình…" aria-describedby="reflection-privacy" spellCheck={false} autoComplete="off"/>
        <div className="reflection-actions"><button type="submit" className="button gold-button" disabled={!text.trim()}>Thả một ngọn đèn <Arrow/></button><span className="character-count" aria-hidden="true">{text.length}/500</span></div>
      </form>
      <p id="reflection-privacy" className="privacy-note">Chỉ ở trong phiên này. Không gửi cho ai, không lưu lại. Nội dung được xóa khi bạn thả đèn hoặc rời trang.</p>
      <p className="release-status" role="status">{sent?'Bạn vừa dành một khoảng dừng cho mình. Có thể ngồi lại đây thêm một chút.':''}</p>
    </div>
    <MotionRegion className="lantern-sky">
      <div className="moon" aria-hidden="true"/>
      <div className="sky-stars" aria-hidden="true">{Array.from({length:19},(_,i)=><i key={i} style={{left:`${(i*37+11)%96}%`,top:`${(i*19+8)%65}%`,opacity:.2+(i%4)*.15}}/>)}</div>
      <div className="distant-lantern distant-one" aria-hidden="true"><Lantern/></div><div className="distant-lantern distant-two" aria-hidden="true"><Lantern/></div><div className="distant-lantern distant-three" aria-hidden="true"><Lantern/></div>
      <div className="released-lanterns" aria-hidden="true">{lanterns.map(lantern=><div key={lantern.id} className="released-lantern" style={{left:`${lantern.x}%`,'--drift':`${lantern.drift}px`,'--flight':`${lantern.duration}s`} as CSSProperties}><Lantern/></div>)}</div>
      <svg className="night-plants" viewBox="0 0 500 140" preserveAspectRatio="none" aria-hidden="true"><path d="M0 140V54q31-42 43 13 27-33 48 18 23-48 43 5 26-40 46 17 35-29 65 7 32-36 52-8 39-57 53-14 19-71 51-22 26-58 43-5 31-46 56-14v89Z" fill="#283c35"/><path d="M0 140V102q40-41 67 4 43-35 67 16 49-31 86 2 44-26 69 5 59-49 91-20 42-41 72-12 29-19 48-7v50Z" fill="#20352f"/></svg>
      <p className="sky-caption">Một ánh đèn nhỏ.<br/><span>Một khoảng trời rộng.</span></p>
    </MotionRegion>
  </section>
}
function Lantern(){return <svg viewBox="0 0 54 76" aria-hidden="true"><path d="M7 12Q27 1 47 12L43 54Q27 65 11 54Z" fill="#e8bd74"/><path d="M18 9q-5 24 0 48m18-48q5 24 0 48" fill="none" stroke="#f6d99c" strokeWidth="1"/><path d="M8 12q19 7 38 0M11 54q16-5 32 0" fill="none" stroke="#be9154" strokeWidth="2"/><ellipse cx="27" cy="55" rx="14" ry="4" fill="#b48549"/><path d="M23 55q-2-11 4-16 6 7 4 16" fill="#ffedbb"/></svg>}
