'use client'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  image?: string
  readTime: string
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Maximize ROI on Excess Inventory in 2024',
    excerpt: 'Discover proven strategies to turn your idle stock into revenue with StockFlow smart marketplace.',
    date: '2026-06-20',
    author: 'Market Intelligence Team',
    category: 'Business',
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'The Future of B2B Liquidation Markets',
    excerpt: 'Industry analysis on how AI-powered pricing and real-time auctions are transforming inventory management.',
    date: '2026-06-15',
    author: 'StockFlow Insights',
    category: 'Technology',
    readTime: '8 min read',
  },
  {
    id: '3',
    title: 'Success Story: TechCorp Recovers $2.3M from Excess Stock',
    excerpt: 'How one of our enterprise clients unlocked capital trapped in their warehouse through our platform.',
    date: '2026-06-10',
    author: 'Case Studies',
    category: 'Success Stories',
    readTime: '6 min read',
  },
]

export { blogPosts }