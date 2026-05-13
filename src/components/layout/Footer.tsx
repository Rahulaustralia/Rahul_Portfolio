import { motion } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import { PERSONAL } from '@/data/personal'

const FOOTER_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-display text-xl font-semibold">{PERSONAL.name}</p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">{PERSONAL.role}</p>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Mail className="h-4 w-4" />
              {PERSONAL.email}
            </a>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-end sm:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Navigate</p>
              <ul className="mt-3 space-y-2 text-sm">
                {FOOTER_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-foreground/80 hover:text-primary">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Social</p>
              <div className="mt-3 flex gap-3">
                <motion.a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-background/60 hover:border-primary/40"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-background/60 hover:border-primary/40"
                  aria-label="GitHub"
                >
                  <FaGithub className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {PERSONAL.name}. Crafted for clarity, speed, and scale.</p>
          <a href="#top" className="inline-flex items-center gap-1 hover:text-foreground">
            Back to top
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
