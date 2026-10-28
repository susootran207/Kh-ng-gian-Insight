import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useGardenMotion } from './GardenMotion'
// New generated editorial art; separate from the 29 original academic SVGs.
export const gardenArtDescriptions=[
 'Cổng vườn mở và một cây non bên lối đi, gợi một khởi đầu mới.',
 'Ba viên đá khác màu trong làn nước gợn nhẹ, gợi việc nhận ra và gọi tên cảm xúc.',
 'Hai chậu hoa có khoảng cách riêng, nối bằng dải lụa mềm, gợi tình bạn và ranh giới.',
 'Hai chiếc ghế hướng về nhau dưới cành tử đằng, gợi một khoảng lắng nghe.',
 'Tách trà, chiếc gối và vầng trăng dịu, gợi nhịp nghỉ ngơi giữa ngày học.',
 'Cuốn sổ mở với ba chiếc lá và một cây bút, gợi từng bước trong việc học.',
 'Điện thoại úp xuống cạnh cành lá, gợi một khoảng dành lại cho sự chú ý.',
 'Cuốn sổ tím, bút chì và đồng hồ cát, gợi sự chuẩn bị trước mùa kiểm tra.',
 'Trang giấy không chữ và cây non trong chiếc chậu được sửa, gợi việc tiếp tục sau phản hồi.',
 'Lối đi tách hướng giữa đồng hoa, gợi những khả năng để khám phá tương lai.',
]
const rituals=['Mở lối vào vườn','Chạm mặt nước','Nối một khoảng gần','Dành một chỗ ngồi','Thở cùng tách trà','Gom những chiếc lá','Đặt sự chú ý xuống','Cho thời gian chảy','Chăm một mầm xanh','Chọn một lối đi']
const responses=['Một khởi đầu vừa mở.','Gợn nước lan ra, rồi lắng lại.','Gần nhau, vẫn có khoảng riêng.','Một chỗ ngồi để lắng nghe.','Hít vào. Thở ra. Chậm một nhịp.','Từng bước nhỏ cũng thành một trang.','Một khoảng yên cho sự chú ý.','Từng hạt, từng việc, từng lúc.','Mầm xanh có thể lớn thêm.','Có nhiều hơn một lối để đi.']
export function GardenIllustration({index=0,className='',eager=false}:{index?:number;className?:string;eager?:boolean}){
 const cell=Math.max(0,Math.min(9,index)),{allowed}=useGardenMotion(),root=useRef<HTMLDivElement>(null)
 const [context,setContext]=useState('garden'),[active,setActive]=useState(false),[visible,setVisible]=useState(false),timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined)
 useEffect(()=>{const el=root.current;setContext(el?.closest('.reader-cover')?'reader':el?.closest('.flow-chapter-art,.season-art')?'journey':el?.closest('.editorial-card')?'library':el?.closest('.topic-detail-art,.topic-garden')?'topic':'garden');const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{rootMargin:'30px'});if(root.current)observer.observe(root.current);return()=>{observer.disconnect();clearTimeout(timer.current)}},[])
 const play=()=>{clearTimeout(timer.current);setActive(v=>!v);timer.current=setTimeout(()=>setActive(false),7000)}
 return <div ref={root} className={'garden-illustration living-scene '+className} data-scene={cell} data-context={context} data-playing={visible&&allowed} data-awake={active} style={{'--art-tone':cell%2?'var(--lilac-light)':'var(--sage)'} as CSSProperties} onClick={event=>{if(!(event.target as Element).closest('button'))play()}} onPointerMove={event=>{if(!allowed||event.pointerType!=='mouse')return;const b=event.currentTarget.getBoundingClientRect();event.currentTarget.style.setProperty('--scene-x',`${((event.clientX-b.left)/b.width-.5)*24}px`);event.currentTarget.style.setProperty('--scene-y',`${((event.clientY-b.top)/b.height-.5)*18}px`)}} onPointerLeave={()=>{root.current?.style.setProperty('--scene-x','0px');root.current?.style.setProperty('--scene-y','0px')}}>
  <img src={`${import.meta.env.BASE_URL}illustrations/garden-${String(cell+1).padStart(2,'0')}.webp`} alt={gardenArtDescriptions[cell]} width="396" height="396" draggable={false} loading={eager?'eager':'lazy'} decoding="async"/>
  <div className="scene-light" aria-hidden="true"/>
  <svg className="scene-world" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
   {cell===0&&<g className="scene-gate"><path d="M150 340Q195 210 230 130L270 130Q220 230 190 350Z" fill="#fff1bb" opacity=".45"/>{[0,1,2,3].map(i=><path key={i} className="scene-trail" d={`M${190+i*8} 340Q${130+i*28} 250 ${225+i*5} 110`} stroke="#fff7d5" strokeWidth="2" fill="none"/>)}</g>}
   {cell===1&&<g className="scene-water">{[0,1,2].map(i=><ellipse key={i} className="scene-ripple" cx="185" cy="190" rx="55" ry="23" style={{animationDelay:`${i*.8}s`}}/>)}</g>}
   {cell===2&&<g className="scene-ribbon"><path d="M105 235Q200 315 295 232" fill="none" stroke="#a987b6" strokeWidth="5"/><path d="M105 235Q200 275 295 232" fill="none" stroke="#d6b9de" strokeWidth="3"/>{[110,290].map(x=><circle key={x} cx={x} cy="232" r="8" fill="#f5e5a3"/>)}</g>}
   {cell===3&&<g className="scene-listen">{[0,1,2].map(i=><path key={i} d={`M${160+i*16} ${190-i*12}q${18+i*8} 24 0 48`} stroke="#ad8fb9" strokeWidth="2" fill="none"/>)}</g>}
   {cell===4&&<g className="scene-steam">{[0,1,2].map(i=><path key={i} d={`M${100+i*20} 180q-22-25 0-46t0-38`} fill="none" stroke="#fffaf0" strokeWidth="5" style={{animationDelay:`${i*-.8}s`}}/>)}</g>}
   {cell===5&&<g className="scene-page">{[0,1,2].map(i=><path key={i} className="scene-note" d={`M${100+i*16} ${240+i*20}l${112-i*10}-30`} stroke="#80946b" strokeWidth="2" style={{animationDelay:`${i*.3}s`}}/>)}</g>}
   {cell===6&&<g className="scene-attention">{[0,1,2,3,4].map(i=><circle key={i} cx={105+i*40} cy={105+(i%2)*30} r={4+i%3} fill="#a28bb1" style={{animationDelay:`${-i*.5}s`}}/>)}</g>}
   {cell===7&&<g className="scene-sand"><path d="M306 150v65" stroke="#c9a361" strokeWidth="2" strokeDasharray="2 6"/><path d="M290 229l16-20 17 20Z" fill="#d4b577"/>{[0,1,2].map(i=><circle key={i} cx={306+i*3} cy={175+i*14} r="2" fill="#ad854b"/>)}</g>}
   {cell===8&&<g className="scene-growth"><path d="M280 239q-5-43 7-77" stroke="#6e8753" strokeWidth="3" fill="none"/><path className="scene-new-leaf" d="M284 202q-40-27-34-43 40 0 34 43m1-9q36-39 50-25-9 32-50 25" fill="#8fa872"/></g>}
   {cell===9&&<g className="scene-path"><path d={active?'M200 390Q170 300 215 250T300 150':'M200 390Q200 300 150 250T95 150'} stroke="#fff1bd" strokeWidth="7" fill="none"/><circle className="scene-destination" cx={active?300:95} cy="150" r="11" fill="#f3d789"/></g>}
   <g className="scene-foreground">{[0,1,2,3,4].map(i=><ellipse key={i} cx={35+i*77} cy={55+(i%3)*92} rx="4" ry="8" fill={i%2?'#a98abb':'#d6bcdf'} transform={`rotate(${i*37} ${35+i*77} ${55+(i%3)*92})`} />)}</g>
  </svg>
  <button type="button" className="scene-trigger" aria-label={rituals[cell]} aria-pressed={active} onClick={play}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16M4 12h16M6 6l12 12M6 18 18 6" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg><span>{rituals[cell]}</span></button>
  <span className="scene-response" role="status">{active?responses[cell]:''}</span>
 </div>
}
