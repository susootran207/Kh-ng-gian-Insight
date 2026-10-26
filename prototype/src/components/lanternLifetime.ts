// Animation metadata only. Never pass reflection text into this scheduler.
export function createLanternLifetime(onExpire:(id:number)=>void, schedule:(callback:()=>void,ms:number)=>ReturnType<typeof setTimeout>=setTimeout, cancel:(handle:ReturnType<typeof setTimeout>)=>void=clearTimeout){
  const pending=new Map<number,ReturnType<typeof setTimeout>>()
  return {
    add(id:number){
      if(pending.size>=4){const first=pending.keys().next().value!;cancel(pending.get(first)!);pending.delete(first)}
      pending.set(id,schedule(()=>{pending.delete(id);onExpire(id)},9500))
    },
    clear(){pending.forEach(cancel);pending.clear()},
    get size(){return pending.size},
  }
}
