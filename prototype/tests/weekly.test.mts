import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync,writeFileSync,mkdirSync,cpSync} from 'node:fs'
import {resolve} from 'node:path'
import {selectWeekly,weeklyTime} from '../build/weekly.ts'
import {createWeeklyFixture,fixtureNow} from './fixtures/weekly/create.ts'
import {loadManifest} from '../build/content-contract.ts'
import {createBoundary,assertArtifact} from '../build/publication-scan.ts'
import {editorial} from '../build/editorial.ts'

function scenario(fn:(x:ReturnType<typeof createWeeklyFixture>)=>void){const x=createWeeklyFixture();try{fn(x)}finally{x.close()}}
const t=(value:string)=>weeklyTime(value+'T00:00:00+07:00')
test('WEEK01: +07:00 strict calendar; epoch agrees with UTC day boundary',()=>{
  assert.equal(t('2026-10-19'),Date.parse('2026-10-18T17:00:00Z'))
  for(const date of ['2026-02-30T00:00:00+07:00','2026-10-19T24:00:00+07:00','2026-10-19T00:00:00Z','2026-10-19T00:00:00+00:00','2026-10-19','2026-13-01T00:00:00+07:00'])assert.throws(()=>weeklyTime(date))
})
test('WEEK01/02: start inclusive, end exclusive, before and after each schedule boundary',()=>scenario(x=>{
  const select=(at:number)=>selectWeekly(x.registry,x.catalogue,x.root,at)
  assert.equal(select(t('2026-10-05')-1).currentId,null)
  assert.equal(select(t('2026-10-05')).currentId,'KGNT-W001')
  assert.equal(select(t('2026-10-12')-1).reason,'scheduled')
  assert.equal(select(t('2026-10-12')).reason,'fallback')
  assert.equal(select(t('2026-10-19')-1).currentId,'KGNT-W001')
  assert.equal(select(t('2026-10-19')).currentId,'KGNT-W002')
  assert.equal(select(t('2026-10-26')-1).reason,'scheduled')
  assert.equal(select(t('2026-10-26')).reason,'fallback')
  assert.equal(select(t('2026-11-02')-1).currentId,'KGNT-W002')
  assert.equal(select(t('2026-11-02')).currentId,'KGNT-W003')
  assert.equal(select(t('2026-11-09')).reason,'fallback')
}))
test('WEEK03: gap falls back to latest started eligible; future is absent even at direct slug',()=>scenario(x=>{
  const gap=selectWeekly(x.registry,x.catalogue,x.root,t('2026-10-15'))
  assert.equal(gap.currentId,'KGNT-W001');assert.equal(gap.reason,'fallback')
  const current=selectWeekly(x.registry,x.catalogue,x.root,fixtureNow)
  assert(!JSON.stringify(current).includes('w1-fixture-future'));assert.deepEqual(current.topics.map(t=>t.id),['KGNT-W002','KGNT-W001'])
}))
test('WEEK04: overlap rejected, adjacency accepted, bad range rejected before publication',()=>scenario(x=>{
  for(const topic of x.registry.topics){topic.status='draft';delete topic.publication;delete topic.publishedAt}
  x.registry.topics[1].startsAt='2026-10-11T00:00:00+07:00';assert.throws(()=>selectWeekly(x.registry,x.catalogue,x.root,fixtureNow),/overlapping/)
  x.registry.topics[1].startsAt='2026-10-12T00:00:00+07:00';assert.doesNotThrow(()=>selectWeekly(x.registry,x.catalogue,x.root,fixtureNow))
  x.registry.topics[1].endsAt=x.registry.topics[1].startsAt;assert.throws(()=>selectWeekly(x.registry,x.catalogue,x.root,fixtureNow),/precede/)
}))
test('WEEK05/PUB03: ordered links preserve only F0 eligible articles',()=>scenario(x=>{
  const view=selectWeekly(x.registry,x.catalogue,x.root,fixtureNow)
  assert.deepEqual(view.topics[0].articleSlugs,['w1-fixture-beta','w1-fixture-alpha'])
  assert.equal(view.articles.length,2);assert(!JSON.stringify(view).includes('w1-fixture-draft'))
}))
test('WEEK05: withdrawn article permission excludes it; current empty falls back, all empty is honest',()=>scenario(x=>{
  x.catalogue.articles[1].status='draft'
  let view=selectWeekly(x.registry,x.catalogue,x.root,fixtureNow);assert.deepEqual(view.topics[0].articleSlugs,['w1-fixture-alpha'])
  x.registry.topics[1]=x.publish({...x.registry.topics[1],articleSlugs:['w1-fixture-draft']});view=selectWeekly(x.registry,x.catalogue,x.root,fixtureNow);assert.equal(view.currentId,'KGNT-W001')
  x.catalogue.articles.forEach(a=>a.status='draft');view=selectWeekly(x.registry,x.catalogue,x.root,fixtureNow)
  assert.deepEqual(view.topics,[]);assert.deepEqual(view.articles,[]);assert.equal(view.currentId,null);assert.equal(view.reason,'empty')
}))
test('PUB01/02: draft, in_review, approved topic and legacy approval alone never publish',()=>scenario(x=>{
  for(const status of ['draft','in_review','approved'] as const){x.registry.topics.forEach(t=>t.status=status);assert.equal(selectWeekly(x.registry,x.catalogue,x.root,fixtureNow).currentId,null)}
  x.registry.topics[0].status='published';delete x.registry.topics[0].publication
  x.registry.topics[0].approval={by:'Not a publication bundle',at:'2026-09-01',revision:'old'}
  assert.throws(()=>selectWeekly(x.registry,x.catalogue,x.root,fixtureNow),/records/)
}))
test('PUB02/07: topic title, order, interval or record revision/hash changes invalidate F0 proof',()=>{
  for(const mutate of [
    (x:ReturnType<typeof createWeeklyFixture>)=>{x.registry.topics[1].title+=' changed'},
    (x:ReturnType<typeof createWeeklyFixture>)=>{x.registry.topics[1].articleSlugs.reverse()},
    (x:ReturnType<typeof createWeeklyFixture>)=>{x.registry.topics[1].endsAt='2026-10-27T00:00:00+07:00'},
    (x:ReturnType<typeof createWeeklyFixture>)=>{x.registry.topics[1].publication!.records.expertReview.revision='stale'},
    (x:ReturnType<typeof createWeeklyFixture>)=>{x.catalogue.articles[0].publication!.records.publicationAuthorization.contentHash='f'.repeat(64)},
  ])scenario(x=>{mutate(x);assert.throws(()=>selectWeekly(x.registry,x.catalogue,x.root,fixtureNow))})
})
test('DATA01: ID/slug/references uniqueness, unknown field/version/status and clock reject',()=>{
  for(const mutate of [
    (x:ReturnType<typeof createWeeklyFixture>)=>{x.registry.topics[1].id=x.registry.topics[0].id},
    (x:ReturnType<typeof createWeeklyFixture>)=>{x.registry.topics[1].slug=x.registry.topics[0].slug},
    (x:ReturnType<typeof createWeeklyFixture>)=>{x.registry.topics[1].articleSlugs=['missing']},
    (x:ReturnType<typeof createWeeklyFixture>)=>{x.registry.topics[1].articleSlugs=['w1-fixture-alpha','w1-fixture-alpha']},
  ])scenario(x=>{mutate(x);assert.throws(()=>selectWeekly(x.registry,x.catalogue,x.root,fixtureNow))})
  scenario(x=>{assert.throws(()=>selectWeekly({...x.registry,extra:true},x.catalogue,x.root));for(const bad of [{status:'live'},{unexpected:'field'},{title:''},{articleSlugs:[]}]){const m=structuredClone(x.registry);Object.assign(m.topics[0],bad);assert.throws(()=>selectWeekly(m,x.catalogue,x.root,fixtureNow))};assert.throws(()=>selectWeekly({...x.registry,schemaVersion:2},x.catalogue,x.root));assert.throws(()=>selectWeekly(x.registry,x.catalogue,x.root,NaN))})
})
test('WEEK06: input order cannot change current/list/member order; stable snapshot is pure',()=>scenario(x=>{
  const expected=selectWeekly(x.registry,x.catalogue,x.root,fixtureNow),before=JSON.stringify(x.registry)
  assert.deepEqual(expected,selectWeekly(x.registry,x.catalogue,x.root,fixtureNow));assert.equal(before,JSON.stringify(x.registry))
  x.registry.topics.reverse();assert.deepEqual(expected,selectWeekly(x.registry,x.catalogue,x.root,fixtureNow))
}))
test('PUB01/DATA02: real weekly registry is empty, catalogue/29-source publication not inherited by slug',()=>{
  const root=resolve('..'),data=JSON.parse(readFileSync('editorial/weekly.json','utf8')),catalogue=JSON.parse(readFileSync('editorial/catalogue.json','utf8'))
  assert.deepEqual(data,{schemaVersion:1,topics:[]});assert.equal(loadManifest(root).articles.filter(a=>a.status==='published').length,0)
  assert.equal(selectWeekly(data,catalogue,root).currentId,null)
  const topic={id:'KGNT-W999',slug:'withheld-test',title:'Withheld topic',description:'Withheld topic description',articleSlugs:['khi-mua-thi-den-gan'],startsAt:'2026-10-01T00:00:00+07:00',endsAt:'2026-11-01T00:00:00+07:00',status:'approved'}
  assert.deepEqual(selectWeekly({schemaVersion:1,topics:[topic]},catalogue,root).topics,[])
})
test('PUB04/05: scanner detects withheld weekly text, escaped prose, raw registry and fixture modules',()=>scenario(x=>{
  const root=resolve('..'),manifest=loadManifest(root)
  mkdirSync(resolve(x.root,'prototype/editorial'),{recursive:true});mkdirSync(resolve(x.root,'prototype/src/reading'),{recursive:true})
  writeFileSync(resolve(x.root,'prototype/editorial/catalogue.json'),JSON.stringify(x.catalogue))
  writeFileSync(resolve(x.root,'prototype/src/reading/homepageContent.ts'),'export const empty = []')
  x.registry.topics.forEach(t=>t.status='draft')
  writeFileSync(resolve(x.root,'prototype/editorial/weekly.json'),JSON.stringify(x.registry))
  cpSync(resolve(root,'docs/phase-3/drafts'),resolve(x.root,'docs/phase-3/drafts'),{recursive:true})
  cpSync(resolve(root,'docs/phase-3/matrix.json'),resolve(x.root,'docs/phase-3/matrix.json'))
  const boundary=createBoundary(x.root,manifest,x.catalogue)
  for(const value of [x.registry.topics[0].id,x.registry.topics[0].slug,x.registry.topics[0].title,x.registry.topics[0].description])assert.throws(()=>assertArtifact(Buffer.from(value),'accident.js',boundary))
  const escaped=[...x.registry.topics[0].title].map(c=>'\\u'+c.charCodeAt(0).toString(16).padStart(4,'0')).join('')
  assert.throws(()=>assertArtifact(Buffer.from(escaped),'escaped.js',boundary))
  assert.throws(()=>assertArtifact(Buffer.from('F0_FIXTURE_ONLY_W1'),'accident.js',boundary))
  assert.throws(()=>assertArtifact(Buffer.from(JSON.stringify(x.registry)),'weekly.json',boundary))
  x.registry.topics.forEach(t=>t.status='published');writeFileSync(resolve(x.root,'prototype/editorial/weekly.json'),JSON.stringify(x.registry))
  const publishedBoundary=createBoundary(x.root,manifest,x.catalogue)
  assert.doesNotThrow(()=>assertArtifact(Buffer.from('export const title='+JSON.stringify(x.registry.topics[0].title)),'legitimate.js',publishedBoundary))
  const hook=editorial().generateBundle as unknown as (a:unknown,b:unknown)=>void
  for(const id of ['/repo/prototype/editorial/weekly.json','/repo/prototype/tests/weekly-harness/index.html','\0virtual:w1-fixture:virtual:weekly'])assert.throws(()=>hook({}, {'app.js':{type:'chunk',code:'export const safe = 1',modules:{[id]:{}}}}))
}))
