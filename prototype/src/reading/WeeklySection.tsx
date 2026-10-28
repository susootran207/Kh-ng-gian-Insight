import { Link } from 'react-router-dom'
import { Arrow } from '../components/Icons'
import { DepthSurface } from '../components/DepthSurface'
import { GardenIllustration } from '../components/GardenIllustration'
import { topicArt } from './articleArt'
import '../styles/weekly.css'
import { currentWeekly, weeklyView, weeklyPeriod } from './weekly'
export function WeeklySection(){
 const topic=currentWeekly,others=weeklyView.topics.filter(t=>t.id!==topic?.id).slice(0,3)
 return <section id="chuyen-de" className="weekly section-anchor editorial-weekly"><div className="page-width">
  <div className="section-intro"><h2>{weeklyView.showcase?'Lịch chuyên đề minh họa':'Chuyên đề tuần này'}</h2><p>{weeklyView.showcase?'Những lối nhỏ để khám phá nhịp học đường. Lịch mô phỏng của bài tiểu luận, không phải lịch triển khai tại một trường học.':'Một lối đọc chậm qua những câu chuyện gần với nhịp học đường.'}</p></div>
  {topic?<div className="weekly-editorial-grid"><DepthSurface className="weekly-feature" reveal><GardenIllustration index={topicArt(topic.id)}/><Link className="feature-link" to={'/chuyen-de/'+topic.slug}><div className="weekly-copy"><span className="weekly-feature-label">{weeklyView.showcase?'Chuyên đề minh họa':'Một lối đọc gợi ý'}</span><h3>{topic.title}</h3><p>{topic.description}</p><p className="weekly-period">{weeklyPeriod(topic)}</p><span className="text-link">Bước vào chuyên đề <Arrow/></span></div></Link></DepthSurface><div className="weekly-side-stories">{others.map(t=><DepthSurface key={t.id} className="weekly-story" reveal><GardenIllustration index={topicArt(t.id)}/><Link to={'/chuyen-de/'+t.slug}><div><h3>{t.title}</h3><p>{t.description}</p><span className="text-link">Khám phá <Arrow/></span></div></Link></DepthSurface>)}</div></div>:<div className="weekly-grid"><DepthSurface className="weekly-art" reveal><GardenIllustration index={0}/></DepthSurface><div className="weekly-copy"><h3>Một trang mới,<br/>đang được vun trồng.</h3><p>Chuyên đề sẽ mở khi nội dung được duyệt xuất bản.</p></div></div>}
  <Link className="text-link weekly-all" to="/chuyen-de">{weeklyView.showcase?'Xem đủ 10 chuyên đề minh họa':'Ghé trang chuyên đề'} <Arrow/></Link>
 </div></section>
}
