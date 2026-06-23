import { prisma } from '@/lib/prisma'
import { apiResponse, apiError } from '@/lib/api'
import { NextRequest } from 'next/server'
import axios from 'axios'

const PESAPAL_API_BASE = 'https://pesapalapisandbox.com'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const orderTrackingId = searchParams.get('OrderTrackingId')
    const orderMerchantReference = searchParams.get('OrderMerchantReference')

    if (!orderTrackingId || !orderMerchantReference) {
      return apiError('Missing required parameters', 400)
    }

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

    const statusResponse = await axios.get(
      `${PESAPAL_API_BASE}/transactions/status?orderTrackingId=${orderTrackingId}&orderMerchantReference=${orderMerchantReference}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const paymentStatus = statusResponse.data.payment_status.status

    const payment = await prisma.payment.findFirst({
      where: { pesapalOrderId: orderMerchantReference },
      include: { order: true },
    })

    if (!payment) {
      return apiError('Payment not found', 404)
    }

    const prismaStatus = paymentStatus === 'COMPLETED' ? 'COMPLETED' : 'FAILED'

    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: prismaStatus,
        pesapalTrackingId: orderTrackingId,
      },
    })

    if (prismaStatus === 'COMPLETED') {
      await prisma.order.update({
        where: { id: payment.orderId },
        data: {
          paymentStatus: 'COMPLETED',
          orderStatus: 'CONFIRMED',
        },
      })
    }

    return apiResponse({ status: paymentStatus })
  } catch (error: any) {
    console.error('Payment callback error:', error)
    return apiError(error.message || 'Payment callback failed', 500)
  }
}