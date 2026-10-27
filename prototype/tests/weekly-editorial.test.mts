import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync,writeFileSync,cpSync} from 'node:fs'
import {repositoryRoot,editorial} from '../build/editorial.ts'
import {loadManifest} from '../build/content-contract.ts'
import {selectPublicWeekly,validateWeeklyRegistry,weeklyTime} from '../build/weekly.ts'
import {createContentPreview} from '../build/content-preview.ts'
import {selectWeeklyPreview,weeklyPreviewClocks} from '../build/weekly-preview.ts'
import {createPublicLibrary} from '../build/public-library.ts'
import {createBoundary,assertArtifact} from '../build/publication-scan.ts'
import {createLibraryFixture,publishFixture} from './fixtures/library/create.ts'
import {createWeeklyFixture,fixtureNow} from './fixtures/weekly/create.ts'
const manifest=loadManifest(repositoryRoot), empty={articles:[],topics:[]}
const registry=JSON.parse(readFileSync('editorial/weekly.json','utf8'))
const source=createContentPreview(repositoryRoot,'127.0.0.1')
const sorted=validateWeeklyRegistry(registry,new Set(manifest.articles.map(a=>a.slug)),repositoryRoot,Date.now())
test('W2: 10 unique draft proposals, contiguous18-week sample,29 known articles; no fabricated grants',()=>{
 assert.equal(sorted.length,10);assert.equal(new Set(sorted.map(t=>t.id)).size,10);assert.equal(new Set(sorted.map(t=>t.slug)).size,10)
 assert(sorted.every(t=>t.status==='draft'&&!t.publication&&!t.publishedAt))
 assert.equal(new Set(sorted.flatMap(t=>t.articleSlugs)).size,29)
 for(let i=1;i<sorted.length;i++)assert.equal(sorted[i-1].endsAt,sorted[i].startsAt)
 assert.equal(weeklyTime(sorted.at(-1)!.endsAt)-weeklyTime(sorted[0].startsAt),18*7*24*3600000)
})
test('W2: preview all starts/ends,29 unchanged Library articles, future details and deterministic rollback',()=>{
 const at=(s:string)=>selectWeeklyPreview(registry,source,repositoryRoot,'127.0.0.1',s)
 for(const t of sorted){
  const v=at(t.startsAt);assert.equal(v.currentId,t.id);assert.equal(v.reason,'scheduled')
  assert.equal(v.topics.find(x=>x.id===t.id)!.articleSlugs.join(),t.articleSlugs.join())
  assert.equal(new Set(v.articles.map(a=>a.slug)).size,29);assert.equal(source.articles.length,29)
  const next=sorted.find(x=>x.startsAt===t.endsAt), end=at(t.endsAt)
  assert.equal(end.currentId,next?.id??t.id);assert.equal(end.reason,next?'scheduled':'fallback')
 }
 const old=at(sorted[0].startsAt);at(sorted.at(-1)!.startsAt);assert.deepEqual(at(sorted[0].startsAt),old)
 assert.throws(()=>selectWeeklyPreview(registry,source,repositoryRoot,'localhost',sorted[0].startsAt))
})
test('W2: invalid ID/slug/reference, overlap/calendar/UTC offset reject; gaps and empty are explicit',()=>{
 const check=(r:unknown)=>validateWeeklyRegistry(r,new Set(manifest.articles.map(a=>a.slug)),repositoryRoot,Date.now())
 for(const mutate of [(r:any)=>r.topics[1].id=r.topics[0].id,(r:any)=>r.topics[1].slug=r.topics[0].slug,(r:any)=>r.topics[0].articleSlugs=['missing'],(r:any)=>r.topics[1].startsAt=r.topics[0].startsAt,(r:any)=>r.topics[0].startsAt='2027-02-30T00:00:00+07:00',(r:any)=>r.topics[0].startsAt='2027-01-11T00:00:00Z']){
  const r=structuredClone(registry);mutate(r);assert.throws(()=>check(r))
 }
 const r=structuredClone(registry);r.topics.splice(1,1)
 const gap=selectWeeklyPreview(r,source,repositoryRoot,'127.0.0.1',sorted[1].startsAt)
 assert.equal(gap.reason,'fallback');assert.equal(gap.currentId,sorted[0].id)
 assert.equal(selectWeeklyPreview({schemaVersion:1,topics:[]},source,repositoryRoot,'127.0.0.1',sorted[0].startsAt).currentId,null)
})
test('W2: all real draft titles/prose stay withheld even in the sample semester; graph/canary active',()=>{
 const view=selectPublicWeekly(registry,empty,repositoryRoot,weeklyTime(sorted[3].startsAt))
 assert.equal(view.currentId,null);assert.equal(view.topics.length,0);assert.equal(view.upcoming?.length,0)
 const boundary=createBoundary(repositoryRoot,manifest,empty)
 for(const t of sorted)for(const text of [t.id,t.slug,t.title,t.description])assert.throws(()=>assertArtifact(Buffer.from(text),'leak.js',boundary))
 const hook=editorial().generateBundle as unknown as (a:unknown,b:unknown)=>void
 for(const id of ['\0virtual:w2-preview','/repo/prototype/weekly-preview/controls.tsx'])assert.throws(()=>hook({}, {'hidden.js':{type:'chunk',code:'export {}',modules:{[id]:{}}}}),/test-only/)
 assert.throws(()=>assertArtifact(Buffer.from('F0_FIXTURE_ONLY_W2'),'canary.js',boundary))
})
test('W2: synthetic public weekly clock, future exclusion, rollback and full29 Library',()=>{
 const f=createLibraryFixture(29), w=createWeeklyFixture()
 try{
  f.data.articles.forEach((_,i)=>publishFixture(f.root,f.data,i))
  const topics=w.registry.topics.map((t,i)=>w.publish({...t,articleSlugs:[f.data.articles[i].slug]}))
  cpSync(w.root+'/docs/phase-3/publication-records',f.root+'/docs/phase-3/publication-records',{recursive:true})
  writeFileSync(f.root+'/prototype/editorial/source-manifest.json',JSON.stringify(f.data))
  const r={schemaVersion:1,topics}, select=(at:number)=>selectPublicWeekly(r,empty,f.root,at,f.data)
  const v=select(fixtureNow);assert.equal(v.currentId,topics[1].id);assert(!JSON.stringify(v).includes(topics[2].slug));assert.equal(v.upcoming?.length,0)
  for(const at of [fixtureNow,weeklyTime(topics[2].startsAt),fixtureNow]){assert(select(at).currentId);assert.equal(createPublicLibrary(f.root,empty,f.data,at).catalogue.articles.length,29)}
  assert.deepEqual(select(fixtureNow),v)
  assert.throws(()=>createPublicLibrary(f.root,empty,f.data,Date.parse('2026-01-01T12:00:00Z')),/future/)
  const bad=structuredClone(r);bad.topics[1].description+=' changed';assert.throws(()=>selectPublicWeekly(bad,empty,f.root,fixtureNow,f.data))
 }finally{f.close();w.close()}
})

test('W2: preview clocks are input-order independent and empty registry has a safe clock',()=>{
 assert.deepEqual(weeklyPreviewClocks(sorted),weeklyPreviewClocks([...sorted].reverse()))
 const clocks=weeklyPreviewClocks([])
 assert.equal(selectWeeklyPreview({schemaVersion:1,topics:[]},source,repositoryRoot,'127.0.0.1',clocks.defaultAt).topics.length,0)
})
