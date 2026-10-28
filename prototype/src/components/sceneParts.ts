export type ScenePart = { asset:string; x:number; y:number; width:number; depth:number; role:'background'|'midground'|'subject'|'foreground'; motion?:string }
const p=(asset:string,x:number,y:number,width:number,depth:number,role:ScenePart['role']='subject',motion='rest'):ScenePart=>({asset,x,y,width,depth,role,motion})
const hills=p('hills',-8,12,116,-65,'background','horizon')
const flowers=p('lavender',-6,65,32,55,'foreground','foliage')
const branch=p('wisteria',61,-9,46,42,'foreground','branch')
export const sceneParts:ScenePart[][]=[
 [hills,p('stepping-stone',31,63,38,-5,'midground'),p('gate-left',-1,15,43,10,'subject','gate-left'),p('gate-right',59,15,43,12,'subject','gate-right'),p('daisies-pot',34,57,24,38,'subject','welcome'),flowers,branch],
 [p('olive-branch',58,0,44,-35,'background','branch'),p('bowl',7,33,86,-5,'midground','bowl'),p('stone-moss',18,40,24,18,'subject','stone-a'),p('stone-honey',54,46,23,27,'subject','stone-b'),p('stone-lilac',34,53,22,34,'subject','stone-c'),p('gold-leaf',58,35,19,46,'foreground','float'),p('petals',4,69,17,58,'foreground','petals')],
 [hills,p('daisies-pot',8,27,35,5,'subject','friend-left'),p('violets-pot',59,31,34,18,'subject','friend-right'),p('ribbon',32,50,39,35,'subject','connect'),p('stepping-stone',35,75,35,-4,'midground'),flowers,branch],
 [hills,p('chair-left',4,29,40,5,'subject','chair-left'),p('chair-right',57,31,39,20,'subject','chair-right'),p('teapot',43,62,18,35,'subject','listen'),p('daisies',-6,66,32,50,'foreground','foliage'),branch],
 [p('moon',66,9,23,-25,'background','moon'),p('cushion',57,52,38,-2,'midground','cushion'),p('saucer',13,65,58,10,'midground','saucer'),p('cup',20,48,46,30,'subject','cup'),p('wisteria',-7,-9,49,50,'foreground','branch'),p('gold-leaf',73,69,20,55,'foreground','float')],
 [p('paper',27,30,59,-20,'background'),p('notebook',9,32,73,6,'midground','notebook'),p('pencil',72,31,13,32,'subject','pencil'),p('sage-leaves',35,40,21,39,'subject','notes'),p('wisteria',-10,-8,49,52,'foreground','branch'),p('petals',66,68,19,58,'foreground','petals')],
 [p('olive-branch',47,9,53,-15,'background','branch'),p('paper',12,46,44,0,'midground'),p('phone',24,40,51,27,'subject','phone'),p('gold-leaf',5,60,27,45,'foreground','attention'),p('sage-leaves',69,57,25,49,'foreground','foliage'),p('petals',12,14,15,55,'foreground','petals')],
 [p('paper',7,29,57,-15,'background'),p('book',11,46,57,7,'midground','book'),p('hourglass',63,20,27,30,'subject','hourglass'),p('pencil',46,31,11,42,'subject','pencil'),p('sage-leaves',9,17,30,50,'foreground','foliage'),p('gold-leaf',67,76,23,52,'foreground','float')],
 [p('paper',5,27,54,-30,'background','paper'),p('repaired-pot',45,51,42,8,'midground','pot'),p('sprout',53,33,25,12,'subject','sprout'),p('new-leaf',61,35,14,16,'subject','new-leaf'),p('sage-leaves',7,63,28,45,'foreground','foliage'),p('petals',22,30,16,50,'foreground','petals')],
 [hills,p('stepping-stone',40,70,30,-8,'midground','path-a'),p('stepping-stone',26,53,17,-12,'midground','path-b'),p('stepping-stone',64,45,13,-18,'midground','path-c'),p('signpost',49,25,23,25,'subject','choice'),p('gold-leaf',24,31,17,42,'subject','float'),flowers,p('daisies',78,62,30,54,'foreground','foliage'),branch],
]
const assets=import.meta.glob('../assets/scene-parts/*.webp',{eager:true,query:'?inline',import:'default'}) as Record<string,string>
export const sceneAsset=async(name:string)=>assets[`../assets/scene-parts/${name}.webp`]
