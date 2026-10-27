import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { scanAcademicShowcase } from '../build/academic-showcase-scan.ts'
const root=fileURLToPath(new URL('../../',import.meta.url))
console.log(JSON.stringify(scanAcademicShowcase(root,resolve(root,'prototype/dist-academic')),null,2))
