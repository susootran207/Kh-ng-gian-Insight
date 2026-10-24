import { test, expect } from '@playwright/test'

async function dockAt(page: import('@playwright/test').Page, id: string) {
  await page.locator(`#${id}`).evaluate(el=>{
    const r=el.getBoundingClientRect()
    window.scrollTo({top:scrollY+r.bottom-innerHeight+110,behavior:'instant'})
  })
}

test('bounded petal field, top garland and frosted surfaces preserve hero',async({page})=>{
  await page.goto('/')
  await expect(page.locator('.garden-art .wisteria')).toHaveCount(1)
  await expect(page.locator('.garden-art .botanical-art')).toBeVisible()
  await expect(page.locator('.top-garland .canopy-layer')).toHaveCount(3)
  await expect(page.locator('.petal')).toHaveCount(20)
  const details=await page.evaluate(()=>{
    const petals=[...document.querySelectorAll('.petal')]
    const hero=document.querySelector('.garden-art')!
    return {
      timings:new Set(petals.map(el=>getComputedStyle(el).animationDuration)).size,
      phases:new Set(petals.map(el=>getComputedStyle(el).animationDelay)).size,
      pointers:petals.every(el=>getComputedStyle(el).pointerEvents==='none'),
      arch:getComputedStyle(hero).borderTopLeftRadius,
      blur:getComputedStyle(document.querySelector('.quote-section')!).backdropFilter,
      visible:petals.filter(el=>getComputedStyle(el).display!=='none').length,
    }
  })
  expect(details.timings).toBeGreaterThan(8);expect(details.phases).toBeGreaterThan(8)
  expect(details.pointers).toBeTruthy();expect(details.arch).toContain('48%')
  expect(details.blur).toContain('blur')
  await page.setViewportSize({width:390,height:844})
  expect(await page.locator('.petal').evaluateAll(els=>els.filter(el=>getComputedStyle(el).display!=='none').length)).toBe(8)
  await page.getByRole('button',{name:'Menu',exact:true}).click()
  await expect(page.getByRole('navigation')).toBeVisible()
  await page.getByRole('navigation').getByRole('link',{name:'Góc tâm tình'}).click()
  await page.getByLabel('Điều bạn muốn gửi theo ánh đèn').fill('Nội dung thử nghiệm')
  await expect(page.locator('.garden-atmosphere')).toHaveAttribute('data-quiet','true')
  await page.getByRole('button',{name:'Thả một ngọn đèn'}).click()
  await expect(page.getByLabel('Điều bạn muốn gửi theo ánh đèn')).toHaveValue('')
})

test('companion visits safe padding, rests, retreats during interaction and never duplicates hero',async({page})=>{
  await page.setViewportSize({width:1440,height:1000})
  await page.addInitScript(()=>{Math.random=()=>.5})
  // Freeze wall-clock advancement so assertions do not consume the 6.8s visit window.
  const epoch=new Date('2026-10-24T10:00:00Z')
  await page.clock.install({time:epoch})
  await page.clock.pauseAt(epoch)
  await page.goto('/')
  await page.evaluate(()=>document.fonts.ready)
  await dockAt(page,'nen-tang')
  await page.clock.runFor(7500)
  const companion=page.locator('.scroll-companion')
  await expect(companion).toHaveAttribute('data-visible','true')
  await expect(companion).toHaveAttribute('data-section','nen-tang')
  const overlap=await companion.evaluate(el=>{
    const r=el.getBoundingClientRect()
    return [...document.querySelectorAll('main h1,main h2,main h3,main p,main button,main a,main input,main textarea')].some(content=>{
      const box=content.getBoundingClientRect()
      return box.width>0&&box.height>0&&r.left<box.right&&r.right>box.left&&r.top<box.bottom&&r.bottom>box.top
    })
  })
  expect(overlap).toBeFalsy()
  expect(await companion.getAttribute('aria-live')).toBeNull()
  expect(await page.locator('.companion-stage').getAttribute('aria-hidden')).toBe('true')
  await page.clock.runFor(7000)
  await expect(companion).toHaveAttribute('data-visible','false')
  await page.clock.runFor(18000)
  await expect(companion).toHaveAttribute('data-visible','false')
  await page.clock.runFor(10000)
  await expect(companion).toHaveAttribute('data-visible','true')
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}))
  await page.clock.runFor(100)
  await expect(companion).toHaveAttribute('data-visible','false')
  await expect(page.getByRole('button',{name:/Mây, chú mèo/})).toBeVisible()
  await dockAt(page,'bai-viet')
  await page.getByRole('button',{name:/Đọc thử: Khi mùa thi/}).click()
  await page.clock.runFor(40000)
  await expect(companion).toHaveAttribute('data-visible','false')
})

