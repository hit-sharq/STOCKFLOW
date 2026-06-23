import { getAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { apiResponse, apiError } from '@/lib/api'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return apiError('Unauthorized', 401)
    }

    const { searchParams } = new URL(req.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
    const page = Math.max(parseInt(searchParams.get('page') || '1'), 1)
    const skip = (page - 1) * limit

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { buyerId: user.id },
        include: {
          listing: true,
          payments: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.order.count({ where: { buyerId: user.id } }),
    ])

    return apiResponse({
      orders,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return apiError('Failed to fetch orders', 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return apiError('Unauthorized', 401)
    }

    const body = await req.json()

    // Validate listing exists and has available quantity
    const listing = await prisma.listing.findUnique({
      where: { id: body.listingId },
    })

    if (!listing) {
      return apiError('Listing not found', 404)
    }

    if (listing.quantityAvailable < body.quantity) {
      return apiError('Not enough quantity available', 400)
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        listingId: body.listingId,
        buyerId: user.id,
        quantity: body.quantity,
        unitPrice: listing.currentPrice,
        totalAmount: listing.currentPrice * body.quantity,
        shippingAddress: body.shippingAddress,
        notes: body.notes,
      },
      include: {
        listing: true,
        payments: true,
      },
    })

    // Update listing quantity
    await prisma.listing.update({
      where: { id: body.listingId },
      data: {
        quantityAvailable: {
          decrement: body.quantity,
        },
      },
    })

    return apiResponse(order, 201)
  } catch (error) {
    console.error('Error creating order:', error)
    return apiError('Failed to create order', 500)
  }
}
