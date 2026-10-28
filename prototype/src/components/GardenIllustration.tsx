import { LayeredScene } from './LayeredScene'
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
 const [phase,setPhase]=useState('rest'),[context,setContext]=useState('garden'),[active,setActive]=useState(false),[visible,setVisible]=useState(false),timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined),settleTimer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined)
 useEffect(()=>{const el=root.current;setContext(el?.closest('.reader-cover')?'reader':el?.closest('.flow-chapter-art,.season-art')?'journey':el?.closest('.editorial-card')?'library':el?.closest('.topic-detail-art,.topic-garden')?'topic':'garden');const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{rootMargin:'30px'});if(root.current)observer.observe(root.current);return()=>{observer.disconnect();clearTimeout(timer.current);clearTimeout(settleTimer.current)}},[])
 const settle=()=>{setPhase('settling');clearTimeout(settleTimer.current);settleTimer.current=setTimeout(()=>{setPhase('rest');root.current?.style.setProperty('--scene-x','0px');root.current?.style.setProperty('--scene-y','0px')},1600)}
 const play=()=>{clearTimeout(timer.current);const next=!active;setActive(next);if(!next){settle();return}setPhase('interacting');timer.current=setTimeout(()=>{setActive(false);setPhase('settling');timer.current=setTimeout(()=>setPhase('rest'),1600)},7000)}
 return <div ref={root} className={'garden-illustration living-scene '+className} data-scene={cell} data-phase={phase} data-renderer="layered-2.5d" data-context={context} data-playing={visible&&allowed} data-awake={active} style={{'--art-tone':cell%2?'var(--lilac-light)':'var(--sage)'} as CSSProperties} onClick={event=>{if(!(event.target as Element).closest('button'))play()}} onPointerEnter={()=>{if(allowed){clearTimeout(settleTimer.current);setPhase('interacting')}}} onPointerDown={event=>{if(!allowed)return;const b=event.currentTarget.getBoundingClientRect();event.currentTarget.style.setProperty('--scene-x',`${((event.clientX-b.left)/b.width-.5)*18}px`);event.currentTarget.style.setProperty('--scene-y',`${((event.clientY-b.top)/b.height-.5)*14}px`);setPhase('interacting')}} onPointerMove={event=>{if(!allowed)return;const b=event.currentTarget.getBoundingClientRect();event.currentTarget.style.setProperty('--scene-x',`${((event.clientX-b.left)/b.width-.5)*24}px`);event.currentTarget.style.setProperty('--scene-y',`${((event.clientY-b.top)/b.height-.5)*18}px`)}} onPointerLeave={()=>{root.current?.style.setProperty('--scene-x','0px');root.current?.style.setProperty('--scene-y','0px');settle()}} onPointerUp={settle} onPointerCancel={settle}>
  <LayeredScene index={cell} eager={eager} visible={visible} description={gardenArtDescriptions[cell]}/>
  <button type="button" className="scene-trigger" aria-label={rituals[cell]} aria-pressed={active} onClick={play}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16M4 12h16M6 6l12 12M6 18 18 6" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg><span>{rituals[cell]}</span></button>
  <span className="scene-response" role="status">{active?responses[cell]:''}</span>
 </div>
}
