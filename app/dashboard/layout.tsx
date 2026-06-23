'use client'

import { motion } from 'framer-motion'
import { Home, ShoppingBag, BarChart3, MessageSquare, Settings, Bell } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: ShoppingBag, label: 'Marketplace', href: '/marketplace' },
    { icon: BarChart3, label: 'Seller', href: '/seller' },
    { icon: ShoppingBag, label: 'Buyer', href: '/buyer' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Premium Sidebar */}
        <motion.aside 
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden lg:flex w-64 flex-col border-r border-border/50 bg-card/40 backdrop-blur"
        >
          <div className="p-6 border-b border-border/50">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              StockFlow
            </h1>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-auto">
            {navItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/70 hover:text-foreground hover:bg-primary/10 transition-colors group"
                  >
                    <Icon className="h-5 w-5 group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              )
            })}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <motion.header 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="border-b border-border/50 bg-card/40 backdrop-blur px-6 py-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4 lg:hidden">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="font-bold text-foreground">Menu</span>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <Bell className="h-5 w-5 text-foreground/60" />
            </motion.button>
          </motion.header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 lg:p-8"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
