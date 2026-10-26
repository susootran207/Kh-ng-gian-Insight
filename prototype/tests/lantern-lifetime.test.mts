import {test} from 'node:test'
import assert from 'node:assert/strict'
import {createLanternLifetime} from '../src/components/lanternLifetime.ts'
function setup(){let next=0;const tasks=new Map<number,()=>void>(),expired:number[]=[],delays:number[]=[];const timer=createLanternLifetime(id=>expired.push(id),(fn,ms)=>{delays.push(ms);tasks.set(++next,fn);return next as unknown as ReturnType<typeof setTimeout>},handle=>{tasks.delete(handle as unknown as number)});return {timer,tasks,expired,delays}}
test('G1: 1,000 rapid releases retain at most four timer handles and expire independently of CSS',()=>{
 const x=setup();for(let id=1;id<=1000;id++){x.timer.add(id);assert(x.timer.size<=4);assert(x.tasks.size<=4)}
 assert.deepEqual([...x.tasks.keys()],[997,998,999,1000]);assert(x.delays.every(ms=>ms===9500))
 for(const [id,callback] of x.tasks){x.tasks.delete(id);callback()}
 assert.equal(x.timer.size,0);assert.deepEqual(x.expired,[997,998,999,1000])
})
test('G1: page exit/unmount clear all pending work, idempotent, and reusable after StrictMode cleanup',()=>{
 const x=setup();x.timer.add(1);x.timer.add(2);x.timer.clear();x.timer.clear();assert.equal(x.tasks.size,0);assert.equal(x.timer.size,0);assert.deepEqual(x.expired,[])
 x.timer.add(3);assert.equal(x.timer.size,1);[...x.tasks.values()][0]();assert.equal(x.timer.size,0);assert.deepEqual(x.expired,[3])
})
