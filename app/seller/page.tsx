'use client'

import { motion } from 'framer-motion'
import { Plus, TrendingUp, BarChart3 } from 'lucide-react'
import { PageHeader } from '@/components/premium/page-header'
import { StatCard } from '@/components/premium/stat-card'
import { AnimatedCard } from '@/components/premium/animated-card'
import { PremiumButton } from '@/components/premium/premium-button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function SellerPage() {
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <PageHeader
                title="Seller Hub"
                description="Manage listings and track sales performance"
                icon={<BarChart3 className="h-6 w-6" />}
              />
              <PremiumButton
                size="lg"
                onClick={() => {}}
                icon={<Plus className="h-5 w-5" />}
                iconPosition="left"
              >
                Create Listing
              </PremiumButton>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <StatCard title="Total Listings" value={0} change={0} trend="stable" icon={<Plus className="h-6 w-6" />} />
            <StatCard title="Active" value={0} change={0} trend="stable" icon={<TrendingUp className="h-6 w-6" />} variant="accent" />
            <StatCard title="Total Views" value={0} change={0} trend="stable" icon={<BarChart3 className="h-6 w-6" />} />
            <StatCard title="Offers" value={0} change={0} trend="stable" icon={<Plus className="h-6 w-6" />} variant="accent" />
          </motion.div>

          {/* Empty State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <AnimatedCard className="p-12 text-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">No listings yet</h3>
                <p className="text-muted-foreground">Create your first listing to start selling inventory</p>
                <PremiumButton size="lg" icon={<Plus className="h-5 w-5" />} iconPosition="left">
                  Create Your First Listing
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
