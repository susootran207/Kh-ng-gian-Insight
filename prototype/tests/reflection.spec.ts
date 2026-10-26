import {test,expect,type Page} from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import {mkdirSync} from 'node:fs'
import {resolve} from 'node:path'
const output=resolve('test-results-g1-evidence');mkdirSync(output,{recursive:true})
const canary='G1_PRIVATE_TEST_Đ_🧪_e\u0301',prefix='G1_PRIVATE_TEST'
const field=(page:Page)=>page.getByLabel('Điều bạn muốn gửi theo ánh đèn')
const release=(page:Page)=>page.getByRole('button',{name:'Thả một ngọn đèn',exact:true})
async function open(page:Page){await page.goto('/#/#tam-tinh');await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>Promise.all([...document.images].map(image=>image.decode().catch(()=>{}))))}
async function monitor(page:Page){await page.addInitScript(()=>{
 const pending=new Set<unknown>(),schedule=window.setTimeout.bind(window),cancel=window.clearTimeout.bind(window)
 window.setTimeout=((handler:TimerHandler,ms?:number,...args:unknown[])=>{if(ms!==9500||typeof handler!=='function')return schedule(handler,ms,...args);let handle:number;handle=schedule(()=>{pending.delete(handle);handler(...args)},ms);pending.add(handle);return handle}) as typeof window.setTimeout
 window.clearTimeout=(handle)=>{pending.delete(handle!);cancel(handle)}
 ;(window as unknown as {g1Pending:()=>number}).g1Pending=()=>pending.size
})}
async function pending(page:Page){return page.evaluate(()=>(window as unknown as {g1Pending:()=>number}).g1Pending())}
for(const motion of ['reduce','no-preference'] as const)test('G1 private canary, edit/clear/release and HTTP/storage/URL/console '+motion,async({page,context})=>{
 const requests:string[]=[],messages:string[]=[],frames:string[]=[]
 page.on('websocket',ws=>ws.on('framesent',e=>frames.push(String(e.payload))))
 await page.emulateMedia({reducedMotion:motion});await open(page)
 page.on('request',r=>requests.push(JSON.stringify({url:r.url(),headers:r.headers(),body:r.postData()})))
 page.on('console',m=>messages.push(m.text()));page.on('pageerror',e=>messages.push(e.message))
 await expect(release(page)).toBeDisabled();await field(page).fill(' \n\u00a0');await expect(release(page)).toBeDisabled()
 await field(page).fill(canary);await field(page).press('End');await page.keyboard.press('Enter');await expect(page.locator('.released-lantern')).toHaveCount(0)
 await field(page).pressSequentially(' edit');await page.getByRole('button',{name:'Xóa lời viết',exact:true}).focus();await page.keyboard.press('Space')
 await expect(field(page)).toHaveValue('');await expect(field(page)).toBeFocused();await expect(page.locator('.character-count')).toHaveText('0/500');await expect(page.locator('.release-status')).toHaveText('Đã xóa lời viết khỏi ô nhập.')
 await field(page).fill(canary);await release(page).focus();await page.keyboard.press('Enter')
 await expect(field(page)).toHaveValue('');await expect(release(page)).toBeDisabled();await expect(page.locator('.released-lantern')).toHaveCount(1);await expect(page.locator('.release-status')).not.toContainText(prefix)
 expect(await page.content()).not.toContain(prefix)
 const stored=await page.evaluate(async()=>({local:[...Object.entries(localStorage)],session:[...Object.entries(sessionStorage)],databases:await indexedDB.databases(),caches:await caches.keys(),url:location.href,history:JSON.stringify(history.state)}))
 expect(stored.local).toEqual([]);expect(stored.session).toEqual([]);expect(stored.databases).toEqual([]);expect(stored.caches).toEqual([]);expect(await context.cookies()).toEqual([])
 expect(JSON.stringify(stored)+messages.join()+frames.join()).not.toContain(prefix);expect(requests).toEqual([])
})
test('G1 same-tick submit, Unicode limit, bounded timers, pagehide/pageshow and unmount',async({page})=>{
 await page.clock.install();await monitor(page);await open(page)
 await field(page).focus();await page.keyboard.insertText('🧪'.repeat(300));expect(await field(page).inputValue()).toHaveLength(500);await expect(page.locator('.character-count')).toHaveText('500/500')
 await field(page).fill(canary);await page.locator('#tam-tinh form').evaluate(form=>{form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}))})
 await expect(page.locator('.released-lantern')).toHaveCount(1);expect(await pending(page)).toBe(1)
 for(let i=0;i<12;i++){await field(page).fill(canary);await release(page).click();expect(await pending(page)).toBeLessThanOrEqual(4)}
 await expect(page.locator('.released-lantern')).toHaveCount(4);expect(await pending(page)).toBe(4)
 await page.clock.fastForward(9500);await expect(page.locator('.released-lantern')).toHaveCount(0);expect(await pending(page)).toBe(0)
 await field(page).fill(canary);await release(page).click();await field(page).fill(canary)
 await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true})))
 await expect(field(page)).toHaveValue('');await expect(page.locator('.released-lantern')).toHaveCount(0);expect(await pending(page)).toBe(0)
 await field(page).fill(canary);await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:false})));await expect(field(page)).toHaveValue(canary);await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true})));await expect(field(page)).toHaveValue('')
 await field(page).fill(canary);await release(page).click();await page.getByRole('link',{name:'Bỏ qua, ghé thư viện',exact:true}).click();await expect(page.locator('main')).toBeFocused();await expect.poll(()=>pending(page)).toBe(0)
 await page.goBack();await expect(field(page)).toHaveValue('');await expect(page.locator('.released-lantern')).toHaveCount(0)
})
test('G1 anchors/history retain draft; route/reload discard; visibility alone retains',async({page})=>{
 await open(page);await field(page).fill(canary)
 await page.goto('/#/#nen-tang');await expect(field(page)).toHaveValue(canary)
 await page.goBack();await expect(field(page)).toHaveValue(canary);await page.goForward();await expect(field(page)).toHaveValue(canary)
 await page.evaluate(()=>document.dispatchEvent(new Event('visibilitychange')));await expect(field(page)).toHaveValue(canary)
 await page.getByRole('link',{name:'Tìm hiểu nền tảng',exact:true}).click();await expect(page.locator('main')).toBeFocused();await page.goBack();await expect(field(page)).toHaveValue('')
 await field(page).fill(canary);await page.reload();await expect(field(page)).toHaveValue('');await expect(page.locator('.release-status')).toHaveText('')
})
for(const width of [320,390,768,1440])test('G1 keyboard, skip, copy, Axe and responsive '+width,async({page})=>{
 await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'reduce'});await open(page)
 await expect(page.locator('#tam-tinh')).toContainText('Không có người nhận, đọc hoặc phản hồi lời viết.')
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy()
 expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([])
 await page.locator('#tam-tinh').screenshot({path:output+'/reflection-'+width+'.jpg',type:'jpeg',quality:80})
 await page.getByText('Lời viết khi chuyển trang',{exact:true}).focus();await page.keyboard.press('Enter');await expect(page.locator('#reflection-lifecycle')).toHaveAttribute('open','')
 expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([])
 await page.locator('#tam-tinh').screenshot({path:output+'/reflection-details-'+width+'.jpg',type:'jpeg',quality:80})
 await page.getByRole('link',{name:'Bỏ qua, ghé thư viện',exact:true}).focus();await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();await page.goBack();await expect(field(page)).toHaveValue('')
 await expect(page.locator('.top-garland')).toHaveAttribute('data-variant','B');await expect(page.getByRole('button',{name:/Mây, chú mèo/})).toBeVisible()
})
test('G1 reduced motion and 200%-equivalent reflow (not native zoom)',async({browser})=>{
 const context=await browser.newContext({viewport:{width:720,height:500},deviceScaleFactor:2,reducedMotion:'reduce'})
 try{const page=await context.newPage();await page.goto('http://127.0.0.1:4195/#/#tam-tinh');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();await field(page).fill(canary);await release(page).click();await expect(field(page)).toHaveValue('');await expect(page.locator('.release-status')).not.toBeEmpty();await expect(page.locator('.released-lantern')).toHaveCount(1)}finally{await context.close()}
})
