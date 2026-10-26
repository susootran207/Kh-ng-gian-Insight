import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {stages,stageLibraryLink,articlesForStage} from '../src/reading/stages.ts'
import {STAGES,loadManifest} from '../build/content-contract.ts'
import {selectContent} from '../build/select-content.ts'
import {selectWeekly} from '../build/weekly.ts'
import {createFlowFixture,fixtureNow} from './fixtures/flow/create.ts'
import {createBoundary,assertArtifact} from '../build/publication-scan.ts'
import {editorial} from '../build/editorial.ts'
test('D1 mapping: exact F0 stage values and old query values, not topicIds',()=>{
  assert.deepEqual(stages.map(s=>s.key),STAGES)
  assert.equal(new Set(stages.map(s=>s.anchor)).size,4)
  for(const s of stages){assert.equal(s.title,s.key);assert.equal(new URL(stageLibraryLink(s.key),'http://example.test').searchParams.get('giai-doan'),s.key)}
  const entries=[{season:'T01'},{season:'Mùa thi'}];assert.deepEqual(articlesForStage(entries,'Mùa thi'),[entries[1]])
})
test('D1 F0 public empty: no source/legacy draft gains access through stages',()=>{
  const root=resolve('..'),data=JSON.parse(readFileSync('editorial/catalogue.json','utf8')),view=selectContent(data,false,root)
  assert.equal(loadManifest(root).articles.filter(a=>a.status==='published').length,0)
  for(const s of stages)assert.deepEqual(articlesForStage(view.articles,s.key),[])
})
test('D1 A: synthetic F0-approved 29 stay in Library across stages and weekly change; extensible 30+',()=>{
  const x=createFlowFixture();try{
    const before=JSON.stringify(x.catalogue),view=selectContent(x.catalogue,false,x.root,fixtureNow)
    assert.equal(view.articles.length,29);assert(!view.articles.some(a=>a.slug==='d1-fixture-99'))
    const all=stages.flatMap(s=>articlesForStage(view.articles,s.key));assert.equal(new Set(all.map(a=>a.slug)).size,29)
    for(const s of stages){articlesForStage(view.articles,s.key);assert.equal(view.articles.length,29)}
    const w=selectWeekly(x.registry,x.catalogue,x.root,fixtureNow);assert.equal(w.articles.length,2);assert.equal(w.topics[0].articleSlugs.length,2)
    const later=selectWeekly(x.registry,x.catalogue,x.root,fixtureNow+20*86400000);assert.equal(later.currentId,'KGNT-W004');assert.equal(later.topics.find(t=>t.id===later.currentId)!.articleSlugs.length,3);assert.equal(later.articles.length,5);assert.equal(selectContent(x.catalogue,false,x.root,fixtureNow+20*86400000).articles.length,29)
    assert.deepEqual(selectContent(x.catalogue,false,x.root,fixtureNow).articles,view.articles);assert.equal(JSON.stringify(x.catalogue),before)
    const extra=x.publish({...view.articles[0],slug:'d1-fixture-30',title:'Trang giả lập số 30'});x.catalogue.articles.push(extra)
    assert.equal(selectContent(x.catalogue,false,x.root,fixtureNow).articles.length,30)
    x.catalogue.articles[0].publication!.revision='wrong-r2';assert.throws(()=>selectContent(x.catalogue,false,x.root,fixtureNow))
  }finally{x.close()}
})
test('D1 fixture sentinel and module-only leaks are rejected by F0 production guard',()=>{
  const root=resolve('..'),manifest=loadManifest(root),catalogue=JSON.parse(readFileSync('editorial/catalogue.json','utf8')),boundary=createBoundary(root,manifest,catalogue)
  assert.throws(()=>assertArtifact(Buffer.from('F0_FIXTURE_ONLY_D1'),'leak.js',boundary))
  const hook=editorial().generateBundle as unknown as(a:unknown,b:unknown)=>void
  for(const id of ['/repo/prototype/tests/fixtures/flow/create.ts','/repo/prototype/tests/flow-harness/index.html','\0virtual:d1-fixture:virtual:editorial'])assert.throws(()=>hook({}, {'app.js':{type:'chunk',code:'export const safe = 1',modules:{[id]:{}}}}))
})
