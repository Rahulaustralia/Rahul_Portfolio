import { motion } from 'framer-motion'
import { ArrowUpRight, Calendar } from 'lucide-react'

import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { BLOG_POSTS } from '@/data/blogPosts'
import { cn } from '@/lib/utils'

export function BlogSection() {
  return (
    <section id="blog" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Writing"
          title="Notes on frontend craft"
          description="Short-form articles on architecture, performance, and design systems—dummy entries for layout preview."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {BLOG_POSTS.map((post, i) => (
            <Reveal key={post.id} delay={0.06 * i}>
              <motion.article
                whileHover={{ y: -6 }}
                className="glass-strong flex h-full flex-col rounded-2xl border border-border/60 p-6 shadow-xl"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold leading-snug">{post.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <motion.a
                  href="#contact"
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                    'mt-6 inline-flex w-full items-center justify-center gap-2'
                  )}
                >
                  Read more
                  <ArrowUpRight className="h-4 w-4" />
                </motion.a>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
