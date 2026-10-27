// Presentation only; source slugs and publication policy never live here.
export const articleArt=(article:{illustration?:number})=>article.illustration??0
export const topicArt=(id:string)=>Math.max(0,Math.min(9,Number(id.slice(-3))-1))
