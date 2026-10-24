import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import path from 'node:path'

for(const width of [320,390,768,1440]) {
  test(`layout, fonts and accessibility at ${width}px`,async({page})=>{
    const errors:string[]=[]
    page.on('pageerror',e=>errors.push(e.message))
    const external:string[]=[]
    page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:4173')&&!r.url().startsWith('data:'))external.push(r.url())})
    await page.setViewportSize({width,height:width>=1000?1000:900})
    await page.goto('/')
    await page.evaluate(()=>document.fonts.ready)
    await expect(page.getByRole('heading',{level:1})).toBeVisible()
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy()
    expect(await page.evaluate(()=>document.fonts.check('400 32px "Cormorant Garamond"','Một khoảng vườn'))).toBeTruthy()
    expect(await page.evaluate(()=>document.fonts.check('400 16px "Be Vietnam Pro"','Điều bạn muốn'))).toBeTruthy()
    const imageLoaded=await page.evaluate(async()=>{const i=new Image();i.src='./garden.webp';await i.decode();return i.naturalWidth>0})
    expect(imageLoaded).toBeTruthy()
    expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([])
    // Freeze the actual ambient poses for review without hiding the new petals.
    await page.evaluate(()=>{document.getAnimations().forEach(animation=>animation.pause());(document.activeElement as HTMLElement)?.blur();window.scrollTo({top:0,behavior:'instant'})})
    await page.screenshot({path:path.resolve('../docs/phase-2/screenshots',`homepage-${width}.png`),fullPage:true})
    await page.screenshot({path:path.resolve('../docs/phase-2/screenshots',`hero-${width}.png`)})
    expect(errors).toEqual([])
    expect(external).toEqual([])
  })
}

test('mobile menu supports keyboard, Escape and section links',async({page})=>{
  await page.setViewportSize({width:390,height:844})
  await page.goto('/')
  const menu=page.locator('.menu-button')
  await menu.focus();await page.keyboard.press('Enter')
  await expect(menu).toHaveAttribute('aria-expanded','true')
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused();await expect(menu).toHaveAttribute('aria-expanded','false')
  await menu.click();await page.getByRole('navigation').getByRole('link',{name:'Góc đọc'}).click()
  await expect(menu).toHaveAttribute('aria-expanded','false')
  await expect(page).toHaveURL(/#\/thu-vien$/)
  await page.reload();await expect(page.getByRole('heading',{name:'Những trang nhỏ, để hiểu mình hơn.'})).toBeVisible()
})

test('quote, weekly, timeline, all three previews and privacy disclosure work',async({page})=>{
  await page.goto('/')
  const quote=page.locator('blockquote')
  const first=await quote.textContent()
  await page.getByRole('button',{name:'Một lời nhắn khác'}).click()
  await expect(quote).not.toHaveText(first!)
  await page.getByRole('button',{name:'Mở một trang đọc'}).click()
  await expect(page.locator('#weekly-excerpt')).toBeVisible()
  await page.getByRole('button',{name:'Khép lại chuyên đề'}).click()
  await expect(page.locator('#weekly-excerpt')).toHaveCount(0)
  for(const title of ['Giữa học kỳ','Mùa thi','Sau thi','Đầu năm']){
    await page.getByRole('button',{name:title,exact:true}).click()
    await expect(page.getByRole('region',{name:title,exact:true})).toBeVisible()
  }
  for(const title of ['Khi mùa thi đến gần','Ở giữa lớp, vẫn thấy một mình','Học cách đứng về phía mình']){
    const opener=page.getByRole('button',{name:`Đọc thử: ${title}`})
    await opener.click()
    await expect(page.locator('#sample-preview')).toBeFocused()
    await expect(page.locator('#sample-preview')).toContainText(title)
    await expect(page.locator('#sample-preview')).toContainText('Chưa kiểm chứng nguồn')
    await page.getByRole('button',{name:'Đóng bản đọc'}).click()
    await expect(opener).toBeFocused()
  }
  await page.getByText('Quyền riêng tư',{exact:true}).click()
  await expect(page.locator('.privacy-details')).toHaveAttribute('open','')
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([])
})

test('cat expressions, bounded mouse dragging, keyboard and reset',async({page})=>{
  await page.setViewportSize({width:1440,height:1000})
  await page.goto('/')
  const cat=page.getByRole('button',{name:/Mây, chú mèo/})
  await cat.click();await expect(page.locator('.cat .cat-art')).toHaveClass(/happy/)
  await cat.press('Enter');await expect(page.locator('.cat .cat-art')).toHaveClass(/sleepy/)
  await cat.press('Space');await expect(page.locator('.cat .cat-art')).toHaveClass(/wink/)
  const before=await cat.boundingBox()
  await page.getByRole('button',{name:'Di chuyển bằng phím',exact:true}).click()
  await expect(cat).toBeFocused()
  await cat.press('ArrowLeft')
  const moved=await cat.boundingBox()
  expect(moved!.x).toBeLessThan(before!.x)
  await cat.press('Escape')
  await expect(page.getByRole('button',{name:'Di chuyển bằng phím',exact:true})).toHaveAttribute('aria-pressed','false')
  const box=(await cat.boundingBox())!
  await page.mouse.move(box.x+box.width/2,box.y+box.height/2)
  await page.mouse.down();await page.mouse.move(2000,0,{steps:10});await page.mouse.up()
  const c=(await cat.boundingBox())!,b=(await page.locator('.cat-boundary').boundingBox())!
  expect(c.x).toBeGreaterThanOrEqual(b.x-.5);expect(c.x+c.width).toBeLessThanOrEqual(b.x+b.width+.5)
  expect(c.y).toBeGreaterThanOrEqual(b.y-.5);expect(c.y+c.height).toBeLessThanOrEqual(b.y+b.height+.5)
  await page.getByRole('button',{name:'Về chỗ cũ',exact:true}).click()
  expect((await cat.boundingBox())!.x).toBeCloseTo(before!.x,0)
  await page.setViewportSize({width:320,height:900})
  const resized=(await cat.boundingBox())!,bounds=(await page.locator('.cat-boundary').boundingBox())!
  expect(resized.x+resized.width).toBeLessThanOrEqual(bounds.x+bounds.width+.5)
})

test('touch drag moves cat and vertical swipes outside cat still scroll',async({browser})=>{
  const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true})
  const page=await context.newPage();await page.goto('/')
  const cat=page.getByRole('button',{name:/Mây, chú mèo/})
  await cat.scrollIntoViewIfNeeded()
  const box=(await cat.boundingBox())!,before=box.x
  const session=await context.newCDPSession(page)
  const touch=(type:string,x:number,y:number)=>session.send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'?[]:[{x,y,id:1,radiusX:2,radiusY:2}]})
  await touch('touchStart',box.x+50,box.y+50)
  for(let i=1;i<=8;i++)await touch('touchMove',box.x+50-i*9,box.y+50-i*3)
  await touch('touchEnd',0,0)
  expect((await cat.boundingBox())!.x).toBeLessThan(before-25)
  const scroll=await page.evaluate(()=>scrollY)
  await touch('touchStart',15,650)
  for(let i=1;i<=8;i++)await touch('touchMove',15,650-i*45)
  await touch('touchEnd',0,0)
  await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(scroll+50)
  await context.close()
})

