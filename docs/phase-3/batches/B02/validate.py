#!/usr/bin/env python3
"""Read-only structural checks. Never establishes scientific/editorial PASS.
Run from any directory; --root is repository root (default inferred from script).
No network, no writes, no execution of SVG or other content.
"""
from pathlib import Path
import argparse,json,re,xml.etree.ElementTree as ET
p=argparse.ArgumentParser();p.add_argument('--root',type=Path,default=Path(__file__).resolve().parents[4]);a=p.parse_args();root=a.root.resolve();phase=root/'docs/phase-3';batch=phase/'batches/B02'
s=json.loads((batch/'source-index.json').read_text());assets=json.loads((batch/'asset-index.json').read_text());matrix={x['id'].split('-')[1]:x for x in json.loads((phase/'matrix.json').read_text())['articles']};priority=(phase/'accelerated-plan/ARTICLE-PRIORITY.md').read_text()
expected={'C02':('FEATURED','HIGH'),'C03':('STANDARD','MEDIUM'),'C04':('STANDARD','MEDIUM'),'C09':('STANDARD','MEDIUM'),'C23':('STANDARD','LOW')};errors=[];count=0

def check(ok,msg):
 global count
 count+=1
 if not ok:errors.append(msg)
def lum(h):
 v=[int(h[i:i+2],16)/255 for i in (1,3,5)];v=[x/12.92 if x<=.04045 else ((x+.055)/1.055)**2.4 for x in v];return sum(x*y for x,y in zip(v,[.2126,.7152,.0722]))
for bg in ['#fffdf7','#dce3d2','#e9e2ee']:
 contrast=(lum(bg)+.05)/(lum('#333e32')+.05);check(contrast>=4.5,'contrast '+bg);print(f'contrast {bg}: {contrast:.2f}:1')
ns={'s':'http://www.w3.org/2000/svg'}
for id,(tier,risk) in expected.items():
 d=phase/'drafts'/id;m=matrix[id];art=(d/'ARTICLE.md').read_text();audit=(d/'CLAIM-AUDIT.md').read_text();editor=(d/'EDITORIAL-REVIEW.md').read_text();bloom=(d/'BLOOM-REVIEW.md').read_text();visual=(d/'VISUAL-REVIEW.md').read_text();refs=(d/'REFERENCES.md').read_text()
 required={'ARTICLE.md','REFERENCES.md','CLAIM-AUDIT.md','BLOOM-REVIEW.md','VISUAL-REVIEW.md','EDITORIAL-REVIEW.md',assets[id]['file']}
 check({x.name for x in d.iterdir()}==required,id+' exact seven files')
 check(art.startswith('# '+m['title']+'\n'),id+' title')
 for value in [m['id'],m['title'],m['slug'],m['topic'],m['collection'],tier,risk]:check(value in editor,id+' metadata '+value)
 row=next((x for x in priority.splitlines() if x.startswith('| KGNT-'+id+' |')),'');check(all(v in row for v in [m['title'],m['slug'],tier,risk,'B02']),id+' priority')
 check(id.lower()+'-draft-r1' in art and 'null / null / null' in editor,id+' draft/null')
 check('PENDING_EXTERNAL_REVIEW' in editor,id+' external pending')
 for n in (1,2,3):check(f'**{n}.' in art and f'**Câu {n}:**' in art,id+f' question/feedback{n}')
 for level in ['Nhớ','Hiểu','Vận dụng']:check(level in bloom,id+' Bloom '+level)
 check('bỏ qua' in art and 'giả định' in art,id+' choice/fiction')
 body,bib=art.split('\n## Tài liệu tham khảo\n',1);entries=[x.strip() for x in bib.strip().split('\n\n')];check(entries==sorted(entries),id+' APA reference ordering')
 check(len(entries)==len(s['articleSourceIds'][id]),id+' reference count')
 for k in s['articleSourceIds'][id]:
  source=s['sources'][k];check(source['apa7'] in entries,id+' APA exact '+k);check(k in audit and k in refs,id+' source mapping '+k)
  key={'NHS26':r'NHS \(2026','NHS23A':r'NHS, 2023','NHS23G':r'NHS, 2023','NIMH24':r'NIMH\], 2024','NEFF03':r'Neff \(2003','MARSH18':r'Marsh et al\., 2018','COMPAS17':r'Compas et al\., 2017','LOADES20':r'Loades et al\. \(2020','CDC24':r'CDC, 2024','JINDAL20':r'Jindal-Snape et al\., 2020','YOUNG':r'YoungMinds \(n\.d\.'}[k]
  check(bool(re.search(key,body)),id+' in-text citation '+k)
 for k in s['articleSourceIds'][id]:check(s['sources'][k]['checked']=='2026-10-25' and s['sources'][k]['access'] in ['full_text_relevant_sections','abstract_only'],id+' scoped source access '+k)
 image=re.search(r'!\[(.*?)\]\((.*?\.svg)\)',art);check(image is not None,id+' image');alt,name=image.groups();svg=(d/name).read_text();tree=ET.fromstring(svg)
 check(alt==assets[id]['alt']==tree.find('s:desc',ns).text,id+' alt equality');check(assets[id]['caption'] in art and assets[id]['caption'] in visual,id+' caption equality');check(assets[id]['longDescription'] in art and assets[id]['longDescription'] in visual,id+' description equality')
 check(tree.get('viewBox').split()[2]=='320',id+' viewBox');check(tree.get('aria-labelledby')=='title desc' and tree.find('s:title',ns) is not None,id+' accessible SVG metadata')
 for el in tree.iter():
  check(el.tag.split('}')[-1] in ['svg','title','desc','rect','g','text'],id+' SVG tag '+el.tag)
  for k,v in el.attrib.items():check(not k.lower().startswith('on') and not k.endswith('href') and 'url(' not in v.lower(),id+' SVG unsafe attr')
 check(all(float(x)>=16 for x in re.findall(r'font-size="([\d.]+)"',svg)),id+' font size')
 check('script' not in svg.lower() and '<!DOCTYPE' not in svg and '<!ENTITY' not in svg,id+' SVG prohibited content')
 for md in d.glob('*.md'):
  for target in re.findall(r'\]\(([^)]+)\)',md.read_text()):
   if re.match(r'https?://',target) or target.startswith('#'):continue
   dest=(md.parent/target.split('#')[0]).resolve();check(dest.is_relative_to(root) and dest.exists(),id+' internal link '+target)
 print(f'{id}: structural checks complete; semantic audit is separate')
for target in re.findall(r'\]\(([^)]+)\)',(batch/'REVIEW.md').read_text()):
 if not re.match(r'https?://',target) and not target.startswith('#'):check((batch/target.split('#')[0]).resolve().exists(),'report link '+target)
print(f'{count} checks; {len(errors)} errors. NOT scientific/expert approval.')
for e in errors:print('ERROR:',e)
raise SystemExit(bool(errors))
