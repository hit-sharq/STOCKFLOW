'use client'

import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, LogOut, Settings } from 'lucide-react'
import { PremiumButton } from '@/components/premium/premium-button'

export function Header() {
  const { isSignedIn, signOut } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = isSignedIn
    ? [
        { name: 'Home', href: '/' },
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'Categories', href: '/categories' },
        { name: 'Auctions', href: '/auctions' },
        { name: 'Businesses', href: '/businesses' },
      ]
    : [
        { name: 'Home', href: '/' },
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'Categories', href: '/categories' },
        { name: 'Auctions', href: '/auctions' },
        { name: 'Businesses', href: '/businesses' },
      ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50'
          : 'bg-background/40 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push('/')}
            className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            StockFlow
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (!item.href.startsWith('#')) {
                    e.preventDefault()
                    router.push(item.href)
                  }
                }}
                className={`text-sm font-medium transition-colors relative ${
                  isActive(item.href)
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                  />
                )}
              </motion.a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => router.push('/settings')}
                  className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                  title="Settings"
                >
                  <Settings className="h-5 w-5 text-foreground/70" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => signOut()}
                  className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5 text-foreground/70" />
                </motion.button>
<div className="hidden md:flex items-center gap-2 pl-3 border-l border-border/50">
                   {user?.imageUrl && (
                     <img
                       src={user.imageUrl}
                       alt={user.firstName || 'User'}
                       className="h-8 w-8 rounded-full"
                     />
                   )}
                   <span className="text-sm font-medium text-foreground max-w-[100px] truncate">
                     {user?.firstName}
                   </span>
                 </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => router.push('/sign-in')}
                  className="hidden sm:inline-block px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Sign In
                </motion.button>
                <PremiumButton
                  size="sm"
                  onClick={() => router.push('/sign-up')}
                >
                  Get Started
                </PremiumButton>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden border-t border-border/50"
        >
          <nav className="flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={() => {
                  if (!item.href.startsWith('#')) {
                    router.push(item.href)
                  }
                  setIsOpen(false)
                }}
                className={`text-left px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {item.name}
              </motion.button>
            ))}
            {!isSignedIn && (
              <PremiumButton
                size="sm"
                onClick={() => {
                  router.push('/sign-up')
                  setIsOpen(false)
                }}
                fullWidth
              >
                Get Started
              </PremiumButton>
            )}
          </nav>
        </motion.div>
      </div>
    </motion.header>
  )
}
