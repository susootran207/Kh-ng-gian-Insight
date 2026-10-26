import type { Catalogue } from '../editorial/schema.ts'
import { assertLegacyPublication, requireThat } from './content-contract.ts'

export function selectContent(data: Catalogue, development: boolean, root: string, now = Date.now()): Catalogue {
  const seen = new Set<string>()
  for (const item of [...data.articles, ...data.topics]) {
    requireThat(typeof item.slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug), 'invalid editorial slug')
    const key = ('sections' in item ? 'article:' : 'topic:') + item.slug
    requireThat(!seen.has(key), 'duplicate editorial slug'); seen.add(key)
    requireThat(['draft','in_review','approved','published'].includes(item.status), 'invalid editorial status')
    if (item.status === 'published') assertLegacyPublication(root, item, now)
  }
  const allSlugs = new Set(data.articles.map(a => a.slug))
  for (const article of data.articles) {
    const ids = article.sections.map(section => section.id)
    requireThat(new Set(ids).size === ids.length && ids.every(id => /^[a-z0-9-]+$/.test(id)), 'invalid heading anchors')
    requireThat(article.sources.every(source => { const url = new URL(source.url); return url.protocol === 'https:' && !url.username && !url.password }), 'references must use HTTPS')
  }
  for (const topic of data.topics) requireThat(topic.articleSlugs.every(slug => allSlugs.has(slug)) && new Set(topic.articleSlugs).size === topic.articleSlugs.length, 'invalid topic article references')
  const articles = data.articles.filter(item => development || item.status === 'published')
  const slugs = new Set(articles.map(item => item.slug))
  const topics = data.topics.filter(item => development || item.status === 'published').map(item => ({ ...item, articleSlugs: item.articleSlugs.filter(slug => slugs.has(slug)) }))
  return { articles, topics }
}
