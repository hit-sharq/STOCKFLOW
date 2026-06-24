'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { PremiumButton } from '@/components/premium/premium-button'
import { blogPosts } from '@/lib/blog-data'
import { AnimatedCard } from '@/components/premium/animated-card'
import { PageHeader } from '@/components/premium/page-header'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <PageHeader
            title="Market Insights"
            description="Industry trends, success stories, and expert analysis"
            icon={<Tag className="h-6 w-6" />}
          />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {blogPosts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <AnimatedCard className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs">
                      <Tag className="h-3 w-3 text-primary" />
                      <span className="text-primary font-medium">{post.category}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground">{post.title}</h3>
                    
                    <p className="text-muted-foreground">{post.excerpt}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <PremiumButton variant="outline" size="sm" onClick={() => {}}>
                      Read Full Article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </PremiumButton>
                  </AnimatedCard>
                </motion.div>
              ))}
            </div>
            
            <div className="space-y-6">
              <AnimatedCard className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Categories</h3>
                <div className="space-y-2">
                  {['Business', 'Technology', 'Success Stories', 'Market Trends', 'Guide'].map((cat) => (
                    <motion.button
                      key={cat}
                      whileHover={{ x: 4 }}
                      className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-primary rounded-lg hover:bg-secondary/50 transition-all"
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}