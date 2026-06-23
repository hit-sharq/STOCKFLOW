import { auth } from '@clerk/nextjs/server'
import { prisma } from './prisma'

export async function getAuthUser() {
  const { userId } = await auth()
  if (!userId) return null

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  return user
}

export async function requireAuth() {
  const user = await getAuthUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function ensureUserExists(clerkId: string, email: string) {
  let user = await prisma.user.findUnique({
    where: { clerkId },
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId,
        email,
        businessType: 'BUYER',
      },
    })
  }

  return user
}
