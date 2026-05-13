import { motion } from 'framer-motion'

import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SKILL_CATEGORIES } from '@/data/skills'

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Skills"
          title="Tooling that ships reliable interfaces"
          description="From semantic HTML to Redux-powered flows—balanced across craft, performance, and maintainability."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {SKILL_CATEGORIES.map((cat, ci) => (
            <Reveal key={cat.title} delay={0.05 * ci}>
              <div className="glass-strong h-full rounded-2xl border border-border/60 p-6 shadow-xl">
                <h3 className="font-display text-lg font-semibold">{cat.title}</h3>
                <ul className="mt-6 space-y-5">
                  {cat.items.map((item, ii) => (
                    <li key={item.name}>
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-xs text-muted-foreground">{item.level}%</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          viewport={{ once: true, margin: '-10%' }}
                          transition={{ duration: 0.9, delay: 0.04 * ii, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
