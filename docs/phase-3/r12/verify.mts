// Read-only: no invented review dates, no publication writes.
import {readFileSync} from 'node:fs'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import {loadManifest,assertRecord,legacyHashes,validDate,sha256,selectSourceView} from '../../../prototype/build/content-contract.ts'
import {validateWeeklyRegistry,selectPublicWeekly,weeklyTime} from '../../../prototype/build/weekly.ts'
const root=fileURLToPath(new URL('../../../',import.meta.url)),base='cf088fcac7f74eecade6d6840c75ff5d99735b4e',read=(p:string)=>readFileSync(root+p),json=(p:string)=>JSON.parse(read(p).toString())
const m=loadManifest(root),r10=json('docs/phase-3/r10/PREPARATION.json'),auth=json('docs/phase-3/r11/AUTHORIZATIONS.json'),intake=json('docs/phase-3/r12/STATUS.json'),w=json('prototype/editorial/weekly.json'),cat=json('prototype/editorial/catalogue.json')
let records=0,refs=0
const originalProofHashes:{path:string;sha256:string}[]=[]
function unchanged(p:string){if(!read(p).equals(execFileSync('git',['show',base+':'+p],{cwd:root})))throw new Error('protected file changed '+p)}
function record(r:any,expected:any){assertRecord(root,r,expected,r.at);unchanged(r.evidence.path);originalProofHashes.push(r.evidence);records++}
for(const a of m.articles){const old=r10.articles.find((x:any)=>x.id===a.id),scope={subjectId:a.id,revision:a.revision,contentHash:a.contentHash,revisionHash:a.revisionHash};record(old.editorial.record,{kind:'editorialApproval',...scope});const asset=a.assets[0];record(old.asset.record,{kind:'assetRights',subjectId:asset.id,revision:asset.revision,contentHash:asset.sha256,revisionHash:a.revisionHash});record(auth.records.find((x:any)=>x.id===a.id).record,{kind:'publicationAuthorization',...scope})
 const row=intake.subjects.find((x:any)=>x.id===a.id);if(!row||row.contentHash!==a.contentHash||row.revisionHash!==a.revisionHash||!row.reportedScopeConfirmed)throw new Error('intake source scope mismatch')
 for(const f of [a.source,...Object.values(a.dossiers),...a.assets]){if(sha256(read(f.path))!==f.sha256)throw new Error('source hash mismatch');unchanged(f.path);refs++}
 for(const width of [320,390,768,1440]){const q=json('docs/phase-3/q1/verification/coverage-'+width+'.json').find((x:any)=>x.id===a.id);if(q.sourceHash!==a.contentHash||q.svgHash!==asset.sha256||q.ast!==q.dom)throw new Error('Q1 mismatch')}
}
const topics=validateWeeklyRegistry(w,new Set(m.articles.map(a=>a.slug)),root,Date.now())
for(const t of topics){const old=r10.topics.find((x:any)=>x.id===t.id),hashes=legacyHashes(t),scope={subjectId:t.slug,revision:old.proposedPublicationRevision,...hashes};record(old.editorialRecord,{kind:'editorialApproval',...scope});record(auth.records.find((x:any)=>x.id===t.id).record,{kind:'publicationAuthorization',...scope});const row=intake.subjects.find((x:any)=>x.id===t.id);if(!row||row.contentHash!==hashes.contentHash||row.revisionHash!==hashes.revisionHash||!row.reportedScopeConfirmed)throw new Error('intake weekly scope mismatch')}
if(records!==107||refs!==203||intake.subjects.length!==39)throw new Error('count mismatch')
const rejected=[]
for(const kind of ['expertReview','readerQA','learnerReview']){if(intake[kind].at!==null)throw new Error('unprovided review date filled');let error='';try{validDate(intake[kind].at)}catch(e){error=(e as Error).message}if(!error)throw new Error('missing time accepted');rejected.push({kind,at:null,rejected:true,error})}
if(intake.readerQA.specificConclusion!==null||intake.learnerReview.specificConclusion!==null)throw new Error('unsupported conclusion')
for(const p of ['prototype/build/content-contract.ts','prototype/build/weekly.ts','prototype/build/publication-scan.ts','prototype/editorial/source-manifest.json','prototype/editorial/weekly.json'])unchanged(p)
const source=selectSourceView(m,root,{kind:'public'}),weekly=selectPublicWeekly(w,cat,root)
console.log(JSON.stringify({result:'PASS scoped evidence/integrity and missing-time negative checks; RELEASE BLOCKED',base,unchangedValidatedRecords:records,sourceFilesUnchanged:refs,ownerReportedScopeBound:39,expertConclusion:'cho phép (owner reported, not direct teacher signature)',device:'laptop (owner reported, browser/actions not inferred)',missingTimeRejected:rejected,newExpertReaderLearnerRecordsCreated:0,publicArticles:source.articles.length,weeklyWithAllPublicationProofs:topics.filter(t=>t.status==='published').length,weeklyStartedByCalendar:topics.filter(t=>weeklyTime(t.startsAt)<=Date.now()).length,weeklyPublic:weekly.topics.length,guardUnchanged:true,originalProofHashes},null,2))
