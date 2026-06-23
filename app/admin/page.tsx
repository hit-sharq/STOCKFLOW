'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, Users, AlertCircle, Eye, Trash2, CheckCircle, XCircle } from 'lucide-react'

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
      icon: BarChart3,
      trend: '+18% vs last month',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform management and moderation tools</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-foreground">{stat.label}</CardTitle>
                  <Icon className="h-4 w-4 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.trend}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="listings" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="listings">Pending Listings</TabsTrigger>
          <TabsTrigger value="users">Flagged Users</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Listings Tab */}
        <TabsContent value="listings" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Listings Pending Review</CardTitle>
              <CardDescription>Review and moderate marketplace listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {listings.map((listing) => (
                  <div
                    key={listing.id}
                    className="p-4 border border-border rounded-lg hover:bg-muted/50 transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{listing.title}</h3>
                          {listing.status === 'FLAGGED' && (
                            <Badge className="bg-destructive/20 text-destructive">Flagged</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">by {listing.seller}</p>
                        {listing.reason && (
                          <p className="text-xs text-destructive mt-2">Reason: {listing.reason}</p>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{listing.submittedDate}</span>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-border">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                        onClick={() => handleApproveListing(listing.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="gap-1"
                        onClick={() => handleRejectListing(listing.id)}
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 ml-auto">
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}

                {listings.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>All listings approved</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Flagged Users</CardTitle>
              <CardDescription>Manage user reports and suspensions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
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
                    {flaggedUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition">
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
                                : 'bg-yellow-100 text-yellow-800'
                            }
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Button
                            size="sm"
                            variant={user.status === 'SUSPENDED' ? 'outline' : 'destructive'}
                            onClick={() => handleSuspendUser(user.id)}
                          >
                            {user.status === 'SUSPENDED' ? 'Restore' : 'Suspend'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>User-submitted reports and complaints</CardDescription>
            </CardHeader>
            <CardContent>
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
                ].map((report) => (
                  <div key={report.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-foreground">Report from {report.reporter}</p>
                        <p className="text-sm text-muted-foreground">Against: {report.reported}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{report.date}</span>
                    </div>
                    <p className="text-sm text-foreground mb-3">Reason: {report.reason}</p>
                    <Button size="sm" variant="outline">
                      Review Report
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
