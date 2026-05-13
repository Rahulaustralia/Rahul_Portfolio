import type { BlogPost } from '@/types'

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Structuring large React codebases for velocity',
    excerpt:
      'How feature folders, colocation, and clear boundaries between UI and data layers keep teams moving fast without sacrificing quality.',
    tags: ['React', 'Architecture', 'TypeScript'],
    date: '2026-04-12',
  },
  {
    id: 'b2',
    title: 'Practical performance wins beyond the Lighthouse score',
    excerpt:
      'From selective memoization to route-level code splitting—patterns that translate into snappier experiences for real users.',
    tags: ['Performance', 'React'],
    date: '2026-03-02',
  },
  {
    id: 'b3',
    title: 'Design tokens in component-driven workflows',
    excerpt:
      'Bridging design and engineering with tokenized spacing, color, and motion so UI stays consistent at scale.',
    tags: ['UI/UX', 'Design Systems'],
    date: '2026-01-18',
  },
]
