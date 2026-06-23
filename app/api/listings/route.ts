import { getAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { apiResponse, apiError } from '@/lib/api'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status') || 'ACTIVE'
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
    const page = Math.max(parseInt(searchParams.get('page') || '1'), 1)
    const skip = (page - 1) * limit

    const where: any = { status }

    if (category && category !== 'All') {
      where.category = category
    }

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              rating: true,
              avatar: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.listing.count({ where }),
    ])

    return apiResponse({
      listings,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching listings:', error)
    return apiError('Failed to fetch listings', 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return apiError('Unauthorized', 401)
    }

    const body = await req.json()

    const listing = await prisma.listing.create({
      data: {
        userId: user.id,
        title: body.title,
        description: body.description,
        category: body.category,
        subcategory: body.subcategory,
        quantity: body.quantity,
        quantityAvailable: body.quantity,
        unit: body.unit || 'pieces',
        minPrice: body.minPrice,
        currentPrice: body.currentPrice,
        image: body.image,
        images: body.images || [],
        condition: body.condition,
        listingType: body.listingType,
        status: 'ACTIVE',
        isAuction: body.isAuction || false,
        auctionStartTime: body.auctionStartTime,
        auctionEndTime: body.auctionEndTime,
        buyerCanNegotiate: body.buyerCanNegotiate !== false,
        shippingIncluded: body.shippingIncluded || false,
        shippingCost: body.shippingCost,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            rating: true,
          },
        },
      },
    })

    return apiResponse(listing, 201)
  } catch (error) {
    console.error('Error creating listing:', error)
    return apiError('Failed to create listing', 500)
  }
}
