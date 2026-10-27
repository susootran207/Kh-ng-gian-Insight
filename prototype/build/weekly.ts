import type { SourceManifest } from '../editorial/source-contract.ts'
import type { Catalogue } from '../editorial/schema.ts'
import type { WeeklyRegistry, WeeklyTopic, WeeklyView } from '../editorial/weekly-contract.ts'
import { assertLegacyPublication, requireThat, loadManifest } from './content-contract.ts'
import { createPublicLibrary } from './public-library.ts'
import { selectContent } from './select-content.ts'

export function weeklyTime(input: string): number {
  requireThat(typeof input === 'string' && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\+07:00$/.test(input), 'weekly time must be ISO seconds with +07:00')
  const time = Date.parse(input)
  requireThat(Number.isFinite(time) && new Date(time + 7 * 3600000).toISOString().slice(0,19) + '+07:00' === input, 'invalid weekly calendar date')
  return time
}
export function selectWeekly(input: unknown, catalogue: Catalogue, root: string, now = Date.now()): WeeklyView {
  return schedule(input,catalogue,selectContent(catalogue,false,root,now),root,now)
}
export function selectPublicWeekly(input: unknown, catalogue: Catalogue, root: string, now = Date.now(), manifest: SourceManifest = loadManifest(root,now)): WeeklyView {
  const library = createPublicLibrary(root,catalogue,manifest,now).catalogue
  // Known but withheld source slugs may be scheduled; they cannot become visible.
  const known = {...catalogue, articles:[...catalogue.articles,...manifest.articles.map(a => ({slug:a.slug} as Catalogue['articles'][number]))]}
  return schedule(input,known,library,root,now)
}
export function validateWeeklyRegistry(input: unknown, known: ReadonlySet<string>, root: string, now: number): WeeklyTopic[] {
  requireThat(Number.isFinite(now) && Math.abs(now) <= 8.64e15, 'invalid weekly snapshot clock')
  const registry = input as WeeklyRegistry
  requireThat(registry && registry.schemaVersion === 1 && Array.isArray(registry.topics) && Object.keys(registry).every(k => ['schemaVersion','topics'].includes(k)), 'invalid weekly registry')
  const ids = new Set<string>(), slugs = new Set<string>()
  const times = new Map<WeeklyTopic, { start: number; end: number }>()
  for (const topic of registry.topics) {
    requireThat(topic && typeof topic.id === 'string' && /^KGNT-W\d{3,}$/.test(topic.id) && !ids.has(topic.id), 'invalid/duplicate weekly ID'); ids.add(topic.id)
    requireThat(typeof topic.slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topic.slug) && !slugs.has(topic.slug), 'invalid/duplicate weekly slug'); slugs.add(topic.slug)
    requireThat(Object.keys(topic).every(k => ['id','slug','title','description','articleSlugs','startsAt','endsAt','status','publication','approval','publishedAt'].includes(k)), 'unknown weekly field')
    requireThat([topic.title,topic.description].every(v => typeof v === 'string' && v.trim().length > 0), 'weekly title/description required')
    requireThat(['draft','in_review','approved','published'].includes(topic.status), 'invalid weekly status')
    requireThat(Array.isArray(topic.articleSlugs) && topic.articleSlugs.length > 0 && topic.articleSlugs.every(s => typeof s === 'string' && known.has(s)) && new Set(topic.articleSlugs).size === topic.articleSlugs.length, 'invalid weekly article references')
    const start = weeklyTime(topic.startsAt), end = weeklyTime(topic.endsAt)
    requireThat(start < end, 'weekly start must precede end'); times.set(topic, { start, end })
    if (topic.status === 'published') assertLegacyPublication(root, topic, now)
  }
  const chronological = [...registry.topics].sort((a,b) => times.get(a)!.start - times.get(b)!.start)
  for (let i=1;i<chronological.length;i++) requireThat(times.get(chronological[i-1])!.end <= times.get(chronological[i])!.start, 'overlapping weekly intervals')
  return chronological
}
function schedule(input: unknown, catalogue: Catalogue, publicCatalogue: Catalogue, root: string, now: number): WeeklyView {
  const chronological=validateWeeklyRegistry(input,new Set(catalogue.articles.map(a=>a.slug)),root,now)
  return weeklyViewFromSelection(chronological.filter(t=>t.status==='published'&&weeklyTime(t.startsAt)<=now),publicCatalogue.articles,now)
}
// Projection only: public callers must pass F0-selected topics and articles.
export function weeklyViewFromSelection(started: WeeklyTopic[], articles: Catalogue['articles'], now: number, upcoming: WeeklyTopic[] = []): WeeklyView {
  const eligible = new Map(articles.map(a=>[a.slug,a]))
  const project=(t:WeeklyTopic)=>({id:t.id,slug:t.slug,title:t.title,description:t.description,startsAt:t.startsAt,endsAt:t.endsAt,articleSlugs:t.articleSlugs.filter(s=>eligible.has(s))})
  const topics=started.map(project).filter(t=>t.articleSlugs.length>0).reverse()
  const future=upcoming.map(project).filter(t=>t.articleSlugs.length>0)
  const current = topics.find(t => weeklyTime(t.startsAt) <= now && now < weeklyTime(t.endsAt)) ?? topics[0]
  const referenced = new Set([...topics,...future].flatMap(t => t.articleSlugs))
  return { selectedAt:new Date(now).toISOString(), reason:current ? (now < weeklyTime(current.endsAt) ? 'scheduled' : 'fallback') : 'empty', currentId:current?.id ?? null, topics, upcoming:future, articles:articles.filter(a => referenced.has(a.slug)) }
}
