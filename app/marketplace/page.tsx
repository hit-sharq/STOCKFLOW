'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Search, SlidersHorizontal } from 'lucide-react'
import { PageHeader } from '@/components/premium/page-header'
import { AnimatedCard } from '@/components/premium/animated-card'
import { PremiumButton } from '@/components/premium/premium-button'

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
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Marketplace"
        description="Browse and bid on excess inventory from verified sellers"
        icon={<Search className="h-6 w-6" />}
      />

      {/* Search and Filters */}
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
            className="pl-12 h-11"
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

      {/* Filter Panel */}
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
                          ? 'bg-primary text-primary-foreground'
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
                          ? 'bg-accent text-accent-foreground'
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
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-foreground hover:bg-muted'
                      }`}
                    >
                      {range}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <PremiumButton className="w-full" size="lg">
              Apply Filters
            </PremiumButton>
          </AnimatedCard>
        </motion.div>
      )}

      {/* Empty State */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="text-center py-20"
      >
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground">No listings yet</h3>
          <p className="text-muted-foreground">Browse listings as they become available or create your first listing</p>
          <PremiumButton size="lg" onClick={() => toggleWishlist('new')}>
            Create Listing
          </PremiumButton>
        </div>
      </motion.div>
    </div>
  )
}

