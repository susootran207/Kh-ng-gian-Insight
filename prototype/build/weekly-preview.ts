// Server-only academic preview. No public selector imports this module.
import type { ContentPreview } from './content-preview.ts'
import { requireThat } from './content-contract.ts'
import { validateWeeklyRegistry, weeklyTime, weeklyViewFromSelection } from './weekly.ts'
export function selectWeeklyPreview(input: unknown, source: ContentPreview, root: string, host: string, at: string) {
  requireThat(host==='127.0.0.1'&&source.kind==='preview'&&source.host===host,'weekly preview requires F0 loopback PreviewView')
  const now=weeklyTime(at)
  const articles=source.articles.map(a=>({...a.card,id:a.id,updated:'',sections:[],sources:[]}))
  const sorted=validateWeeklyRegistry(input,new Set(articles.map(a=>a.slug)),root,now)
  const view=weeklyViewFromSelection(sorted.filter(t=>weeklyTime(t.startsAt)<=now),articles,now,sorted.filter(t=>weeklyTime(t.startsAt)>now))
  return {...view,preview:true as const}
}
// Clock options are preview navigation metadata, never publication eligibility.
export function weeklyPreviewClocks(topics: {startsAt:string;endsAt:string}[]) {
  const sorted=[...topics].sort((a,b)=>weeklyTime(a.startsAt)-weeklyTime(b.startsAt))
  if(!sorted.length)return {dates:['2027-01-11T00:00:00+07:00'],defaultAt:'2027-01-11T00:00:00+07:00'}
  const before=new Date(weeklyTime(sorted[0].startsAt)-1000+7*3600000).toISOString().slice(0,19)+'+07:00'
  const dates=[before,...sorted.map(t=>t.startsAt),sorted.at(-1)!.endsAt]
  return {dates,defaultAt:sorted[1]?.startsAt??sorted[0].startsAt}
}
