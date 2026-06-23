'use client'

import { motion } from 'framer-motion'
import { Bell, Lock, FileText, HelpCircle, Settings as SettingsIcon } from 'lucide-react'
import { PageHeader } from '@/components/premium/page-header'
import { AnimatedCard } from '@/components/premium/animated-card'
import { PremiumButton } from '@/components/premium/premium-button'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function SettingsPage() {
  const settingsSections = [
    {
      icon: Lock,
      title: 'Security',
      description: 'Manage password and security settings',
      items: ['Change Password', 'Two-Factor Authentication', 'Login History'],
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Control how you receive updates',
      items: ['Email Notifications', 'Order Updates', 'Listing Alerts'],
    },
    {
      icon: FileText,
      title: 'Privacy & Terms',
      description: 'Review our policies',
      items: ['Terms of Service', 'Privacy Policy', 'Data Export'],
    },
    {
      icon: HelpCircle,
      title: 'Support',
      description: 'Get help when you need it',
      items: ['Help Center', 'Contact Support', 'Report Issue'],
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PageHeader
              title="Settings"
              description="Manage your account and preferences"
              icon={<SettingsIcon className="h-6 w-6" />}
            />
          </motion.div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <AnimatedCard className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Business Name</label>
                    <Input placeholder="Your business name" className="h-10" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                    <Input type="email" placeholder="your@email.com" className="h-10" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <Input placeholder="Phone number" className="h-10" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                      <Input placeholder="City, Country" className="h-10" />
                    </div>
                  </div>

                  <PremiumButton className="w-full">Save Changes</PremiumButton>
                </div>
              </div>
            </AnimatedCard>
          </motion.div>

          {/* Settings Sections */}
          <div className="space-y-4">
            {settingsSections.map((section, idx) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 + idx * 0.05 }}
                >
                  <AnimatedCard className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground">{section.title}</h3>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {section.items.map((item) => (
                        <motion.button
                          key={item}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition text-sm font-medium"
                        >
                          {item}
                        </motion.button>
                      ))}
                    </div>
                  </AnimatedCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
