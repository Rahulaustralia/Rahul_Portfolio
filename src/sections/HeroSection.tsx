import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { ArrowRight, Download, MapPin, Sparkles } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'

import { buttonVariants } from '@/components/ui/button'
import { PERSONAL } from '@/data/personal'
import { cn } from '@/lib/utils'

const TYPING_SPEED_MS = 42

const tapHover = {
  whileTap: { scale: 0.98 },
  whileHover: { scale: 1.02 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 22 },
}

function TypingPhrase({ phrase, onComplete }: { phrase: string; onComplete: () => void }) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setDisplay(phrase.slice(0, i))
      if (i >= phrase.length) {
        window.clearInterval(id)
        window.setTimeout(onComplete, 1600)
      }
    }, TYPING_SPEED_MS)
    return () => window.clearInterval(id)
  }, [phrase, onComplete])

  return <>{display}</>
}

function TypingCycle() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const phrase = PERSONAL.heroTyping[phraseIndex]
  const onComplete = useCallback(() => {
    setPhraseIndex((i) => (i + 1) % PERSONAL.heroTyping.length)
  }, [])

  return <TypingPhrase key={phrase} phrase={phrase} onComplete={onComplete} />
}

export function HeroSection() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, hsl(var(--primary) / 0.16), transparent 55%)`

  return (
    <section id="top" className="relative pt-28 pb-20 sm:pt-32 sm:pb-28">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: spotlight }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          mx.set(e.clientX - r.left)
          my.set(e.clientY - r.top)
        }}
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {PERSONAL.experienceYears} years · React · TypeScript
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.55 }}
            className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="block text-foreground">{PERSONAL.name}</span>
            <span className="mt-2 block max-w-xl text-balance text-lg font-normal text-muted-foreground sm:text-xl">
              {PERSONAL.role}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.55 }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {PERSONAL.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 flex min-h-[2rem] items-center text-sm font-medium text-primary sm:text-base"
          >
            <span className="mr-1 text-muted-foreground">Currently focused on</span>
            <span className="text-gradient">
              <TypingCycle />
            </span>
            <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-primary" aria-hidden />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="mt-8 flex w-full max-w-xl flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap min-[400px]:items-center"
          >
            <motion.a
              href="#projects"
              {...tapHover}
              className={cn(
                buttonVariants(),
                'glow-ring inline-flex w-full min-w-0 items-center justify-center gap-2 min-[400px]:w-auto'
              )}
            >
              View work
              <ArrowRight className="h-4 w-4 shrink-0" />
            </motion.a>
            <motion.a
              href="#contact"
              {...tapHover}
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'inline-flex w-full min-w-0 items-center justify-center gap-2 min-[400px]:w-auto'
              )}
            >
              Let&apos;s talk
            </motion.a>
            <motion.a
              href={PERSONAL.resumePath}
              download={PERSONAL.resumeDownloadFilename}
              {...tapHover}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'inline-flex w-full min-w-0 items-center justify-center gap-2 whitespace-normal text-center min-[400px]:w-auto min-[400px]:whitespace-nowrap'
              )}
              aria-label={`Download Resume (${PERSONAL.resumeDownloadFilename})`}
            >
              <Download className="h-4 w-4 shrink-0" aria-hidden />
              Download Resume
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {PERSONAL.location}
            </span>
            <span className="hidden h-4 w-px bg-border sm:inline" aria-hidden />
            <span className="flex gap-3">
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-background/60 transition-colors hover:border-primary/50 hover:text-primary'
                )}
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-background/60 transition-colors hover:border-primary/50 hover:text-primary"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${PERSONAL.email}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-background/60 transition-colors hover:border-primary/50 hover:text-primary"
                aria-label="Email"
              >
                <SiGmail className="h-5 w-5" />
              </a>
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-primary/30 via-transparent to-accent/30 opacity-70 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-card/90 to-card/40 p-1 shadow-2xl backdrop-blur-2xl dark:border-white/10">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem] bg-muted">
              <img
                src={PERSONAL.profilePhotoUrl}
                alt={`${PERSONAL.name} — profile photo`}
                className="h-full w-full object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-background/60 p-4 text-sm shadow-lg backdrop-blur-md dark:border-white/10">
                <p className="font-medium text-foreground">Shipped for regulated & marketplace domains</p>
                <p className="mt-1 text-xs text-muted-foreground">React · TS · Redux · Performance</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
