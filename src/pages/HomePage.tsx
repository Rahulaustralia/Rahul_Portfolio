import { Helmet } from 'react-helmet-async'
import { lazy, Suspense } from 'react'

import { AboutSection } from '@/sections/AboutSection'
import { HeroSection } from '@/sections/HeroSection'
import { SkillsSection } from '@/sections/SkillsSection'
import { ExperienceSection } from '@/sections/ExperienceSection'
import { PERSONAL } from '@/data/personal'

const ProjectsSection = lazy(async () => {
  const m = await import('@/sections/ProjectsSection')
  return { default: m.ProjectsSection }
})
const GithubSection = lazy(async () => {
  const m = await import('@/sections/GithubSection')
  return { default: m.GithubSection }
})
const TestimonialsSection = lazy(async () => {
  const m = await import('@/sections/TestimonialsSection')
  return { default: m.TestimonialsSection }
})
const BlogSection = lazy(async () => {
  const m = await import('@/sections/BlogSection')
  return { default: m.BlogSection }
})
const ContactSection = lazy(async () => {
  const m = await import('@/sections/ContactSection')
  return { default: m.ContactSection }
})

function SectionFallback() {
  return <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-hidden>
    <div className="h-48 animate-pulse rounded-2xl bg-muted/40" />
  </div>
}

function profilePhotoOgUrl(): string {
  return PERSONAL.profilePhotoUrl
}

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>{`${PERSONAL.name} | Frontend Developer & UI Engineer`}</title>
        <meta
          name="description"
          content={`${PERSONAL.name} — ${PERSONAL.role}. ${PERSONAL.summary}`}
        />
        <meta property="og:title" content={`${PERSONAL.name} | Frontend Developer`} />
        <meta property="og:description" content={PERSONAL.summary} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={profilePhotoOgUrl()} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={profilePhotoOgUrl()} />
        <meta name="twitter:title" content={`${PERSONAL.name} | Frontend Developer`} />
        <meta name="twitter:description" content={PERSONAL.summary} />
      </Helmet>

      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <Suspense fallback={<SectionFallback />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <GithubSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <BlogSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>
    </>
  )
}
