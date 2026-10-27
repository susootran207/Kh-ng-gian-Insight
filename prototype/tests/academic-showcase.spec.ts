import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { compileSourceArticles } from '../build/source-reader'
import { publicAssetUrl } from '../build/public-library'
const root=resolve('..'),manifest=JSON.parse(readFileSync(resolve(root,'prototype/editorial/source-manifest.json'),'utf8'))
const weekly=JSON.parse(readFileSync(resolve(root,'prototype/editorial/weekly.json'),'utf8'))
const compiled=compileSourceArticles(root,manifest.articles,publicAssetUrl)
for(const width of [320,390,768,1024,1440])test('Built academic artifact: every route, Reader and responsive layout '+width,async({page,request})=>{
 await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'reduce'})
 const failures:string[]=[],errors:string[]=[]
 page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1:4181/')&&r.status()>=400)failures.push(r.status()+' '+r.url())})
 page.on('pageerror',e=>errors.push(e.message))
 async function fits(){await page.evaluate(()=>document.fonts.ready);const overflow=await page.evaluate(()=>Array.from(document.querySelectorAll('main *')).filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left< -1)}).slice(0,8).map(el=>({tag:el.tagName,cls:el.className,right:el.getBoundingClientRect().right})));expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),JSON.stringify(overflow)).toBeTruthy()}
 await page.goto('./#/thu-vien');await expect(page.locator('.library-entry')).toHaveCount(29);await expect(page.locator('.academic-notice')).toContainText('sản phẩm học tập cá nhân');await fits()
 await page.screenshot({path:`test-results-academic/library-${width}.png`,fullPage:false})
 let tables=0,nodes=0
 for(const a of compiled){
  await page.goto('./#/bai-viet/'+a.slug);await expect(page.locator('h1')).toHaveText(a.card.title);await page.reload();await expect(page.locator('.markdown-reader')).toBeVisible()
  const image=page.locator('.reader-figure img');await expect(image).toHaveCount(1);await expect.poll(()=>image.evaluate((e:HTMLImageElement)=>e.complete&&e.naturalWidth>0)).toBeTruthy()
  expect(await page.locator('.article-prose a[href^="https://"]').count()).toBeGreaterThan(0)
  const expected:string[]=[];function walk(n:any){expected.push(n.id);n.children?.forEach(walk)};walk(a.document.root)
  const actual=await page.locator('[data-source-id]').evaluateAll(es=>es.map(e=>e.getAttribute('data-source-id')))
  expect([...new Set(actual)].sort()).toEqual(expected.sort())
  expect(await page.locator('.article-prose table').count()).toBe(a.document.root.children!.filter(n=>n.type==='table').length)
  tables+=await page.locator('.article-prose table').count();nodes+=actual.length
  const ids=new Set(await page.locator('[id]').evaluateAll(es=>es.map(e=>e.id)))
  for(const href of await page.locator('.article-prose a[href*="#"],.table-of-contents a').evaluateAll(es=>es.map(e=>(e as HTMLAnchorElement).getAttribute('href')!))){const anchor=href.split('#').at(-1)!;if(!href.startsWith('#/bai-viet/')||href.split('#').length<3)continue;expect(ids.has(decodeURIComponent(anchor)),a.slug+' '+href).toBeTruthy()}
  await fits()
 }
 expect(tables).toBe(25);expect(nodes).toBeGreaterThan(4000)
 await page.screenshot({path:`test-results-academic/reader-${width}.png`,fullPage:false})
 await page.goto('./#/chuyen-de');await expect(page.locator('h1')).toHaveText('Lịch chuyên đề minh họa');await expect(page.locator('.topic-spread')).toHaveCount(10);await fits()
 for(const t of weekly.topics){await page.goto('./#/chuyen-de/'+t.slug);await expect(page.locator('h1')).toHaveText(t.title);await page.reload();await expect(page.locator('.library-entry')).toHaveCount(t.articleSlugs.length);await expect(page.locator('.draft-label').first()).toContainText('Nội dung mô phỏng');await fits()}
 for(const route of ['','dong-chay','nen-tang','khong-ton-tai']){await page.goto('./#/'+route);await expect(page.locator('h1')).toBeVisible();await fits()}
 await page.goto('./#/');await page.screenshot({path:`test-results-academic/home-${width}.png`,fullPage:false})
 expect(errors).toEqual([]);expect(failures).toEqual([])
 // Raw source, evidence, registries and dev entry points remain unavailable.
 for(const a of manifest.articles)for(const f of [a.source,...Object.values(a.dossiers)] as {path:string}[])expect((await request.get('./'+f.path)).status()).toBe(404)
 for(const path of ['editorial/source-manifest.json','editorial/academic-showcase-policy.json','editorial/weekly.json','preview/index.html','weekly-preview/index.html','src/main.tsx','@vite/client','assets/index.js.map','docs/phase-3/publication-records/r10/KGNT-C01-editorial.json'])expect((await request.get('./'+path)).status()).toBe(404)
})
test('Built artifact interactions: search, filters, history, Flow, TOC, related, image dialog and privacy',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'})
 await page.goto('./#/thu-vien');await page.getByRole('searchbox').fill('hom nay minh dang cam thay gi');await expect(page.locator('.library-entry')).toHaveCount(1)
 await page.reload();await expect(page.getByRole('searchbox')).toHaveValue('hom nay minh dang cam thay gi');await expect(page.locator('.library-entry')).toHaveCount(1)
 await page.getByRole('button',{name:'Xóa bộ lọc'}).click();await expect(page.locator('.library-entry')).toHaveCount(29)
 await page.getByLabel('Nhóm bài').selectOption('extension');await expect(page.locator('.library-entry')).toHaveCount(5)
 await page.goBack();await expect(page.locator('.library-entry')).toHaveCount(29);await page.goForward();await expect(page.locator('.library-entry')).toHaveCount(5)
 await page.getByRole('button',{name:'Xóa bộ lọc'}).click();await page.getByLabel('Giai đoạn năm học').selectOption('Mùa thi')
 const count=manifest.articles.filter((a:any)=>a.metadata.season==='Mùa thi').length;await expect(page.locator('.library-entry')).toHaveCount(count)
 await page.locator('.library-entry .text-link').first().click();await expect(page.locator('.markdown-reader')).toBeVisible()
 await page.getByRole('button',{name:'Mục lục bài đọc'}).click();const firstToc=page.locator('.table-of-contents a').first();await firstToc.click();await page.reload();await expect(page.locator('h1')).toBeVisible()
 await page.getByRole('button',{name:'Xem hình lớn'}).click();await expect(page.locator('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('dialog')).not.toBeVisible()
 await page.getByRole('link',{name:'Quay lại thư viện'}).click();await expect(page.getByLabel('Giai đoạn năm học')).toHaveValue('Mùa thi')
 await page.goto('./#/bai-viet/'+manifest.articles[0].slug);const related=page.locator('.related-reading a').first();expect(await related.count()).toBe(1);await related.click();await expect(page.locator('.markdown-reader')).toBeVisible()
 await page.goto('./#/dong-chay');await expect(page.locator('.library-entry')).toHaveCount(29)
 for(const key of ['Đầu năm','Giữa học kỳ','Mùa thi','Sau thi']){await page.getByRole('link',{name:'Lọc thư viện: '+key,exact:true}).click();await expect(page.getByLabel('Giai đoạn năm học')).toHaveValue(key);await expect(page.locator('.library-entry')).toHaveCount(manifest.articles.filter((a:any)=>a.metadata.season===key).length);await page.goBack()}
 await page.goto('./#/#tam-tinh');const input=page.getByLabel('Điều bạn muốn gửi theo ánh đèn');const network:string[]=[];page.on('request',r=>{if(r.method()!=='GET')network.push(r.url())})
 await input.fill('PRIVATE_CANARY_DO_NOT_STORE');await page.getByRole('button',{name:'Thả một ngọn đèn'}).click();await expect(input).toHaveValue('')
 await input.fill('PRIVATE_CANARY_DO_NOT_STORE');await page.reload();await expect(input).toHaveValue('')
 expect(await page.evaluate(()=>Object.values({...localStorage,...sessionStorage}).join(' ').includes('PRIVATE_CANARY'))).toBe(false);expect(network).toEqual([])
})
