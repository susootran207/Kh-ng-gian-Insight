import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import path from 'node:path'

const routes=[['library','/thu-vien'],['article','/bai-viet/khi-mua-thi-den-gan'],['topics','/chuyen-de'],['topic','/chuyen-de/dem-dai'],['404','/loi-chua-co']] as const
for(const width of [320,390,768,1440])test(`reading pages responsive, keyboard focus and axe at ${width}`,async({page})=>{
  await page.setViewportSize({width,height:width===1440?1000:900})
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message))
  for(const [name,route] of routes){
    await page.goto('/#'+route);await page.reload();await page.evaluate(()=>document.fonts.ready)
    await expect(page.locator('h1')).toBeVisible()
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy()
    expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([])
    await page.keyboard.press('Tab');await expect(page.locator('.skip-link')).toBeFocused()
    await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused()
    await page.locator('main').evaluate(el=>el.blur());await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}))
    await page.screenshot({path:path.resolve('../docs/phase-2/screenshots',`${name}-${width}.png`),fullPage:true})
  }
  expect(errors).toEqual([])
})
test('Vietnamese title, description and keyword search, filters, query history and reset',async({page})=>{
  await page.goto('/#/thu-vien')
  const search=page.getByRole('searchbox'),cards=page.locator('.library-entry')
  await expect(cards).toHaveCount(4)
  for(const term of ['mùa thi','mua thi','MÙA THI','ky vong','kỳ vọng']){await search.fill(term);await expect(cards).toHaveCount(1);await expect(cards).toContainText('Khi mùa thi đến gần')}
  await search.fill('giac ngu');await expect(cards).toHaveCount(1);await expect(cards).toContainText('Đêm dài')
  await search.fill('');await page.getByRole('combobox',{name:'Chủ đề',exact:true}).selectOption('Áp lực học tập');await expect(cards).toHaveCount(1)
  await page.getByLabel('Giai đoạn năm học').selectOption('Đầu năm');await expect(cards).toHaveCount(0);await expect(page.getByText('Chưa tìm thấy trang phù hợp.')).toBeVisible()
  await page.goBack();await expect(page.getByLabel('Giai đoạn năm học')).toHaveValue('');await expect(cards).toHaveCount(1)
  await page.goForward();await expect(page.getByLabel('Giai đoạn năm học')).toHaveValue('Đầu năm');await expect(cards).toHaveCount(0)
  await page.getByRole('button',{name:'Xóa bộ lọc'}).click();await expect(cards).toHaveCount(4);await expect(page).toHaveURL(/#\/thu-vien$/)
  await search.fill('không tồn tại');await expect(cards).toHaveCount(0)
  await page.reload();await expect(search).toHaveValue('không tồn tại');await expect(cards).toHaveCount(0)
  await page.getByRole('button',{name:'Xem tất cả bài viết'}).click();await expect(cards).toHaveCount(4)
})
test('real article links, reload, TOC, references, related reading and return filters',async({page})=>{
  await page.goto('/#/thu-vien?q=mua+thi')
  await page.getByRole('link',{name:'Đọc bài: Khi mùa thi đến gần'}).click()
  await expect(page).toHaveURL(/#\/bai-viet\/khi-mua-thi-den-gan$/)
  await expect(page.locator('main')).toBeFocused()
  await expect(page.locator('.preview-notice')).toContainText('chưa được chuyên gia duyệt')
  await page.reload();await expect(page.locator('h1')).toHaveText('Khi mùa thi đến gần')
  await page.getByRole('navigation',{name:'Mục lục'}).getByRole('link',{name:'Bắt đầu từ một việc nhỏ'}).click()
  await expect(page.locator('#mot-viec-nho')).toBeFocused()
  await expect(page).toHaveURL(/#mot-viec-nho$/)
  await page.reload();await expect(page.locator('#mot-viec-nho')).toBeFocused()
  await expect(page.locator('.article-prose a[target="_blank"]')).toHaveAttribute('href','https://www.who.int/publications/i/item/9789240003927')
  await expect(page.locator('.related-reading .library-entry')).toHaveCount(2)
  await page.getByRole('link',{name:'Quay lại thư viện'}).click();await expect(page.getByRole('searchbox')).toHaveValue('mua thi')
})
test('topic index, detail, every article link, missing article and recovery',async({page})=>{
  await page.goto('/#/chuyen-de');await expect(page.getByText('Chuyên đề đang được vun trồng.')).toBeVisible()
  await expect(page.getByRole('link',{name:'Bước vào chuyên đề'})).toHaveCount(0)
  await page.goto('/#/chuyen-de/dem-dai');await page.reload();await expect(page.locator('h1')).toHaveText('Lối này chưa có trang.')
  for(const slug of ['dem-dai-minh-chua-ngu','khi-mua-thi-den-gan','o-giua-lop','dung-ve-phia-minh']){await page.goto('/#/bai-viet/'+slug);await expect(page.locator('.article-prose')).toBeVisible()}
  for(const route of ['/bai-viet/khong-co','/chuyen-de/khong-co','/khong-co']){await page.goto('/#'+route);await expect(page.locator('h1')).toHaveText('Lối này chưa có trang.');await page.getByRole('link',{name:'Về thư viện',exact:true}).click();await expect(page.getByRole('searchbox')).toBeVisible()}
})
test('new mobile menu, homepage sections, reduced motion, reflection cleanup on route leave',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'})
  await page.goto('/#/thu-vien')
  const menu=page.getByRole('button',{name:'Menu',exact:true});await menu.focus();await page.keyboard.press('Enter');await page.keyboard.press('Escape');await expect(menu).toBeFocused();await expect(menu).toHaveAttribute('aria-expanded','false')
  for(const [name,id] of [['Về khu vườn','nen-tang'],['Dòng chảy','dong-chay'],['Góc tâm tình','tam-tinh']]){
    await page.goto('/#/thu-vien');await page.getByRole('button',{name:'Menu',exact:true}).click();await page.getByRole('navigation',{name:'Điều hướng chính'}).getByRole('link',{name}).click();await expect(page.locator('#'+id)).toBeFocused()
  }
  const field=page.getByLabel('Điều bạn muốn gửi theo ánh đèn');await field.fill('PRIVATE_ROUTE_CANARY')
  await page.goto('/#/thu-vien');await page.goto('/#/#tam-tinh');await expect(field).toHaveValue('')
})
