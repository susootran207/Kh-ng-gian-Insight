import { useEffect, useRef, useState, type ReactNode } from 'react'

// Pause loops when their region is offscreen or the document is hidden.
export function MotionRegion({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    if (ref.current) observer.observe(ref.current)
    const onVisibility = () => setHidden(document.hidden)
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility) }
  }, [])
  return <div ref={ref} className={className} data-paused={!visible || hidden}>{children}</div>
}
