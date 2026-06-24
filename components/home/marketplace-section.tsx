'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Package, TrendingUp, Shield, Zap } from 'lucide-react'
import { PremiumButton } from '@/components/premium/premium-button'

const marketplaceStats = [
  { label: 'Active Listings', value: '2,543', icon: Package, color: 'text-primary' },
  { label: 'Verified Sellers', value: '847', icon: Shield, color: 'text-accent' },
  { label: 'Total Volume', value: 'KES 24M', icon: TrendingUp, color: 'text-emerald-400' },
  { label: 'Avg. Savings', value: '68%', icon: Zap, color: 'text-amber-400' },
]

export function MarketplaceSection() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10" />
      
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Premium Marketplace
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access verified inventory with competitive pricing and real-time auctions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {marketplaceStats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex p-4 rounded-2xl bg-card/50 backdrop-blur-xl border border-border/50 mb-3 ${stat.color}`}>
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative rounded-3xl bg-card/30 backdrop-blur-xl border border-border/50 p-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Verified Business Network
              </h3>
              <p className="text-muted-foreground">
                Connect with trusted suppliers and buyers across 50+ countries. All sellers verified for authenticity.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Electronics', 'Furniture', 'Apparel', 'Equipment'].map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <PremiumButton
                variant="primary"
                size="lg"
                onClick={() => {}}
                icon={<ArrowRight className="h-5 w-5" />}
                iconPosition="right"
              >
                Explore Marketplace
              </PremiumButton>
            </div>
            
            <div className="relative">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-xl border border-border/50 overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-2 gap-4 p-6">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 p-4"
                    >
                      <Package className="h-8 w-8 text-primary mb-2" />
                      <div className="h-2 w-3/4 bg-primary/20 rounded-full mb-2" />
                      <div className="h-2 w-1/2 bg-muted rounded-full" />
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/30 rounded-full blur-3xl" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}