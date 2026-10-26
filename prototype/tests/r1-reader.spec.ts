import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { compileReaderDocument, loadReaderAsset } from '../build/reader-document.ts'
import { sha256 } from '../build/content-contract.ts'

const path = 'tests/fixtures/reader/reader-long-figure.svg', source = readFileSync('tests/fixtures/reader/article.md', 'utf8')
const asset = loadReaderAsset(process.cwd(), { path, sha256: sha256(readFileSync(path)) }, 'reader-long-figure.svg', '/__r1_assets/reader-long-figure.svg')
const doc = compileReaderDocument(source, [asset])
const entry = '/tests/reader-harness/index.html', route = entry + '#/r1/fixture'
const output = resolve('../docs/phase-3/r1/screenshots')
for (const width of [320, 390, 768, 1440]) test('GFM DOM coverage, typography, responsive and axe at ' + width, async ({ page }) => {
  await page.setViewportSize({ width, height: 1000 })
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message))
  await page.goto(route); await page.evaluate(() => document.fonts.ready)
  await expect(page.locator('h1')).toHaveText('Một buổi đọc thử trong khu vườn')
  await expect(page.locator('.preview-notice')).toContainText('Nội dung giả lập')
  const records = await page.locator('[data-source-id]').evaluateAll(elements => elements.map(el => ({
    id: el.getAttribute('data-source-id')!, start: +el.getAttribute('data-source-start')!, end: +el.getAttribute('data-source-end')!, text: el.textContent ?? '',
  })))
  function order(node: typeof doc.root): string[] { return [node.id, ...(node.children ?? []).flatMap(order)] }
  expect(records.map(r => r.id)).toEqual(order(doc.root))
  expect(records.map(r => r.id).sort()).toEqual(doc.trace.map(t => t.id).sort())
  expect(new Set(records.map(r => r.id)).size).toBe(records.length)
  for (const trace of doc.trace) {
    const record = records.find(r => r.id === trace.id)!
    expect([record.start, record.end]).toEqual([trace.range.start, trace.range.end])
    if (trace.value !== undefined) expect(record.text.replace(/\s+/g, ' ').trim()).toBe(trace.value.replace(/\s+/g, ' ').trim())
  }
  const image = page.locator('.reader-figure img')
  await expect(image).toHaveAttribute('alt', 'Ba vùng chữ minh họa việc đọc dữ kiện, giữ điều chưa biết và chọn bước tiếp trong tình huống giả định.')
  expect(await image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBeTruthy()
  await expect(page.locator('.reader-figure figcaption')).toContainText('Hình giả lập')
  await expect(page.locator('.reader-equivalent')).toContainText('Mô tả tương đương')
  await expect(page.locator('.reader-table-scroll table')).toHaveCount(1)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy()
  expect(await page.locator('.article-prose').evaluate(el => getComputedStyle(el).fontFamily)).toContain('Be Vietnam Pro')
  expect(await page.locator('.article-prose').evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16)
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
  await expect(page.locator('.article-prose script')).toHaveCount(0)
  await expect(page.locator('textarea,input:not(:disabled)')).toHaveCount(0)
  if (width === 390 || width === 1440) await page.screenshot({ path: output + '/reader-top-' + width + '.jpg', type: 'jpeg', quality: 80 })
  await page.locator('.article-prose').evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }))
  await page.screenshot({ path: output + '/reader-body-' + width + '.jpg', type: 'jpeg', quality: 80 })
  if (width < 600) {
    const table = page.locator('.reader-table-scroll')
    await table.scrollIntoViewIfNeeded(); await table.focus(); await page.keyboard.press('ArrowRight')
    await expect.poll(() => table.evaluate(el => el.scrollLeft)).toBeGreaterThan(0)
  }
  expect(errors).toEqual([])
})
test('TOC/hash/reload, source anchors, skip link, and return to the actual legacy library with filters', async ({ page }) => {
  await page.goto(entry + '#/')
  await page.getByRole('link', { name: 'Mở Reader giả lập' }).click()
  await expect(page.locator('main')).toBeFocused()
  await page.getByRole('navigation', { name: 'Mục lục' }).getByRole('link', { name: 'Một khoảng dừng để đọc', exact: true }).nth(1).click()
  await expect(page.locator('#mot-khoang-dung-de-doc-2')).toBeFocused()
  await expect(page).toHaveURL(/#mot-khoang-dung-de-doc-2$/)
  await page.reload()
  await expect(page.locator('#mot-khoang-dung-de-doc-2')).toBeFocused()
  await page.getByRole('link', { name: 'quay tới phần đầu', exact: true }).click()
  await expect(page.locator('#mot-khoang-dung-de-doc')).toBeFocused()
  const references = page.locator('.article-prose a[href^="https:"]')
  expect(await references.count()).toBeGreaterThan(1)
  for (const a of await references.all()) { await expect(a).toHaveAttribute('target', '_blank'); await expect(a).toHaveAttribute('rel', 'noopener noreferrer') }
  await page.getByRole('link', { name: 'Quay lại thư viện' }).click()
  await expect(page.getByRole('searchbox')).toHaveValue('mua thi')
  await expect(page.locator('.library-entry')).toHaveCount(1)
  await page.goto(route); await page.reload(); await expect(page.locator('h1')).toBeVisible()
  await page.keyboard.press('Tab'); await expect(page.locator('.skip-link')).toBeFocused()
  await page.keyboard.press('Enter'); await expect(page.locator('main')).toBeFocused()
})
test('long figure: keyboard open, zoom, scroll, focus trap, Escape and return focus under reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 }); await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(route)
  const opener = page.getByRole('button', { name: 'Xem hình lớn' })
  await opener.scrollIntoViewIfNeeded(); await opener.focus(); await page.keyboard.press('Enter')
  const dialog = page.getByRole('dialog', { name: 'Xem hình lớn' }), close = dialog.getByRole('button', { name: 'Đóng hình' })
  await expect(dialog).toBeVisible(); await expect(close).toBeFocused()
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
  await page.keyboard.press('Tab'); await expect(dialog.getByRole('button', { name: 'Phóng to' })).toBeFocused()
  await page.keyboard.press('Enter'); await expect(dialog.getByRole('status')).toContainText('150%')
  const viewport = dialog.getByRole('region', { name: 'Hình phóng lớn, dùng phím mũi tên để cuộn' })
  await expect.poll(() => viewport.locator('img').evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBeTruthy()
  await expect.poll(() => viewport.evaluate(el => el.scrollHeight > el.clientHeight)).toBeTruthy()
  await viewport.focus(); await page.keyboard.press('ArrowDown')
  await expect.poll(() => viewport.evaluate(el => el.scrollTop)).toBeGreaterThan(0)
  await page.keyboard.press('ArrowRight')
  await expect.poll(() => viewport.evaluate(el => el.scrollLeft)).toBeGreaterThan(0)
  await page.keyboard.press('Tab'); await expect(close).toBeFocused()
  await page.screenshot({ path: output + '/reader-figure-390.jpg', type: 'jpeg', quality: 80 })
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(opener).toBeFocused()
  await opener.press('Enter'); await page.getByRole('button', { name: 'Đóng hình' }).click()
  await expect(opener).toBeFocused()
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
})
test('200%-equivalent desktop reflow: 720 CSS px at DPR2, no clipped text or controls', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 720, height: 500 }, deviceScaleFactor: 2, reducedMotion: 'reduce' })
  try {
    const page = await context.newPage()
    await page.goto('http://127.0.0.1:4190' + route)
    await expect(page.locator('h1')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy()
    await expect(page.locator('.table-of-contents')).toHaveCSS('position', 'static')
    await page.getByRole('navigation', { name: 'Mục lục' }).getByRole('link', { name: 'Gợi ý phản hồi', exact: true }).click()
    await expect(page.locator('#goi-y-phan-hoi')).toBeFocused()
    await expect(page.locator('.article-prose')).toContainText('Câu 3:')
  } finally { await context.close() }
})
test('fixture asset allowlist and direct source access do not open real drafts', async ({ request }) => {
  expect((await request.get('/__r1_assets/reader-long-figure.svg')).status()).toBe(200)
  for (const path of ['/__r1_assets/unknown.svg', '/__r1_assets/reader-long-figure.svg?preview=true']) expect((await request.get(path)).status()).toBe(404)
  const denied = await request.get('/@fs' + resolve('../docs/phase-3/drafts/C01/ARTICLE.md'))
  expect(denied.status()).toBe(403)
})
