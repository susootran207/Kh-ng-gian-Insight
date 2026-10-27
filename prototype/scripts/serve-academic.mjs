// Serve only the built artifact. No dev modules, fixtures, or SPA fallback.
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { resolve, extname } from 'node:path'
const root=resolve('dist-academic')
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp','.woff':'font/woff','.woff2':'font/woff2'}
createServer(async(req,res)=>{
  const url=new URL(req.url,'http://localhost')
  let file;try{file=resolve(root,decodeURIComponent(url.pathname).slice(1)||'index.html')}catch{res.writeHead(400).end();return}
  if(!file.startsWith(root+'/')){res.writeHead(403).end();return}
  try{const bytes=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','X-Robots-Tag':'noindex, nofollow'});res.end(bytes)}catch{res.writeHead(404).end()}
}).listen(4181,'127.0.0.1')
