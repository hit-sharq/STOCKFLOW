'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Send, Search } from 'lucide-react'
import { PageHeader } from '@/components/premium/page-header'
import { AnimatedCard } from '@/components/premium/animated-card'
import { PremiumButton } from '@/components/premium/premium-button'
import { Input } from '@/components/ui/input'

export default function MessagesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <PageHeader
        title="Messages"
        description="Communicate with sellers and buyers"
        icon={<MessageCircle className="h-6 w-6" />}
      />

      {/* Empty Inbox State */}
      <AnimatedCard className="p-12 text-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-4"
        >
          <MessageCircle className="h-16 w-16 mx-auto text-muted-foreground" />
          <h3 className="text-2xl font-bold text-foreground">No conversations</h3>
          <p className="text-muted-foreground">Start messaging when you bid on or list items</p>

          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-12 h-11" onChange={() => {}} value={''} />
            </div>
            <div className="flex items-center justify-center gap-3 mt-4">
              <PremiumButton size="lg" onClick={() => {}}>
                Browse Marketplace
              </PremiumButton>
              <PremiumButton size="lg" variant="outline" icon={<Send className="h-4 w-4" />} iconPosition="left">
                Send
              </PremiumButton>
            </div>
          </div>
        </motion.div>
      </AnimatedCard>
    </motion.div>
  )
}

