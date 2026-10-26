import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { editorial } from './build/editorial.ts'
import { weekly } from './build/weekly-plugin.ts'
import { selectWeekly } from './build/weekly.ts'
import { selectContent } from './build/select-content.ts'
import { createFlowFixture, fixtureNow } from './tests/fixtures/flow/create.ts'
import { requireThat } from './build/content-contract.ts'
import { fileURLToPath } from 'node:url'

function fixture() {
  let data:ReturnType<typeof createFlowFixture>|undefined
  return {
    name:'d1-isolated-fixture',enforce:'pre' as const,
    configResolved(config:{command:string;server:{host?:string|boolean;port?:number}}) { requireThat(config.command==='serve'&&config.server.host==='127.0.0.1'&&config.server.port===4194,'D1 fixture is serve-only on 127.0.0.1:4194') },
    resolveId(id:string) { if(['virtual:editorial','virtual:weekly'].includes(id))return '\0virtual:d1-fixture:'+id },
    load(id:string) {
      if(!id.startsWith('\0virtual:d1-fixture:'))return
      data??=createFlowFixture()
      const result=id.endsWith('virtual:weekly')?selectWeekly(data.registry,data.catalogue,data.root,fixtureNow):selectContent(data.catalogue,false,data.root,fixtureNow)
      return 'export default '+JSON.stringify(result)
    },
    configureServer(server:import('vite').ViteDevServer) {
      server.middlewares.use((req,res,next)=>{
        const set=res.setHeader.bind(res);res.setHeader=(name,value)=>set(name,name.toLowerCase()==='cache-control'?'no-store':value);res.setHeader('Cache-Control','no-store')
        if(req.headers.host!=='127.0.0.1:4194'||(req.headers.origin&&req.headers.origin!=='http://127.0.0.1:4194')){res.statusCode=403;res.end();return}
        next()
      })
      server.httpServer?.once('close',()=>{data?.close();data=undefined})
    },
    closeBundle(){data?.close();data=undefined},
  }
}
export default defineConfig({plugins:[fixture(),react(),editorial(),weekly()],base:'./',optimizeDeps:{entries:['tests/flow-harness/index.html']},server:{host:'127.0.0.1',port:4194,strictPort:true,cors:false,fs:{allow:[fileURLToPath(new URL('./',import.meta.url))]}},build:{sourcemap:false}})
