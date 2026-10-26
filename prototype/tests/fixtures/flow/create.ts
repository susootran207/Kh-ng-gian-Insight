import {createWeeklyFixture,fixtureNow} from '../weekly/create.ts'
import {stages} from '../../../src/reading/stages.ts'
import type {Article} from '../../../editorial/schema.ts'
export {fixtureNow}
export function createFlowFixture(){
  const base=createWeeklyFixture()
  const make=(n:number):Article=>({slug:'d1-fixture-'+n,title:'Trang giả lập số '+n,description:'F0_FIXTURE_ONLY_D1 — dữ liệu giả lập, không phải bài thật.',topic:n%2?'Nhóm A giả lập':'Nhóm B giả lập',season:stages[(n-1)%stages.length].key,keywords:['kiểm thử','đọc'],status:'draft',updated:'2026-09-01',readingMinutes:1,sections:[{id:'kiem-thu',heading:'Nội dung giả lập',paragraphs:['F0_FIXTURE_ONLY_D1 — chỉ kiểm dữ liệu, không phải thông tin tâm lý.']}],sources:[]})
  const articles=Array.from({length:29},(_,i)=>base.publish(make(i+1))),draft=make(99)
  const topic=base.publish({...base.registry.topics[1],articleSlugs:articles.slice(0,2).map(a=>a.slug)})
  const next=base.publish({...topic,id:'KGNT-W004',slug:'d1-fixture-next-week',startsAt:'2026-11-02T00:00:00+07:00',endsAt:'2026-11-16T00:00:00+07:00',articleSlugs:articles.slice(-3).map(a=>a.slug)})
  return {...base,catalogue:{articles:[...articles,draft],topics:[]},registry:{schemaVersion:1 as const,topics:[topic,next]}}
}
