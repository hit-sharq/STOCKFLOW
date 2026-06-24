'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, Users, AlertCircle, Eye, Trash2, CheckCircle, XCircle, Activity, Shield, TrendingUp } from 'lucide-react'
import { PremiumButton } from '@/components/premium/premium-button'
import { AnimatedCard } from '@/components/premium/animated-card'
import { HolographicStatCard } from '@/components/premium/holographic-stat-card'
import { motion } from 'framer-motion'

interface PendingListing {
  id: string
  title: string
  seller: string
  status: 'PENDING' | 'FLAGGED'
  reason?: string
  submittedDate: string
}

interface FlaggedUser {
  id: string
  name: string
  email: string
  reason: string
  reportCount: number
  status: 'ACTIVE' | 'SUSPENDED'
}

const mockPendingListings: PendingListing[] = [
  {
    id: '1',
    title: 'Electronics Lot - 50 Units',
    seller: 'TechTraders Ltd',
    status: 'PENDING',
    submittedDate: '2026-05-25',
  },
  {
    id: '2',
    title: 'Suspicious Listing',
    seller: 'Unknown Seller',
    status: 'FLAGGED',
    reason: 'Potentially counterfeit items',
    submittedDate: '2026-05-24',
  },
  {
    id: '3',
    title: 'Office Furniture Lot',
    seller: 'Furniture Direct',
    status: 'PENDING',
    submittedDate: '2026-05-23',
  },
]

const mockFlaggedUsers: FlaggedUser[] = [
  {
    id: '1',
    name: 'Suspicious Seller',
    email: 'suspicious@example.com',
    reason: 'Multiple complaint reports',
    reportCount: 5,
    status: 'ACTIVE',
  },
  {
    id: '2',
    name: 'Banned User',
    email: 'banned@example.com',
    reason: 'Fraud activity detected',
    reportCount: 12,
    status: 'SUSPENDED',
  },
]

