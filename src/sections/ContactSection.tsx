import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { type FormEvent, useEffect, useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PERSONAL } from '@/data/personal'

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

export function ContactSection() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!sent) return
    const id = window.setTimeout(() => setSent(false), 6000)
    return () => window.clearTimeout(id)
  }, [sent])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(false)
    setError(null)

    const key = accessKey?.trim()
    if (!key) {
      setError(
        'Add VITE_WEB3FORMS_ACCESS_KEY to a .env file (get a free key at web3forms.com).',
      )
      return
    }

    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const message = String(fd.get('message') ?? '').trim()

    setSubmitting(true)
    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: key,
          subject: `Portfolio: message from ${name}`,
          name,
          email,
          message,
          from_name: name,
          replyto: email,
        }),
      })
      const data = (await res.json()) as { success?: boolean; message?: string }
      if (data.success) {
        setSent(true)
        form.reset()
      } else {
        setError(data.message ?? 'Could not send. Try again or use email above.')
      }
    } catch {
      setError('Network error. Check your connection or email me directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s build something resilient"
          description="Open to frontend-heavy roles, contract UI work, and collaborations on React + TypeScript products."
        />

        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="glass-strong rounded-2xl border border-border/60 p-8 shadow-xl">
              <h3 className="font-display text-xl font-semibold">Direct lines</h3>
              <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-primary" />
                  <a className="hover:text-foreground" href={`mailto:${PERSONAL.email}`}>
                    {PERSONAL.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-primary" />
                  <a className="hover:text-foreground" href={`tel:${PERSONAL.phone}`}>
                    +91 {PERSONAL.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <span>{PERSONAL.location}</span>
                </li>
              </ul>
              <div className="mt-8 flex gap-3">
                <motion.a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-background/60 hover:border-primary/40"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-background/60 hover:border-primary/40"
                  aria-label="GitHub"
                >
                  <FaGithub className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form
              className="glass-strong rounded-2xl border border-border/60 p-8 shadow-xl"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground" htmlFor="name">
                    Name
                  </label>
                  <Input id="name" name="name" required placeholder="Your name" autoComplete="name" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground" htmlFor="email">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" required placeholder="you@company.com" autoComplete="email" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground" htmlFor="message">
                    Message
                  </label>
                  <Textarea id="message" name="message" required rows={5} placeholder="Tell me about the role or project…" />
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button
                  type="submit"
                  disabled={submitting || sent}
                  className="inline-flex items-center gap-2 sm:w-auto"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? 'Sending…' : 'Send message'}
                </Button>
                {error ? (
                  <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                    {error}
                  </p>
                ) : sent ? (
                  <p className="text-sm text-primary" role="status">
                    Thank you — your message was sent. I will get back to you soon.
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
