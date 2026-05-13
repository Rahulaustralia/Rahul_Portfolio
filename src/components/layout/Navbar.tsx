import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import { buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { PERSONAL } from '@/data/personal'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#github', label: 'GitHub' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b border-transparent transition-all duration-300',
        scrolled && 'border-border/60 bg-background/70 backdrop-blur-xl'
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-2">
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary to-accent text-sm font-bold text-primary-foreground shadow-lg">
            RP
            <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-40 bg-[radial-gradient(circle_at_30%_20%,white,transparent)]" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-sm font-semibold tracking-tight">{PERSONAL.name}</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Frontend</span>
          </div>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 sm:flex">
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
            >
              <FaGithub className="h-5 w-5" />
            </a>
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'icon' }),
              'border border-border/60 bg-muted/40'
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -40, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 40, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'lg:hidden')}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent className="border-border/60">
              <div className="mt-8 flex flex-col gap-1">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted/70"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </div>
              <div className="mt-auto flex gap-3 border-t border-border/60 pt-6">
                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border/70 bg-muted/40 hover:bg-muted"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
                <a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border/70 bg-muted/40 hover:bg-muted"
                  aria-label="GitHub"
                >
                  <FaGithub className="h-5 w-5" />
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
