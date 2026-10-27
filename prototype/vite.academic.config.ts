// Explicit opt-in only. vite.config.ts remains the STANDARD VERIFIED RELEASE.
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { createAcademicShowcase } from './build/academic-showcase.ts'
import { assertArtifact } from './build/publication-scan.ts'
import { assertShowcaseModule, scanAcademicShowcase, showcaseBoundary } from './build/academic-showcase-scan.ts'
const root=fileURLToPath(new URL('../',import.meta.url))
function academic():Plugin {
  let release:ReturnType<typeof createAcademicShowcase>,output:string
  return {name:'academic-showcase-release',
    configResolved(config){if(config.command!=='build'||config.build.sourcemap)throw new Error('Academic showcase requires a production build without sourcemaps');output=resolve(config.root,config.build.outDir)},
    buildStart(){release=createAcademicShowcase(root)},
    resolveId(id){if(['virtual:editorial','virtual:weekly'].includes(id))return '\0'+id},
    load(id){if(id==='\0virtual:editorial')return 'export default '+JSON.stringify(release.catalogue);if(id==='\0virtual:weekly')return 'export default '+JSON.stringify(release.weekly)},
    generateBundle(_options,bundle){for(const asset of release.assets)this.emitFile({type:'asset',fileName:asset.url.slice(1),source:asset.bytes});const boundary=showcaseBoundary(root,release);for(const [name,item] of Object.entries(bundle)){if(item.type==='chunk')assertShowcaseModule(Object.keys(item.modules));assertArtifact(Buffer.from(item.type==='chunk'?item.code:item.source),name,boundary)}},
    writeBundle(){console.log('Academic showcase scanner:',scanAcademicShowcase(root,output))}
  }
}
export default defineConfig({plugins:[react(),academic()],base:'./',define:{'import.meta.env.KGNT_ACADEMIC_SHOWCASE':'true'},build:{outDir:'dist-academic',sourcemap:false},optimizeDeps:{entries:['index.html']}})
