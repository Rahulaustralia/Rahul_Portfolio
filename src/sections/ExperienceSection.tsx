import { motion } from 'framer-motion'

import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { EXPERIENCE } from '@/data/experience'

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Where I’ve shipped impact"
          description="Progression from feature delivery to owning architecture for customer-facing surfaces."
        />

        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-primary/60 via-border to-transparent sm:left-4"
            aria-hidden
          />
          <ol className="space-y-10">
            {EXPERIENCE.map((job, i) => (
              <Reveal key={job.id} delay={0.06 * i}>
                <li className="relative pl-10 sm:pl-12">
                  <span className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-primary/40 bg-background shadow-[0_0_0_6px_hsl(var(--background))] sm:left-0.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary to-accent" />
                  </span>
                  <motion.article
                    whileHover={{ y: -3 }}
                    className="glass-strong rounded-2xl border border-border/60 p-6 shadow-lg"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-display text-lg font-semibold">{job.company}</h3>
                        <p className="text-sm text-primary">{job.role}</p>
                      </div>
                      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground sm:text-right">
                        {job.period}
                      </p>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {job.bullets.map((b) => (
                        <li key={b} className="relative pl-4">
                          <span className="absolute left-0 top-2 h-1 w-1 rounded-full bg-primary/70" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
