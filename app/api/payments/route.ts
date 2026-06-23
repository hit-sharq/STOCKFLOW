import { getAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { apiResponse, apiError } from '@/lib/api'
import { NextRequest } from 'next/server'
import axios from 'axios'

const PESAPAL_API_BASE = 'https://pesapalapisandbox.com'

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return apiError('Unauthorized', 401)
    }

    const body = await req.json()
    const { orderId, amount, currency = 'KES' } = body

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { listing: true },
    })

    if (!order) {
      return apiError('Order not found', 404)
    }

    const pesapalOrderId = `SF-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    const payment = await prisma.payment.create({
      data: {
        orderId,
        amount,
        currency,
        paymentMethod: 'PESAPAL',
        status: 'PENDING',
        pesapalOrderId,
      },
    })

    const authResponse = await axios.post(
      `${PESAPAL_API_BASE}/auth/urlgetrequest`,
      {},
      {
        headers: {
          Authorization: `Bearer ${process.env.PESAPAL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const token = authResponse.data.token

    const paymentRequest = {
      id: pesapalOrderId,
      currency,
      amount,
      description: `Payment for order ${orderId}`,
      type: 'MERCHANT',
      reference: pesapalOrderId,
      callback_url: process.env.NEXT_PUBLIC_PESAPAL_CALLBACK_URL,
    }

    const submitResponse = await axios.post(
      `${PESAPAL_API_BASE}/transactions/make_payment`,
      paymentRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return apiResponse({
      payment,
      redirectUrl: submitResponse.data.redirect_url,
    })
  } catch (error: any) {
    console.error('Payment initiation error:', error)
    return apiError(error.message || 'Failed to initiate payment', 500)
  }
}