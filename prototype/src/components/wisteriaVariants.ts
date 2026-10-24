export type WisteriaVariant = 'A' | 'B' | 'C'
export type BotanicalSpray = {
  cell:number; x:number; size:number; y:number; lean:number
}
export type WisteriaComposition = {
  description:string
  main:BotanicalSpray[]
  front:BotanicalSpray[]
  foliage:number[]
}

// Review alternatives remain independent and are all included in the build.
// x is the attachment region as a percentage of viewport; size is bounded in px.
export const wisteriaVariants:Record<WisteriaVariant,WisteriaComposition> = {
  A:{
    description:'Mật độ vừa, hai góc dày, giữa thưa nhẹ',
    main:[
      {cell:0,x:0,size:116,y:0,lean:-7}, {cell:1,x:10,size:88,y:-10,lean:4},
      {cell:2,x:34,size:78,y:2,lean:-4}, {cell:3,x:57,size:92,y:14,lean:5},
      {cell:4,x:82,size:100,y:6,lean:-3}, {cell:5,x:98,size:118,y:0,lean:7},
    ],
    front:[{cell:0,x:1,size:72,y:25,lean:-4},{cell:2,x:99,size:76,y:16,lean:6}],
    foliage:[3,8,20,29,44,61,72,91,97],
  },
  B:{
    description:'Mật độ vừa-dày, cành và hoa phân bố tự nhiên toàn cạnh trên',
    main:[
      {cell:0,x:.5,size:136,y:0,lean:-6}, {cell:2,x:16,size:112,y:-5,lean:4},
      {cell:3,x:35,size:108,y:6,lean:-4}, {cell:1,x:53,size:136,y:12,lean:7},
      {cell:4,x:76,size:128,y:12,lean:-3}, {cell:5,x:98,size:138,y:-4,lean:5},
    ],
    front:[{cell:0,x:2,size:90,y:29,lean:-5},{cell:1,x:45,size:76,y:7,lean:4},{cell:2,x:98,size:94,y:19,lean:6}],
    foliage:[1,6,12,23,29,39,45,57,65,70,83,91,97],
  },
  C:{
    description:'Hai góc sum suê, chùm rủ dài ngắn đa dạng, giữa vẫn thoáng',
    main:[
      {cell:0,x:0,size:142,y:1,lean:-8}, {cell:1,x:9,size:118,y:5,lean:3},
      {cell:2,x:31,size:84,y:-6,lean:-5}, {cell:3,x:56,size:94,y:3,lean:6},
      {cell:4,x:88,size:126,y:-3,lean:-4}, {cell:5,x:99,size:146,y:0,lean:6},
    ],
    front:[{cell:0,x:1,size:110,y:30,lean:-4},{cell:1,x:12,size:70,y:16,lean:5},{cell:2,x:98,size:108,y:32,lean:7}],
    foliage:[1,4,8,14,20,30,43,62,76,85,91,95,99],
  },
}

export function readWisteriaVariant():WisteriaVariant {
  const value=new URLSearchParams(window.location.search).get('wisteria')
  return value==='A'||value==='C'?value:'B'
}
