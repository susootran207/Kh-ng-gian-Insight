import {test,expect} from '@playwright/test'
import {readFileSync} from 'node:fs'
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
