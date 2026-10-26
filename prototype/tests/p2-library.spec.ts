import {test,expect} from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import {createContentPreview} from '../build/content-preview.ts'
import {stages} from '../src/reading/stages.ts'
import {repositoryRoot} from '../build/editorial.ts'
const view=createContentPreview(repositoryRoot,'127.0.0.1')
const evidence='../docs/phase-3/p2/screenshots'
for(const width of [320,390,768,1440])test(`P2 full site: 29 complete Readers, library/flow at ${width}`,async({page})=>{
 await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'reduce'})
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message))
 await page.goto('/#/thu-vien');await expect(page.locator('.library-entry')).toHaveCount(29)
 expect((await new AxeBuilder({page}).include('main').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([])
 await page.screenshot({path:`${evidence}/after-library-${width}.jpg`,fullPage:true})
 for(const a of view.articles){
  await page.goto('/#/bai-viet/'+a.slug)
  await expect(page.locator('h1')).toHaveText(a.card.title)
  const nodes=await page.locator('.markdown-reader [data-source-id],.markdown-reader[data-source-id]').evaluateAll(nodes=>nodes.map(n=>({id:n.getAttribute('data-source-id'),text:n.textContent??''})))
  expect(new Set(nodes.map(n=>n.id)).size,a.id).toBe(a.document.trace.length)
  for(const n of a.document.trace.filter(n=>typeof n.value==='string'&&n.type!=='definition'))expect(nodes.find(d=>d.id===n.id)?.text.replace(/\s+/g,' ').trim(),a.id+':'+n.id).toBe(n.value!.replace(/\s+/g,' ').trim())
  const img=page.locator('.reader-figure img');await expect(img).toHaveAttribute('alt',a.document.root.children!.find(n=>n.id===a.document.figures[0].paragraph)!.children![0].alt!)
  await expect.poll(()=>img.evaluate((im:HTMLImageElement)=>im.complete&&im.naturalWidth>0)).toBe(true)
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true)
 }
 await page.goto('/#/bai-viet/'+view.articles.find(a=>a.id==='KGNT-C05')!.slug)
 await page.screenshot({path:`${evidence}/after-reader-${width}.jpg`,fullPage:true})
 expect((await new AxeBuilder({page}).include('.markdown-reader').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([])
 await page.goto('/#/dong-chay')
 await expect(page.locator('.library-entry')).toHaveCount(29)
 expect(await page.locator('a[href*="giai-doan"]').count()).toBeGreaterThanOrEqual(4)
 await page.screenshot({path:`${evidence}/after-flow-${width}.jpg`,fullPage:true})
 expect((await new AxeBuilder({page}).include('main').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([])
 await page.goto('/#/#bai-viet');await expect(page.locator('.reading-item')).toHaveCount(3)
 await page.locator('#bai-viet').screenshot({path:`${evidence}/after-home-reading-${width}.jpg`})
 expect(errors).toEqual([])
})
test('P2 filters/history/reader return/keyboard/figure/local-only boundary',async({page,request})=>{
 await page.goto('/#/thu-vien');const input=page.getByRole('searchbox')
 await input.fill(view.articles[0].metadata.topic)
 await expect(page.locator('.library-entry')).toHaveCount(view.articles.filter(a=>a.metadata.topic===view.articles[0].metadata.topic).length)
 await page.getByLabel('Giai đoạn năm học').selectOption(view.articles[0].metadata.season)
 const before=page.url();await page.reload();await expect(input).toHaveValue(view.articles[0].metadata.topic)
 await page.locator('.library-entry h2 a').first().click();await expect(page.locator('.markdown-reader')).toBeVisible()
 await page.getByRole('link',{name:'Quay lại thư viện'}).click();expect(page.url()).toBe(before)
 await page.goBack();await page.getByRole('button',{name:/Xem hình lớn/}).focus();await page.keyboard.press('Enter')
 await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:/Xem hình lớn/})).toBeFocused()
 const toc=page.locator('.table-of-contents a').first();const target=await toc.getAttribute('href');await toc.click();await page.reload();expect(page.url()).toContain(target!.slice(1));
 await page.goto('/#/thu-vien?bo-suu-tap=extension');await expect(page.locator('.library-entry')).toHaveCount(5);
 for(const stage of stages){await page.goto('/#/thu-vien?giai-doan='+encodeURIComponent(stage.key));await expect(page.locator('.library-entry')).toHaveCount(view.articles.filter(a=>a.metadata.season===stage.key).length)}
 await page.goto('/#/#bai-viet');await page.locator('.article-open').first().click();await page.getByRole('link',{name:'Đọc trang đầy đủ'}).click();await expect(page.locator('.markdown-reader')).toBeVisible()
 expect((await request.get('/docs/phase-3/drafts/C01/ARTICLE.md')).status()).toBe(404)
 expect((await request.get('/',{headers:{Host:'localhost:4197'}})).status()).toBe(403)
 expect((await request.get('/',{headers:{Origin:'https://example.test'}})).status()).toBe(403)
})
