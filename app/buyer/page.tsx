'use client'

import { motion } from 'framer-motion'
import { Package, Clock, Heart, MessageSquare } from 'lucide-react'
import { PageHeader } from '@/components/premium/page-header'
import { StatCard } from '@/components/premium/stat-card'
import { AnimatedCard } from '@/components/premium/animated-card'
import { PremiumButton } from '@/components/premium/premium-button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function BuyerPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PageHeader
              title="My Purchases"
              description="Track orders and manage your watchlist"
              icon={<Package className="h-6 w-6" />}
            />
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <StatCard title="Total Orders" value={0} change={0} trend="stable" icon={<Package className="h-6 w-6" />} />
            <StatCard title="Watchlist" value={0} change={0} trend="stable" icon={<Heart className="h-6 w-6" />} variant="accent" />
            <StatCard title="Active Auctions" value={0} change={0} trend="stable" icon={<Clock className="h-6 w-6" />} />
            <StatCard title="Messages" value={0} change={0} trend="stable" icon={<MessageSquare className="h-6 w-6" />} variant="accent" />
          </motion.div>

          {/* Empty States */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <AnimatedCard className="p-12 text-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">No orders yet</h3>
                <p className="text-muted-foreground">Start browsing the marketplace to place your first order</p>
                <PremiumButton size="lg" onClick={() => {}}>
                  Browse Marketplace
                </PremiumButton>
              </div>
            </AnimatedCard>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
