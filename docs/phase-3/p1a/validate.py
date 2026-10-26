"""Read-only P1A documentation/integrity validator. Not academic/legal approval."""
from pathlib import Path
import hashlib,json,re,subprocess
ROOT=Path(__file__).resolve().parents[3]
DOC=Path(__file__).resolve().parent
BASE='d7a6fa5bb978504df4e318df6049660a23fabd72'
def check(ok,msg):
    if not ok: raise AssertionError(msg)
def digest(b):return hashlib.sha256(b).hexdigest()
def git(*args):return subprocess.check_output(['git',*args],cwd=ROOT)
m=json.loads((ROOT/'prototype/editorial/source-manifest.json').read_text())
audit=json.loads((DOC/'AUDIT.json').read_text());integrity=json.loads((DOC/'INTEGRITY.json').read_text())
expected={f'KGNT-C{i:02}' for i in range(1,25)}|{f'KGNT-E{i:02}' for i in range(1,6)}
check(len(audit['articles'])==29 and {a['id'] for a in audit['articles']}==expected,'29 unique audit IDs')
check(len({a['slug'] for a in audit['articles']})==29,'unique slug')
check({a['id'] for a in audit['articles'] if a['revision'].endswith('r2')}=={'KGNT-C01','KGNT-C05','KGNT-C17','KGNT-E05'},'4 r2 /25 r1')
check({p.stem for p in (DOC/'articles').glob('*.md')}=={i[5:] for i in expected},'29 packets')
check(len(integrity['files'])==203,'203 integrity entries')
for path,record in integrity['files'].items():
    actual=digest((ROOT/path).read_bytes());before=digest(git('show',BASE+':'+path))
    check(actual==before==record['beforeSha256']==record['afterSha256']==record['manifestSha256'],path)
for a,real in zip(audit['articles'],m['articles']):
    check(a['id']==real['id'] and a['sourceHash']==real['source']['sha256'],'source hash')
    for key in ['slug','revision','contentHash','revisionHash','metadata','source','dossiers','assets']:check(a[key]==real[key],a['id']+' '+key)
    check(a['auditStatus']=='BLOCKED FOR REVIEW' and a['science']==a['assetRightsVerification']=='UNVERIFIED','no fabricated approval')
    check(real['status']=='draft' and real['publication'] is None and real['publishedAt'] is None and all(x['rights'] is None for x in real['assets']),'publication unchanged')
    check(len(a['questions'])==len(a['responses'])==3 and len(a['claimRows'])>0,'review locators')
    packet=(DOC/'articles'/(a['id'][5:]+'.md')).read_text()
    for value in [a['sourceHash'],a['contentHash'],a['revisionHash'],a['assets'][0]['sha256']]:check(value in packet,'packet full hashes')
ref=integrity['manifest'];check(digest((ROOT/ref['path']).read_bytes())==ref['beforeSha256']==ref['afterSha256'],'manifest unchanged')
access=json.loads((DOC/'SOURCE-ACCESS.json').read_text())
check(len(access)==119 and len({a['url'] for a in access})==119,'119 source attempts')
check(all(x['access']=='UNVERIFIED' and x['httpStatus'] is None and x['proxyTunnelStatus']==403 for x in access),'honest proxy classification')
check({u for a in m['articles'] for u in a['referenceUrls']}<= {a['url'] for a in access},'manifest bibliography access coverage')
# Verify local doc links and all pinned line references, without claiming external HTTP/source verification.
links=0;pinned=0
for file in DOC.rglob('*.md'):
    text=file.read_text()
    for target in re.findall(r'\]\(([^\s)]+)\)',text):
        if target.startswith('https://'):
            prefix=f'https://github.com/susootran207/Kho-ng-gian-Insight/blob/{BASE}/'
            if target.startswith(prefix):
                path,_,frag=target[len(prefix):].partition('?plain=1#L');check(frag.isdigit(),'pinned locator syntax')
                check((ROOT/path).is_file() and 1<=int(frag)<=len((ROOT/path).read_text().splitlines()),'pinned line range');pinned+=1
            continue
        if target.startswith('#'):continue
        path=target.split('#')[0];check((file.parent/path).resolve().exists(),str(file)+' -> '+path);links+=1
# Every pre-existing tracked blob remains byte-for-byte unchanged, including app/guard/CI/approvals.
base_files=git('ls-tree','-rz',BASE).split(b'\0');count=0
for item in base_files:
    if not item:continue
    meta,path=item.split(b'\t',1);mode,kind,oid=meta.split();check(kind==b'blob','expected blob')
    name=path.decode();check(git('hash-object',str(ROOT/name)).strip()==oid,'base blob changed: '+name);count+=1
changed=git('diff','--name-only',BASE).decode().splitlines()
check(all(p.startswith('docs/phase-3/p1a/') for p in changed),'diff outside P1A')
print(json.dumps({'result':'PASS documentation/integrity only','articles':29,'r2':4,'r1':25,'sourceFilesUnchanged':203,'baselineBlobsUnchanged':count,'localLinks':links,'pinnedLineLinks':pinned,'externalAttempts':119,'externalVerified':0,'publicationGrantsCreated':0},ensure_ascii=False,indent=2))
