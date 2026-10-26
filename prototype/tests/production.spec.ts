import AxeBuilder from '@axe-core/playwright'
import {test,expect} from '@playwright/test'
import {readFileSync} from 'node:fs'
import {createContentPreview} from '../build/content-preview.ts'
import {loadManifest} from '../build/content-contract.ts'
import {resolve} from 'node:path'
const catalogue=JSON.parse(readFileSync(new URL('../editorial/catalogue.json',import.meta.url),'utf8'))
for(const width of [320,390,768,1440])test(`production repository path, local assets, reload and draft exclusion ${width}`,async({page})=>{
  await page.setViewportSize({width,height:900})
  const failures:string[]=[];page.on('requestfailed',r=>failures.push(r.url()));page.on('response',r=>{if(r.status()>=400)failures.push(r.url())})
  await page.goto('./#/thu-vien?preview=true')
  await expect(page.getByText('Chưa có bài viết được duyệt xuất bản.',{exact:false})).toBeVisible()
  await expect(page.locator('.library-entry')).toHaveCount(0);await expect(page.locator('.preview-notice')).toHaveCount(0)
  await page.reload();await expect(page.getByRole('searchbox')).toBeVisible()
  for(const article of catalogue.articles){await page.goto('./#/bai-viet/'+article.slug+'?preview=true');await page.reload();await expect(page.locator('h1')).toHaveText('Lối này chưa có trang.')}
  await page.goto('./#/chuyen-de');await expect(page.getByText('Chuyên đề đang được vun trồng.')).toBeVisible()
  await page.goto('./#/');await page.evaluate(()=>document.fonts.ready);await expect(page.locator('.top-garland')).toHaveAttribute('data-variant','B')
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy()
  await expect(page.getByRole('button',{name:/Mây, chú mèo/})).toBeVisible()
  await page.screenshot({path:`../docs/phase-2/screenshots/production-home-${width}.png`})
  expect(failures).toEqual([])
})

test('R1 fixture route, query, harness and raw assets stay excluded from production', async({page,request})=>{
  await page.goto('./#/r1/fixture?preview=true')
  await expect(page.locator('h1')).toHaveText('Lối này chưa có trang.')
  await page.goto('./#/thu-vien?preview=true&r1=true')
  await expect(page.locator('.library-entry')).toHaveCount(0)
  await expect(page.locator('body')).not.toContainText('F0_FIXTURE_ONLY_R1_READER')
  for(const path of ['tests/reader-harness/index.html','tests/fixtures/reader/article.md','tests/fixtures/reader/reader-long-figure.svg','__r1_assets/reader-long-figure.svg']) expect((await request.get('./'+path)).status()).toBe(404)
})

test('C1: all 29 direct routes, preview/raw drafts/dossiers/SVG and query stay excluded', async({page,request})=>{
  const root=resolve('..'),manifest=loadManifest(root),view=createContentPreview(root,'127.0.0.1')
  for(const a of view.articles){
    await page.goto('./#/bai-viet/'+a.slug+'?preview=true&c1=true')
    await expect(page.locator('h1')).toHaveText('Lối này chưa có trang.')
    expect((await request.get('./'+a.document.assets[0].src.slice(1))).status()).toBe(404)
  }
  for(const a of manifest.articles)for(const f of [a.source,...Object.values(a.dossiers),...a.assets])expect((await request.get('./'+f.path)).status()).toBe(404)
  for(const path of ['preview/index.html','preview/main.tsx','editorial/source-manifest.json','@id/__x00__virtual:c1-preview'])expect((await request.get('./'+path)).status()).toBe(404)
  await page.goto('./#/thu-vien?preview=true&c1=true&revision=r2')
  await expect(page.locator('.library-entry')).toHaveCount(0)
  await expect(page.locator('body')).not.toContainText('Bản nháp đã nghiệm thu nội bộ')
})

test('W1 real empty state, direct topic/query and fixture/registry exclusion',async({page,request})=>{
  await page.goto('./#/#chuyen-de')
  await expect(page.locator('.weekly-copy')).toContainText('Chuyên đề sẽ mở khi nội dung được duyệt xuất bản.')
  await expect(page.locator('.weekly-copy')).not.toContainText('F0_FIXTURE_ONLY')
  await page.getByRole('link',{name:'Ghé trang chuyên đề'}).click()
  await expect(page.getByText('Chuyên đề đang được vun trồng.')).toBeVisible()
  for(const slug of ['dem-dai','w1-fixture-current','w1-fixture-future']){await page.goto('./#/chuyen-de/'+slug+'?preview=true&now=2026-10-21');await expect(page.locator('h1')).toHaveText('Lối này chưa có trang.')}
  await page.goto('./#/thu-vien?chuyen-de=w1-fixture-current&preview=true')
  await expect(page.locator('.library-entry')).toHaveCount(0)
  for(const path of ['editorial/weekly.json','tests/fixtures/weekly/create.ts','tests/weekly-harness/index.html','@id/__x00__virtual:w1-fixture:virtual:weekly'])expect((await request.get('./'+path)).status()).toBe(404)
})

