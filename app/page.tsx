'use client'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react'

export default function Page() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard')
    }
  }, [isSignedIn, router])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="text-xl font-bold text-primary">StockFlow</div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-foreground hover:text-primary text-sm">
                Features
              </a>
              <a href="#how-it-works" className="text-foreground hover:text-primary text-sm">
                How It Works
              </a>
              <a href="#" className="text-foreground hover:text-primary text-sm">
                Pricing
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.push('/sign-in')}
              >
                Sign In
              </Button>
              <Button
                onClick={() => router.push('/sign-up')}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
              Trade Excess Inventory with Confidence
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              StockFlow connects businesses to buy and sell liquidation inventory. Verified sellers, real-time bidding, and secure payments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => router.push('/sign-up')}>
                Start Buying
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push('/sign-up?role=seller')}>
                Start Selling
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Choose StockFlow?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg border border-border bg-card hover:border-primary transition">
              <Zap className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Real-Time Auctions</h3>
              <p className="text-muted-foreground">
                Competitive bidding for better prices. Set your auction duration and watch real-time bids roll in.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg border border-border bg-card hover:border-primary transition">
              <Shield className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Verified Sellers</h3>
              <p className="text-muted-foreground">
                All sellers are verified and rated. Trade with confidence knowing who you&apos;re doing business with.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg border border-border bg-card hover:border-primary transition">
              <TrendingUp className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Analytics Dashboard</h3>
              <p className="text-muted-foreground">
                Track your sales, pricing trends, and buyer behavior with detailed analytics and reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'List Inventory', desc: 'Add your excess stock with photos and details' },
              { num: '2', title: 'Set Your Terms', desc: 'Choose fixed price, auction, or negotiable options' },
              { num: '3', title: 'Receive Offers', desc: 'Get bids and inquiries from verified buyers' },
              { num: '4', title: 'Close Sale', desc: 'Secure payment and arrange logistics' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Inventory?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of businesses using StockFlow to clear excess inventory and maximize returns.
          </p>
          <Button size="lg" onClick={() => router.push('/sign-up')}>
            Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-bold text-lg text-foreground mb-4">StockFlow</div>
              <p className="text-sm text-muted-foreground">B2B liquidation marketplace</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Browse Listings</a></li>
                <li><a href="#" className="hover:text-primary">Sell Inventory</a></li>
                <li><a href="#" className="hover:text-primary">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Terms</a></li>
                <li><a href="#" className="hover:text-primary">Privacy</a></li>
                <li><a href="#" className="hover:text-primary">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 StockFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
