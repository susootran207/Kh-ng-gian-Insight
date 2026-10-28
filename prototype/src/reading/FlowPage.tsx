import { DepthSurface } from '../components/DepthSurface'
import { GardenIllustration } from '../components/GardenIllustration'
import { Link, useLocation } from 'react-router-dom'
import { Arrow } from '../components/Icons'
import { articles } from './content'
import { ArticleCard } from './ArticleCard'
import { Breadcrumb } from './ReadingShell'
import { articlesForStage, stages, stageLibraryLink } from './stages'
import '../styles/flow.css'

export default function FlowPage() {
  const location=useLocation(),selected=stages.findIndex(stage=>'#'+stage.anchor===location.hash)
  return <div className="flow-page">
    <Breadcrumb title="Dòng chảy" parent={null}/>
    <header className="article-title"><h1>Dòng chảy<br/>của một năm học.</h1><p className="article-deck">Bốn chặng để tìm trang đọc theo nhịp năm học. Bạn có thể ghé bất kỳ chặng nào, theo điều mình muốn tìm hiểu.</p></header>
    <nav className="journey-map" aria-label="Chọn chặng hành trình"><svg viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true"><path d="M80 65C230-20 310 150 490 65S730-20 920 65"/></svg>{stages.map((stage,index)=><Link key={stage.key} to={{pathname:'/dong-chay',hash:'#'+stage.anchor}} aria-current={selected===index?'step':undefined}><span className="journey-stop" aria-hidden="true"><svg viewBox="0 0 40 40"><path d={['M20 34V12m0 10Q4 23 7 9q14-2 13 13m0-4Q34 17 32 4q-13 0-12 14','M7 23q13-22 26 0M7 29q13-22 26 0','M9 7h22L12 33h20M9 7l23 26','M20 33V12m0 10Q3 22 5 7q16-1 15 15m0-5Q34 15 34 4q-14-1-14 13'][index]}/></svg></span><span>{stage.title}</span></Link>)}</nav>
    <div className="flow-opening article-prose"><p>Dòng chảy là một cách sắp xếp bài viết, không phải bài đánh giá tâm lý hay tiến trình bạn cần hoàn thành. Chọn một chặng không nói lên cảm xúc, khả năng hoặc tình trạng của bạn.</p><p>Thư viện giữ toàn bộ bài đã được công bố. Các chặng và chuyên đề tuần là những lối tìm bài; bạn có thể đổi bộ lọc hoặc trở lại thư viện đầy đủ bất cứ lúc nào.</p></div>
    <div className="reader-layout"><nav className="table-of-contents" aria-label="Mục lục"><h2>Bốn chặng năm học</h2><ol>{stages.map(stage=><li key={stage.key}><Link to={{pathname:'/dong-chay',hash:'#'+stage.anchor}}>{stage.title}</Link></li>)}</ol><Link className="text-link" to="/thu-vien">Toàn bộ thư viện <Arrow/></Link></nav>
      <div className="flow-stages">{stages.map((stage,index)=>{
        const entries=articlesForStage(articles,stage.key)
        return <section id={stage.anchor} className="flow-stage" data-selected={selected===index} key={stage.key} aria-labelledby={'heading-'+stage.anchor}><DepthSurface className="flow-chapter-art" reveal><GardenIllustration index={[0,4,7,8][index]}/></DepthSurface><div className="article-prose"><h2 id={'heading-'+stage.anchor}>{stage.title}</h2><p>{stage.introduction}</p></div>{entries.length?<div className="library-list">{entries.map(article=><ArticleCard key={article.slug} article={article} returnTo={stageLibraryLink(stage.key)}/>)}</div>:<p className="flow-empty">Chưa có bài được công bố cho chặng này. Bạn vẫn có thể xem các chặng khác hoặc ghé thư viện.</p>}<Link className="text-link" to={stageLibraryLink(stage.key)}>Lọc thư viện: {stage.title} <Arrow/></Link></section>
      })}<div className="recovery-links"><Link className="text-link" to="/thu-vien">Xem toàn bộ thư viện <Arrow/></Link><Link className="text-link" to="/#dong-chay">Về timeline trang chủ <Arrow/></Link></div></div>
    </div>
  </div>
}
