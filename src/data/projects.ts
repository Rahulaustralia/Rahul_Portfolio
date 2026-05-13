import type { Project } from '@/types'

export const PROJECTS: Project[] = [
  {
    id: 'bhoomiwala',
    title: 'BhoomiWala',
    description:
      'A property marketplace platform for buying and selling agricultural land and farmhouses.',
    features: [
      'Admin Dashboard',
      'Leads Management',
      'Visit Scheduling',
      'Property Listing',
      'Authentication',
      'Responsive Design',
    ],
    tech: ['React.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'REST APIs'],
    filters: ['React', 'TypeScript', 'Full Stack', 'UI/UX'],
    githubUrl: 'https://github.com/Rahulaustralia',
    liveUrl: 'https://linkedin.com/in/rahul-pandey-b325232b7',
    accent: 'from-emerald-500/30 via-cyan-500/20 to-sky-500/30',
  },
  {
    id: 'tandem',
    title: 'Tandem',
    description: 'Healthcare diabetes pump management platform.',
    features: ['Accessible UI', 'Modular components', 'Healthcare workflow screens'],
    tech: ['React.js', 'TypeScript', 'Material UI'],
    filters: ['React', 'TypeScript', 'UI/UX'],
    githubUrl: 'https://github.com/Rahulaustralia',
    liveUrl: 'https://github.com/Rahulaustralia',
    accent: 'from-violet-500/30 via-fuchsia-500/20 to-pink-500/30',
  },
  {
    id: 'shopnew',
    title: 'ShopNew',
    description: 'Modern ecommerce application.',
    features: ['Product listing', 'Filtering', 'Sorting', 'Cart functionality'],
    tech: ['React.js', 'Context API', 'JavaScript', 'REST APIs'],
    filters: ['React', 'UI/UX'],
    githubUrl: 'https://github.com/Rahulaustralia',
    liveUrl: 'https://github.com/Rahulaustralia',
    accent: 'from-amber-500/30 via-orange-500/20 to-rose-500/30',
  },
]
