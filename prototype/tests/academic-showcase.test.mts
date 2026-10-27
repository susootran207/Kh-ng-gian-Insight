import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createAcademicShowcase } from '../build/academic-showcase.ts'
import { assertShowcaseModule, showcaseBoundary } from '../build/academic-showcase-scan.ts'
import { assertArtifact } from '../build/publication-scan.ts'
import { createPublicLibrary } from '../build/public-library.ts'
import { selectPublicWeekly } from '../build/weekly.ts'
import { loadManifest } from '../build/content-contract.ts'
const root=fileURLToPath(new URL('../../',import.meta.url))
const json=(p:string)=>JSON.parse(readFileSync(root+p,'utf8'))
test('Academic showcase projects exact accepted 29/29/10 without altering F0',()=>{
 const before=readFileSync(root+'prototype/editorial/source-manifest.json'), release=createAcademicShowcase(root)
 assert.equal(release.catalogue.articles.length,29);assert.equal(release.assets.length,29);assert.equal(release.weekly.topics.length,10)
 assert.equal(release.policy.protectedRecords.length,107)
 for(const a of release.catalogue.articles){assert.equal(a.status,'draft');assert.equal(a.publishedAt,undefined);assert.equal(a.publication,undefined);assert.equal(a.document!.trace.length,0);assert.equal(a.document!.assets.length,1);assert.ok(a.document!.localLinks?.every(l=>l.target==='#publication-information'));assert.ok(a.relatedSlugs!.every(s=>release.catalogue.articles.some(a=>a.slug===s)))}
 assert.deepEqual(readFileSync(root+'prototype/editorial/source-manifest.json'),before)
 const legacy=json('prototype/editorial/catalogue.json'),m=loadManifest(root)
 assert.equal(createPublicLibrary(root,legacy,m).catalogue.articles.length,0)
 assert.equal(selectPublicWeekly(json('prototype/editorial/weekly.json'),legacy,root).topics.length,0)
})
test('Showcase scanner rejects raw dossiers, records, sourcemaps, fixtures and foreign assets',()=>{
 const r=createAcademicShowcase(root),b=showcaseBoundary(root,r)
 for(const a of r.assets)assert.doesNotThrow(()=>assertArtifact(a.bytes,a.url,b))
 for(const a of r.manifest.articles)for(const f of Object.values(a.dossiers))assert.throws(()=>assertArtifact(readFileSync(root+f.path),'assets/leak.js',b))
 for(const f of r.policy.protectedRecords)assert.throws(()=>assertArtifact(readFileSync(root+f.path),'assets/leak.js',b))
 for(const [name,value] of [['x.map','{}'],['x.json','{}'],['x.js','F0_FIXTURE_ONLY_X'],['foreign.svg','<svg/>'],['x.js','publication-records/']])assert.throws(()=>assertArtifact(Buffer.from(value),name,b))
 for(const id of ['/src/preview/x.ts','virtual:p2-fixture','/tests/harness/x.ts','/editorial/weekly.json'])assert.throws(()=>assertShowcaseModule([id]))
})
