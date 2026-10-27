// Read-only intake validation. No inferred approvals, fixtures or publication writes.
import {readFileSync} from 'node:fs'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import {loadManifest,legacyHashes,sha256,assertRecord,selectSourceView} from '../../../prototype/build/content-contract.ts'
import {validateWeeklyRegistry,selectPublicWeekly} from '../../../prototype/build/weekly.ts'
const root=fileURLToPath(new URL('../../../',import.meta.url)),base='4d434cc25848f2e3e1f381a7361a1afa1180cf6c'
const read=(p:string)=>readFileSync(root+p),r10=JSON.parse(read('docs/phase-3/r10/PREPARATION.json').toString()),m=loadManifest(root),w=JSON.parse(read('prototype/editorial/weekly.json').toString()),catalogue=JSON.parse(read('prototype/editorial/catalogue.json').toString())
let records=0,sourceFiles=0
const protection: {path:string;sha256:string}[]=[]
function unchanged(path:string){const b=read(path),old=execFileSync('git',['show',base+':'+path],{cwd:root});if(!b.equals(old))throw new Error('changed protected file '+path);protection.push({path,sha256:sha256(b)})}
function record(r:any,scope:any){assertRecord(root,r,scope,r.at);unchanged(r.evidence.path);records++}
for(const a of m.articles){const old=r10.articles.find((x:any)=>x.id===a.id);if(a.contentHash!==old.contentHash||a.revisionHash!==old.revisionHash)throw new Error('source scope mismatch')
 record(old.editorial.record,{kind:'editorialApproval',subjectId:a.id,revision:a.revision,contentHash:a.contentHash,revisionHash:a.revisionHash})
 const asset=a.assets[0];record(old.asset.record,{kind:'assetRights',subjectId:asset.id,revision:asset.revision,contentHash:asset.sha256,revisionHash:a.revisionHash})
 for(const f of [a.source,...Object.values(a.dossiers),...a.assets]){if(sha256(read(f.path))!==f.sha256)throw new Error('source hash mismatch');unchanged(f.path);sourceFiles++}
 for(const width of [320,390,768,1440]){const q=JSON.parse(read('docs/phase-3/q1/verification/coverage-'+width+'.json').toString()).find((x:any)=>x.id===a.id);if(q.sourceHash!==a.contentHash||q.svgHash!==asset.sha256||q.ast!==q.dom)throw new Error('Q1 mismatch')}
}
const topics=validateWeeklyRegistry(w,new Set(m.articles.map(a=>a.slug)),root,Date.now())
for(const t of topics){const old=r10.topics.find((x:any)=>x.id===t.id),hashes=legacyHashes(t);if(hashes.contentHash!==old.contentHash)throw new Error('weekly payload mismatch');record(old.editorialRecord,{kind:'editorialApproval',subjectId:t.slug,revision:old.proposedPublicationRevision,...hashes})}
if(records!==68||sourceFiles!==203)throw new Error('protected count mismatch')
unchanged('docs/phase-3/r10/CONFIRMATION.md');unchanged('prototype/editorial/source-manifest.json');unchanged('prototype/editorial/weekly.json')
const auth=JSON.parse(read('docs/phase-3/r11/AUTHORIZATIONS.json').toString());if(auth.records.length!==39)throw new Error('authorization count mismatch');
for(const entry of auth.records){const a=m.articles.find(x=>x.id===entry.id),t=topics.find(x=>x.id===entry.id);if(!a&&!t)throw new Error('unknown authorization subject');const scope=a?{subjectId:a.id,revision:a.revision,contentHash:a.contentHash,revisionHash:a.revisionHash}:{subjectId:t!.slug,revision:r10.topics.find((x:any)=>x.id===entry.id).proposedPublicationRevision,...legacyHashes(t!)};if(entry.record.by!==auth.by||entry.record.at!==auth.at||Date.parse(auth.at)>Date.now())throw new Error('authorization confirmation mismatch');assertRecord(root,entry.record,{kind:'publicationAuthorization',...scope},auth.at);const proof=JSON.parse(read(entry.record.evidence.path).toString());if(proof.confirmation.sha256!==sha256(read(proof.confirmation.path)))throw new Error('authorization receipt mismatch')}
const publicView=selectSourceView(m,root,{kind:'public'}),weekly=selectPublicWeekly(w,catalogue,root)
console.log(JSON.stringify({status:'PASS intake/integrity checks; RELEASE BLOCKED pending scoped human evidence',base,existingRecordsValidated:records,sourceFilesUnchanged:sourceFiles,newHumanReviewRecordsCreated:0,newPublicationAuthorizationValidated:39,publicArticles:publicView.articles.length,publicWeekly:weekly.topics.length,activityOccurrence:'three real activities confirmed by owner; per-subject coverage/conclusions unconfirmed',guardChanged:false,protectedFiles:protection},null,2))
