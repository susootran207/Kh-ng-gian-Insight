// Read-only validation of real R1.0 evidence; never grants publication or creates fixtures.
import {readFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {loadManifest,assertRecord,legacyHashes,selectSourceView,sha256,assertPublication} from '../../../prototype/build/content-contract.ts'
import {validateWeeklyRegistry} from '../../../prototype/build/weekly.ts'
const root=fileURLToPath(new URL('../../../',import.meta.url)),path=(p:string)=>root+p
const s=JSON.parse(readFileSync(path('docs/phase-3/r10/PREPARATION.json'),'utf8')),m=loadManifest(root),w=JSON.parse(readFileSync(path('prototype/editorial/weekly.json'),'utf8'))
if(s.articles.length!==29||s.topics.length!==10)throw new Error('count mismatch')
let records=0
function validate(record:any,expected:any){if(!record)throw new Error('missing authorized record');if(record.by!==s.confirmation.by||record.at!==s.confirmation.at)throw new Error('owner confirmation mismatch');if(Date.parse(record.at)>Date.now())throw new Error('future record');assertRecord(root,record,expected,record.at);const proof=JSON.parse(readFileSync(path(record.evidence.path),'utf8'));if(proof.confirmation?.path!=='docs/phase-3/r10/CONFIRMATION.md'||sha256(readFileSync(path(proof.confirmation.path)))!==proof.confirmation.sha256)throw new Error('confirmation reference mismatch');records++}
for(const a of s.articles){const real=m.articles.find(x=>x.id===a.id)!;if(!real||a.contentHash!==real.contentHash||a.revisionHash!==real.revisionHash)throw new Error('source scope mismatch')
 const asset=real.assets[0];if(a.asset.sha256!==asset.sha256)throw new Error('asset scope mismatch')
 validate(a.editorial.record,{kind:'editorialApproval',subjectId:real.id,revision:real.revision,contentHash:real.contentHash,revisionHash:real.revisionHash})
 validate(a.asset.record,{kind:'assetRights',subjectId:asset.id,revision:asset.revision,contentHash:asset.sha256,revisionHash:real.revisionHash})
 if(real.status!=='draft'||real.publication!==null||real.publishedAt!==null||asset.rights!==null)throw new Error('unexpected publication')
 for(const width of [320,390,768,1440]){const rows=JSON.parse(readFileSync(path('docs/phase-3/q1/verification/coverage-'+width+'.json'),'utf8'));const q=rows.find((x:any)=>x.id===real.id);if(q.sourceHash!==real.contentHash||q.svgHash!==asset.sha256||q.ast!==q.dom)throw new Error('Q1 scope mismatch')}
}
const topics=validateWeeklyRegistry(w,new Set(m.articles.map(a=>a.slug)),root,Date.now())
for(const t of s.topics){const real=topics.find(x=>x.id===t.id)!;const hashes=legacyHashes(real);if(hashes.contentHash!==t.contentHash||JSON.stringify(t.payload)!==JSON.stringify(real))throw new Error('weekly scope mismatch')
 validate(t.editorialRecord,{kind:'editorialApproval',subjectId:real.slug,revision:t.proposedPublicationRevision,...hashes});if(real.status!=='draft')throw new Error('weekly status changed')
}
if(records!==68||s.counts.approvedF0RecordsCreated!==68)throw new Error('expected 68 authorized records');
const publicView=selectSourceView(m,root,{kind:'public'});if(publicView.articles.length!==0)throw new Error('unexpected eligibility')
let rejected=false;try{assertPublication(root,{...m.articles[0],publishedAt:new Date().toISOString()})}catch{rejected=true}if(!rejected)throw new Error('incomplete publication accepted')
console.log(JSON.stringify({result:'PASS scoped evidence validation',articles:m.articles.length,svg:m.articles.reduce((n,a)=>n+a.assets.length,0),weekly:topics.length,validatedDetachedRecords:records,publicArticles:publicView.articles.length,incompleteBundleRejected:rejected,publicationGuardChanged:false,q1Evidence:'reused by matching full source/SVG hashes, no new human claim'},null,2))
