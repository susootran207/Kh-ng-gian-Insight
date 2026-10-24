import { readFileSync } from 'node:fs'
import type { Plugin } from 'vite'
import type { Catalogue } from '../editorial/schema'

// Publication is a code-reviewed editorial action, never a client-side toggle.
export function selectContent(data: Catalogue, development: boolean): Catalogue {
  const seen = new Set<string>()
  for (const item of [...data.articles, ...data.topics]) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)) throw new Error('Invalid editorial slug')
    const key = ('sections' in item ? 'article:' : 'topic:') + item.slug
    if (seen.has(key)) throw new Error('Duplicate editorial slug')
    seen.add(key)
    if (!['draft','in_review','approved','published'].includes(item.status)) throw new Error('Invalid editorial status')
    if (item.status === 'published' && (!item.approval?.by.trim() || !item.approval.at || !item.approval.revision || !item.publishedAt)) {
      throw new Error('Published content requires explicit approval and publication records')
    }
  }
  for (const article of data.articles) {
    const ids = article.sections.map(section => section.id)
    if (new Set(ids).size !== ids.length || ids.some(id=> !/^[a-z0-9-]+$/.test(id))) throw new Error('Invalid heading anchors')
    if (article.sources.some(source=>!source.url.startsWith('https://'))) throw new Error('References must use HTTPS')
  }
  const articles = data.articles.filter(item => development || item.status === 'published')
  const slugs = new Set(articles.map(item => item.slug))
  const topics = data.topics.filter(item => development || item.status === 'published').map(item=>({...item,articleSlugs:item.articleSlugs.filter(slug=>slugs.has(slug))}))
  return {articles, topics}
}
export function editorial(): Plugin {
  let development = false
  const source = new URL('../editorial/catalogue.json', import.meta.url)
  return {
    name: 'publication-boundary',
    configResolved(config) { development = config.command === 'serve' },
    resolveId(id) { if (id === 'virtual:editorial') return '\0virtual:editorial' },
    load(id) {
      if (id !== '\0virtual:editorial') return
      this.addWatchFile(source.pathname)
      const selected = selectContent(JSON.parse(readFileSync(source,'utf8')), development)
      return `export default ${JSON.stringify(selected)}`
    },
    handleHotUpdate(ctx) { if(ctx.file === source.pathname) ctx.server.ws.send({type:'full-reload'}) },
  }
}
