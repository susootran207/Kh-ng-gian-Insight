import { Link } from 'react-router-dom'
import { Arrow } from '../components/Icons'
import { articles } from './content'
import { ArticleCard } from './ArticleCard'
import { Breadcrumb } from './ReadingShell'
import { articlesForStage, stages, stageLibraryLink } from './stages'
import '../styles/flow.css'

export default function FlowPage() {
  return <div className="flow-page">
    <Breadcrumb title="Dòng chảy" parent={null}/>
    <header className="article-title"><h1>Dòng chảy<br/>của một năm học.</h1><p className="article-deck">Bốn chặng để tìm trang đọc theo nhịp năm học. Bạn có thể ghé bất kỳ chặng nào, theo điều mình muốn tìm hiểu.</p></header>
    <div className="flow-opening article-prose"><p>Dòng chảy là một cách sắp xếp bài viết, không phải bài đánh giá tâm lý hay tiến trình bạn cần hoàn thành. Chọn một chặng không nói lên cảm xúc, khả năng hoặc tình trạng của bạn.</p><p>Thư viện giữ toàn bộ bài đã được công bố. Các chặng và chuyên đề tuần là những lối tìm bài; bạn có thể đổi bộ lọc hoặc trở lại thư viện đầy đủ bất cứ lúc nào.</p></div>
    <div className="reader-layout"><nav className="table-of-contents" aria-label="Mục lục"><h2>Bốn chặng năm học</h2><ol>{stages.map(stage=><li key={stage.key}><Link to={{pathname:'/dong-chay',hash:'#'+stage.anchor}}>{stage.title}</Link></li>)}</ol><Link className="text-link" to="/thu-vien">Toàn bộ thư viện <Arrow/></Link></nav>
      <div className="flow-stages">{stages.map(stage=>{
        const entries=articlesForStage(articles,stage.key)
        return <section id={stage.anchor} className="flow-stage" key={stage.key} aria-labelledby={'heading-'+stage.anchor}><div className="article-prose"><h2 id={'heading-'+stage.anchor}>{stage.title}</h2><p>{stage.introduction}</p></div>{entries.length?<div className="library-list">{entries.map(article=><ArticleCard key={article.slug} article={article} returnTo={stageLibraryLink(stage.key)}/>)}</div>:<p className="flow-empty">Chưa có bài được công bố cho chặng này. Bạn vẫn có thể xem các chặng khác hoặc ghé thư viện.</p>}<Link className="text-link" to={stageLibraryLink(stage.key)}>Lọc thư viện: {stage.title} <Arrow/></Link></section>
      })}<div className="recovery-links"><Link className="text-link" to="/thu-vien">Xem toàn bộ thư viện <Arrow/></Link><Link className="text-link" to="/#dong-chay">Về timeline trang chủ <Arrow/></Link></div></div>
    </div>
  </div>
}
