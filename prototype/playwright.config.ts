import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir:'./tests', testMatch:'**/*.spec.ts', testIgnore:['production.spec.ts','r1-reader.spec.ts'], fullyParallel:false, workers:1,
  timeout:30000, reporter:[['list'],['json',{outputFile:'test-results/report.json'}]],
  use:{baseURL:'http://127.0.0.1:4173',launchOptions:{executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']},trace:'retain-on-failure'},
  webServer:{command:'npm run dev -- --host 127.0.0.1 --port 4173',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI},
})
