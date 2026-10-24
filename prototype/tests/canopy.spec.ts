import { test, expect, type Page } from '@playwright/test'

async function ready(page:Page){
  await page.evaluate(()=>document.fonts.ready)
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))))
}

async function safeMask(page:Page){
  return page.locator('.top-garland').evaluate(async el=>{
    const box=el.getBoundingClientRect()
    const uri=(el as HTMLElement).style.maskImage.slice(4,-1).replace(/^["']|["']$/g,'')
    const image=new Image();image.src=uri;await image.decode()
    const canvas=document.createElement('canvas');canvas.width=box.width;canvas.height=box.height
    const ctx=canvas.getContext('2d')!;ctx.drawImage(image,0,0)
    const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data
    let maxAlpha=0,samples=0
    for(const content of document.querySelectorAll('.site-header .brand,.navigation>a,.menu-button,.hero-copy h1,.hero-description,.hero-copy .button,.garden-wrap')){
      const r=content.getBoundingClientRect()
      if(!r.width||!r.height)continue
      for(let y=Math.max(0,Math.ceil(r.top-box.top));y<Math.min(canvas.height,r.bottom-box.top);y+=6)
        for(let x=Math.max(0,Math.ceil(r.left-box.left));x<Math.min(canvas.width,r.right-box.left);x+=6){maxAlpha=Math.max(maxAlpha,pixels[(y*canvas.width+x)*4+3]);samples++}
    }
    return{maxAlpha,samples}
  })
}

for(const [variant,width] of [['A',1440],['B',1440],['C',1440],['B',768],['B',390]] as const){
  test(`trellis ${variant} at ${width}px preserves UI and has flowers across its span`,async({page})=>{
    await page.setViewportSize({width,height:1000})
    const requested:string[]=[]
    page.on('request',request=>{if(request.url().includes('/canopy-'))requested.push(request.url())})
    await page.goto(`/?wisteria=${variant}`)
    await ready(page)
    const roof=page.locator('.top-garland')
    await expect(roof).toHaveAttribute('data-variant',variant)
    await expect(roof).toHaveAttribute('data-ready','true')
    const box=(await roof.boundingBox())!
    expect(box.x).toBe(0);expect(box.width).toBe(width)
    await expect(roof.locator('[data-depth]')).toHaveCount(3)
    await expect(roof.locator('.main-botanical')).toHaveCount(6)
    const positions=await roof.locator('.main-botanical').evaluateAll(els=>els.map(el=>Number((el as HTMLElement).dataset.position)))
    expect(positions.some(x=>x>25&&x<45)).toBeTruthy()
    expect(positions.some(x=>x>45&&x<65)).toBeTruthy()
    const widths=await roof.locator('.botanical-spray').evaluateAll(els=>els.map(el=>parseFloat(getComputedStyle(el).width)))
    expect(Math.max(...widths)).toBeLessThanOrEqual(146)
    const safety=await safeMask(page)
    expect(safety.samples).toBeGreaterThan(100);expect(safety.maxAlpha).toBeLessThanOrEqual(4)
    await roof.locator('.botanical-paint,.trellis-distant-leaves').evaluateAll(async els=>{
      const urls=[...new Set(els.map(el=>getComputedStyle(el).backgroundImage.slice(4,-1).replace(/^["']|["']$/g,'')))]
      await Promise.all(urls.map(async src=>{const image=new Image();image.src=src;await image.decode()}))
    })
    expect(requested.length).toBeGreaterThan(0)
    expect(requested.some(url=>url.includes('-small.webp'))).toBe(width<700)
    if(width<700)expect(requested.every(url=>url.includes('-small.webp'))).toBeTruthy()
    expect(await roof.evaluate(el=>getComputedStyle(el).pointerEvents)).toBe('none')
    expect(await page.locator('canvas').count()).toBe(0)
    await page.getByRole('button',{name:/Mây, chú mèo/}).click()
    await expect(page.locator('.cat .cat-art')).toHaveClass(/happy/)
  })
}

test('all alternatives remain selectable, B is provisional default, and page geometry stays identical',async({page})=>{
  await page.setViewportSize({width:1440,height:1000})
  await page.addInitScript(()=>{Math.random=()=>.5})
  const geometries:unknown[]=[]
  const compositions:string[]=[]
  for(const variant of ['A','B','C']){
    await page.goto(`/?wisteria=${variant}`);await ready(page)
    geometries.push(await page.locator('.brand,.hero-copy,.garden-art,.quote-section').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return [r.x,r.y,r.width,r.height]})))
    compositions.push(await page.locator('.botanical-spray').evaluateAll(els=>els.map(el=>(el as HTMLElement).getAttribute('style')).join('|')))
  }
  expect(geometries[0]).toEqual(geometries[1]);expect(geometries[1]).toEqual(geometries[2])
  expect(new Set(compositions).size).toBe(3)
  await page.goto('/');await expect(page.locator('.top-garland')).toHaveAttribute('data-variant','B')
  await page.goto('/?wisteria=unknown');await expect(page.locator('.top-garland')).toHaveAttribute('data-variant','B')
})

test('all mobile alternatives preserve safe controls and a connected middle',async({page})=>{
  await page.setViewportSize({width:390,height:844})
  for(const variant of ['A','B','C']){
    await page.goto(`/?wisteria=${variant}`);await ready(page)
    expect((await safeMask(page)).maxAlpha).toBeLessThanOrEqual(4)
    await page.getByRole('button',{name:'Menu',exact:true}).click()
    await expect(page.getByRole('navigation')).toBeVisible()
    await page.getByRole('navigation').getByRole('link',{name:'Góc tâm tình'}).click()
    await page.getByLabel('Điều bạn muốn gửi theo ánh đèn').fill('Nội dung thử nghiệm')
    await page.getByRole('button',{name:'Thả một ngọn đèn'}).click()
    await expect(page.getByLabel('Điều bạn muốn gửi theo ánh đèn')).toHaveValue('')
  }
})

test('trellis pauses for OS/manual reduction, tab hiding and offscreen; menu mask adapts',async({page})=>{
  await page.setViewportSize({width:390,height:844})
  await page.goto('/');await ready(page)
  const roof=page.locator('.top-garland')
  const initialMask=await roof.getAttribute('style')
  await page.getByRole('button',{name:'Menu',exact:true}).click()
  await expect.poll(()=>roof.getAttribute('style')).not.toBe(initialMask)
  await page.getByRole('navigation').getByRole('link',{name:'Góc đọc'}).click()
  await expect(roof).toHaveAttribute('data-paused','true')
  expect(await roof.locator('.canopy-cluster').first().evaluate(el=>getComputedStyle(el).animationPlayState)).toBe('paused')
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}))
  await page.getByRole('button',{name:'Giảm chuyển động',exact:true}).click()
  expect(await roof.locator('.canopy-cluster').first().evaluate(el=>getComputedStyle(el).animationPlayState)).toBe('paused')
  await page.emulateMedia({reducedMotion:'reduce'})
  expect(await roof.locator('.canopy-cluster').first().evaluate(el=>getComputedStyle(el).animationName)).toBe('none')
  await expect(page.getByRole('heading',{level:1})).toBeVisible()
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'))})
  await expect(page.locator('.garden-atmosphere')).toHaveAttribute('data-atmosphere-paused','true')
})
