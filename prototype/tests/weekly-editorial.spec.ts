import {test,expect} from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import {readFileSync} from 'node:fs'
const plan=JSON.parse(readFileSync('editorial/weekly.json','utf8')).topics as {id:string;slug:string;title:string;articleSlugs:string[];startsAt:string;endsAt:string}[]
const at=(date:string,route='/')=>'/?w2-at='+encodeURIComponent(date)+'#'+route
const output='../docs/phase-3/w2/screenshots'
for(const width of [320,390,768,1440])test('W2 current/past/upcoming and shared29 Library '+width,async({page})=>{
 await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'reduce'})
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message))
 await page.goto(at(plan[1].startsAt));await expect(page.locator('.weekly-copy h3')).toHaveText(plan[1].title)
 await page.getByRole('button',{name:'Mở một trang đọc'}).focus();await page.keyboard.press('Enter')
 expect(await page.locator('#weekly-excerpt li a').evaluateAll(els=>els.map(a=>a.getAttribute('href')!.split('/').at(-1)))).toEqual(plan[1].articleSlugs)
 await page.locator('#chuyen-de').screenshot({path:output+'/home-'+width+'.jpg'})
 await page.getByRole('link',{name:'Xem chuyên đề đầy đủ'}).click();await expect(page.locator('main')).toBeFocused()
 await expect(page.locator('h1')).toHaveText(plan[1].title)
 expect(await page.locator('.library-entry h2 a').evaluateAll(els=>els.map(a=>a.getAttribute('href')!.split('/').at(-1)))).toEqual(plan[1].articleSlugs)
 await page.screenshot({path:output+'/detail-'+width+'.jpg',fullPage:true})
 expect((await new AxeBuilder({page}).include('main').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([])
 await page.getByRole('link',{name:'Tất cả chuyên đề',exact:true}).click();await expect(page.locator('.topic-spread')).toHaveCount(10)
 await expect(page.locator('#weekly-current')).toHaveText('Đang mở');await expect(page.locator('#weekly-past')).toHaveText('Đã qua');await expect(page.locator('#weekly-upcoming')).toContainText('Sắp tới')
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true)
 expect((await new AxeBuilder({page}).include('main').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([])
 await page.screenshot({path:output+'/index-'+width+'.jpg',fullPage:true})
 await page.goto(at(plan[1].startsAt,'/thu-vien'));await expect(page.locator('.library-entry')).toHaveCount(29)
 await page.getByRole('combobox',{name:'Chuyên đề tuần',exact:true}).selectOption(plan[1].slug);await expect(page.locator('.library-entry')).toHaveCount(3)
 await page.locator('.library-entry h2 a').first().click();await expect(page.locator('.markdown-reader')).toBeVisible();await page.getByRole('link',{name:'Quay lại thư viện',exact:true}).click();await expect(page).toHaveURL(/chuyen-de=/)
 expect(errors).toEqual([])
})
test('W2 switch all10 weeks, before/after, rollback, future detail and malformed clock',async({page})=>{
 test.setTimeout(180000)
 await page.goto('/#/');const control=page.getByRole('combobox',{name:'Thử thời điểm theo giờ Việt Nam'})
 for(const t of plan){await control.selectOption(t.startsAt);await page.waitForURL(url=>url.searchParams.get('w2-at')===t.startsAt);await page.goto(at(t.startsAt));await expect(page.locator('.weekly-copy h3')).toHaveText(t.title);await page.goto(at(t.startsAt,'/thu-vien'));await expect(page.locator('.library-entry')).toHaveCount(29)}
 await control.selectOption(plan.at(-1)!.endsAt);await page.goto(at(plan.at(-1)!.endsAt));await expect(page.locator('.weekly-meta')).toContainText('Đọc lại chuyên đề gần nhất')
 const before='2027-01-10T23:59:59+07:00';await control.selectOption(before);await expect(page.locator('.weekly-copy')).toContainText('đang được vun trồng')
 await page.goto(at(before,'/chuyen-de'));await expect(page.locator('#weekly-upcoming')).toBeVisible();await expect(page.locator('.topic-spread')).toHaveCount(10)
 await page.goto(at(plan[1].startsAt,'/chuyen-de/'+plan[9].slug));await expect(page.locator('h1')).toHaveText(plan[9].title);await expect(page.locator('main')).toContainText('Sắp tới · chỉ xem nội bộ');await page.reload();await expect(page.locator('h1')).toHaveText(plan[9].title)
 await page.goto(at(plan[1].startsAt));await expect(page.locator('.weekly-copy h3')).toHaveText(plan[1].title)
 await control.selectOption(plan[2].startsAt);await expect(page.locator('.weekly-copy h3')).toHaveText(plan[2].title);await page.goBack();await expect(page.locator('.weekly-copy h3')).toHaveText(plan[1].title);await page.goForward();await expect(page.locator('.weekly-copy h3')).toHaveText(plan[2].title)
 await page.goto('/?w2-at=__proto__#/');await expect(page.locator('.weekly-copy h3')).toHaveText(plan[1].title)
})
test('W2 loopback/no-store/raw registry and source boundaries',async({request})=>{
 expect((await request.get('/',{headers:{Host:'localhost:4198'}})).status()).toBe(403)
 expect((await request.get('/',{headers:{Origin:'https://example.test'}})).status()).toBe(403)
 expect((await request.get('/')).headers()['cache-control']).toBe('no-store')
 for(const path of ['/editorial/weekly.json','/editorial/source-manifest.json','/docs/phase-3/drafts/C01/ARTICLE.md'])expect((await request.get(path)).status()).toBe(404)
})

test('W2 preview control keyboard and Axe',async({page})=>{
 for(const width of [320,1440]){
  await page.setViewportSize({width,height:1000});await page.goto(at(plan[1].startsAt))
  const control=page.getByRole('combobox',{name:'Thử thời điểm theo giờ Việt Nam'});await control.focus();await page.keyboard.press('ArrowDown')
  await page.waitForURL(url=>url.searchParams.get('w2-at')===plan[2].startsAt);await expect(page.locator('.weekly-copy h3')).toHaveText(plan[2].title)
  expect((await new AxeBuilder({page}).include('.w2-preview-controls').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([])
 }
})
