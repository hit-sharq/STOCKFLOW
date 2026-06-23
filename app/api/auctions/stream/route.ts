import { getAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { apiError } from '@/lib/api'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const user = await getAuthUser()
  if (!user) {
    return apiError('Unauthorized', 401)
  }

  const { searchParams } = new URL(req.url)
  const listingId = searchParams.get('listingId')

  if (!listingId) {
    return apiError('listingId is required', 400)
  }

  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  }

  const stream = new ReadableStream({
    async start(controller) {
      const sendUpdate = async () => {
        try {
          const bids = await prisma.bid.findMany({
            where: { listingId },
            orderBy: { amount: 'desc' },
            take: 10,
            include: {
              user: {
                select: { id: true, name: true },
              },
            },
          })

          const data = `data: ${JSON.stringify({ bids, timestamp: Date.now() })}\n\n`
          controller.enqueue(new TextEncoder().encode(data))
        } catch (error) {
          console.error('SSE error:', error)
        }
      }

      await sendUpdate()
      const interval = setInterval(sendUpdate, 3000)

      req.signal.addEventListener('abort', () => {
        clearInterval(interval)
        controller.close()
      })
    },
  })

  return new Response(stream, { headers })
}