// Deliberately no SPA fallback: HashRouter must reload from the repository index.
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { resolve, extname } from 'node:path'
const root=resolve('dist'),prefix='/Kho-ng-gian-Insight/'
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.woff':'font/woff','.woff2':'font/woff2'}
createServer(async(req,res)=>{
  const url=new URL(req.url,'http://localhost')
  if(!url.pathname.startsWith(prefix)){res.writeHead(404).end();return}
  const file=resolve(root,decodeURIComponent(url.pathname.slice(prefix.length))||'index.html')
  if(!file.startsWith(root+'/')){res.writeHead(403).end();return}
  try{const bytes=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'});res.end(bytes)}catch{res.writeHead(404).end()}
}).listen(4180,'127.0.0.1')
