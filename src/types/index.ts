export type ProjectFilter = 'All' | 'React' | 'TypeScript' | 'Full Stack' | 'UI/UX'

export type Project = {
  id: string
  title: string
  description: string
  features: string[]
  tech: string[]
  filters: Exclude<ProjectFilter, 'All'>[]
  githubUrl: string
  liveUrl: string
  accent: string
}

export type ExperienceItem = {
  id: string
  company: string
  role: string
  period: string
  bullets: string[]
}

export type SkillCategory = {
  title: string
  items: { name: string; level: number }[]
}

export type BlogPost = {
  id: string
  title: string
  excerpt: string
  tags: string[]
  date: string
}

export type Testimonial = {
  id: string
  quote: string
  name: string
  role: string
  company: string
}

export type GitHubRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  updated_at: string
}

export type ContributionDay = {
  date: string
  count: number
  level: number
}
