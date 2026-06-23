import { UserButton } from '@clerk/nextjs'
import { Bell, Home, ShoppingBag, BarChart3, MessageSquare, Settings, Menu } from 'lucide-react'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: ShoppingBag, label: 'Marketplace', href: '/marketplace' },
    { icon: BarChart3, label: 'Seller Hub', href: '/seller' },
    { icon: ShoppingBag, label: 'My Orders', href: '/buyer' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">StockFlow</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Account</span>
          <UserButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between md:justify-end">
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-muted rounded-lg transition">
              <Bell className="h-5 w-5 text-foreground" />
            </button>
            <UserButton />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
