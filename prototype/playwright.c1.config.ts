import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests', testMatch: 'c1-preview.spec.ts', outputDir: 'test-results-c1', workers: 1, timeout: 120000,
  reporter: [['list'], ['json', { outputFile: 'test-results-c1/report.json' }]],
  use: { baseURL: 'http://127.0.0.1:4191', launchOptions: { executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] }, trace: 'retain-on-failure' },
  webServer: { command: 'npm run dev:content-preview', url: 'http://127.0.0.1:4191/preview/index.html', reuseExistingServer: false },
})
