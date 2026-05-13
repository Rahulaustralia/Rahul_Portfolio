import { animate } from 'framer-motion'
import { useEffect, useState } from 'react'

export function useAnimatedCounter(target: number) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const controls = animate(0, target, {
      duration: 1.25,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [target])

  return value
}
