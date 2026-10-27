import {defineConfig,mergeConfig,type Plugin} from 'vite'
import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {fullLibraryPreview} from './vite.p2.config.ts'
import {repositoryRoot} from './build/editorial.ts'
import {createContentPreview} from './build/content-preview.ts'
import {selectWeeklyPreview,weeklyPreviewClocks} from './build/weekly-preview.ts'
import type {WeeklyRegistry} from './editorial/weekly-contract.ts'
function preview():Plugin{return {
 name:'w2-loopback-preview',enforce:'pre',
 resolveId(id){if(id==='virtual:weekly')return '\0virtual:w2-preview'},
 load(id){
  if(id!=='\0virtual:w2-preview')return
  const path=resolve(repositoryRoot,'prototype/editorial/weekly.json');this.addWatchFile(path)
  const registry:WeeklyRegistry=JSON.parse(readFileSync(path,'utf8')),source=createContentPreview(repositoryRoot,'127.0.0.1')
  const {dates,defaultAt}=weeklyPreviewClocks(registry.topics)
  const views=Object.fromEntries(dates.map(at=>[at,selectWeeklyPreview(registry,source,repositoryRoot,'127.0.0.1',at)]))
  // Only this serve-only module may read a client clock choice. Public graph rejects it.
  return `const views=${JSON.stringify(views)};const at=new URLSearchParams(location.search).get('w2-at');export default Object.hasOwn(views,at??'')?views[at]:views[${JSON.stringify(defaultAt)}];`
 },
 transformIndexHtml(){return [{tag:'div',attrs:{id:'w2-preview-controls'},injectTo:'body-prepend'},{tag:'script',attrs:{type:'module',src:'/weekly-preview/controls.tsx'},injectTo:'body'}]},
 handleHotUpdate(ctx){if(ctx.file.endsWith('/editorial/weekly.json'))ctx.server.ws.send({type:'full-reload'})},
}}
export default defineConfig(mergeConfig(fullLibraryPreview(4198),{plugins:[preview()]}))
