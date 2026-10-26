import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createContentPreview } from '../build/content-preview.ts'
import { loadManifest, readReference, sha256 } from '../build/content-contract.ts'
import type { ReaderNode } from '../src/reading/markdown/model.ts'

const root = resolve('..'), view = createContentPreview(root, '127.0.0.1'), manifest = loadManifest(root)
const entry = '/preview/index.html', output = resolve('test-results-c1-evidence/visual-review')
mkdirSync(output, { recursive: true })
function ordered(n: ReaderNode): ReaderNode[] { return [n, ...(n.children ?? []).flatMap(ordered)] }
for (const width of [320,390,768,1440]) test('29/29 source→AST→DOM, SVG, links, responsive and Axe at ' + width, async ({ page, request }) => {
  test.setTimeout(240000)
  await page.setViewportSize({ width, height: 1000 })
  const errors: string[] = [], evidence: unknown[] = []
  page.on('pageerror', e => errors.push(e.message))
  for (const a of view.articles) {
    await test.step(a.id + ' ' + a.revision, async () => {
      await page.goto(entry + '#/bai-viet/' + a.slug); await page.evaluate(() => document.fonts.ready)
      await expect(page.locator('h1')).toHaveText(a.metadata.title)
      await expect(page.locator('.c1-identity')).toContainText(a.revision)
      await expect(page.locator('.c1-notice')).toContainText('Chưa phê duyệt chuyên môn, chưa được phép xuất bản')
      const records = await page.locator('[data-source-id]').evaluateAll(els => els.map(el => ({ id: el.getAttribute('data-source-id'), start: +el.getAttribute('data-source-start')!, end: +el.getAttribute('data-source-end')!, text: el.textContent ?? '' })))
      const expected = ordered(a.document.root)
      expect(records.map(r => r.id), a.id + ' node order').toEqual(expected.map(n => n.id))
      for (let i = 0; i < expected.length; i++) {
        expect([records[i].start, records[i].end]).toEqual([expected[i].range.start, expected[i].range.end])
        if (expected[i].value !== undefined) expect(records[i].text.replace(/\s+/g, ' ').trim()).toBe(expected[i].value!.replace(/\s+/g, ' ').trim())
      }
      const image = page.locator('.reader-figure img'), original = manifest.articles.find(x => x.id === a.id)!.assets[0]
      await expect(image).toHaveAttribute('alt', original.alt)
      await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBeTruthy()
      const svg = await request.get(a.document.assets[0].src)
      expect(svg.status()).toBe(200); expect(sha256(await svg.body())).toBe(original.sha256)
      expect(sha256(readReference(root, original))).toBe(original.sha256)
      for (const link of await page.locator('.markdown-reader a[href^="https:"]').all()) { await expect(link).toHaveAttribute('target','_blank'); await expect(link).toHaveAttribute('rel','noopener noreferrer') }
      await expect(page.locator('.reader-equivalent')).toContainText('Mô tả tương đương bằng chữ:')
      await expect(page.locator('.reader-figure figcaption')).not.toBeEmpty()
      expect(await page.locator('.reader-table-scroll table').count()).toBe(expected.filter(n => n.type === 'table').length)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy()
      await expect(page.locator('.markdown-reader input:not(:disabled),textarea')).toHaveCount(0)
      expect((await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations, a.id + ' axe').toEqual([])
      // Check each figure and full content in the real DOM at every target width.
      await page.locator('.reader-figure').scrollIntoViewIfNeeded()
      await expect(page.locator('.reader-figure figcaption')).toBeVisible()
      if (width === 390 || width === 1440) {
        await page.screenshot({ path: output + '/' + a.id + '-figure-' + width + '.jpg', type:'jpeg', quality:75 })
        await page.locator('.article-prose').evaluate(el => el.scrollIntoView({ block:'start', behavior:'instant' }))
        await page.screenshot({ path: output + '/' + a.id + '-body-' + width + '.jpg', type:'jpeg', quality:75 })
      }
      evidence.push({ id:a.id, revision:a.revision, sourceHash:a.contentHash, ast:expected.length, dom:records.length, svgHash:original.sha256, tables:expected.filter(n=>n.type==='table').length, axeViolations:0 })
    })
  }
  expect(errors).toEqual([])
  writeFileSync(resolve('test-results-c1-evidence/coverage-' + width + '.json'), JSON.stringify(evidence,null,2) + '\n')
})
test('library 29 routes, Vietnamese search, stages/topics/group, history and return through related', async ({ page }) => {
  await page.goto(entry + '#/thu-vien')
  await expect(page.locator('.library-entry')).toHaveCount(29)
  await expect(page.locator('h2').filter({hasText:'Một sai sót không kể hết về bạn'})).toHaveCount(1)
  await expect(page.locator('body')).not.toContainText('Học cách đứng về phía mình')
  const search = page.getByRole('searchbox')
  for (const q of ['MÙA THI','mua thi','  mùa   thi ']) { await search.fill(q); await expect(page.locator('.library-entry')).toHaveCount(view.articles.filter(a => ['mua','thi'].every(word => (a.card.title+' '+a.card.description+' '+a.card.topic+' '+a.card.keywords.join(' ')).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase().includes(word))).length) }
  await search.fill(''); await expect(page).not.toHaveURL(/[?&]q=/); const stage = page.getByLabel('Giai đoạn năm học')
  for (const season of ['Đầu năm','Giữa học kỳ','Mùa thi','Sau thi']) { await stage.selectOption(season); await expect(page.locator('.library-entry')).toHaveCount(view.articles.filter(a=>a.metadata.season===season).length) }
  // Deliberately no intermediate navigation wait: edits must compose against the latest URL.
  for(let i=0;i<5;i++){await search.fill('thi');await search.fill('');await stage.selectOption('Đầu năm');await expect(page.locator('.library-entry')).toHaveCount(view.articles.filter(a=>a.metadata.season==='Đầu năm').length);await expect(page).not.toHaveURL(/[?&]q=/)}
  await stage.selectOption('Mùa thi'); await expect(stage).toHaveValue('Mùa thi'); await expect(page).toHaveURL(/giai-doan=M%C3%B9a\+thi/); await search.fill('thi'); await expect(page).toHaveURL(/q=thi/)
  const before = page.url(), cardsBefore = await page.locator('.library-entry h2').allTextContents()
  await page.locator('.library-entry h2 a').first().click()
  await expect(page.locator('main')).toBeFocused()
  const toc = page.getByRole('navigation',{name:'Mục lục'}).getByRole('link').last()
  const target = (await toc.getAttribute('href'))!.split('#').at(-1)!
  await toc.click(); await expect(page.locator('[id="'+target+'"]')).toBeFocused(); await page.reload(); await expect(page.locator('[id="'+target+'"]')).toBeFocused()
  const dossier = page.locator('.article-prose a[href*="#provenance-"]').first()
  if (await dossier.count()) { await dossier.click(); const id = (await dossier.getAttribute('href'))!.split('#').at(-1)!; await expect(page.locator('#'+id)).toBeFocused() }
  await page.getByRole('link',{name:'Quay lại thư viện',exact:false}).filter({hasText:'Quay lại thư viện'}).last().click()
  await expect(page).toHaveURL(before); expect(await page.locator('.library-entry h2').allTextContents()).toEqual(cardsBefore)
  await page.locator('.library-entry h2 a').first().click()
  await page.locator('.related-reading .library-entry h2 a').first().click()
  await page.getByRole('link',{name:'Quay lại kết quả đã chọn'}).click(); await expect(page).toHaveURL(before)
  await page.reload(); await expect(search).toHaveValue('thi')
  await page.getByRole('button',{name:/Xóa bộ lọc/}).click(); await expect(page.locator('.library-entry')).toHaveCount(29)
  await page.goBack(); await expect(search).toHaveValue('thi'); await page.goForward(); await expect(search).toHaveValue('')
  const first = view.articles[0]
  await page.getByRole('combobox',{name:/^Chủ đề/}).selectOption(first.metadata.topic)
  await expect(page.locator('.library-entry')).toHaveCount(view.articles.filter(a=>a.metadata.topic===first.metadata.topic).length)
  const group = first.metadata.topicIds[0]
  await page.goto(entry+'#/thu-vien?nhom='+group); await expect(page.locator('.library-entry')).toHaveCount(view.articles.filter(a=>a.metadata.topicIds.includes(group)).length)
  await search.fill('no-such-keyword'); await expect(page.getByRole('heading',{name:'Chưa tìm thấy trang phù hợp.'})).toBeVisible()
})
test('C01/C05/E02 figure keyboard, reduced motion, skip, and emulated 200% reflow', async ({ page, browser }) => {
  await page.setViewportSize({width:390,height:900}); await page.emulateMedia({reducedMotion:'reduce'})
  for (const id of ['KGNT-C01','KGNT-C05','KGNT-E02']) {
    await page.goto(entry+'#/bai-viet/'+view.articles.find(a=>a.id===id)!.slug); await page.reload()
    await page.keyboard.press('Tab'); await expect(page.locator('.skip-link')).toBeFocused(); await page.keyboard.press('Enter'); await expect(page.locator('main')).toBeFocused()
    const opener=page.getByRole('button',{name:/Xem hình lớn/}); await opener.focus(); await page.keyboard.press('Enter')
    const dialog=page.getByRole('dialog'),close=dialog.getByRole('button',{name:'Đóng hình'})
    await expect(close).toBeFocused(); await page.keyboard.press('Tab'); await page.keyboard.press('Enter'); await expect(dialog.getByRole('status')).toHaveText('150%')
    expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([])
    const pan=dialog.getByRole('region'); await pan.focus(); await page.keyboard.press('ArrowRight'); await expect.poll(()=>pan.evaluate(el=>el.scrollLeft)).toBeGreaterThan(0); await page.keyboard.press('ArrowDown'); await expect.poll(()=>pan.evaluate(el=>el.scrollTop)).toBeGreaterThan(0); await page.screenshot({path:output+'/'+id+'-modal-390.jpg',type:'jpeg',quality:80})
    await page.keyboard.press('Tab'); await expect(close).toBeFocused(); await page.keyboard.press('Escape'); await expect(opener).toBeFocused()
  }
  const context=await browser.newContext({viewport:{width:720,height:500},deviceScaleFactor:2,reducedMotion:'reduce'})
  try { const p=await context.newPage(); for(const a of view.articles) { await p.goto('http://127.0.0.1:4191'+entry+'#/bai-viet/'+a.slug); await expect(p.locator('h1')).toBeVisible(); expect(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy(); await expect(p.locator('.table-of-contents')).toHaveCSS('position','static') } } finally { await context.close() }
})
test('loopback HTTP boundary, all asset hashes, unknown/query/traversal and raw dossier rejection', async ({ request }) => {
  for(const path of ['/__c1_assets/unknown.svg',view.articles[0].document.assets[0].src+'?preview=true','/__c1_assets/%2e%2e/ARTICLE.md']) expect((await request.get(path)).status()).toBe(404)
  for(const a of manifest.articles) for(const f of [a.source,...Object.values(a.dossiers)]) expect((await request.get('/@fs'+resolve(root,f.path))).status()).toBe(404)
  expect((await request.get(entry,{headers:{Host:'localhost:4191'}})).status()).toBe(403)
  expect((await request.get(entry,{headers:{Origin:'https://example.org'}})).status()).toBe(403)
  const response=await request.get(entry);expect(response.headers()['cache-control']).toBe('no-store')
})

test('library responsive, keyboard menu and Axe at four widths', async ({page}) => {
  for(const width of [320,390,768,1440]) {
    await page.setViewportSize({width,height:1000}); await page.goto(entry+'#/thu-vien'); await page.evaluate(()=>document.fonts.ready)
    await expect(page.locator('.library-entry')).toHaveCount(29)
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy()
    expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([])
    await page.evaluate(()=>{if(document.activeElement instanceof HTMLElement)document.activeElement.blur();window.scrollTo({top:0,behavior:'instant'})})
    await page.screenshot({path:output+'/library-top-'+width+'.jpg',type:'jpeg',quality:80})
    await page.locator('.library-filters').scrollIntoViewIfNeeded(); await page.screenshot({path:output+'/library-filters-'+width+'.jpg',type:'jpeg',quality:80})
    if(width<1100){const menu=page.locator('.menu-button');await menu.focus();await page.keyboard.press('Enter');await expect(menu).toHaveAttribute('aria-expanded','true');await page.keyboard.press('Escape');await expect(menu).toBeFocused();await expect(menu).toHaveAttribute('aria-expanded','false')}
  }
})
