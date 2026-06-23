import nodemailer from 'nodemailer'
import { prisma } from '@/lib/prisma'
import { apiResponse, apiError } from '@/lib/api'
import { NextRequest } from 'next/server'

interface EmailParams {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailParams) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    })
    return true
  } catch (error) {
    console.error('Email send error:', error)
    return false
  }
}

export async function POST(req: NextRequest) {
  try {
    const { to, subject, html, userId } = await req.json()

    if (!to || !subject || !html) {
      return apiError('Missing required email fields', 400)
    }

    const success = await sendEmail({ to, subject, html })

    if (success && userId) {
      await prisma.notification.create({
        data: {
          userId,
          type: 'MESSAGE',
          title: subject,
          message: html.substring(0, 200),
        },
      })
    }

    return apiResponse({ success })
  } catch (error: any) {
    console.error('Email endpoint error:', error)
    return apiError(error.message || 'Failed to send email', 500)
  }
}