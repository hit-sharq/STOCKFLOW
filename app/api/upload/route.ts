import { getAuthUser } from '@/lib/auth'
import { apiResponse, apiError } from '@/lib/api'
import { NextRequest } from 'next/server'

function generateSignature(params: Record<string, string>, apiSecret: string): string {
  const crypto = require('crypto')
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&')
  return crypto.createHash('sha1').update(sortedParams + apiSecret).digest('hex')
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return apiError('Unauthorized', 401)
    }

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return apiError('No file provided', 400)
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const timestamp = Math.round(Date.now() / 1000)
    const apiSecret = process.env.CLOUDINARY_API_SECRET!
    const apiKey = process.env.CLOUDINARY_API_KEY!
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!

    const signature = generateSignature(
      {
        folder: 'stockflow',
        timestamp: timestamp.toString(),
      },
      apiSecret
    )

    const uploadFormData = new FormData()
    uploadFormData.append('file', new Blob([buffer], { type: file.type }))
    uploadFormData.append('api_key', apiKey)
    uploadFormData.append('timestamp', timestamp.toString())
    uploadFormData.append('signature', signature)
    uploadFormData.append('folder', 'stockflow')

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: uploadFormData,
    })

    if (!response.ok) {
      return apiError('Cloudinary upload failed', 500)
    }

    const data = await response.json()

    return apiResponse({
      url: data.secure_url,
      publicId: data.public_id,
    })
  } catch (error: any) {
    console.error('Image upload error:', error)
    return apiError(error.message || 'Failed to upload image', 500)
  }
}