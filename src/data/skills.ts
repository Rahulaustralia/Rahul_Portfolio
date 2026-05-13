import type { SkillCategory } from '@/types'

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    items: [
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 92 },
      { name: 'JavaScript ES6+', level: 94 },
      { name: 'TypeScript', level: 90 },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      { name: 'React.js', level: 95 },
      { name: 'Redux Toolkit', level: 88 },
      { name: 'Context API', level: 90 },
      { name: 'React Router', level: 88 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Material UI', level: 85 },
    ],
  },
  {
    title: 'Performance',
    items: [
      { name: 'Lazy loading & code splitting', level: 90 },
      { name: 'useMemo / useCallback', level: 92 },
      { name: 'Component optimization', level: 90 },
    ],
  },
  {
    title: 'Workflow',
    items: [
      { name: 'Git & GitHub', level: 92 },
      { name: 'Webpack / Babel', level: 82 },
      { name: 'NPM ecosystem', level: 90 },
      { name: 'Agile delivery', level: 88 },
    ],
  },
]
