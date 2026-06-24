'use client'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, TrendingUp, Shield, BarChart3, Zap, Package, Globe, Cpu, Sparkles as SparklesIcon } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { PremiumButton } from '@/components/premium/premium-button'
import { GradientText } from '@/components/premium/gradient-text'
import { AnimatedCard } from '@/components/premium/animated-card'
import { HeroAnimatedSaaS } from '@/components/home/hero-animated-saas'
import { AuroraBackground, ParticleField } from '@/components/premium/animated-mesh-background'
import { CursorGlow, TiltCard } from '@/components/premium/cursor-effects'
import { HolographicStatCard } from '@/components/premium/holographic-stat-card'
import { NewsSection } from '@/components/home/news-section'
import { MarketplaceSection } from '@/components/home/marketplace-section'

export default function Page() {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const [currentScene, setCurrentScene] = useState(0)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <AuroraBackground />
      <ParticleField />
      <Header />
      
      <main className="relative">
        {/* HERO SECTION */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <HeroAnimatedSaaS />
          
          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <CursorGlow glowColor="rgba(59, 130, 246, 0.4)">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/50 px-4 py-2 backdrop-blur-sm"
                >
                  <SparklesIcon className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">Premium B2B Marketplace</span>
                </motion.div>

                <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
                  <GradientText variant="primary">Turn Excess Inventory</GradientText>
                  <br />
                  <span className="text-foreground">Into Cash Flow</span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                >
                  Real-time auctions, verified sellers, and intelligent pricing for businesses managing excess inventory.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
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
              </motion.div>
            </CursorGlow>
          </div>
        </section>

        {/* SCROLL ANIMATED SECTION 1: Warehouse Problem */}
        <ScrollSection
          title="The Inventory Problem"
          subtitle="Capital Locked in Warehouse"
          description="Businesses lose millions in tied-up capital sitting in warehouses. Traditional liquidation channels are slow, inefficient, and leave money on the table."
          icon={<Package className="h-16 w-16 text-primary" />}
          gradientFrom="from-primary/20"
          gradientTo="to-accent/20"
        />

        {/* SCROLL ANIMATED SECTION 2: The Solution */}
        <ScrollSection
          title="StockFlow Solution"
          subtitle="Intelligent Marketplace"
          description="Our platform transforms static inventory into active listings with AI-powered pricing, real-time bidding, and verified global buyers."
          icon={<SparklesIcon className="h-16 w-16 text-accent" />}
          gradientFrom="from-accent/20"
          gradientTo="to-primary/20"
        />

        {/* SCROLL ANIMATED SECTION 3: Global Network */}
        <ScrollSection
          title="Global Network"
          subtitle="Worldwide Connections"
          description="Connect with verified buyers across 50+ countries. Our network handles thousands of transactions daily with real-time settlements."
          icon={<Globe className="h-16 w-16 text-primary" />}
          gradientFrom="from-emerald-500/20"
          gradientTo="to-cyan-500/20"
        />

        {/* SCROLL ANIMATED SECTION 4: Business Growth */}
        <ScrollSection
          title="Business Growth"
          subtitle="Revenue Unlocked"
          description="Transform your inventory strategy. Increase cash flow, reduce storage costs, and grow your business with our intelligent platform."
          icon={<TrendingUp className="h-16 w-16 text-accent" />}
          gradientFrom="from-amber-500/20"
          gradientTo="to-emerald-500/20"
        />

        {/* Marketplace Section */}
        <MarketplaceSection />

        {/* News Section */}
        <NewsSection />

        {/* Features Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          
          <div className="relative mx-auto max-w-7xl">
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
              {[
                { icon: Zap, title: 'Real-Time Auctions', desc: 'Competitive bidding with live updates, countdown timers, and intelligent price recommendations powered by AI.', color: 'primary' },
                { icon: Shield, title: 'Verified Sellers', desc: 'All sellers undergo strict verification. Trade with confidence backed by our buyer protection guarantee.', color: 'accent' },
                { icon: BarChart3, title: 'Smart Analytics', desc: 'Comprehensive dashboards with market trends, ROI tracking, and predictive insights for smarter decisions.', color: 'primary' },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <TiltCard maxTilt={8}>
                    <AnimatedCard glowEffect className="p-8 h-full">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-12 h-12 bg-gradient-to-br from-${item.color}/20 to-${item.color}/10 rounded-lg flex items-center justify-center mb-6`}
                      >
                        <item.icon className={`h-6 w-6 text-${item.color}`} />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </AnimatedCard>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto max-w-3xl"
          >
            <AnimatedCard glowEffect className="p-12 sm:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-50" />
              <div className="relative space-y-6">
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                  Ready to Optimize Your Inventory?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join leading businesses maximizing returns on excess inventory. Start trading today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <PremiumButton
                    size="lg"
                    onClick={() => router.push('/sign-up')}
                    fullWidth
                    icon={<ArrowRight className="h-5 w-5" />}
                    iconPosition="right"
                  >
                    Launch StockFlow
                  </PremiumButton>
                </div>
              </div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
            </AnimatedCard>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

function ScrollSection({
  title,
  subtitle,
  description,
  icon,
  gradientFrom,
  gradientTo,
}: {
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  gradientFrom: string
  gradientTo: string
}) {
  const ref = useRef<HTMLDivElement>(null!)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50])

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-30`} />
      
      <motion.div
        style={{ opacity, scale, y }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8"
      >
        <div className="relative inline-flex">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-30" />
          <div className="relative">
            {icon}
          </div>
        </div>
        
        <h2 className="text-5xl sm:text-6xl font-bold text-foreground">
          <GradientText variant="primary">{title}</GradientText>
        </h2>
        
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
          {subtitle}
        </p>
        
        <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
          {description}
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pt-8"
        >
          <PremiumButton variant="outline" size="lg" onClick={() => {}}>
            Learn More
          </PremiumButton>
        </motion.div>
      </motion.div>
    </section>
  )
}