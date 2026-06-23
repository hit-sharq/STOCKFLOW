import { prisma } from '@/lib/prisma'
import { apiResponse, apiError } from '@/lib/api'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { listingId } = body

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: {
        bids: {
          orderBy: { amount: 'desc' },
          take: 1,
        },
      },
    })

    if (!listing || !listing.isAuction) {
      return apiError('Invalid or non-auction listing', 400)
    }

    const highestBid = listing.bids[0]

    if (!highestBid) {
      return apiError('No bids found for this auction', 400)
    }

    await prisma.listing.update({
      where: { id: listingId },
      data: {
        status: 'SOLD',
      },
    })

    const order = await prisma.order.create({
      data: {
        listingId,
        buyerId: highestBid.userId,
        quantity: listing.quantityAvailable || listing.quantity,
        unitPrice: highestBid.amount,
        totalAmount: highestBid.amount * (listing.quantityAvailable || listing.quantity),
        paymentStatus: 'PENDING',
        orderStatus: 'PENDING',
      },
      include: {
        listing: true,
        payments: true,
      },
    })

    return apiResponse({
      order,
      winner: highestBid.userId,
      winningBid: highestBid.amount,
    })
  } catch (error: any) {
    console.error('Auction settlement error:', error)
    return apiError(error.message || 'Failed to settle auction', 500)
  }
}