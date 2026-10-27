import { readFileSync, readdirSync, lstatSync } from 'node:fs'
import { resolve, relative } from 'node:path'
import { requireThat, readReference, sha256 } from './content-contract.ts'
import { assertArtifact, FIXTURE_SENTINEL } from './publication-scan.ts'
import { createAcademicShowcase } from './academic-showcase.ts'
function normalize(s:string){return s.replace(/\\u([\da-f]{4})/gi,(_,h)=>String.fromCharCode(parseInt(h,16))).replace(/\\[nrt]/g,' ').replace(/\\["'\\/]/g,s=>s.slice(1)).normalize('NFC').replace(/\s+/g,' ').trim()}
export function showcaseBoundary(root:string, release=createAcademicShowcase(root)) {
  const allowed=normalize(JSON.stringify([release.catalogue,release.weekly])+release.assets.map(a=>a.bytes.toString()).join(' '))
  const markers=[FIXTURE_SENTINEL,'virtual:p2-fixture','virtual:w2-preview','__r1_assets','expertReview','learnerReview','publicationAuthorization','source-manifest.json','academic-showcase-policy.json','publication-records/','docs/phase-3/','"evidence":','"by":"Chủ dự án']
  const withheldHashes=new Set<string>(),allowedAssets=new Set<string>()
  for(const a of release.manifest.articles)for(const f of Object.values(a.dossiers)){
    const bytes=readReference(root,f);withheldHashes.add(f.sha256)
    for(const paragraph of bytes.toString('utf8').split(/\n\s*\n|\n/).map(normalize).filter(p=>p.length>80))if(!allowed.includes(paragraph))markers.push(paragraph)
  }
  for(const record of release.policy.protectedRecords){withheldHashes.add(record.sha256);markers.push(record.sha256)}
  function addAssets(dir:string){for(const entry of readdirSync(dir,{withFileTypes:true})){const path=resolve(dir,entry.name);requireThat(!lstatSync(path).isSymbolicLink(),'showcase static symlink');if(entry.isDirectory())addAssets(path);else allowedAssets.add(sha256(readFileSync(path)))}}
  for(const asset of release.policy.publicAssets)allowedAssets.add(asset.sha256)
  addAssets(resolve(root,'prototype/node_modules/@fontsource'))
  for(const asset of release.assets)allowedAssets.add(sha256(asset.bytes))
  return {markers:[...new Set(markers)],withheldHashes,allowedAssets}
}
export function assertShowcaseModule(ids:string[]) {
  requireThat(ids.every(id=>!/(?:^|[/\\])(?:tests|preview|weekly-preview)(?:[/\\]|$)|virtual:(?:[rcwpdg][\d]+-(?:fixture|preview))|p2-preview|editorial[/\\](?:source-manifest|weekly|academic-showcase-policy)\.json/.test(id)),'non-production module in showcase graph')
}
export function scanAcademicShowcase(root:string,output:string) {
  const release=createAcademicShowcase(root),boundary=showcaseBoundary(root,release)
  const files:string[]=[]
  function walk(dir:string){requireThat(!lstatSync(dir).isSymbolicLink(),'showcase output symlink');for(const item of readdirSync(dir,{withFileTypes:true})){const path=resolve(dir,item.name);requireThat(!lstatSync(path).isSymbolicLink(),'showcase output symlink');if(item.isDirectory())walk(path);else files.push(path)}}
  walk(output)
  const publicFiles=release.policy.publicAssets.map(a=>a.path)
  const expectedAssets=new Map(release.assets.map(a=>[a.url.slice(1),sha256(a.bytes)]))
  const js:string[]=[]
  for(const file of files){const name=relative(output,file),bytes=readFileSync(file)
    requireThat(name==='index.html'||publicFiles.includes(name)||expectedAssets.has(name)||/^assets\/[A-Za-z0-9_.-]+\.(?:js|css|woff2?)$/.test(name),'unexpected showcase output file: '+name)
    assertArtifact(bytes,name,boundary)
    if(expectedAssets.has(name))requireThat(sha256(bytes)===expectedAssets.get(name),'showcase SVG bytes changed')
    if(name.endsWith('.js'))js.push(bytes.toString('utf8'))
  }
  const emitted=new Set(files.map(f=>relative(output,f)))
  requireThat(emitted.has('index.html')&&[...expectedAssets.keys()].every(p=>emitted.has(p))&&expectedAssets.size===29,'showcase incomplete 29 SVG artifact')
  requireThat(js.length===1 && files.filter(f=>f.endsWith('.css')).length===1,'unexpected code chunks in showcase output')
  const code=js.join('\n')
  for(const a of release.catalogue.articles){requireThat(code.includes(a.slug)&&code.includes(a.title)&&code.includes(a.document!.sourceHash),'showcase article missing from artifact: '+a.slug)}
  for(const t of release.weekly.topics)requireThat(code.includes(t.slug)&&code.includes(t.title),'showcase topic missing from artifact')
  requireThat(readFileSync(resolve(output,'index.html'),'utf8').includes('noindex, nofollow'),'showcase noindex missing')
  return {mode:'academic-showcase',articles:29,svg:29,topics:10,files:files.length,digest:sha256(files.sort().map(f=>relative(output,f)+'\0'+sha256(readFileSync(f))).join('\n'))}
}
