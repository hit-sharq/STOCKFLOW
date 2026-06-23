'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Search, MessageCircle } from 'lucide-react'

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: boolean
}

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  isOwn: boolean
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'TechTraders Ltd',
    avatar: '🏢',
    lastMessage: 'When can you ship the order?',
    timestamp: '2m ago',
    unread: true,
  },
  {
    id: '2',
    name: 'Furniture Direct',
    avatar: '🛋️',
    lastMessage: 'Thanks for the purchase!',
    timestamp: '1h ago',
    unread: false,
  },
  {
    id: '3',
    name: 'Fashion Wholesale',
    avatar: '👔',
    lastMessage: 'New collection coming soon',
    timestamp: '3h ago',
    unread: false,
  },
]

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'TechTraders Ltd',
    content: 'Hi, I have a new electronics lot available. Are you interested?',
    timestamp: '10:30 AM',
    isOwn: false,
  },
  {
    id: '2',
    sender: 'You',
    content: 'Yes, can you provide more details about the condition and pricing?',
    timestamp: '10:35 AM',
    isOwn: true,
  },
  {
    id: '3',
    sender: 'TechTraders Ltd',
    content: '50 units, all in like-new condition. KES 15,000 per unit.',
    timestamp: '10:40 AM',
    isOwn: false,
  },
  {
    id: '4',
    sender: 'TechTraders Ltd',
    content: 'When can you ship the order?',
    timestamp: '11:00 AM',
    isOwn: false,
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState('1')
  const [messageInput, setMessageInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput)
      setMessageInput('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
        <p className="text-muted-foreground">Communicate with sellers and buyers</p>
      </div>

      {/* Main Chat Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px] lg:h-[700px]">
        {/* Conversations List */}
        <Card className="border-border overflow-hidden flex flex-col">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Conversations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {mockConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full text-left px-4 py-3 border-b border-border hover:bg-muted transition ${
                    selectedConversation === conv.id ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{conv.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground truncate">{conv.name}</p>
                        {conv.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{conv.timestamp}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="border-border lg:col-span-2 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <CardHeader className="border-b border-border">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🏢</div>
              <div>
                <h2 className="font-semibold text-foreground">TechTraders Ltd</h2>
                <p className="text-xs text-muted-foreground">Active now</p>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.isOwn
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm break-words">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>

          {/* Message Input */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
