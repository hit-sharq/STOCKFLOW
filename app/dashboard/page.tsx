'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, Package, TrendingUp, Users, BarChart3, ArrowDownRight } from 'lucide-react'
import { PageHeader } from '@/components/premium/page-header'
import { StatCard } from '@/components/premium/stat-card'
import { AnimatedCard } from '@/components/premium/animated-card'
import { PremiumButton } from '@/components/premium/premium-button'

interface DashboardStats {
  activeListings: number
  totalSales: number
  revenue: number
  averageRating: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    activeListings: 0,
    totalSales: 0,
    revenue: 0,
    averageRating: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // TODO: Fetch real stats from API
        setStats({
          activeListings: 12,
          totalSales: 48,
          revenue: 125000,
          averageRating: 4.8,
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
      {/* Header */}
      <PageHeader
        title="Dashboard"
        description="Real-time insights into your inventory performance and market activity"
        icon={<BarChart3 className="h-6 w-6" />}
      />

      {/* Premium Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title="Active Listings"
          value={stats.activeListings}
          change={2}
          trend="up"
          icon={<Package className="h-6 w-6" />}
          variant="default"
        />
        <StatCard
          title="Total Sales"
          value={stats.totalSales}
          change={8}
          trend="up"
          icon={<TrendingUp className="h-6 w-6" />}
          variant="accent"
        />
        <StatCard
          title="Revenue"
          value={`KES ${stats.revenue.toLocaleString()}`}
          change={15}
          trend="up"
          icon={<ArrowUpRight className="h-6 w-6" />}
          variant="default"
        />
        <StatCard
          title="Rating"
          value={`${stats.averageRating}/5`}
          change={0.2}
          trend="up"
          icon={<Users className="h-6 w-6" />}
          variant="accent"
        />
      </motion.div>

      {/* Recent Activity */}
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
              { type: 'New Listing', description: 'Electronics Lot #2024', time: '2 hours ago', icon: Package },
              { type: 'Order Placed', description: 'Buyer from Nairobi ordered 50 units', time: '5 hours ago', icon: TrendingUp },
              { type: 'Payment Received', description: 'KES 25,000 from order #1234', time: '1 day ago', icon: ArrowUpRight },
            ].map((activity, idx) => {
              const Icon = activity.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
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

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <AnimatedCard className="p-8 bg-gradient-to-br from-primary/10 to-primary/5">
          <h3 className="text-lg font-bold text-foreground mb-2">Create Listing</h3>
          <p className="text-sm text-muted-foreground mb-6">Add excess inventory to marketplace in minutes</p>
          <PremiumButton variant="primary" size="md" fullWidth>
            New Listing
          </PremiumButton>
        </AnimatedCard>

        <AnimatedCard className="p-8 bg-gradient-to-br from-accent/10 to-accent/5">
          <h3 className="text-lg font-bold text-foreground mb-2">Browse Deals</h3>
          <p className="text-sm text-muted-foreground mb-6">Discover inventory from verified sellers</p>
          <PremiumButton variant="outline" size="md" fullWidth>
            Browse Now
          </PremiumButton>
        </AnimatedCard>

        <AnimatedCard className="p-8 bg-gradient-to-br from-secondary/10 to-secondary/5">
          <h3 className="text-lg font-bold text-foreground mb-2">Analytics</h3>
          <p className="text-sm text-muted-foreground mb-6">Track performance and market insights</p>
          <PremiumButton variant="outline" size="md" fullWidth>
            View Reports
          </PremiumButton>
        </AnimatedCard>
      </motion.div>
    </div>
  )
}
