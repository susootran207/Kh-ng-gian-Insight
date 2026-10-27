import { defineConfig } from '@playwright/test'
export default defineConfig({
 testDir:'./tests',testMatch:['academic-showcase.spec.ts','garden-interactions.spec.ts'],outputDir:'test-results-academic',workers:1,timeout:180000,
 reporter:[['list'],['json',{outputFile:'test-results-academic/report.json'}]],
 use:{baseURL:'http://127.0.0.1:4181/',launchOptions:{executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']}},
 webServer:{command:'node scripts/serve-academic.mjs',url:'http://127.0.0.1:4181/',reuseExistingServer:false},
})
