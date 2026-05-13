import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Layers } from 'lucide-react'
import { useMemo, useState } from 'react'
import { FaGithub } from 'react-icons/fa'

import { GlowingCard } from '@/components/common/GlowingCard'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { PROJECTS } from '@/data/projects'
import type { Project, ProjectFilter } from '@/types'
import { cn } from '@/lib/utils'

const FILTERS: ProjectFilter[] = ['All', 'React', 'TypeScript', 'Full Stack', 'UI/UX']

const tap = {
  whileTap: { scale: 0.98 },
  whileHover: { scale: 1.02 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 22 },
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectFilter>('All')
  const [active, setActive] = useState<Project | null>(null)

  const filtered = useMemo(() => {
    if (filter === 'All') return PROJECTS
    return PROJECTS.filter((p) => p.filters.includes(filter))
  }, [filter])

  return (
    <section id="projects" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work with measurable product depth"
          description="Marketplaces, regulated healthcare, and commerce—each with a focus on resilient UI architecture."
        />

        <Reveal className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <motion.button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              whileTap={{ scale: 0.97 }}
              className={cn(
                'rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors',
                filter === f
                  ? 'border-primary/50 bg-primary/15 text-foreground'
                  : 'border-border/60 bg-muted/30 text-muted-foreground hover:border-primary/30 hover:text-foreground'
              )}
            >
              {f}
            </motion.button>
          ))}
        </Reveal>

        <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, delay: 0.04 * i }}
              >
                <GlowingCard className="h-full">
                  <button
                    type="button"
                    onClick={() => setActive(project)}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-2xl text-left"
                  >
                    <div
                      className={cn(
                        'relative h-36 bg-gradient-to-br p-6 transition-transform duration-500 group-hover:scale-[1.02]',
                        project.accent
                      )}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,white/25,transparent_45%)] opacity-60 dark:opacity-30" />
                      <div className="relative flex h-full flex-col justify-between">
                        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-black/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-md dark:bg-white/10">
                          <Layers className="h-3.5 w-3.5" />
                          Case study
                        </span>
                        <div>
                          <h3 className="font-display text-2xl font-semibold text-white drop-shadow-sm">
                            {project.title}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-sm text-white/85">{project.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((t) => (
                          <Badge key={t} variant="muted" className="font-normal">
                            {t}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-auto flex gap-2">
                        <span
                          className={cn(
                            buttonVariants({ variant: 'secondary', size: 'sm' }),
                            'pointer-events-none inline-flex flex-1 items-center justify-center gap-2'
                          )}
                        >
                          Details
                        </span>
                      </div>
                    </div>
                  </button>
                </GlowingCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-border/80 bg-card/95 sm:max-w-lg">
          {active ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{active.title}</DialogTitle>
                <DialogDescription>{active.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Highlights</p>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    {active.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Stack</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {active.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <motion.a
                    href={active.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    {...tap}
                    className={cn(buttonVariants(), 'inline-flex items-center gap-2')}
                  >
                    Live demo
                    <ExternalLink className="h-4 w-4" />
                  </motion.a>
                  <motion.a
                    href={active.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    {...tap}
                    className={cn(buttonVariants({ variant: 'secondary' }), 'inline-flex items-center gap-2')}
                  >
                    <FaGithub className="h-4 w-4" />
                    GitHub
                  </motion.a>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}
