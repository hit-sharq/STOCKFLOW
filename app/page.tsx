'use client'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Shield, BarChart3, Zap } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { PremiumButton } from '@/components/premium/premium-button'
import { GradientText } from '@/components/premium/gradient-text'
import { AnimatedCard } from '@/components/premium/animated-card'
import { Hero3D } from '@/components/home/hero-3d'

export default function Page() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard')
    }
  }, [isSignedIn, router])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">

        {/* Hero Section with 3D Animation */}
        <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24 sm:py-40 min-h-[80vh] flex items-center">
          <Hero3D />
          
          <div className="relative mx-auto max-w-5xl w-full">
            <div className="text-center space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">Premium B2B Marketplace</span>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
                  <GradientText variant="mix">Trade Excess Inventory</GradientText>
                  <br />
                  <span className="text-foreground">with Intelligence</span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              >
                Real-time auctions, verified sellers, and intelligent pricing for businesses managing excess inventory.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
              >
                <PremiumButton
                  size="lg"
                  onClick={() => router.push('/sign-up')}
                  icon={<ArrowRight className="h-5 w-5" />}
                  iconPosition="right"
                >
                  Start Buying Now
                </PremiumButton>
                <PremiumButton
                  size="lg"
                  variant="outline"
                  onClick={() => router.push('/sign-up?role=seller')}
                  icon={<BarChart3 className="h-5 w-5" />}
                  iconPosition="left"
                >
                  Become a Seller
                </PremiumButton>
              </motion.div>
            </div>
          </div>
        </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 lg:px-8 py-24 border-t border-border/50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              <GradientText variant="primary">Enterprise-Grade Features</GradientText>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage, auction, and track inventory at scale.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatedCard glowEffect className="p-8 h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mb-6"
                >
                  <Zap className="h-6 w-6 text-primary" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Real-Time Auctions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Competitive bidding with live updates, countdown timers, and intelligent price recommendations powered by AI.
                </p>
              </AnimatedCard>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <AnimatedCard glowEffect className="p-8 h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center mb-6"
                >
                  <Shield className="h-6 w-6 text-accent" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Verified Sellers</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All sellers undergo strict verification. Trade with confidence backed by our buyer protection guarantee.
                </p>
              </AnimatedCard>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AnimatedCard glowEffect className="p-8 h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mb-6"
                >
                  <BarChart3 className="h-6 w-6 text-primary" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Smart Analytics</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Comprehensive dashboards with market trends, ROI tracking, and predictive insights for smarter decisions.
                </p>
              </AnimatedCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              <GradientText variant="primary">Simple Process, Maximum Results</GradientText>
            </h2>
            <p className="text-lg text-muted-foreground">
              From listing to settlement in minutes, not days.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'List Inventory', desc: 'Add your excess stock with HD photos and detailed specs' },
              { num: '2', title: 'Set Terms', desc: 'Choose auction, fixed price, or negotiation mode' },
              { num: '3', title: 'Live Bidding', desc: 'Attract verified buyers in real-time' },
              { num: '4', title: 'Settle Fast', desc: 'Secure payment within 24 hours guaranteed' },
            ].map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative mb-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-lg opacity-30" />
                    <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-lg shadow-lg">
                      {step.num}
                    </div>
                  </motion.div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground text-center">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-7 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <AnimatedCard glowEffect className="p-12 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-50" />
            <div className="relative space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                Ready to Optimize Your Inventory?
              </h2>
              <p className="text-lg text-muted-foreground">
                Join leading businesses maximizing returns on excess inventory. Start trading today.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
              >
                <PremiumButton
                  size="lg"
                  onClick={() => router.push('/sign-up')}
                  fullWidth
                  icon={<ArrowRight className="h-5 w-5" />}
                  iconPosition="right"
                >
                  Launch StockFlow
                </PremiumButton>
              </motion.div>
            </div>
          </AnimatedCard>
        </motion.div>
      </section>

      </main>
      <Footer />
    </div>
  )
}
