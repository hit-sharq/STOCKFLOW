'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Search, SlidersHorizontal, Heart, Package, Clock, ArrowRight, MapPin } from 'lucide-react'
import { PageHeader } from '@/components/premium/page-header'
import { AnimatedCard } from '@/components/premium/animated-card'
import { PremiumButton } from '@/components/premium/premium-button'
import { CursorGlow, TiltCard } from '@/components/premium/cursor-effects'

const categories = ['All', 'Electronics', 'Furniture', 'Apparel', 'Equipment', 'Books', 'Tools']
const conditions = ['All', 'New', 'Like New', 'Used', 'Refurbished']
const priceRanges = ['All', 'Under 5K', '5K-15K', '15K-50K', 'Over 50K']

const mockListings = [
  {
    id: '1',
    title: 'High-End Electronics Lot',
    description: 'Latest smartphones, tablets, and laptops from 2024 inventory',
    price: 'KES 45,000',
    originalPrice: 'KES 78,000',
    discount: '42% Off',
    location: 'Nairobi, Kenya',
    timeLeft: '2d 14h',
    category: 'Electronics',
    condition: 'New',
  },
  {
    id: '2',
    title: 'Office Furniture Collection',
    description: 'Premium ergonomic chairs and desks, bulk quantity available',
    price: 'KES 28,500',
    originalPrice: 'KES 42,000',
    discount: '32% Off',
    location: 'Lagos, Nigeria',
    timeLeft: '1d 8h',
    category: 'Furniture',
    condition: 'Like New',
  },
  {
    id: '3',
    title: 'Industrial Equipment Surplus',
    description: 'Heavy machinery and tools, perfect working condition',
    price: 'KES 125,000',
    originalPrice: 'KES 185,000',
    discount: '32% Off',
    location: 'Johannesburg, SA',
    timeLeft: '4d 2h',
    category: 'Equipment',
    condition: 'Refurbished',
  },
]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCondition, setSelectedCondition] = useState('All')
  const [selectedPrice, setSelectedPrice] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <PageHeader
              title="Marketplace"
              description="Browse and bid on excess inventory from verified sellers"
              icon={<Search className="h-6 w-6" />}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search inventory..."
                  className="pl-12 h-11 bg-card/50 backdrop-blur-xl border-border/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <PremiumButton
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                icon={<SlidersHorizontal className="h-5 w-5" />}
                iconPosition="left"
              >
                Filters
              </PremiumButton>
            </motion.div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatedCard className="p-6 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Category</h3>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <motion.button
                            key={cat}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                              selectedCategory === cat
                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                                : 'bg-secondary text-foreground hover:bg-muted'
                            }`}
                          >
                            {cat}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Condition</h3>
                      <div className="flex flex-wrap gap-2">
                        {conditions.map((cond) => (
                          <motion.button
                            key={cond}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCondition(cond)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                              selectedCondition === cond
                                ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/30'
                                : 'bg-secondary text-foreground hover:bg-muted'
                            }`}
                          >
                            {cond}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
                      <div className="flex flex-wrap gap-2">
                        {priceRanges.map((range) => (
                          <motion.button
                            key={range}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedPrice(range)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                              selectedPrice === range
                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                                : 'bg-secondary text-foreground hover:bg-muted'
                            }`}
                          >
                            {range}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <PremiumButton className="w-full" size="lg" onClick={() => {}}>
                    Apply Filters
                  </PremiumButton>
                </AnimatedCard>
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockListings.map((listing, idx) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <TiltCard maxTilt={10}>
                    <AnimatedCard glowEffect className="flex flex-col h-full overflow-hidden group">
                      <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Package className="h-12 w-12 text-primary/60" />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleWishlist(listing.id)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-card/50 backdrop-blur-sm"
                        >
                          <Heart
                            className={`h-5 w-5 transition ${
                              wishlist.includes(listing.id) ? 'fill-red-500 text-red-500' : 'text-foreground/60'
                            }`}
                          />
                        </motion.button>
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 rounded-full text-xs font-bold bg-accent text-accent-foreground">
                            {listing.discount}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1 p-5 space-y-3">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">{listing.category}</span>
                          <span className="px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground">{listing.condition}</span>
                        </div>
                        
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                          {listing.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {listing.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{listing.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{listing.timeLeft}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-5 pt-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs text-muted-foreground line-through">{listing.originalPrice}</span>
                            <p className="text-xl font-bold text-accent">{listing.price}</p>
                          </div>
                          <PremiumButton
                            variant="outline"
                            size="sm"
                            onClick={() => {}}
                          >
                            Bid Now
                          </PremiumButton>
                        </div>
                      </div>
                    </AnimatedCard>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}