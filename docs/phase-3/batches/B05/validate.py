#!/usr/bin/env python3
"""Read-only B05 structural checks: no writes, network or execution of article/SVG.
Default root inferred from this file; --root may select a checkout for validation.
This does NOT verify scientific claims or human/expert approval.
"""
from pathlib import Path
import argparse,json,re,xml.etree.ElementTree as ET
p=argparse.ArgumentParser();p.add_argument('--root',type=Path,default=Path(__file__).resolve().parents[4]);a=p.parse_args();root=a.root.resolve();phase=root/'docs/phase-3';B=phase/'batches/B05'
S=json.loads((B/'source-index.json').read_text());V=json.loads((B/'asset-index.json').read_text());M={x['id'].split('-')[1]:x for x in json.loads((phase/'matrix.json').read_text())['articles']}
priority=(phase/'accelerated-plan/ARTICLE-PRIORITY.md').read_text();schedule=(phase/'accelerated-plan/BATCH-SCHEDULE.md').read_text()
expected={'C24':('FEATURED','HIGH'),'E01':('STANDARD','HIGH'),'E02':('STANDARD','HIGH'),'E03':('STANDARD','HIGH'),'E04':('STANDARD','HIGH')}
errors=[];count=0

def check(ok,msg):
 global count
 count+=1
 if not ok:errors.append(msg)
def lum(h):
 v=[int(h[i:i+2],16)/255 for i in (1,3,5)];v=[x/12.92 if x<=.04045 else ((x+.055)/1.055)**2.4 for x in v];return sum(x*y for x,y in zip(v,[.2126,.7152,.0722]))
def links(path):
 for t in re.findall(r'\]\(([^)]+)\)',path.read_text()):
  if re.match(r'https?://',t) or t.startswith('#'):continue
  d=(path.parent/t.split('#')[0]).resolve();check(d.is_relative_to(root) and d.exists(),str(path.relative_to(root))+' link '+t)
for bg in ['#fffdf7','#dce3d2','#e9e2ee']:
 ratio=(lum(bg)+.05)/(lum('#333e32')+.05);check(ratio>=4.5,'contrast '+bg);print(f'contrast {bg}: {ratio:.2f}:1')
row=next(x for x in schedule.splitlines() if x.startswith('| B05 |'));check('C24, E01, E02, E03, E04' in row and '1 / 4' in row and '5 / 0 / 0' in row,'schedule')
check(set(S['articleSourceIds'])==set(expected)==set(V),'index scope')
ns={'s':'http://www.w3.org/2000/svg'}
# Explicit author/year forms used by articles. Structural presence alone does not validate meaning.
cite={'OECD24':r'OECD \(2024','NCS':r'National Careers Service \(n\.d\.','AERA14':r'American Educational Research Association et al\., 2014','MBTIFACT':r'The Myers-Briggs Company(?: \(|, )n\.d\.','NERIS':r'16Personalities, n\.d\.','STEIN19':r'Stein và Swan \(2019','ERFORD25':r'Erford et al\. \(2025','JOHN08':r'John et al\., 2008','SOTO08':r'Soto et al\. \(2008','VIC25':r'Vicentini et al\. \(2025','BPL':r'Berkeley Personality Lab \(n\.d\.','ONET21':r'Rounds et al\., 2021','ONETLIC':r'National Center for O\\\*NET Development \(n\.d\.','WHO26':r'WHO, 2026','CMUCOLD':r'The Common Cold Project \(n\.d\.','CMUSCALE':r'Laboratory for the Study of Stress, Immunity, and Disease, n\.d\.','DAO17':r'Dao-Tran et al\. \(2017','NLM26':r'National Library of Medicine \(2026'}
def apa_order(x):return x.removeprefix('The ').replace('16Personalities','SixteenPersonalities').casefold()
check(len(set(k for v in S['articleSourceIds'].values() for k in v))==18 and sum(map(len,S['articleSourceIds'].values()))==19,'unique/use count')
check(S['auxiliarySourceIds']=={'E01':['MBTIPERM']},'rights-only source separate')

