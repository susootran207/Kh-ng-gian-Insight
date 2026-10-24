import { test, expect } from '@playwright/test'
import path from 'node:path'

for(const width of [1440,768,390]){
  test(`slender corner framing and protected content at ${width}px`,async({page})=>{
    await page.setViewportSize({width,height:1000})
    const requested:string[]=[]
    page.on('request',request=>{if(request.url().includes('/canopy-'))requested.push(request.url())})
    await page.goto('/')
    await page.evaluate(()=>document.fonts.ready)
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))))
    const roof=page.locator('.top-garland')
    await expect(roof).toHaveAttribute('data-ready','true')
    const bounds=(await roof.boundingBox())!
    expect(bounds.x).toBe(0);expect(bounds.width).toBe(width)
    await expect(roof.locator('.corner-wisteria')).toHaveCount(2)
    await expect(roof.locator('.canopy-layer')).toHaveCount(6)
    await expect(roof.locator('.corner-raceme')).toHaveCount(14)
    const left=(await roof.locator('.corner-left').boundingBox())!
    const right=(await roof.locator('.corner-right').boundingBox())!
    expect(right.x-(left.x+left.width)).toBeGreaterThan(width*.3)
    expect(left.width).toBeLessThanOrEqual(240)
    expect(right.width).toBeLessThanOrEqual(224)
    const evidence=await roof.evaluate(async el=>{
      const box=el.getBoundingClientRect()
      const uri=(el as HTMLElement).style.maskImage.slice(4,-1).replace(/^["']|["']$/g,'')
      const image=new Image();image.src=uri;await image.decode()
      const canvas=document.createElement('canvas');canvas.width=box.width;canvas.height=box.height
      const ctx=canvas.getContext('2d')!;ctx.drawImage(image,0,0)
      const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data
      let maxContentAlpha=0,samples=0
      for(const content of document.querySelectorAll('.site-header .brand,.navigation>a,.menu-button,.hero-copy h1,.hero-description,.hero-copy .button,.garden-wrap')){
        const r=content.getBoundingClientRect()
        if(!r.width||!r.height)continue
        for(let y=Math.max(0,Math.ceil(r.top-box.top));y<Math.min(canvas.height,r.bottom-box.top);y+=6){
          for(let x=Math.max(0,Math.ceil(r.left-box.left));x<Math.min(canvas.width,r.right-box.left);x+=6){
            maxContentAlpha=Math.max(maxContentAlpha,pixels[(y*canvas.width+x)*4+3]);samples++
          }
        }
      }
      const sizes=[...el.querySelectorAll('.corner-raceme')].map(spray=>spray.getBoundingClientRect().width)
      return {maxContentAlpha,samples,maxRacemeWidth:Math.max(...sizes),pointer:getComputedStyle(el).pointerEvents,canvas:document.querySelectorAll('canvas').length}
    })
    expect(evidence.maxContentAlpha).toBeLessThanOrEqual(4)
    expect(evidence.samples).toBeGreaterThan(100)
    expect(evidence.maxRacemeWidth).toBeLessThan(32)
    expect(evidence.pointer).toBe('none');expect(evidence.canvas).toBe(0)
    expect(requested).toEqual([]) // The discarded full roof bitmaps are not loaded.
    await page.evaluate(()=>document.getAnimations().forEach(animation=>animation.pause()))
    await page.screenshot({path:path.resolve('../docs/prototype/screenshots',`hero-${width}.png`)})
    // Construction view only: isolate the real roof and remove the content mask.
    await page.addStyleTag({content:'body *{visibility:hidden!important}.top-garland,.top-garland *{visibility:visible!important}.top-garland{mask-image:none!important;-webkit-mask-image:none!important}'})
    await roof.screenshot({path:path.resolve('../docs/prototype/screenshots',`corner-only-${width}.png`)})
  })
}

test('corner framing stops for reduction, tab hiding and scrolling away; menu safety mask adapts',async({page})=>{
  await page.setViewportSize({width:390,height:844})
  await page.goto('/')
  const roof=page.locator('.top-garland')
  const initialMask=await roof.getAttribute('style')
  await page.getByRole('button',{name:'Menu',exact:true}).click()
  await expect.poll(()=>roof.getAttribute('style')).not.toBe(initialMask)
  await page.getByRole('navigation').getByRole('link',{name:'Góc đọc'}).click()
  await expect(roof).toHaveAttribute('data-paused','true')
  expect(await roof.locator('.canopy-cluster').first().evaluate(el=>getComputedStyle(el).animationPlayState)).toBe('paused')
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}))
  await page.getByRole('button',{name:'Giảm chuyển động',exact:true}).click()
  expect(await roof.locator('.corner-raceme').first().evaluate(el=>getComputedStyle(el).animationPlayState)).toBe('paused')
  await page.emulateMedia({reducedMotion:'reduce'})
  expect(await roof.locator('.canopy-cluster').first().evaluate(el=>getComputedStyle(el).animationName)).toBe('none')
  await expect(page.getByRole('heading',{level:1})).toBeVisible()
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'))})
  await expect(page.locator('.garden-atmosphere')).toHaveAttribute('data-atmosphere-paused','true')
})
