import { motion } from 'framer-motion'
import { GitBranch, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { PERSONAL } from '@/data/personal'
import { fetchContributions, fetchLatestRepos } from '@/services/githubService'
import type { ContributionDay, GitHubRepo } from '@/types'
import { buildContributionColumns } from '@/utils/contributionGrid'
import { cn } from '@/lib/utils'

function heatClass(cell: ContributionDay | null) {
  if (!cell || cell.count === 0)
    return 'bg-muted/40 dark:bg-white/[0.06] ring-1 ring-inset ring-border/50'
  const lv = Math.min(4, cell.level ?? Math.ceil(cell.count / 3))
  if (lv <= 1) return 'bg-primary/30 ring-1 ring-inset ring-primary/25'
  if (lv === 2) return 'bg-primary/50 ring-1 ring-inset ring-primary/30'
  if (lv === 3) return 'bg-primary/70 ring-1 ring-inset ring-primary/35'
  return 'bg-primary ring-1 ring-inset ring-primary/40'
}

export function GithubSection() {
  const [days, setDays] = useState<ContributionDay[]>([])
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      const [c, r] = await Promise.all([fetchContributions(), fetchLatestRepos()])
      if (!cancelled) {
        setDays(c)
        setRepos(r)
        setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const cols = buildContributionColumns(days)

  return (
    <section id="github" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="GitHub"
          title="Open activity & shipping rhythm"
          description="Contribution cadence and recently touched repositories—sourced from GitHub with graceful fallbacks when offline."
        />

        <Reveal>
          <div className="glass-strong rounded-2xl border border-border/60 p-6 shadow-xl sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Contributions</p>
                <p className="mt-1 font-display text-2xl font-semibold">{PERSONAL.githubUsername}</p>
              </div>
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                View profile →
              </a>
            </div>

            <div className="mt-6 overflow-x-auto pb-2">
              <div
                className="flex gap-[3px] pr-4"
                role="img"
                aria-label="GitHub contribution heatmap"
              >
                {loading
                  ? Array.from({ length: 40 }).map((_, i) => (
                      <div key={i} className="flex flex-col gap-[3px]">
                        {Array.from({ length: 7 }).map((__, j) => (
                          <div
                            key={j}
                            className="h-3 w-3 animate-pulse rounded-sm bg-muted/60 sm:h-3.5 sm:w-3.5"
                          />
                        ))}
                      </div>
                    ))
                  : cols.map((col, ci) => (
                      <div key={ci} className="flex flex-col gap-[3px]">
                        {col.map((cell, ri) => (
                          <motion.div
                            key={`${ci}-${ri}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.0008 * (ci + ri) }}
                            title={cell ? `${cell.date}: ${cell.count} contributions` : ''}
                            className={cn(
                              'h-3 w-3 rounded-sm sm:h-3.5 sm:w-3.5',
                              heatClass(cell)
                            )}
                          />
                        ))}
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <Reveal key={repo.id} delay={0.05 * i}>
              <motion.a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4 }}
                className="glass block rounded-2xl border border-border/60 p-5 shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-semibold">{repo.name}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {repo.description || 'Repository on GitHub'}
                    </p>
                  </div>
                  <GitBranch className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  {repo.language ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      {repo.language}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" />
                    {repo.stargazers_count}
                  </span>
                  <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
