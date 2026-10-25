#!/usr/bin/env python3
"""Offline structural checks for B01; does not verify science, learning, or approval."""
from pathlib import Path
import argparse,json,re,xml.etree.ElementTree as ET

IDS=('C06','C07','C08','C14','C18')
FILES={'ARTICLE.md','REFERENCES.md','CLAIM-AUDIT.md','BLOOM-REVIEW.md','VISUAL-REVIEW.md','EDITORIAL-REVIEW.md'}
TIER={'C06':'STANDARD / MEDIUM','C07':'FEATURED / MEDIUM','C08':'STANDARD / LOW','C14':'FEATURED / MEDIUM','C18':'STANDARD / MEDIUM'}
CITES={'CCI':r'Centre for Clinical Interventions \(CCI, n\.d\.|CCI \(n\.d\.', 'YOUTH':r'González-Brignardello et al\., 2023','NIMH':r'NIMH\], 2024','STEEL':r'Steel \(2007', 'AGARWAL':r'Agarwal et al\. \(2021','DUNLOSKY':r'Dunlosky et al\., 2013','MCDANIEL':r'McDaniel et al\., 2011','HATTIE':r'Hattie và Timperley \(2007','WISNIEWSKI':r'Wisniewski et al\. \(2020','CDC':r'CDC \(2024','GULLIVER':r'Gulliver et al\., 2010','NAMI':r'National Alliance on Mental Illness \(NAMI, n\.d\.|NAMI \(n\.d\.','ALBULESCU':r'Albulescu et al\., 2022','UN':r'United Nations, 1989'}

def contrast(a,b):
 def lum(c):
  rgb=[int(c[i:i+2],16)/255 for i in (1,3,5)]
  vals=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in rgb]
  return sum(x*y for x,y in zip(vals,[.2126,.7152,.0722]))
 x,y=sorted([lum(a),lum(b)])
 return (y+.05)/(x+.05)

def main():
 ap=argparse.ArgumentParser();ap.add_argument('--baseline-root',type=Path);args=ap.parse_args()
 root=Path(__file__).resolve().parents[4]
 base=(args.baseline_root or root).resolve()
 matrix={x['id'].split('-')[1]:x for x in json.loads((base/'docs/phase-3/matrix.json').read_text())['articles']}
 batch=root/'docs/phase-3/batches/B01';index=json.loads((batch/'source-index.json').read_text());assets=json.loads((batch/'asset-index.json').read_text())
 assert set(index['articleSources'])==set(IDS)==set(assets)
 reports=[];links=0
 for id in IDS:
  d=root/'docs/phase-3/drafts'/id
  assert {p.name for p in d.iterdir()}==FILES|{assets[id]['file']},id
  a=(d/'ARTICLE.md').read_text();ed=(d/'EDITORIAL-REVIEW.md').read_text();v=(d/'VISUAL-REVIEW.md').read_text();ref=(d/'REFERENCES.md').read_text();c=(d/'CLAIM-AUDIT.md').read_text();b=(d/'BLOOM-REVIEW.md').read_text()
  assert a.splitlines()[0]=='# '+matrix[id]['title'],id+' title'
  for token in [f'KGNT-{id}',matrix[id]['slug'],matrix[id]['topic'],TIER[id],f'{id.lower()}-draft-r1','editorialApproval: null','expertReview: null','publicationAuthorization: null','PENDING_EXTERNAL_REVIEW']:
   assert token in ed,(id,token)
  body,bib=a.split('## Tài liệu tham khảo\n\n');bib=bib.split('\n\n[Hồ sơ nguồn]')[0]
  keys=index['articleSources'][id];expected='\n\n'.join(index['sources'][k]['apa'] for k in keys)
  assert bib.strip()==expected.strip(),id+' bibliography'
  for k in keys:
   s=index['sources'][k];assert s['apa'] in ref,(id,k,'APA')
   assert re.search(CITES[k],body),(id,k,'missing body citation')
   assert id+'-'+k in c,(id,k,'missing claim mapping')
   assert s['access'] in ref and s['location'] in ref,(id,k,'access/location')
  for n in range(1,4):
   assert re.search(r'\*\*'+str(n)+r'\.',body),(id,n,'question')
   assert '**Câu '+str(n)+':' in body,(id,n,'feedback')
  for word in ['Nhớ','Hiểu','Vận dụng','Remember','Understand','Apply']:assert word in b,(id,word)
  assert 'giả định' in body and 'bỏ qua' in body,id+' voluntary/fiction'
  match=re.search(r'!\[(.*?)\]\('+re.escape(assets[id]['file'])+r'\)',a);assert match,id+' figure'
  assert match.group(1) in v,id+' alt record'
  assert '**Mô tả tương đương bằng chữ:**' in a and 'Caption:' in v,id+' descriptions'
  svg=ET.parse(d/assets[id]['file']).getroot();allowed={'svg','g','rect','text','title','desc'}
  assert svg.attrib['viewBox'].split()[2]=='320'
  assert svg.attrib.get('role')=='img' and svg.attrib.get('aria-labelledby')=='title desc'
  desc=svg.find('{http://www.w3.org/2000/svg}desc');assert desc is not None and desc.text==match.group(1),(id,'SVGdesc')
  for node in svg.iter():
   assert node.tag.split('}')[-1] in allowed,(id,node.tag)
   for name,value in node.attrib.items():
    assert not name.lower().startswith('on') and 'href' not in name.lower(),(id,name)
    assert not re.search(r'url\(|https?://|javascript:|data:',value,re.I),(id,value)
   if node.tag.endswith('}text'):assert float(node.attrib['font-size'])>=16
  assert 'chưa có quyền xuất bản' in body.lower() and 'chưa rà soát chuyên môn độc lập' in body.lower()
  reports.append({'id':id,'revision':id.lower()+'-draft-r1','structural':'PASS','sources':len(keys),'abstractOnly':sum(index['sources'][k]['access']=='abstract_only' for k in keys)})
 for d in [root/'docs/phase-3/drafts'/id for id in IDS]+[batch]:
  for p in d.glob('*.md'):
   for dest in re.findall(r'\]\(([^)]+)\)',p.read_text()):
    if re.match(r'https?://',dest) or dest.startswith('#'):continue
    rel=dest.split('#')[0];target=(p.parent/rel).resolve()
    assert target.is_relative_to(root),('escape',p,dest)
    assert target.exists() or (base/target.relative_to(root)).exists(),('missing link',p,dest)
    links+=1
 colors={c:round(contrast('#333e32',c),2) for c in ['#fffdf7','#dce3d2','#e9e2ee']}
 assert min(colors.values())>=4.5
 print(json.dumps({'articles':reports,'internalLinks':links,'textContrast':colors,'sourceUses':sum(len(x) for x in index['articleSources'].values()),'uniqueContentSources':len(index['sources']),'scope':'structural only; manual source/semantic/render review separate'},ensure_ascii=False,indent=2))

if __name__=='__main__':main()
