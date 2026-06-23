'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, Package, TrendingUp, Users } from 'lucide-react'

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

  const statCards = [
    {
      icon: Package,
      label: 'Active Listings',
      value: stats.activeListings,
      trend: '+2 this week',
    },
    {
      icon: TrendingUp,
      label: 'Total Sales',
      value: stats.totalSales,
      trend: '+8 this month',
    },
    {
      icon: ArrowUpRight,
      label: 'Revenue',
      value: `KES ${stats.revenue.toLocaleString()}`,
      trend: '+15% vs last month',
    },
    {
      icon: Users,
      label: 'Rating',
      value: `${stats.averageRating}/5.0`,
      trend: 'Based on 24 reviews',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening with your account.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Card key={card.label} className="border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-foreground">{card.label}</CardTitle>
                <card.icon className="h-4 w-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest listings and orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: 'New Listing', description: 'Electronics Lot #2024', time: '2 hours ago' },
              { type: 'Order Placed', description: 'Buyer from Nairobi ordered 50 units', time: '5 hours ago' },
              { type: 'Payment Received', description: 'KES 25,000 from order #1234', time: '1 day ago' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted transition">
                <div>
                  <p className="font-medium text-foreground">{activity.type}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="text-lg">Create New Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Add your excess inventory to the marketplace</p>
            <Button className="w-full">Create Listing</Button>
          </CardContent>
        </Card>

        <Card className="border-border bg-gradient-to-br from-accent/5 to-accent/10">
          <CardHeader>
            <CardTitle className="text-lg">Browse Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Explore available deals from verified sellers</p>
            <Button variant="outline" className="w-full">Browse Now</Button>
          </CardContent>
        </Card>

        <Card className="border-border bg-gradient-to-br from-secondary/5 to-secondary/10">
          <CardHeader>
            <CardTitle className="text-lg">View Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Detailed insights about your listings</p>
            <Button variant="outline" className="w-full">View Reports</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
