import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createLibraryFixture,publishFixture} from './fixtures/library/create.ts'
import {createPublicLibrary} from '../build/public-library.ts'
import {repositoryRoot} from '../build/editorial.ts'
import {loadManifest,readReference} from '../build/content-contract.ts'
import {createBoundary,assertArtifact} from '../build/publication-scan.ts'
import {articlesForStage,stages} from '../src/reading/stages.ts'
const empty={articles:[],topics:[]}
test('P2: real production remains empty; all 203 pinned files stay intact',()=>{
 const data=loadManifest(repositoryRoot)
 assert.equal(createPublicLibrary(repositoryRoot,empty).catalogue.articles.length,0)
 for(const a of data.articles)for(const f of [a.source,...Object.values(a.dossiers),...a.assets])assert.deepEqual(readReference(repositoryRoot,f),readFileSync(repositoryRoot+'/'+f.path))
})
for(const count of [29,30])test(`P2: ${count} synthetic F0-eligible sources compile fully without a fixed limit`,()=>{
 const f=createLibraryFixture(count)
 try{
  f.data.articles.forEach((_,i)=>publishFixture(f.root,f.data,i))
  const release=createPublicLibrary(f.root,empty,f.data), articles=release.catalogue.articles
  assert.equal(articles.length,count);assert.equal(release.assets.length,count)
  assert.equal(new Set(articles.map(a=>a.slug)).size,count)
  assert.equal(stages.reduce((n,s)=>n+articlesForStage(articles,s.key).length,0),count)
  const boundary=createBoundary(f.root,f.data,empty)
  for(const a of articles){
   assert(a.document);assert.equal(a.document.trace.length,0)
   assert.equal(a.document.figures.length,1)
   assert(a.document.root.children!.some(n=>n.type==='heading'))
   const json=JSON.stringify(a)
   assert(!json.includes('docs/phase-3/'));assert(!json.includes('publicationAuthorization'))
   assertArtifact(Buffer.from(json),'app.js',boundary)
  }
  for(const a of release.assets)assertArtifact(a.bytes,a.url,boundary)
  assert.throws(()=>assertArtifact(Buffer.from('F0_FIXTURE_ONLY_canary'),'app.js',boundary))
 }finally{f.close()}
})
test('P2: withheld, missing rights/proof or stale approval never enter the adapter',()=>{
 const f=createLibraryFixture(2)
 try{
  assert.equal(createPublicLibrary(f.root,empty,f.data).catalogue.articles.length,0)
  publishFixture(f.root,f.data,0)
  const original=structuredClone(f.data)
  for(const mutate of [(a:any)=>a.assets[0].rights=null,(a:any)=>a.publication.expertReview=null,(a:any)=>a.publication.readerQA.contentHash='f'.repeat(64)]){
   const data=structuredClone(original);mutate(data.articles[0]);assert.throws(()=>createPublicLibrary(f.root,empty,data))
  }
 }finally{f.close()}
})
test('P2: isolated production build carries 29 eligible synthetic Readers/SVGs and passes the real scanner',async()=>{
 const {cpSync,mkdirSync,writeFileSync,readdirSync}=await import('node:fs')
 const {build}=await import('vite')
 const {default:react}=await import('@vitejs/plugin-react')
 const {editorial}=await import('../build/editorial.ts')
 const {scanProduction}=await import('../build/publication-scan.ts')
 const f=createLibraryFixture(29)
 try{
  f.data.articles.forEach((_,i)=>publishFixture(f.root,f.data,i))
  for(const path of ['src','public','index.html'])cpSync(repositoryRoot+'/prototype/'+path,f.root+'/prototype/'+path,{recursive:true})
  mkdirSync(f.root+'/prototype/editorial',{recursive:true})
  writeFileSync(f.root+'/prototype/editorial/source-manifest.json',JSON.stringify(f.data))
  writeFileSync(f.root+'/prototype/editorial/catalogue.json',JSON.stringify(empty))
  writeFileSync(f.root+'/prototype/editorial/weekly.json',JSON.stringify({schemaVersion:1,topics:[]}))
  mkdirSync(f.root+'/prototype/node_modules',{recursive:true})
  cpSync(repositoryRoot+'/prototype/node_modules/@fontsource',f.root+'/prototype/node_modules/@fontsource',{recursive:true})
  const output=f.root+'/prototype/dist'
  await build({configFile:false,root:f.root+'/prototype',base:'./',logLevel:'error',plugins:[react(),editorial(f.root),{name:'synthetic-weekly-snapshot',resolveId(id){if(id==='virtual:weekly')return '\0weekly-test'},load(id){if(id==='\0weekly-test')return 'export default '+JSON.stringify({selectedAt:new Date().toISOString(),reason:'empty',currentId:null,topics:[],articles:[]})}}],resolve:{alias:{react:repositoryRoot+'/prototype/node_modules/react','react-dom':repositoryRoot+'/prototype/node_modules/react-dom','react-router-dom':repositoryRoot+'/prototype/node_modules/react-router-dom'}},build:{outDir:output,sourcemap:false}})
  assert.equal(readdirSync(output+'/assets/articles').length,29)
  assert.equal(scanProduction(f.root,output,f.data,empty).withheldArticles,0)
  const js=readdirSync(output+'/assets').filter(n=>n.endsWith('.js')).map(n=>readFileSync(output+'/assets/'+n,'utf8')).join('')
  for(const a of f.data.articles)assert(js.includes(a.slug)&&js.includes(a.metadata.title))
  assert(!js.includes('docs/phase-3/drafts/'));assert(!js.includes('publicationAuthorization'))
 }finally{f.close()}
})
test('P2: weekly is a highlighted subset; changing the week preserves the whole source Library',async()=>{
 const {writeFileSync}=await import('node:fs')
 const {fixturePublication}=await import('./fixtures/library/create.ts')
 const {legacyHashes}=await import('../build/content-contract.ts')
 const {selectPublicWeekly}=await import('../build/weekly.ts')
 const f=createLibraryFixture(29)
 try{
  f.data.articles.forEach((_,i)=>publishFixture(f.root,f.data,i))
  writeFileSync(f.root+'/prototype/editorial/source-manifest.json',JSON.stringify(f.data))
  const make=(n:number,start:string,end:string)=>{
   const t={id:'KGNT-W00'+n,slug:'synthetic-week-'+n,title:'Synthetic weekly '+n,description:'Synthetic weekly schedule, test only',articleSlugs:f.data.articles.slice(n-1,n+1).map(a=>a.slug),startsAt:start+'T00:00:00+07:00',endsAt:end+'T00:00:00+07:00',status:'published' as const,publishedAt:'2026-01-02T00:00:00Z'}
   const hash=legacyHashes(t)
   return {...t,publication:{revision:'synthetic-r1',...hash,records:fixturePublication(f.root,t.slug,'synthetic-r1',hash.contentHash,hash.revisionHash)!,assets:[]}}
  }
  const registry={schemaVersion:1,topics:[make(1,'2026-10-01','2026-10-15'),make(2,'2026-10-15','2026-11-01')]}
  for(const [time,id] of [['2026-10-10','KGNT-W001'],['2026-10-20','KGNT-W002']]){
   const weekly=selectPublicWeekly(registry,empty,f.root,Date.parse(time))
   assert.equal(weekly.currentId,id)
   assert.equal(weekly.topics.find(t=>t.id===id)!.articleSlugs.length,2)
   assert.equal(createPublicLibrary(f.root,empty).catalogue.articles.length,29)
  }
 }finally{f.close()}
})
test('P2: a granted legacy collision cannot substitute for the withheld source revision',async()=>{
 const {fixturePublication}=await import('./fixtures/library/create.ts')
 const {legacyHashes}=await import('../build/content-contract.ts')
 const f=createLibraryFixture(1)
 try{
  const a={slug:f.data.articles[0].slug,title:'Synthetic legacy replacement',description:'Test only',topic:'Test',season:'Đầu năm',keywords:[],status:'published' as const,updated:'2026-01-01',readingMinutes:1,sections:[],sources:[],publishedAt:'2026-01-02T00:00:00Z'}
  const hashes=legacyHashes(a), legacy={...a,publication:{revision:'synthetic-r1',...hashes,records:fixturePublication(f.root,a.slug,'synthetic-r1',hashes.contentHash,hashes.revisionHash)!,assets:[]}}
  assert.equal(createPublicLibrary(f.root,{articles:[legacy],topics:[]},f.data).catalogue.articles.length,0)
  assert.throws(()=>assertArtifact(Buffer.from(legacy.title),'app.js',createBoundary(f.root,f.data,{articles:[legacy],topics:[]})))
  publishFixture(f.root,f.data,0)
  const publicArticles=createPublicLibrary(f.root,{articles:[legacy],topics:[]},f.data).catalogue.articles
  assert.equal(publicArticles.length,1);assert.equal(publicArticles[0].title,f.data.articles[0].metadata.title)
 }finally{f.close()}
})
test('P2: an empty-content preview module is rejected by the production graph guard',async()=>{
 const {editorial}=await import('../build/editorial.ts')
 const hook=editorial().generateBundle as unknown as (a:unknown,b:unknown)=>void
 assert.throws(()=>hook({}, {'hidden.js':{type:'chunk',code:'export {}',modules:{'\0virtual:p2-fixture':{}}}}),/test-only/)
})
