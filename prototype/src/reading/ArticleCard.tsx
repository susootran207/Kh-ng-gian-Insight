import { Link, useLocation } from 'react-router-dom'
import { Arrow } from '../components/Icons'
import { statusLabel, type Article } from './content'
export type LibraryArticle = Pick<Article, 'slug' | 'title' | 'description' | 'topic' | 'season' | 'keywords' | 'status' | 'readingMinutes'> & { revision?: string }
export function ArticleCard({article,returnTo}:{article:LibraryArticle;returnTo?:string}){
  const location=useLocation(),from=returnTo&&/^\/thu-vien(?:\?|$)/.test(returnTo)?returnTo:location.pathname==='/thu-vien'?location.pathname+location.search:typeof location.state?.from==='string'&&/^\/thu-vien(?:\?|$)/.test(location.state.from)?location.state.from:'/thu-vien'
  return <article className="library-entry"><div className="entry-meta"><span>{article.topic}</span><span>{article.season} · {article.readingMinutes} phút đọc</span></div><h2><Link to={`/bai-viet/${article.slug}`} state={{from}}>{article.title}</Link></h2><p>{article.description}</p><div className="entry-bottom"><span className="draft-label">{statusLabel[article.status]}{article.revision ? ' · ' + article.revision : ''}</span><Link className="text-link" to={`/bai-viet/${article.slug}`} state={{from}} aria-label={`Đọc bài: ${article.title}`}>Mở trang đọc <Arrow/></Link></div></article>
}
