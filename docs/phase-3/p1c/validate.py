"""Read-only P1C inventory/scope check; never validates human authority or creates grants."""
from pathlib import Path
import hashlib,json,re,subprocess,datetime
ROOT=Path(__file__).resolve().parents[3]; DOC=Path(__file__).resolve().parent
BASE='16965ff8972124762ba712196ac211d769b09388'
def check(ok,msg):
    if not ok:raise AssertionError(msg)
def git(*args):return subprocess.check_output(['git',*args],cwd=ROOT)
def sha(b):return hashlib.sha256(b).hexdigest()
m=json.loads((ROOT/'prototype/editorial/source-manifest.json').read_text())
x=json.loads((DOC/'INVENTORY.json').read_text());integ=json.loads((DOC/'INTEGRITY.json').read_text())
past=json.loads((ROOT/'docs/phase-3/p1a/AUDIT.json').read_text());old={a['id']:a for a in past['articles']}
expected={f'KGNT-C{i:02}' for i in range(1,25)}|{f'KGNT-E{i:02}' for i in range(1,6)}
check(x['baseCommit']==BASE and integ['baseCommit']==BASE,'base')
check(len(x['articles'])==29 and {a['id'] for a in x['articles']}==expected,'29 unique IDs')
check(len({a['slug'] for a in x['articles']})==29,'unique slug')
check({a['id'] for a in x['articles'] if a['revision'].endswith('r2')}=={'KGNT-C01','KGNT-C05','KGNT-C17','KGNT-E05'},'4 r2/25 r1')
check(len(integ['files'])==203 and sum(p.endswith('.svg') for p in integ['files'])==29,'source inventory')
check(sha((ROOT/'prototype/editorial/source-manifest.json').read_bytes())==integ['manifestSha256'],'manifest checksum')
for path,r in integ['files'].items():
    check(sha((ROOT/path).read_bytes())==sha(git('show',BASE+':'+path))==r['beforeSha256']==r['afterSha256']==r['manifestSha256'],path)
table=(DOC/'ARTICLE-STATUS.md').read_text();decision=(DOC/'OWNER-DECISION.md').read_text()
check(x['recordedAt'] in decision,'actual recording timestamp')
check(datetime.datetime.fromisoformat(x['recordedAt']).utcoffset()==datetime.timedelta(hours=7),'recording timezone')
for a,real in zip(x['articles'],m['articles']):
    check(a['id']==real['id'],'ID/order')
    for k in ['slug','revision','source','contentHash','revisionHash','dossiers','assets']:
        check(a[k]==real[k]==old[a['id']][k],a['id']+' '+k)
    check(a['ownerContentAcceptance']=='RECORDED' and a['ownerDecision']==x['decisionId'],'decision accurately recorded')
    check(a['publicEligibility']=='BLOCKED','no public grant')
    check(a['f0Evidence']['editorialApproval']=='CONTENT_DECISION_RECORDED_RECORD_PENDING','editorial intent vs record')
    for k in ['expertReview','readerQA','learnerReview','publicationAuthorization','assetRights']:
        check(a['f0Evidence'][k]=='BLOCKED_MISSING_EVIDENCE','no fabricated '+k)
    check(real['status']=='draft' and real['publication'] is None and real['publishedAt'] is None and all(v['rights'] is None for v in real['assets']),'unchanged publication')
    for v in [a['id'],a['slug'],a['revision'],a['contentHash'],a['revisionHash'],a['assets'][0]['sha256']]:check(v in table,'full scope in table')
count=0
for item in git('ls-tree','-rz',BASE).split(b'\0'):
    if not item:continue
    meta,path=item.split(b'\t',1);_,kind,oid=meta.split();check(kind==b'blob','baseline kind')
    check(git('hash-object',str(ROOT/path.decode())).strip()==oid,'baseline blob changed: '+path.decode());count+=1
check(count==808,'baseline blobs')
check(all(p.startswith('docs/phase-3/p1c/') for p in git('diff','--name-only',BASE).decode().splitlines()),'scope diff')
links=0
for p in DOC.rglob('*.md'):
    for target in re.findall(r'\]\(([^\s)]+)\)',p.read_text()):
        if target.startswith(('https://','#')):continue
        check((p.parent/target.split('#')[0]).resolve().exists(),str(p)+' -> '+target);links+=1
print(json.dumps({'result':'PASS documentation/integrity only','articles':29,'ownerContentDecisionsRecorded':29,'r2':4,'r1':25,'svg':29,'sourceFilesUnchanged':203,'baselineBlobsUnchanged':count,'localLinks':links,'f0BundlesCreated':0,'publicEligibility':'BLOCKED'},ensure_ascii=False,indent=2))
