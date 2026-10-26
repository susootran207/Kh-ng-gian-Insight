import {test,expect} from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import {mkdirSync} from 'node:fs'
import {resolve} from 'node:path'
import {stages,stageLibraryLink} from '../src/reading/stages'
const entry='/tests/flow-harness/index.html',output=resolve('test-results-d1-evidence');mkdirSync(output,{recursive:true})
for(const width of [320,390,768,1440])test('D1 fixture: four stages, 29 articles, anchors, timeline ARIA, Axe '+width,async({page})=>{
  await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'reduce'})
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message))
  await page.goto(entry+'#/dong-chay');await page.reload();await page.evaluate(()=>document.fonts.ready)
  await expect(page).toHaveTitle('Dòng chảy · Không Gian Nội Tâm');await expect(page.locator('.flow-stage')).toHaveCount(4);await expect(page.locator('.library-entry')).toHaveCount(29)
  await expect(page.locator('.breadcrumbs a')).toHaveCount(1)
  await expect(page.locator('main')).not.toContainText('Trang giả lập số 99')
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy()
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([])
  await page.screenshot({path:output+'/flow-fixture-'+width+'.jpg',type:'jpeg',quality:80})
  await page.keyboard.press('Tab');await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused()
  for(const s of stages){const link=page.getByRole('navigation',{name:'Mục lục'}).getByRole('link',{name:s.title,exact:true});await link.focus();await page.keyboard.press('Enter');await expect(page.locator('#'+s.anchor)).toBeFocused();await expect(page.locator('#'+s.anchor+' .library-entry')).toHaveCount(s.key==='Đầu năm'?8:7)}
  await page.reload();await expect(page.locator('#sau-thi')).toBeFocused();await page.goBack();await expect(page.locator('#mua-thi')).toBeFocused();await page.goForward();await expect(page.locator('#sau-thi')).toBeFocused()
  await page.getByRole('link',{name:'Xem toàn bộ thư viện',exact:true}).click();await expect(page.locator('.library-entry')).toHaveCount(29)
  await page.goto(entry+'#/#dong-chay');await expect(page.locator('#dong-chay')).toBeFocused()
  for(const s of stages){const button=page.getByRole('button',{name:s.title,exact:true});await button.focus();await page.keyboard.press('Enter');await expect(button).toHaveAttribute('aria-expanded','true');const id=await button.getAttribute('aria-controls');await expect(page.locator('#'+id)).toBeVisible();await expect(page.getByRole('button',{expanded:true}).filter({has:page.locator('.timeline-node')})).toHaveCount(1);await expect(page.getByRole('link',{name:'Đọc theo chặng này'})).toHaveAttribute('href','#'+stageLibraryLink(s.key))}
  await page.getByRole('link',{name:'Khám phá Dòng chảy',exact:true}).click();await expect(page.locator('main')).toBeFocused()
  await page.getByRole('link',{name:'Về timeline trang chủ'}).click();await expect(page.locator('#dong-chay')).toBeFocused()
  await expect(page.locator('.top-garland')).toHaveAttribute('data-variant','B');await expect(page.getByRole('button',{name:/Mây, chú mèo/})).toBeVisible()
  expect(await page.locator('.scroll-companion').evaluate(el=>{const r=el.getBoundingClientRect();return r.right<=innerWidth+1})).toBeTruthy()
  expect(errors).toEqual([])
})
test('D1 stage → Library AND filters, query history/reload, article + related return and full Library',async({page})=>{
  await page.goto(entry+'#/dong-chay');await page.getByRole('link',{name:'Lọc thư viện: Mùa thi',exact:true}).click()
  await expect(page.getByLabel('Giai đoạn năm học')).toHaveValue('Mùa thi');await expect(page.locator('.library-entry')).toHaveCount(7)
  await page.getByRole('combobox',{name:'Chủ đề',exact:true}).selectOption('Nhóm A giả lập');await page.getByRole('searchbox').fill('TRANG GIA LAP SO 11');await expect(page.locator('.library-entry')).toHaveCount(1)
  const url=page.url();await page.reload();await expect(page.getByRole('searchbox')).toHaveValue('TRANG GIA LAP SO 11');await expect(page.locator('.library-entry')).toHaveCount(1)
  await page.locator('.library-entry h2 a').click();await expect(page.locator('h1')).toHaveText('Trang giả lập số 11')
  await page.locator('.related-reading .library-entry h2 a').first().click();await page.getByRole('link',{name:'Quay lại thư viện',exact:true}).click();await expect(page).toHaveURL(url)
  await page.getByRole('button',{name:'Xóa bộ lọc',exact:false}).click();await expect(page.locator('.library-entry')).toHaveCount(29)
  await page.goBack();await expect(page).toHaveURL(url);await expect(page.locator('.library-entry')).toHaveCount(1);await page.goForward();await expect(page.locator('.library-entry')).toHaveCount(29)
  await page.goto(entry+'#/thu-vien?chuyen-de=w1-fixture-current');await expect(page.locator('.library-entry')).toHaveCount(2)
  await page.goto(entry+'#/thu-vien');await expect(page.locator('.library-entry')).toHaveCount(29)
  await page.goto(entry+'#/dong-chay');await page.locator('#mua-thi .library-entry h2 a').first().click();await page.getByRole('link',{name:'Quay lại thư viện',exact:true}).click();await expect(page.getByLabel('Giai đoạn năm học')).toHaveValue('Mùa thi')
})
test('D1 loopback fixture safety and 200%-equivalent reflow (not native zoom)',async({browser,request})=>{
  expect((await request.get(entry,{headers:{Host:'localhost:4194'}})).status()).toBe(403)
  expect((await request.get(entry,{headers:{Origin:'https://example.org'}})).status()).toBe(403)
  expect((await request.get(entry)).headers()['cache-control']).toBe('no-store')
  expect((await request.get('/@fs'+resolve('../docs/phase-3/drafts/C01/ARTICLE.md'))).status()).toBe(403)
  const context=await browser.newContext({viewport:{width:720,height:500},deviceScaleFactor:2,reducedMotion:'reduce'})
  try{const page=await context.newPage();await page.goto('http://127.0.0.1:4194'+entry+'#/dong-chay');await expect(page.locator('h1')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy()}finally{await context.close()}
})
