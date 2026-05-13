import { PERSONAL } from '@/data/personal'
import { FALLBACK_REPOS } from '@/data/githubFallback'
import type { ContributionDay, GitHubRepo } from '@/types'

const USER = PERSONAL.githubUsername

function mockContributions(): ContributionDay[] {
  const out: ContributionDay[] = []
  const today = new Date()
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const count = Math.floor(Math.random() * 5)
    out.push({
      date: d.toISOString().slice(0, 10),
      count,
      level: Math.min(4, count),
    })
  }
  return out
}

export async function fetchContributions(): Promise<ContributionDay[]> {
  const url = `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error('bad status')
    const data: unknown = await res.json()
    if (Array.isArray(data)) {
      return data as ContributionDay[]
    }
    if (data && typeof data === 'object' && 'contributions' in data) {
      const c = (data as { contributions: ContributionDay[] }).contributions
      if (Array.isArray(c) && c.length) return c
    }
    throw new Error('shape')
  } catch {
    return mockContributions()
  }
}

export async function fetchLatestRepos(): Promise<GitHubRepo[]> {
  const path = `/github-api/users/${USER}/repos?per_page=6&sort=updated`
  try {
    const res = await fetch(path)
    if (!res.ok) throw new Error('bad')
    const data = (await res.json()) as GitHubRepo[]
    if (Array.isArray(data) && data.length) return data
    throw new Error('empty')
  } catch {
    return FALLBACK_REPOS
  }
}
