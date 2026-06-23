'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Eye, TrendingUp } from 'lucide-react'

interface SellerListing {
  id: string
  title: string
  quantity: number
  quantityAvailable: number
  price: number
  status: 'ACTIVE' | 'SOLD' | 'INACTIVE'
  views: number
  offers: number
  createdAt: string
}

const mockListings: SellerListing[] = [
  {
    id: '1',
    title: 'Electronics Lot - 50 Units Mixed',
    quantity: 50,
    quantityAvailable: 30,
    price: 15000,
    status: 'ACTIVE',
    views: 234,
    offers: 8,
    createdAt: '2026-05-15',
  },
  {
    id: '2',
    title: 'Furniture Clearance - Office Chairs',
    quantity: 20,
    quantityAvailable: 0,
    price: 5000,
    status: 'SOLD',
    views: 156,
    offers: 12,
    createdAt: '2026-05-10',
  },
  {
    id: '3',
    title: 'Textiles & Apparel Bundle',
    quantity: 100,
    quantityAvailable: 100,
    price: 8000,
    status: 'INACTIVE',
    views: 89,
    offers: 3,
    createdAt: '2026-05-08',
  },
]

export default function SellerPage() {
  const [listings, setListings] = useState<SellerListing[]>(mockListings)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800'
      case 'SOLD':
        return 'bg-gray-100 text-gray-800'
      case 'INACTIVE':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const totalListings = listings.length
  const activeListings = listings.filter((l) => l.status === 'ACTIVE').length
  const totalViews = listings.reduce((sum, l) => sum + l.views, 0)
  const totalOffers = listings.reduce((sum, l) => sum + l.offers, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Seller Hub</h1>
          <p className="text-muted-foreground">Manage your listings and track sales</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Listing
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Listings', value: totalListings, icon: '📦' },
          { label: 'Active', value: activeListings, icon: '✅' },
          { label: 'Total Views', value: totalViews, icon: '👁️' },
          { label: 'Total Offers', value: totalOffers, icon: '💬' },
        ].map((stat) => (
          <Card key={stat.label} className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Listings Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Your Listings</CardTitle>
          <CardDescription>Manage and track your inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="pb-3 font-semibold text-foreground">Title</th>
                  <th className="pb-3 font-semibold text-foreground">Quantity</th>
                  <th className="pb-3 font-semibold text-foreground">Price</th>
                  <th className="pb-3 font-semibold text-foreground">Status</th>
                  <th className="pb-3 font-semibold text-foreground">Views</th>
                  <th className="pb-3 font-semibold text-foreground">Offers</th>
                  <th className="pb-3 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr key={listing.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="py-4 text-foreground font-medium">{listing.title}</td>
                    <td className="py-4 text-muted-foreground">
                      {listing.quantityAvailable}/{listing.quantity}
                    </td>
                    <td className="py-4 text-foreground font-medium">KES {listing.price.toLocaleString()}</td>
                    <td className="py-4">
                      <Badge className={getStatusColor(listing.status)}>{listing.status}</Badge>
                    </td>
                    <td className="py-4 text-muted-foreground flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {listing.views}
                    </td>
                    <td className="py-4 text-muted-foreground">{listing.offers}</td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Performance */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Conversion Rate</span>
                <span className="text-sm font-bold text-accent">16.7%</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: '16.7%' }}></div>
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Avg. Response Time</span>
                <span className="text-sm font-bold text-accent">1.2 hours</span>
              </div>
              <p className="text-xs text-muted-foreground">Responding quickly helps close deals faster</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
