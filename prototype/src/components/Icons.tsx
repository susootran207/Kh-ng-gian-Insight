export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h16m-6-6 6 6-6 6'} /></svg>
}
export function LeafMark() {
  return <svg aria-hidden="true" viewBox="0 0 40 48" fill="none"><path d="M20 45V8M20 23C4 25 3 5 20 7m0 28c17 1 22-21 1-21" stroke="currentColor" strokeWidth="1.3"/><path d="m10 12 9 9m11 1-10 11" stroke="currentColor"/><ellipse cx="22" cy="43" rx="6" ry="3" fill="currentColor"/></svg>
}
export function SmallFlower() {
  return <svg aria-hidden="true" viewBox="0 0 60 60" fill="none"><path d="M30 45v12m0-9c-16 0-18-14-7-12M30 43c15 0 17-13 7-11" stroke="currentColor" strokeWidth="1.2"/>{[0,72,144,216,288].map(a=><ellipse key={a} cx="30" cy="18" rx="7" ry="12" fill="currentColor" transform={`rotate(${a} 30 28)`}/>)}<circle cx="30" cy="28" r="4" fill="#e8c77c"/></svg>
}
