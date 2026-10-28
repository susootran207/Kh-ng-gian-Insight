import { Link, useLocation } from 'react-router-dom'
import { Arrow } from '../components/Icons'
import { DepthSurface } from '../components/DepthSurface'
import { GardenIllustration } from '../components/GardenIllustration'
import { articleArt } from './articleArt'
import { statusLabel, type Article } from './content'
export type LibraryArticle = Pick<Article, 'slug' | 'title' | 'description' | 'topic' | 'season' | 'keywords' | 'status' | 'readingMinutes'> & { revision?: string; collection?: string;illustration?:number }
export function ArticleCard({article,returnTo}:{article:LibraryArticle;returnTo?:string}){
 const location=useLocation(),from=returnTo&&/^\/thu-vien(?:\?|$)/.test(returnTo)?returnTo:location.pathname==='/thu-vien'?location.pathname+location.search:typeof location.state?.from==='string'&&/^\/thu-vien(?:\?|$)/.test(location.state.from)?location.state.from:'/thu-vien'
 return <article className="library-entry"><DepthSurface className="editorial-card"><GardenIllustration index={articleArt(article)}/><Link className="editorial-card-link" to={`/bai-viet/${article.slug}`} state={{from}} aria-label={`Đọc bài: ${article.title}`}><div className="entry-copy"><div className="entry-meta"><span>{article.topic}</span><span>{article.season} · {article.readingMinutes} phút đọc</span></div><h2>{article.title}</h2><p>{article.description}</p><div className="entry-bottom"><span className="draft-label">{statusLabel[article.status]}</span><span className="text-link">Mở trang đọc <Arrow/></span></div></div></Link></DepthSurface></article>
}
