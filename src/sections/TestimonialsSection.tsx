import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { TESTIMONIALS } from '@/data/testimonials'

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by leads and designers"
          description="Representative feedback from cross-functional partners on delivery, craft, and collaboration."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.id} delay={0.06 * i}>
              <motion.figure
                whileHover={{ y: -6 }}
                className="glass-strong flex h-full flex-col rounded-2xl border border-border/60 p-6 shadow-xl"
              >
                <Quote className="h-8 w-8 text-primary/70" aria-hidden />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-border/60 pt-4">
                  <p className="font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </p>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