test('N1 foundation direct repository URL, reload, anchors and safe destinations',async({page})=>{
  await page.goto('./#/nen-tang');await page.reload()
  await expect(page).toHaveTitle('Nền tảng · Không Gian Nội Tâm')
  await expect(page.locator('h1')).toContainText('Nền tảng của')
  await expect(page.locator('.preview-notice')).toHaveCount(0)
  await page.getByRole('link',{name:'Bản nháp và quyền công bố',exact:true}).click()
  await expect(page.locator('#trang-thai-va-quyen-cong-bo')).toBeFocused()
  await page.reload();await expect(page.locator('#trang-thai-va-quyen-cong-bo')).toBeFocused()
  await page.getByRole('link',{name:'Đến thư viện',exact:true}).click();await expect(page.locator('.library-entry')).toHaveCount(0)
  await page.goto('./#/#nen-tang');await expect(page.locator('#nen-tang')).toBeFocused()
  await page.getByRole('link',{name:'Tìm hiểu nền tảng',exact:true}).click();await expect(page.locator('h1')).toContainText('Nền tảng của')
})

for(const width of [320,390,768,1440])test('D1 production empty, direct/reload, all stage filters and fixture exclusion '+width,async({page,request})=>{
  await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'reduce'})
  await page.goto('./#/dong-chay?preview=true');await page.reload();await page.evaluate(()=>document.fonts.ready)
  await expect(page).toHaveTitle('Dòng chảy · Không Gian Nội Tâm');await expect(page.locator('.flow-empty')).toHaveCount(4);await expect(page.locator('.library-entry')).toHaveCount(0)
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy()
  for(const key of ['Đầu năm','Giữa học kỳ','Mùa thi','Sau thi']){await page.getByRole('link',{name:'Lọc thư viện: '+key,exact:true}).click();await expect(page.getByLabel('Giai đoạn năm học')).toHaveValue(key);await expect(page.locator('.library-entry')).toHaveCount(0);await page.goBack()}
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([])
  await page.screenshot({path:`test-results-d1-evidence/flow-empty-${width}.jpg`,type:'jpeg',quality:85})
  for(const path of ['tests/flow-harness/index.html','tests/fixtures/flow/create.ts','@id/__x00__virtual:d1-fixture:virtual:editorial'])expect((await request.get('./'+path)).status()).toBe(404)
  await page.goto('./#/bai-viet/d1-fixture-1?preview=true');await expect(page.locator('h1')).toHaveText('Lối này chưa có trang.')
})

test('G1 production: canary never transmits/persists; clear/release/skip and N1 consistency',async({page,context})=>{
 await page.setViewportSize({width:390,height:1000});await page.emulateMedia({reducedMotion:'reduce'})
 await page.goto('./#/#tam-tinh');await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>Promise.all([...document.images].map(image=>image.decode().catch(()=>{}))))
 const network:string[]=[],messages:string[]=[],canary='G1_PRODUCTION_CANARY_Đ_🧪';page.on('request',r=>network.push(JSON.stringify({url:r.url(),headers:r.headers(),body:r.postData()})));page.on('console',m=>messages.push(m.text()));page.on('pageerror',e=>messages.push(e.message))
 const input=page.getByLabel('Điều bạn muốn gửi theo ánh đèn'),release=page.getByRole('button',{name:'Thả một ngọn đèn',exact:true})
 await expect(page.locator('#tam-tinh')).toContainText('Không có người nhận, đọc hoặc phản hồi lời viết.')
 await input.fill(canary);await page.getByRole('button',{name:'Xóa lời viết',exact:true}).click();await expect(input).toHaveValue('')
 await input.fill(canary);await release.click();await expect(input).toHaveValue('');await expect(release).toBeDisabled();await expect(page.locator('.released-lantern')).toHaveCount(1)
 expect(await page.content()).not.toContain(canary);expect(network).toEqual([]);expect(messages.join()).not.toContain(canary)
 expect(await page.evaluate(async()=>({local:localStorage.length,session:sessionStorage.length,databases:(await indexedDB.databases()).length,caches:(await caches.keys()).length}))).toEqual({local:0,session:0,databases:0,caches:0});expect(await context.cookies()).toEqual([]);expect(page.url()).not.toContain(canary)
 await page.getByRole('link',{name:'Bỏ qua, ghé thư viện',exact:true}).click();await expect(page.locator('.library-entry')).toHaveCount(0);await page.goBack();await expect(input).toHaveValue('')
 await page.goto('./#/nen-tang#rieng-tu-trong-khu-vuon');await expect(page.locator('#rieng-tu-trong-khu-vuon')).toContainText('quay lại không khôi phục lời')
})
