import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { PERSONAL } from '@/data/personal'

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(false), 1400)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="relative flex h-20 w-20 items-center justify-center"
          >
            <motion.span
              className="absolute inset-0 rounded-2xl border border-primary/30"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            />
            <motion.span
              className="absolute inset-1 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 blur-xl"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <span className="relative font-display text-2xl font-bold text-gradient">RP</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 text-sm text-muted-foreground"
          >
            Loading {PERSONAL.name.split(' ')[0]}&apos;s portfolio
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
