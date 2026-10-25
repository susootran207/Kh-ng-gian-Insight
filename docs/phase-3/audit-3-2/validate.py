"""Read-only, offline checks for the four r2 drafts and this audit snapshot.

This does not validate scientific truth, approval, external URL availability,
learning outcomes, browser behavior or screen-reader accessibility.
"""
from pathlib import Path
import argparse
import json
import re
import sys
import xml.etree.ElementTree as ET
from urllib.parse import urlparse


ARTICLES = {
    'C01': ('experience-map.svg', [
        ('Scherer', '2005', 'https://doi.org/10.1177/0539018405058216'),
        ('Nook', '2021', 'https://doi.org/10.3389/fpsyg.2021.700298'),
        ('NIMH', '2024', 'https://www.nimh.nih.gov/health/publications/children-and-mental-health')]),
    'C05': ('study-plan.svg', [
        ('Dunlosky', '2013', 'https://doi.org/10.1177/1529100612453266'),
        ('Jagiello', '2025', 'https://doi.org/10.1007/s10578-024-01667-5'),
        ('Paruthi', '2016', 'https://doi.org/10.5664/jcsm.5866'),
        ('NIMH', '2024', 'https://www.nimh.nih.gov/health/publications/children-and-mental-health')]),
    'C17': ('sleep-context.svg', [
        ('NHLBI', '2022a', 'https://www.nhlbi.nih.gov/health/insomnia/diagnosis'),
        ('NHLBI', '2022b', 'https://www.nhlbi.nih.gov/health/sleep-deprivation/healthy-sleep-habits'),
        ('NHLBI', '2022c', 'https://www.nhlbi.nih.gov/health/sleep-deprivation/body-clock'),
        ('Paruthi', '2016', 'https://doi.org/10.5664/jcsm.5866')]),
    'E05': ('claim-to-practice.svg', [
        ('Aslaksen & Lorås', '2018', 'https://doi.org/10.3389/fpsyg.2018.01538'),
        ('Clinton-Lisell & Litzinger', '2024', 'https://doi.org/10.3389/fpsyg.2024.1428732'),
        ('Dunlosky', '2013', 'https://doi.org/10.1177/1529100612453266'),
        ('Pashler', '2008', 'https://doi.org/10.1111/j.1539-6053.2009.01038.x')]),
}
DOCS = ['ARTICLE.md', 'REFERENCES.md', 'CLAIM-AUDIT.md', 'BLOOM-REVIEW.md',
        'VISUAL-REVIEW.md', 'EDITORIAL-REVIEW.md']
AUDIT_DOCS = ['FINAL-AUDIT.md', 'FOUR-ARTICLE-COMPARISON.md',
              'EDITORIAL-PLAYBOOK.md', 'EVIDENCE-AND-OPEN-ISSUES.md',
              'BLOOM-AND-VISUAL-QA.md', 'READINESS-GATES.md',
              'NEXT-PHASE-RECOMMENDATIONS.md']


def require(condition, message):
    if not condition:
        raise ValueError(message)


def normalized(s):
    return re.sub(r'\s+', ' ', s).strip()


