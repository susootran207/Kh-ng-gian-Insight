import type { CSSProperties } from 'react'
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
export function GardenIllustration({index=0,className='',eager=false}:{index?:number;className?:string;eager?:boolean}){
 const cell=Math.max(0,Math.min(9,index))
 return <div className={'garden-illustration '+className} style={{'--art-tone':cell%2?'var(--lilac-light)':'var(--sage)'} as CSSProperties}><img src={`${import.meta.env.BASE_URL}illustrations/garden-${String(cell+1).padStart(2,'0')}.webp`} alt={gardenArtDescriptions[cell]} width="396" height="396" loading={eager?'eager':'lazy'} decoding="async"/><svg className="art-leaf-layer" viewBox="0 0 70 100" aria-hidden="true"><path d="M35 97Q18 40 39 5M30 64Q3 64 7 42Q27 42 30 64M32 45Q61 47 61 23Q41 25 32 45" fill="none" stroke="currentColor" strokeWidth=".8"/></svg></div>
}
