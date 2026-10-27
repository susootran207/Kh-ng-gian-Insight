// Controlled full-site preview. Never a production build configuration.
import { defineConfig, mergeConfig } from 'vite'
import normal from './vite.config.ts'
import { repositoryRoot } from './build/editorial.ts'
import { createContentPreview } from './build/content-preview.ts'
import { contentPreviewPlugin } from './build/content-preview-server.ts'
import { requireThat } from './build/content-contract.ts'
import type { Article } from './editorial/schema.ts'
export function fullLibraryPreview(port = 4197) { return mergeConfig(normal, {
  plugins:[{
    name:'p2-preview-only',enforce:'pre',
    configResolved(config:import('vite').ResolvedConfig){requireThat(config.command==='serve'&&config.server.host==='127.0.0.1'&&config.server.port===port,'P2 preview is serve-only on 127.0.0.1:'+port)},
    resolveId(id:string){if(id==='virtual:editorial')return '\0virtual:p2-fixture'},
    load(id:string){
      if(id!=='\0virtual:p2-fixture')return
      const view=createContentPreview(repositoryRoot,'127.0.0.1')
      const articles:Article[]=view.articles.map(a=>({...a.card,id:a.id,collection:a.metadata.collection,updated:'',sections:[],sources:[],document:{...a.document,localLinks:a.document.localLinks?.map(l=>({...l,target:'#publication-information'}))},
        relatedSlugs:a.metadata.relatedArticleIds.flatMap(id=>view.articles.filter(a=>a.id===id).map(a=>a.slug))}))
      return 'export default '+JSON.stringify({articles,topics:[]})
    },
    transformIndexHtml(){return [{tag:'aside',attrs:{class:'preview-notice',role:'note'},children:'P2 · Xem nội bộ trên 127.0.0.1 · 29 bản nháp đã được chủ dự án chấp thuận nội dung; chưa được cấp quyền xuất bản F0.',injectTo:'body-prepend'}]},
  },contentPreviewPlugin(port)],
  server:{host:'127.0.0.1',port,strictPort:true,cors:false,fs:{allow:[repositoryRoot+'/prototype']}},
}) }
export default defineConfig(fullLibraryPreview())
