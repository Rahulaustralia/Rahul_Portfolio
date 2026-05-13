import type { ContributionDay } from '@/types'

export function buildContributionColumns(days: ContributionDay[]) {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date))
  const recent = sorted.slice(-371)
  if (!recent.length) return [] as (ContributionDay | null)[][]

  const first = new Date(`${recent[0].date}T12:00:00`)
  const pad = first.getDay()
  const padded: (ContributionDay | null)[] = [...Array(pad).fill(null), ...recent]

  const cols: (ContributionDay | null)[][] = []
  for (let i = 0; i < padded.length; i += 7) {
    const chunk = padded.slice(i, i + 7)
    const filled: (ContributionDay | null)[] = [...chunk]
    while (filled.length < 7) filled.push(null)
    cols.push(filled)
  }
  return cols
}
