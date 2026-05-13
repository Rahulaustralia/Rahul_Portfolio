import type { ReactNode } from 'react'

import { Footer } from '@/components/layout/Footer'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { Navbar } from '@/components/layout/Navbar'

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <LoadingScreen />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-1/3 top-0 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[120px] dark:bg-primary/20" />
        <div className="absolute -right-1/4 bottom-0 h-[480px] w-[480px] rounded-full bg-accent/15 blur-[120px] dark:bg-accent/20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,hsl(var(--background)))]" />
      </div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
