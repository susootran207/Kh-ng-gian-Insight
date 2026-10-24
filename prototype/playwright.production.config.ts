import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir:'./tests',outputDir:'test-results-production',testMatch:'production.spec.ts',workers:1,
  reporter:[['list'],['json',{outputFile:'test-results-production/report.json'}]],
  use:{baseURL:'http://127.0.0.1:4180/Kho-ng-gian-Insight/',launchOptions:{executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']}},
  webServer:{command:'node scripts/serve-production.mjs',url:'http://127.0.0.1:4180/Kho-ng-gian-Insight/',reuseExistingServer:false},
})
