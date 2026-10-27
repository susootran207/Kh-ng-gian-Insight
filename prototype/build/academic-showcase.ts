// Build-only policy. This module never changes F0 publication state or evidence.
import { readFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import type { Catalogue, Article } from '../editorial/schema.ts'
import type { WeeklyView, WeeklyRegistry } from '../editorial/weekly-contract.ts'
import { assertRecord, canonical, legacyHashes, loadManifest, readReference, requireThat, sha256 } from './content-contract.ts'
import { compileSourceArticles } from './source-reader.ts'
import { publicAssetUrl } from './public-library.ts'
import { validateWeeklyRegistry } from './weekly.ts'

type Policy = {mode:string;articles:{id:string;slug:string;revisionHash:string;contentHash:string;assets:{path:string;sha256:string}[]}[];weeklySha256:string;protectedRecords:{path:string;sha256:string}[];publicAssets:{path:string;sha256:string}[]}
const json = (root:string,path:string) => JSON.parse(readFileSync(resolve(root,path),'utf8'))
export function createAcademicShowcase(root:string) {
  const policy:Policy=json(root,'prototype/editorial/academic-showcase-policy.json')
  const manifest=loadManifest(root), accepted=json(root,'docs/phase-3/r10/PREPARATION.json')
  const registry:WeeklyRegistry=json(root,'prototype/editorial/weekly.json')
  requireThat(policy.mode==='academic-showcase' && policy.articles.length===29 && new Set(policy.articles.map(a=>a.id)).size===29,'showcase exact article allowlist')
  requireThat(manifest.articles.length===29 && policy.protectedRecords.length===107,'showcase scope/record count')
  for(const record of policy.protectedRecords) readReference(root,record)
  for(const asset of policy.publicAssets) readReference(root,{path:"prototype/public/"+asset.path,sha256:asset.sha256})
  requireThat(sha256(readFileSync(resolve(root,'prototype/editorial/weekly.json')))===policy.weeklySha256,'showcase weekly registry changed')
  for(const a of manifest.articles){
    const pin=policy.articles.find(p=>p.id===a.id)
    requireThat(pin && pin.slug===a.slug && pin.contentHash===a.contentHash && pin.revisionHash===a.revisionHash && canonical(pin.assets)===canonical(a.assets.map(({path,sha256})=>({path,sha256}))), 'article outside showcase allowlist: '+a.id)
    const prior=accepted.articles.find((p:{id:string})=>p.id===a.id)
    requireThat(prior && a.assets.length===1,'showcase accepted scope missing')
    const scope={revision:a.revision,contentHash:a.contentHash,revisionHash:a.revisionHash}
    assertRecord(root,prior.editorial.record,{kind:'editorialApproval',subjectId:a.id,...scope},prior.editorial.record.at)
    const asset=a.assets[0]
    assertRecord(root,prior.asset.record,{kind:'assetRights',subjectId:asset.id,revision:asset.revision,contentHash:asset.sha256,revisionHash:a.revisionHash},prior.asset.record.at)
  }
  const articles:Article[]=compileSourceArticles(root,manifest.articles,publicAssetUrl).map(a=>{
    const document=structuredClone(a.document)
    document.trace=[]
    document.localLinks=document.localLinks?.map(l=>({source:l.source,target:'#publication-information'}))
    // Preserve original draft status; no synthetic publishedAt or review records.
    return {...a.card,id:a.id,collection:a.metadata.collection,updated:'',sections:[],sources:[],document,relatedSlugs:a.metadata.relatedArticleIds.flatMap(id=>manifest.articles.filter(b=>b.id===id).map(b=>b.slug))}
  })
  const selected=validateWeeklyRegistry(registry,new Set(articles.map(a=>a.slug)),root,Date.now())
  requireThat(selected.length===10 && accepted.topics.length===10,'showcase exact topic scope')
  for(const t of selected){
    const prior=accepted.topics.find((p:{id:string})=>p.id===t.id)
    requireThat(prior && canonical(legacyHashes({...t}))===canonical({contentHash:prior.contentHash,revisionHash:prior.revisionHash}),'showcase accepted topic mismatch')
    assertRecord(root,prior.editorialRecord,{kind:'editorialApproval',subjectId:t.slug,revision:prior.proposedPublicationRevision,...legacyHashes({...t})},prior.editorialRecord.at)
  }
  const topics=selected.map(({id,slug,title,description,startsAt,endsAt,articleSlugs})=>({id,slug,title,description,startsAt,endsAt,articleSlugs}))
  const weekly:WeeklyView={showcase:true,selectedAt:selected[0].startsAt,reason:'empty',currentId:topics[0].id,topics,articles}
  const catalogue:Catalogue={articles,topics:[]}
  const assets=manifest.articles.flatMap(a=>a.assets.map(asset=>({url:publicAssetUrl(a.id,asset.sha256,basename(asset.path)),bytes:readReference(root,asset)})))
  return {catalogue,weekly,assets,manifest,policy}
}