test('lantern never transmits or persists text, clears on release and pagehide',async({page})=>{
  await page.goto('/')
  await page.getByRole('button',{name:'Giảm chuyển động',exact:true}).click()
  const network:string[]=[]
  page.on('request',r=>network.push(r.url()))
  const text='PRIVATE_CANARY_Đây là nội dung thử nghiệm'
  const field=page.getByLabel('Điều bạn muốn gửi theo ánh đèn')
  const release=page.getByRole('button',{name:'Thả một ngọn đèn'})
  await expect(release).toBeDisabled()
  await field.fill('   ');await expect(release).toBeDisabled()
  await field.fill(text);await release.click()
  await expect(field).toHaveValue('')
  await expect(page.locator('.release-status')).toContainText('Bạn vừa dành một khoảng dừng')
  expect(await page.content()).not.toContain('PRIVATE_CANARY')
  expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0})
  expect(await page.evaluate(()=>location.href)).not.toContain('PRIVATE_CANARY')
  await expect(page.locator('.released-lantern')).toHaveCount(1)
  for(let i=0;i<5;i++){await field.fill(text);await release.click()}
  await expect(page.locator('.released-lantern')).toHaveCount(4)
  await field.fill(text)
  await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pagehide')))
  await expect(field).toHaveValue('')
  expect(network).toEqual([])
})

test('OS reduced motion and manual toggle preserve visible content and feedback',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'})
  await page.goto('/')
  expect(await page.locator('.flower-cluster').first().evaluate(el=>getComputedStyle(el).animationName)).toBe('none')
  await expect(page.locator('h1')).toBeVisible()
  await page.getByLabel('Điều bạn muốn gửi theo ánh đèn').fill('Nội dung kiểm tra')
  await page.getByRole('button',{name:'Thả một ngọn đèn'}).click()
  await expect(page.locator('.release-status')).toBeVisible()
  await page.emulateMedia({reducedMotion:'no-preference'})
  await page.getByRole('button',{name:'Giảm chuyển động',exact:true}).click()
  expect(await page.locator('.flower-cluster').first().evaluate(el=>getComputedStyle(el).animationPlayState)).toBe('paused')
  await page.getByRole('button',{name:'Bật chuyển động',exact:true}).click()
  await page.locator('.garden-art').scrollIntoViewIfNeeded()
  await expect.poll(()=>page.locator('.flower-cluster').first().evaluate(el=>getComputedStyle(el).animationPlayState)).toBe('running')
})
