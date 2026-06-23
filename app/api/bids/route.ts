import { getAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { apiResponse, apiError } from '@/lib/api'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const listingId = searchParams.get('listingId')

    if (!listingId) {
      return apiError('listingId is required', 400)
    }

    const bids = await prisma.bid.findMany({
      where: { listingId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            rating: true,
          },
        },
      },
      orderBy: { amount: 'desc' },
      take: 50,
    })

    return apiResponse(bids)
  } catch (error) {
    console.error('Error fetching bids:', error)
    return apiError('Failed to fetch bids', 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return apiError('Unauthorized', 401)
    }

    const body = await req.json()

    // Validate listing exists and is an auction
    const listing = await prisma.listing.findUnique({
      where: { id: body.listingId },
    })

    if (!listing) {
      return apiError('Listing not found', 404)
    }

    if (!listing.isAuction) {
      return apiError('This is not an auction listing', 400)
    }

    // Check auction end time
    if (listing.auctionEndTime && new Date(listing.auctionEndTime) < new Date()) {
      return apiError('Auction has ended', 400)
    }

    // Get highest existing bid
    const highestBid = await prisma.bid.findFirst({
      where: { listingId: body.listingId },
      orderBy: { amount: 'desc' },
    })

    const minimumBid = highestBid ? highestBid.amount * 1.05 : listing.currentPrice * 1.05

    if (body.amount < minimumBid) {
      return apiError(
        `Bid must be at least KES ${Math.round(minimumBid).toLocaleString()}`,
        400
      )
    }

    // Check if user already has a bid on this listing
    const existingBid = await prisma.bid.findUnique({
      where: {
        listingId_userId: {
          listingId: body.listingId,
          userId: user.id,
        },
      },
    })

    let bid
    if (existingBid) {
      // Update existing bid
      bid = await prisma.bid.update({
        where: { id: existingBid.id },
        data: {
          amount: body.amount,
          message: body.message,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      })
    } else {
      // Create new bid
      bid = await prisma.bid.create({
        data: {
          listingId: body.listingId,
          userId: user.id,
          amount: body.amount,
          message: body.message,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      })
    }

    return apiResponse(bid, 201)
  } catch (error) {
    console.error('Error placing bid:', error)
    return apiError('Failed to place bid', 500)
  }
}
