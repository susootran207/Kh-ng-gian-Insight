import { readFileSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import assert from 'node:assert/strict'
import { selectContent } from '../build/editorial.ts'
import type { Article, Catalogue } from '../editorial/schema.ts'

const data:Catalogue=JSON.parse(readFileSync('editorial/catalogue.json','utf8'))
const fixture:Article={...data.articles[0],slug:'fixture-published',title:'Published fixture',status:'published',approval:{by:'TEST FIXTURE ONLY',at:'2026-10-24',revision:'fixture-revision'},publishedAt:'2026-10-24'}
const statuses=['draft','in_review','approved','published'] as const
const mixed:Catalogue={articles:statuses.map((status,i)=>({...fixture,slug:`fixture-${i}`,status})),topics:[{slug:'fixture-topic',title:'Fixture',description:'Fixture',status:'published',approval:fixture.approval,publishedAt:fixture.publishedAt,articleSlugs:['fixture-0','fixture-3']}]}
assert.equal(selectContent(mixed,true).articles.length,4)
assert.deepEqual(selectContent(mixed,false).articles.map(a=>a.status),['published'])
assert.deepEqual(selectContent(mixed,false).topics[0].articleSlugs,['fixture-3'])
assert.throws(()=>selectContent({articles:[{...fixture,approval:undefined}],topics:[]},false),/requires explicit approval/)
assert.equal(selectContent(data,false).articles.length,data.articles.filter(a=>a.status==='published').length)
const blocked=[...data.articles.filter(a=>a.status!=='published').flatMap(a=>[a.slug,a.title,a.description,...a.keywords.filter(k=>k.length>10),...a.sections.flatMap(s=>[s.heading,...s.paragraphs,...(s.note?[s.note]:[])])]),...data.topics.filter(t=>t.status!=='published').flatMap(t=>[t.slug,t.title,t.description])]
// Scan old Phase 1 excerpts too, including any accidentally copied to public/.
const legacy=readFileSync('src/reading/homepageContent.ts','utf8')
for(const match of legacy.matchAll(/'([^'\n]{30,})'/g))blocked.push(match[1])
function files(dir:string):string[]{return readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?files(join(dir,entry.name)):[join(dir,entry.name)])}
export function assertClean(text:string,file:string){for(const value of blocked){if(text.includes(value)||text.includes(JSON.stringify(value).slice(1,-1)))throw new Error(`Unpublished content leaked into ${file}: ${value.slice(0,60)}`)}}
// Verify that the scanner itself detects leaked data, not just an empty catalogue.
assert.throws(()=>assertClean(data.articles[0].title,'canary.js'),/Unpublished content leaked/)
for(const file of files(resolve('dist'))){assertClean(readFileSync(file,'utf8'),file);assert(!file.endsWith('.map'),'Public source maps are not allowed')}
console.log('Publication boundary: all statuses, approval rejection, topic references, leak canary and full dist scan passed.')
