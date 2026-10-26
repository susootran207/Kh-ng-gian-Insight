import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests', testMatch: 'r1-reader.spec.ts', outputDir: 'test-results-r1', workers: 1, timeout: 30000,
  reporter: [['list'], ['json', { outputFile: 'test-results-r1/report.json' }]],
  use: { baseURL: 'http://127.0.0.1:4190', launchOptions: { executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] }, trace: 'retain-on-failure' },
  webServer: { command: 'npm run dev:reader-fixture', url: 'http://127.0.0.1:4190/tests/reader-harness/index.html', reuseExistingServer: false },
})