for id,(tier,risk) in expected.items():
 d=phase/'drafts'/id;m=M[id];art=(d/'ARTICLE.md').read_text();audit=(d/'CLAIM-AUDIT.md').read_text();editor=(d/'EDITORIAL-REVIEW.md').read_text();bloom=(d/'BLOOM-REVIEW.md').read_text();refs=(d/'REFERENCES.md').read_text();visual=(d/'VISUAL-REVIEW.md').read_text()
 required={'ARTICLE.md','REFERENCES.md','CLAIM-AUDIT.md','BLOOM-REVIEW.md','VISUAL-REVIEW.md','EDITORIAL-REVIEW.md',V[id]['file']}
 check({x.name for x in d.iterdir()}==required,id+' seven files')
 check(art.startswith('# '+m['title']+'\n'),id+' title')
 for value in [m['id'],m['title'],m['slug'],m['topic'],m['collection'],m['season'],*m['keywords'],*m['relatedArticleIds'],*m['topicIds'],tier,risk]:check(value in editor,id+' metadata '+value)
 pr=next((x for x in priority.splitlines() if x.startswith('| KGNT-'+id+' |')),'');check(all(x in pr for x in [m['title'],m['slug'],tier,risk,'B05']),id+' priority match')
 check(id.lower()+'-draft-r1' in art and 'null / null / null' in editor and '/ draft / full_draft' in editor,id+' draft/null/full_draft')
 check('PASS / PENDING_EXTERNAL_REVIEW' in editor,id+' separate gates')
 if risk=='HIGH':check('## Ma trận kiểm riêng — HIGH' in audit and 'chưa có' in audit.lower() and 'reviewer' in audit,id+' HIGH review matrix')
 for axis in ['Tự chẩn đoán/tự sàng lọc','Gắn nhãn/kỳ thị/khái quát','Nguyên nhân/hiệu quả','An toàn tâm lý/sức khỏe/nguy cơ','Riêng tư/bảo mật/quyền từ chối','Trách nhiệm học sinh/người hỗ trợ']:check(axis in audit,id+' HIGH axis '+axis)
 if id.startswith('E'):check('## Phiếu' in refs and 'chưa' in refs.lower(),id+' instrument profile and limits')
 for n in (1,2,3):check(f'**{n}.' in art and f'**Câu {n}:**' in art,id+f' question/feedback{n}')
 for level,key in [('Nhớ','remember'),('Hiểu','understand'),('Vận dụng','apply')]:
  check(level in bloom,id+' Bloom '+level);check(bool(m['bloom'].get(key)),id+' matrix objective '+key)
 check('bỏ qua' in art and 'giả định' in art,id+' optional/fiction')
 body,bib=art.split('\n## Tài liệu tham khảo\n',1);bib=bib.split('\n[Hồ sơ nguồn]')[0];entries=[e.strip() for e in bib.strip().split('\n\n')]
 check(entries==sorted(entries,key=apa_order),id+' APA order');check(len(entries)==len(S['articleSourceIds'][id]),id+' ref count')
 check(set(entries)=={S['sources'][k]['apa7'] for k in S['articleSourceIds'][id]},id+' exact two-way bibliography')
 for k in S['articleSourceIds'][id]:
  src=S['sources'][k];local=S['localSourceIds'][id][k]
  check(local in refs and local in audit,id+' claim source mapping '+k)
  check(bool(re.search(cite[k],body)),id+' author/year in body '+k)
  check(src['checked']=='2026-10-25' and src['access']==('author_draft_selected_sections' if k=='JOHN08' else 'full_text_selected_sections') and all(src[x] for x in ['population','location','support','limits']),id+' scoped access fields '+k)
 image=re.search(r'!\[(.*?)\]\((.*?\.svg)\)',art);check(image is not None,id+' SVG embed');alt,name=image.groups();svg=(d/name).read_text();tree=ET.fromstring(svg)
 check(alt==V[id]['alt']==tree.find('s:desc',ns).text,id+' alt equality');check(V[id]['caption'] in art and V[id]['caption'] in visual,id+' caption equality');check(V[id]['longDescription'] in art and V[id]['longDescription'] in visual,id+' long description equality')
 check(tree.get('viewBox').split()[2]=='320' and tree.get('aria-labelledby')=='title desc' and tree.find('s:title',ns) is not None,id+' SVG dimensions/accessibility metadata')
 check('<!DOCTYPE' not in svg and '<!ENTITY' not in svg and '<?xml-stylesheet' not in svg,id+' no active XML entities/stylesheet')
 for el in tree.iter():
  check(el.tag.split('}')[-1] in ['svg','title','desc','rect','g','text'],id+' tag allowlist')
  for k,v in el.attrib.items():check(not k.lower().startswith('on') and not k.endswith('href') and 'url(' not in v.lower(),id+' unsafe SVG attr')
 check(all(float(n)>=16 for n in re.findall(r'font-size="([\d.]+)"',svg)),id+' minimum SVG text size')
 for path in d.glob('*.md'):links(path)
 print(id+': structural checks completed; semantic review separate')
links(B/'REVIEW.md')
print(f'{count} checks; {len(errors)} errors. NOT scientific/expert approval.')
for e in errors:print('ERROR:',e)
raise SystemExit(bool(errors))