def luminance(color):
    rgb = [int(color[i:i+2], 16)/255 for i in (1, 3, 5)]
    linear = [v/12.92 if v <= .04045 else ((v+.055)/1.055)**2.4 for v in rgb]
    return sum(v*w for v, w in zip(linear, [.2126, .7152, .0722]))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[3])
    args = parser.parse_args()
    root, audit = args.root.resolve(), Path(__file__).resolve().parent
    drafts = root/'docs/phase-3/drafts'
    matrix = json.loads((root/'docs/phase-3/matrix.json').read_text())
    topics = {item['id']: item for item in matrix['articles']}
    all_urls, files, signatures, rows = [], [], [], []
    ns = {'s': 'http://www.w3.org/2000/svg'}
    for aid, (asset, sources) in ARTICLES.items():
        base = drafts/aid
        for name in DOCS+[asset]:
            require((base/name).is_file(), f'Missing {aid}/{name}')
        files.extend(base/name for name in DOCS)
        article = (base/'ARTICLE.md').read_text()
        revision = aid.lower()+'-draft-r2'
        require('KGNT-'+aid in article and revision in article, f'ID/revision: {aid}')
        require('KGNT-'+aid in topics, f'ID absent from matrix: {aid}')
        body, bib = article.split('## Tài liệu tham khảo', 1)
        urls = re.findall(r'https://[^\s)]+', bib)
        require(set(urls) == {item[2] for item in sources}, f'Bibliography URL set: {aid}')
        references = (base/'REFERENCES.md').read_text()
        for author, year, url in sources:
            require(re.search(re.escape(author)+r'[^\n]{0,130}'+year, body), f'Citation: {aid}/{author}/{year}')
            require(f'({year}' in bib and url in references, f'Reference mapping: {aid}/{year}')
            parsed = urlparse(url)
            require(parsed.scheme == 'https' and parsed.netloc, f'URL syntax: {url}')
        require(len(re.findall(r'^\*\*[123]\. ', body, re.M)) == 3, f'Questions: {aid}')
        require(len(re.findall(r'^\*\*Câu [123]:', body, re.M)) == 3, f'Feedback: {aid}')
        require('bỏ qua hoạt động' in body, f'Optional activity: {aid}')
        require('Tìm hiểu sâu hơn' in body, f'Optional depth: {aid}')
        alt = re.search(r'!\[([^]]+)\]\('+re.escape(asset)+r'\)', article)
        require(alt is not None, f'Image/alt: {aid}')
        visual = (base/'VISUAL-REVIEW.md').read_text()
        require(alt.group(1) in visual, f'Alt mismatch: {aid}')
        after_image = article[alt.end():]
        caption = next(line[1:-1] for line in after_image.splitlines() if line.startswith('*') and not line.startswith('**') and line.endswith('*'))
        require(caption in visual and 'Mô tả tương đương bằng chữ' in after_image, f'Caption/description: {aid}')
        tree = ET.parse(base/asset).getroot()
        require(tree.find('s:title', ns) is not None and tree.find('s:desc', ns) is not None, f'SVG title/desc: {aid}')
        for node in tree.iter():
            require(node.tag.rsplit('}', 1)[-1] not in ['script', 'foreignObject', 'image', 'a', 'marker'], f'Unsafe SVG element: {aid}')
            for key, value in node.attrib.items():
                require('href' not in key and not key.startswith('on') and 'url(' not in value, f'External/event SVG content: {aid}')
        backgrounds = {node.attrib['fill'] for node in tree.findall('.//s:rect', ns) if re.fullmatch(r'#[0-9a-fA-F]{6}', node.attrib.get('fill', ''))}
        ratios = [(max(luminance(c), luminance('#333e32'))+.05)/(min(luminance(c), luminance('#333e32'))+.05) for c in backgrounds]
        require(ratios and min(ratios) >= 4.5, f'Static ink contrast: {aid}')
        width = float(tree.attrib['viewBox'].split()[2])
        sizes = sorted({float(node.attrib['font-size'])*320/width for node in tree.findall('.//s:text', ns)})
        opening = next(line for line in body.splitlines() if len(line) > 90 and not line.startswith(('#', '>', '*', '|')))
        signatures.extend([revision, 'KGNT-'+aid, asset, normalized(opening[:90])])
        all_urls.extend(urls)
        rows.append({'id': 'KGNT-'+aid, 'revision': revision, 'slug': topics['KGNT-'+aid]['slug'],
                     'references': len(urls), 'questions': 3, 'feedback': 3,
                     'inkContrastRange': [round(min(ratios), 2), round(max(ratios), 2)],
                     'svgTextPxAt320': sizes})
    e05 = (drafts/'E05/ARTICLE.md').read_text()
    require(not re.search(r'\bg\s*[=:]|0[,.]3[12]', e05), 'Unresolved E05 g used')
    require('Fallace' not in e05 and 'Carskadon' not in (drafts/'C17/ARTICLE.md').read_text(), 'Pending source used in article')
    for name in AUDIT_DOCS:
        require((audit/name).is_file(), f'Missing audit document: {name}')
        files.append(audit/name)
    link_count = 0
    for file in files:
        for target in re.findall(r'!?\[[^]]*\]\(([^)]+)\)', file.read_text()):
            if '://' in target or target.startswith('#'):
                continue
            link_count += 1
            path = (file.parent/target.split('#')[0]).resolve()
            # In work, audit files and the read-only baseline are separate roots.
            if file.parent == audit and not path.is_file():
                logical = Path('docs/phase-3/audit-3-2')/target.split('#')[0]
                path = (root/logical).resolve()
            require(path.is_file(), f'Broken local link: {file.name}: {target}')
    catalogue = json.loads((root/'prototype/editorial/catalogue.json').read_text())
    published_articles = [a for a in catalogue['articles'] if a['status'] == 'published']
    published_topics = [a for a in catalogue['topics'] if a['status'] == 'published']
    require(not published_articles and not published_topics, 'Publication state differs from audit snapshot: re-audit required')
    runtime_files = {root/'prototype/editorial/catalogue.json'}
    for folder in ['src', 'build', 'public']:
        runtime_files.update(p for p in (root/'prototype'/folder).rglob('*') if p.is_file() and p.suffix in ['.ts', '.tsx', '.mts', '.js', '.jsx', '.css', '.json', '.html', '.svg'])
    for file in runtime_files:
        data = normalized(file.read_text())
        for signature in signatures:
            require(signature not in data, f'Draft marker/opening copied into runtime: {file.relative_to(root)}: {signature}')
    print(json.dumps({'result': 'PASS_structural_only', 'articles': rows,
                      'referenceUses': len(all_urls), 'uniqueReferenceURLs': len(set(all_urls)),
                      'localLinksChecked': link_count, 'runtimeTextFilesScanned': len(runtime_files),
                      'publishedArticles': len(published_articles), 'publishedTopics': len(published_topics)}, ensure_ascii=False, indent=2))
    print('NOT TESTED: external HTTP/DOI resolution, scientific truth, full APA semantics, independent review, learner outcomes, browser/reader/screen reader, production bundle/deploy.')


if __name__ == '__main__':
    try:
        main()
    except (ValueError, OSError, KeyError, ET.ParseError, StopIteration) as exc:
        print(f'FAIL: {exc}', file=sys.stderr)
        sys.exit(1)