export default function AdminPage() {
  const [listings, setListings] = useState<PendingListing[]>(mockPendingListings)
  const [flaggedUsers, setFlaggedUsers] = useState<FlaggedUser[]>(mockFlaggedUsers)

  const handleApproveListing = (id: string) => {
    setListings(listings.filter((l) => l.id !== id))
  }

  const handleRejectListing = (id: string) => {
    setListings(listings.filter((l) => l.id !== id))
  }

  const handleSuspendUser = (id: string) => {
    setFlaggedUsers(
      flaggedUsers.map((u) =>
        u.id === id ? { ...u, status: 'SUSPENDED' as const } : u
      )
    )
  }

  const stats = [
    {
      label: 'Total Users',
      value: 2345,
      icon: Users,
      trend: '+125 this month',
    },
    {
      label: 'Active Listings',
      value: 5234,
      icon: BarChart3,
      trend: '+342 this week',
    },
    {
      label: 'Pending Review',
      value: listings.length,
      icon: AlertCircle,
      trend: 'Requires action',
    },
    {
      label: 'Platform Revenue',
      value: 'KES 2.3M',
      icon: TrendingUp,
      trend: '+18% vs last month',
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Admin
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Command Center</span>
            </h1>
            <p className="text-muted-foreground">Platform management and moderation tools</p>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <HolographicStatCard
                  title={stat.label}
                  value={stat.value}
                  trend="up"
                  icon={<stat.icon className="h-6 w-6" />}
                  variant="default"
                  delay={idx * 0.1}
                />
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="listings" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-xl">
              <TabsTrigger value="listings" className="data-[state=active]:bg-primary/20">
                Pending Listings
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-primary/20">
                Flagged Users
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-primary/20">
                Reports
              </TabsTrigger>
            </TabsList>

            {/* Listings Tab */}
            <TabsContent value="listings" className="space-y-4">
              <AnimatedCard glowEffect className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-foreground">Listings Pending Review</h2>
                  <p className="text-sm text-muted-foreground">Review and moderate marketplace listings</p>
                </div>
                <div className="space-y-4">
                  {listings.map((listing) => (
                    <motion.div
                      key={listing.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 4 }}
                      className="p-4 border border-border/50 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{listing.title}</h3>
                            {listing.status === 'FLAGGED' && (
                              <Badge className="bg-destructive/20 text-destructive border-destructive/30">
                                Flagged
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">by {listing.seller}</p>
                          {listing.reason && (
                            <p className="text-xs text-destructive mt-2 border-l-2 border-destructive/30 pl-2">
                              Reason: {listing.reason}
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{listing.submittedDate}</span>
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-border/50">
                        <PremiumButton
                          size="sm"
                          variant="outline"
                          onClick={() => handleApproveListing(listing.id)}
                          className="gap-1"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </PremiumButton>
                        <PremiumButton
                          size="sm"
                          variant="outline"
                          onClick={() => handleRejectListing(listing.id)}
                          className="gap-1 border-destructive text-destructive"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </PremiumButton>
                        <PremiumButton size="sm" variant="outline" onClick={() => {}} className="gap-1 ml-auto">
                          <Eye className="h-4 w-4" />
                          View Details
                        </PremiumButton>
                      </div>
                    </motion.div>
                  ))}

                  {listings.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>All listings approved</p>
                    </div>
                  )}
                </div>
              </AnimatedCard>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-4">
              <AnimatedCard glowEffect className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-foreground">Flagged Users</h2>
                  <p className="text-sm text-muted-foreground">Manage user reports and suspensions</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border/50">
                      <tr className="text-left">
                        <th className="pb-3 font-semibold text-foreground">User</th>
                        <th className="pb-3 font-semibold text-foreground">Email</th>
                        <th className="pb-3 font-semibold text-foreground">Reason</th>
                        <th className="pb-3 font-semibold text-foreground">Reports</th>
                        <th className="pb-3 font-semibold text-foreground">Status</th>
                        <th className="pb-3 font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {flaggedUsers.map((user, idx) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="border-b border-border/50 hover:bg-secondary/30 transition-all"
                        >
                          <td className="py-4 text-foreground font-medium">{user.name}</td>
                          <td className="py-4 text-muted-foreground text-xs">{user.email}</td>
                          <td className="py-4 text-muted-foreground text-xs">{user.reason}</td>
                          <td className="py-4">
                            <Badge variant="outline">{user.reportCount}</Badge>
                          </td>
                          <td className="py-4">
                            <Badge
                              className={
                                user.status === 'SUSPENDED'
                                  ? 'bg-destructive text-destructive-foreground'
                                  : 'bg-yellow-500/20 text-yellow-500'
                              }
                            >
                              {user.status}
                            </Badge>
                          </td>
                          <td className="py-4">
                            <PremiumButton
                              size="sm"
                              variant={user.status === 'SUSPENDED' ? 'outline' : 'outline'}
                              onClick={() => handleSuspendUser(user.id)}
                            >
                              {user.status === 'SUSPENDED' ? 'Restore' : 'Suspend'}
                            </PremiumButton>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AnimatedCard>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-4">
              <AnimatedCard glowEffect className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-foreground">Recent Reports</h2>
                  <p className="text-sm text-muted-foreground">User-submitted reports and complaints</p>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      id: '1',
                      reporter: 'User A',
                      reported: 'Suspicious Seller',
                      reason: 'Counterfeit items',
                      date: '2026-05-25',
                    },
                    {
                      id: '2',
                      reporter: 'User B',
                      reported: 'Listing #234',
                      reason: 'Misleading description',
                      date: '2026-05-24',
                    },
                  ].map((report, idx) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="p-4 border border-border/50 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-foreground">Report from {report.reporter}</p>
                          <p className="text-sm text-muted-foreground">Against: {report.reported}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{report.date}</span>
                      </div>
                      <p className="text-sm text-foreground mb-3">Reason: {report.reason}</p>
                      <PremiumButton size="sm" variant="outline">
                        Review Report
                      </PremiumButton>
                    </motion.div>
                  ))}
                </div>
              </AnimatedCard>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}