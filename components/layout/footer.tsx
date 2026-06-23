'use client'

import { motion } from 'framer-motion'
import { Share2, X, Code2, Mail } from 'lucide-react'

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: Share2,
    href: 'https://linkedin.com/company/stockflow',
    label: 'Follow us on LinkedIn'
  },
  {
    name: 'X',
    icon: X,
    href: 'https://twitter.com/stockflow',
    label: 'Follow us on X'
  },
  {
    name: 'GitHub',
    icon: Code2,
    href: 'https://github.com/stockflow',
    label: 'View our code on GitHub'
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:support@stockflow.io',
    label: 'Email us'
  },
]

const footerSections = [
  {
    title: 'Product',
    links: [
      { name: 'Browse Inventory', href: '/marketplace' },
      { name: 'Sell Inventory', href: '/seller' },
      { name: 'Pricing', href: '#' },
      { name: 'API', href: '#' },
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Security', href: '#' },
    ]
  },
]

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-background to-background/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <div className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              StockFlow
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Premium B2B liquidation marketplace for intelligent inventory management.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/20 text-foreground/60 hover:text-primary transition-colors"
                    title={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ x: 4 }}
                  >
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent mb-8"
        />

        {/* Bottom Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <motion.p variants={itemVariants} className="text-sm text-muted-foreground">
            2024 StockFlow. All rights reserved. Trusted by businesses worldwide.
          </motion.p>
          <motion.div variants={itemVariants} className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Status
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Documentation
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Support
            </a>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
