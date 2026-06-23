import { PrismaClient } from '@prisma/client'
import { config as loadEnv } from 'dotenv'

// Ensure DATABASE_URL is available in Next.js build/runtime contexts
loadEnv({ path: '.env' })

if (process.env.NEXT_RUNTIME_DEBUG_PRISMA === '1') {
  // eslint-disable-next-line no-console
  console.log('[prisma] DATABASE_URL set?', Boolean(process.env.DATABASE_URL))
}


const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    adapter: { url: process.env.DATABASE_URL!, } as any,
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
