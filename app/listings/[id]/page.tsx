'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Heart, Share2, MessageSquare, Clock, Users, TrendingUp } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface Listing {
  id: string
  title: string
  description: string
  price: number
  image: string
  quantity: number
  quantityAvailable: number
  condition: string
  seller: {
    id: string
    name: string
    rating: number
    verified: boolean
  }
  isAuction: boolean
  auctionEndTime?: string
  bids?: number
}

interface Bid {
  id: string
  amount: number
  bidder: string
  timestamp: string
}

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const [listing, setListing] = useState<Listing | null>(null)
  const [bids, setBids] = useState<Bid[]>([])
  const [bidAmount, setBidAmount] = useState('')
  const [timeRemaining, setTimeRemaining] = useState('')
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState(false)

  useEffect(() => {
    // Mock listing data - in production, fetch from API
    setListing({
      id: params.id,
      title: 'Electronics Lot - 50 Units Mixed',
      description: 'Mix of quality electronics including computers, monitors, keyboards, and mice. All items tested and working.',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a248f1?w=800&h=600&fit=crop',
      quantity: 50,
      quantityAvailable: 30,
      condition: 'LIKE_NEW',
      seller: {
        id: 'seller-1',
        name: 'TechTraders Ltd',
        rating: 4.9,
        verified: true,
      },
      isAuction: true,
      auctionEndTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      bids: 12,
    })

    setBids([
      { id: '1', amount: 16000, bidder: 'Buyer A', timestamp: '5 mins ago' },
      { id: '2', amount: 15500, bidder: 'Buyer B', timestamp: '12 mins ago' },
      { id: '3', amount: 15000, bidder: 'Buyer C', timestamp: '25 mins ago' },
    ])

    setLoading(false)
  }, [params.id])

  useEffect(() => {
    if (!listing?.auctionEndTime) return

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const end = new Date(listing.auctionEndTime!).getTime()
      const distance = end - now

      if (distance <= 0) {
        setTimeRemaining('Auction ended')
        clearInterval(interval)
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [listing?.auctionEndTime])

  const handleBid = () => {
    if (bidAmount && listing) {
      const newBid: Bid = {
        id: Date.now().toString(),
        amount: parseFloat(bidAmount),
        bidder: 'You',
        timestamp: 'now',
      }
      setBids([newBid, ...bids])
      setBidAmount('')
    }
  }

  if (loading || !listing) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">Loading...</main>
        <Footer />
      </div>
    )
  }

  const highestBid = bids.length > 0 ? bids[0].amount : listing.price

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Back Link */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => window.history.back()}>
              ← Back
            </Button>
          </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <Card className="border-border overflow-hidden">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-96 object-cover"
            />
          </Card>

          {/* Description */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>About this listing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Condition</p>
                  <p className="font-semibold text-foreground">{listing.condition.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available Quantity</p>
                  <p className="font-semibold text-foreground">{listing.quantityAvailable} of {listing.quantity}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-foreground">{listing.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Seller Info */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Seller Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">🏢</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{listing.seller.name}</h3>
                      {listing.seller.verified && (
                        <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm text-muted-foreground">Rating: {listing.seller.rating}/5.0</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bid History */}
          {listing.isAuction && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Bid History
                </CardTitle>
                <CardDescription>{bids.length} bids placed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bids.map((bid) => (
                    <div key={bid.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">{bid.bidder}</p>
                        <p className="text-xs text-muted-foreground">{bid.timestamp}</p>
                      </div>
                      <p className="text-lg font-bold text-primary">KES {bid.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Auction Card */}
          {listing.isAuction && (
            <Card className="border-primary bg-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl">KES {highestBid.toLocaleString()}</CardTitle>
                <CardDescription>Current highest bid</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Time Remaining */}
                <div className="p-3 bg-background rounded-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Time remaining</p>
                    <p className="font-bold text-foreground">{timeRemaining}</p>
                  </div>
                </div>

                {/* Bid Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Enter your bid</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder={`Minimum: ${Math.round(highestBid * 1.05)}`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Minimum bid: KES {Math.round(highestBid * 1.05).toLocaleString()}</p>
                </div>

                <Button className="w-full text-lg py-6" onClick={handleBid}>
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Place Bid
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By bidding, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full gap-2 justify-center"
              onClick={() => setWishlist(!wishlist)}
            >
              <Heart className={`h-4 w-4 ${wishlist ? 'fill-destructive text-destructive' : ''}`} />
              {wishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Button>
            <Button variant="outline" className="w-full gap-2 justify-center">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

{/* Stats */}
              <Card className="border-border">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Views</span>
                    <span className="font-semibold text-foreground">234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">In Watchlist</span>
                    <span className="font-semibold text-foreground">45</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
