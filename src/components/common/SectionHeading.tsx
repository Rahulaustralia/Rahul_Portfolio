import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  action?: ReactNode
}

export function SectionHeading({ eyebrow, title, description, align = 'center', action }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mx-auto mb-12 flex max-w-3xl flex-col gap-3',
        align === 'center' && 'items-center text-center',
        align === 'left' && 'items-start text-left'
      )}
    >
      {eyebrow ? (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-primary"
        >
          {eyebrow}
        </motion.span>
      ) : null}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground sm:text-lg"
        >
          {description}
        </motion.p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  )
}
