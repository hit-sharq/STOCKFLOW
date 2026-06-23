'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, SlidersHorizontal, Star, Heart } from 'lucide-react'

interface Listing {
  id: string
  title: string
  price: number
  image: string
  condition: string
  quantity: number
  seller: {
    name: string
    rating: number
  }
  category: string
}

const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Electronics Lot - 50 Units Mixed',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a248f1?w=400&h=300&fit=crop',
    condition: 'LIKE_NEW',
    quantity: 50,
    seller: { name: 'TechTraders Ltd', rating: 4.9 },
    category: 'Electronics',
  },
  {
    id: '2',
    title: 'Furniture Clearance - Office Chairs',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    condition: 'USED',
    quantity: 20,
    seller: { name: 'Furniture Direct', rating: 4.7 },
    category: 'Furniture',
  },
  {
    id: '3',
    title: 'Textiles & Apparel Bundle',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=300&fit=crop',
    condition: 'NEW',
    quantity: 100,
    seller: { name: 'Fashion Wholesale', rating: 4.8 },
    category: 'Apparel',
  },
  {
    id: '4',
    title: 'Industrial Equipment Lot',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    condition: 'REFURBISHED',
    quantity: 5,
    seller: { name: 'Industrial Solutions', rating: 4.6 },
    category: 'Equipment',
  },
]

const categories = ['All', 'Electronics', 'Furniture', 'Apparel', 'Equipment', 'Books', 'Tools']
const conditions = ['All', 'New', 'Like New', 'Used', 'Refurbished']
const priceRanges = ['All', 'Under 5K', '5K-15K', '15K-50K', 'Over 50K']

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCondition, setSelectedCondition] = useState('All')
  const [selectedPrice, setSelectedPrice] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'NEW':
        return 'bg-green-100 text-green-800'
      case 'LIKE_NEW':
        return 'bg-blue-100 text-blue-800'
      case 'USED':
        return 'bg-yellow-100 text-yellow-800'
      case 'REFURBISHED':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Marketplace</h1>
        <p className="text-muted-foreground">Browse available inventory from verified sellers</p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search listings..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="border-border">
          <CardContent className="pt-6 space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-2 rounded-full text-sm transition ${
                      selectedCategory === cat
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition Filter */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Condition</h3>
              <div className="flex flex-wrap gap-2">
                {conditions.map((cond) => (
                  <button
                    key={cond}
                    onClick={() => setSelectedCondition(cond)}
                    className={`px-3 py-2 rounded-full text-sm transition ${
                      selectedCondition === cond
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedPrice(range)}
                    className={`px-3 py-2 rounded-full text-sm transition ${
                      selectedPrice === range
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <Button className="w-full">Apply Filters</Button>
          </CardContent>
        </Card>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {mockListings.length} results
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockListings.map((listing) => (
          <Card key={listing.id} className="border-border overflow-hidden hover:border-primary transition group">
            {/* Image */}
            <div className="relative overflow-hidden bg-muted h-48">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => toggleWishlist(listing.id)}
                  className="p-2 rounded-full bg-background/90 hover:bg-background transition"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      wishlist.includes(listing.id)
                        ? 'fill-destructive text-destructive'
                        : 'text-foreground'
                    }`}
                  />
                </button>
              </div>
              <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${getConditionColor(listing.condition)}`}>
                {listing.condition.replace('_', ' ')}
              </div>
            </div>

            <CardContent className="p-4 space-y-3">
              {/* Title */}
              <div>
                <h3 className="font-semibold text-foreground line-clamp-2 hover:text-primary transition">
                  {listing.title}
                </h3>
              </div>

              {/* Price */}
              <div className="text-2xl font-bold text-primary">
                KES {listing.price.toLocaleString()}
              </div>

              {/* Quantity */}
              <div className="text-sm text-muted-foreground">
                {listing.quantity} units available
              </div>

              {/* Seller Info */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="text-sm">
                  <p className="text-foreground font-medium">{listing.seller.name}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    <span className="text-xs text-muted-foreground">{listing.seller.rating}</span>
                  </div>
                </div>
                <Button size="sm" className="text-xs">View</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
