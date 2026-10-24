// Official Phase 1 trellis: variant B approved by the user on 24 October 2026.
export type BotanicalSpray = {
  cell:number; x:number; size:number; y:number; lean:number
}
export type WisteriaComposition = {
  description:string
  main:BotanicalSpray[]
  front:BotanicalSpray[]
  foliage:number[]
}

// Keep these visual parameters identical to the approved B review image.
export const approvedWisteria:WisteriaComposition = {
    description:'Mật độ vừa-dày, cành và hoa phân bố tự nhiên toàn cạnh trên',
    main:[
      {cell:0,x:.5,size:136,y:0,lean:-6}, {cell:2,x:16,size:112,y:-5,lean:4},
      {cell:3,x:35,size:108,y:6,lean:-4}, {cell:1,x:53,size:136,y:12,lean:7},
      {cell:4,x:76,size:128,y:12,lean:-3}, {cell:5,x:98,size:138,y:-4,lean:5},
    ],
    front:[{cell:0,x:2,size:90,y:29,lean:-5},{cell:1,x:45,size:76,y:7,lean:4},{cell:2,x:98,size:94,y:19,lean:6}],
    foliage:[1,6,12,23,29,39,45,57,65,70,83,91,97],
  }
