import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import { selectPublicWeekly } from './weekly.ts'
import { requireThat, loadManifest } from './content-contract.ts'

const root = fileURLToPath(new URL('../../', import.meta.url))
export function weekly(snapshot = Date.now()): Plugin {
  const registry = resolve(root,'prototype/editorial/weekly.json'), catalogue = resolve(root,'prototype/editorial/catalogue.json')
  return {
    name:'weekly-publication-snapshot',
    buildStart() { loadManifest(root,snapshot); this.addWatchFile(registry); this.addWatchFile(catalogue) },
    resolveId(id) { if(id === 'virtual:weekly') return '\0virtual:weekly' },
    load(id) {
      if(id !== '\0virtual:weekly') return
      requireThat(snapshot > 0,'weekly snapshot not initialized')
      const view = selectPublicWeekly(JSON.parse(readFileSync(registry,'utf8')),JSON.parse(readFileSync(catalogue,'utf8')),root,snapshot,loadManifest(root,snapshot))
      // No registry, excluded topic prose or review records are sent to the client.
      const articles = view.articles.map(({publication:_publication,approval:_approval,...article}) => article)
      return 'export default '+JSON.stringify({...view,articles})
    },
    handleHotUpdate(ctx) { if([registry,catalogue].includes(ctx.file)) ctx.server.ws.send({type:'full-reload'}) },
  }
}
