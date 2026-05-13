import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { PERSONAL } from '@/data/personal'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'

export function AboutSection() {
  const years = useAnimatedCounter(3)
  const products = useAnimatedCounter(12)
  const focus = useAnimatedCounter(100)

  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="About"
          title="Frontend engineer focused on scalable product UI"
          description="I partner with product and backend teams to ship interfaces that stay fast as complexity grows—from auth flows to data-heavy dashboards."
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="glass-strong rounded-2xl p-8 shadow-xl">
              <h3 className="font-display text-xl font-semibold">Highlights</h3>
              <ul className="mt-6 space-y-4">
                {PERSONAL.achievements.map((a) => (
                  <li key={a} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { label: PERSONAL.stats[0].label, value: years, suffix: PERSONAL.stats[0].suffix },
              { label: PERSONAL.stats[1].label, value: products, suffix: PERSONAL.stats[1].suffix },
              {
                label: PERSONAL.stats[2].label,
                value: focus,
                suffix: PERSONAL.stats[2].suffix,
                sub: PERSONAL.stats[2].sub,
              },
            ].map((s, i) => (
              <Reveal key={s.label} delay={0.06 * i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl border border-border/60 p-6 shadow-lg"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</p>
                  <p className="mt-3 font-display text-4xl font-semibold text-gradient">
                    {s.value}
                    {s.suffix}
                  </p>
                  {s.sub ? <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p> : null}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
