export const PERSONAL = {
  /** Site origin when deployed (no trailing slash), e.g. https://yoursite.vercel.app — for canonical links if needed */
  publicSiteUrl: import.meta.env.VITE_SITE_URL as string | undefined,
  name: 'Rahul Pandey',
  role: 'Frontend Developer | React Developer | UI Engineer',
  experienceYears: '3+',
  location: 'Bengaluru, Karnataka, India',
  email: 'rahul09pandey08@gmail.com',
  phone: '8770134940',
  linkedin: 'https://linkedin.com/in/rahul-pandey-b325232b7',
  github: 'https://github.com/Rahulaustralia',
  githubUsername: 'Rahulaustralia',
  /** Stable HTTPS URL for hero + social previews (Cloudinary or CDN; not tied to deploy host) */
  profilePhotoUrl:
    'https://res.cloudinary.com/ddi5jridv/image/upload/f_auto,q_auto/Profile_Photo_c3zfct',
  /** Public URL (file lives in `public/`) for the hero Download Resume action */
  resumePath: '/Rahul_Pandey_Resume.pdf',
  resumeDownloadFilename: 'Rahul_Pandey_Resume.pdf',
  summary:
    'Frontend Developer with 3+ years of experience building scalable, high-performance web applications using React.js, TypeScript, Redux, and modern JavaScript. Strong expertise in responsive UI development, performance optimization, reusable component architecture, and scalable frontend systems.',
  heroTyping: ['Scalable React systems', 'TypeScript-first UI', 'Performance & UX', 'Design systems & architecture'],
  achievements: [
    'Led frontend architecture for BhoomiWala marketplace',
    'Improved load times with code splitting and lazy loading',
    'Established reusable component patterns across teams',
  ],
  stats: [
    { label: 'Years experience', value: 3, suffix: '+' },
    { label: 'Products shipped', value: 12, suffix: '+' },
    { label: 'Focus', value: 100, suffix: '%', sub: 'quality' },
  ],
} as const
