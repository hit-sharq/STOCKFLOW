'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Bell, Lock, FileText, HelpCircle, LogOut } from 'lucide-react'

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState('Your Business')
  const [email, setEmail] = useState('user@example.com')
  const [phone, setPhone] = useState('+254 7XX XXX XXX')
  const [location, setLocation] = useState('Nairobi, Kenya')

  const settingsSections = [
    {
      icon: Lock,
      title: 'Security',
      description: 'Manage your password and security settings',
      items: ['Change Password', 'Two-Factor Authentication', 'Login History'],
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Control how you receive updates',
      items: ['Email Notifications', 'Order Updates', 'Listing Expiry Alerts'],
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
      items: ['Help Center', 'Contact Support', 'Report an Issue'],
    },
  ]

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your business details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Business Name</label>
            <Input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Your business name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Location</label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Country"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Account Type</label>
            <div className="flex gap-2">
              <Badge className="bg-primary text-primary-foreground">Buyer</Badge>
              <Badge variant="outline">Seller</Badge>
            </div>
          </div>

          <Button className="w-full">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Settings Sections */}
      <div className="space-y-4">
        {settingsSections.map((section) => {
          const Icon = section.icon
          return (
            <Card key={section.title} className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-accent" />
                  <div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <CardDescription className="text-xs">{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {section.items.map((item) => (
                    <Button key={item} variant="outline" className="text-xs">
                      {item}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Account Actions */}
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full gap-2 justify-start">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
          <p className="text-xs text-muted-foreground">Deleting your account is permanent and cannot be undone.</p>
        </CardContent>
      </Card>
    </div>
  )
}
