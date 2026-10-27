import {createRoot} from 'react-dom/client'
import {weeklyView} from '../src/reading/weekly'
function Controls(){
 const topics=[...weeklyView.topics,...(weeklyView.upcoming??[])].sort((a,b)=>a.startsAt.localeCompare(b.startsAt))
 if(!topics.length)return <aside className="preview-notice">Lịch học thuật mẫu · Chưa có chuyên đề để thử. Thư viện vẫn mở cho các bài trong preview.</aside>
 const before=topics[0]?new Date(Date.parse(topics[0].startsAt)-1000+7*3600000).toISOString().slice(0,19)+'+07:00':''
 const selected=new URLSearchParams(location.search).get('w2-at')
 return <aside className="preview-notice w2-preview-controls"><p><strong>Lịch học thuật mẫu · Chỉ xem nội bộ</strong></p><p>Chưa có lịch của trường cụ thể hoặc quyền công bố. Có thể đọc bất kỳ bài nào, không cần theo thứ tự các tuần.</p><label>Thử thời điểm theo giờ Việt Nam<select value={selected&&[before,...topics.map(t=>t.startsAt),topics.at(-1)?.endsAt].includes(selected)?selected:topics[1]?.startsAt} onChange={e=>{const url=new URL(location.href);url.searchParams.set('w2-at',e.target.value);location.assign(url.href)}}><option value={before}>Trước lịch mẫu</option>{topics.map(t=><option key={t.id} value={t.startsAt}>{t.startsAt.slice(0,10)} · {t.title}</option>)}<option value={topics.at(-1)?.endsAt}>Sau lịch mẫu · thử đọc lại</option></select></label><p role="status">Snapshot: {new Intl.DateTimeFormat('vi-VN',{timeZone:'Asia/Ho_Chi_Minh',dateStyle:'short',timeStyle:'medium'}).format(new Date(weeklyView.selectedAt))} (UTC+07:00). Chọn một mốc sẽ tải lại trang; đồng hồ thiết bị không tự chuyển tuần.</p></aside>
}
createRoot(document.getElementById('w2-preview-controls')!).render(<Controls/> )
