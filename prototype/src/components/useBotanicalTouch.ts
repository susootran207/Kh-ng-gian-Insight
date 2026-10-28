import { useEffect, type RefObject } from 'react'
import { useGardenMotion } from './GardenMotion'

// A small, local spring field. Observation never captures input or prevents scrolling.
// Ambient sway lives on the inner node; the hand force acts on an outer joint.
export function useBotanicalTouch(root: RefObject<Element | null>, enabled = true) {
  const { allowed } = useGardenMotion()
  useEffect(() => {
    const region = root.current
    if (!region) return
    const joints = Array.from(region.querySelectorAll<HTMLElement | SVGElement>('[data-botanical]')).map(el => ({ el, angle: 0, velocity: 0, target: 0, x: 0, tx: 0 }))
    let frame = 0, last: { x: number; y: number; time: number } | null = null
    const reset = () => { for (const joint of joints) { joint.target = 0; joint.tx = 0 } }
    const tick = () => {
      let energy = 0
      for (const j of joints) {
        j.velocity = (j.velocity + (j.target - j.angle) * .14) * .73
        j.angle += j.velocity
        j.x += (j.tx - j.x) * .18
        j.target *= .94; j.tx *= .94
        energy += Math.abs(j.velocity) + Math.abs(j.angle) + Math.abs(j.x)
        j.el.style.setProperty('--hand-angle', `${j.angle.toFixed(3)}deg`)
        j.el.style.setProperty('--hand-x', `${j.x.toFixed(3)}px`)
        j.el.dataset.force = Math.abs(j.angle).toFixed(2)
      }
      frame = energy > .025 ? requestAnimationFrame(tick) : 0
    }
    const touch = (event: Pick<PointerEvent, 'clientX' | 'clientY'>) => {
      if (!allowed || document.hidden) return
      const bounds = region.getBoundingClientRect()
      if (bounds.bottom < 0 || bounds.top > innerHeight || event.clientX < bounds.left - 80 || event.clientX > bounds.right + 80 || event.clientY < bounds.top - 80 || event.clientY > bounds.bottom + 80) { reset(); return }
      const now = performance.now(), dx = last && now - last.time < 150 ? event.clientX - last.x : 8
      last = { x: event.clientX, y: event.clientY, time: now }
      for (const j of joints) {
        const b = j.el.getBoundingClientRect(), cx = b.left + b.width * .5, cy = b.top + Math.min(b.height * .48, 105)
        const radius = Math.max(75, Math.min(160, b.width * .7 + 45))
        const distance = Math.hypot(event.clientX - cx, (event.clientY - cy) * .85)
        const influence = Math.max(0, 1 - distance / radius) ** 2
        const force = Math.max(-22, Math.min(22, dx * 1.4 + (event.clientX - cx) * .13))
        j.target = force * influence
        j.tx = Math.max(-18, Math.min(18, dx)) * influence
      }
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const pointer = (event: PointerEvent) => { if(event.pointerType !== 'touch') touch(event) }
    const endPointer = (event: PointerEvent) => { if(event.pointerType !== 'touch') reset() }
    // Native pan can cancel pointer events while passive TouchEvents continue.
    // Observe that stream without preventDefault, capture or scroll substitution.
    const finger = (event: TouchEvent) => { if(event.touches.length === 1) touch(event.touches[0]); else reset() }
    if (allowed && enabled) {
      document.addEventListener('pointermove', pointer, { passive: true })
      document.addEventListener('pointerdown', pointer, { passive: true })
      document.addEventListener('pointerup', endPointer, { passive: true })
      document.addEventListener('pointercancel', endPointer, { passive: true })
      document.addEventListener('touchstart', finger, { passive: true }); document.addEventListener('touchmove', finger, { passive: true }); document.addEventListener('touchend', reset, { passive: true }); document.addEventListener('touchcancel', reset, { passive: true })
    }
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('pointermove', pointer); document.removeEventListener('pointerdown', pointer)
      document.removeEventListener('pointerup', endPointer); document.removeEventListener('pointercancel', endPointer)
      document.removeEventListener('touchstart', finger); document.removeEventListener('touchmove', finger); document.removeEventListener('touchend', reset); document.removeEventListener('touchcancel', reset)
      for (const j of joints) { j.el.style.removeProperty('--hand-angle'); j.el.style.removeProperty('--hand-x'); delete j.el.dataset.force }
    }
  }, [allowed, root, enabled])
}
