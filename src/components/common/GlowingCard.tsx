import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

type GlowingCardProps = {
  children: ReactNode
  className?: string
}

export function GlowingCard({ children, className }: GlowingCardProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const el = rootRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      mx.set(e.clientX - r.left)
      my.set(e.clientY - r.top)
    }
    window.addEventListener('pointermove', handler)
    return () => window.removeEventListener('pointermove', handler)
  }, [mx, my])

  const bg = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, hsl(var(--primary) / 0.18), transparent 55%)`

  return (
    <div ref={rootRef} className={cn('group relative rounded-2xl p-[1px]', className)}>
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: bg }}
      />
      <div className="relative rounded-2xl border border-border/70 bg-card/80 shadow-xl backdrop-blur-xl">{children}</div>
    </div>
  )
}
