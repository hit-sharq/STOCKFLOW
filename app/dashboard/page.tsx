'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Package, TrendingUp, Users, BarChart3, ArrowDownRight, Activity, DollarSign, ShoppingCart } from 'lucide-react'
import { PageHeader } from '@/components/premium/page-header'
import { AnimatedCard } from '@/components/premium/animated-card'
import { PremiumButton } from '@/components/premium/premium-button'
import { HolographicStatCard } from '@/components/premium/holographic-stat-card'

interface DashboardStats {
  activeListings: number
  totalSales: number
  revenue: number
  averageRating: number
  monthlyGrowth: number
  transactionVolume: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    activeListings: 0,
    totalSales: 0,
    revenue: 0,
    averageRating: 0,
    monthlyGrowth: 0,
    transactionVolume: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStats({
          activeListings: 12,
          totalSales: 48,
          revenue: 125000,
          averageRating: 4.8,
          monthlyGrowth: 24.5,
          transactionVolume: 2500000,
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Real-time insights into your inventory performance and market activity"
        icon={<BarChart3 className="h-6 w-6" />}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <HolographicStatCard
          title="Active Listings"
          value={stats.activeListings}
          change={2}
          trend="up"
          icon={<Package className="h-6 w-6" />}
          variant="default"
          delay={0}
        />
        <HolographicStatCard
          title="Total Sales"
          value={stats.totalSales}
          change={8}
          trend="up"
          icon={<ShoppingCart className="h-6 w-6" />}
          variant="accent"
          delay={0.1}
        />
        <HolographicStatCard
          title="Revenue"
          value={`KES ${stats.revenue.toLocaleString()}`}
          change={15}
          trend="up"
          icon={<DollarSign className="h-6 w-6" />}
          variant="default"
          delay={0.2}
        />
        <HolographicStatCard
          title="Monthly Growth"
          value={`${stats.monthlyGrowth}%`}
          change={stats.monthlyGrowth}
          trend="up"
          icon={<TrendingUp className="h-6 w-6" />}
          variant="success"
          delay={0.3}
        />
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <AnimatedCard className="p-6 h-full min-h-[300px]">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Performance Overview</h2>
              </div>
              <div className="space-y-4">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ width: 0 }}
                    animate={{ width: `${60 + Math.sin(i * 0.5) * 30}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    className="h-8 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full"
                  />
                ))}
              </div>
            </AnimatedCard>
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatedCard className="p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="h-5 w-5 text-accent" />
                <h2 className="text-xl font-bold text-foreground">Quick Stats</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Transaction Volume</span>
                  <span className="font-bold text-primary">KES 2.5M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Avg. Deal Size</span>
                  <span className="font-bold text-accent">KES 52K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Success Rate</span>
                  <span className="font-bold text-emerald-400">94%</span>
                </div>
              </div>
            </AnimatedCard>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <AnimatedCard className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground mb-1">Recent Activity</h2>
            <p className="text-sm text-muted-foreground">Latest transactions and updates</p>
          </div>
          <div className="space-y-3">
            {[
              { type: 'New Listing', description: 'Electronics Lot #2024', time: '2 hours ago', icon: Package, color: 'primary' },
              { type: 'Order Placed', description: 'Buyer from Nairobi ordered 50 units', time: '5 hours ago', icon: ShoppingCart, color: 'accent' },
              { type: 'Payment Received', description: 'KES 25,000 from order #1234', time: '1 day ago', icon: DollarSign, color: 'primary' },
            ].map((activity, idx) => {
              const Icon = activity.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg bg-${activity.color}/10`}>
                      <Icon className={`h-5 w-5 text-${activity.color}`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{activity.type}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </motion.div>
              )
            })}
          </div>
        </AnimatedCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <AnimatedCard className="p-8 bg-gradient-to-br from-primary/10 to-primary/5">
          <h3 className="text-lg font-bold text-foreground mb-2">Create Listing</h3>
          <p className="text-sm text-muted-foreground mb-6">Add excess inventory to marketplace in minutes</p>
          <PremiumButton variant="primary" size="md" fullWidth onClick={() => {}}>
            New Listing
          </PremiumButton>
        </AnimatedCard>

        <AnimatedCard className="p-8 bg-gradient-to-br from-accent/10 to-accent/5">
          <h3 className="text-lg font-bold text-foreground mb-2">Browse Deals</h3>
          <p className="text-sm text-muted-foreground mb-6">Discover inventory from verified sellers</p>
          <PremiumButton variant="outline" size="md" fullWidth onClick={() => {}}>
            Browse Now
          </PremiumButton>
        </AnimatedCard>

        <AnimatedCard className="p-8 bg-gradient-to-br from-secondary/10 to-secondary/5">
          <h3 className="text-lg font-bold text-foreground mb-2">Analytics</h3>
          <p className="text-sm text-muted-foreground mb-6">Track performance and market insights</p>
          <PremiumButton variant="outline" size="md" fullWidth onClick={() => {}}>
            View Reports
          </PremiumButton>
        </AnimatedCard>
      </motion.div>
    </div>
  )
}