test('mobile companion waits longer and uses no run behavior',async({page})=>{
  await page.setViewportSize({width:390,height:844})
  await page.clock.install()
  await page.goto('/')
  await page.evaluate(()=>document.fonts.ready)
  await dockAt(page,'nen-tang')
  await page.clock.runFor(8000)
  await expect(page.locator('.scroll-companion')).toHaveAttribute('data-visible','false')
  await page.clock.runFor(7000)
  await expect(page.locator('.scroll-companion')).toHaveAttribute('data-visible','true')
  expect(await page.locator('.companion-character').getAttribute('data-action')).not.toBe('run')
  expect((await page.locator('.companion-character').boundingBox())!.width).toBe(49)
  await page.clock.runFor(5000)
  await expect(page.locator('.scroll-companion')).toHaveAttribute('data-visible','false')
  await page.clock.runFor(40000)
  await expect(page.locator('.scroll-companion')).toHaveAttribute('data-visible','false')
})

test('OS and manual reduction stop new spontaneous activity but preserve requested interaction',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'})
  await page.goto('/')
  expect(await page.locator('.petal-field-back').evaluate(el=>getComputedStyle(el).display)).toBe('none')
  expect(await page.locator('.canopy-cluster').first().evaluate(el=>getComputedStyle(el).animationName)).toBe('none')
  await expect(page.locator('.scroll-companion')).toBeHidden()
  await page.getByRole('button',{name:/Mây, chú mèo/}).click()
  await expect(page.locator('.cat .cat-art')).toHaveClass(/happy/)
  await page.getByRole('button',{name:'Di chuyển bằng phím',exact:true}).click()
  const cat=page.getByRole('button',{name:/Mây, chú mèo/})
  const before=(await cat.boundingBox())!.x
  await cat.press('ArrowLeft');expect((await cat.boundingBox())!.x).toBeLessThan(before)
  await page.emulateMedia({reducedMotion:'no-preference'})
  await page.getByRole('button',{name:'Giảm chuyển động',exact:true}).click()
  expect(await page.locator('.canopy-cluster').first().evaluate(el=>getComputedStyle(el).animationPlayState)).toBe('paused')
  await expect(page.locator('.garden-atmosphere')).toHaveAttribute('data-atmosphere-paused','true')
  await expect(page.locator('.scroll-companion')).toBeHidden()
})

test('reading journey keeps a constant lightweight effect budget without long main-thread tasks',async({page})=>{
  await page.goto('/')
  await page.evaluate(()=>document.fonts.ready)
  await page.evaluate(()=>{
    (window as unknown as {longTasks:number[]}).longTasks=[]
    new PerformanceObserver(list=>{
      (window as unknown as {longTasks:number[]}).longTasks.push(...list.getEntries().map(e=>e.duration))
    }).observe({type:'longtask'})
  })
  const nodes=await page.locator('*').count()
  for(const id of ['chuyen-de','nen-tang','dong-chay','bai-viet','tam-tinh']){
    await dockAt(page,id)
    await expect(page.locator('.petal')).toHaveCount(20)
    expect(await page.locator('*').count()).toBe(nodes)
  }
  // Desktop headless sanity check, not a real-device FPS guarantee.
  const tasks=await page.evaluate(()=>(window as unknown as {longTasks:number[]}).longTasks)
  expect(tasks.filter(duration=>duration>150)).toEqual([])
  await page.locator('.site-footer').scrollIntoViewIfNeeded()
  await expect(page.locator('.petal-field-back')).toHaveAttribute('data-journey','false')
})

test('all four ambient actions use the shared character and bounded CSS motion',async({page})=>{
  await page.setViewportSize({width:1440,height:1000})
  await page.clock.install()
  for(const [seed,action] of [[0,'wave'],[.3,'look'],[.6,'run'],[.9,'peek']] as const){
    await page.goto('/')
    await page.evaluate(()=>document.fonts.ready)
    await page.evaluate(value=>{Math.random=()=>value},seed)
    await dockAt(page,'nen-tang')
    await page.clock.runFor(7500)
    await expect(page.locator('.companion-character')).toHaveAttribute('data-action',action)
    await expect(page.locator('.scroll-companion')).toHaveAttribute('data-active','true')
    const pos=(await page.locator('.scroll-companion').boundingBox())!
    await page.evaluate(()=>window.scrollBy({top:20,behavior:'instant'}))
    await page.clock.runFor(100)
    expect((await page.locator('.scroll-companion').boundingBox())!.y).toBeCloseTo(pos.y-20,0)
    // No screen-reader announcement and no added interactive controls.
    await expect(page.locator('.companion-stage button,.companion-stage [tabindex],.companion-stage [role="status"]')).toHaveCount(0)
  }
})
