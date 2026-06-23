'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heart, Package, MessageSquare, Clock } from 'lucide-react'

interface Order {
  id: string
  listing: string
  seller: string
  quantity: number
  totalAmount: number
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED'
  date: string
}

interface WatchlistItem {
  id: string
  title: string
  price: number
  seller: string
  image: string
  addedDate: string
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    listing: 'Electronics Lot - 50 Units',
    seller: 'TechTraders Ltd',
    quantity: 20,
    totalAmount: 6000,
    status: 'SHIPPED',
    date: '2026-05-20',
  },
  {
    id: 'ORD-002',
    listing: 'Textiles & Apparel Bundle',
    seller: 'Fashion Wholesale',
    quantity: 50,
    totalAmount: 4000,
    status: 'CONFIRMED',
    date: '2026-05-18',
  },
  {
    id: 'ORD-003',
    listing: 'Furniture Clearance',
    seller: 'Furniture Direct',
    quantity: 5,
    totalAmount: 1250,
    status: 'DELIVERED',
    date: '2026-05-10',
  },
]

const mockWatchlist: WatchlistItem[] = [
  {
    id: '1',
    title: 'Industrial Equipment Lot',
    price: 25000,
    seller: 'Industrial Solutions',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
    addedDate: '2026-05-19',
  },
  {
    id: '2',
    title: 'Books & Media Collection',
    price: 3500,
    seller: 'Book Clearance',
    image: 'https://images.unsplash.com/photo-150784272343-583f20270319?w=200&h=200&fit=crop',
    addedDate: '2026-05-17',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800'
    case 'CONFIRMED':
      return 'bg-blue-100 text-blue-800'
    case 'SHIPPED':
      return 'bg-purple-100 text-purple-800'
    case 'DELIVERED':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function BuyerPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(mockWatchlist)

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: Package },
    { label: 'Watchlist Items', value: watchlist.length, icon: Heart },
    { label: 'Active Auctions', value: 3, icon: Clock },
    { label: 'Messages', value: 5, icon: MessageSquare },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Purchases</h1>
        <p className="text-muted-foreground">Track your orders and manage your watchlist</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Track your purchases and manage deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{order.listing}</h3>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Order {order.id}</p>
                        <p className="text-sm text-muted-foreground">from {order.seller}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="text-sm text-muted-foreground">
                        {order.quantity} units • {order.date}
                      </div>
                      <div className="text-lg font-bold text-foreground">
                        KES {order.totalAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Watchlist Tab */}
        <TabsContent value="watchlist" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Saved Items</CardTitle>
              <CardDescription>Items you&apos;re interested in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {watchlist.map((item) => (
                  <div key={item.id} className="border border-border rounded-lg overflow-hidden hover:border-primary transition">
                    <div className="relative h-32 bg-muted overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition"
                      />
                      <button className="absolute top-2 right-2 p-2 bg-background/90 rounded-full hover:bg-background transition">
                        <Heart className="h-4 w-4 fill-destructive text-destructive" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-foreground text-sm line-clamp-2 mb-2">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{item.seller}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-primary">KES {item.price.toLocaleString()}</div>
                        <Button size="sm">Bid</Button>
                      </div>
                    </div>
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
